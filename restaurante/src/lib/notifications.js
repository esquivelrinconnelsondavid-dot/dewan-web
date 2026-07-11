// Audio + vibración + notificaciones del navegador.
// La alarma del restaurante es más insistente que la de operadora:
// suena una sirena (no un beep) en loop cada 5 seg hasta que toquen aceptar.

import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

const CHANNEL_ID = 'pedidos-urgentes';
let canalCreado = false;

async function asegurarCanal() {
  if (!Capacitor.isNativePlatform() || canalCreado) return;
  try {
    await LocalNotifications.createChannel({
      id: CHANNEL_ID,
      name: 'Pedidos nuevos',
      description: 'Alarma de pedidos entrantes que requieren atención inmediata',
      importance: 5,         // IMPORTANCE_HIGH (sonido y heads-up)
      visibility: 1,
      sound: 'default',
      vibration: true,
      lights: true,
      lightColor: '#0BFE9F',
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

// Sirena: dos tonos alternados durante ~1.2s. Atraviesa ruido de cocina.
export async function playSirena() {
  try {
    const ctx = await asegurarAudio();
    if (ctx.state !== 'running') return; // Audio bloqueado: nada que hacer (notif nativa cubre)

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Alterna entre 900Hz y 1500Hz cuatro veces.
    const pasos = [900, 1500, 900, 1500, 900, 1500];
    pasos.forEach((freq, i) => {
      osc.frequency.setValueAtTime(freq, now + i * 0.2);
    });
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.setValueAtTime(0, now + pasos.length * 0.2);

    osc.start(now);
    osc.stop(now + pasos.length * 0.2 + 0.05);
  } catch (e) {
    console.warn('[AUDIO] Error:', e);
  }
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
    notifIds.get(pedidoId).push(notifIdNum(pedidoId, idx));
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

  // Notificacion nativa UNA sola vez. La sirena Web Audio sigue cada 5s.
  playSirena().catch(() => {});
  vibrar();
  notifNativa(pedidoId, 0, title, body);

  const id = setInterval(() => {
    playSirena().catch(() => {});
    vibrar();
  }, 5000);
  alertIntervals.set(pedidoId, id);
  // Tope de vida: si nunca llega el stop (ej. se perdió el UPDATE de aceptación por
  // red zombi), la sirena NO debe sonar para siempre ni acumular nodos de audio.
  setTimeout(() => { try { stopAlertLoop(pedidoId); } catch (e) {} }, 10 * 60 * 1000);
}

export function stopAlertLoop(pedidoId) {
  const id = alertIntervals.get(pedidoId);
  if (id) {
    clearInterval(id);
    alertIntervals.delete(pedidoId);
  }
  cancelarNotifs(pedidoId);
}

export function stopAllAlerts() {
  alertIntervals.forEach((id) => clearInterval(id));
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
