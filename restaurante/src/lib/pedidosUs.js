// [19-oct-2026] SEGURIDAD EE.UU. (SQL 051): el Panel EE.UU. ya NO lee ni escribe la tabla `pedidos_us`
// con la llave pública. Antes cualquiera con esa llave (va dentro de las páginas) podía listar los
// nombres, teléfonos y direcciones de los clientes de TODOS los locales de EE.UU.
// Ahora todo pasa por 2 funciones de la base que validan la SESIÓN del Panel (la del código de 6 dígitos,
// tabla locales_us_sesiones) y solo tocan los pedidos de ESE local:
//   us_panel_pedidos(p_token, p_desde, p_hasta, p_estados) → lista (mismas columnas que antes con select *)
//   us_panel_accion(p_token, p_pedido_id, p_accion, p_minutos, p_motivo) → aceptar · rechazar · mas_minutos ·
//                   listo · salio · entregado · cancelar (la base revisa que el paso sea válido)
// Sin realtime (sin permiso de lectura no llegan los cambios): el Panel pregunta cada 5 s y, después de
// cada botón, al instante (evento EVENTO_CAMBIO_US).
// Solo se usa con VITE_US=true. Ecuador (sin la variable) no pasa por aquí.
import { supabase, consultarConTimeout } from './supabase';
import { STORAGE_TOKEN, cerrarSesion } from './auth';

export const EVENTO_CAMBIO_US = 'dewan:pedidos-us-cambio';

function tokenPanel() {
  try { return localStorage.getItem(STORAGE_TOKEN) || ''; } catch { return ''; }
}

// La base dice "sesion_invalida" solo si la sesión ya no existe o el local fue dado de baja:
// se cierra la sesión y vuelve la pantalla del código (antes el Panel seguía viendo todo igual).
let saliendo = false;
function revisarSesion(error) {
  const msj = String(error?.message || '');
  if (!msj.includes('sesion_invalida') || saliendo) return;
  saliendo = true;
  console.warn('[pedidosUs] la sesión del Panel ya no es válida → vuelve al código');
  try { cerrarSesion(); } catch { /* sin almacenamiento */ }
  try { window.location.reload(); } catch { /* nada */ }
}

// Lista los pedidos del local. Devuelve { data, error } igual que una consulta de Supabase.
export async function listarPedidosUs({ desde = null, hasta = null, estados = null } = {}) {
  const res = await consultarConTimeout(
    supabase.rpc('us_panel_pedidos', {
      p_token: tokenPanel(),
      p_desde: desde,
      p_hasta: hasta,
      p_estados: estados,
    })
  );
  if (res.error) revisarSesion(res.error);
  return { data: Array.isArray(res.data) ? res.data : (res.data ? [res.data] : null), error: res.error };
}

// Cambia un pedido del local. Lanza error si la base no lo permite (el Ticket muestra su mensaje).
// Devuelve la fila ya cambiada.
export async function accionPedidoUs(pedidoId, accion, { minutos = null, motivo = null } = {}) {
  const res = await consultarConTimeout(
    supabase.rpc('us_panel_accion', {
      p_token: tokenPanel(),
      p_pedido_id: pedidoId,
      p_accion: accion,
      p_minutos: minutos,
      p_motivo: motivo,
    })
  );
  if (res.error) {
    revisarSesion(res.error);
    throw res.error;
  }
  const fila = Array.isArray(res.data) ? res.data[0] : res.data;
  try { window.dispatchEvent(new CustomEvent(EVENTO_CAMBIO_US, { detail: fila || null })); } catch { /* nada */ }
  return fila || null;
}
