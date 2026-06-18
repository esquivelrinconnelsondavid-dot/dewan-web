import { supabase } from './supabase';
import { PEDIDOS_TABLE } from './config';

const WEBHOOK_BASE = import.meta.env.VITE_N8N_WEBHOOK_BASE;
// Happy Pollo: URL directa del webhook de aviso de tiempo. Su instancia de n8n
// NO devuelve headers CORS, así que el aviso se manda como petición "simple"
// (no-cors + text/plain) para esquivar el preflight que el navegador bloquearía.
// DEWAN no setea esta var → mantiene su POST application/json con reintentos.
const TIMER_URL = import.meta.env.VITE_N8N_TIMER_URL || '';

async function avisarClienteTiempo(pedido, minutos) {
  if (!pedido?.conversation_id) return;
  const payload = {
    pedido_id: pedido.id,
    minutos,
    conversation_id: pedido.conversation_id,
    cliente_nombre: pedido.cliente_nombre,
    restaurante: pedido.restaurante,
    detalle_pedido: pedido.detalle_pedido,
  };

  // HP: fire-and-forget. text/plain = petición simple (sin preflight CORS). En
  // no-cors la respuesta es opaca, por eso NO reintentamos mirando resp.ok
  // (evitaría avisos duplicados al cliente); un solo envío basta.
  if (TIMER_URL) {
    try {
      await fetch(TIMER_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (e) {
      console.warn('[avisarCliente HP] no se pudo avisar', e?.message || e);
    }
    return;
  }

  if (!WEBHOOK_BASE) return;
  const body = JSON.stringify(payload);
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
      .from(PEDIDOS_TABLE)
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
      .from(PEDIDOS_TABLE)
      .select('id, conversation_id, cliente_nombre, restaurante, detalle_pedido')
      .eq('id', pedidoId)
      .maybeSingle();
    if (data) avisarClienteTiempo(data, minutos);
  }
}

// Happy Pollo (delivery propio, sin motos DEWAN): la cocina cierra el pedido a
// mano. Pasa a 'entregado' → sale de la vista de cocina y cuenta como venta.
export async function marcarEntregado(pedidoId) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  let error;
  try {
    ({ error } = await supabase
      .from(PEDIDOS_TABLE)
      .update({ estado_pedido: 'entregado' })
      .eq('id', pedidoId)
      .abortSignal(ctrl.signal));
  } finally {
    clearTimeout(timer);
  }
  if (error) throw error;
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
      .from(PEDIDOS_TABLE)
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
