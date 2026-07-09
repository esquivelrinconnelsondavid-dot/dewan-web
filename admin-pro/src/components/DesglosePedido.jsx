import { money } from '../lib/time';
import { calcularDesglose } from '../lib/precios';

// Desglose financiero de una carrera: cuánto paga al local, cuánto cobra al
// cliente, comisión, envío y markup. Mismos números que ve el motorizado.
// `compact` reduce el detalle (para listas densas como las carreras del moto).
export default function DesglosePedido({ pedido, compact = false }) {
  const d = calcularDesglose(pedido);
  const quien = d.quienPagaComision;
  const comisionTxt =
    quien === 'restaurante' ? 'la paga el local'
    : quien === 'cliente' ? 'la paga el cliente'
    : quien === 'motorizado' ? 'la paga el moto'
    : '';

  return (
    <div className="text-[10px] space-y-0.5 bg-bg3/40 rounded-lg px-2.5 py-2">
      <div className="flex justify-between">
        <span className="text-gray-400">🏪 Precio del local</span>
        <span className="font-semibold text-gray-200">{money(d.precioBaseProductos)}</span>
      </div>

      {d.comisionRestaurante > 0 && (
        <div className="flex justify-between">
          <span className="text-gray-400">💸 Comisión{comisionTxt ? ` (${comisionTxt})` : ''}</span>
          <span className="font-semibold text-alerta/90">
            {quien === 'restaurante' ? '−' : ''}{money(d.comisionRestaurante)}
          </span>
        </div>
      )}

      <div className="flex justify-between font-bold text-dewan border-t border-borde/50 pt-1 mt-0.5">
        <span>💵 Paga al local</span>
        <span>{money(d.pagarAlLocal)}</span>
      </div>

      <div className="flex justify-between font-bold text-white">
        <span>🧾 Cobra al cliente</span>
        <span>{money(d.cobrarAlCliente)}</span>
      </div>
      {!compact && (
        <div className="text-[9px] text-gray-500 text-right -mt-0.5">
          comida {money(d.precioProducto)} + envío {money(d.precioCarrera)}
          {quien === 'cliente' ? ' + comisión' : ''}
        </div>
      )}

      <div className="flex justify-between text-gray-500 pt-0.5">
        <span>🛵 Envío (carrera)</span>
        <span>{money(d.precioCarrera)}</span>
      </div>
      {d.markupDewan > 0 && (
        <div className="flex justify-between text-gray-500">
          <span>📈 Markup DEWAN</span>
          <span>{money(d.markupDewan)}</span>
        </div>
      )}
    </div>
  );
}
