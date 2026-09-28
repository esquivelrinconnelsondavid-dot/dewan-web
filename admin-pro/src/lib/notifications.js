import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

let permGranted = false;
let audioCtx = null;
let audioUnlocked = false;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

export async function requestNotifPermission() {
  if (Capacitor.isNativePlatform()) {
    try {
      const perm = await LocalNotifications.checkPermissions();
      if (perm.display !== 'granted') {
        const req = await LocalNotifications.requestPermissions();
        permGranted = req.display === 'granted';
      } else {
        permGranted = true;
      }
    } catch (e) {
      console.warn('[notif perm native]', e);
    }
  } else if (typeof Notification !== 'undefined') {
    if (Notification.permission === 'default') {
      try { await Notification.requestPermission(); } catch {}
    }
    permGranted = Notification.permission === 'granted';
  }
  return permGranted;
}

export async function notify(title, body, opts = {}) {
  if (Capacitor.isNativePlatform()) {
    try {
      await LocalNotifications.schedule({
        notifications: [{
          id: opts.id ?? (Date.now() & 0x7fffffff),
          title,
          body,
          sound: 'default',
        }],
      });
    } catch (e) { console.warn('[notif native]', e); }
  } else if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try { new Notification(title, { body }); } catch (e) { console.warn('[notif web]', e); }
  }
}

export async function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') await ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.01);
    audioUnlocked = true;
  } catch {}
}

// Reanudar el AudioContext tras volver de background (Android lo deja en 'suspended').
// A diferencia de unlockAudio NO es one-shot: se llama en cada resume/gesto del usuario
// para que las alarmas no queden mudas después de alternar con WhatsApp.
export async function resumeAudio() {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') await ctx.resume();
  } catch {}
}

export function vibrar() {
  if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 300]);
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

export async function tripleBeep(freq = 1200) {
  try {
    const ctx = await asegurarAudio();
    if (ctx.state !== 'running') return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.setValueAtTime(0, now + 0.15);
    gain.gain.setValueAtTime(0.6, now + 0.25);
    gain.gain.setValueAtTime(0, now + 0.4);
    gain.gain.setValueAtTime(0.6, now + 0.5);
    gain.gain.setValueAtTime(0, now + 0.7);
    osc.start(now);
    osc.stop(now + 0.75);
  } catch (e) { console.warn('[beep]', e); }
}

export async function sirenaRechazo() {
  try {
    const ctx = await asegurarAudio();
    if (ctx.state !== 'running') return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.connect(gain); gain.connect(ctx.destination);
    const now = ctx.currentTime;
    const pasos = [880, 1500, 880, 1500, 880, 1500];
    pasos.forEach((f, i) => osc.frequency.setValueAtTime(f, now + i * 0.2));
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.setValueAtTime(0, now + pasos.length * 0.2);
    osc.start(now);
    osc.stop(now + pasos.length * 0.2 + 0.05);
  } catch (e) { console.warn('[sirena]', e); }
}

const alertIntervals = new Map();
const ALARM_PERIOD_MS = 15000;

function audioMudo() {
  return !audioCtx || audioCtx.state !== 'running';
}

export function startAlertLoop(pedidoId, tipo = 'nuevo') {
  if (alertIntervals.has(pedidoId)) return;
  const tick = () => {
    if (tipo === 'rechazo') sirenaRechazo().catch(() => {});
    else tripleBeep(tipo === 'no_acepta' ? 660 : 1200).catch(() => {});
    vibrar();
    // Respaldo: si el audio web quedó mudo (AudioContext 'suspended' tras background),
    // avisar por notificación nativa (sonido del sistema). id estable por pedido →
    // Android la reemplaza en vez de apilar, y re-suena en cada ciclo.
    if (audioMudo()) {
      const titulo = tipo === 'rechazo' ? 'Restaurante rechazó'
        : tipo === 'no_acepta' ? 'Restaurante no responde' : 'Pedido pendiente';
      notify(titulo, `#${pedidoId}`, { id: 700000000 + (Math.abs(Number(pedidoId)) % 1000000) });
    }
  };
  tick();
  const id = setInterval(tick, ALARM_PERIOD_MS);
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

export function alertActiva(pedidoId) {
  return alertIntervals.has(pedidoId);
}

export function beep() { tripleBeep(); }
