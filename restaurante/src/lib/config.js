// Config por marca (DEWAN / Happy Pollo), inyectada en build-time vía Vite env.
// Por defecto = DEWAN: el build actual NO cambia en nada (mismos valores de hoy).
//   VITE_PEDIDOS_TABLE  → tabla de pedidos a leer/escribir (def: pedidos_delivery)
//   VITE_MODO_HP=true   → el local cobra lo que vende (oculta comisión/markup DEWAN)
//   VITE_MARCA          → etiqueta de marca para branding del panel (def: DEWAN)
export const PEDIDOS_TABLE = import.meta.env.VITE_PEDIDOS_TABLE || 'pedidos_delivery';
export const MODO_HP = String(import.meta.env.VITE_MODO_HP) === 'true';
export const MARCA = import.meta.env.VITE_MARCA || 'DEWAN';

// Código visible del pedido. El bot genera un código (ej. "CV-123456") que ya
// recibió el cliente; si está guardado en la fila (codigo_pedido), lo mostramos
// para que cliente y cocina vean el MISMO código. Si no, caemos al # de fila.
export function codigoPedido(pedido) {
  return (pedido && pedido.codigo_pedido) ? pedido.codigo_pedido : `#${pedido ? pedido.id : ''}`;
}
