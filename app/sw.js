
// DEWAN - Service Worker v7 - OPTIMIZADO
const SW_VERSION = 'v7';

// ─── CACHE: WAV pregenerado (evita recalcular 220K muestras en cada push) ────
let _cachedWavBuffer = null;

function getAlarmWavBuffer() {
  if (_cachedWavBuffer) return _cachedWavBuffer;

  const sr = 22050, dur = 5, n = sr * dur;
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const wr = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };

  wr(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true);
  wr(8, 'WAVE'); wr(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  wr(36, 'data'); v.setUint32(40, n * 2, true);

  // Precalcular constantes fuera del loop
  const TWO_PI = 2 * Math.PI;
  const freqMod = TWO_PI * 3;
  const beatMod = TWO_PI * 4;

  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const freq = 1050 + 350 * Math.sin(freqMod * t);
    const wave = Math.sin(TWO_PI * freq * t);
    const beat = Math.sin(beatMod * t) > 0 ? 1.0 : 0.15;
    const harmonic = Math.sin(TWO_PI * freq * 2 * t) * 0.3;
    const sample = (wave + harmonic) * beat * 0.95;
    v.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, sample * 32767)), true);
  }

  // Cachear el ArrayBuffer directamente — sin conversion a base64
  _cachedWavBuffer = buf;
  return buf;
}

// ─── Reproducir alarma directo desde ArrayBuffer (sin base64 intermedio) ─────
async function playAlarmInSW() {
  try {
    const wavBuffer = getAlarmWavBuffer();
    // Clonar buffer porque decodeAudioData lo consume
    const clone = wavBuffer.slice(0);
    const ctx = new AudioContext();
    const decoded = await ctx.decodeAudioData(clone);
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

// ─── PUSH: notificacion + alarma en paralelo (sin bloqueo mutuo) ─────────────
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
    urgency: 'high',
    tag: 'dewan-pedido-' + (data.pedido_id || Date.now()),
    data: { pedido_id: data.pedido_id, url: '/app' },
    actions: [
      { action: 'ver', title: '🚀 Ver Pedido' },
      { action: 'cerrar', title: 'Ignorar' }
    ]
  };

  // Notificacion visual PRIMERO (critica), alarma y mensaje en paralelo sin bloquear
  const messagePayload = {
    type: 'NUEVO_PEDIDO_PUSH',
    pedido_id: data.pedido_id,
    cliente: data.cliente,
    detalle: data.detalle,
    direccion: data.direccion,
    direccion_retiro: data.direccion_retiro || ''
  };

  event.waitUntil(
    // La notificacion es lo mas importante — no debe fallar por la alarma
    self.registration.showNotification(data.title, notifOptions).then(() =>
      // Despues de mostrar notificacion, alarma y mensajes en paralelo
      Promise.allSettled([
        playAlarmInSW(),
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
          for (const client of list) {
            client.postMessage(messagePayload);
          }
        })
      ])
    )
  );
});

// ─── CLICK en notificacion ───────────────────────────────────────────────────
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'cerrar') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (const c of list) {
        if (c.url.includes('/app') && 'focus' in c) {
          c.postMessage({ type: 'ABRIR_PEDIDO', pedido_id: event.notification.data?.pedido_id });
          return c.focus();
        }
      }
      return clients.openWindow('/app');
    })
  );
});

// ─── INSTALL / ACTIVATE con precache de recursos criticos ────────────────────
const CACHE_NAME = 'dewan-v7';
const PRECACHE_URLS = [
  '/app/',
  '/app/icon-192.png',
  '/app/icon-72.png'
];

self.addEventListener('install', function(event) {
  console.log('[SW] ' + SW_VERSION + ' instalado');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS).catch(function() {
        console.log('[SW] Precache parcial - algunos recursos no disponibles offline');
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[SW] ' + SW_VERSION + ' activado');
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    }).then(function() {
      // Pregenerar WAV en activate (cuando hay tiempo idle)
      getAlarmWavBuffer();
      return clients.claim();
    })
  );
});

// ─── FETCH: Network-first con fallback a cache (para PWA offline) ────────────
self.addEventListener('fetch', function(event) {
  // Solo cachear GET requests de recursos propios
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});
