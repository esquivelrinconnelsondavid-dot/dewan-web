import { supabase } from './supabase';

// Acciones del restaurante sobre un pedido.
// Para fase 1 actualizamos directamente la tabla pedidos_delivery.
// La lógica de "buscar motorizado" (cambio a estado 'confirmado' cuando
// se cumple el timer) sigue manejada por el sistema existente.

export async function aceptarPedido(pedidoId, minutos) {
  const ahora = new Date();
  const lanzamiento = new Date(ahora.getTime() + minutos * 60000);

  const { error } = await supabase
    .from('pedidos_delivery')
    .update({
      estado_pedido: 'preparando',
      tiempo_preparacion: minutos,
      timer_lanzamiento: lanzamiento.toISOString(),
      restaurante_aceptado: true,
      restaurante_aceptado_at: ahora.toISOString(),
      // Marcamos también el flag legacy para que la operadora no lo vea
      // como "sin atender" si por alguna razón sigue mirando la lista.
      operadora_atendido: true,
      operadora_atendido_at: ahora.toISOString(),
    })
    .eq('id', pedidoId);

  if (error) throw error;
}

export async function rechazarPedido(pedidoId, motivo) {
  const ahora = new Date().toISOString();
  const { error } = await supabase
    .from('pedidos_delivery')
    .update({
      estado_pedido: 'cancelado',
      restaurante_rechazado: true,
      restaurante_rechazado_at: ahora,
      restaurante_motivo_rechazo: motivo || null,
    })
    .eq('id', pedidoId);

  if (error) throw error;
}
