/* DEWAN Cliente — Service Worker v1
   OJO: este SW es de la app CLIENTE (menu.html). La app del motorizado
   tiene su propio sw.js. Este se registra con scope '/app/menu.html'
   para no pisar a la del moto.

   Estrategia:
   - Navegación (el HTML): red primero, copia en caché de respaldo (offline).
   - Imágenes de Supabase Storage / fuentes: stale-while-revalidate con tope.
   - API de datos (rest/v1) y webhooks: red siempre (datos frescos);
     para GET de rest/v1 se guarda copia como respaldo offline.
*/
const VER = 'dewan-cliente-v1';
const CACHE_PAGE = VER + '-page';
const CACHE_IMG = VER + '-img';
const CACHE_DATA = VER + '-data';
const IMG_MAX = 150; // tope de imágenes cacheadas (LRU aproximado)

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith('dewan-cliente-') && !k.startsWith(VER)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

async function trimCache(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length > max) {
    // borra las más viejas (las primeras en la lista)
    for (const k of keys.slice(0, keys.length - max)) await cache.delete(k);
  }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return; // POST/PUT (pedidos, webhooks) jamás se tocan

  const url = new URL(req.url);

  // 1) Navegación → red primero, respaldo en caché (para abrir sin señal)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_PAGE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }))
    );
    return;
  }

  // 2) Imágenes del Storage de Supabase + fuentes → stale-while-revalidate
  const esImagen =
    (url.hostname.endsWith('.supabase.co') && url.pathname.includes('/storage/')) ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'fonts.googleapis.com' ||
    req.destination === 'image';
  if (esImagen) {
    e.respondWith(
      caches.open(CACHE_IMG).then(async (cache) => {
        const hit = await cache.match(req);
        const fetching = fetch(req)
          .then((res) => {
            if (res && res.ok) {
              cache.put(req, res.clone());
              trimCache(CACHE_IMG, IMG_MAX);
            }
            return res;
          })
          .catch(() => hit);
        return hit || fetching;
      })
    );
    return;
  }

  // 3) Datos de Supabase (rest/v1) → red primero, respaldo offline
  if (url.hostname.endsWith('.supabase.co') && url.pathname.startsWith('/rest/')) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_DATA).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // 4) Resto (pixel, n8n, etc.) → red directa, sin tocar
});
