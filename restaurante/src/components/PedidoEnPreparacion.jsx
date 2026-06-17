import { useEffect, useState } from 'react';
import { calcularPagoAlRestaurante, formatDinero } from '../lib/formato';
import { hayImpresion, imprimirComanda } from '../lib/comanda';
import { MODO_HP } from '../lib/config';
import { marcarEntregado } from '../lib/pedidos';

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
  const [cargando, setCargando] = useState(false);

  const marcarListo = async () => {
    setCargando(true);
    try {
      await marcarEntregado(pedido.id);
    } catch (e) {
      console.error('Error al marcar listo:', e);
      alert('No se pudo marcar como listo. Intenta de nuevo.');
      setCargando(false);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      setRestante(calcularRestante(pedido.timer_lanzamiento));
    }, 1000);
    return () => clearInterval(id);
  }, [pedido.timer_lanzamiento]);

  const vencido = restante !== null && restante < 0;
  const color = vencido ? 'text-nuevo' : 'text-preparando';

  // ── Tarjeta Happy Pollo (con botón "Marcar listo", sin bloque DEWAN) ──
  if (MODO_HP) {
    return (
      <div className={`bg-tarjeta rounded-2xl border-l-4 border-preparando p-4 shadow-lg ${cargando ? 'opacity-60 pointer-events-none' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline gap-2.5">
            <span className="marca-title text-preparando text-2xl leading-none">#{pedido.id}</span>
            <span className="bg-preparando text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full tracking-wider">PREPARANDO</span>
          </div>
          <div className={`marca-title text-2xl tabular-nums ${color}`}>{formatear(restante)}</div>
        </div>

        <p className="text-sm text-white whitespace-pre-line border-y border-borde py-2 my-2">
          {pedido.detalle_pedido}
        </p>

        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-gray-400">Cliente:</span>
          <span className="text-white font-bold">{pedido.cliente_nombre || '—'}</span>
          {pedido.tiempo_preparacion && (
            <span className="ml-auto text-gray-400">⏱ {pedido.tiempo_preparacion} min</span>
          )}
        </div>

        {(pedido.metodo_pago || pedido.factura_datos) && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {pedido.metodo_pago && (
              <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${/transfer/i.test(pedido.metodo_pago) ? 'bg-nuevo text-white' : 'bg-bg2 text-dewan border border-borde'}`}>
                {/transfer/i.test(pedido.metodo_pago) ? '💳 TRANSFERENCIA' : '💵 Efectivo'}
              </span>
            )}
            {pedido.factura_datos && (
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-preparando text-white">🧾 FACTURA</span>
            )}
          </div>
        )}

        {vencido && (
          <div className="mb-2 text-xs text-nuevo font-bold animate-pulse">⚠️ Tiempo de preparación cumplido</div>
        )}

        <div className="flex gap-2">
          {hayImpresion() && (
            <button
              onClick={() => imprimirComanda(pedido, { restauranteNombre: pedido.restaurante || pedido.restaurante_nombre })}
              className="bg-bg2 text-dewan font-bold px-4 py-3 rounded-xl border border-borde active:scale-95 flex items-center gap-2"
            >
              🖨️ Reimprimir
            </button>
          )}
          <button
            onClick={marcarListo}
            disabled={cargando}
            className="flex-1 bg-dewan text-white font-extrabold py-3 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md"
          >
            ✓ Marcar listo
          </button>
        </div>
      </div>
    );
  }

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
