/* Ryo Burger — service worker
   - Shell (html/css/js/logo/iconos) precacheado; navegación = red primero, respaldo caché (abre sin señal).
   - Fotos del Storage y fuentes = caché primero + refresco en segundo plano.
   - GET a Supabase REST = red primero (precios vivos), respaldo caché.
   - POST / webhooks: NUNCA se interceptan (el pedido siempre va a la red). */
const V = 'ryo-v13';
const SHELL = ['./', './index.html', './app.css?v=3', './app.js?v=12', './img/logo.webp', './icons/icon-192.png', './icons/icon-512.png', './manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

const esFoto = (u) => /supabase\.co\/storage\/v1\/object\/public\//.test(u) || /fonts\.gstatic\.com/.test(u) || /maps\.googleapis\.com\/maps\/api\/staticmap/.test(u);
const esRest = (u) => /supabase\.co\/rest\/v1\//.test(u);

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return; // pedidos y webhooks: directo a la red, sin tocar
  const url = req.url;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(V).then((x) => x.put('./', c)); return r; })
      .catch(() => caches.match('./').then((r) => r || caches.match('./index.html'))));
    return;
  }
  if (esFoto(url)) {
    e.respondWith(caches.open(V).then(async (c) => {
      const hit = await c.match(req);
      const red = fetch(req).then((r) => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || red;
    }));
    return;
  }
  if (esRest(url)) {
    e.respondWith(fetch(req).then((r) => { if (r && r.ok) { const c = r.clone(); caches.open(V).then((x) => x.put(req, c)); } return r; })
      .catch(() => caches.match(req)));
    return;
  }
  if (url.startsWith(self.location.origin)) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { if (r && r.ok) { const c = r.clone(); caches.open(V).then((x) => x.put(req, c)); } return r; })));
  }
});
