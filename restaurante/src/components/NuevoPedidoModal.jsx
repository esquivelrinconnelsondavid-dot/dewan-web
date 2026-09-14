import Ticket from './Ticket';
import { IcoCerrar } from './Iconos';

// Un pedido nuevo toma la pantalla entera (patrón Uber Eats Orders: la tablet se pone
// verde y suena). No desaparece hasta que el local acepta o rechaza; "Ver tablero"
// lo minimiza a la columna Nuevos, donde sigue sonando la alarma de siempre.
export default function NuevoPedidoModal({ pedidos, ocupadoMin, onMinimizar }) {
  if (!pedidos || pedidos.length === 0) return null;
  const pedido = pedidos[0];
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8" style={{ background: 'rgb(var(--c-encamino) / 0.18)', backdropFilter: 'none' }}>
      <div className="absolute inset-0 bg-fondo/70" onClick={onMinimizar} />
      <div className="relative w-full max-w-3xl max-h-full overflow-y-auto rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-4 pb-2 bg-tarjeta rounded-t-2xl border border-b-0 border-encamino/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-nuevo animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-encamino">
              Nuevo pedido{pedidos.length > 1 ? ` · 1 de ${pedidos.length}` : ''}
            </span>
          </div>
          <button onClick={onMinimizar} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white border border-borde rounded-md px-2.5 py-1.5">
            <IcoCerrar size={14} />Ver tablero
          </button>
        </div>
        <div className="bg-tarjeta rounded-b-2xl border border-t-0 border-encamino/40 px-2 pb-2">
          <Ticket pedido={pedido} columna="nuevo" grande ocupadoMin={ocupadoMin} />
        </div>
      </div>
    </div>
  );
}
