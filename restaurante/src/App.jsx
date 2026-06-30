import { useEffect, useState } from 'react';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import PedidoEntrante from './components/PedidoEntrante';
import PedidoEnPreparacion from './components/PedidoEnPreparacion';
import PedidoEnProceso from './components/PedidoEnProceso';
import TabBar from './components/TabBar';
import VistaVentas from './components/VistaVentas';
import AjustesModal from './components/AjustesModal';
import AvisoSonido from './components/AvisoSonido';
import AvisoConexion from './components/AvisoConexion';
import Onboarding from './components/Onboarding';
import { useAuth } from './hooks/useAuth';
import { usePedidosRestaurante } from './hooks/usePedidosRestaurante';
import {
  requestPushPermission,
  unlockAudio,
  autoArmarAudioEscritorio,
  pedirWakeLock,
  instalarWakeLockListener,
  stopAllAlerts,
} from './lib/notifications';
import { registrarPushRestaurante, olvidarRestaurantePush } from './lib/push';
import { tiempoSinDatos } from './lib/conexion';
import { resucitarSocket } from './lib/supabase';
import { MARCA, MODO_HP } from './lib/config';
import CitySelector from './components/CitySelector';
import { MULTI_CIUDAD, ciudadActualId, ciudadActual, elegirCiudad } from './lib/ciudades';

function buildTabs(enProcesoCount) {
  return [
    { id: 'pedidos', label: 'Pedidos' },
    // Happy Pollo usa delivery propio (sin motos DEWAN) → no hay pestaña "Entregando".
    ...(MODO_HP ? [] : [{ id: 'entregando', label: 'Entregando', badge: enProcesoCount }]),
    { id: 'ventas', label: 'Ventas' },
  ];
}

function Panel({ restaurante, onLogout, onActualizarRestaurante }) {
  const { entrantes, enPreparacion, enProceso, cargando } = usePedidosRestaurante(restaurante);
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
  // En PC (Electron) lo armamos solo al iniciar, así no aparece el botón.
  useEffect(() => {
    autoArmarAudioEscritorio();
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

  const sinPedidosCocina = entrantes.length === 0 && enPreparacion.length === 0;
  const sinEntregas = enProceso.length === 0;

  return (
    <div className="h-full flex flex-col">
      <Header
        restaurante={restaurante}
        onLogout={onLogout}
        onAbrirAjustes={() => setAjustesAbierto(true)}
      />
      <AvisoConexion />
      <AvisoSonido />
      <TabBar tabs={buildTabs(enProceso.length)} active={tab} onChange={setTab} />

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

      <div className="flex-1 overflow-y-auto pb-8">
        {tab === 'pedidos' && (
          <>
            {entrantes.length > 0 && (
              <section className="px-3 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-nuevo animate-pulse" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-nuevo">
                    Nuevos pedidos ({entrantes.length})
                  </h2>
                </div>
                <div className="space-y-2">
                  {entrantes.map((p) => (
                    <PedidoEntrante key={p.id} pedido={p} />
                  ))}
                </div>
              </section>
            )}

            {enPreparacion.length > 0 && (
              <section className="px-3 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-preparando" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-preparando">
                    En preparación ({enPreparacion.length})
                  </h2>
                </div>
                <div className="space-y-2">
                  {enPreparacion.map((p) => (
                    <PedidoEnPreparacion key={p.id} pedido={p} />
                  ))}
                </div>
              </section>
            )}

            {sinPedidosCocina && (
              <div className="h-full flex flex-col items-center justify-center px-6 text-center mt-20">
                <p className="text-7xl mb-4">🍽️</p>
                <h2 className="text-white font-bold text-xl mb-2">Esperando pedidos…</h2>
                <p className="text-gray-400 text-sm max-w-xs">
                  Mantén esta pantalla abierta. Los pedidos sonarán al entrar.
                </p>
                {enProceso.length > 0 && (
                  <p className="text-encamino text-xs mt-4">
                    Tenés {enProceso.length} pedido(s) en entrega — vé a la pestaña "Entregando".
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {tab === 'entregando' && (
          <>
            {enProceso.length > 0 ? (
              <section className="px-3 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-encamino" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-encamino">
                    En entrega ({enProceso.length})
                  </h2>
                </div>
                <p className="text-[11px] text-gray-500 mb-3">
                  Estos pedidos ya están con el motorizado. No los prepares de nuevo.
                </p>
                <div className="space-y-2">
                  {enProceso.map((p) => (
                    <PedidoEnProceso key={p.id} pedido={p} />
                  ))}
                </div>
              </section>
            ) : (
              <div className="h-full flex flex-col items-center justify-center px-6 text-center mt-20">
                <p className="text-7xl mb-4">🏍️</p>
                <h2 className="text-white font-bold text-xl mb-2">Sin entregas en curso</h2>
                <p className="text-gray-400 text-sm max-w-xs">
                  Cuando el motorizado acepte un pedido aparecerá acá.
                </p>
              </div>
            )}
          </>
        )}

        {tab === 'ventas' && <VistaVentas restaurante={restaurante} />}
      </div>

      {verTutorial && <Onboarding onCerrar={cerrarTutorial} />}
    </div>
  );
}

export default function App() {
  const { restaurante, cargando, login, logout, actualizar } = useAuth();
  // Ciudad/backend elegido. null = aún no eligió → mostrar selector (solo DEWAN).
  const [forzarSelector, setForzarSelector] = useState(false);
  const ciudadId = ciudadActualId();

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

  // Pedir el permiso de notificaciones APENAS abre la app (antes del selector de
  // ciudad y del login). Android 13+ solo muestra el diálogo si la app llama a
  // requestPermissions(); antes esto vivía SOLO dentro de <Panel> (post-login),
  // así que en una instalación nueva la app abría, mostraba elegir-ciudad/login
  // y nunca pedía el permiso si el local no llegaba a entrar. El registro del
  // token FCM sigue en <Panel> (necesita el restaurante logueado); acá solo
  // disparamos el diálogo del sistema para que el permiso quede concedido ya.
  useEffect(() => {
    requestPushPermission();
  }, []);

  // Elegir ciudad. Si cambia respecto a la guardada, limpiamos la sesión cacheada
  // (es de otra ciudad/backend) y recargamos para reconstruir el cliente Supabase.
  const elegir = (id) => {
    const previa = ciudadActualId();
    if (!elegirCiudad(id)) return;
    if (previa === id) { setForzarSelector(false); return; }
    if (previa && previa !== id) {
      try {
        localStorage.removeItem('dewan_rest_token');
        localStorage.removeItem('dewan_rest_data');
      } catch { /* ignorar */ }
    }
    window.location.reload();
  };

  // Selector de ciudad: solo DEWAN, y solo si aún no eligió (o lo pidió a mano).
  if (MULTI_CIUDAD && (forzarSelector || !ciudadId)) {
    return (
      <CitySelector
        onElegir={elegir}
        onCancelar={forzarSelector ? () => setForzarSelector(false) : null}
      />
    );
  }

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
    return (
      <LoginScreen
        onLogin={login}
        ciudad={MULTI_CIUDAD ? ciudadActual() : null}
        onCambiarCiudad={MULTI_CIUDAD ? () => setForzarSelector(true) : null}
      />
    );
  }

  return (
    <Panel
      restaurante={restaurante}
      onLogout={() => { olvidarRestaurantePush(); logout(); }}
      onActualizarRestaurante={actualizar}
    />
  );
}
