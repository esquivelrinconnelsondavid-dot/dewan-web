const CACHE_NAME = 'dewan-moto-v3';
const STATIC_ASSETS = [
  '/app/',
  '/app/index.html',
  '/app/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
];

// Install - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch - network first for API, cache first for static
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // API calls - network only
  if (url.hostname.includes('n8n') || url.hostname.includes('nocodb') || url.hostname.includes('chatwoot')) return;
  
  // Google Maps - network only  
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com')) return;
  
  // Static assets - cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for HTML
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/app/index.html');
        }
      });
    })
  );
});

// Push notification handler with vibration
self.addEventListener('push', event => {
  let data = { title: '🔔 DEWAN', body: 'Nuevo pedido disponible' };
  
  try {
    if (event.data) {
      const payload = event.data.json();
      data = {
        title: payload.title || data.title,
        body: payload.body || data.body,
        data: payload.data || {}
      };
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }
  
  const options = {
    body: data.body,
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" rx="20" fill="%2306090f"/%3E%3Ctext x="50" y="68" text-anchor="middle" font-size="55"%3E🏍️%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext x="50" y="68" text-anchor="middle" font-size="60"%3E📦%3C/text%3E%3C/svg%3E',
    vibrate: [300, 100, 300, 100, 400],
    tag: 'dewan-pedido-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    actions: [
      { action: 'open', title: '📱 Abrir App' },
      { action: 'dismiss', title: '❌ Cerrar' }
    ],
    data: data.data
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Click on notification - open app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'dismiss') return;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Focus existing window if open
      for (const client of windowClients) {
        if (client.url.includes('/app') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      return clients.openWindow('/app/');
    })
  );
});
