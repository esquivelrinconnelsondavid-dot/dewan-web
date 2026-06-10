import { supabase, consultarConTimeout } from './supabase';

export const STORAGE_TOKEN = 'dewan_rest_token';
export const STORAGE_REST = 'dewan_rest_data';

// Trae datos extra del restaurante (logo, dirección, horario, etc.) que la RPC no incluye.
async function enriquecerConPerfil(restaurante) {
  if (!restaurante?.restaurante_id) return restaurante;
  try {
    const { data, error } = await consultarConTimeout(
      supabase
        .from('restaurantes')
        .select('logo_url, direccion, horario, categoria, telefono, tipo_restaurante, activo')
        .eq('id', restaurante.restaurante_id)
        .maybeSingle()
    );
    if (error || !data) return restaurante;
    return { ...restaurante, ...data };
  } catch (e) {
    console.warn('[enriquecerConPerfil]', e?.message || e);
    return restaurante;
  }
}

/**
 * Inicia sesión usando el código de 6 dígitos del restaurante.
 * Si es válido, guarda el token y los datos del restaurante en localStorage.
 * Retorna el objeto { restaurante_id, nombre, token } o null si falla.
 */
export async function loginConCodigo(codigo, nombreDispositivo) {
  try {
    const { data, error } = await consultarConTimeout(
      supabase.rpc('verificar_codigo_restaurante', {
        codigo,
        dispositivo_nombre: nombreDispositivo,
      })
    );

    if (error || !data) {
      console.error('Error al verificar código:', error);
      return null;
    }

    // La RPC puede retornar un objeto o un array con un objeto
    const raw = Array.isArray(data) ? data[0] : data;
    if (!raw || !raw.token) return null;
    // Normalizar el id: algunas RPC lo devuelven como `id`. El resto de la app
    // (enriquecerConPerfil, registro de push, cache) depende de `restaurante_id`.
    const restaurante = { ...raw, restaurante_id: raw.restaurante_id ?? raw.id };

    const conDispositivo = { ...restaurante, dispositivo_nombre: nombreDispositivo };
    const enriquecido = await enriquecerConPerfil(conDispositivo);
    localStorage.setItem(STORAGE_TOKEN, restaurante.token);
    localStorage.setItem(STORAGE_REST, JSON.stringify(enriquecido));
    return enriquecido;
  } catch (e) {
    console.error('Excepción en loginConCodigo:', e);
    return null;
  }
}

/**
 * Lee el token guardado y consulta al servidor para reanudar la sesión.
 * Si sigue válido retorna el restaurante; si no, limpia y retorna null.
 */
export async function obtenerSesion() {
  const token = localStorage.getItem(STORAGE_TOKEN);
  if (!token) return null;

  try {
    const { data, error } = await consultarConTimeout(
      supabase.rpc('restaurante_por_token', {
        p_token: token,
      })
    );

    // OJO: NO borramos la sesión aquí. Un `error` puede ser un bache de red en
    // arranque frío; borrar desloguearía al local injustamente. Devolvemos null
    // y dejamos que useAuth siga operando con la sesión cacheada. El "Salir"
    // manual es lo único que cierra sesión.
    if (error || !data) {
      return null;
    }

    const raw = Array.isArray(data) ? data[0] : data;
    if (!raw) {
      return null;
    }
    const restaurante = { ...raw, restaurante_id: raw.restaurante_id ?? raw.id };

    // Mantener token y nombre de dispositivo (si estaba guardado)
    let dispositivo_nombre;
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_REST) || '{}');
      dispositivo_nombre = prev.dispositivo_nombre;
    } catch (e) {
      // ignorar
    }
    const conToken = { ...restaurante, token, dispositivo_nombre };
    const enriquecido = await enriquecerConPerfil(conToken);
    localStorage.setItem(STORAGE_REST, JSON.stringify(enriquecido));
    return enriquecido;
  } catch (e) {
    console.error('Excepción en obtenerSesion:', e);
    return null; // bache de red: no borrar sesión, useAuth sigue con la cache
  }
}

export function cerrarSesion() {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_REST);
}
