// Config por marca (DEWAN / Happy Pollo), inyectada en build-time vía Vite env.
// Por defecto = DEWAN: el build actual NO cambia en nada (mismos valores de hoy).
//   VITE_PEDIDOS_TABLE  → tabla de pedidos a leer/escribir (def: pedidos_delivery)
//   VITE_MODO_HP=true   → el local cobra lo que vende (oculta comisión/markup DEWAN)
//   VITE_MARCA          → etiqueta de marca para branding del panel (def: DEWAN)
export const PEDIDOS_TABLE = import.meta.env.VITE_PEDIDOS_TABLE || 'pedidos_delivery';
export const MODO_HP = String(import.meta.env.VITE_MODO_HP) === 'true';
export const MARCA = import.meta.env.VITE_MARCA || 'DEWAN';

// Número visible del pedido.
// - Happy Pollo: SIEMPRE el número de fila (#id), igual que la app y el aviso
//   del bot al cliente (el bot confirma "Pedido #N" con ese mismo id). Sin
//   códigos tipo "CV-######".
// - DEWAN: usa el código que generó su bot (codigo_pedido) si existe; si no, #id.
export function codigoPedido(pedido) {
  if (!pedido) return '';
  if (MODO_HP) return `#${pedido.id}`;
  return pedido.codigo_pedido ? pedido.codigo_pedido : `#${pedido.id}`;
}
