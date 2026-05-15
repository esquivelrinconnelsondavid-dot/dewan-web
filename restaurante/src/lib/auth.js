import { supabase } from './supabase';

export const STORAGE_TOKEN = 'dewan_rest_token';
export const STORAGE_REST = 'dewan_rest_data';

/**
 * Inicia sesión usando el código de 6 dígitos del restaurante.
 * Si es válido, guarda el token y los datos del restaurante en localStorage.
 * Retorna el objeto { restaurante_id, nombre, token } o null si falla.
 */
export async function loginConCodigo(codigo, nombreDispositivo) {
  try {
    const { data, error } = await supabase.rpc('verificar_codigo_restaurante', {
      codigo,
      dispositivo_nombre: nombreDispositivo,
    });

    if (error || !data) {
      console.error('Error al verificar código:', error);
      return null;
    }

    // La RPC puede retornar un objeto o un array con un objeto
    const restaurante = Array.isArray(data) ? data[0] : data;
    if (!restaurante || !restaurante.token) return null;

    const conDispositivo = { ...restaurante, dispositivo_nombre: nombreDispositivo };
    localStorage.setItem(STORAGE_TOKEN, restaurante.token);
    localStorage.setItem(STORAGE_REST, JSON.stringify(conDispositivo));
    return conDispositivo;
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
    const { data, error } = await supabase.rpc('restaurante_por_token', {
      p_token: token,
    });

    if (error || !data) {
      cerrarSesion();
      return null;
    }

    const restaurante = Array.isArray(data) ? data[0] : data;
    if (!restaurante) {
      cerrarSesion();
      return null;
    }

    // Mantener token y nombre de dispositivo (si estaba guardado)
    let dispositivo_nombre;
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_REST) || '{}');
      dispositivo_nombre = prev.dispositivo_nombre;
    } catch (e) {
      // ignorar
    }
    const conToken = { ...restaurante, token, dispositivo_nombre };
    localStorage.setItem(STORAGE_REST, JSON.stringify(conToken));
    return conToken;
  } catch (e) {
    console.error('Excepción en obtenerSesion:', e);
    cerrarSesion();
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_REST);
}
