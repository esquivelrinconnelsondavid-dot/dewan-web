/* ============================================================
   carta/oferta-dueno.js — PANEL PARA EL DUEÑO (18-oct-2026)
   Solo en páginas en estado 'demo' (pagina.js lo carga). El cliente final
   nunca lo ve: una página activa no lo carga.
   Arma la oferta con la ecuación de valor de "$100M Offers":
     resultado soñado  → "cada 100 pedidos directos = $X más para usted" (con SU ticket)
     probabilidad      → la página YA está hecha con su menú + 5.000 pedidos + garantía
     tiempo            → en 7 días recibe pedidos
     esfuerzo          → "usted solo cocina": nosotros cargamos, publicamos y anunciamos
   + valor apilado, bonos de fundador, garantía con condiciones y 5 cupos (escasez real).
   Sin precio: el precio va por escrito en la llamada de 20 min.
   Personalización opcional en config.venta:
     { idioma: "es"|"en", apps: ["DoorDash","Uber Eats"], ticket: 30, comision: 25, contacto: "María",
       nota: "De dónde salieron los precios, si no son los de su carta" }
   ============================================================ */
(function () {
  const VENTAS_WA = "593939647069";
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const usd = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: n < 100 ? 2 : 0, maximumFractionDigits: n < 100 ? 2 : 0 });

  const ES = {
    barra: "👀 Vista previa: así verían sus clientes la página de",
    barraBtn: "Para el dueño",
    pill: "💼 Para el dueño",
    kicker: "Plan Fundador DEWAN",
    titulo: "Su página de pedidos ya está hecha.",
    sub: "La armamos con su menú para que la vea antes de decidir. Pruébela como un cliente: agregue platos y abra el pedido.",
    hola: "Hola",
    calcT: "¿Cuánto se queda usted por cada pedido?",
    ticket: "Pedido promedio", comision: "Comisión de la app",
    porApp: "Por la app se le van", porPagina: "Por su página (solo la tarjeta)",
    cada100: "Cada 100 pedidos que le hagan directo:", paraUsted: "más para usted",
    calcNota: "Ejemplo con la tarjeta a 2,9 % + 30¢. No tiene que dejar las apps: sus clientes de siempre le piden directo y los nuevos llegan con los anuncios.",
    loEncontramos: "Hoy lo encontramos en",
    stackT: "Todo lo que incluye",
    stack: [
      ["Esta página, con su marca y su menú, en inglés y español", "otros cobran $249–499 al mes"],
      ["Pantalla en su cocina: cada pedido suena y se imprime", "incluido"],
      ["Envío a su manera: retiro, su repartidor o uno que se pide solo, sin porcentaje", "incluido"],
      ["12 publicaciones y 4 reels al mes en su Facebook e Instagram", "una agencia cobra $500–2.000"],
      ["Anuncios que llevan clientes nuevos a su página, manejados por nosotros", "aparte, $500 o más"],
      ["Botón «Pedir» en Google y un resumen cada semana: lo que gastó en anuncios y lo que vendió por su página", "incluido"],
    ],
    total: "Contratado por separado: más de $1.200 al mes.",
    bonosT: "Bonos para los 5 fundadores",
    bonos: [["Instalación y carga del menú", "valor $299 · gratis"], ["Volante con código QR para su mostrador y sus bolsas", "gratis"]],
    garT: "50 pedidos directos en 60 días, o el tercer mes es gratis.",
    garC: "Con 3 condiciones durante los 60 días: anuncios con al menos $10 al día (los paga usted directo a Meta), fotos nuevas de sus platos cada semana y el link de pedidos en su Google y sus redes. Cada pedido queda registrado en su pantalla: no hay nada que discutir.",
    cupos: "Solo 5 restaurantes fundadores. Los instalamos uno por uno por videollamada, y en 7 días ya recibe pedidos.",
    prueba: "Más de 5.000 pedidos con DEWAN.",
    cta: "Quiero activar mi página",
    cta2: "Prefiero que me llamen",
    precio: "El precio se lo damos por escrito en una llamada de 20 minutos. Habla directo con David, el fundador.",
    msgActivar: "Hola David, vi la página de {n} y quiero activarla",
    msgLlamar: "Hola, soy de {n}. Prefiero que me llamen. Mi número es: ",
    finT: "¿Le gusta cómo quedó?",
    finP: "Vea todo lo que incluye y cómo activarla en 7 días.",
    finBtn: "Ver qué incluye",
    cerrar: "Cerrar",
  };
  const EN = {
    barra: "👀 Preview: this is how your customers would see",
    barraBtn: "For the owner",
    pill: "💼 For the owner",
    kicker: "DEWAN Founder Plan",
    titulo: "Your ordering page is already built.",
    sub: "We built it with your menu so you can see it before you decide. Try it like a customer: add dishes and open the order.",
    hola: "Hi",
    calcT: "How much do you keep on each order?",
    ticket: "Average order", comision: "App commission",
    porApp: "The app takes", porPagina: "On your page (card fee only)",
    cada100: "Every 100 orders placed with you directly:", paraUsted: "more for you",
    calcNota: "Example with a 2.9% + 30¢ card fee. You don't have to leave the apps: your regulars order direct and ads bring new customers.",
    loEncontramos: "Today we found you on",
    stackT: "Everything included",
    stack: [
      ["This page, with your brand and menu, in English and Spanish", "others charge $249–499/mo"],
      ["Kitchen screen: every order rings and prints", "included"],
      ["Delivery your way: pickup, your driver or one dispatched automatically, no percentage", "included"],
      ["12 posts and 4 reels a month on your Facebook and Instagram", "an agency charges $500–2,000"],
      ["Ads that bring new customers to your page, managed by us", "separately, $500+"],
      ["“Order” button on Google and a weekly summary: what you spent on ads and what you sold through your page", "included"],
    ],
    total: "Bought separately: over $1,200 a month.",
    bonosT: "Bonuses for the 5 founders",
    bonos: [["Setup and menu upload", "$299 value · free"], ["QR flyer for your counter and bags", "free"]],
    garT: "50 direct orders in 60 days, or your third month is free.",
    garC: "With 3 conditions during the 60 days: ads running at $10/day or more (you pay Meta directly), fresh photos of your dishes every week, and your ordering link on Google and your social profiles. Every order is recorded on your screen: nothing to argue about.",
    cupos: "Only 5 founding restaurants. We set them up one by one over video call, and you take orders within 7 days.",
    prueba: "Over 5,000 orders with DEWAN.",
    cta: "Activate my page",
    cta2: "I'd rather get a call",
    precio: "We give you the exact price in writing on a 20-minute call. You talk directly with David, the founder.",
    msgActivar: "Hi David, I saw the page for {n} and I want to activate it",
    msgLlamar: "Hi, I'm with {n}. Please call me. My number is: ",
    finT: "Like how it looks?",
    finP: "See everything included and how to go live in 7 days.",
    finBtn: "See what's included",
    cerrar: "Close",
  };

  const CSS = `
  #od-bar{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;background:#FFF4EF;color:#7A2310;
    border-bottom:1px solid #FAD3C4;font:600 13px/1.35 'Plus Jakarta Sans',system-ui,sans-serif;padding:9px 14px;text-align:center}
  #od-bar b{color:#1C1F26}
  #od-bar button{background:#E8431A;color:#fff;border:none;border-radius:999px;padding:7px 14px;font:800 12.5px system-ui,sans-serif;cursor:pointer;white-space:nowrap}
  #od-pill{position:fixed;right:14px;bottom:88px;z-index:35;background:#E8431A;color:#fff;border:none;border-radius:999px;
    padding:11px 16px;font:800 13px system-ui,sans-serif;box-shadow:0 10px 26px rgba(232,67,26,.38);cursor:pointer}
  #od-ov{position:fixed;inset:0;background:rgba(17,20,28,.45);z-index:75}
  #od-panel{position:fixed;left:0;right:0;bottom:0;z-index:80;max-height:90vh;overflow-y:auto;background:#fff;color:#1C1F26;
    border-radius:24px 24px 0 0;box-shadow:0 -12px 40px rgba(0,0,0,.25);font-family:'Plus Jakarta Sans',system-ui,sans-serif;
    transform:translateY(105%);transition:transform .28s ease}
  #od-panel.abierto{transform:none}
  #od-panel *{box-sizing:border-box}
  .od-in{padding:20px 20px 28px;max-width:560px;margin:0 auto}
  .od-x{position:sticky;top:0;display:flex;justify-content:flex-end;margin:-6px -6px 0 0}
  .od-x button{background:#F4F5F7;border:none;border-radius:999px;width:34px;height:34px;font-size:18px;cursor:pointer;color:#5b606b}
  .od-k{display:inline-block;font-size:11.5px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:#E8431A;background:#FFF1EC;border-radius:999px;padding:5px 10px}
  .od-h{font-size:23px;font-weight:800;letter-spacing:-.4px;line-height:1.15;margin:10px 0 6px}
  .od-p{font-size:14px;line-height:1.5;color:#4b5058;margin:0}
  .od-box{margin-top:18px;border:1px solid #ECEDF0;border-radius:18px;padding:16px}
  .od-box h3{font-size:15.5px;font-weight:800;margin:0 0 12px}
  .od-in2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .od-in2 label{font-size:12px;font-weight:700;color:#5b606b;display:flex;flex-direction:column;gap:5px}
  .od-in2 input,.od-in2 select{font:700 15px system-ui,sans-serif;border:1px solid #DADCE1;border-radius:11px;padding:10px 11px;width:100%;background:#fff;color:#1C1F26}
  .od-fila{display:flex;justify-content:space-between;gap:10px;font-size:13.5px;color:#4b5058;margin-top:10px}
  .od-fila b{color:#1C1F26}
  .od-gana{margin-top:12px;background:#F0FAF3;border:1px solid #C9EBD3;border-radius:14px;padding:12px 14px;font-size:13.5px;color:#14532D}
  .od-gana strong{display:block;font-size:26px;font-weight:800;color:#15803D;letter-spacing:-.5px;margin-top:2px}
  .od-nota{font-size:12px;color:#7a7f88;line-height:1.45;margin:10px 0 0}
  .od-lista{list-style:none;margin:0;padding:0}
  .od-lista li{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-top:1px solid #F1F2F4;font-size:13.5px;line-height:1.4}
  .od-lista li:first-child{border-top:none;padding-top:0}
  .od-lista i{flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:#E8F7EE;color:#15803D;font-style:normal;font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}
  .od-lista span{flex:1}
  .od-lista em{font-style:normal;font-size:12px;font-weight:700;color:#7a7f88;text-align:right;max-width:40%}
  .od-total{margin:10px 0 0;font-size:13.5px;font-weight:800;color:#1C1F26}
  .od-bono em{color:#E8431A !important}
  .od-gar{margin-top:18px;background:#1C1F26;color:#fff;border-radius:18px;padding:16px}
  .od-gar b{display:block;font-size:16.5px;line-height:1.3;margin-bottom:6px}
  .od-gar p{font-size:12.5px;color:#C9CDD6;line-height:1.5;margin:0}
  .od-cupo{margin-top:14px;font-size:13.5px;line-height:1.45;color:#4b5058}
  .od-cupo b{color:#1C1F26}
  .od-dots{display:flex;gap:6px;margin-top:8px}
  .od-dots span{width:26px;height:8px;border-radius:999px;background:#E8431A}
  .od-cta{display:block;text-align:center;margin-top:18px;background:#E8431A;color:#fff !important;text-decoration:none;border-radius:14px;padding:15px;font-weight:800;font-size:16px;box-shadow:0 10px 24px rgba(232,67,26,.3)}
  .od-cta2{display:block;text-align:center;margin-top:10px;background:#fff;color:#1C1F26 !important;text-decoration:none;border:1.5px solid #DADCE1;border-radius:14px;padding:13px;font-weight:800;font-size:14.5px}
  .od-precio{font-size:12.5px;color:#7a7f88;text-align:center;line-height:1.45;margin:12px 0 0}
  .od-fin{margin:30px 18px 0;padding:22px;border-radius:20px;background:#FFF4EF;border:1px solid #FAD3C4;text-align:center;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
  @media (min-width:820px){.od-fin{max-width:1056px;margin:30px auto 0}}
  .od-fin h3{font-size:19px;font-weight:800;margin:0 0 6px;color:#1C1F26}
  .od-fin p{font-size:14px;color:#4b5058;margin:0 0 14px}
  .od-fin button{background:#E8431A;color:#fff;border:none;border-radius:12px;padding:13px 20px;font:800 15px system-ui,sans-serif;cursor:pointer}
  @media (min-width:1180px){
    body.od-pc{padding-right:400px !important}
    body.od-pc #od-panel{left:auto;top:0;bottom:0;right:0;width:400px;max-height:none;border-radius:0;transform:none;
      box-shadow:-10px 0 34px rgba(17,20,28,.10);border-left:1px solid #ECEDF0}
    body.od-pc #od-ov,body.od-pc #od-pill,body.od-pc .od-x,body.od-pc #od-bar button{display:none !important}
    body.od-pc #cart-fab,body.od-pc #cart{left:calc(50% - 200px) !important}
  }`;

  function montar(fila, cfg, linkActivar) {
    const V = cfg.venta || {};
    const T = V.idioma === "en" ? EN : ES;
    const nombre = cfg.nombre || "";
    const pagina = location.origin + location.pathname + "?p=" + (fila.slug || "");
    const wa = (msg) => "https://wa.me/" + VENTAS_WA + "?text=" + encodeURIComponent(msg);
    const linkSi = wa(T.msgActivar.replace("{n}", nombre) + ": " + pagina);
    const linkLlamar = wa(T.msgLlamar.replace("{n}", nombre));

    const st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    /* franja de arriba */
    const bar = document.createElement("div");
    bar.id = "od-bar";
    bar.innerHTML = `<span>${esc(T.barra)} <b>${esc(nombre)}</b></span><button type="button">${esc(T.barraBtn)} ▸</button>`;
    document.body.insertBefore(bar, document.body.firstChild);

    /* panel */
    const ov = document.createElement("div");
    ov.id = "od-ov"; ov.className = "oculto";
    const pn = document.createElement("aside");
    pn.id = "od-panel";
    pn.setAttribute("aria-label", T.kicker);
    const comisiones = [15, 20, 25, 30];
    const comDef = comisiones.includes(Number(V.comision)) ? Number(V.comision) : 25;
    pn.innerHTML = `
      <div class="od-in">
        <div class="od-x"><button type="button" aria-label="${esc(T.cerrar)}">✕</button></div>
        <span class="od-k">${esc(T.kicker)}</span>
        <h2 class="od-h">${V.contacto ? esc(T.hola + " " + V.contacto + ". ") : ""}${esc(T.titulo)}</h2>
        <p class="od-p">${esc(T.sub)}</p>
        ${V.nota ? `<p class="od-nota">${esc(V.nota)}</p>` : ""}

        <section class="od-box">
          <h3>${esc(T.calcT)}</h3>
          <div class="od-in2">
            <label>${esc(T.ticket)}<input id="od-ticket" type="number" min="5" max="300" step="1" inputmode="decimal" value="${Number(V.ticket) > 0 ? Number(V.ticket) : 30}"></label>
            <label>${esc(T.comision)}<select id="od-com">${comisiones.map((c) => `<option value="${c}"${c === comDef ? " selected" : ""}>${c} %</option>`).join("")}</select></label>
          </div>
          <div class="od-fila"><span>${esc(T.porApp)}</span><b id="od-app"></b></div>
          <div class="od-fila"><span>${esc(T.porPagina)}</span><b id="od-tarj"></b></div>
          <div class="od-gana">${esc(T.cada100)}<strong id="od-gana"></strong>${esc(T.paraUsted)}</div>
          ${Array.isArray(V.apps) && V.apps.length ? `<p class="od-nota"><b>${esc(T.loEncontramos)} ${esc(V.apps.join(", "))}.</b></p>` : ""}
          <p class="od-nota">${esc(T.calcNota)}</p>
        </section>

        <section class="od-box">
          <h3>${esc(T.stackT)}</h3>
          <ul class="od-lista">${T.stack.map(([a, b]) => `<li><i>✓</i><span>${esc(a)}</span><em>${esc(b)}</em></li>`).join("")}</ul>
          <p class="od-total">${esc(T.total)}</p>
        </section>

        <section class="od-box">
          <h3>${esc(T.bonosT)}</h3>
          <ul class="od-lista od-bono">${T.bonos.map(([a, b]) => `<li><i>+</i><span>${esc(a)}</span><em>${esc(b)}</em></li>`).join("")}</ul>
        </section>

        <div class="od-gar"><b>🛡️ ${esc(T.garT)}</b><p>${esc(T.garC)}</p></div>

        <p class="od-cupo"><b>${esc(T.cupos)}</b> ${esc(T.prueba)}</p>
        <div class="od-dots" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>

        <a class="od-cta" href="${linkSi}" target="_blank" rel="noopener">${esc(T.cta)}</a>
        <a class="od-cta2" href="${linkLlamar}" target="_blank" rel="noopener">📞 ${esc(T.cta2)}</a>
        <p class="od-precio">${esc(T.precio)}</p>
      </div>`;
    document.body.appendChild(ov);
    document.body.appendChild(pn);

    /* botón flotante (celular) */
    const pill = document.createElement("button");
    pill.id = "od-pill"; pill.type = "button"; pill.textContent = T.pill;
    document.body.appendChild(pill);

    /* llamada al final del menú */
    const app = document.getElementById("app");
    if (app) {
      const fin = document.createElement("section");
      fin.className = "od-fin";
      fin.innerHTML = `<h3>${esc(T.finT)}</h3><p>${esc(T.finP)}</p><button type="button">${esc(T.finBtn)}</button>`;
      app.appendChild(fin);
      fin.querySelector("button").addEventListener("click", () => abrir());
    }

    /* calculadora */
    const inT = pn.querySelector("#od-ticket"), inC = pn.querySelector("#od-com");
    function calcular() {
      const tk = Math.max(0, Number(inT.value) || 0), com = Number(inC.value) / 100;
      const app = tk * com, tarj = tk > 0 ? tk * 0.029 + 0.3 : 0;
      pn.querySelector("#od-app").textContent = usd(app);
      pn.querySelector("#od-tarj").textContent = usd(tarj);
      pn.querySelector("#od-gana").textContent = "+" + usd(Math.max(0, Math.round((app - tarj) * 100)));
    }
    inT.addEventListener("input", calcular);
    inC.addEventListener("change", calcular);
    calcular();

    /* abrir / cerrar */
    const pc = window.matchMedia("(min-width:1180px)");
    function abrir() {
      if (pc.matches) { pn.scrollTo({ top: 0, behavior: "smooth" }); return; }
      ov.classList.remove("oculto"); pn.classList.add("abierto");
    }
    function cerrar() { ov.classList.add("oculto"); pn.classList.remove("abierto"); }
    bar.querySelector("button").addEventListener("click", abrir);
    pill.addEventListener("click", abrir);
    ov.addEventListener("click", cerrar);
    pn.querySelector(".od-x button").addEventListener("click", cerrar);
    document.body.classList.add("od-pc");   // en PC (≥1180 px) el panel queda fijo a la derecha
    return { abrir, cerrar };
  }

  window.OFERTA_DUENO = { montar };
})();
