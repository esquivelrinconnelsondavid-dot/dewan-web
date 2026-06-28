import { createClient } from '@supabase/supabase-js';
import { ciudadActual } from './ciudades';

// Backend según la ciudad elegida por el usuario (Riobamba / San Cristóbal). Al
// cambiar de ciudad, App recarga la página y este cliente se reconstruye solo.
const ciudad = ciudadActual();

export const supabase = createClient(
  ciudad.url,
  ciudad.anonKey,
  {
    // Heartbeat más corto: detecta antes un WebSocket "zombi" (socket muerto que
    // no dispara onclose tras dormir/cortar la red) y reconecta el realtime.
    realtime: { heartbeatIntervalMs: 25000, timeout: 10000 },
  }
);

// Resucita el WebSocket de realtime DE RAÍZ. Recrear canales (removeChannel +
// channel()) NO basta: el SOCKET subyacente queda muerto y Supabase lo reusa.
// disconnect() cierra el socket Phoenix real; connect() abre uno NUEVO. Al final
// dispara 'online' para que los hooks recreen sus canales y recarguen datos.
export async function resucitarSocket() {
  try { supabase.removeAllChannels(); } catch {}
  try { supabase.realtime.disconnect(); } catch {}
  await new Promise((r) => setTimeout(r, 500));
  try { supabase.realtime.connect(); } catch {}
  try { window.dispatchEvent(new Event('online')); } catch {}
}

// Ejecuta una consulta PostgREST con un límite de tiempo. Sin esto, si la red
// quedó en mal estado (PC que durmió/hibernó, Wi-Fi suspendido, bache del ISP),
// un `fetch` sobre un socket TCP muerto se cuelga MUCHO rato (el timeout por
// defecto de Chromium es de minutos) y la pantalla nunca refresca. Al abortar a
// los `ms`, el siguiente intento abre una conexión nueva y se recupera solo.
// Normaliza el aborto/throw a `{ data: null, error }` para no romper a quien
// destructura `{ data, error }`.
export async function consultarConTimeout(query, ms = 12000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await query.abortSignal(ctrl.signal);
  } catch (e) {
    return { data: null, error: e || new Error('timeout') };
  } finally {
    clearTimeout(timer);
  }
}
