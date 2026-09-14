import { STORAGE_TOKEN } from './auth';
import { estadoCierre, cerrarReabrirLocal } from './perfilLocal';

// Estado de la tienda en la cabecera, como en las apps de socios grandes:
//   Abierto · Ocupado (+N min) · Pausado (N min).
// - PAUSAR N MIN: los clientes ven el local Cerrado y se reabre solo al vencer.
//   Va por el webhook `panel-estado-local` (n8n, con permisos de servidor) porque
//   la anon key no puede escribir en `restaurantes` y la RPC de cierre solo sabe
//   "cerrar por hoy". Si el webhook no responde, se cae a "cerrar por hoy".
// - OCUPADO +N: suma N minutos al tiempo que el local promete al aceptar (el
//   chip preseleccionado) y se ve en la cabecera. Vive en este dispositivo y se
//   apaga solo. Que el cliente lo vea ANTES de pedir es un paso aparte (app).
const WEBHOOK_BASE = import.meta.env.VITE_N8N_WEBHOOK_BASE;
const ESTADO_PATH = import.meta.env.VITE_N8N_ESTADO_PATH || 'panel-estado-local';
const KEY_OCUPADO = 'dewan_ocupado';

export function leerOcupado() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY_OCUPADO) || 'null');
    if (!o || !o.hasta || new Date(o.hasta).getTime() <= Date.now()) return null;
    return { minutos: Number(o.minutos) || 0, hasta: o.hasta };
  } catch {
    return null;
  }
}

// minutos = 0 apaga. Dura 2 horas y se apaga solo (nadie se acuerda de apagarlo).
export function fijarOcupado(minutos) {
  try {
    if (!minutos) { localStorage.removeItem(KEY_OCUPADO); return null; }
    const o = { minutos, hasta: new Date(Date.now() + 2 * 3600000).toISOString() };
    localStorage.setItem(KEY_OCUPADO, JSON.stringify(o));
    return o;
  } catch {
    return null;
  }
}

async function llamarWebhook(body) {
  if (!WEBHOOK_BASE) throw new Error('sin webhook');
  const token = localStorage.getItem(STORAGE_TOKEN);
  if (!token) throw new Error('Sesión expirada');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const resp = await fetch(`${WEBHOOK_BASE}/${ESTADO_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, ...body }),
      signal: ctrl.signal,
    });
    const j = await resp.json().catch(() => ({}));
    if (!resp.ok || !j || j.ok === false) throw new Error((j && j.error) || `HTTP ${resp.status}`);
    return j;
  } finally {
    clearTimeout(timer);
  }
}

export async function leerCierre(restauranteId) {
  return estadoCierre(restauranteId);
}

// Pausa N minutos. Devuelve cerrado_hasta (ISO).
export async function pausarLocal(minutos) {
  try {
    const r = await llamarWebhook({ accion: 'pausar', minutos });
    return r.cerrado_hasta || new Date(Date.now() + minutos * 60000).toISOString();
  } catch (e) {
    console.warn('[estadoLocal] webhook pausar falló, cierro por hoy:', e?.message || e);
    return cerrarReabrirLocal(true);
  }
}

export async function reabrirLocal() {
  try {
    await llamarWebhook({ accion: 'abrir' });
    return null;
  } catch (e) {
    console.warn('[estadoLocal] webhook abrir falló, uso la RPC:', e?.message || e);
    return cerrarReabrirLocal(false);
  }
}
