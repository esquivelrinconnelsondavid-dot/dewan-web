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

// En el celular (app Android o navegador) el sistema congela la app cuando el
// local se va a WhatsApp o apaga la pantalla: ese rato NO se pide nada, así que
// no es "sin datos". Antes se contaba igual → al volver salía la barra
// "Reconectando…" y el watchdog reiniciaba la app aunque la red estuviera bien
// (7-nov: 186 consultas OK, 0 fallas, y la app se reiniciaba al volver). Ahora
// el reloj arranca de nuevo cuando la app vuelve a primer plano.
// En la PC (EXE) el panel sigue trabajando minimizado → se cuenta como siempre.
const ES_ELECTRON = typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent || '');
let vueltaEn = ARRANQUE;
if (!ES_ELECTRON && typeof document !== 'undefined') {
  // Se registra al importar el módulo, antes que los listeners de los hooks.
  const alVolver = () => {
    if (document.visibilityState === 'visible') vueltaEn = Date.now();
  };
  document.addEventListener('visibilitychange', alVolver);
  document.addEventListener('resume', alVolver); // Chrome: la página estaba congelada
}

// Lo llaman los hooks cada vez que un fetch a Supabase devuelve datos OK.
export function marcarDatosOk() {
  try { localStorage.setItem(LS_DATOS_OK, String(Date.now())); } catch {}
}

// Marca de tiempo (ms) del último fetch exitoso, 0 si nunca.
export function ultimoDatosOk() {
  try { return Number(localStorage.getItem(LS_DATOS_OK) || 0); } catch { return 0; }
}

// ms desde el último fetch exitoso. Si todavía NUNCA cargó en esta sesión,
// contamos desde el arranque (no 0): así, si la app abre con la red muerta y no
// logra el primer fetch, el watchdog igual se dispara y la recupera.
// En el celular cuenta desde lo último entre: último dato OK, arranque y vuelta
// a primer plano; y con la app oculta devuelve 0 (congelada, no hay que alarmar).
export function tiempoSinDatos() {
  const t = ultimoDatosOk();
  if (ES_ELECTRON) return t ? Date.now() - t : Date.now() - ARRANQUE;
  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return 0;
  return Date.now() - Math.max(t, vueltaEn);
}
