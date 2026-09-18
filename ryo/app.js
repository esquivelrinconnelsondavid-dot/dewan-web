/* ============================================================
   RYO BURGER — app web de pedidos
   El pedido NO pasa por WhatsApp: se guarda directo en pedidos_sistema
   (mismo INSERT que carta/sistema.js, ya probado con el panel del local).
   El panel de Ryo lo recibe al instante, el cliente sigue el pedido en
   dewansas.com/pedido/?s=sistema&t=TOKEN y a domicilio lo lleva una
   moto DEWAN (gemelo en pedidos_delivery, lo crea el wf de avisos).
   ============================================================ */
(function () {
  'use strict';
  const CFG = {
    rid: '0cca9530-df0c-4151-87ee-ad619429e714',
    nombre: 'Ryo Burger',
    local: { lat: -1.6653981066649846, lng: -78.65913811876005, direccion: 'Av. Carlos Zambrano y Reina Pacha', ciudad: 'Riobamba' },
    horario: { abre: '12:00', cierra: '22:30' },
    supa: 'https://wfpdtjmmrhhfuxayvpzu.supabase.co',
    anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcGR0am1tcmhoZnV4YXl2cHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzE1NDksImV4cCI6MjA4ODY0NzU0OX0.Iyeogfs5AIiVrM5agXuMZsgFrud460OYvn0zkYgJH0s',
    tabla: 'pedidos_sistema',
    cotizador: 'https://n8n.dewansas.com/webhook/calcular-precio',
    seguimiento: 'https://dewansas.com/pedido/?s=sistema&t=',
    fotos: 'https://wfpdtjmmrhhfuxayvpzu.supabase.co/storage/v1/object/public/menu-fotos/0cca9530-df0c-4151-87ee-ad619429e714/',
    mapsKey: 'AIzaSyBktkFnRg3Lp8h93MktPzQ2XtAcim7lAhs',
    maxKm: 12
  };
  // Orden y presentación de las categorías (las de Supabase se mapean por nombre)
  const CATS = [
    { k: 'Colección',                 t: 'La Colección',        e: '🍔', sub: 'Todas con 160 g de carne · sola $4,99 · combo $6,99' },
    { k: 'Hamburguesas',              t: 'Las de la casa',      e: '🔥', sub: 'Clásica, Ranchera, Criolla, Blue Cheese, Mega y Sultana' },
    { k: 'Hamburguesas de Pollo',     t: 'De pollo crocante',   e: '🐔' },
    { k: 'Hamburguesas Lomo Fino',    t: 'Lomo fino',           e: '🥩', sub: '180 g de lomo fino en pan de papa · nuevas' },
    { k: 'Hamburguesas Vegetarianas', t: 'Veggie',              e: '🥬' },
    { k: 'Alitas',                    t: 'Alitas',              e: '🍗', sub: 'Elige tu salsa · vienen con papas' },
    { k: 'Costillas',                 t: 'Costillas',           e: '🍖' },
    { k: 'Promos',                    t: 'Promos',              e: '🎉', sub: 'Lunes, martes y jueves tienen lo suyo' },
    { k: 'Especiales',                t: 'Para compartir',      e: '👨‍👩‍👧' },
    { k: 'Ensaladas',                 t: 'Ensaladas',           e: '🥗' },
    { k: 'Menú Infantil',             t: 'Menú infantil',       e: '🧒' },
    { k: 'Extras',                    t: 'Papas y picadas',     e: '🍟', lista: true },
    { k: 'Bebidas',                   t: 'Bebidas',             e: '🥤', lista: true },
    { k: 'Ingredientes Extra',        t: 'Ingredientes extra',  e: '➕', lista: true, sub: 'Para sumarle a tu hamburguesa' }
  ];
  const PROMOS_DIA = {
    1: { em: '🔵', k: 'Hoy es lunes', t: 'Lunes para Todos', d: '2 hamburguesas de Colección + papita clásica + 2 colas', p: 11.50, antes: 15.50, buscar: 'lunes para todos' },
    2: { em: '🟠', k: 'Hoy es martes', t: 'Martes Locos', d: '2 hamburguesas de Colección a elección', p: null, antes: 10.00, buscar: 'martes locos' },
    3: { em: '🟡', k: 'Hoy es miércoles', t: 'Miércoles 3x2', d: 'En hamburguesas · pide 3 y pagas 2 (lo aplica el local)', p: null, antes: null, buscar: null },
    4: { em: '🔴', k: 'Hoy es jueves', t: 'Jueves de Costillas & Alitas', d: '8 alas + papa + cola $6,75 · 15 alas + papa grande + 2 Sprite $12,25', p: null, antes: null, buscar: 'jueves' }
  };
  const $ = (q, el) => (el || document).querySelector(q);
  const $$ = (q, el) => Array.prototype.slice.call((el || document).querySelectorAll(q));
  const money = (n) => '$' + (Math.round(Number(n) * 100) / 100).toFixed(2).replace('.', ',');
  const norm = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  const fetchJson = async (url, opt, ms) => {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms || 8000);
    try { const r = await fetch(url, Object.assign({ signal: ctl.signal }, opt || {})); const j = await r.json(); return { ok: r.ok, status: r.status, json: j }; }
    finally { clearTimeout(t); }
  };
  let toastT = null;
  function toast(msg, ms) {
    let d = $('#toast'); if (!d) { d = document.createElement('div'); d.id = 'toast'; d.className = 'toast'; document.body.appendChild(d); }
    d.textContent = msg; d.classList.remove('oculto'); clearTimeout(toastT); toastT = setTimeout(() => d.classList.add('oculto'), ms || 2200);
  }

  /* ================= ESTADO ================= */
  let PRODUCTOS = [];          // catálogo agrupado (una tarjeta por producto, con variantes)
  let POR_ID = {};             // id de Supabase -> {nombre, precio, cat}
  let cart = ls.get('ryo_cart', []);            // [{key,id,nombre,precio,qty,salsa,nota}]
  let entrega = ls.get('ryo_entrega', 'domicilio'); // 'domicilio' | 'retiro'
  let cliente = ls.get('ryo_cliente', {});      // {nombre, tel, ref, lat, lng}
  let ubic = (cliente.lat && cliente.lng) ? { lat: cliente.lat, lng: cliente.lng, guardada: true } : null;
  let envio = { estado: 'na', valor: 0, km: 0, min: 0 };  // na | loading | ok | err | lejos
  let ubicKey = '';
  let abierto = true, motivoCerrado = '';
  let pago = ls.get('ryo_pago', 'Efectivo');
  let catActiva = '';

  /* ================= MENÚ ================= */
  function leerEmbed() {
    try { return JSON.parse($('#menu-embed').textContent); } catch (e) { return []; }
  }
  async function cargarMenu() {
    // 1) embebido al instante, 2) lo vivo de Supabase pisa precios/disponibilidad
    let rows = leerEmbed();
    construir(rows); pintarMenu();
    try {
      const r = await fetchJson(CFG.supa + '/rest/v1/vitrina_menu?restaurante_id=eq.' + CFG.rid + '&select=id,categoria_menu,nombre_item,descripcion,precio,foto_url&order=categoria_menu,nombre_item',
        { headers: { apikey: CFG.anon, Authorization: 'Bearer ' + CFG.anon } }, 7000);
      if (r.ok && Array.isArray(r.json) && r.json.length) {
        rows = r.json.map((x) => ({ id: x.id, c: x.categoria_menu, n: x.nombre_item, d: x.descripcion || '', p: Number(x.precio) || 0, f: String(x.foto_url || '').replace(CFG.fotos, '') }));
        construir(rows); pintarMenu(); pintarCarritoBadge();
      }
    } catch (e) { /* nos quedamos con el embebido */ }
  }
  // "Ryo Texas Combo" -> base "Ryo Texas", variante "Combo"
  const RE_VAR = /\s+(Sola|Combo|Mediana|Grande|(\d+)\s+unidades)$/i;
  function construir(rows) {
    POR_ID = {}; const mapa = new Map();
    rows.forEach((r) => {
      POR_ID[r.id] = { nombre: r.n, precio: r.p, cat: r.c };
      const m = r.n.match(RE_VAR);
      const base = m ? r.n.slice(0, m.index).trim() : r.n;
      const varLabel = m ? m[1] : '';
      const key = r.c + '|' + norm(base);
      if (!mapa.has(key)) mapa.set(key, { key, cat: r.c, nombre: base, desc: '', foto: r.f || '', variantes: [], salsas: [], nuevo: false });
      const p = mapa.get(key);
      if (!p.desc || (r.d && r.d.length > p.desc.length && !varLabel.match(/combo/i))) p.desc = limpiarDesc(r.d);
      if (!p.foto && r.f) p.foto = r.f;
      p.variantes.push({ id: r.id, label: etiquetaVar(varLabel, r.d), precio: r.p, nombre: r.n, orden: varLabel ? (varLabel.match(/sola|mediana/i) ? 0 : (varLabel.match(/combo|grande/i) ? 1 : parseInt(varLabel) || 2)) : 0 });
      const s = parsearSalsas(r.d); if (s.length) p.salsas = s;
      if (/pork bacon|gaucha|primicias/i.test(r.n)) p.nuevo = true;
    });
    PRODUCTOS = Array.from(mapa.values());
    PRODUCTOS.forEach((p) => { p.variantes.sort((a, b) => a.orden - b.orden || a.precio - b.precio); p.desde = Math.min.apply(null, p.variantes.map((v) => v.precio)); });
  }
  function etiquetaVar(v, desc) {
    if (!v) return '';
    if (/combo/i.test(v)) return 'Combo · papas + bebida';
    if (/sola/i.test(v)) return 'Sola';
    if (/mediana/i.test(v)) return 'Mediana';
    if (/grande/i.test(v)) return 'Grande';
    const n = parseInt(v); if (n) return n + ' unidades';
    return v;
  }
  function limpiarDesc(d) {
    return String(d || '').replace(/\s*\+\s*papas\s*\+\s*bebida\s*$/i, '').replace(/Salsas a elecci[oó]n:.*$/i, '').replace(/\s+$/, '').replace(/[,.]\s*$/, '');
  }
  function parsearSalsas(d) {
    const m = /Salsas a elecci[oó]n:\s*([^.\n]+)/i.exec(d || '');
    if (!m) return [];
    return m[1].split('/').map((s) => s.trim()).filter(Boolean);
  }
  function catInfo(k) { return CATS.find((c) => norm(c.k) === norm(k)) || { k, t: k, e: '🍽️' }; }
  function catsPresentes() {
    const set = new Set(PRODUCTOS.map((p) => norm(p.cat)));
    const ord = CATS.filter((c) => set.has(norm(c.k)));
    PRODUCTOS.forEach((p) => { if (!ord.some((c) => norm(c.k) === norm(p.cat))) ord.push({ k: p.cat, t: p.cat, e: '🍽️' }); });
    return ord;
  }
  function fotoUrl(f) { if (!f) return ''; return /^https?:/.test(f) ? f : CFG.fotos + f; }
  function emojiDe(p) { return catInfo(p.cat).e || '🍽️'; }

  /* ================= PINTAR MENÚ ================= */
  function pintarMenu(filtro) {
    const cats = catsPresentes();
    const chips = $('#chips');
    chips.innerHTML = cats.map((c) => '<button class="chip' + (norm(c.k) === norm(catActiva || cats[0].k) ? ' on' : '') + '" data-cat="' + esc(c.k) + '">' + c.e + ' ' + esc(c.t) + '</button>').join('');
    if (!catActiva && cats[0]) catActiva = cats[0].k;
    const q = norm(filtro || '');
    const cont = $('#menu');
    let html = '';
    cats.forEach((c) => {
      let prods = PRODUCTOS.filter((p) => norm(p.cat) === norm(c.k));
      if (q) prods = prods.filter((p) => norm(p.nombre + ' ' + p.desc).includes(q));
      if (!prods.length) return;
      html += '<section class="seccion" id="cat-' + slug(c.k) + '"><h2 class="tit">' + c.e + ' ' + esc(c.t) + ' <small>' + prods.length + '</small></h2>' + (c.sub ? '<div class="sub">' + esc(c.sub) + '</div>' : '') + '</section>';
      if (c.lista) html += '<div class="lista">' + prods.map(filaHtml).join('') + '</div>';
      else html += '<div class="grid">' + prods.map(cardHtml).join('') + '</div>';
    });
    cont.innerHTML = html || '<div class="vacio">No encontré nada con "' + esc(filtro) + '" 🙈</div>';
    pintarCarritoBadge();
  }
  function qtyDe(p) { return cart.filter((c) => p.variantes.some((v) => v.id === c.id)).reduce((t, c) => t + c.qty, 0); }
  function cardHtml(p) {
    const q = qtyDe(p); const f = fotoUrl(p.foto);
    const unaVar = p.variantes.length === 1;
    return '<button class="card" data-prod="' + esc(p.key) + '" aria-label="' + esc(p.nombre) + '">' +
      '<div class="foto">' + (f ? '<img src="' + esc(f) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">' : '') + (f ? '' : '<div class="emoji">' + emojiDe(p) + '</div>') +
      (p.nuevo ? '<span class="tag">Nuevo</span>' : '') + (p.salsas.length ? '<span class="tag rojo">Elige salsa</span>' : '') + '</div>' +
      '<div class="cuerpo"><div class="nom tit">' + esc(p.nombre) + '</div>' + (p.desc ? '<div class="desc">' + esc(p.desc) + '</div>' : '') +
      '<div class="pie"><div class="precio">' + (unaVar ? '' : '<small>desde</small>') + money(p.desde) + '</div>' +
      '<span class="mas' + (q ? ' qty' : '') + '">' + (q ? q + ' en tu pedido' : '+') + '</span></div></div></button>';
  }
  function filaHtml(p) {
    const q = qtyDe(p); const f = fotoUrl(p.foto);
    return '<button class="fila" data-prod="' + esc(p.key) + '" aria-label="' + esc(p.nombre) + '">' +
      '<div class="mini">' + (f ? '<img src="' + esc(f) + '" alt="" loading="lazy" onerror="this.parentNode.textContent=\'' + emojiDe(p) + '\'">' : emojiDe(p)) + '</div>' +
      '<div><div class="nom">' + esc(p.nombre) + '</div>' + (p.desc ? '<div class="desc">' + esc(p.desc) + '</div>' : '') + '</div>' +
      '<div class="precio">' + (p.variantes.length > 1 ? '<small style="font-family:var(--fuente);font-size:11px;color:var(--texto3)">desde </small>' : '') + money(p.desde) + '</div>' +
      '<span class="mas' + (q ? ' qty' : '') + '">' + (q ? q : '+') + '</span></button>';
  }
  const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-');

  /* ================= HOJA DE PRODUCTO ================= */
  let hojaAbierta = null;
  function abrirHoja(html, onClose) {
    cerrarHoja();
    const velo = document.createElement('div'); velo.className = 'velo-hoja'; velo.id = 'velo';
    const hoja = document.createElement('div'); hoja.className = 'hoja'; hoja.id = 'hoja'; hoja.setAttribute('role', 'dialog');
    hoja.innerHTML = '<div class="asa"></div><button class="cerrar" aria-label="Cerrar">✕</button><div class="cuerpo-hoja">' + html + '</div>';
    document.body.appendChild(velo); document.body.appendChild(hoja);
    document.body.style.overflow = 'hidden';
    velo.addEventListener('click', cerrarHoja); $('.cerrar', hoja).addEventListener('click', cerrarHoja);
    hojaAbierta = { onClose }; history.pushState({ hoja: 1 }, '');
    return hoja;
  }
  function cerrarHoja(desdeAtras) {
    const v = $('#velo'), h = $('#hoja'); if (v) v.remove(); if (h) h.remove();
    document.body.style.overflow = '';
    if (hojaAbierta) { const cb = hojaAbierta.onClose; hojaAbierta = null; if (!desdeAtras && history.state && history.state.hoja) history.back(); if (cb) cb(); }
  }
  window.addEventListener('popstate', () => { if (hojaAbierta) cerrarHoja(true); });

  function abrirProducto(key) {
    const p = PRODUCTOS.find((x) => x.key === key); if (!p) return;
    let vSel = p.variantes[0], salsa = p.salsas[0] || '', qty = 1;
    const f = fotoUrl(p.foto);
    const html =
      '<div class="prod-foto">' + (f ? '<img src="' + esc(f) + '" alt="">' : '<div class="emoji">' + emojiDe(p) + '</div>') + '</div>' +
      '<div class="prod-nom tit">' + esc(p.nombre) + '</div>' + (p.desc ? '<div class="prod-desc">' + esc(p.desc) + '</div>' : '') +
      (p.variantes.length > 1 ? '<div class="bloque"><div class="et">Elige cómo la quieres</div><div class="opciones" id="vars">' +
        p.variantes.map((v, i) => '<button class="opcion' + (i === 0 ? ' on' : '') + '" data-i="' + i + '"><span class="radio"></span><div><b>' + esc(v.label || p.nombre) + '</b></div><span class="p">' + money(v.precio) + '</span></button>').join('') + '</div></div>' : '') +
      (p.salsas.length ? '<div class="bloque"><div class="et">Tu salsa <span id="salsa-sel">' + esc(salsa) + '</span></div><div class="salsas" id="salsas">' +
        p.salsas.map((s, i) => '<button class="salsa' + (i === 0 ? ' on' : '') + '" data-s="' + esc(s) + '">' + esc(s) + '</button>').join('') + '</div></div>' : '') +
      '<div class="bloque"><div class="et">Alguna nota para la cocina</div><input class="nota-in" id="nota-prod" maxlength="120" placeholder="' + esc(placeholderNota(p)) + '"></div>' +
      '<div class="prod-pie"><div class="stepper"><button id="q-menos" aria-label="menos">−</button><b id="q-n">1</b><button id="q-mas" aria-label="más">+</button></div>' +
      '<button class="btn-p" id="agregar"><span>Agregar</span><span class="t" id="agregar-total">' + money(vSel.precio) + '</span></button></div>';
    const hoja = abrirHoja(html);
    const refrescar = () => { $('#q-n', hoja).textContent = qty; $('#agregar-total', hoja).textContent = money(vSel.precio * qty); };
    $$('#vars .opcion', hoja).forEach((b) => b.addEventListener('click', () => { $$('#vars .opcion', hoja).forEach((x) => x.classList.remove('on')); b.classList.add('on'); vSel = p.variantes[+b.dataset.i]; refrescar(); }));
    $$('#salsas .salsa', hoja).forEach((b) => b.addEventListener('click', () => { $$('#salsas .salsa', hoja).forEach((x) => x.classList.remove('on')); b.classList.add('on'); salsa = b.dataset.s; $('#salsa-sel', hoja).textContent = salsa; }));
    $('#q-mas', hoja).addEventListener('click', () => { qty = Math.min(20, qty + 1); refrescar(); });
    $('#q-menos', hoja).addEventListener('click', () => { qty = Math.max(1, qty - 1); refrescar(); });
    $('#agregar', hoja).addEventListener('click', () => {
      const nota = ($('#nota-prod', hoja).value || '').trim().slice(0, 120);
      agregar(vSel, qty, salsa, nota);
      cerrarHoja();
      toast('✅ ' + qty + 'x ' + vSel.nombre + ' agregado');
    });
  }
  function placeholderNota(p) {
    if (/gordon|cordon/i.test(p.nombre)) return 'Ej: la quiero de lentejas';
    if (/infantil/i.test(p.nombre)) return 'Ej: con pop corn y jugo del Valle';
    if (/papas/i.test(p.nombre)) return 'Ej: rústicas';
    return 'Ej: sin cebolla, término medio…';
  }

  /* ================= CARRITO ================= */
  function agregar(v, qty, salsa, nota) {
    const key = v.id + '|' + norm(salsa) + '|' + norm(nota);
    const ex = cart.find((c) => c.key === key);
    if (ex) ex.qty += qty; else cart.push({ key, id: v.id, nombre: v.nombre, precio: v.precio, qty, salsa: salsa || '', nota: nota || '' });
    guardarCart(); pintarMenu($('#q').value); pintarCarritoBadge(true);
  }
  function guardarCart() { ls.set('ryo_cart', cart); }
  const subtotal = () => cart.reduce((t, c) => t + c.precio * c.qty, 0);
  const nItems = () => cart.reduce((t, c) => t + c.qty, 0);
  function pintarCarritoBadge(pop) {
    const fab = $('#fab'); const n = nItems();
    fab.classList.toggle('oculto-anim', n === 0);
    $('#fab-n').textContent = n; $('#fab-t').textContent = money(subtotal() + (entrega === 'domicilio' && envio.estado === 'ok' ? envio.valor : 0));
    if (pop) { fab.classList.remove('pop'); void fab.offsetWidth; fab.classList.add('pop'); }
  }

  /* ================= ENTREGA / ENVÍO ================= */
  const havKm = (la1, lo1, la2, lo2) => { const R = 6371, rad = Math.PI / 180, dLa = (la2 - la1) * rad, dLo = (lo2 - lo1) * rad; const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * rad) * Math.cos(la2 * rad) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(a)); };
  const tramos = (d) => d <= 2 ? 1.3 : d < 3 ? 1.5 : 1.75 + Math.ceil((d - 3) / 0.5) * 0.25;
  async function cotizar() {
    if (entrega !== 'domicilio' || !ubic) { envio = { estado: 'na', valor: 0, km: 0, min: 0 }; pintarEnvio(); return; }
    const key = ubic.lat.toFixed(4) + ',' + ubic.lng.toFixed(4);
    if (key === ubicKey && envio.estado === 'ok') { pintarEnvio(); return; }
    ubicKey = key;
    const recta = havKm(CFG.local.lat, CFG.local.lng, ubic.lat, ubic.lng);
    if (recta > CFG.maxKm) { envio = { estado: 'lejos', valor: 0, km: recta, min: 0 }; pintarEnvio(); return; }
    envio = { estado: 'loading', valor: 0, km: 0, min: 0 }; pintarEnvio();
    let precio = 0, km = 0, min = 0;
    try {
      const r = await fetchJson(CFG.cotizador, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origen_lat: CFG.local.lat, origen_lng: CFG.local.lng, destino_lat: ubic.lat, destino_lng: ubic.lng, origen: CFG.local.lat + ',' + CFG.local.lng, destino: ubic.lat + ',' + ubic.lng }) }, 9000);
      const j = r.json || {};
      if (j.ok !== false && Number(j.precio) > 0) { precio = Number(j.precio); km = Number(j.distancia_km) || 0; min = Number(j.duracion_minutos) || 0; }
    } catch (e) { /* estimado */ }
    if (!precio) { km = recta * 1.3; precio = tramos(km); }
    if (key !== ubicKey) return;
    envio = { estado: 'ok', valor: Math.round(precio * 100) / 100, km, min, estimado: !min };
    pintarEnvio();
  }
  function pintarEnvio() {
    const el = $('#envio-linea'); const enCheckout = $('#resumen');
    let txt = '';
    if (entrega === 'retiro') txt = '🏪 Retiras en <b>' + esc(CFG.local.direccion) + '</b> · sin costo de envío';
    else if (!ubic) txt = '📍 <button type="button" id="btn-ubic-top">Usa tu ubicación</button> para ver el precio del envío';
    else if (envio.estado === 'loading') txt = '⏳ Calculando tu envío…';
    else if (envio.estado === 'lejos') txt = '😕 Estás a ' + envio.km.toFixed(1) + ' km: fuera de la zona de entrega';
    else if (envio.estado === 'ok') txt = '🛵 Envío <b>' + money(envio.valor) + '</b> · ' + envio.km.toFixed(1) + ' km' + (envio.min ? ' · llega en ~' + (envio.min + 20) + ' min' : '') + ' <span class="ok">✓</span>';
    el.innerHTML = txt;
    const b = $('#btn-ubic-top'); if (b) b.addEventListener('click', pedirGPS);
    pintarCarritoBadge();
    if (enCheckout) pintarResumen();
  }
  function setEntrega(e) {
    entrega = e; ls.set('ryo_entrega', e);
    $$('#seg button').forEach((b) => b.classList.toggle('on', b.dataset.e === e));
    cotizar();
  }
  let pidiendoGPS = false;
  function pedirGPS(cb) {
    if (!navigator.geolocation) { toast('Tu teléfono no permite ubicación 📍'); return; }
    if (pidiendoGPS) return; pidiendoGPS = true;
    toast('📍 Buscando tu ubicación…', 6000);
    navigator.geolocation.getCurrentPosition((pos) => {
      pidiendoGPS = false;
      ubic = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy, guardada: false };
      cliente.lat = ubic.lat; cliente.lng = ubic.lng; ls.set('ryo_cliente', cliente);
      toast('📍 Ubicación lista ✓', 1500);
      cotizar(); pintarUbic();
      if (typeof cb === 'function') cb();
    }, () => {
      pidiendoGPS = false;
      toast('No pude obtener tu ubicación. Activa el GPS y permite el acceso 📍', 4000);
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }
  function mapaUrl(lat, lng, color, label) {
    return 'https://maps.googleapis.com/maps/api/staticmap?size=640x360&scale=2&zoom=16&language=es&center=' + lat + ',' + lng +
      '&markers=' + encodeURIComponent('color:0x' + color + '|label:' + label + '|' + lat + ',' + lng) + '&key=' + CFG.mapsKey;
  }

  /* ================= CHECKOUT ================= */
  function abrirCarrito() {
    if (!cart.length) { toast('Tu pedido está vacío 🍔'); return; }
    const html =
      '<div class="hoja-titulo tit">Tu pedido</div><div class="hoja-sub" id="hoja-sub-cart">' + nItems() + ' ítems · ' + (entrega === 'domicilio' ? 'a domicilio' : 'para retirar') + '</div>' +
      '<div class="cart-items" id="cart-items"></div>' +
      '<div class="bloque"><div class="et">Entrega</div><div class="segment" id="seg2">' +
        '<button data-e="domicilio" class="' + (entrega === 'domicilio' ? 'on' : '') + '">🛵 A domicilio<small>moto DEWAN</small></button>' +
        '<button data-e="retiro" class="' + (entrega === 'retiro' ? 'on' : '') + '">🏪 Retiro en local<small>sin costo</small></button></div>' +
        '<div id="zona-entrega"></div></div>' +
      '<div class="bloque"><div class="et">Tus datos</div>' +
        '<label class="campo"><span class="et">Tu nombre</span><input id="c-nombre" autocomplete="name" placeholder="Ej: Juan Pérez" value="' + esc(cliente.nombre || '') + '"><div class="err oculto" id="e-nombre">Escribe tu nombre</div></label>' +
        '<label class="campo"><span class="et">Tu WhatsApp</span><input id="c-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="Ej: 0991234567" maxlength="14" value="' + esc(cliente.tel || '') + '"><div class="err oculto" id="e-tel">Escribe tu número de 10 dígitos (para que el local te contacte)</div></label>' +
      '</div>' +
      '<div class="bloque"><div class="et">Cómo pagas</div><div class="pago" id="pago">' +
        '<button data-p="Efectivo" class="' + (pago === 'Efectivo' ? 'on' : '') + '">💵 Efectivo</button><button data-p="Transferencia" class="' + (pago === 'Transferencia' ? 'on' : '') + '">🏦 Transferencia</button></div></div>' +
      '<label class="campo"><span class="et">Nota para el local (opcional)</span><input id="c-nota" maxlength="200" placeholder="Ej: tocar el timbre, sin cebolla en todo…"></label>' +
      '<label class="toggle"><input type="checkbox" id="c-fact"> 🧾 Necesito factura</label>' +
      '<div id="fact-campos" class="oculto"><label class="campo"><span class="et">Nombre / Razón social</span><input id="f-nom" placeholder="Nombre para la factura" value="' + esc(cliente.fnom || '') + '"></label>' +
        '<div class="dos"><label class="campo"><span class="et">Cédula / RUC</span><input id="f-id" inputmode="numeric" maxlength="13" placeholder="0601234567" value="' + esc(cliente.fid || '') + '"></label>' +
        '<label class="campo"><span class="et">Correo</span><input id="f-mail" type="email" placeholder="correo@ejemplo.com" value="' + esc(cliente.fmail || '') + '"></label></div></div>' +
      '<div class="resumen" id="resumen"></div>' +
      '<div id="aviso-cerrado"></div>' +
      '<button class="btn-p btn-confirmar" id="confirmar"><span id="confirmar-txt">Confirmar pedido</span><span class="t" id="confirmar-total"></span></button>' +
      '<p style="font-size:12px;color:var(--texto3);margin-top:10px;text-align:center">Al confirmar, el local recibe tu pedido al instante y te damos un link para seguirlo en vivo.</p>';
    const hoja = abrirHoja(html);
    pintarCartItems();
    $$('#seg2 button', hoja).forEach((b) => b.addEventListener('click', () => { setEntrega(b.dataset.e); $$('#seg2 button', hoja).forEach((x) => x.classList.toggle('on', x.dataset.e === entrega)); pintarZonaEntrega(); pintarResumen(); if (entrega === 'domicilio' && !ubic) pedirGPS(); }));
    $$('#pago button', hoja).forEach((b) => b.addEventListener('click', () => { pago = b.dataset.p; ls.set('ryo_pago', pago); $$('#pago button', hoja).forEach((x) => x.classList.toggle('on', x === b)); pintarResumen(); }));
    $('#c-fact', hoja).addEventListener('change', (e) => $('#fact-campos', hoja).classList.toggle('oculto', !e.target.checked));
    $('#confirmar', hoja).addEventListener('click', confirmar);
    pintarZonaEntrega(); pintarResumen();
    if (entrega === 'domicilio' && !ubic) setTimeout(() => pedirGPS(), 250);
  }
  function pintarCartItems() {
    const c = $('#cart-items'); if (!c) return;
    c.innerHTML = cart.map((it, i) => '<div class="cart-item"><div><div class="n">' + esc(it.nombre) + '</div>' +
      ((it.salsa || it.nota) ? '<div class="d">' + esc([it.salsa ? 'Salsa: ' + it.salsa : '', it.nota].filter(Boolean).join(' · ')) + '</div>' : '') + '</div>' +
      '<div class="r"><div class="p">' + money(it.precio * it.qty) + '</div><div class="stepper chico"><button data-m="' + i + '">−</button><b>' + it.qty + '</b><button data-p="' + i + '">+</button></div></div></div>').join('');
    $$('[data-m]', c).forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.m; cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); guardarCart(); if (!cart.length) { cerrarHoja(); pintarMenu($('#q').value); return; } pintarCartItems(); pintarResumen(); pintarMenu($('#q').value); }));
    $$('[data-p]', c).forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.p; cart[i].qty = Math.min(20, cart[i].qty + 1); guardarCart(); pintarCartItems(); pintarResumen(); pintarMenu($('#q').value); }));
    const s = $('#hoja-sub-cart'); if (s) s.textContent = nItems() + ' ítems · ' + (entrega === 'domicilio' ? 'a domicilio' : 'para retirar');
  }
  function pintarZonaEntrega() {
    const z = $('#zona-entrega'); if (!z) return;
    if (entrega === 'retiro') {
      z.innerHTML = '<div class="retiro-box"><div class="em">🏪</div><div><b>Retiras en Ryo Burger</b><span>' + esc(CFG.local.direccion) + ' · ' + esc(CFG.local.ciudad) + '</span></div>' +
        '<a href="https://maps.google.com/?q=' + CFG.local.lat + ',' + CFG.local.lng + '" target="_blank" rel="noopener">Cómo llegar ›</a></div>';
      return;
    }
    z.innerHTML = '<div class="ubic" id="ubic-box"><div class="mapa" id="ubic-mapa"><img id="ubic-img" alt=""></div><div class="fila-ubic" id="ubic-fila"></div></div>' +
      '<label class="campo"><span class="et">Referencia de tu casa</span><input id="c-ref" maxlength="140" placeholder="Ej: casa blanca de 2 pisos, portón negro" value="' + esc(cliente.ref || '') + '"><div class="err oculto" id="e-ref">Cuéntanos una referencia para que la moto te encuentre</div></label>';
    pintarUbic();
  }
  function pintarUbic() {
    const fila = $('#ubic-fila'); if (!fila) return;
    const mapa = $('#ubic-mapa'), img = $('#ubic-img');
    if (ubic) {
      fila.innerHTML = '<div class="em">📍</div><div><b>' + (ubic.guardada ? 'Tu ubicación de la vez pasada' : 'Tu ubicación actual') + '</b><span>' + (ubic.acc ? 'precisión ~' + Math.round(ubic.acc) + ' m · ' : '') + 'la moto llega a este punto</span></div><button type="button" class="ghost" id="ubic-otra">Actualizar</button>';
      img.src = mapaUrl(ubic.lat, ubic.lng, 'EF412E', 'E'); img.onload = () => mapa.classList.add('lista'); img.onerror = () => mapa.classList.remove('lista');
      $('#ubic-otra').addEventListener('click', () => pedirGPS());
    } else {
      mapa.classList.remove('lista');
      fila.innerHTML = '<div class="em">📍</div><div><b>Necesitamos tu ubicación</b><span>Para cotizar el envío y que la moto te encuentre</span></div><button type="button" id="ubic-btn">Usar mi ubicación</button>';
      $('#ubic-btn').addEventListener('click', () => pedirGPS());
    }
  }
  function pintarResumen() {
    const r = $('#resumen'); if (!r) return;
    const sub = subtotal(); const del = entrega === 'domicilio';
    const env = del && envio.estado === 'ok' ? envio.valor : 0;
    let notaEnv = '';
    if (del) {
      if (!ubic) notaEnv = '<div class="nota-envio">📍 Falta tu ubicación para calcular el envío</div>';
      else if (envio.estado === 'loading') notaEnv = '<div class="nota-envio">⏳ Calculando el envío…</div>';
      else if (envio.estado === 'lejos') notaEnv = '<div class="nota-envio">😕 Fuera de la zona de entrega (' + envio.km.toFixed(1) + ' km). Puedes retirar en el local.</div>';
      else if (envio.estado === 'ok') notaEnv = '<div class="nota-envio ok">🛵 ' + envio.km.toFixed(1) + ' km' + (envio.min ? ' · llega en ~' + (envio.min + 20) + ' min' : '') + ' · lo lleva una moto DEWAN</div>';
    }
    r.innerHTML = '<div class="r"><span>Subtotal (' + nItems() + ' ítems)</span><b>' + money(sub) + '</b></div>' +
      (del ? '<div class="r"><span>Envío 🛵</span><b>' + (envio.estado === 'ok' ? money(env) : '—') + '</b></div>' : '<div class="r"><span>Retiro en local</span><b>$0,00</b></div>') + notaEnv +
      '<div class="r tot"><span>Total a pagar · ' + esc(pago) + '</span><b>' + money(sub + env) + '</b></div>';
    const ct = $('#confirmar-total'); if (ct) ct.textContent = money(sub + env);
    const av = $('#aviso-cerrado'); const btn = $('#confirmar'); const bt = $('#confirmar-txt');
    if (av && btn) {
      if (!abierto) { av.innerHTML = '<div class="aviso">⏰ ' + esc(motivoCerrado) + '</div>'; btn.disabled = true; bt.textContent = 'Cerrado ahora'; }
      else if (del && envio.estado === 'lejos') { av.innerHTML = ''; btn.disabled = true; bt.textContent = 'Fuera de zona'; }
      else { av.innerHTML = ''; btn.disabled = false; bt.textContent = 'Confirmar pedido'; }
    }
  }
  const telNorm = (t) => { let d = String(t || '').replace(/[^0-9]/g, ''); if (d.startsWith('0')) d = '593' + d.slice(1); if (d.length === 9) d = '593' + d; return d; };
  function marcarErr(id, on) { const e = $('#e-' + id), i = $('#c-' + id); if (e) e.classList.toggle('oculto', !on); if (i && on) { i.classList.remove('shake'); void i.offsetWidth; i.classList.add('shake'); i.focus(); } }

  let enviando = false;
  async function confirmar() {
    if (enviando || !cart.length) return;
    const nombre = ($('#c-nombre').value || '').trim().slice(0, 60);
    const tel = telNorm($('#c-tel').value);
    const nota = ($('#c-nota').value || '').trim().slice(0, 200);
    const ref = entrega === 'domicilio' ? ($('#c-ref') ? ($('#c-ref').value || '').trim().slice(0, 140) : '') : '';
    let ok = true;
    if (!nombre) { marcarErr('nombre', true); ok = false; } else marcarErr('nombre', false);
    if (tel.length < 12) { marcarErr('tel', true); if (ok) $('#c-tel').focus(); ok = false; } else marcarErr('tel', false);
    if (!ok) return;
    if (entrega === 'domicilio') {
      if (!ubic) { toast('📍 Necesitamos tu ubicación para el envío'); pedirGPS(); return; }
      if (envio.estado === 'loading') { toast('⏳ Un momento, estamos calculando el envío…'); return; }
      if (envio.estado === 'lejos') { toast('Estás fuera de la zona de entrega 😕'); return; }
      if (!ref) { marcarErr('ref', true); return; } else marcarErr('ref', false);
    }
    const del = entrega === 'domicilio';
    const sub = Math.round(subtotal() * 100) / 100;
    const env = del ? envio.valor : 0;
    const total = Math.round((sub + env) * 100) / 100;
    // Detalle en el formato que ya entienden el panel, la comanda y el link:
    // "Nx Nombre — $X.XX" por línea; pago con 💳; notas con 📝
    let detalle = cart.map((c) => c.qty + 'x ' + c.nombre + ' — ' + '$' + (c.precio * c.qty).toFixed(2)).join('\n');
    detalle += '\n💳 ' + pago;
    cart.forEach((c) => { if (c.salsa) detalle += '\n📝 ' + c.nombre + ': salsa ' + c.salsa; if (c.nota) detalle += '\n📝 ' + c.nombre + ': ' + c.nota; });
    if (nota) detalle += '\n📝 ' + nota;
    let factura = null;
    if ($('#c-fact').checked) {
      const fn = ($('#f-nom').value || '').trim().slice(0, 120), fi = ($('#f-id').value || '').replace(/[^0-9]/g, '').slice(0, 13), fm = ($('#f-mail').value || '').trim().slice(0, 120);
      const l = []; if (fn) l.push('Nombre/Razon social: ' + fn); if (fi) l.push('Cedula/RUC: ' + fi); if (fm) l.push('Correo: ' + fm);
      if (l.length) { factura = l.join('\n'); cliente.fnom = fn; cliente.fid = fi; cliente.fmail = fm; }
    }
    const dirEnt = del ? ((ref || 'Ubicación GPS del cliente') + ' · https://maps.google.com/?q=' + ubic.lat + ',' + ubic.lng) : null;
    const fila = {
      restaurante_id: CFG.rid, restaurante: CFG.nombre,
      cliente_nombre: nombre, cliente_telefono: tel, numero_destinatario: tel,
      conversation_id: 'web:' + tel,
      intencion: 'pedido_comida', estado_pedido: 'pendiente_restaurante', restaurante_aceptado: false,
      tipo_entrega: del ? 'domicilio' : 'retiro', requiere_ubicacion: del,
      direccion_entrega: dirEnt,
      ubicacion_lat: del ? ubic.lat : null, ubicacion_lng: del ? ubic.lng : null,
      direccion_retiro: del ? null : CFG.local.direccion,
      retiro_lat: CFG.local.lat, retiro_lng: CFG.local.lng,
      detalle_pedido: detalle, metodo_pago: pago,
      precio_base_productos: sub, precio_calculado: env, monto_total: total, markup_dewan: 0,
      distancia_km: del ? Math.round(envio.km * 10) / 10 : 0,
      factura_datos: factura
    };
    enviando = true;
    const btn = $('#confirmar'); btn.disabled = true; $('#confirmar-txt').textContent = 'Enviando…';
    let row = null;
    try {
      const r = await fetchJson(CFG.supa + '/rest/v1/' + CFG.tabla, { method: 'POST',
        headers: { apikey: CFG.anon, Authorization: 'Bearer ' + CFG.anon, 'Content-Type': 'application/json', Prefer: 'return=representation' },
        body: JSON.stringify(fila) }, 15000);
      row = Array.isArray(r.json) ? r.json[0] : r.json;
      if (!r.ok || !row || !row.id) throw new Error((row && (row.message || row.hint)) || 'HTTP ' + r.status);
    } catch (e) {
      enviando = false; btn.disabled = false; $('#confirmar-txt').textContent = 'Confirmar pedido';
      toast('No pudimos registrar el pedido 🙈 Revisa tu internet e intenta de nuevo', 4000);
      return;
    }
    enviando = false;
    cliente.nombre = nombre; cliente.tel = $('#c-tel').value; if (del) cliente.ref = ref; ls.set('ryo_cliente', cliente);
    const link = CFG.seguimiento + (row.token_seguimiento || '');
    const codigo = row.codigo_pedido || ('#' + row.id);
    const resumen = cart.map((c) => ({ id: c.id, nombre: c.nombre, precio: c.precio, qty: c.qty, salsa: c.salsa, nota: c.nota }));
    ls.set('ryo_ultimo', { codigo, link, ts: Date.now(), items: resumen, total, entrega });
    cart = []; guardarCart(); pintarMenu($('#q').value); pintarCarritoBadge();
    mostrarExito(codigo, link, resumen, del, env, total);
  }
  function mostrarExito(codigo, link, items, del, env, total) {
    const h = $('#hoja .cuerpo-hoja'); if (!h) return;
    $('#hoja .cerrar').classList.add('oculto');
    h.innerHTML = '<div class="exito"><div class="check">✓</div><h2 class="tit">¡Pedido recibido!</h2><div class="cod">' + esc(codigo) + '</div>' +
      '<p><b>Ryo Burger</b> ya lo tiene en su pantalla y en un momento te confirma el tiempo. ' + (del ? 'Cuando esté listo, una moto DEWAN te lo lleva.' : 'Te avisamos cuando esté listo para retirar.') + '</p>' +
      '<div class="resumen" style="text-align:left">' + items.map((c) => '<div class="r"><span>' + c.qty + 'x ' + esc(c.nombre) + '</span><b>' + money(c.precio * c.qty) + '</b></div>').join('') +
      (del ? '<div class="r"><span>Envío 🛵</span><b>' + money(env) + '</b></div>' : '') + '<div class="r tot"><span>Total · ' + esc(pago) + '</span><b>' + money(total) + '</b></div></div>' +
      '<div class="btns"><a class="btn-p" id="btn-seguir" href="' + esc(link) + '" target="_blank" rel="noopener">📍 Seguir mi pedido en vivo</a>' +
      '<button class="btn-s" id="btn-copiar">Guardar el link del pedido</button><button class="btn-s" id="btn-otro">Hacer otro pedido</button></div>' +
      '<div class="link-caja">' + esc(link) + '</div>' +
      '<p style="font-size:12px">En ese link ves cuando el local confirma, cuando sale la moto y cuando llega.</p></div>';
    hojaAbierta.onClose = null;
    $('#btn-otro').addEventListener('click', () => { cerrarHoja(); pintarUltimo(); });
    $('#btn-copiar').addEventListener('click', async () => {
      try { if (navigator.share) { await navigator.share({ title: 'Mi pedido ' + codigo + ' — Ryo Burger', url: link }); return; } } catch (e) {}
      try { await navigator.clipboard.writeText(link); toast('Link copiado ✓'); } catch (e) { toast('Copia el link de abajo 👇'); }
    });
    try { window.open(link, '_blank'); } catch (e) {}
  }

  /* ================= ÚLTIMO PEDIDO / REPETIR ================= */
  function pintarUltimo() {
    const u = ls.get('ryo_ultimo', null); const box = $('#ultimo');
    if (!u || !u.items || !u.items.length) { box.classList.add('oculto'); return; }
    const reciente = Date.now() - (u.ts || 0) < 3 * 3600 * 1000;
    box.classList.remove('oculto');
    box.innerHTML = '<div class="em">' + (reciente ? '🛵' : '🔁') + '</div><div><b>' + (reciente ? 'Tu pedido ' + esc(u.codigo) + ' está en marcha' : 'Tu último pedido') + '</b>' +
      '<span>' + esc(u.items.map((c) => c.qty + 'x ' + c.nombre).join(', ').slice(0, 70)) + '</span></div>' +
      '<div class="acciones">' + (reciente ? '<a href="' + esc(u.link) + '" target="_blank" rel="noopener">Seguir 📍</a>' : '') + '<button type="button" id="btn-repetir">Repetir</button></div>';
    $('#btn-repetir').addEventListener('click', () => {
      let n = 0;
      u.items.forEach((c) => { const p = POR_ID[c.id]; if (!p) return; agregar({ id: c.id, nombre: p.nombre, precio: p.precio }, c.qty, c.salsa, c.nota); n += c.qty; });
      if (n) { toast('🔁 ' + n + ' ítems de nuevo en tu pedido (con precios de hoy)'); abrirCarrito(); } else toast('Esos platos ya no están en la carta 🙈');
    });
  }

  /* ================= HORARIO / ABIERTO ================= */
  function horaEC() { const p = new Intl.DateTimeFormat('es-EC', { timeZone: 'America/Guayaquil', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()); const h = +p.find((x) => x.type === 'hour').value, m = +p.find((x) => x.type === 'minute').value; return h * 60 + m; }
  function diaEC() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Guayaquil' })).getDay(); }
  const aMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  async function estadoLocal() {
    let cerradoHasta = null, activo = true;
    try {
      const r = await fetchJson(CFG.supa + '/rest/v1/restaurantes?id=eq.' + CFG.rid + '&select=cerrado_hasta,activo', { headers: { apikey: CFG.anon, Authorization: 'Bearer ' + CFG.anon } }, 6000);
      if (r.ok && r.json && r.json[0]) { cerradoHasta = r.json[0].cerrado_hasta; activo = r.json[0].activo !== false; }
    } catch (e) {}
    const ahora = horaEC(), ab = aMin(CFG.horario.abre), ci = aMin(CFG.horario.cierra);
    abierto = ahora >= ab && ahora < ci; motivoCerrado = '';
    if (!abierto) motivoCerrado = 'Abrimos de ' + CFG.horario.abre + ' a ' + CFG.horario.cierra + '. Puedes armar tu pedido y confirmarlo cuando abramos.';
    if (abierto && cerradoHasta && new Date(cerradoHasta).getTime() > Date.now()) { abierto = false; motivoCerrado = 'El local está cerrado por hoy. Abrimos mañana a las ' + CFG.horario.abre + '.'; }
    if (!activo) { abierto = false; motivoCerrado = 'El local no está recibiendo pedidos por ahora.'; }
    const e = $('#estado');
    e.classList.toggle('cerrado', !abierto);
    e.innerHTML = '<i></i>' + (abierto ? 'Abierto · cierra ' + CFG.horario.cierra : 'Cerrado ahora · abre ' + CFG.horario.abre);
    pintarResumen();
  }
  function pintarPromoDia() {
    const p = PROMOS_DIA[diaEC()]; const box = $('#promo-dia');
    if (!p) { box.classList.add('oculto'); return; }
    box.classList.remove('oculto');
    box.innerHTML = '<div class="em">' + p.em + '</div><div><div class="k">' + esc(p.k) + '</div><b class="tit">' + esc(p.t) + '</b><span>' + esc(p.d) + '</span></div>' +
      (p.p ? '<div class="precio">' + (p.antes ? '<s>' + money(p.antes) + '</s>' : '') + money(p.p) + '</div>' : '');
    box.onclick = () => { if (p.buscar) { const q = $('#q'); q.value = p.buscar; pintarMenu(p.buscar); $('#menu').scrollIntoView({ block: 'start' }); } };
  }

  /* ================= PWA ================= */
  let deferredPrompt = null;
  function pwa() {
    if ('serviceWorker' in navigator) { try { navigator.serviceWorker.register('sw.js', { scope: './' }); } catch (e) {} }
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (standalone || ls.get('ryo_pwa_snooze', 0) > Date.now()) return;
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    const inApp = /FBAN|FBAV|Instagram|Line\/|WhatsApp/i.test(navigator.userAgent);
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; setTimeout(mostrarInstalar, 9000); });
    if (ios && !inApp) setTimeout(mostrarInstalar, 14000);
    function mostrarInstalar() {
      if ($('#instalar')) return;
      const d = document.createElement('div'); d.className = 'instalar'; d.id = 'instalar';
      d.innerHTML = '<div class="l"><img src="img/logo.webp" alt=""></div><div><b>Instala la app de Ryo Burger</b><span>Pide en 2 toques desde tu inicio</span></div>' +
        '<div class="x"><button type="button" id="pwa-no">Ahora no</button><button type="button" class="p" id="pwa-si">' + (deferredPrompt ? 'Instalar' : 'Ver cómo') + '</button></div>';
      document.body.appendChild(d);
      $('#pwa-no').addEventListener('click', () => { d.remove(); ls.set('ryo_pwa_snooze', Date.now() + 7 * 86400000); });
      $('#pwa-si').addEventListener('click', async () => {
        if (deferredPrompt) { deferredPrompt.prompt(); try { await deferredPrompt.userChoice; } catch (e) {} deferredPrompt = null; d.remove(); return; }
        d.remove(); abrirHoja('<div class="hoja-titulo tit">Instalar en iPhone</div><div class="hoja-sub">Tres toques y queda en tu pantalla de inicio</div>' +
          '<div class="opciones" style="margin-top:14px"><div class="opcion"><b>1</b><div>Toca el botón <b>Compartir</b> de Safari (el cuadrado con la flecha)</div></div>' +
          '<div class="opcion"><b>2</b><div>Elige <b>“Añadir a pantalla de inicio”</b></div></div><div class="opcion"><b>3</b><div>Toca <b>Añadir</b>. Listo: Ryo Burger en tu inicio 🍔</div></div></div>');
      });
    }
    window.addEventListener('appinstalled', () => { const d = $('#instalar'); if (d) d.remove(); toast('🍔 ¡Ryo Burger instalada!'); });
  }

  /* ================= ARRANQUE ================= */
  function init() {
    // delegación de clics: tarjetas, chips, fab, header
    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-prod]'); if (card) { abrirProducto(card.dataset.prod); return; }
      const chip = e.target.closest('[data-cat]'); if (chip) { catActiva = chip.dataset.cat; $$('.chip').forEach((c) => c.classList.toggle('on', c === chip)); const s = $('#cat-' + slug(chip.dataset.cat)); if (s) { const y = s.getBoundingClientRect().top + window.scrollY - 128; window.scrollTo({ top: y, behavior: 'smooth' }); } return; }
    });
    $('#fab').addEventListener('click', abrirCarrito);
    $$('#seg button').forEach((b) => b.addEventListener('click', () => { setEntrega(b.dataset.e); if (entrega === 'domicilio' && !ubic) pedirGPS(); }));
    $$('#seg button').forEach((b) => b.classList.toggle('on', b.dataset.e === entrega));
    $('#q').addEventListener('input', (e) => pintarMenu(e.target.value));
    $('#btn-compartir').addEventListener('click', async () => {
      const url = location.origin + location.pathname;
      try { if (navigator.share) { await navigator.share({ title: 'Ryo Burger · pide aquí', text: 'Pide en Ryo Burger sin salir de casa 🍔', url }); return; } } catch (e) { return; }
      try { await navigator.clipboard.writeText(url); toast('Link copiado ✓'); } catch (e) {}
    });
    $('#hero-cta').addEventListener('click', () => { const s = $('#menu'); if (s) window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' }); });
    // chip activo según scroll
    const obs = ('IntersectionObserver' in window) ? new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { const k = en.target.id.replace(/^cat-/, ''); $$('.chip').forEach((c) => c.classList.toggle('on', slug(c.dataset.cat) === k)); } });
    }, { rootMargin: '-130px 0px -70% 0px' }) : null;
    const observar = () => { if (obs) { obs.disconnect(); $$('.seccion').forEach((s) => obs.observe(s)); } };
    const _pm = pintarMenu; pintarMenu = function () { _pm.apply(this, arguments); observar(); };

    cargarMenu().then(() => { pintarUltimo(); observar(); });
    pintarPromoDia(); pintarEnvio(); pintarCarritoBadge(); estadoLocal(); pwa();
    if (entrega === 'domicilio' && ubic) cotizar();
    if (new URLSearchParams(location.search).get('cart') === '1') setTimeout(abrirCarrito, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
