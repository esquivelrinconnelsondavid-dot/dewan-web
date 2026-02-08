self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});

self.addEventListener('push', function(event) {
  var data = {
    title: 'DEWAN',
    body: 'Tienes un nuevo pedido',
    tag: 'dewan-pedido',
    data: { url: '/app/' }
  };

  try {
    if (event.data) {
      var payload = event.data.json();
      if (payload.title) data.title = payload.title;
      if (payload.body) data.body = payload.body;
      if (payload.tag) data.tag = payload.tag;
      if (payload.data) data.data = payload.data;
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  var options = {
    body: data.body,
    tag: data.tag,
    vibrate: [300, 100, 300, 100, 400],
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Ver pedido' },
      { action: 'dismiss', title: 'Cerrar' }
    ],
    data: data.data
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'dismiss') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.indexOf('/app') !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('/app/');
    })
  );
});
