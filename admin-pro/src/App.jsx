import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import CitySelector from './components/CitySelector';
import { MULTI_CIUDAD, ciudadActualId, ciudadActual, elegirCiudad } from './lib/ciudades';
import Header from './components/Header';
import TabsBar from './components/TabsBar';
import DashboardTab from './components/DashboardTab';
import PedidosTab from './components/PedidosTab';
import RestaurantesTab from './components/RestaurantesTab';
import MotorizadosTab from './components/MotorizadosTab';
import ComisionesTab from './components/ComisionesTab';
import FinanzasTab from './components/FinanzasTab';
import { useAdminData } from './hooks/useAdminData';
import { requestNotifPermission, unlockAudio } from './lib/notifications';
import { registrarPush } from './lib/push';

const ADMINS = [
  { user: 'admin', pass: 'dewan2025', nombre: 'Administrador', rol: 'admin' },
  { user: 'socio', pass: 'dewan2025', nombre: 'Socio', rol: 'admin' },
  // Centralista: solo ve la consola de Pedidos (sin finanzas/comisiones/motos/restaurantes).
  { user: 'centralista', pass: 'central2025', nombre: 'Centralista', rol: 'centralista' },
];

function Panel({ admin, onLogout }) {
  const rol = admin?.rol || 'admin';
  const esAdmin = rol === 'admin';
  const [tab, setTab] = useState(esAdmin ? 'dashboard' : 'pedidos');
  const data = useAdminData();

  useEffect(() => {
    requestNotifPermission();
    registrarPush(admin?.user);
    const h = () => unlockAudio();
    document.addEventListener('touchstart', h);
    document.addEventListener('click', h);
    return () => {
      document.removeEventListener('touchstart', h);
      document.removeEventListener('click', h);
    };
  }, []);

  if (data.cargando) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <span className="text-dewan font-black text-3xl">DEWAN</span>
          <div className="mt-4 w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Header admin={admin} onLogout={onLogout} alertas={data.colgados.length + data.rechazados.length} />
      <TabsBar tab={tab} setTab={setTab} alertasRest={data.colgados.length} rol={rol} />
      <div className="flex-1 overflow-y-auto">
        {tab === 'pedidos' && <PedidosTab data={data} />}
        {esAdmin && tab === 'dashboard' && <DashboardTab data={data} />}
        {esAdmin && tab === 'restaurantes' && <RestaurantesTab data={data} />}
        {esAdmin && tab === 'motorizados' && <MotorizadosTab data={data} />}
        {esAdmin && tab === 'comisiones' && <ComisionesTab data={data} />}
        {esAdmin && tab === 'finanzas' && <FinanzasTab data={data} />}
      </div>
    </div>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dewan_admin') || 'null'); } catch { return null; }
  });
  // Ciudad/backend elegido. null = aún no eligió → mostrar selector.
  const [forzarSelector, setForzarSelector] = useState(false);
  const ciudadId = ciudadActualId();

  const handleLogin = (user, pass) => {
    const found = ADMINS.find((a) => a.user === user && a.pass === pass);
    if (found) {
      const info = { user: found.user, nombre: found.nombre, rol: found.rol };
      localStorage.setItem('dewan_admin', JSON.stringify(info));
      setAdmin(info);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('dewan_admin');
    setAdmin(null);
  };

  // Elegir ciudad. Si cambia respecto a la guardada, cerramos la sesión admin
  // (es de otra ciudad) y recargamos para reconstruir el cliente Supabase.
  const elegir = (id) => {
    const previa = ciudadActualId();
    if (!elegirCiudad(id)) return;
    if (previa === id) { setForzarSelector(false); return; }
    if (previa && previa !== id) {
      try { localStorage.removeItem('dewan_admin'); } catch { /* ignorar */ }
    }
    window.location.reload();
  };

  // Selector de ciudad: solo si aún no eligió (o lo pidió a mano).
  if (MULTI_CIUDAD && (forzarSelector || !ciudadId)) {
    return (
      <CitySelector
        onElegir={elegir}
        onCancelar={forzarSelector ? () => setForzarSelector(false) : null}
      />
    );
  }

  if (!admin) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        ciudad={ciudadActual()}
        onCambiarCiudad={() => setForzarSelector(true)}
      />
    );
  }
  return <Panel admin={admin} onLogout={handleLogout} />;
}
