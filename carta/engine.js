/* ============================================================
   MOTOR COMPARTIDO
   Cada plantilla (templates/*.js) define SOLO su look (css + render).
   Toda la lógica de carrito, totales y envío por WhatsApp vive acá,
   así los 6 diseños pueden ser totalmente distintos sin repetir lógica.

   CONTRATO que debe cumplir cada plantilla al pintar productos:
   - Botón/elemento para SUMAR:   data-add="ID"
   - Botón/elemento para RESTAR:  data-sub="ID"
   - Mostrar cantidad:            <span data-cant="ID">0</span>
   - Envoltorio del stepper:      data-qtywrap="ID"  -> recibe clase .has-qty cuando hay >0
   - Navegación por categoría:    botón data-cat="slug"  +  sección id="cat-slug"
   El helper ctrl(id) devuelve un stepper estándar listo para usar.

   MODOS (por querystring):
   - ?r=papazota                 -> preview con el menú del config (look de diseño)
   - ?r=papazota&live=1          -> lee el menú REAL de Supabase (solo lectura)
   - ?r=papazota&token=XXXX      -> MODO EDICIÓN: lee el menú real + botón 📷 por plato
                                    para subir su foto (va al webhook de n8n con service_role)
   ============================================================ */

/* ---- Config compartida Supabase / n8n ---- */
const SUPA_URL  = "https://wfpdtjmmrhhfuxayvpzu.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcGR0am1tcmhoZnV4YXl2cHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzE1NDksImV4cCI6MjA4ODY0NzU0OX0.Iyeogfs5AIiVrM5agXuMZsgFrud460OYvn0zkYgJH0s";
const WEBHOOK_FOTO = "https://restaurante1-n8n.bqspdc.easypanel.host/webhook/subir-foto-vitrina";

const params = new URLSearchParams(location.search);
const id = params.get("r") || "papazota";
// Plantilla por defecto = la primera declarada para ese local en su config
const cfg = (window.RESTAURANTES && window.RESTAURANTES[id]) || null;
const tpl = params.get("tpl") || (cfg && cfg.plantillas && cfg.plantillas[0]);
const TPL = (window.TEMPLATES && window.TEMPLATES[tpl]) || null;

const TOKEN = params.get("token") || "";          // si viene, el dueño está subiendo fotos
const EDIT  = !!TOKEN;                              // modo edición de fotos
const LIVE  = EDIT || params.get("live") === "1";  // leer el menú real de Supabase
const UNA_CAT = (TPL && TPL.unaCategoria === false)
  ? false
  : (!cfg || cfg.categoriaUnica !== false); // una categoría a la vez, salvo que la plantilla pida ver todas (scroll)

if (!cfg) detener(`Restaurante "${id}" no encontrado. Probá ?r=papazota o ?r=srmoro`);
else if (!TPL) detener(`Plantilla "${tpl}" no encontrada para ${cfg.nombre}.`);

function detener(msg) {
  document.body.innerHTML =
    `<p style="padding:30px;font-family:system-ui">${msg}</p>`;
  throw new Error(msg);
}

const R = cfg;

/* ---- Aplicar paleta de marca + plantilla ---- */
document.body.dataset.r = id;
document.body.dataset.tpl = tpl;
const rootStyle = document.documentElement.style;
rootStyle.setProperty("--marca", R.marca);
rootStyle.setProperty("--tinta", R.tinta);
rootStyle.setProperty("--crema", R.crema || "#ffffff");
rootStyle.setProperty("--acento", R.acento || R.marca);
document.title = `${R.nombre} · menú`;

/* ---- Inyectar el CSS de la plantilla ---- */
const styleTag = document.createElement("style");
styleTag.textContent = TPL.css || "";
document.head.appendChild(styleTag);

/* ---- Helper de stepper estándar para las plantillas ---- */
function ctrl(pid) {
  return `<span class="stepper" data-qtywrap="${pid}">
      <button class="st-btn st-min" data-sub="${pid}" aria-label="quitar">−</button>
      <b class="st-q" data-cant="${pid}">0</b>
    </span>
    <button class="st-btn st-add" data-add="${pid}" aria-label="agregar">＋</button>`;
}

/* ---- slug para ids de categoría (disponible para las plantillas) ---- */
window.slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");

/* =================== LÓGICA COMPARTIDA =================== */
const carrito = {};                      // { id: cantidad }
const $ = (s) => document.querySelector(s);

function buscar(pid) {
  for (const c of R.menu) { const it = c.items.find((x) => x.id === pid); if (it) return it; }
}
const totalDinero = () => Object.entries(carrito).reduce((t, [pid, c]) => t + buscar(pid).precio * c, 0);
const totalItems = () => Object.values(carrito).reduce((t, c) => t + c, 0);

function cambiar(pid, delta) {
  carrito[pid] = (carrito[pid] || 0) + delta;
  if (carrito[pid] <= 0) delete carrito[pid];
  refrescar();
}

// Delegación global: funciona con CUALQUIER layout que use los data-attrs
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const sub = e.target.closest("[data-sub]");
  if (add) cambiar(add.dataset.add, +1);
  else if (sub) cambiar(sub.dataset.sub, -1);

  const cat = e.target.closest("[data-cat]");
  if (cat) {
    if (UNA_CAT) {
      seleccionarCategoria(cat.dataset.cat, true);
    } else {
      const dest = document.getElementById("cat-" + cat.dataset.cat);
      if (dest) dest.scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("activa", b === cat));
    }
  }
});

/* ---- Mostrar SOLO una categoría a la vez ---- */
function seleccionarCategoria(slugCat, scroll) {
  document.querySelectorAll('[id^="cat-"]').forEach((sec) => {
    sec.classList.toggle("cat-activa", sec.id === "cat-" + slugCat);
  });
  document.querySelectorAll("[data-cat]").forEach((b) => {
    const on = b.dataset.cat === slugCat;
    b.classList.toggle("activa", on);   // pz-street
    b.classList.toggle("active", on);   // sm-circular
  });
  if (scroll) {
    const dest = document.getElementById("cat-" + slugCat);
    if (dest) dest.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function refrescar() {
  // 1) cantidades en todos los elementos que muestren ese producto
  document.querySelectorAll("[data-cant]").forEach((el) => {
    el.textContent = carrito[el.dataset.cant] || 0;
  });
  document.querySelectorAll("[data-qtywrap]").forEach((el) => {
    el.classList.toggle("has-qty", (carrito[el.dataset.qtywrap] || 0) > 0);
  });
  // 2) botón flotante
  const n = totalItems(), tot = totalDinero();
  $("#fab-cant").textContent = n;
  $("#fab-total").textContent = "$" + tot.toFixed(2);
  $("#cart-fab").classList.toggle("oculto", n === 0);
  // 3) total dentro del carrito + botón enviar
  $("#cart-total").textContent = "$" + tot.toFixed(2);
  $("#enviar").disabled = n === 0;
  pintarCarrito();
}

/* ---- Carrito (panel compartido) ---- */
function pintarCarrito() {
  const cont = $("#cart-items");
  const ent = Object.entries(carrito);
  $("#cart-vacio").classList.toggle("oculto", ent.length > 0);
  cont.innerHTML = ent.map(([pid, c]) => {
    const it = buscar(pid);
    return `<div class="cart-row">
        <div class="cart-row-info">
          <div class="cart-row-nom">${it.nombre}</div>
          <div class="cart-row-pre">$${it.precio.toFixed(2)} c/u</div>
        </div>
        <div class="stepper compact" data-qtywrap="${pid}">
          <button class="st-btn st-min" data-sub="${pid}">−</button>
          <b class="st-q" data-cant="${pid}">${c}</b>
          <button class="st-btn st-add" data-add="${pid}">＋</button>
        </div>
        <div class="cart-row-sub">$${(it.precio * c).toFixed(2)}</div>
      </div>`;
  }).join("");
}

const abrir = () => { $("#cart").classList.remove("oculto"); $("#overlay").classList.remove("oculto"); };
const cerrar = () => { $("#cart").classList.add("oculto"); $("#overlay").classList.add("oculto"); };
$("#cart-fab").addEventListener("click", abrir);
$("#cart-cerrar").addEventListener("click", cerrar);
$("#overlay").addEventListener("click", cerrar);
$("#cli-entrega").addEventListener("change", (e) => {
  $("#campo-dir").classList.toggle("oculto", e.target.value !== "Delivery");
});

/* ---- Ubicación GPS de un toque (delivery) ---- */
let ubicacion = null;
const _btnUbic = $("#cli-ubic");
if (_btnUbic) _btnUbic.addEventListener("click", () => {
  if (!navigator.geolocation) { alert("Tu dispositivo no permite ubicación 📍"); return; }
  _btnUbic.textContent = "📍 Obteniendo ubicación…";
  _btnUbic.disabled = true;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      ubicacion = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      $("#ubic-ok").classList.remove("oculto");
      _btnUbic.textContent = "📍 Ubicación lista ✓";
      _btnUbic.classList.add("ok");
      _btnUbic.disabled = false;
    },
    () => {
      _btnUbic.textContent = "📍 Usar mi ubicación actual";
      _btnUbic.disabled = false;
      alert("No pude obtener tu ubicación. Activá el GPS del teléfono y permití el acceso 📍");
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

/* ---- Factura (mostrar/ocultar campos) ---- */
const _factChk = $("#cli-fact-chk");
if (_factChk) _factChk.addEventListener("change", (e) => {
  $("#campo-fact").classList.toggle("oculto", !e.target.checked);
});

/* ---- Enviar pedido por WhatsApp (acá conectaremos n8n luego) ---- */
$("#enviar").addEventListener("click", () => {
  const nombre = $("#cli-nombre").value.trim();
  const entrega = $("#cli-entrega").value;
  const dir = $("#cli-dir").value.trim();
  const nota = $("#cli-nota").value.trim();
  if (!nombre) return alert("Por favor escribí tu nombre 🙂");
  if (entrega === "Delivery" && !dir && !ubicacion) return alert("Falta tu dirección o tu ubicación 🛵");

  let m = `*Nuevo pedido — ${R.nombre}*\n\n*Cliente:* ${nombre}\n*Entrega:* ${entrega}\n`;
  if (entrega === "Delivery") {
    if (dir) m += `*Dirección:* ${dir}\n`;
    if (ubicacion) m += `*Ubicación:* https://maps.google.com/?q=${ubicacion.lat},${ubicacion.lng}\n`;
  }
  m += `\n*Pedido:*\n`;
  Object.entries(carrito).forEach(([pid, c]) => {
    const it = buscar(pid);
    m += `• ${c}x ${it.nombre} — $${(it.precio * c).toFixed(2)}\n`;
  });
  m += `\n*Total: $${totalDinero().toFixed(2)}*`;
  if (nota) m += `\n\n*Nota:* ${nota}`;

  if (_factChk && _factChk.checked) {
    const fn = $("#cli-fact-nom").value.trim();
    const fi = $("#cli-fact-id").value.trim();
    const fm = $("#cli-fact-mail").value.trim();
    if (fn || fi || fm) {
      m += `\n\n*🧾 Datos de factura:*`;
      if (fn) m += `\nNombre/Razón social: ${fn}`;
      if (fi) m += `\nCédula/RUC: ${fi}`;
      if (fm) m += `\nCorreo: ${fm}`;
    }
  }

  // HOY: WhatsApp del local.  MAÑANA: fetch al webhook de n8n (ejemplo abajo).
  window.open(`https://wa.me/${R.whatsapp}?text=${encodeURIComponent(m)}`, "_blank");
  /*  fetch("https://TU-N8N/webhook/pedido", { method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ restaurante:id, cliente:nombre, entrega, dir, nota,
          items:Object.entries(carrito).map(([pid,c])=>({...buscar(pid),cantidad:c})),
          total: totalDinero() }) }).then(()=>alert("¡Pedido enviado! 🎉"));  */
});

/* =================== ORDEN DE CATEGORÍAS =================== */
/* Principales primero; bebidas/adicionales/aperitivos/extras al final.
   - R.ordenCategorias: lista (opcional) con el orden EXACTO de las principales.
   - R.categoriasAlFinal: palabras (opcional) que mandan una categoría al fondo. */
const _norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const TAIL_DEFAULT = ["bebida", "adicional", "aperitivo", "michelada", "extra", "salsa", "postre", "crema", "acompa"];
function ordenarCategorias(cats) {
  const explicito = (R.ordenCategorias || []).map(_norm);
  const tail = (R.categoriasAlFinal || TAIL_DEFAULT).map(_norm);
  const rank = (cat) => {
    const n = _norm(cat.categoria);
    const ie = explicito.indexOf(n);
    if (ie !== -1) return [0, ie];                       // explícitas primero, en su orden
    if (tail.some((k) => n.includes(k))) return [2, 0];  // bebidas/adicionales/... al final
    return [1, 0];                                       // resto = principales
  };
  return cats.slice().sort((a, b) => {
    const ra = rank(a), rb = rank(b);
    return ra[0] - rb[0] || ra[1] - rb[1] || _norm(a.categoria).localeCompare(_norm(b.categoria));
  });
}

/* =================== MENÚ REAL DESDE SUPABASE =================== */
async function cargarMenuSupabase(rid) {
  const url = `${SUPA_URL}/rest/v1/vitrina_menu?restaurante_id=eq.${rid}&order=categoria_menu`;
  const r = await fetch(url, { headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON } });
  if (!r.ok) throw new Error("HTTP " + r.status);
  const rows = await r.json();
  const cats = [], idx = {};
  for (const row of rows) {
    const cat = row.categoria_menu || "Menú";
    if (!(cat in idx)) { idx[cat] = cats.length; cats.push({ categoria: cat, items: [] }); }
    cats[idx[cat]].items.push({
      id: row.id,
      nombre: row.nombre_item,
      precio: Number(row.precio) || 0,
      desc: row.descripcion || "",
      foto: row.foto_url || "",
    });
  }
  return ordenarCategorias(cats);
}

/* =================== SUBIR FOTO (modo edición) =================== */
async function comprimirWebp(file, max) {
  const img = await createImageBitmap(file);
  const esc = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * esc);
  c.height = Math.round(img.height * esc);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return await new Promise((res) => c.toBlob(res, "image/webp", 0.82));
}
function blobABase64(blob) {
  return new Promise((res) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result).split(",")[1]); // sin el prefijo data:
    fr.readAsDataURL(blob);
  });
}
async function subirFoto(file, itemId) {
  const blob = await comprimirWebp(file, 1280);
  const b64 = await blobABase64(blob);
  const r = await fetch(WEBHOOK_FOTO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: TOKEN, item_id: itemId, foto_base64: b64 }),
  });
  let out = {};
  try { out = await r.json(); } catch (e) {}
  if (!r.ok || !out.ok) throw new Error((out && out.error) || "HTTP " + r.status);
  return out.url;
}

/* ---- Inyectar el botón 📷 sobre cada plato (modo edición) ---- */
function activarSubidaFotos() {
  document.querySelectorAll("[data-qtywrap]").forEach((wrap) => {
    const itemId = wrap.dataset.qtywrap;
    const art = wrap.closest("article");
    if (!art) return;
    const media = art.querySelector(".pz-media, .sm-token, [data-media]");
    if (!media || media.querySelector(".foto-btn")) return;
    if (getComputedStyle(media).position === "static") media.style.position = "relative";

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "foto-btn";
    btn.title = "Cambiar foto";
    btn.textContent = "📷";

    btn.addEventListener("click", () => input.click());
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      btn.classList.add("cargando");
      btn.textContent = "…";
      try {
        const url = await subirFoto(file, itemId);
        let img = media.querySelector("img");
        if (!img) {
          const emo = media.querySelector(".pz-emoji, .sm-emoji");
          if (emo) emo.remove();
          img = document.createElement("img");
          img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:inherit;";
          media.insertBefore(img, media.firstChild);
        }
        img.src = url + "?v=" + Date.now();
        btn.textContent = "✓";
        setTimeout(() => { btn.textContent = "📷"; btn.classList.remove("cargando"); }, 1400);
      } catch (err) {
        btn.textContent = "✕";
        btn.classList.remove("cargando");
        alert("No se pudo subir la foto:\n" + (err.message || err));
        setTimeout(() => { btn.textContent = "📷"; }, 1500);
      } finally {
        input.value = "";
      }
    });

    media.appendChild(input);
    media.appendChild(btn);
  });
}

/* ---- Aviso flotante (toast) ---- */
function toast(msg, ms) {
  const d = document.createElement("div");
  d.className = "edit-banner";
  d.textContent = msg;
  document.body.appendChild(d);
  if (ms) setTimeout(() => d.remove(), ms);
}

/* =================== ARRANQUE =================== */
(async function init() {
  let menuEsReal = false;   // true sólo si el menú vino de Supabase (ids uuid reales)

  if (LIVE) {
    if (!cfg.restauranteId) {
      toast(`⚠️ Falta poner restauranteId en restaurantes/${id}.js para leer/subir el menú real`);
    } else {
      try {
        const menu = await cargarMenuSupabase(cfg.restauranteId);
        if (menu.length) { R.menu = menu; menuEsReal = true; }
        else toast("⚠️ Este restaurante no tiene platos en Supabase todavía");
      } catch (e) {
        console.warn("No pude leer el menú de Supabase, uso el del config:", e);
        toast("⚠️ No pude leer el menú de Supabase: " + e.message);
      }
    }
  }

  TPL.render(R, document.getElementById("app"), ctrl, window.slug);

  if (UNA_CAT) {
    document.body.classList.add("cat-unica");
    const slugs = (R.menu || []).map((c) => window.slug(c.categoria));
    const pedida = params.get("cat");                       // ?cat=<slug> abre esa categoría
    const primera = (pedida && slugs.includes(pedida)) ? pedida : slugs[0];
    if (primera) seleccionarCategoria(primera, false);      // sin scroll al cargar
  }

  if (EDIT && menuEsReal) {
    activarSubidaFotos();                 // 📷 sólo sobre platos con id real
    toast("✏️ Modo edición — tocá 📷 en cada plato para subir su foto", 6000);
  } else if (EDIT) {
    toast("⚠️ No hay menú real para editar. Revisá el restauranteId y que el restaurante tenga platos en Supabase.");
  }

  refrescar();
  if (params.get("cart") === "1") abrir();   // ?cart=1 abre el carrito (para previsualizar)
})();
