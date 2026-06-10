// Estado de conexión basado en DATOS FRESCOS reales: guardamos la marca de
// tiempo del último fetch exitoso (persistida en localStorage para sobrevivir
// recargas). Con eso:
//   - la UI muestra "Reconectando…" si los datos están viejos (no llega nada nuevo),
//   - un watchdog recarga la app si pasan demasiados segundos sin datos
//     (el caso "se queda pegado y hay que cerrar/abrir para que reaccione").
// Es más honesto que mirar solo el estado del WebSocket: si el realtime se cae
// pero el poll sigue trayendo datos, NO alarmamos; si de verdad no llega nada,
// avisamos y, si persiste, recuperamos solos.

const LS_DATOS_OK = 'dewan_ultimo_datos_ok';
const ARRANQUE = Date.now();

// Lo llaman los hooks cada vez que un fetch a Supabase devuelve datos OK.
export function marcarDatosOk() {
  try { localStorage.setItem(LS_DATOS_OK, String(Date.now())); } catch {}
}

// ms desde el último fetch exitoso. Si todavía NUNCA cargó en esta sesión,
// contamos desde el arranque (no 0): así, si la app abre con la red muerta y no
// logra el primer fetch, el watchdog igual se dispara y la recupera.
export function tiempoSinDatos() {
  let t = 0;
  try { t = Number(localStorage.getItem(LS_DATOS_OK) || 0); } catch {}
  return t ? Date.now() - t : Date.now() - ARRANQUE;
}
