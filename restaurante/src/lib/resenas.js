import { supabase, consultarConTimeout } from './supabase';

// Opiniones de los clientes (tabla `resenas`, una fila por pedido). El panel LEE
// con la anon key igual que los pedidos; escribe solo n8n. Sirve para DEWAN
// (pedidos_delivery) y para los locales del SISTEMA (pedidos_sistema): la fila
// trae `tabla_origen`, el filtro es siempre por local.

// Errores que significan "la tabla todavía no existe" (SQL sin correr): el panel
// no se cae, muestra que las opiniones se activan pronto.
const SIN_TABLA = /PGRST205|42P01|does not exist|schema cache/i;

export function filtroLocal(restaurante) {
  const conds = [];
  if (restaurante?.restaurante_id) conds.push(`restaurante_id.eq.${restaurante.restaurante_id}`);
  if (restaurante?.nombre) conds.push(`restaurante.eq.${String(restaurante.nombre).replace(/,/g, '\\,')}`);
  return conds.join(',');
}

export async function cargarResenas(restaurante, dias = 90) {
  const filtro = filtroLocal(restaurante);
  if (!filtro) return { data: [], error: null, noDisponible: false };
  const desde = new Date(Date.now() - dias * 86400000).toISOString();
  const query = supabase
    .from('resenas')
    .select('*')
    .or(filtro)
    .gte('created_at', desde)
    .order('created_at', { ascending: false })
    .limit(300);
  const { data, error } = await consultarConTimeout(query);
  if (error) {
    const msg = `${error.code || ''} ${error.message || ''}`;
    return { data: [], error, noDisponible: SIN_TABLA.test(msg) };
  }
  return { data: data || [], error: null, noDisponible: false };
}

export async function marcarResenasLeidas(restauranteId, ids = null) {
  if (!restauranteId) return 0;
  const { data, error } = await supabase.rpc('resenas_marcar_leidas', {
    p_restaurante_id: restauranteId,
    p_ids: ids && ids.length ? ids : null,
  });
  if (error) throw error;
  return Number(data) || 0;
}

// Una opinión "pide atención" cuando alguna nota es 3 o menos (como en las grandes:
// 4-5 = bien, 1-3 = hay que mirar).
export function esBaja(r) {
  const c = Number(r?.estrellas_comida) || 0;
  const e = Number(r?.estrellas_entrega) || 0;
  return (c > 0 && c <= 3) || (e > 0 && e <= 3);
}

// Resumen para la cabecera de la pestaña: promedio de comida, % de 4-5, platos
// mejor y peor votados. Todo con lo que hay en memoria (no hay otra consulta).
export function resumirResenas(resenas) {
  const comida = resenas.map((r) => Number(r.estrellas_comida) || 0).filter((n) => n > 0);
  const entrega = resenas.map((r) => Number(r.estrellas_entrega) || 0).filter((n) => n > 0);
  const base = comida.length ? comida : entrega;
  const promedio = base.length ? Math.round((base.reduce((s, n) => s + n, 0) / base.length) * 10) / 10 : null;
  const buenas = base.filter((n) => n >= 4).length;
  const pctBuenas = base.length ? Math.round((buenas / base.length) * 100) : null;

  const platos = new Map();
  for (const r of resenas) {
    for (const p of Array.isArray(r.platos) ? r.platos : []) {
      const nombre = String(p?.nombre || '').trim();
      if (!nombre) continue;
      const acc = platos.get(nombre) || { nombre, arriba: 0, abajo: 0 };
      if (Number(p.voto) > 0) acc.arriba += 1;
      else if (Number(p.voto) < 0) acc.abajo += 1;
      platos.set(nombre, acc);
    }
  }
  const lista = [...platos.values()].map((p) => ({ ...p, votos: p.arriba + p.abajo, pct: Math.round((p.arriba / Math.max(p.arriba + p.abajo, 1)) * 100) }));
  const mejores = lista.filter((p) => p.arriba > 0).sort((a, b) => b.arriba - a.arriba || b.pct - a.pct).slice(0, 3);
  const peores = lista.filter((p) => p.abajo > 0).sort((a, b) => b.abajo - a.abajo || a.pct - b.pct).slice(0, 3);

  return {
    total: resenas.length,
    conComida: comida.length,
    promedio,
    pctBuenas,
    bajas: resenas.filter(esBaja).length,
    sinLeer: resenas.filter((r) => !r.leida_at).length,
    mejores,
    peores,
  };
}
