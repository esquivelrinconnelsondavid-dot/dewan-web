import { useEffect, useState } from 'react';

function calcularRestante(timerLanzamiento) {
  if (!timerLanzamiento) return null;
  const ms = new Date(timerLanzamiento).getTime() - Date.now();
  return ms;
}

function formatear(ms) {
  if (ms === null) return '—';
  const negativo = ms < 0;
  const abs = Math.abs(ms);
  const min = Math.floor(abs / 60000);
  const seg = Math.floor((abs % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${negativo ? '+' : ''}${pad(min)}:${pad(seg)}`;
}

export default function PedidoEnPreparacion({ pedido }) {
  const [restante, setRestante] = useState(calcularRestante(pedido.timer_lanzamiento));

  useEffect(() => {
    const id = setInterval(() => {
      setRestante(calcularRestante(pedido.timer_lanzamiento));
    }, 1000);
    return () => clearInterval(id);
  }, [pedido.timer_lanzamiento]);

  const vencido = restante !== null && restante < 0;
  const color = vencido ? 'text-nuevo' : 'text-preparando';

  return (
    <div className="bg-tarjeta rounded-xl border-l-4 border-preparando p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-preparando">#{pedido.id}</span>
          <h3 className="text-sm font-bold text-white leading-tight">
            En preparación
          </h3>
        </div>
        <div className={`text-2xl font-black tabular-nums ${color}`}>
          {formatear(restante)}
        </div>
      </div>

      <p className="text-xs text-gray-300 whitespace-pre-line line-clamp-3 mb-2">
        {pedido.detalle_pedido}
      </p>

      <div className="flex items-center gap-2 text-[11px] text-gray-400">
        <span>{pedido.cliente_nombre || '—'}</span>
        {pedido.tiempo_preparacion && (
          <span className="ml-auto text-gray-500">
            Tiempo asignado: {pedido.tiempo_preparacion} min
          </span>
        )}
      </div>

      {vencido && (
        <div className="mt-2 text-[11px] text-nuevo font-bold animate-pulse">
          ⚠️ Tiempo de preparación cumplido
        </div>
      )}
    </div>
  );
}
