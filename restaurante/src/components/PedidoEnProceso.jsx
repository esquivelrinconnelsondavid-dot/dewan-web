import { formatDinero as formatearMoneda } from '../lib/formato';

const LABELS = {
  confirmado: 'Buscando motorizado',
  asignado: 'Motorizado asignado',
  aceptado: 'Motorizado en camino al local',
  en_camino_recogida: 'Motorizado yendo al local',
  en_camino_entrega: 'Motorizado yendo al cliente',
  en_camino: 'En camino al cliente',
  recogido: 'Pedido recogido',
  llegado: 'Motorizado llegó al cliente',
};

const COLORES = {
  confirmado: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  asignado: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  aceptado: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  en_camino_recogida: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  en_camino_entrega: 'bg-green-500/15 text-green-300 border-green-500/30',
  en_camino: 'bg-green-500/15 text-green-300 border-green-500/30',
  recogido: 'bg-green-500/15 text-green-300 border-green-500/30',
  llegado: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
};

export default function PedidoEnProceso({ pedido }) {
  const label = LABELS[pedido.estado_pedido] || pedido.estado_pedido;
  const colorCls = COLORES[pedido.estado_pedido] || 'bg-gray-500/15 text-gray-300 border-gray-500/30';
  const moto = pedido.nombre_moto;
  const tel = pedido.telefono_moto;
  // Venta base del local (SIN markup DEWAN): precio_base_productos, o fallback
  // histórico monto_total - markup_dewan cuando precio_base_productos es null.
  const total =
    pedido.precio_base_productos !== null && pedido.precio_base_productos !== undefined
      ? Number(pedido.precio_base_productos) || 0
      : (Number(pedido.monto_total) || 0) - (Number(pedido.markup_dewan) || 0);

  return (
    <div className="bg-tarjeta border border-borde rounded-xl p-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">#{pedido.id}</p>
          <p className="text-sm font-bold text-white leading-tight truncate">
            {pedido.cliente_nombre || 'Cliente'}
          </p>
          <p className="text-[11px] text-gray-400 truncate">{pedido.detalle_pedido || ''}</p>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded border whitespace-nowrap ${colorCls}`}>
          {label}
        </span>
      </div>

      {moto && (
        <div className="border-t border-borde pt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-bg3 flex items-center justify-center shrink-0">
              <span className="text-base">🏍️</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white font-bold truncate">{moto}</p>
              {tel && <p className="text-[10px] text-gray-400">{tel}</p>}
            </div>
          </div>
          {tel && (
            <a
              href={`tel:${tel}`}
              className="text-[11px] bg-encamino text-white font-bold px-3 py-1.5 rounded-lg"
            >
              Llamar
            </a>
          )}
        </div>
      )}

      {total > 0 && (
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-borde">
          <span>Tu venta (base)</span>
          <span className="text-white font-bold">{formatearMoneda(total)}</span>
        </div>
      )}
    </div>
  );
}
