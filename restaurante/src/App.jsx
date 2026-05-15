import { useEffect } from 'react';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import PedidoEntrante from './components/PedidoEntrante';
import PedidoEnPreparacion from './components/PedidoEnPreparacion';
import { useAuth } from './hooks/useAuth';
import { usePedidosRestaurante } from './hooks/usePedidosRestaurante';
import {
  requestPushPermission,
  unlockAudio,
  pedirWakeLock,
  instalarWakeLockListener,
  stopAllAlerts,
} from './lib/notifications';

function Panel({ restaurante, onLogout }) {
  const { entrantes, enPreparacion, cargando } = usePedidosRestaurante(restaurante);

  // Permisos de notificación y wake lock al montar.
  useEffect(() => {
    requestPushPermission();
    pedirWakeLock();
    instalarWakeLockListener();
  }, []);

  // Desbloquear audio con el primer gesto del usuario.
  useEffect(() => {
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

  if (cargando) {
    return (
      <div className="h-full flex flex-col">
        <Header restaurante={restaurante} onLogout={onLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="text-dewan font-black text-2xl">DEWAN</span>
            <div className="mt-4 w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  const sinPedidos = entrantes.length === 0 && enPreparacion.length === 0;

  return (
    <div className="h-full flex flex-col">
      <Header restaurante={restaurante} onLogout={onLogout} />

      <div className="flex-1 overflow-y-auto pb-8">
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

        {sinPedidos && (
          <div className="h-full flex flex-col items-center justify-center px-6 text-center mt-20">
            <p className="text-7xl mb-4">🍽️</p>
            <h2 className="text-white font-bold text-xl mb-2">Esperando pedidos…</h2>
            <p className="text-gray-400 text-sm max-w-xs">
              Mantén esta pantalla abierta. Los pedidos sonarán al entrar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const { restaurante, cargando, login, logout } = useAuth();

  if (cargando) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <span className="text-dewan font-black text-2xl">DEWAN</span>
          <div className="mt-4 w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!restaurante) {
    return <LoginScreen onLogin={login} />;
  }

  return <Panel restaurante={restaurante} onLogout={logout} />;
}
