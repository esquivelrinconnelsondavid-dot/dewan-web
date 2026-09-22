/* ============================================================
   RYO BURGER — app web de pedidos (lógica compartida por los 3 modelos)
   El pedido NO pasa por WhatsApp: se guarda directo en pedidos_sistema
   (mismo INSERT que carta/sistema.js, ya probado con el panel del local).
   El panel de Ryo lo recibe al instante, el cliente sigue el pedido en
   dewansas.com/pedido/?s=sistema&t=TOKEN y a domicilio lo lleva una
   moto DEWAN (gemelo en pedidos_delivery, lo crea el wf de avisos).

   TARIFA (v31, 16-sep-2026): el cotizador calcular-precio devuelve la
   CARRERA DEL MOTO ($1,30 hasta 3 km, +$0,25 cada 500 m). Al cliente se
   le cobra esa carrera + el SERVICIO DEWAN ($0,45) → mínimo $1,75.
   Se guarda precio_calculado = lo que paga el cliente y tarifa_servicio
   = la parte de DEWAN, para que el gemelo pueda pagar al moto su carrera.

   Modelos de diseño: <body data-modelo="a|b|c"> cambia SOLO el layout del
   menú (a = cuadrícula, b = carruseles, c = póster). Todo lo demás es igual.
   ============================================================ */
(function () {
  'use strict';
  const CFG = {
    rid: '0cca9530-df0c-4151-87ee-ad619429e714',
    nombre: 'Ryo Burger',
    whatsapp: '593984150412',
    local: { lat: -1.6653981066649846, lng: -78.65915957643243, direccion: 'Reina Pacha y Av. Carlos Zambrano', ciudad: 'Riobamba' },
    horario: { abre: '12:00', cierra: '22:30' },
    supa: 'https://wfpdtjmmrhhfuxayvpzu.supabase.co',
    anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcGR0am1tcmhoZnV4YXl2cHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzE1NDksImV4cCI6MjA4ODY0NzU0OX0.Iyeogfs5AIiVrM5agXuMZsgFrud460OYvn0zkYgJH0s',
    tabla: 'pedidos_sistema',
    cotizador: 'https://n8n.dewansas.com/webhook/calcular-precio',
    avisoWa: 'https://n8n.dewansas.com/webhook/ryo-pedido-recibido',   // manda la confirmacion al WhatsApp del cliente
    seguimiento: 'https://dewansas.com/pedido/?s=sistema&t=',
    fotos: 'https://wfpdtjmmrhhfuxayvpzu.supabase.co/storage/v1/object/public/menu-fotos/0cca9530-df0c-4151-87ee-ad619429e714/',
    mapsKey: 'AIzaSyBktkFnRg3Lp8h93MktPzQ2XtAcim7lAhs',
    // Cuentas para transferir (placa del mostrador, 21-sep-2026). El cliente las ve al elegir
    // "Transferencia" y otra vez en la pantalla del pedido hecho, con el total y el botón para
    // mandar el comprobante por WhatsApp ya con el código del pedido escrito.
    transfer: {
      cuentas: [
        { b: 'Banco de Guayaquil',   n: '35551064',     t: 'Karla Ruiz' },
        { b: 'Banco Pichincha',      n: '2208129249',   t: 'Karla Ruiz' },
        { b: 'Banco Pacífico',       n: '1064979016',   t: 'Karla Ruiz' },
        { b: 'Cooperativa Riobamba', n: '402110602325', t: 'Karla Ruiz' },
        { b: 'Produbanco',           n: '12667030188',  t: 'Francis Osuna' }
      ],
      deuna: 'Karla Cecilia Ruiz Bernal',
      correo: 'Ryoburger2022@gmail.com'
    },
    servicio: 0.45,       // servicio DEWAN por entrega (cliente = carrera del moto + esto)
    carreraMin: 1.30,     // carrera del moto hasta 3 km
    cocinaMin: 20,        // minutos de cocina que se suman al tiempo de ruta
    maxKm: 12
  };
  const MODELO = (document.body.dataset.modelo || 'a').toLowerCase();
  const CATS = [
    { k: 'Hamburguesas de Colección',  t: 'Hamburguesas de Colección', e: '🍔', sub: 'Todas con 160 g de carne · sola $4,99 · combo $6,99' },
    { k: 'Hamburguesas',              t: 'Las de la casa',      e: '🔥', sub: 'Clásica, Ranchera, Criolla, Blue Cheese, Mega y Sultana' },
    { k: 'Hamburguesas de Pollo',     t: 'De pollo crocante',   e: '🐔' },
    { k: 'Hamburguesas Lomo Fino',    t: 'Lomo fino',           e: '🥩', sub: '180 g de lomo fino en pan de papa · nuevas' },
    { k: 'Hamburguesas Vegetarianas', t: 'Veggie',              e: '🥬' },
    { k: 'Alitas',                    t: 'Alitas',              e: '🍗', sub: 'Elige tus salsas · vienen con papas' },
    { k: 'Costillas',                 t: 'Costillas',           e: '🍖' },
    { k: 'Promos',                    t: 'Promos',              e: '🎉', sub: 'Solo por hoy · cada día tiene la suya' },
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
  const r2 = (n) => Math.round(Number(n) * 100) / 100;
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
  const emitir = (nombre, detalle) => { try { window.dispatchEvent(new CustomEvent(nombre, { detail: detalle || {} })); } catch (e) {} };

  /* ================= ESTADO ================= */
  let PRODUCTOS = [];
  let POR_ID = {};
  let cart = ls.get('ryo_cart', []);
  let entrega = ls.get('ryo_entrega', 'domicilio');
  let cliente = ls.get('ryo_cliente', {});
  let ubic = (cliente.lat && cliente.lng) ? { lat: cliente.lat, lng: cliente.lng, guardada: true } : null;
  let envio = { estado: 'na', valor: 0, carrera: 0, servicio: 0, km: 0, min: 0 };  // na | loading | ok | lejos
  let ubicKey = '';
  let abierto = true, motivoCerrado = '';
  let pago = ls.get('ryo_pago', 'Efectivo');
  let catActiva = '';
  const expandidas = {};   // modelo B: secciones abiertas con "Ver todo"

  /* ================= MENÚ ================= */
  function leerEmbed() { try { return JSON.parse($('#menu-embed').textContent); } catch (e) { return []; } }
  async function cargarMenu() {
    let rows = leerEmbed();
    construir(rows); pintarMenu();
    try {
      const r = await fetchJson(CFG.supa + '/rest/v1/vitrina_menu?restaurante_id=eq.' + CFG.rid + '&select=id,categoria_menu,nombre_item,descripcion,precio,foto_url&order=categoria_menu,nombre_item',
        { headers: { apikey: CFG.anon, Authorization: 'Bearer ' + CFG.anon } }, 7000);
      if (r.ok && Array.isArray(r.json) && r.json.length) {
        const prev = {}; leerEmbed().forEach((x) => { prev[x.id] = Number(x.e) || 0; });
        rows = r.json.map((x) => ({ id: x.id, c: x.categoria_menu, n: x.nombre_item, d: x.descripcion || '', p: Number(x.precio) || 0, f: String(x.foto_url || '').replace(CFG.fotos, ''), e: prev[x.id] || 0 }));
        construir(rows); pintarMenu(); pintarCarritoBadge();
        try {   // cargo_envase: solo esta en menu_items, la vista vitrina_menu no lo trae
          const e = await fetchJson(CFG.supa + '/rest/v1/menu_items?restaurante_id=eq.' + CFG.rid + '&select=id,cargo_envase',
            { headers: { apikey: CFG.anon, Authorization: 'Bearer ' + CFG.anon } }, 6000);
          if (e.ok && Array.isArray(e.json) && e.json.length) {
            const mapa = {}; e.json.forEach((x) => { mapa[x.id] = Number(x.cargo_envase) || 0; });
            rows.forEach((x) => { if (mapa[x.id] != null) x.e = mapa[x.id]; });
            construir(rows); pintarMenu(); pintarCarritoBadge();
          }
        } catch (e2) { /* nos quedamos con el envase del embed */ }
        await cargarGrupos(rows);
      }
    } catch (e) { /* nos quedamos con el embebido */ }
  }
  const RE_VAR = /\s+(Sola|Combo|Mediana|Grande)$/i;   // 'N unidades' NO se agrupa: cada tamaño de alitas es su tarjeta (con su tope de salsas)
  /* Promos por día: "Lunes para Todos" solo los lunes, "Martes Locos" los martes, "Jueves ..." los jueves (hora EC). */
  const DIAS = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const PROMOS_OCULTAS = new Set();
  function promoDeHoy(r) {
    if (norm(r.c) !== 'promos') return true;
    const m = norm(r.n).match(/^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)(\s|$)/);
    return !m || m[1] === DIAS[diaEC()];
  }
  // Opciones por plato (salsas de las alitas, "hamburguesa o pop corn" del menu infantil...).
  // Viven en menu_opcion_grupos/menu_opciones, las mismas que usa el bot de WhatsApp.
  // Un plato puede tener VARIOS grupos (promo Lunes: "Hamburguesas" elige 2 + "Bebidas" elige 2) y cada opcion
  // puede traer recargo (precio_extra: bebida 500 ml para llevar +$0.50) que se suma al precio del plato. (21-sep-2026)
  // Grupo "[envase]" (marca en el nombre): sus opciones traen en precio_extra el ENVASE del plato cuando se elige esa
  // opcion (promo Lunes: Coca-Cola 300 ml -> $0.25, bebidas 500 ml -> $0.50). Se cobra UNA vez por plato (el mayor de
  // las marcadas) y no toca el precio. Mismo criterio que el Cerebro Ryo; la marca se quita al mostrar el nombre.
  function esGrupoEnvase(n) { return /\[envase\]/i.test(String(n || '')); }
  function nombreGrupo(n) { return String(n || '').replace(/\s*\[envase\]\s*/ig, ' ').replace(/\s+/g, ' ').trim() || 'Opciones'; }
  let GRUPOS = {};
  async function cargarGrupos(rows) {
    try {
      const r = await fetchJson(CFG.supa + '/rest/v1/menu_opcion_grupos?restaurante_id=eq.' + CFG.rid +
        '&activo=eq.true&menu_item_id=not.is.null&select=menu_item_id,nombre,tipo,min_sel,max_sel,orden,menu_opciones(nombre,precio_extra,orden,activo)&order=orden',
        { headers: { apikey: CFG.anon, Authorization: 'Bearer ' + CFG.anon } }, 6000);
      if (!r.ok || !Array.isArray(r.json) || !r.json.length) return;
      const g = {};
      r.json.forEach((x) => {
        const ops = (x.menu_opciones || []).filter((o) => o.activo !== false)
          .sort((a, b) => (a.orden || 0) - (b.orden || 0)).map((o) => ({ n: String(o.nombre), x: Number(o.precio_extra) || 0 }));
        if (!ops.length) return;
        const max = x.tipo === 'unica' ? 1 : Math.max(1, Math.min(Number(x.max_sel) || ops.length, ops.length));
        (g[x.menu_item_id] = g[x.menu_item_id] || []).push({ nombre: nombreGrupo(x.nombre), envase: esGrupoEnvase(x.nombre), opciones: ops, max, min: Math.max(0, Math.min(Number(x.min_sel) || 0, max)) });
      });
      if (!Object.keys(g).length) return;
      GRUPOS = g; construir(rows); pintarMenu($('#q').value); pintarCarritoBadge();
    } catch (e) { /* sin grupos: se usa lo que diga la descripcion */ }
  }
  function construir(rows) {
    POR_ID = {}; PROMOS_OCULTAS.clear(); const mapa = new Map();
    rows.forEach((r) => {
      if (!promoDeHoy(r)) { PROMOS_OCULTAS.add(r.id); return; }
      POR_ID[r.id] = { nombre: r.n, precio: r.p, cat: r.c, envase: Number(r.e) || 0 };
      const m = r.n.match(RE_VAR);
      const base = m ? r.n.slice(0, m.index).trim() : r.n;
      const varLabel = m ? m[1] : '';
      const key = r.c + '|' + norm(base);
      if (!mapa.has(key)) mapa.set(key, { key, cat: r.c, nombre: base, desc: '', foto: r.f || '', variantes: [], grupos: [], gruposPorVar: {}, salsas: [], salsasMax: 1, opcLabel: '', nuevo: false, unidades: parseInt((base.match(/(\d+)\s+unidades/i) || [])[1], 10) || 0 });
      const p = mapa.get(key);
      if (!p.desc || (r.d && r.d.length > p.desc.length && !varLabel.match(/combo/i))) p.desc = limpiarDesc(r.d);
      if (!p.foto && r.f) p.foto = r.f;
      p.variantes.push({ id: r.id, label: etiquetaVar(varLabel), precio: r.p, nombre: r.n, envase: Number(r.e) || 0, orden: varLabel ? (varLabel.match(/sola|mediana/i) ? 0 : (varLabel.match(/combo|grande/i) ? 1 : parseInt(varLabel) || 2)) : 0 });
      // grupos POR VARIANTE (el Combo tiene "Bebida", la Sola no); p.grupos = los de la primera variante con grupos (tarjeta)
      const gl = GRUPOS[r.id];
      if (gl && gl.length) { p.gruposPorVar[r.id] = gl; if (!p.grupos.length) { p.grupos = gl; p.salsas = gl[0].opciones.map((o) => o.n); p.salsasMax = gl[0].max; p.opcLabel = gl[0].nombre; } }
      else { const s = parsearSalsas(r.d); if (s.lista.length) { p.salsas = s.lista; p.salsasMax = s.max; p.grupos = [{ nombre: 'Salsas', opciones: s.lista.map((n) => ({ n, x: 0 })), max: s.max, min: 0 }]; p.gruposPorVar[r.id] = p.grupos; } }
      if (/pork bacon|gaucha|primicias/i.test(r.n)) p.nuevo = true;
    });
    PRODUCTOS = Array.from(mapa.values());
    PRODUCTOS.forEach((p) => { p.variantes.sort((a, b) => a.orden - b.orden || a.precio - b.precio); p.desde = Math.min.apply(null, p.variantes.map((v) => v.precio)); });
    if (cart.some((c) => PROMOS_OCULTAS.has(c.id))) { cart = cart.filter((c) => !PROMOS_OCULTAS.has(c.id)); guardarCart(); }
  }
  function etiquetaVar(v) {
    if (!v) return '';
    if (/combo/i.test(v)) return 'Combo · papas + bebida';
    if (/sola/i.test(v)) return 'Sola';
    if (/mediana/i.test(v)) return 'Mediana';
    if (/grande/i.test(v)) return 'Grande';
    const n = parseInt(v); if (n) return n + ' unidades';
    return v;
  }
  function limpiarDesc(d) { return String(d || '').replace(/\s*\+\s*papas\s*\+\s*bebida\s*$/i, '').replace(/(Salsas a elecci[oó]n|Elige\s+\d+\s+salsas?).*$/i, '').replace(/\s+$/, '').replace(/[,.]\s*$/, ''); }
  function parsearSalsas(d) {
    const m = /(?:Salsas a elecci[oó]n|Elige\s+(\d+)\s+salsas?)(?:\s*\((?:elige\s+)?(\d+)\))?\s*:\s*([^.\n]+)/i.exec(d || '');
    if (!m) return { lista: [], max: 1 };
    return { lista: m[3].split('/').map((x) => x.trim()).filter(Boolean), max: Math.max(1, parseInt(m[1] || m[2], 10) || 1) };
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
  const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-');

  /* ================= PINTAR MENÚ (por modelo) ================= */
  function pintarMenu(filtro) {
    const cats = catsPresentes();
    const chips = $('#chips');
    if (!catActiva && cats[0]) catActiva = cats[0].k;
    chips.innerHTML = cats.map((c) => '<button class="chip' + (norm(c.k) === norm(catActiva) ? ' on' : '') + '" data-cat="' + esc(c.k) + '">' + c.e + ' ' + esc(c.t) + '</button>').join('');
    const q = norm(filtro || '');
    let html = '';
    cats.forEach((c) => {
      let prods = PRODUCTOS.filter((p) => norm(p.cat) === norm(c.k));
      if (q) prods = prods.filter((p) => norm(p.nombre + ' ' + p.desc).includes(q));
      prods = prods.slice().sort((a, b) => (a.unidades || 9999) - (b.unidades || 9999));
      if (!prods.length) return;
      const abierta = !!expandidas[c.k] || !!q;
      const rail = MODELO === 'b' && !c.lista && prods.length > 2 && !abierta;
      html += '<section class="seccion" id="cat-' + slug(c.k) + '"><h2 class="tit">' + c.e + ' ' + esc(c.t) + ' <small>' + prods.length + '</small>' +
        (MODELO === 'b' && !c.lista && prods.length > 2 ? '<button class="ver-todo" data-todo="' + esc(c.k) + '">' + (abierta ? 'Ver menos' : 'Ver todo →') + '</button>' : '') + '</h2>' +
        (c.sub ? '<div class="sub">' + esc(c.sub) + '</div>' : '') + '</section>';
      if (c.lista) html += '<div class="lista">' + prods.map(filaHtml).join('') + '</div>';
      else if (rail) html += '<div class="rail">' + prods.map(cardHtml).join('') + '</div>';
      else if (MODELO === 'c') html += '<div class="poster">' + prods.map(cardHtml).join('') + '</div>';
      else html += '<div class="grid">' + prods.map(cardHtml).join('') + '</div>';
    });
    $('#menu').innerHTML = html || '<div class="vacio">No encontré nada con "' + esc(filtro) + '" 🙈</div>';
    pintarCarritoBadge();
    emitir('ryo:menu');
  }
  function qtyDe(p) { return cart.filter((c) => p.variantes.some((v) => v.id === c.id)).reduce((t, c) => t + c.qty, 0); }
  function cardHtml(p) {
    const q = qtyDe(p); const f = fotoUrl(p.foto); const unaVar = p.variantes.length === 1;
    return '<button class="card" data-prod="' + esc(p.key) + '" aria-label="' + esc(p.nombre) + '">' +
      '<div class="foto">' + (f ? '<img src="' + esc(f) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">' : '<div class="emoji">' + emojiDe(p) + '</div>') +
      (p.nuevo ? '<span class="tag">Nuevo</span>' : '') + (p.salsas.length ? '<span class="tag rojo">' + etiquetaOpc(p) + '</span>' : '') + '</div>' +
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

  /* ================= HOJAS ================= */
  let hojaAbierta = null;
  function abrirHoja(html, onClose) {
    cerrarHoja();
    const velo = document.createElement('div'); velo.className = 'velo-hoja'; velo.id = 'velo';
    const hoja = document.createElement('div'); hoja.className = 'hoja'; hoja.id = 'hoja'; hoja.setAttribute('role', 'dialog');
    hoja.innerHTML = '<div class="asa"></div><button class="cerrar" aria-label="Cerrar">✕</button><div class="cuerpo-hoja">' + html + '</div>';
    document.body.appendChild(velo); document.body.appendChild(hoja);
    document.body.style.overflow = 'hidden';
    velo.addEventListener('click', () => cerrarHoja()); $('.cerrar', hoja).addEventListener('click', () => cerrarHoja());
    hojaAbierta = { onClose }; history.pushState({ hoja: 1 }, '');
    emitir('ryo:hoja', { hoja });
    return hoja;
  }
  function cerrarHoja(desdeAtras) {
    const v = $('#velo'), h = $('#hoja'); if (v) v.remove(); if (h) h.remove();
    document.body.style.overflow = '';
    if (hojaAbierta) { const cb = hojaAbierta.onClose; hojaAbierta = null; if (!desdeAtras && history.state && history.state.hoja) history.back(); if (cb) cb(); }
  }
  window.addEventListener('popstate', () => { if (hojaAbierta) cerrarHoja(true); });

  function abrirProducto(key, origenEl) {
    const p = PRODUCTOS.find((x) => x.key === key); if (!p) return;
    let vSel = p.variantes[0], qty = 1;
    // los grupos dependen de la VARIANTE elegida (el Combo pide la bebida; la Sola no)
    const gruposDe = (v) => (p.variantes.length > 1 ? (p.gruposPorVar[v.id] || []) : (p.grupos || []));
    let grupos = gruposDe(vSel);
    let sel = grupos.map((g) => (g.opciones.length ? [g.opciones[0].n] : []));   // preselección: la primera de cada grupo
    const envUnit = () => { const e = envaseSel(grupos, sel); return e != null ? e : envMax(p); };   // envase por unidad (puede depender de la elección)
    const f = fotoUrl(p.foto);
    // un bloque de chips por grupo (salsas de las alitas; hamburguesas y bebidas de la promo; bebida del combo), mismo toque que las salsas
    const htmlGrupos = () => grupos.map((g, gi) => '<div class="bloque"><div class="et">' + esc(tituloGrupo(g)) + ' <span class="sel-g" data-g="' + gi + '">' + esc(textoSel(g, sel[gi])) + '</span></div>' +
        (g.envase ? '<div class="prod-desc" style="margin:0 0 8px">' + esc(descEnvase(g)) + '</div>' : '') +   // la regla del envase va en el grupo, no en cada bebida (se leía como cobro por bebida)
        '<div class="salsas" data-g="' + gi + '">' +
        g.opciones.map((o, i) => '<button class="salsa' + (i === 0 ? ' on' : '') + '" data-g="' + gi + '" data-s="' + esc(o.n) + '">' + esc(o.n) + (o.x > 0 && !g.envase ? ' <small>+' + money(o.x) + '</small>' : '') + '</button>').join('') + '</div></div>').join('');
    const html =
      '<div class="prod-foto">' + (f ? '<img src="' + esc(f) + '" alt="">' : '<div class="emoji">' + emojiDe(p) + '</div>') + '</div>' +
      '<div class="prod-nom tit">' + esc(p.nombre) + '</div>' + (p.desc ? '<div class="prod-desc">' + esc(p.desc) + '</div>' : '') +
      (p.variantes.length > 1 ? '<div class="bloque"><div class="et">Elige cómo la quieres</div><div class="opciones" id="vars">' +
        p.variantes.map((v, i) => '<button class="opcion' + (i === 0 ? ' on' : '') + '" data-i="' + i + '"><span class="radio"></span><div><b>' + esc(v.label || p.nombre) + '</b></div><span class="p">' + money(v.precio) + '</span></button>').join('') + '</div></div>' : '') +
      '<div id="grupos">' + htmlGrupos() + '</div>' +
      '<div class="bloque"><div class="et">Alguna nota para la cocina</div><input class="nota-in" id="nota-prod" maxlength="120" placeholder="' + esc(placeholderNota(p)) + '"></div>' +
      '<div class="prod-envase" id="prod-envase"' + ((envMax(p) > 0 || grupos.some((g) => g.envase)) ? '' : ' hidden') + '>📦 Se suma ' + money(envUnit()) + ' por el envase para llevar</div>' +
      '<div class="prod-pie"><div class="stepper"><button id="q-menos" aria-label="menos">−</button><b id="q-n">1</b><button id="q-mas" aria-label="más">+</button></div>' +
      '<button class="btn-p" id="agregar"><span>Agregar</span><span class="t" id="agregar-total">' + money(vSel.precio + extrasDe(grupos, sel)) + '</span></button></div>';
    const hoja = abrirHoja(html);
    const unit = () => vSel.precio + extrasDe(grupos, sel);
    const refrescar = () => {
      $('#q-n', hoja).textContent = qty; $('#agregar-total', hoja).textContent = money(unit() * qty);
      const pe = $('#prod-envase', hoja); if (pe) { pe.textContent = '📦 Se suma ' + money(envUnit()) + ' por el envase para llevar'; pe.hidden = !(envUnit() > 0); }
      const qn = $('#q-n', hoja); qn.classList.remove('pop'); void qn.offsetWidth; qn.classList.add('pop');
    };
    const bindGrupos = () => $$('.salsas .salsa', hoja).forEach((b) => b.addEventListener('click', () => {
      const gi = +b.dataset.g, g = grupos[gi], s = sel[gi], sv = b.dataset.s, i = s.indexOf(sv);
      if (i >= 0) { if (s.length > 1) s.splice(i, 1); }                          // quitar (siempre queda al menos una)
      else if (g.max <= 1) { s.length = 0; s.push(sv); }                        // una sola: reemplaza
      else { s.push(sv); if (s.length > g.max) s.shift(); }                      // varias: al pasarse, sale la más vieja
      $$('.salsas[data-g="' + gi + '"] .salsa', hoja).forEach((x) => x.classList.toggle('on', s.includes(x.dataset.s)));
      $('.sel-g[data-g="' + gi + '"]', hoja).textContent = textoSel(g, s);
      refrescar();
    }));
    $$('#vars .opcion', hoja).forEach((b) => b.addEventListener('click', () => {
      $$('#vars .opcion', hoja).forEach((x) => x.classList.remove('on')); b.classList.add('on'); vSel = p.variantes[+b.dataset.i];
      grupos = gruposDe(vSel); sel = grupos.map((g) => (g.opciones.length ? [g.opciones[0].n] : []));
      $('#grupos', hoja).innerHTML = htmlGrupos(); bindGrupos();
      refrescar();
    }));
    bindGrupos();
    $('#q-mas', hoja).addEventListener('click', () => { qty = Math.min(20, qty + 1); refrescar(); });
    $('#q-menos', hoja).addEventListener('click', () => { qty = Math.max(1, qty - 1); refrescar(); });
    $('#agregar', hoja).addEventListener('click', () => {
      const nota = ($('#nota-prod', hoja).value || '').trim().slice(0, 120);
      const img = $('.prod-foto img', hoja);
      const rect = img ? img.getBoundingClientRect() : null;
      agregar(vSel, qty, textoOpc(grupos, sel), nota, extrasDe(grupos, sel), envaseSel(grupos, sel));
      cerrarHoja();
      emitir('ryo:agregado', { foto: f, rect, qty });
      toast('✅ ' + qty + 'x ' + vSel.nombre + ' agregado');
    });
  }
  // Regla (21-sep-2026, igual que el bot de WhatsApp): en un grupo de N exactas (min = max = N, ej. "Hamburguesas ·
  // elige 2") si marca UNA sola, van las N iguales ("Ryo Texas x2") y el recargo se multiplica.
  function vecesDe(g, s) { return (g.min >= 2 && g.min === g.max && s.length === 1) ? g.max : 1; }
  function extrasDe(grupos, sel) {
    return grupos.reduce((t, g, i) => { if (g.envase) return t; const n = vecesDe(g, sel[i]); return t + sel[i].reduce((u, nm) => { const o = g.opciones.find((x) => x.n === nm); return u + (o ? o.x : 0) * n; }, 0); }, 0);
  }
  // envase que definen los grupos "[envase]": el mayor de las opciones marcadas; null si no hay grupo así
  function envaseSel(grupos, sel) {
    let e = null;
    grupos.forEach((g, i) => { if (!g.envase) return; sel[i].forEach((nm) => { const o = g.opciones.find((x) => x.n === nm); if (o && (e == null || o.x > e)) e = o.x; }); });
    return e;
  }
  // "Envase de la promo, una vez por promo: $0,25 con Coca-Cola 300 ml · $0,50 con Inca Kola 500 ml, Fanta 500 ml, Sprite 500 ml"
  function descEnvase(g) {
    const por = {};
    g.opciones.forEach((o) => { (por[o.x] = por[o.x] || []).push(o.n); });
    return 'Envase de la promo, una vez por promo: ' + Object.keys(por).map(Number).sort((a, b) => a - b).map((x) => money(x) + ' con ' + por[x].join(', ')).join(' · ');
  }
  function textoSel(g, s) { const n = vecesDe(g, s); return s.map((nm) => nm + (n > 1 ? ' x' + n : '')).join(' + '); }
  function textoOpc(grupos, sel) {
    return grupos.map((g, i) => {
      if (!sel[i].length) return '';
      let t = g.nombre + ': ' + textoSel(g, sel[i]);
      if (g.envase) { const e = envaseSel([g], [sel[i]]); if (e != null) t += ' · 📦 envase ' + money(e); }
      return t;
    }).filter(Boolean).join(' · ');
  }
  // Como se anuncia el grupo: usa el nombre real ("Salsas", "Hamburguesas", "Elija el plato").
  function tituloGrupo(g) {
    if (/salsa/i.test(g.nombre)) return g.max > 1 ? 'Tus salsas · elige hasta ' + g.max : 'Tu salsa';
    if (g.min >= 2 && g.min === g.max) return g.nombre + ' · elige ' + g.max + ' (una sola = las ' + g.max + ' iguales)';
    return g.nombre + (g.max > 1 ? ' · elige hasta ' + g.max : '');
  }
  function etiquetaOpc(p) {
    const gs = p.grupos || [];
    if (gs.length > 1) return 'Elige ' + gs.map((g) => g.nombre.toLowerCase()).join(' y ');
    if (!p.opcLabel || /salsa/i.test(p.opcLabel)) return p.salsasMax > 1 ? 'Elige ' + p.salsasMax + ' salsas' : 'Elige salsa';
    return p.opcLabel;
  }
  function envMax(p) { return p.variantes.reduce((m, v) => Math.max(m, Number(v.envase) || 0), 0); }
  function placeholderNota(p) {
    if (/gordon|cordon/i.test(p.nombre)) return 'Ej: la quiero de lentejas';
    if (/infantil/i.test(p.nombre)) return 'Ej: con pop corn y jugo del Valle';
    if (/papas/i.test(p.nombre)) return 'Ej: rústicas';
    return 'Ej: sin cebolla, término medio…';
  }

  /* ================= CARRITO ================= */
  // `salsa` = texto de las elecciones ("Salsas: BBQ + Buffalo" / "Hamburguesas: Ryo Texas x2 · Bebidas: …");
  // `extra` = recargo por unidad de esas elecciones (va DENTRO de `precio`, que es lo que paga el cliente).
  // `envOpc` = envase que fijó la elección (grupo "[envase]"); null = el cargo_envase normal del plato.
  function agregar(v, qty, salsa, nota, extra, envOpc) {
    const ex2 = Math.round((Number(extra) || 0) * 100) / 100;
    const eo = (envOpc != null && isFinite(Number(envOpc))) ? Math.round(Number(envOpc) * 100) / 100 : null;
    const key = v.id + '|' + norm(salsa) + '|' + norm(nota);
    const ex = cart.find((c) => c.key === key);
    if (ex) ex.qty += qty; else cart.push({ key, id: v.id, nombre: v.nombre, precio: Math.round((v.precio + ex2) * 100) / 100, extra: ex2, envase: Number(v.envase) || 0, envOpc: eo, qty, salsa: salsa || '', nota: nota || '' });
    guardarCart(); pintarMenu($('#q').value); pintarCarritoBadge(true);
  }
  function guardarCart() { ls.set('ryo_cart', cart); }
  const subtotal = () => cart.reduce((t, c) => t + c.precio * c.qty, 0);
  const nItems = () => cart.reduce((t, c) => t + c.qty, 0);
  // Envase "para llevar": dato por plato (menu_items.cargo_envase). Bebidas e ingredientes extra van en 0.
  const envaseDe = (c) => { if (c.envOpc != null) return Number(c.envOpc) || 0; const p = POR_ID[c.id]; return Number(p && p.envase != null ? p.envase : c.envase) || 0; };
  const envases = () => cart.reduce((t, c) => t + envaseDe(c) * c.qty, 0);
  const nEnvases = () => cart.reduce((t, c) => t + (envaseDe(c) > 0 ? c.qty : 0), 0);
  function pintarCarritoBadge(pop) {
    const fab = $('#fab'); const n = nItems();
    fab.classList.toggle('oculto-anim', n === 0);
    const wa = $('#wa-local'); if (wa) wa.classList.toggle('arriba', n === 0);
    $('#fab-n').textContent = n; $('#fab-t').textContent = money(subtotal() + envases() + (entrega === 'domicilio' && envio.estado === 'ok' ? envio.valor : 0));
    if (pop) { fab.classList.remove('pop'); void fab.offsetWidth; fab.classList.add('pop'); }
  }

  /* ================= ENTREGA / ENVÍO ================= */
  const havKm = (la1, lo1, la2, lo2) => { const R = 6371, rad = Math.PI / 180, dLa = (la2 - la1) * rad, dLo = (lo2 - lo1) * rad; const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * rad) * Math.cos(la2 * rad) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(a)); };
  // carrera del moto, fórmula única v29: $1,30 hasta 3 km, +$0,25 cada 500 m
  const carreraMoto = (d) => d < 3 ? CFG.carreraMin : r2(CFG.carreraMin + Math.ceil((d - 3) / 0.5) * 0.25);
  async function cotizar() {
    if (entrega !== 'domicilio' || !ubic) { envio = { estado: 'na', valor: 0, carrera: 0, servicio: 0, km: 0, min: 0 }; pintarEnvio(); return; }
    const key = ubic.lat.toFixed(4) + ',' + ubic.lng.toFixed(4);
    if (key === ubicKey && envio.estado === 'ok') { pintarEnvio(); return; }
    ubicKey = key;
    const recta = havKm(CFG.local.lat, CFG.local.lng, ubic.lat, ubic.lng);
    if (recta > CFG.maxKm) { envio = { estado: 'lejos', valor: 0, carrera: 0, servicio: 0, km: recta, min: 0 }; pintarEnvio(); return; }
    envio = { estado: 'loading', valor: 0, carrera: 0, servicio: 0, km: 0, min: 0 }; pintarEnvio();
    let carrera = 0, km = 0, min = 0;
    try {
      const r = await fetchJson(CFG.cotizador, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origen_lat: CFG.local.lat, origen_lng: CFG.local.lng, destino_lat: ubic.lat, destino_lng: ubic.lng, origen: CFG.local.lat + ',' + CFG.local.lng, destino: ubic.lat + ',' + ubic.lng }) }, 9000);
      const j = r.json || {};
      if (j.ok !== false && Number(j.precio) > 0) { carrera = Number(j.precio); km = Number(j.distancia_km) || 0; min = Number(j.duracion_minutos) || 0; }
    } catch (e) { /* estimado */ }
    if (!carrera) { km = recta * 1.3; carrera = carreraMoto(km); }
    if (key !== ubicKey) return;
    const servicio = CFG.servicio;
    envio = { estado: 'ok', valor: r2(carrera + servicio), carrera: r2(carrera), servicio, km, min, estimado: !min };
    pintarEnvio();
    emitir('ryo:envio', envio);
  }
  const etaTxt = () => envio.min ? ' · llega en ~' + (envio.min + CFG.cocinaMin) + ' min' : '';
  function pintarEnvio() {
    const el = $('#envio-linea');
    let txt = '';
    if (entrega === 'retiro') txt = '🏪 Retiras en <b>' + esc(CFG.local.direccion) + '</b> · sin costo de envío';
    else if (!ubic) txt = '📍 <button type="button" id="btn-ubic-top">Usa tu ubicación</button> para ver el precio del envío · desde ' + money(CFG.carreraMin + CFG.servicio);
    else if (envio.estado === 'loading') txt = '⏳ Calculando tu envío…';
    else if (envio.estado === 'lejos') txt = '😕 Estás a ' + envio.km.toFixed(1) + ' km: fuera de la zona de entrega';
    else if (envio.estado === 'ok') txt = '🛵 Envío <b>' + money(envio.valor) + '</b> · ' + envio.km.toFixed(1) + ' km' + etaTxt() + ' <span class="ok">✓</span>';
    el.innerHTML = txt;
    const b = $('#btn-ubic-top'); if (b) b.addEventListener('click', () => pedirGPS());
    pintarCarritoBadge();
    if ($('#resumen')) pintarResumen();
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
    }, () => { pidiendoGPS = false; toast('No pude obtener tu ubicación. Activa el GPS y permite el acceso 📍', 4000); },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }
  function mapaUrl(lat, lng, color, label) {
    return 'https://maps.googleapis.com/maps/api/staticmap?size=640x360&scale=2&zoom=16&language=es&center=' + lat + ',' + lng +
      '&markers=' + encodeURIComponent('color:0x' + color + '|label:' + label + '|' + lat + ',' + lng) + '&key=' + CFG.mapsKey;
  }

  /* ================= CUENTAS PARA TRANSFERIR ================= */
  // Antes el cliente tenía que pedir la cuenta por WhatsApp y el local le mandaba una foto a mano.
  function htmlCuentas(total, codigo) {
    const T = CFG.transfer;
    return '<div class="cuentas">' +
      '<div class="cuentas-tit">🏦 Transfiere a cualquiera de estas cuentas' + (total != null ? ' · <b>' + money(total) + '</b>' : '') + '</div>' +
      T.cuentas.map((c) => '<button type="button" class="cta-cuenta" data-n="' + esc(c.n) + '">' +
        '<span class="i"><span class="b">' + esc(c.b) + '</span><span class="t">' + esc(c.t) + '</span></span>' +
        '<span class="n">' + esc(c.n) + '</span><span class="cp">copiar</span></button>').join('') +
      '<div class="cuentas-pie">📲 También por <b>DeUna</b> (Banco Pichincha) a nombre de ' + esc(T.deuna) + '</div>' +
      (codigo
        ? '<a class="btn-wa" target="_blank" rel="noopener" href="https://wa.me/' + CFG.whatsapp + '?text=' +
          encodeURIComponent('Hola, le mando el comprobante de mi pedido ' + codigo + ' 📸') + '">📸 Mandar el comprobante por WhatsApp</a>'
        : '<div class="cuentas-pie">📸 Al confirmar te damos el botón para mandar el comprobante por WhatsApp.</div>') +
      '</div>';
  }
  function bindCuentas(cont) {
    $$('.cta-cuenta', cont).forEach((b) => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.n); toast('Número copiado ✓'); }
      catch (e) { toast('Cuenta: ' + b.dataset.n); }
    }));
  }
  function pintarCuentasPago() {
    const c = $('#pago-cuentas'); if (!c) return;
    if (pago !== 'Transferencia') { c.innerHTML = ''; return; }
    c.innerHTML = htmlCuentas(null, null);
    bindCuentas(c);
  }

  /* ================= CHECKOUT ================= */
  function abrirCarrito() {
    if (!cart.length) { toast('Tu pedido está vacío 🍔'); return; }
    const html =
      '<div class="hoja-titulo tit">Tu pedido</div><div class="hoja-sub" id="hoja-sub-cart">' + nItems() + ' ítems · ' + (entrega === 'domicilio' ? 'a domicilio' : 'para retirar') + '</div>' +
      '<div class="cart-items" id="cart-items"></div>' +
      '<div class="bloque"><div class="et">Entrega</div><div class="segment" id="seg2">' +
        '<button data-e="domicilio" class="' + (entrega === 'domicilio' ? 'on' : '') + '">🛵 A domicilio</button>' +
        '<button data-e="retiro" class="' + (entrega === 'retiro' ? 'on' : '') + '">🏪 Retiro en local<small>sin costo</small></button></div>' +
        '<div id="zona-entrega"></div></div>' +
      '<div class="bloque"><div class="et">Tus datos</div>' +
        '<label class="campo"><span class="et">Tu nombre</span><input id="c-nombre" autocomplete="name" placeholder="Ej: Juan Pérez" value="' + esc(cliente.nombre || '') + '"><div class="err oculto" id="e-nombre">Escribe tu nombre</div></label>' +
        '<label class="campo"><span class="et">Tu WhatsApp</span><input id="c-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="Ej: 0991234567" maxlength="14" value="' + esc(cliente.tel || '') + '"><div class="err oculto" id="e-tel">Escribe tu número de 10 dígitos (para que el local te contacte)</div></label>' +
      '</div>' +
      '<div class="bloque"><div class="et">Cómo pagas</div><div class="pago" id="pago">' +
        '<button data-p="Efectivo" class="' + (pago === 'Efectivo' ? 'on' : '') + '">💵 Efectivo</button><button data-p="Transferencia" class="' + (pago === 'Transferencia' ? 'on' : '') + '">🏦 Transferencia</button></div><div id="pago-cuentas"></div></div>' +
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
    $$('#pago button', hoja).forEach((b) => b.addEventListener('click', () => { pago = b.dataset.p; ls.set('ryo_pago', pago); $$('#pago button', hoja).forEach((x) => x.classList.toggle('on', x === b)); pintarCuentasPago(); pintarResumen(); }));
    $('#c-fact', hoja).addEventListener('change', (e) => $('#fact-campos', hoja).classList.toggle('oculto', !e.target.checked));
    $('#confirmar', hoja).addEventListener('click', confirmar);
    pintarZonaEntrega(); pintarCuentasPago(); pintarResumen();
    if (entrega === 'domicilio' && !ubic) setTimeout(() => pedirGPS(), 250);
  }
  function pintarCartItems() {
    const c = $('#cart-items'); if (!c) return;
    c.innerHTML = cart.map((it, i) => '<div class="cart-item"><div><div class="n">' + esc(it.nombre) + '</div>' +
      ((it.salsa || it.nota) ? '<div class="d">' + esc([it.salsa ? (it.salsa.indexOf(':') >= 0 ? it.salsa : 'Salsas: ' + it.salsa) : '', it.nota].filter(Boolean).join(' · ')) + '</div>' : '') +
      (envaseDe(it) > 0 ? '<div class="d">📦 + envase ' + money(envaseDe(it)) + ' c/u</div>' : '') + '</div>' +
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
      '<label class="campo"><span class="et">Referencia de tu casa (opcional)</span><input id="c-ref" maxlength="140" placeholder="Ej: casa blanca de 2 pisos, portón negro" value="' + esc(cliente.ref || '') + '"><div class="err oculto" id="e-ref"></div></label>';
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
    const sub = subtotal(); const env2 = envases(); const del = entrega === 'domicilio';
    const env = del && envio.estado === 'ok' ? envio.valor : 0;
    let notaEnv = '';
    if (del) {
      if (!ubic) notaEnv = '<div class="nota-envio">📍 Falta tu ubicación para calcular el envío</div>';
      else if (envio.estado === 'loading') notaEnv = '<div class="nota-envio">⏳ Calculando el envío…</div>';
      else if (envio.estado === 'lejos') notaEnv = '<div class="nota-envio">😕 Fuera de la zona de entrega (' + envio.km.toFixed(1) + ' km). Puedes retirar en el local.</div>';
      else if (envio.estado === 'ok') notaEnv = '<div class="nota-envio ok">🛵 ' + envio.km.toFixed(1) + ' km' + etaTxt() + ' · lo lleva una moto DEWAN</div>';
    }
    r.innerHTML = '<div class="r"><span>Subtotal (' + nItems() + ' ítems)</span><b>' + money(sub) + '</b></div>' +
      (env2 > 0 ? '<div class="r"><span>Envases para llevar (' + nEnvases() + ')</span><b>' + money(env2) + '</b></div>' : '') +
      (del ? '<div class="r"><span>Envío 🛵</span><b>' + (envio.estado === 'ok' ? money(env) : '—') + '</b></div>' : '<div class="r"><span>Retiro en local</span><b>$0,00</b></div>') + notaEnv +
      '<div class="r tot"><span>Total a pagar · ' + esc(pago) + '</span><b>' + money(sub + env2 + env) + '</b></div>';
    const ct = $('#confirmar-total'); if (ct) ct.textContent = money(sub + env2 + env);
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
      if (envio.estado !== 'ok') { cotizar(); toast('⏳ Calculando el envío, intenta en un segundo'); return; }
    }
    const del = entrega === 'domicilio';
    const sub = r2(subtotal());
    const envs = r2(envases());
    const env = del ? envio.valor : 0;
    const total = r2(sub + envs + env);
    let detalle = cart.map((c) => c.qty + 'x ' + c.nombre + ' — ' + '$' + (c.precio * c.qty).toFixed(2)).join('\n');
    if (envs > 0) detalle += '\n📦 Envases para llevar (' + nEnvases() + ') — $' + envs.toFixed(2);
    detalle += '\n💳 ' + pago;
    cart.forEach((c) => { if (c.salsa) detalle += '\n📝 ' + c.nombre + ' — ' + (c.salsa.indexOf(':') >= 0 ? c.salsa : 'Salsas: ' + c.salsa); if (c.nota) detalle += '\n📝 ' + c.nombre + ': ' + c.nota; });
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
      precio_base_productos: r2(sub + envs), precio_calculado: env, monto_total: total, markup_dewan: 0,
      tarifa_servicio: del ? envio.servicio : 0,
      distancia_km: del ? Math.round(envio.km * 10) / 10 : 0,
      duracion_minutos: del ? (envio.min || 0) : 0,
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
    // El codigo RYO-N lo pone un trigger de la BD y viene en la respuesta; si faltara, se relee
    // para que el cliente vea EL MISMO numero que el panel del local y la app de la moto.
    let codigo = row.codigo_pedido || '';
    if (!codigo) {
      try {
        const rc = await fetchJson(CFG.supa + '/rest/v1/' + CFG.tabla + '?select=codigo_pedido&id=eq.' + row.id,
          { headers: { apikey: CFG.anon, Authorization: 'Bearer ' + CFG.anon } }, 6000);
        if (rc.ok && rc.json && rc.json[0]) codigo = rc.json[0].codigo_pedido || '';
      } catch (e) {}
    }
    codigo = codigo || ('#' + row.id);
    // Confirmacion por WhatsApp (plantilla de Meta, sale por el numero del local). No bloquea la
    // pantalla de exito: si falla, el cliente igual tiene su codigo y su link aqui.
    try {
      fetch(CFG.avisoWa, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedido_id: row.id }), keepalive: true }).catch(function () {});
    } catch (e) {}
    const resumen = cart.map((c) => ({ id: c.id, nombre: c.nombre, precio: c.precio, extra: c.extra || 0, envOpc: (c.envOpc != null ? c.envOpc : null), qty: c.qty, salsa: c.salsa, nota: c.nota }));
    ls.set('ryo_ultimo', { codigo, link, ts: Date.now(), items: resumen, total, entrega });
    cart = []; guardarCart(); pintarMenu($('#q').value); pintarCarritoBadge();
    mostrarExito(codigo, link, resumen, del, env, total);
    emitir('ryo:pedido', { codigo });
  }
  function mostrarExito(codigo, link, items, del, env, total) {
    const h = $('#hoja .cuerpo-hoja'); if (!h) return;
    $('#hoja .cerrar').classList.add('oculto');
    h.innerHTML = '<div class="exito"><div class="check">✓</div><h2 class="tit">¡Pedido recibido!</h2><div class="cod">' + esc(codigo) + '</div>' +
      '<p><b>Ryo Burger</b> ya lo tiene en su pantalla y en un momento te confirma el tiempo. ' + (del ? 'Cuando esté listo, una moto DEWAN te lo lleva.' : 'Te avisamos cuando esté listo para retirar.') + '</p>' +
      '<div class="resumen" style="text-align:left">' + items.map((c) => '<div class="r"><span>' + c.qty + 'x ' + esc(c.nombre) + '</span><b>' + money(c.precio * c.qty) + '</b></div>').join('') +
      (del ? '<div class="r"><span>Envío 🛵</span><b>' + money(env) + '</b></div>' : '') + '<div class="r tot"><span>Total · ' + esc(pago) + '</span><b>' + money(total) + '</b></div></div>' +
      (pago === 'Transferencia' ? htmlCuentas(total, codigo) : '') +
      '<div class="btns"><a class="btn-p" id="btn-seguir" href="' + esc(link) + '" target="_blank" rel="noopener">📍 Seguir mi pedido en vivo</a>' +
      '<button class="btn-s" id="btn-copiar">Guardar el link del pedido</button><button class="btn-s" id="btn-otro">Hacer otro pedido</button></div>' +
      '<div class="link-caja">' + esc(link) + '</div>' +
      '<p style="font-size:12px">En ese link ves cuando el local confirma, cuando sale la moto y cuando llega.</p></div>';
    hojaAbierta.onClose = null;
    bindCuentas(h);
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
      u.items.forEach((c) => { const p = POR_ID[c.id]; if (!p) return; agregar({ id: c.id, nombre: p.nombre, precio: p.precio, envase: p.envase || 0 }, c.qty, c.salsa, c.nota, c.extra || 0, (c.envOpc != null ? c.envOpc : null)); n += c.qty; });
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
    box.onclick = () => { if (p.buscar) { const q = $('#q'); q.value = p.buscar; pintarMenu(p.buscar); const m = $('#menu'); window.scrollTo({ top: m.getBoundingClientRect().top + window.scrollY - 128, behavior: 'smooth' }); } }; // -128: la cabecera y los chips van pegados arriba y tapaban la tarjeta
  }

  /* ================= PWA (solo en la app principal, no en los modelos de muestra) ================= */
  let deferredPrompt = null;
  function pwa() {
    if (document.body.dataset.pwa === 'off') return;
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
    document.documentElement.classList.add('anim'); // las animaciones CSS solo corren si el JS llegó hasta aquí
    document.addEventListener('click', (e) => {
      const todo = e.target.closest('[data-todo]'); if (todo) { e.stopPropagation(); expandidas[todo.dataset.todo] = !expandidas[todo.dataset.todo]; pintarMenu($('#q').value); return; }
      const card = e.target.closest('[data-prod]'); if (card) { abrirProducto(card.dataset.prod, card); return; }
      const chip = e.target.closest('[data-cat]'); if (chip) { catActiva = chip.dataset.cat; $$('.chip').forEach((c) => c.classList.toggle('on', c === chip)); const s = $('#cat-' + slug(chip.dataset.cat)); if (s) { const y = s.getBoundingClientRect().top + window.scrollY - 128; window.scrollTo({ top: y, behavior: 'smooth' }); } return; }
    });
    $('#fab').addEventListener('click', abrirCarrito);
    $$('#seg button').forEach((b) => b.addEventListener('click', () => { setEntrega(b.dataset.e); if (entrega === 'domicilio' && !ubic) pedirGPS(); }));
    $$('#seg button').forEach((b) => b.classList.toggle('on', b.dataset.e === entrega));
    $('#q').addEventListener('input', (e) => pintarMenu(e.target.value));
    const comp = $('#btn-compartir'); if (comp) comp.addEventListener('click', async () => {
      const url = location.origin + location.pathname;
      try { if (navigator.share) { await navigator.share({ title: 'Ryo Burger · pide aquí', text: 'Pide en Ryo Burger sin salir de casa 🍔', url }); return; } } catch (e) { return; }
      try { await navigator.clipboard.writeText(url); toast('Link copiado ✓'); } catch (e) {}
    });
    const cta = $('#hero-cta'); if (cta) cta.addEventListener('click', () => { const s = $('#menu'); if (s) window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' }); });
    // botón de WhatsApp del local (dudas): el número de coexistencia del local
    if (!$('#wa-local')) { const a = document.createElement('a'); a.id = 'wa-local'; a.className = 'wa-local arriba'; a.href = 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent('Hola Ryo Burger, tengo una consulta'); a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', 'Escribir al local por WhatsApp'); a.textContent = '💬'; document.body.appendChild(a); }
    // chip activo según scroll
    const obs = ('IntersectionObserver' in window) ? new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { const k = en.target.id.replace(/^cat-/, ''); $$('.chip').forEach((c) => c.classList.toggle('on', slug(c.dataset.cat) === k)); } });
    }, { rootMargin: '-130px 0px -70% 0px' }) : null;
    const observar = () => { if (obs) { obs.disconnect(); $$('.seccion').forEach((s) => obs.observe(s)); } };
    window.addEventListener('ryo:menu', observar);
    // header compacto al hacer scroll (los temas deciden qué hacer con html.scrolled)
    let ultimoScroll = -1;
    window.addEventListener('scroll', () => { const s = window.scrollY > 90; if (s !== ultimoScroll) { ultimoScroll = s; document.documentElement.classList.toggle('scrolled', s); } }, { passive: true });

    cargarMenu().then(() => { pintarUltimo(); observar(); });
    pintarPromoDia(); pintarEnvio(); pintarCarritoBadge(); estadoLocal(); pwa();
    if (entrega === 'domicilio' && ubic) cotizar();
    if (new URLSearchParams(location.search).get('cart') === '1') setTimeout(abrirCarrito, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
