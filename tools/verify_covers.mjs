// Verificación con DATOS VIVOS de la selección de portadas nueva (menu.html):
// replica loadPopularidad30d + ranking ventas→barajado-diario y muestra qué
// portadas salen para los locales de la queja (Brisa Marina, Los Morochos).
import { readFileSync } from 'fs';

const html = readFileSync('app/menu.html', 'utf8');
const SB_URL = html.match(/SB_URL\s*=\s*['"]([^'"]+)['"]/)[1];
const KEY = html.match(/SB_KEY\s*=\s*['"]([^'"]+)['"]/)?.[1] || html.match(/apikey['"]?\s*[:=]\s*['"]([^'"]+)['"]/)?.[1];
if (!KEY) { console.log('NO-KEY'); process.exit(1); }
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };

const removeAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

// popularidad 30d (igual que loadPopularidad30d)
const desde = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
const pedidos = await (await fetch(`${SB_URL}/rest/v1/pedidos_delivery?select=restaurante_id,detalle_pedido&fecha_creacion=gte.${encodeURIComponent(desde)}&estado_pedido=neq.cancelado&order=fecha_creacion.desc&limit=1000`, { headers: H })).json();
const platos = {};
const re = /^\s*(\d+)\s*x\s+(.+?)\s+[—–-]\s+\$/;
for (const rw of pedidos) {
  for (const l of String(rw.detalle_pedido || '').split('\n')) {
    const m = l.match(re);
    if (m) { const k = removeAccents(m[2].toLowerCase().trim()); platos[k] = (platos[k] || 0) + Number(m[1]); }
  }
}
console.log('pedidos 30d:', pedidos.length, '| platos con ventas:', Object.keys(platos).length);

const rests = await (await fetch(`${SB_URL}/rest/v1/restaurantes?select=id,nombre`, { headers: H })).json();
const items = await (await fetch(`${SB_URL}/rest/v1/menu_items?select=nombre_item,categoria_menu,foto_url,restaurante_id&disponible=eq.true&foto_url=not.is.null&limit=1000`, { headers: H })).json();

const ventas = (n) => platos[removeAccents(String(n || '').toLowerCase().trim())] || 0;
const dayShuffle = (arr, key) => {
  const d = new Date(), seed = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
  return arr.slice().sort((a, b) => {
    const h = (x) => (key(x) + seed).split('').reduce((s, c) => (s * 31 + c.charCodeAt(0)) % 9973, 7);
    return h(a) - h(b);
  });
};

for (const nombreBuscado of ['brisa', 'moroch']) {
  const r = rests.find((x) => removeAccents(x.nombre.toLowerCase()).includes(nombreBuscado));
  if (!r) { console.log(`\n"${nombreBuscado}": NO encontrado`); continue; }
  const cand = [];
  const seen = new Set();
  for (const it of items) {
    if (it.restaurante_id !== r.id || !it.foto_url || seen.has(it.foto_url)) continue;
    seen.add(it.foto_url);
    cand.push({ nombre: it.nombre_item, v: ventas(it.nombre_item) });
  }
  const orden = dayShuffle(cand, (x) => x.nombre);
  orden.sort((a, b) => b.v - a.v);
  console.log(`\n${r.nombre} — ${cand.length} fotos candidatas. PORTADAS HOY (1ª manda):`);
  orden.slice(0, 3).forEach((x, i) => console.log(`  ${i + 1}. ${x.nombre}  (ventas 30d: ${x.v})`));
}
