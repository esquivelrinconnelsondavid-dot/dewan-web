import { supabase } from './supabase';
import { STORAGE_TOKEN, STORAGE_REST } from './auth';
import { optimizarImagen } from './optimizarImagen';

const BUCKET_FOTOS = 'menu-fotos';

function tokenOrThrow() {
  const t = localStorage.getItem(STORAGE_TOKEN);
  if (!t) throw new Error('Sesión expirada');
  return t;
}

function restauranteIdOrThrow() {
  try {
    const r = JSON.parse(localStorage.getItem(STORAGE_REST) || '{}');
    if (!r.restaurante_id) throw new Error();
    return r.restaurante_id;
  } catch {
    throw new Error('Sesión inválida');
  }
}

/**
 * Sube una foto al bucket menu-fotos, devuelve la URL pública.
 * Si itemId existe usa ese path, si no usa un timestamp temporal (luego se asocia al item).
 */
export async function subirFotoMenu(file, itemId = null) {
  const restauranteId = restauranteIdOrThrow();
  const blob = await optimizarImagen(file);
  const ext = blob.__ext || 'webp';
  const nombre = itemId ? `${itemId}.${ext}` : `temp-${Date.now()}.${ext}`;
  const path = `${restauranteId}/${nombre}`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET_FOTOS)
    .upload(path, blob, {
      contentType: blob.type || 'image/webp',
      upsert: true,
      cacheControl: '3600',
    });
  if (upErr) throw upErr;

  const { data } = supabase.storage.from(BUCKET_FOTOS).getPublicUrl(path);
  return data.publicUrl;
}

export async function listarMenu() {
  const { data, error } = await supabase.rpc('menu_listar', {
    p_token: tokenOrThrow(),
  });
  if (error) throw error;
  return data || [];
}

export async function crearItemMenu({ nombre_item, descripcion, precio, categoria_menu, disponible = true, foto_url = null }) {
  const { data, error } = await supabase.rpc('menu_crear_item', {
    p_token: tokenOrThrow(),
    p_nombre_item: nombre_item,
    p_descripcion: descripcion || null,
    p_precio: Number(precio),
    p_categoria_menu: categoria_menu || null,
    p_disponible: !!disponible,
    p_foto_url: foto_url || null,
  });
  if (error) throw error;
  return data;
}

export async function actualizarItemMenu(id, { nombre_item, descripcion, precio, categoria_menu, disponible, foto_url }) {
  const args = {
    p_token: tokenOrThrow(),
    p_id: id,
    p_nombre_item: nombre_item ?? null,
    p_descripcion: descripcion ?? null,
    p_precio: precio === undefined || precio === null || precio === '' ? null : Number(precio),
    p_categoria_menu: categoria_menu ?? null,
    p_disponible: typeof disponible === 'boolean' ? disponible : null,
  };
  // foto_url: undefined = no tocar; '' = borrar; valor = setear
  if (foto_url !== undefined) args.p_foto_url = foto_url;
  const { data, error } = await supabase.rpc('menu_actualizar_item', args);
  if (error) throw error;
  return data;
}

export async function eliminarItemMenu(id) {
  const { error } = await supabase.rpc('menu_eliminar_item', {
    p_token: tokenOrThrow(),
    p_id: id,
  });
  if (error) throw error;
}
