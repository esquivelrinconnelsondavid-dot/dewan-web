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
