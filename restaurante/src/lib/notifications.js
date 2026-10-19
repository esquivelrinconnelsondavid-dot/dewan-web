// Audio + vibración + notificaciones del navegador.
// La alarma del restaurante es más insistente que la de operadora:
// suena una sirena (no un beep) en loop cada 5 seg hasta que toquen aceptar.

import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

// v2: Android CONGELA la config del canal al crearlo — si un empleado lo
// silenció una vez desde Ajustes, quedaba mudo para siempre. Un id NUEVO llega
// con config fresca (sonido + heads-up) a todos los teléfonos.
const CHANNEL_ID = 'pedidos-urgentes-v2';
let canalCreado = false;

async function asegurarCanal() {
  if (!Capacitor.isNativePlatform() || canalCreado) return;
  try {
    // Limpia el canal viejo para que no queden dos "Pedidos nuevos" en Ajustes.
    try { await LocalNotifications.deleteChannel({ id: 'pedidos-urgentes' }); } catch (e) {}
    await LocalNotifications.createChannel({
      id: CHANNEL_ID,
      name: 'Pedidos nuevos',
      description: 'Alarma de pedidos entrantes que requieren atención inmediata',
      importance: 5,         // IMPORTANCE_HIGH (sonido y heads-up)
      visibility: 1,
      sound: 'default',
      vibration: true,
      lights: true,
      lightColor: '#E8431A',
      bypassDnd: true,
    });
    canalCreado = true;
  } catch (e) {
    console.warn('[createChannel]', e);
  }
}

let audioCtx = null;
const audioListeners = new Set();

function notificarEstadoAudio() {
  const desbloqueado = audioCtx?.state === 'running';
  audioListeners.forEach((cb) => {
    try { cb(desbloqueado); } catch {}
  });
}

export function suscribirEstadoAudio(cb) {
  audioListeners.add(cb);
  // dispara estado inicial
  cb(audioCtx?.state === 'running');
  return () => audioListeners.delete(cb);
}

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.onstatechange = notificarEstadoAudio;
  }
  return audioCtx;
}

export function estadoAudio() {
  return audioCtx?.state || 'sin-iniciar';
}

async function asegurarAudio() {
  const ctx = getAudioCtx();
  if (ctx.state === 'running') return ctx;
  for (let i = 0; i < 3; i++) {
    try { await ctx.resume(); } catch {}
    if (ctx.state === 'running') return ctx;
    await new Promise((r) => setTimeout(r, 60));
  }
  return ctx;
}

// [18-oct-2026] Sonido a elegir en cada PC (Ajustes › Sonido). Super Happy: "la sirena no nos
// gusta, que sea más suave". Se guarda en ESTA computadora (localStorage). Sin elegir nada queda
// la sirena de siempre cada 5 s → los demás locales no notan ningún cambio. En la app nativa
// (Android) no se ofrece: ahí manda el canal de notificaciones.
const LS_SONIDO = 'dewan_sonido_pedido';
export const SONIDOS = [
  { id: 'campana', nombre: 'Campanita', detalle: 'Ding-dong suave, como el timbre de una tienda' },
  { id: 'marimba', nombre: 'Marimba', detalle: 'Tres notas cortas y alegres' },
  { id: 'toque', nombre: 'Toque corto', detalle: 'Un solo tono breve, el más discreto' },
  { id: 'sirena', nombre: 'Sirena', detalle: 'La de siempre: fuerte, para cocinas con mucho ruido' },
];
export const REPETICIONES = [
  { id: 'una', nombre: 'Una sola vez', detalle: 'Suena al llegar el pedido y no vuelve a sonar', seg: 0 },
  { id: 'cada30', nombre: 'Cada 30 segundos', detalle: 'Recuerda con calma mientras nadie acepte el pedido', seg: 30 },
  { id: 'cada5', nombre: 'Cada 5 segundos', detalle: 'Insistente, mientras nadie acepte el pedido', seg: 5 },
];
export const VOLUMENES = [
  { id: 'bajo', nombre: 'Bajo', factor: 0.35 },
  { id: 'medio', nombre: 'Medio', factor: 0.65 },
  { id: 'alto', nombre: 'Alto', factor: 1 },
];
const SONIDO_DE_SIEMPRE = { sonido: 'sirena', repetir: 'cada5', volumen: 'alto', aviso: false };
export const SONIDO_RECOMENDADO = { sonido: 'campana', repetir: 'cada30', volumen: 'medio', aviso: true };

export function getAjusteSonido() {
  if (Capacitor.isNativePlatform()) return { ...SONIDO_DE_SIEMPRE };
  let guardado = {};
  try { guardado = JSON.parse(localStorage.getItem(LS_SONIDO) || '{}') || {}; } catch {}
  const a = { ...SONIDO_DE_SIEMPRE, ...guardado };
  if (!SONIDOS.some((s) => s.id === a.sonido)) a.sonido = SONIDO_DE_SIEMPRE.sonido;
  if (!REPETICIONES.some((r) => r.id === a.repetir)) a.repetir = SONIDO_DE_SIEMPRE.repetir;
  if (!VOLUMENES.some((v) => v.id === a.volumen)) a.volumen = SONIDO_DE_SIEMPRE.volumen;
  a.aviso = a.aviso === true;
  return a;
}

export function setAjusteSonido(cambios) {
  const a = { ...getAjusteSonido(), ...cambios };
  try { localStorage.setItem(LS_SONIDO, JSON.stringify(a)); } catch {}
  return a;
}

// Una nota con ataque corto y caída natural. Senos con armónicos suaves (timbre de
// campana / marimba); los armónicos altos se apagan antes, como en un instrumento real.
function nota(ctx, salida, t0, freq, dur, vol, parciales) {
  parciales.forEach(([mult, nivel]) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const fin = t0 + dur / Math.sqrt(mult);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * mult, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol * nivel), t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, fin);
    osc.connect(g);
    g.connect(salida);
    osc.start(t0);
    osc.stop(fin + 0.05);
  });
}

const CAMPANA = [[1, 1], [2, 0.3], [3, 0.1]];
const MARIMBA = [[1, 1], [3.9, 0.12]];

// Dibuja el sonido en `salida` desde t0. Sirve igual para el parlante (AudioContext) que para
// grabarlo (OfflineAudioContext). Devuelve la duración en segundos.
export function dibujarSonido(ctx, salida, t0, sonido, factor) {
  if (sonido === 'campana') {
    nota(ctx, salida, t0, 659.25, 1.5, 0.55 * factor, CAMPANA);        // mi
    nota(ctx, salida, t0 + 0.5, 523.25, 1.8, 0.55 * factor, CAMPANA);  // do
    return 2.4;
  }
  if (sonido === 'marimba') {
    [523.25, 659.25, 783.99].forEach((f, i) => nota(ctx, salida, t0 + i * 0.13, f, 0.7, 0.6 * factor, MARIMBA));
    return 1.1;
  }
  if (sonido === 'toque') {
    nota(ctx, salida, t0, 880, 0.9, 0.5 * factor, [[1, 1], [2, 0.18]]);
    return 1;
  }
  // Sirena: dos tonos alternados durante ~1.2s. Atraviesa ruido de cocina.
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.connect(gain);
  gain.connect(salida);
  // Alterna entre 900Hz y 1500Hz cuatro veces.
  const pasos = [900, 1500, 900, 1500, 900, 1500];
  pasos.forEach((freq, i) => {
    osc.frequency.setValueAtTime(freq, t0 + i * 0.2);
  });
  gain.gain.setValueAtTime(0.5 * factor, t0);
  gain.gain.setValueAtTime(0, t0 + pasos.length * 0.2);
  osc.start(t0);
  osc.stop(t0 + pasos.length * 0.2 + 0.05);
  return 1.25;
}

// Suena el aviso elegido en esta PC. `prueba` = ajuste a escuchar sin guardarlo (botón Probar).
export async function playAviso(prueba) {
  try {
    const ctx = await asegurarAudio();
    if (ctx.state !== 'running') return; // Audio bloqueado: nada que hacer (notif nativa cubre)
    const a = { ...getAjusteSonido(), ...(prueba || {}) };
    const factor = (VOLUMENES.find((v) => v.id === a.volumen) || VOLUMENES[2]).factor;
    dibujarSonido(ctx, ctx.destination, ctx.currentTime + 0.02, a.sonido, factor);
  } catch (e) {
    console.warn('[AUDIO] Error:', e);
  }
}

// Aviso de Windows (abajo a la derecha) para cuando la cajera está en otro programa,
// por ejemplo facturando. Callado: el sonido ya lo pone el panel.
function avisoEnPantalla(title, body) {
  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      const n = new Notification(title, { body, silent: true, tag: `pedido-${title}` });
      n.onclick = () => { try { window.focus(); } catch {} n.close(); };
      return;
    }
    window.electronAPI?.notifyOrder?.({ title, body })?.catch?.(() => {});
  } catch (e) {
    console.warn('[AVISO PANTALLA]', e);
  }
}

export function probarAvisoEnPantalla() {
  avisoEnPantalla('🔔 Nuevo pedido (prueba)', 'Así le avisará el panel cuando esté en otro programa');
}

export function vibrar() {
  if (navigator.vibrate) navigator.vibrate([400, 150, 400, 150, 400]);
}

// Loop por pedido: sirena Web Audio cada 5s + notificación nativa repetida cada 8s.
// Cubre tres casos: app foreground con audio desbloqueado (sirena), app foreground sin
// audio desbloqueado (notif nativa), app en background o pantalla apagada (notif nativa).
const alertIntervals = new Map();
const notifIds = new Map(); // pedidoId -> [ids de notifs nativas para cancelar]

function notifIdNum(pedidoId, idx) {
  // ID nativo debe ser int32 positivo
  const base = Math.abs(Number(pedidoId)) % 100000;
  return ((base * 100) + idx) & 0x7fffffff;
}

async function notifNativa(pedidoId, idx, title, body) {
  if (!Capacitor.isNativePlatform()) return;
  await asegurarCanal();
  try {
    await LocalNotifications.schedule({
      notifications: [{
        id: notifIdNum(pedidoId, idx),
        title,
        body,
        sound: 'default',
        channelId: CHANNEL_ID,
        smallIcon: 'ic_stat_icon_config_sample',
        ongoing: false,
      }],
    });
    if (!notifIds.has(pedidoId)) notifIds.set(pedidoId, []);
    const ids = notifIds.get(pedidoId);
    if (!ids.includes(notifIdNum(pedidoId, idx))) ids.push(notifIdNum(pedidoId, idx));
  } catch (e) {
    console.warn('[notif native]', e);
  }
}

async function cancelarNotifs(pedidoId) {
  const ids = notifIds.get(pedidoId);
  if (!ids || ids.length === 0) return;
  try {
    await LocalNotifications.cancel({
      notifications: ids.map((id) => ({ id })),
    });
  } catch (e) {
    console.warn('[notif cancel]', e);
  }
  notifIds.delete(pedidoId);
}

export function startAlertLoop(pedidoId, datosNotif = {}) {
  if (alertIntervals.has(pedidoId)) return;
  const title = datosNotif.title || `🔔 Nuevo pedido #${pedidoId}`;
  const body = datosNotif.body || 'Pedido entrante — abrir la app';

  // Sirena Web Audio cada 5s + notificación nativa re-disparada cada 10s (mismo
  // id → se reemplaza a sí misma y vuelve a sonar, sin apilar notificaciones).
  // La sirena depende del volumen MULTIMEDIA (si está en 0 no se oye); la notif
  // nativa suena por el canal de notificaciones → doble vía en cada tanda.
  // En la PC el sonido y cada cuánto se repite salen de Ajustes › Sonido.
  const ajuste = getAjusteSonido();
  const seg = (REPETICIONES.find((r) => r.id === ajuste.repetir) || REPETICIONES[2]).seg;
  playAviso().catch(() => {});
  vibrar();
  notifNativa(pedidoId, 0, title, body);
  if (ajuste.aviso) avisoEnPantalla(title, body);

  let tick = 0;
  const id = seg > 0 ? setInterval(() => {
    playAviso().catch(() => {});
    vibrar();
    tick += 1;
    if (tick % 2 === 0) notifNativa(pedidoId, 0, title, body);
  }, seg * 1000) : 0; // "Una sola vez": sin repetición, pero queda anotado para no volver a sonar
  alertIntervals.set(pedidoId, id);
  // Tope de vida: si nunca llega el stop (ej. se perdió el UPDATE de aceptación por
  // red zombi), la sirena NO debe sonar para siempre ni acumular nodos de audio.
  setTimeout(() => { try { stopAlertLoop(pedidoId); } catch (e) {} }, 10 * 60 * 1000);
}

export function stopAlertLoop(pedidoId) {
  const id = alertIntervals.get(pedidoId);
  if (id) clearInterval(id);
  alertIntervals.delete(pedidoId);
  cancelarNotifs(pedidoId);
}

export function stopAllAlerts() {
  alertIntervals.forEach((id) => { if (id) clearInterval(id); });
  alertIntervals.clear();
  notifIds.forEach((_ids, pedidoId) => cancelarNotifs(pedidoId));
}

export async function requestPushPermission() {
  if (Capacitor.isNativePlatform()) {
    try {
      asegurarCanal(); // sin await intencional, así corre en paralelo
      const perm = await LocalNotifications.checkPermissions();
      if (perm.display === 'granted') return true;
      const req = await LocalNotifications.requestPermissions();
      return req.display === 'granted';
    } catch (e) {
      console.warn('[notif perm native]', e);
      return false;
    }
  }
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function showPushNotification(title, body) {
  if (Capacitor.isNativePlatform()) {
    (async () => {
      await asegurarCanal();
      LocalNotifications.schedule({
        notifications: [{
          id: (Date.now() & 0x7fffffff),
          title,
          body,
          sound: 'default',
          channelId: CHANNEL_ID,
        }],
      }).catch((e) => console.warn('[notif native]', e));
    })();
    return;
  }
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  try {
    new Notification(title, { body, icon: '/favicon.ico', vibrate: [400, 150, 400] });
  } catch (e) {
    console.warn('[PUSH]', e);
  }
}

// El audio en navegadores móviles solo arranca tras un gesto del usuario.
// Llama esto en el primer toque para "desbloquear" el AudioContext.
export function unlockAudio() {
  const ctx = getAudioCtx();
  if (ctx.state === 'suspended') ctx.resume().then(notificarEstadoAudio).catch(() => {});
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.01);
  notificarEstadoAudio();
}

// En escritorio (Electron) la política de autoplay está relajada en main.cjs, y
// en la app Android nativa MainActivity.java desactiva el gesto requerido
// (setMediaPlaybackRequiresUserGesture(false)) → en ambos el AudioContext puede
// arrancar sin toque del usuario. Solo en el navegador se mantiene el botón
// "activar sonido" (ahí el gesto sí es obligatorio).
export function esEscritorioElectron() {
  return typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent || '');
}

export function audioSinGesto() {
  return esEscritorioElectron() || Capacitor.isNativePlatform();
}

export async function autoArmarAudio() {
  if (!audioSinGesto()) return false;
  try {
    const ctx = getAudioCtx();
    if (ctx.state !== 'running') await ctx.resume().catch(() => {});
    notificarEstadoAudio();
    return ctx.state === 'running';
  } catch {
    return false;
  }
}

// Armar apenas carga el módulo: cuando AvisoSonido se monte el audio ya está
// corriendo y la barra roja ni aparece. En navegador no hace nada.
if (typeof window !== 'undefined') {
  autoArmarAudio();
}

// Wake Lock: evita que la pantalla se apague mientras la app está abierta.
let wakeLock = null;

export async function pedirWakeLock() {
  if (!('wakeLock' in navigator)) return false;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      wakeLock = null;
    });
    return true;
  } catch (e) {
    console.warn('[WAKELOCK]', e);
    return false;
  }
}

// Re-pide el wake lock al volver a la pestaña (lo libera el SO al ir a background).
export function instalarWakeLockListener() {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !wakeLock) {
      pedirWakeLock();
    }
  });
}
