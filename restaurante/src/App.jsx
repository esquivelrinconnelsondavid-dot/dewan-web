import { useEffect, useState } from 'react';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import Tablero, { Columna } from './components/Tablero';
import NuevoPedidoModal from './components/NuevoPedidoModal';
import EstadoLocal, { useEstadoLocal } from './components/EstadoLocal';
import TabBar from './components/TabBar';
import VistaVentas from './components/VistaVentas';
import VistaOpiniones from './components/VistaOpiniones';
import AjustesModal from './components/AjustesModal';
import AvisoSonido from './components/AvisoSonido';
import AvisoConexion from './components/AvisoConexion';
import Onboarding from './components/Onboarding';
import { useAuth } from './hooks/useAuth';
import { usePedidosRestaurante } from './hooks/usePedidosRestaurante';
import { useResenas } from './hooks/useResenas';
import {
  requestPushPermission,
  unlockAudio,
  autoArmarAudio,
  pedirWakeLock,
  instalarWakeLockListener,
  stopAllAlerts,
} from './lib/notifications';
import { registrarPushRestaurante, olvidarRestaurantePush } from './lib/push';
import { tiempoSinDatos } from './lib/conexion';
import { resucitarSocket } from './lib/supabase';
import { MARCA, MODO_HP, MODO_SISTEMA } from './lib/config';
import { aplicarTemaLocal } from './lib/tema';

function buildTabs(nuevosCount, enProcesoCount, opinionesSinLeer) {
  return [
    { id: 'pedidos', label: 'Pedidos', badge: nuevosCount },
    // Happy Pollo usa delivery propio (sin motos DEWAN) → no hay pestaña "Entregando".
    ...(MODO_HP && !MODO_SISTEMA ? [] : [{ id: 'entregando', label: 'Entregando', badge: enProcesoCount }]),
    { id: 'ventas', label: 'Ventas' },
    // Lo que el cliente dijo de la comida y de cada plato (DEWAN y locales del SISTEMA).
    { id: 'opiniones', label: 'Opiniones', badge: opinionesSinLeer },
  ];
}

function Panel({ restaurante, onLogout, onActualizarRestaurante }) {
  const { entrantes, cocina, listos, entregando, cargando } = usePedidosRestaurante(restaurante);
  // Estado de la tienda (Abierto · Ocupado · Pausar) — no aplica a Happy Pollo (reparte con su gente).
  const estadoLocal = useEstadoLocal(restaurante?.restaurante_id);
  // Pantalla de "Nuevo pedido": se minimiza por id; un pedido nuevo distinto la vuelve a abrir.
  const [minimizados, setMinimizados] = useState(() => new Set());
  // Opiniones de los clientes: se cargan acá (y no dentro de la pestaña) para que el
  // badge "sin leer" y el aviso en vivo funcionen aunque el local esté en Pedidos.
  const opiniones = useResenas(restaurante);
  const [tab, setTab] = useState('pedidos');
  const [ajustesAbierto, setAjustesAbierto] = useState(false);
  const [verTutorial, setVerTutorial] = useState(() => {
    if (MODO_HP) return false; // Happy Pollo no usa el tutorial/intro de DEWAN
    try {
      return !localStorage.getItem('dewan_onboarding_visto_v1');
    } catch {
      return false;
    }
  });
  const cerrarTutorial = () => {
    try {
      localStorage.setItem('dewan_onboarding_visto_v1', '1');
    } catch {
      // ignorar (modo privado, etc.)
    }
    setVerTutorial(false);
  };

  // Permisos de notificación y wake lock al montar.
  useEffect(() => {
    requestPushPermission();
    pedirWakeLock();
    instalarWakeLockListener();
  }, []);

  // Registrar/actualizar push FCM. Corre al montar y cada vez que cambia el
  // restaurante (mismo teléfono, otro local) para RE-ASOCIAR el token al local
  // actual. push.js monta los listeners una sola vez; las llamadas siguientes
  // solo re-asocian el token → así los pedidos del local activo sí hacen match.
  useEffect(() => {
    registrarPushRestaurante(restaurante);
  }, [restaurante?.restaurante_id, restaurante?.nombre]);

  // Desbloquear audio con el primer gesto del usuario.
  // En PC (Electron) y en la app nativa (Android) se arma solo al iniciar, así
  // no aparece el botón; el gesto queda como respaldo y para el navegador.
  useEffect(() => {
    autoArmarAudio();
    const handler = () => {
      unlockAudio();
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('click', handler);
    };
    document.addEventListener('touchstart', handler, { once: true });
    document.addEventListener('click', handler, { once: true });
    return () => {
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('click', handler);
    };
  }, []);

  // Limpiar todas las alarmas al desmontar.
  useEffect(() => stopAllAlerts, []);

  // Exponer la resurrección del socket para que el proceso principal la invoque
  // al despertar la PC (vía executeJavaScript en main.cjs).
  useEffect(() => {
    window.dewanResucitar = resucitarSocket;
    return () => { try { delete window.dewanResucitar; } catch {} };
  }, []);

  // Watchdog de conexión ESCALONADO. Si dejan de llegar datos frescos (red zombi
  // que NO se recupera sola — el caso "se queda pegado, hay que reabrir"):
  //  • a los 30s: recuperación SUAVE → drenar el pool de sockets de Chromium
  //    (IPC recuperar-red) + resucitar el WebSocket de Supabase, SIN recargar
  //    (conserva una alarma sonando / el audio). Un intento por episodio.
  //  • a los 60s: si la suave no bastó → drenar + RECARGAR la ventana. Ahora SÍ
  //    equivale a cerrar/abrir, porque drenamos el pool que reload no limpia.
  // Cooldown de 90s en la recarga para no entrar en bucle si el internet está
  // caído de verdad (cuando vuelve, el poll trae datos y el watchdog calla).
  useEffect(() => {
    let intentoSuave = 0;
    const id = setInterval(async () => {
      const sinDatos = tiempoSinDatos();
      if (sinDatos <= 30000) { intentoSuave = 0; return; }

      if (sinDatos <= 60000) {
        if (intentoSuave) return;
        intentoSuave = 1;
        console.warn('[watchdog] sin datos → recuperación suave (drenar red + resucitar socket)');
        try { await window.electronAPI?.recuperarRed?.(); } catch {}
        try { await resucitarSocket(); } catch {}
        return;
      }

      let ult = 0;
      try { ult = Number(localStorage.getItem('dewan_ultima_recarga_auto') || 0); } catch {}
      if (Date.now() - ult < 90000) return;
      try { localStorage.setItem('dewan_ultima_recarga_auto', String(Date.now())); } catch {}
      console.warn('[watchdog] +60s sin datos → drenar red + recargar');
      try { await window.electronAPI?.recuperarRed?.(); } catch {}
      await new Promise((r) => setTimeout(r, 600));
      window.location.reload();
    }, 15000);
    return () => clearInterval(id);
  }, []);

  if (cargando) {
    return (
      <div className="h-full flex flex-col">
        <Header restaurante={restaurante} onLogout={onLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="marca-title text-dewan font-black text-2xl">{MARCA}</span>
            <div className="mt-4 w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  const enProceso = [...listos, ...entregando];
  const nuevosVisibles = entrantes.filter((p) => !minimizados.has(p.id));
  const conEstadoLocal = !(MODO_HP && !MODO_SISTEMA);
  const resumenHoy = 'Cuando un pedido salga con el motorizado aparecerá aquí.';

  return (
    <div className="h-full flex flex-col">
      <Header
        restaurante={restaurante}
        onLogout={onLogout}
        onAbrirAjustes={() => setAjustesAbierto(true)}
        centro={conEstadoLocal ? <EstadoLocal estado={estadoLocal} /> : null}
      />
      {conEstadoLocal && (
        <div className="md:hidden flex justify-center px-3 py-2 border-b border-borde bg-fondo">
          <EstadoLocal estado={estadoLocal} compacto />
        </div>
      )}
      <AvisoConexion />
      <AvisoSonido />
      <div className="lg:hidden">
        <TabBar tabs={buildTabs(entrantes.length, enProceso.length, opiniones.sinLeer)} active={tab} onChange={setTab} />
      </div>
      <div className="hidden lg:block">
        <TabBar tabs={[{ id: 'pedidos', label: 'Pedidos', badge: entrantes.length }, { id: 'ventas', label: 'Ventas' }, { id: 'opiniones', label: 'Opiniones', badge: opiniones.sinLeer }]} active={tab === 'entregando' ? 'pedidos' : tab} onChange={setTab} />
      </div>
      <NuevoPedidoModal pedidos={nuevosVisibles} ocupadoMin={estadoLocal.ocupadoMin}
        onMinimizar={() => setMinimizados((prev) => { const n = new Set(prev); nuevosVisibles.forEach((p) => n.add(p.id)); return n; })} />

      {ajustesAbierto && (
        <AjustesModal
          restaurante={restaurante}
          onCerrar={() => setAjustesAbierto(false)}
          onActualizarRestaurante={onActualizarRestaurante}
          onVerTutorial={() => {
            setAjustesAbierto(false);
            setVerTutorial(true);
          }}
        />
      )}

      <div className={`flex-1 min-h-0 overflow-y-auto ${(tab === 'pedidos' || tab === 'entregando') ? 'lg:pb-0' : ''} pb-8`}>
        {(tab === 'pedidos' || tab === 'entregando') && (
          <Tablero entrantes={entrantes} cocina={cocina} listos={listos} entregando={entregando}
            ocupadoMin={estadoLocal.ocupadoMin} resumenHoy={resumenHoy} />
        )}

        {tab === 'pedidos' && (
          <div className="lg:hidden px-3 pt-3 pb-6 space-y-5">
            <Columna id="nuevo" pedidos={entrantes} ocupadoMin={estadoLocal.ocupadoMin} apilada />
            <Columna id="preparando" pedidos={cocina} apilada />
            {entrantes.length === 0 && cocina.length === 0 && (
              <p className="text-center text-xs text-gray-500 pt-6">Mantén esta pantalla abierta. Los pedidos sonarán al entrar.</p>
            )}
          </div>
        )}

        {tab === 'entregando' && (
          <div className="lg:hidden px-3 pt-3 pb-6 space-y-5">
            <Columna id="listo" pedidos={listos} apilada />
            <Columna id="entregando" pedidos={entregando} apilada />
          </div>
        )}

        {tab === 'ventas' && <VistaVentas restaurante={restaurante} />}

        {tab === 'opiniones' && (
          <VistaOpiniones
            resenas={opiniones.resenas}
            cargando={opiniones.cargando}
            noDisponible={opiniones.noDisponible}
            onMarcarLeidas={() => opiniones.marcarLeidas()}
          />
        )}
      </div>

      {verTutorial && <Onboarding onCerrar={cerrarTutorial} />}
    </div>
  );
}

export default function App() {
  const { restaurante, cargando, login, logout, actualizar } = useAuth();

  // Latido al proceso principal de Electron. Si el renderer se congela, deja de
  // latir y el watchdog del MAIN relanza la app (proceso nuevo) solo. Va en el
  // App raíz para latir también en el login.
  useEffect(() => {
    const api = typeof window !== 'undefined' ? window.electronAPI : null;
    if (!api?.latido) return;
    api.latido();
    const id = setInterval(() => { try { api.latido(); } catch {} }, 5000);
    return () => clearInterval(id);
  }, []);

  // SISTEMA: colores del local (panel_tema / panel_color) apenas hay sesión.
  useEffect(() => { aplicarTemaLocal(restaurante); }, [restaurante?.restaurante_id, restaurante?.panel_tema, restaurante?.panel_color]);

  if (cargando) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <span className="marca-title text-dewan font-black text-2xl">{MARCA}</span>
          <div className="mt-4 w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!restaurante) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <Panel
      restaurante={restaurante}
      onLogout={() => { olvidarRestaurantePush(); logout(); }}
      onActualizarRestaurante={actualizar}
    />
  );
}
