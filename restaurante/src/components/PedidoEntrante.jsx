import { useEffect, useState } from 'react';
import { aceptarPedido, rechazarPedido } from '../lib/pedidos';
import { stopAlertLoop } from '../lib/notifications';
import { calcularPagoAlRestaurante, formatDinero } from '../lib/formato';
import { hayImpresion, getConfigImpresora, imprimirComanda } from '../lib/comanda';

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
