import { useEffect, useState } from 'react';
import { calcularPagoAlRestaurante, formatDinero } from '../lib/formato';
import { hayImpresion, imprimirComanda } from '../lib/comanda';

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

      <p className="text-xs text-gray-300 whitespace-pre-line mb-2">
        {pedido.detalle_pedido}
      </p>

      {(() => {
        // clientePaga = lo que pagó el cliente (CON markup DEWAN).
        // base = tu venta real (SIN markup), lo relevante para el local.
        const { clientePaga, total: base, comision, laPagaRestaurante, recibe } =
          calcularPagoAlRestaurante(pedido);
        if (base <= 0) return null;
        return (
          <div className="bg-fondo/60 border border-borde rounded-lg p-2.5 mb-2 text-[11px]">
            <div className="flex justify-between text-gray-300">
              <span>Tu venta</span>
              <span className="font-semibold text-white">{formatDinero(base)}</span>
            </div>
            {laPagaRestaurante && (
              <div className="flex justify-between text-gray-400">
                <span>Comisión (la pagas tú)</span>
                <span>− {formatDinero(comision)}</span>
              </div>
            )}
            <div className="flex justify-between mt-1 pt-1 border-t border-borde">
              <span className="text-dewan font-bold uppercase tracking-wider">
                Motorizado te entrega
              </span>
              <span className="text-dewan font-bold text-sm">{formatDinero(recibe)}</span>
            </div>
          </div>
        );
      })()}

      <div className="flex items-center gap-2 text-[11px] text-gray-400">
        <span>{pedido.cliente_nombre || '—'}</span>
        {pedido.tiempo_preparacion && (
          <span className="ml-auto text-gray-500">
            Tiempo: {pedido.tiempo_preparacion} min
          </span>
        )}
        {hayImpresion() && (
          <button
            onClick={() => imprimirComanda(pedido, { restauranteNombre: pedido.restaurante || pedido.restaurante_nombre })}
            title="Reimprimir comanda"
            className={`${pedido.tiempo_preparacion ? '' : 'ml-auto'} text-sm px-1.5 py-0.5 rounded border border-borde active:scale-95`}
          >
            🖨️
          </button>
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
