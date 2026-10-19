/* ============================================================
   carta/pagina.js — PÁGINA DESDE DATOS (14-oct-2026)
   p.html?p=<slug>
   1) Lee la fila de la vista `paginas_publicas` (SQL 035) en Supabase.
   2) Arma window.RESTAURANTES[slug] con su `config` (misma forma que
      carta/restaurantes/<slug>.js) y, si es en inglés, window.TEXTOS.
   3) Recién ahí carga engine.js (y sistema.js si el local está conectado).
   4) estado 'demo'  → franja "vista previa" + el botón de pedir lleva a activar.
      estado 'pausada' → se ve el menú pero no se puede pedir.
   Prueba local sin base: p.html?p=x&json=pruebas/demo-us.json (solo localhost).
   Todo va dentro de una función: engine.js declara SUPA_URL/SUPA_ANON globales.
   ============================================================ */
(function () {
  const SUPA_URL = "https://wfpdtjmmrhhfuxayvpzu.supabase.co";
  const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcGR0am1tcmhoZnV4YXl2cHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzE1NDksImV4cCI6MjA4ODY0NzU0OX0.Iyeogfs5AIiVrM5agXuMZsgFrud460OYvn0zkYgJH0s";
  const VENTAS_WA = "593939647069";   // a quién le escribe el local para activar su página
  const V = "?v=8";                    // versión de engine.js / sistema.js

  const params = new URLSearchParams(location.search);
  const slug = (params.get("p") || "").toLowerCase().trim();
  const $ = (q) => document.querySelector(q);

  /* ---------- textos en inglés (engine.js, plantillas y el carrito) ---------- */
  const EN = {
    // engine.js
    menu: "menu", cu: "each",
    faltaNombre: "Please enter your name 🙂", faltaDir: "Please add your address 🛵",
    waNuevo: "New order", waCliente: "Name", waEntrega: "Order type", waDelivery: "Delivery", waRetiro: "Pickup",
    waDir: "Address", waUbic: "Location", waPedido: "Order", waNota: "Note", aSuEleccion: "Your choice of: ",
    // plantillas
    buscarEn: "Search", sinResultados: "No results 🔍", popular: "⭐ Popular", loMasPedido: "🔥 Most ordered",
    listoPara: "Ready for", bannerDef: "🛵 Delivery or pickup · order in 3 taps",
    buscar: "Search…", cap: "CH.", indice: "☰ Index", laCarta: "The Menu", gracias: "*** THANK YOU FOR YOUR ORDER ***",
    agregar: "add", quitar: "remove",
    // carrito (p.html, data-t / data-tp)
    cargando: "Loading the menu…", verPedido: "view order", tuPedido: "Your order", carritoVacio: "Your cart is empty 🍽️",
    tuNombre: "Your name", phNombre: "e.g. John Smith", tipoEntrega: "Order type",
    optDelivery: "Delivery", optRetiro: "Pickup", direccion: "Address", phDir: "Street, number, apt",
    usarUbic: "📍 Use my current location", ubicOk: "✓ Location added to the order",
    notaOpc: "Note (optional)", phNota: "e.g. no onions, ring the bell…", enviarWA: "Send order on WhatsApp",
    // plantilla sitio
    abierto: "Open", cerrado: "Closed", cierraA: "closes at", abreHoy: "opens today at", abreManana: "opens tomorrow at",
    abreEl: "opens", aLas: "at", horario: "Hours", cerradoDia: "Closed", comoLlegar: "Get directions",
    factEnvio: "Delivery", factRetiro: "Pickup", firma: "Online ordering by DEWAN",
    // esta página
    noEncontrada: "We couldn't find this page.", errorCarga: "We couldn't load the menu. Please try again.",
    demoFranja: "👀 Preview of your ordering page · it doesn't take orders yet",
    demoBoton: "Activate my page", demoPedir: "Preview · activate the page to take orders",
    demoMsg: "Hi! I want to activate my ordering page",
    pausada: "⏸️ We're not taking online orders right now.",
  };
  const ES = {
    noEncontrada: "No encontramos esta página.", errorCarga: "No pudimos cargar el menú. Intente de nuevo.",
    demoFranja: "👀 Vista previa de su página · todavía no recibe pedidos",
    demoBoton: "Activar mi página", demoPedir: "Vista previa · active la página para recibir pedidos",
    demoMsg: "Hola, quiero activar mi página de pedidos",
    pausada: "⏸️ Por ahora no estamos recibiendo pedidos por aquí.",
  };
  let T = ES;

  function aviso(msg) {
    const app = $("#app");
    if (app) app.innerHTML = '<p style="padding:40px 20px;text-align:center;font-family:system-ui;color:#555">' + msg + "</p>";
  }

  function traducir() {
    document.querySelectorAll("[data-t]").forEach((el) => { const k = el.dataset.t; if (EN[k]) el.textContent = EN[k]; });
    document.querySelectorAll("[data-tp]").forEach((el) => { const k = el.dataset.tp; if (EN[k]) el.placeholder = EN[k]; });
  }

  /* logo con las iniciales cuando el local todavía no subió el suyo (las plantillas muestran un cuadro vacío) */
  function logoIniciales(nombre, fondo, letra) {
    const pal = String(nombre || "").replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter(Boolean);
    const ini = ((pal[0] || "?")[0] + (pal[1] ? pal[1][0] : "")).toUpperCase();
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="' + (fondo || "#222") + '"/>' +
      '<text x="100" y="100" dy=".35em" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="' + (ini.length > 1 ? 84 : 104) + '" fill="' + (letra || "#fff") + '">' + ini + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function cargarScript(src) {
    return new Promise((ok, mal) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = ok;
      s.onerror = () => mal(new Error("no cargó " + src));
      document.body.appendChild(s);
    });
  }

  async function leerFila() {
    const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    if (params.get("json") && local) {
      const r = await fetch(params.get("json"), { cache: "no-store" });
      return r.ok ? r.json() : null;
    }
    if (!/^[a-z0-9][a-z0-9-]{2,39}$/.test(slug)) return null;
    const url = SUPA_URL + "/rest/v1/paginas_publicas?slug=eq." + encodeURIComponent(slug) + "&select=*";
    const r = await fetch(url, { headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON } });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const filas = await r.json();
    return filas[0] || null;
  }

  /* ---------- vista previa (página todavía no activada) ---------- */
  function linkActivar(fila) {
    const pagina = location.origin + location.pathname + "?p=" + (fila.slug || slug);
    return "https://wa.me/" + VENTAS_WA + "?text=" + encodeURIComponent(T.demoMsg + ": " + pagina);
  }
  function franjaDemo(fila) {
    const st = document.createElement("style");
    st.textContent =
      "#pg-franja{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;" +
      "background:#111;color:#fff;font:600 13px/1.35 system-ui,sans-serif;padding:9px 14px;text-align:center}" +
      "#pg-franja a{background:#fff;color:#111;border-radius:999px;padding:6px 12px;text-decoration:none;font-weight:800;white-space:nowrap}";
    document.head.appendChild(st);
    const f = document.createElement("div");
    f.id = "pg-franja";
    f.innerHTML = "<span>" + T.demoFranja + '</span><a target="_blank" rel="noopener"></a>';
    f.querySelector("a").href = linkActivar(fila);
    f.querySelector("a").textContent = T.demoBoton;
    document.body.insertBefore(f, document.body.firstChild);
  }
  function botonSinPedidos(texto, href) {
    const b = $("#enviar");
    if (!b) return;
    const nuevo = b.cloneNode(false);           // sin los listeners de engine.js
    nuevo.textContent = texto;
    nuevo.disabled = false;
    nuevo.addEventListener("click", () => {
      if (typeof href === "function") href();
      else if (href) window.open(href, "_blank");
    });
    b.replaceWith(nuevo);
    // engine.js deshabilita #enviar con el carrito vacío: en la vista previa no hace falta
  }

  (async function arrancar() {
    let fila = null;
    try { fila = await leerFila(); } catch (e) { console.warn(e); aviso(ES.errorCarga + "<br>" + EN.errorCarga); return; }
    if (!fila || !fila.config) { aviso(ES.noEncontrada + "<br>" + EN.noEncontrada); return; }

    // ?lang=es|en (botón ES/EN de la plantilla) manda sobre el idioma guardado
    const pedido = (params.get("lang") || "").toLowerCase();
    const idioma = pedido === "en" || pedido === "es" ? pedido : fila.idioma === "en" ? "en" : "es";
    const ingles = idioma === "en";
    T = ingles ? Object.assign({}, EN) : ES;
    if (ingles) { window.TEXTOS = EN; document.documentElement.lang = "en"; traducir(); }
    if (fila.pais !== "EC") { const fw = $("#fact-wrap"), fc = $("#campo-fact"); if (fw) fw.remove(); if (fc) fc.remove(); }
    if (fila.estado !== "activa") {
      const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex"; document.head.appendChild(m);
    }

    const cfg = Object.assign({}, fila.config);
    if (fila.restaurante_id) cfg.restauranteId = fila.restaurante_id;
    if (cfg.restauranteId && cfg.live === undefined) cfg.live = true;   // local real → menú de vitrina_menu
    if (!Array.isArray(cfg.menu)) cfg.menu = [];
    if (!cfg.plantillas || !cfg.plantillas.length) cfg.plantillas = [fila.pais === "US" ? "sitio" : "swift"];
    if (!cfg.logo) cfg.logo = logoIniciales(cfg.nombre, cfg.marca, cfg.crema);
    const clave = fila.slug || slug;
    window.RESTAURANTES = { [clave]: cfg };
    if (params.get("p") && params.get("p") !== clave) window.RESTAURANTES[params.get("p")] = cfg;   // engine.js busca por ?p= tal cual
    window.PAGINA = { slug: clave, estado: fila.estado, pais: fila.pais, idioma: idioma, local_us_id: fila.local_us_id || null };
    if (!params.get("p")) history.replaceState(null, "", "?p=" + clave + (params.get("json") ? "&json=" + params.get("json") : ""));

    const cargando = $("#pg-cargando");
    if (cargando) cargando.remove();
    try {
      await cargarScript("engine.js" + V);
      // EE.UU. activa con local → cierre con tarjeta / retiro / DoorDash (checkout-us.js, pedidos_us).
      // Ecuador conectado → sistema.js (pedidos_sistema). Si no, el pedido sale por WhatsApp (engine.js).
      if (fila.pais === "US" && fila.estado === "activa" && fila.local_us_id) await cargarScript("checkout-us.js?v=1");
      else if (cfg.sistema && fila.estado === "activa") await cargarScript("sistema.js?v=8");
    } catch (e) { console.warn(e); aviso(T.errorCarga); return; }

    if (fila.estado === "demo") {
      // Panel para el dueño (oferta). Si no carga, queda la franja simple de antes.
      // Solo EE.UU.: la oferta (precios de referencia, Meta, garantía) es la de allá.
      let oferta = null;
      if (fila.pais === "US") {
        try { await cargarScript("oferta-dueno.js?v=1"); oferta = window.OFERTA_DUENO && window.OFERTA_DUENO.montar(fila, cfg, linkActivar(fila)); }
        catch (e) { console.warn(e); }
      }
      if (!oferta) franjaDemo(fila);
      botonSinPedidos(T.demoPedir, oferta ? () => oferta.abrir() : linkActivar(fila));
    } else if (fila.estado === "pausada") {
      botonSinPedidos(T.pausada, null);
    }
  })();
})();
