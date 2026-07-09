import { createClient } from '@supabase/supabase-js';
import { ciudadActual } from './ciudades';

// Fetch con timeout duro (15s). En el WebView de Android, tras dormir/background el
// pool TCP de Chromium puede quedar "muerto" y un fetch normal se cuelga para SIEMPRE
// (ni resuelve ni rechaza) → la carga inicial queda en el spinner y los datos se congelan.
// Con AbortController garantizamos que toda query falle rápido en vez de colgar la app.
// Respeta la signal del que llama (p.ej. .abortSignal()) si la trae.
function fetchConTimeout(input, init = {}) {
  if (init.signal) return fetch(input, init); // el caller ya controla el aborto
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), 15000);
  return fetch(input, { ...init, signal: ctrl.signal }).finally(() => clearTimeout(id));
}

// Backend según la ciudad elegida (Riobamba / San Cristóbal). Al cambiar de
// ciudad, App recarga la página y este cliente se reconstruye solo.
const ciudad = ciudadActual();

export const supabase = createClient(
  ciudad.url,
  ciudad.anonKey,
  {
    global: { fetch: fetchConTimeout },
    realtime: { params: { eventsPerSecond: 20 } },
  }
);

export const MIN_NO_ACEPTA = Number(import.meta.env.VITE_MINUTOS_NO_ACEPTA || 5);
