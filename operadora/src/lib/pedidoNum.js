// Numero visible del pedido, comun a toda la operadora.
// Sale de la columna `codigo_pedido` (formato PREFIJO-NUMERO, ej. RYO-1042), que
// la BD llena al crear el pedido y que es EL MISMO que ve el local en su panel,
// el motorizado en su app y el cliente en su link de seguimiento.
// Aqui se muestra completo (con prefijo) porque la operadora coordina pedidos de
// varios locales a la vez y el prefijo es lo que los distingue.
// Fallback: pedidos viejos (o una BD sin el SQL de codigos) muestran "#id".
export function codigoPedido(pedido) {
  if (!pedido) return '';
  const cod = pedido.codigo_pedido ? String(pedido.codigo_pedido).trim() : '';
  return cod || `#${pedido.id}`;
}
