import { useEffect, useState } from 'react';
import { aceptarPedido, rechazarPedido } from '../lib/pedidos';
import { stopAlertLoop } from '../lib/notifications';

const TIEMPOS_PRESET = [10, 15, 20, 30, 45];

function tiempoSinAtender(fechaCreacion) {
  const diff = Date.now() - new Date(fechaCreacion).getTime();
  const seg = Math.floor(diff / 1000);
  if (seg < 60) return `${seg}s`;
  return `${Math.floor(seg / 60)}m ${seg % 60}s`;
}

export default function PedidoEntrante({ pedido }) {
  const [cargando, setCargando] = useState(false);
  const [tiempoTexto, setTiempoTexto] = useState(tiempoSinAtender(pedido.fecha_creacion));

  useEffect(() => {
    const id = setInterval(() => {
      setTiempoTexto(tiempoSinAtender(pedido.fecha_creacion));
    }, 1000);
    return () => clearInterval(id);
  }, [pedido.fecha_creacion]);

  const aceptar = async (minutos) => {
    setCargando(true);
    try {
      await aceptarPedido(pedido.id, minutos);
      stopAlertLoop(pedido.id);
    } catch (e) {
      console.error('Error al aceptar:', e);
      alert('No se pudo aceptar el pedido. Intenta de nuevo.');
    }
    setCargando(false);
  };

  const rechazar = async () => {
    const motivo = prompt('¿Por qué no pueden preparar este pedido? (opcional)') || '';
    if (motivo === null) return;
    if (!confirm('¿Confirmas que NO pueden preparar este pedido?')) return;
    setCargando(true);
    try {
      await rechazarPedido(pedido.id, motivo);
      stopAlertLoop(pedido.id);
    } catch (e) {
      console.error('Error al rechazar:', e);
      alert('No se pudo rechazar. Intenta de nuevo.');
    }
    setCargando(false);
  };

  return (
    <div
      className={`bg-tarjeta rounded-xl border-l-4 border-nuevo p-4 animate-pulso ${
        cargando ? 'opacity-60 pointer-events-none' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-bold text-nuevo">#{pedido.id}</span>
          <h3 className="text-base font-bold text-white leading-tight mt-0.5">
            Nuevo pedido
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400">{tiempoTexto}</span>
        </div>
      </div>

      <div className="bg-fondo/40 rounded-lg p-3 mb-3">
        <p className="text-sm text-white whitespace-pre-line">{pedido.detalle_pedido}</p>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <span className="text-gray-500">Cliente:</span>
        <span className="text-gray-200 font-semibold">{pedido.cliente_nombre || '—'}</span>
        {pedido.cliente_telefono && (
          <a
            href={`tel:${pedido.cliente_telefono}`}
            className="ml-auto text-buscando font-semibold active:opacity-70"
          >
            📞 {pedido.cliente_telefono}
          </a>
        )}
      </div>

      {pedido.direccion_entrega && (
        <div className="text-[11px] text-gray-400 mb-3 truncate">
          🏠 <span className="text-gray-300">{pedido.direccion_entrega}</span>
        </div>
      )}

      <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">
        Tiempo de preparación
      </div>
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {TIEMPOS_PRESET.map((min) => (
          <button
            key={min}
            onClick={() => aceptar(min)}
            disabled={cargando}
            className="bg-dewan/15 text-dewan text-sm font-bold py-3 rounded-lg active:scale-95 transition-transform border border-dewan/30 hover:bg-dewan/25"
          >
            {min}'
          </button>
        ))}
      </div>

      <button
        onClick={rechazar}
        disabled={cargando}
        className="w-full bg-nuevo/10 text-nuevo text-xs font-bold py-2.5 rounded-lg active:scale-95 border border-nuevo/30"
      >
        No podemos preparar este pedido
      </button>
    </div>
  );
}
