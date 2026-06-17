import { useEffect, useState } from 'react';
import { aceptarPedido, rechazarPedido } from '../lib/pedidos';
import { stopAlertLoop } from '../lib/notifications';
import { calcularPagoAlRestaurante, formatDinero } from '../lib/formato';
import { hayImpresion, getConfigImpresora, imprimirComanda } from '../lib/comanda';
import { MODO_HP } from '../lib/config';

const TIEMPOS_PRESET = [10, 15, 20, 30, 45];

// Convierte el detalle (texto multilínea del pedido) en líneas con la cantidad
// resaltada, igual que la comanda. Para la tarjeta HP.
function renderItemsHP(detalle) {
  const lineas = String(detalle == null ? '' : detalle)
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l) => l.trim());
  if (!lineas.length) return null;
  const hayPlatos = lineas.some((l) => /^\s*\d+\s*x\b/i.test(l));
  return lineas.map((raw, i) => {
    const t = raw.trim();
    const esPlato = hayPlatos ? /^\s*\d+\s*x\b/i.test(t) : true;
    if (esPlato) {
      const m = t.match(/^\s*(\d+)\s*x\s*(.+)$/i);
      return (
        <div key={i} className="flex gap-2 py-1 items-baseline">
          <span className="marca-title text-preparando text-base shrink-0">{m ? `${m[1]}x` : '•'}</span>
          <span className="font-semibold text-white">{m ? m[2] : t}</span>
        </div>
      );
    }
    return (
      <div key={i} className="pl-7 -mt-0.5 text-sm text-gray-400">
        {t.replace(/^[-•▸*\s]+/, '— ')}
      </div>
    );
  });
}

function tiempoSinAtender(fechaCreacion) {
  const diff = Date.now() - new Date(fechaCreacion).getTime();
  const seg = Math.floor(diff / 1000);
  if (seg < 60) return `${seg}s`;
  return `${Math.floor(seg / 60)}m ${seg % 60}s`;
}

export default function PedidoEntrante({ pedido }) {
  const [cargando, setCargando] = useState(false);
  const [tiempoTexto, setTiempoTexto] = useState(tiempoSinAtender(pedido.fecha_creacion));
  const [min, setMin] = useState(20); // tiempo elegido (tarjeta HP)

  useEffect(() => {
    const id = setInterval(() => {
      setTiempoTexto(tiempoSinAtender(pedido.fecha_creacion));
    }, 1000);
    return () => clearInterval(id);
  }, [pedido.fecha_creacion]);

  const aceptar = async (minutos) => {
    setCargando(true);
    try {
      await aceptarPedido(pedido, minutos);
      stopAlertLoop(pedido.id);
      // Imprime la comanda automáticamente si está activado (solo en PC).
      if (hayImpresion() && getConfigImpresora().auto) {
        imprimirComanda({ ...pedido, tiempo_preparacion: minutos }, {
          restauranteNombre: pedido.restaurante || pedido.restaurante_nombre,
        }).catch(() => {});
      }
    } catch (e) {
      console.error('Error al aceptar:', e);
      alert('No se pudo aceptar el pedido. Revisa tu conexion e intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const imprimir = async () => {
    await imprimirComanda(pedido, { restauranteNombre: pedido.restaurante || pedido.restaurante_nombre });
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

  // ── Tarjeta Happy Pollo (sin bloque de comisión/motorizado DEWAN) ──
  if (MODO_HP) {
    const esDelivery = !!pedido.direccion_entrega;
    const monto = Number(pedido.monto_total) || 0;
    const esTransfer = /transfer/i.test(pedido.metodo_pago || '');
    return (
      <div
        className={`bg-tarjeta rounded-2xl border-2 border-nuevo p-4 animate-pulso shadow-lg ${
          cargando ? 'opacity-60 pointer-events-none' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline gap-2.5">
            <span className="marca-title text-dewan text-3xl leading-none">#{pedido.id}</span>
            <span className="bg-nuevo text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full tracking-wider">NUEVO</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-dewan text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full">
              {esDelivery ? '🛵 DELIVERY' : '🏠 RETIRO'}
            </span>
            <span className="text-[11px] text-gray-400">{tiempoTexto}</span>
          </div>
        </div>

        <div className="border-y border-borde py-2 my-2">
          {renderItemsHP(pedido.detalle_pedido)}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-2">
          <span className="text-gray-400">Cliente:</span>
          <span className="text-white font-bold">{pedido.cliente_nombre || '—'}</span>
          {esDelivery && <span className="text-gray-400">📍 {pedido.direccion_entrega}</span>}
        </div>

        {(pedido.metodo_pago || pedido.factura_datos) && (
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {pedido.metodo_pago && (
              <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${esTransfer ? 'bg-nuevo text-white' : 'bg-bg2 text-dewan border border-borde'}`}>
                {esTransfer ? '💳 TRANSFERENCIA' : '💵 Efectivo'}
              </span>
            )}
            {pedido.factura_datos && (
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-preparando text-white">🧾 FACTURA</span>
            )}
          </div>
        )}
        {pedido.factura_datos && (
          <div className="bg-bg2 border border-borde rounded-lg px-3 py-2 mb-2 text-xs text-gray-400 whitespace-pre-line">
            {pedido.factura_datos}
          </div>
        )}

        {monto > 0 && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 font-semibold">Total del pedido</span>
            <span className="marca-title text-dewan text-2xl">{formatDinero(monto)}</span>
          </div>
        )}

        <div className="text-xs text-gray-400 mb-1.5 font-bold uppercase tracking-wider">Tiempo de preparación</div>
        <div className="grid grid-cols-5 gap-1.5 mb-3">
          {TIEMPOS_PRESET.map((m) => (
            <button
              key={m}
              onClick={() => setMin(m)}
              disabled={cargando}
              className={`text-sm font-extrabold py-2.5 rounded-xl border transition-colors ${
                min === m
                  ? 'bg-dewan text-white border-dewan'
                  : 'bg-bg2 text-dewan border-borde'
              }`}
            >
              {m}′
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={rechazar}
            disabled={cargando}
            className="bg-tarjeta text-dewan font-bold px-4 py-3.5 rounded-xl border-2 border-borde active:scale-95"
          >
            Rechazar
          </button>
          <button
            onClick={() => aceptar(min)}
            disabled={cargando}
            className="flex-1 bg-gradient-to-b from-[#F2CB08] to-[#F39F07] text-[#3F2310] font-extrabold py-3.5 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md"
          >
            🖨️ Aceptar e imprimir
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-nuevo/10 rounded-xl border-2 border-nuevo p-4 animate-pulso shadow-lg shadow-nuevo/30 ${
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
        <div className="text-right flex items-center gap-2">
          <span className="text-xs text-gray-400">{tiempoTexto}</span>
          {hayImpresion() && (
            <button
              onClick={imprimir}
              title="Imprimir comanda"
              className="text-base px-2 py-1 rounded-lg bg-fondo/60 border border-borde active:scale-95"
            >
              🖨️
            </button>
          )}
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

      {(() => {
        // clientePaga = lo que pagó el cliente (CON markup DEWAN).
        // base = tu venta real (SIN markup), que es lo relevante para el local.
        const { clientePaga, total: base, comision, laPagaRestaurante, recibe } =
          calcularPagoAlRestaurante(pedido);
        if (base <= 0) return null;
        return (
          <div className="bg-fondo/60 border border-borde rounded-lg p-3 mb-3 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Tu venta</span>
              <span className="font-semibold text-white">{formatDinero(base)}</span>
            </div>
            {laPagaRestaurante ? (
              <>
                <div className="flex justify-between text-gray-400 mt-1">
                  <span>Comisión DEWAN (la pagas tú)</span>
                  <span>− {formatDinero(comision)}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-borde">
                  <span className="text-dewan font-bold uppercase tracking-wider">
                    El motorizado te entrega
                  </span>
                  <span className="text-dewan font-bold text-base">{formatDinero(recibe)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between mt-2 pt-2 border-t border-borde">
                <span className="text-dewan font-bold uppercase tracking-wider">
                  El motorizado te entrega
                </span>
                <span className="text-dewan font-bold text-base">{formatDinero(recibe)}</span>
              </div>
            )}
            {!laPagaRestaurante && comision > 0 && (
              <p className="text-[10px] text-gray-500 mt-1">
                Comisión {formatDinero(comision)} la paga el cliente aparte.
              </p>
            )}
          </div>
        );
      })()}

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
