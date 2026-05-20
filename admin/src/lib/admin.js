import { supabase } from './supabase';

// El PIN admin se guarda en localStorage tras un login exitoso. Los
// wrappers lo leen en cada llamada — así, si el usuario hace logout,
// las siguientes RPCs reciben NULL y la base de datos rechaza.
const PIN_STORAGE_KEY = 'dewan_admin_pin';

function getPin() {
  try {
    return localStorage.getItem(PIN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setPin(pin) {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, pin);
  } catch {
    /* ignore */
  }
}

export function clearPin() {
  try {
    localStorage.removeItem(PIN_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------------------
// Wrappers RPC
// ---------------------------------------------------------------------------

export async function listarRestaurantes(busqueda = null) {
  const pin = getPin();
  const { data, error } = await supabase.rpc('listar_restaurantes_admin', {
    p_admin_pin: pin,
    p_busqueda: busqueda && busqueda.length > 0 ? busqueda : null,
  });
  if (error) {
    console.error('listarRestaurantes error:', error);
    return null;
  }
  return data || [];
}

export async function crearRestaurante({ nombre, telefono = null, categoria = null }) {
  const pin = getPin();
  const { data, error } = await supabase.rpc('crear_restaurante_admin', {
    p_admin_pin: pin,
    p_nombre: nombre,
    p_telefono: telefono,
    p_categoria: categoria,
  });
  if (error) {
    console.error('crearRestaurante error:', error);
    return null;
  }
  return data; // UUID o null
}

export async function asignarCodigo(restauranteId, codigo = null) {
  const pin = getPin();
  const { data, error } = await supabase.rpc('asignar_codigo_admin', {
    p_admin_pin: pin,
    p_restaurante_id: restauranteId,
    p_codigo: codigo,
  });
  if (error) {
    console.error('asignarCodigo error:', error);
    return null;
  }
  return data; // código asignado o null
}

export async function toggleActivo(restauranteId) {
  const pin = getPin();
  const { data, error } = await supabase.rpc('toggle_restaurante_activo', {
    p_admin_pin: pin,
    p_restaurante_id: restauranteId,
  });
  if (error) {
    console.error('toggleActivo error:', error);
    return null;
  }
  return data; // boolean o null
}

export async function obtenerMetricas() {
  const pin = getPin();
  const { data, error } = await supabase.rpc('metricas_globales_admin', {
    p_admin_pin: pin,
  });
  if (error) {
    console.error('obtenerMetricas error:', error);
    return null;
  }
  // La RPC retorna TABLE, supabase-js devuelve un array de filas.
  if (Array.isArray(data) && data.length > 0) return data[0];
  return null;
}
