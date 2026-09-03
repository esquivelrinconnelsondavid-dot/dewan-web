// Config por marca (DEWAN / Happy Pollo / EL SISTEMA), inyectada en build-time vía Vite env.
// Por defecto = DEWAN: el build actual NO cambia en nada (mismos valores de hoy).
//   VITE_PEDIDOS_TABLE  → tabla de pedidos a leer/escribir (def: pedidos_delivery)
//   VITE_MODO_HP=true   → el local cobra lo que vende (oculta comisión/markup DEWAN)
//   VITE_MARCA          → etiqueta de marca para branding del panel (def: DEWAN)
//   VITE_MODO_SISTEMA=true → panel del SISTEMA vendido a locales (tabla única pedidos_sistema,
//                         marca neutra, colores del local desde la BD, botón Salió/Listo que
//                         avisa al cliente por WhatsApp). Implica MODO_HP (cobra lo que vende).
//   VITE_N8N_TIMER_PATH / VITE_N8N_SALIO_PATH / VITE_N8N_RECHAZO_PATH → rutas de los webhooks
//                         de avisos al cliente bajo VITE_N8N_WEBHOOK_BASE (def: timer-restaurante / — / —)
export const PEDIDOS_TABLE = import.meta.env.VITE_PEDIDOS_TABLE || 'pedidos_delivery';
export const MODO_SISTEMA = String(import.meta.env.VITE_MODO_SISTEMA) === 'true';
export const MODO_HP = String(import.meta.env.VITE_MODO_HP) === 'true' || MODO_SISTEMA;
export const MARCA = import.meta.env.VITE_MARCA || 'DEWAN';
export const TIMER_PATH = import.meta.env.VITE_N8N_TIMER_PATH || 'timer-restaurante';
export const SALIO_PATH = import.meta.env.VITE_N8N_SALIO_PATH || '';
export const RECHAZO_PATH = import.meta.env.VITE_N8N_RECHAZO_PATH || '';

// Número visible del pedido. Sale de la columna `codigo_pedido`, que la BD llena
// sola al crear el pedido con el formato PREFIJO-NÚMERO (ej. RYO-1042) y que el
// pedido gemelo de DEWAN COPIA tal cual → el motorizado ve el MISMO número que el local.
// - Happy Pollo / sistema (el local): ve solo su número → "#1042". Es el que canta
//   por teléfono y el que va en la comanda; el prefijo no le aporta nada porque
//   todos sus pedidos son suyos.
// - DEWAN (moto/operadora): ve el código completo → "RYO-1042", porque le entran
//   pedidos de varios locales a la vez y necesita distinguirlos.
// Fallback: si `codigo_pedido` viene vacío (pedidos viejos, o el SQL de códigos
// todavía no corrió), muestra el número de fila de siempre → nada se rompe.
export function codigoPedido(pedido) {
  if (!pedido) return '';
  const cod = pedido.codigo_pedido ? String(pedido.codigo_pedido).trim() : '';
  if (MODO_HP) return cod ? `#${cod.split('-').pop()}` : `#${pedido.id}`;
  return cod || `#${pedido.id}`;
}

// ¿El pedido es a domicilio? (sistema: columna tipo_entrega; HP legado: por la dirección)
export function esDomicilio(pedido) {
  if (!pedido) return false;
  if (pedido.tipo_entrega) return pedido.tipo_entrega === 'domicilio';
  if (pedido.requiere_ubicacion === false) return false;
  return !!pedido.direccion_entrega;
}
