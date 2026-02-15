// DEWAN - Service Worker v4 - NO CACHE
// Solo maneja push notifications, NO cachea nada

self.addEventListener('push', function(event) {
  let data = { title: '🆕 Nuevo Pedido DEWAN', body: 'Tienes un nuevo pedido asignado', pedido_id: 0 };
  try { if (event.data) { const p = event.data.json(); data = { ...data, ...p }; } } catch (e) { try { data.body = event.data.text(); } catch(e2){} }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body, icon: '/app/icon-192.png', badge: '/app/icon-72.png',
      vibrate: [300, 100, 300, 100, 400], requireInteraction: true, renotify: true, silent: false,
      tag: 'dewan-pedido-' + (data.pedido_id || Date.now()),
      data: { pedido_id: data.pedido_id, url: '/app' },
      actions: [{ action: 'ver', title: 'Ver Pedido' }, { action: 'cerrar', title: 'Cerrar' }]
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'cerrar') return;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
    for (const c of list) { if (c.url.includes('/app') && 'focus' in c) return c.focus(); }
    return clients.openWindow('/app');
  }));
});

self.addEventListener('install', function(event) {
  console.log('[SW] v4 instalado');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('[SW] v4 activado - limpiando todos los cachés');
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(n) { return caches.delete(n); }));
    }).then(function() { return clients.claim(); })
  );
});

// NO fetch handler = NO caching
