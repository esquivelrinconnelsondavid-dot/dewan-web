// DEWAN - Service Worker v5 - ALARMA EN PUSH
const SW_VERSION = 'v5';

// ─── Generar WAV de alarma (mismo que la app) ────────────────────────────────
function makeAlarmWavBase64() {
  const sr = 22050, dur = 5, n = sr * dur;
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const wr = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  wr(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true);
  wr(8, 'WAVE'); wr(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  wr(36, 'data'); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const freq = 1050 + 350 * Math.sin(2 * Math.PI * 3 * t);
    const wave = Math.sin(2 * Math.PI * freq * t);
    const beat = Math.sin(2 * Math.PI * 4 * t) > 0 ? 1.0 : 0.15;
    const harmonic = Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
    const sample = (wave + harmonic) * beat * 0.95;
    v.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, sample * 32767)), true);
  }
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return 'data:audio/wav;base64,' + btoa(bin);
}

// ─── Reproducir alarma en el SW usando AudioContext ──────────────────────────
async function playAlarmInSW() {
  try {
    // Método 1: usar AudioContext en el SW (funciona en Chrome Android)
    const wavBase64 = makeAlarmWavBase64();
    const wavData = atob(wavBase64.split(',')[1]);
    const bytes = new Uint8Array(wavData.length);
    for (let i = 0; i < wavData.length; i++) bytes[i] = wavData.charCodeAt(i);

    const ctx = new AudioContext();
    const decoded = await ctx.decodeAudioData(bytes.buffer);
    const source = ctx.createBufferSource();
    source.buffer = decoded;
    source.connect(ctx.destination);
    source.start(0);
    console.log('[SW] Alarma reproducida via AudioContext');
    return true;
  } catch (e) {
    console.log('[SW] AudioContext no disponible en SW:', e.message);
    return false;
  }
}

// ─── PUSH: recibir notificación del servidor ─────────────────────────────────
self.addEventListener('push', function(event) {
  let data = {
    title: '🔔 NUEVO PEDIDO DEWAN',
    body: 'Toca para ver el pedido',
    pedido_id: 0,
    cliente: '',
    detalle: '',
    direccion: ''
  };

  try {
    if (event.data) {
      const p = event.data.json();
      data = { ...data, ...p };
    }
  } catch (e) {
    try { data.body = event.data.text(); } catch(e2) {}
  }

  // Construir cuerpo de notificación con detalles del pedido
  const bodyLines = [];
  if (data.cliente) bodyLines.push('👤 ' + data.cliente);
  if (data.detalle) bodyLines.push('📝 ' + data.detalle);
  if (data.direccion) bodyLines.push('📍 ' + data.direccion);
  if (bodyLines.length === 0) bodyLines.push(data.body);

  const notifOptions = {
    body: bodyLines.join('\n'),
    icon: '/app/icon-192.png',
    badge: '/app/icon-72.png',
    vibrate: [500, 200, 500, 200, 500, 200, 800],
    requireInteraction: true,
    renotify: true,
    silent: false,
    tag: 'dewan-pedido-' + (data.pedido_id || Date.now()),
    data: { pedido_id: data.pedido_id, url: '/app' },
    actions: [
      { action: 'ver', title: '🚀 Ver Pedido' },
      { action: 'cerrar', title: 'Ignorar' }
    ]
  };

  event.waitUntil(
    Promise.all([
      // 1. Mostrar notificación visual
      self.registration.showNotification(data.title, notifOptions),

      // 2. Intentar reproducir alarma en el SW
      playAlarmInSW(),

      // 3. Enviar mensaje a la app si está abierta (para activar alarma visual)
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
        for (const client of list) {
          client.postMessage({
            type: 'NUEVO_PEDIDO_PUSH',
            pedido_id: data.pedido_id,
            cliente: data.cliente,
            detalle: data.detalle,
            direccion: data.direccion,
            direccion_retiro: data.direccion_retiro || ''
          });
        }
      })
    ])
  );
});

// ─── CLICK en notificación ───────────────────────────────────────────────────
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'cerrar') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      // Si la app ya está abierta, enfocarla
      for (const c of list) {
        if (c.url.includes('/app') && 'focus' in c) {
          c.postMessage({ type: 'ABRIR_PEDIDO', pedido_id: event.notification.data?.pedido_id });
          return c.focus();
        }
      }
      // Si no está abierta, abrirla
      return clients.openWindow('/app');
    })
  );
});

// ─── INSTALL / ACTIVATE ──────────────────────────────────────────────────────
self.addEventListener('install', function(event) {
  console.log('[SW] ' + SW_VERSION + ' instalado');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('[SW] ' + SW_VERSION + ' activado');
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(n) { return caches.delete(n); }));
    }).then(function() { return clients.claim(); })
  );
});
