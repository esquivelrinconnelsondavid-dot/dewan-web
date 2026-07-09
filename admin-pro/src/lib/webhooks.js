const BASE = import.meta.env.VITE_N8N_WEBHOOK_BASE;

async function llamar(ruta, body) {
  if (!BASE) throw new Error('VITE_N8N_WEBHOOK_BASE no configurado');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(`${BASE}/${ruta}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await res.text();
    return text ? JSON.parse(text) : { ok: true };
  } catch (e) {
    console.warn(`[WEBHOOK] ${ruta}:`, e?.message || e);
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export function timerRestaurante(pedido, minutos) {
  return llamar('timer-restaurante', {
    pedido_id: pedido.id,
    minutos,
    conversation_id: pedido.conversation_id,
    cliente_nombre: pedido.cliente_nombre,
    restaurante: pedido.restaurante,
    detalle_pedido: pedido.detalle_pedido,
  });
}

export function lanzarMotorizado(pedidoId, auto = false, sucursalId = null) {
  return llamar('lanzar-motorizado', { pedido_id: pedidoId, auto, sucursal_id: sucursalId });
}

// Mismo aviso que dispara la app del moto al aceptar (solo_notificar: el RPC
// aceptar_pedido ya hizo la asignación; esto avisa al cliente por WhatsApp).
export function pedidoAceptado(pedidoId, motorizadoId) {
  return llamar('pedido-aceptado', {
    pedido_id: pedidoId,
    motorizado_id: motorizadoId,
    solo_notificar: true,
  });
}

export function cancelarPedido(pedido, razon = 'Cancelado por admin') {
  return llamar('cancelar-pedido', {
    pedido_id: pedido.id,
    conversation_id: pedido.conversation_id,
    razon,
  });
}

export function restauranteNoPuede(pedido) {
  return llamar('restaurante-no-puede', {
    pedido_id: pedido.id,
    conversation_id: pedido.conversation_id,
  });
}
