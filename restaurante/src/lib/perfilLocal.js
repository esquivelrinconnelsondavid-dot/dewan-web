import { supabase } from './supabase';
import { STORAGE_TOKEN } from './auth';

const BUCKET = 'restaurantes';

// Sube un archivo de logo al bucket `restaurantes` y devuelve la URL pública.
// Path: {restauranteId}/logo-{timestamp}.{ext}
export async function subirLogo(restauranteId, file) {
  if (!restauranteId) throw new Error('Falta restauranteId');
  if (!file) throw new Error('Falta archivo');

  const extDesdeNombre = file.name?.split('.').pop()?.toLowerCase();
  const extDesdeMime = file.type?.split('/')?.[1]?.toLowerCase();
  const ext = (extDesdeNombre && extDesdeNombre.length <= 5 ? extDesdeNombre : extDesdeMime) || 'jpg';
  const path = `logos/${restauranteId}/logo-${Date.now()}.${ext}`;

  const { error: errUp } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type || `image/${ext}` });
  if (errUp) throw errUp;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// Actualiza el perfil del restaurante vía RPC (valida token).
// Campos null no se modifican.
export async function actualizarPerfil({ logo_url = null, horario = null, telefono = null } = {}) {
  const token = localStorage.getItem(STORAGE_TOKEN);
  if (!token) throw new Error('Sesión expirada');

  const { data, error } = await supabase.rpc('actualizar_perfil_restaurante', {
    p_token: token,
    p_logo_url: logo_url,
    p_horario: horario,
    p_telefono: telefono,
  });
  if (error) throw error;
  return data;
}

// ── CIERRE MANUAL (2026-07-16) ─────────────────────────────────────────
// "Se acabó el producto antes de hora": el local se cierra desde la app y
// los clientes lo ven Cerrado al instante. Se REABRE SOLO a medianoche
// (cerrado_hasta), o antes si el local toca "Reabrir ahora".

// Lee el estado actual de cierre manual. Devuelve la fecha (string) o null.
export async function estadoCierre(restauranteId) {
  const { data, error } = await supabase
    .from('restaurantes')
    .select('cerrado_hasta')
    .eq('id', restauranteId)
    .maybeSingle();
  if (error) throw error;
  const hasta = data?.cerrado_hasta || null;
  return hasta && new Date(hasta) > new Date() ? hasta : null;
}

// Cierra (true) o reabre (false) el local. Devuelve cerrado_hasta o null.
export async function cerrarReabrirLocal(cerrar) {
  const token = localStorage.getItem(STORAGE_TOKEN);
  if (!token) throw new Error('Sesión expirada');

  const { data, error } = await supabase.rpc('cerrar_reabrir_local', {
    p_token: token,
    p_cerrar: cerrar,
  });
  if (error) throw error;
  if (data && data.ok === false) {
    throw new Error(data.error === 'sesion_invalida'
      ? 'Sesión expirada: cierra y vuelve a ingresar'
      : 'No se pudo cambiar el estado del local');
  }
  return data?.cerrado_hasta || null;
}
