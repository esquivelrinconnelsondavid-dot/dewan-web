import { supabase } from './supabase';

const WEBHOOK_BASE = import.meta.env.VITE_N8N_WEBHOOK_BASE;

async function avisarClienteTiempo(pedido, minutos) {
  if (!WEBHOOK_BASE || !pedido?.conversation_id) return;
  const body = JSON.stringify({
    pedido_id: pedido.id,
    minutos,
    conversation_id: pedido.conversation_id,
    cliente_nombre: pedido.cliente_nombre,
    restaurante: pedido.restaurante,
    detalle_pedido: pedido.detalle_pedido,
  });
  // Reintenta hasta 3 veces: el aviso al cliente es importante y un blip de red
  // no debe saltearlo (antes era 1 sola llamada sin reintento → a veces no avisaba).
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10000);
      const resp = await fetch(`${WEBHOOK_BASE}/timer-restaurante`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (resp.ok) return;
      console.warn('[avisarCliente] intento', intento, '→ HTTP', resp.status);
    } catch (e) {
      console.warn('[avisarCliente] intento', intento, e?.message || e);
    }
    if (intento < 3) await new Promise((r) => setTimeout(r, 1500 * intento));
  }
  console.error('[avisarCliente] no se pudo avisar tras 3 intentos (pedido', pedido.id, ')');
}

export async function aceptarPedido(pedidoIdOrPedido, minutos) {
  const ahora = new Date();
  const lanzamiento = new Date(ahora.getTime() + minutos * 60000);
  const pedido = typeof pedidoIdOrPedido === 'object' ? pedidoIdOrPedido : null;
  const pedidoId = pedido ? pedido.id : pedidoIdOrPedido;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  let error;
  try {
    ({ error } = await supabase
      .from('pedidos_delivery')
      .update({
        estado_pedido: 'preparando',
        tiempo_preparacion: minutos,
        timer_lanzamiento: lanzamiento.toISOString(),
        restaurante_aceptado: true,
        restaurante_aceptado_at: ahora.toISOString(),
        operadora_atendido: true,
        operadora_atendido_at: ahora.toISOString(),
      })
      .eq('id', pedidoId)
      .abortSignal(ctrl.signal));
  } finally {
    clearTimeout(timer);
  }

  if (error) throw error;

  if (pedido) {
    avisarClienteTiempo(pedido, minutos);
  } else {
    const { data } = await supabase
      .from('pedidos_delivery')
      .select('id, conversation_id, cliente_nombre, restaurante, detalle_pedido')
      .eq('id', pedidoId)
      .maybeSingle();
    if (data) avisarClienteTiempo(data, minutos);
  }
}

export async function rechazarPedido(pedidoId, motivo) {
  const ahora = new Date().toISOString();
  // Timeout 12s: igual que aceptarPedido. Sin esto, con la red zombi el update
  // se cuelga y la tarjeta queda en "cargando" para siempre.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  let error;
  try {
    ({ error } = await supabase
      .from('pedidos_delivery')
      .update({
        estado_pedido: 'cancelado',
        restaurante_rechazado: true,
        restaurante_rechazado_at: ahora,
        restaurante_motivo_rechazo: motivo || null,
      })
      .eq('id', pedidoId)
      .abortSignal(ctrl.signal));
  } finally {
    clearTimeout(timer);
  }

  if (error) throw error;
}
