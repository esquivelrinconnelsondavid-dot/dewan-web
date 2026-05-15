// Audio + vibración + notificaciones del navegador.
// La alarma del restaurante es más insistente que la de operadora:
// suena una sirena (no un beep) en loop cada 5 seg hasta que toquen aceptar.

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

// Sirena: dos tonos alternados durante ~1.2s. Atraviesa ruido de cocina.
export function playSirena() {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

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

// Loop por pedido: alarma cada 5 seg hasta que se acepte o rechace.
const alertIntervals = new Map();

export function startAlertLoop(pedidoId) {
  if (alertIntervals.has(pedidoId)) return;
  playSirena();
  vibrar();
  const id = setInterval(() => {
    playSirena();
    vibrar();
  }, 5000);
  alertIntervals.set(pedidoId, id);
}

export function stopAlertLoop(pedidoId) {
  const id = alertIntervals.get(pedidoId);
  if (id) {
    clearInterval(id);
    alertIntervals.delete(pedidoId);
  }
}

export function stopAllAlerts() {
  alertIntervals.forEach((id) => clearInterval(id));
  alertIntervals.clear();
}

export async function requestPushPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function showPushNotification(title, body) {
  if (Notification.permission !== 'granted') return;
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
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.01);
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
