// DEWAN Motorizado - Service Worker v8
// Mejoras: push más confiable, reconexión automática, mejor cache

const CACHE_NAME = 'dewan-v8';
const ASSETS = [
  '/app/',
  '/app/index.html',
  '/app/manifest.json',
];

// ============================================================
// INSTALL - Cachear assets principales
// ============================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ============================================================
// ACTIVATE - Limpiar caches viejos
// ============================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ============================================================
// FETCH - Cache-first para assets, network-first para API
// ============================================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API calls: siempre red
  if (url.hostname.includes('easypanel') || url.pathname.includes('webhook')) {
    return;
  }

  // Assets JS/CSS: cache-first (tienen hash en nombre)
  if (url.pathname.includes('/app/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // index.html: network-first con fallback a cache
  if (url.pathname === '/app/' || url.pathname === '/app/index.html') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  }
});

// ============================================================
// PUSH - Notificación con datos del pedido
// ============================================================
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data?.json() || {};
  } catch {
    data = { title: '🔔 Nuevo pedido', body: 'Tienes un pedido nuevo en DEWAN' };
  }

  const title = data.title || '🔔 ¡Nuevo pedido DEWAN!';
  const options = {
    body: data.body || data.detalle || 'Toca para ver el pedido',
    icon: '/app/icons/icon-192.png',
    badge: '/app/icons/badge-72.png',
    tag: 'dewan-pedido-' + (data.pedido_id || Date.now()),
    renotify: true,
    requireInteraction: true,           // No desaparece hasta que el usuario toque
    vibrate: [500, 200, 500, 200, 500], // Vibración fuerte
    data: {
      pedido_id: data.pedido_id,
      cliente: data.cliente,
      detalle: data.detalle,
      direccion: data.direccion,
      url: '/app/',
    },
    actions: [
      { action: 'ver', title: '👁️ Ver pedido' },
      { action: 'dismiss', title: '✕ Cerrar' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ============================================================
// NOTIFICATION CLICK - Abrir app y pasar datos del pedido
// ============================================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const pedidoData = event.notification.data;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si la app ya está abierta, enfocarla y enviarle los datos
      for (const client of clientList) {
        if (client.url.includes('/app/') && 'focus' in client) {
          client.focus();
          client.postMessage({
            type: 'NUEVO_PEDIDO_PUSH',
            ...pedidoData,
          });
          return;
        }
      }
      // Si no está abierta, abrirla
      return clients.openWindow('/app/?pedido=' + (pedidoData?.pedido_id || ''));
    })
  );
});

// ============================================================
// MESSAGE - Comunicación con la app
// ============================================================
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'PING') {
    event.source?.postMessage({ type: 'PONG', version: CACHE_NAME });
  }
});
