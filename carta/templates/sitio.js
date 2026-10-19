/* ============================================================
   SITIO (18-oct-2026) — página de pedidos tipo "sitio del restaurante"
   Pensada para EE.UU. (y cualquier local con fotos): portada, logo,
   abierto/cerrado según su horario y zona, teléfono, dirección,
   "lo más pedido" con fotos, menú en scroll (todas las categorías),
   botón ES/EN y pie con el horario. Se ve bien en celular Y en PC.
   Campos opcionales de la config (si faltan, esa parte no sale):
     portada, logo, slogan|bajada, cocina_txt, ciudad, direccion, telefono,
     horario {lun..dom: [["11:00","22:00"], ...]}, zona ("America/New_York"),
     rating {valor, n, fuente}, instagram, facebook, promo,
     populares [ids] o item.popular, item.foto, item.nombre_en,
     item.desc_en, cat.categoria_en, bilingue (false = sin botón ES/EN)
   ============================================================ */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["sitio"] = {
  label: "Sitio del restaurante",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  body[data-tpl="sitio"]{
    max-width:none;margin:0;background:#fff;color:#1C1F26;
    font-family:'Plus Jakarta Sans',system-ui,-apple-system,"Segoe UI",sans-serif;
    -webkit-font-smoothing:antialiased;padding-bottom:110px;overflow-x:hidden;
  }
  body[data-tpl="sitio"] *{box-sizing:border-box;}
  body[data-tpl="sitio"] a{color:inherit;}
  body[data-tpl="sitio"] .st-page{max-width:1120px;margin:0 auto;}

  /* ---------- PORTADA ---------- */
  body[data-tpl="sitio"] .st-cover{
    position:relative;height:210px;background-color:var(--marca);
    background-image:radial-gradient(circle at 18% 22%,rgba(255,255,255,.18),transparent 42%),
      radial-gradient(circle at 85% 80%,rgba(0,0,0,.22),transparent 50%);
    background-size:cover;background-position:center;
  }
  body[data-tpl="sitio"] .st-cover.con-foto::after{
    content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,0) 45%);
  }
  body[data-tpl="sitio"] .st-lang{
    position:absolute;top:12px;right:12px;z-index:2;display:flex;background:rgba(255,255,255,.94);
    border-radius:999px;padding:3px;box-shadow:0 4px 14px rgba(0,0,0,.18);
  }
  body[data-tpl="sitio"] .st-lang a{
    text-decoration:none;font-size:12px;font-weight:800;color:#5b606b;padding:6px 11px;border-radius:999px;letter-spacing:.3px;
  }
  body[data-tpl="sitio"] .st-lang a.on{background:#1C1F26;color:#fff;}

  /* ---------- IDENTIDAD ---------- */
  body[data-tpl="sitio"] .st-id{position:relative;padding:0 18px;display:flex;gap:14px;align-items:flex-end;margin-top:-38px;}
  body[data-tpl="sitio"] .st-logo{
    flex:0 0 auto;width:86px;height:86px;border-radius:22px;overflow:hidden;background:#fff;
    border:4px solid #fff;box-shadow:0 8px 22px rgba(17,20,28,.18);
  }
  body[data-tpl="sitio"] .st-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="sitio"] .st-head{padding:14px 18px 0;}
  body[data-tpl="sitio"] .st-name{font-size:26px;font-weight:800;letter-spacing:-.5px;line-height:1.08;margin:0;}
  body[data-tpl="sitio"] .st-tag{margin:5px 0 0;color:#5b606b;font-size:14px;font-weight:500;line-height:1.35;}
  body[data-tpl="sitio"] .st-status{display:flex;align-items:center;gap:7px;margin:10px 0 0;font-size:13.5px;font-weight:700;}
  body[data-tpl="sitio"] .st-dot{width:9px;height:9px;border-radius:50%;background:#9aa0a8;flex:0 0 auto;}
  body[data-tpl="sitio"] .st-status.abierto .st-dot{background:#16A34A;box-shadow:0 0 0 4px rgba(22,163,74,.15);}
  body[data-tpl="sitio"] .st-status.abierto b{color:#15803D;}
  body[data-tpl="sitio"] .st-status.cerrado b{color:#B42318;}
  body[data-tpl="sitio"] .st-status span{color:#5b606b;font-weight:600;}

  body[data-tpl="sitio"] .st-facts{display:flex;flex-wrap:wrap;gap:8px;padding:14px 18px 0;}
  body[data-tpl="sitio"] .st-fact{
    display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#30343c;
    background:#F4F5F7;border:1px solid #ECEDF0;border-radius:999px;padding:7px 12px;text-decoration:none;
  }
  body[data-tpl="sitio"] a.st-fact:hover{background:#ECEDF0;}
  body[data-tpl="sitio"] .st-promo{
    margin:14px 18px 0;padding:11px 14px;border-radius:14px;font-size:13.5px;font-weight:700;
    background:color-mix(in srgb,var(--marca) 9%,#fff);color:color-mix(in srgb,var(--marca) 80%,#000);
    border:1px solid color-mix(in srgb,var(--marca) 22%,#fff);
  }

  /* ---------- LO MÁS PEDIDO ---------- */
  body[data-tpl="sitio"] .st-pop{padding:22px 0 4px;}
  body[data-tpl="sitio"] .st-h2{font-size:19px;font-weight:800;letter-spacing:-.3px;margin:0 18px 12px;}
  body[data-tpl="sitio"] .st-pop-row{display:flex;gap:12px;overflow-x:auto;padding:0 18px 8px;scroll-snap-type:x mandatory;scroll-padding:0 18px;scrollbar-width:none;}
  body[data-tpl="sitio"] .st-pop-row::-webkit-scrollbar{display:none;}
  body[data-tpl="sitio"] .st-pop-card{flex:0 0 172px;scroll-snap-align:start;position:relative;}
  body[data-tpl="sitio"] .st-pop-img{position:relative;width:100%;aspect-ratio:1/1;border-radius:16px;overflow:hidden;background:#F4F5F7;}
  body[data-tpl="sitio"] .st-pop-img img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="sitio"] .st-pop-name{font-size:14px;font-weight:700;margin:8px 2px 2px;line-height:1.25;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="sitio"] .st-pop-price{font-size:14px;font-weight:800;margin:0 2px;color:#30343c;}

  /* ---------- BARRA DE CATEGORÍAS ---------- */
  body[data-tpl="sitio"] .st-bar{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);
    backdrop-filter:saturate(1.4) blur(6px);border-bottom:1px solid #EEEFF2;margin-top:14px;}
  body[data-tpl="sitio"] .st-chips{display:flex;gap:8px;overflow-x:auto;padding:11px 18px;scrollbar-width:none;}
  body[data-tpl="sitio"] .st-chips::-webkit-scrollbar{display:none;}
  body[data-tpl="sitio"] .st-chips button{
    flex:0 0 auto;font-family:inherit;font-weight:700;font-size:13.5px;color:#5b606b;background:#fff;
    border:1px solid #E4E6EA;padding:8px 15px;border-radius:999px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="sitio"] .st-chips button.activa,
  body[data-tpl="sitio"] .st-chips button.active{background:#1C1F26;color:#fff;border-color:#1C1F26;}

  body[data-tpl="sitio"] .st-search{display:flex;align-items:center;gap:9px;margin:16px 18px 0;background:#F4F5F7;
    border:1px solid #ECEDF0;border-radius:14px;padding:11px 14px;}
  body[data-tpl="sitio"] .st-search input{border:none;outline:none;width:100%;font-family:inherit;font-size:15px;background:transparent;color:#1C1F26;}

  /* ---------- MENÚ ---------- */
  body[data-tpl="sitio"] .st-menu{padding:0 18px;}
  body[data-tpl="sitio"] .st-sec{padding-top:22px;scroll-margin-top:64px;}
  body[data-tpl="sitio"] .st-sec-tt{font-size:20px;font-weight:800;letter-spacing:-.3px;margin:0 0 12px;}
  body[data-tpl="sitio"] .st-grid{display:grid;grid-template-columns:1fr;gap:12px;}
  body[data-tpl="sitio"] .st-card{
    position:relative;display:flex;gap:14px;align-items:stretch;background:#fff;border:1px solid #ECEDF0;
    border-radius:18px;padding:14px;min-height:122px;
  }
  body[data-tpl="sitio"] .st-txt{flex:1;min-width:0;display:flex;flex-direction:column;padding-right:4px;}
  body[data-tpl="sitio"] .st-pname{font-size:15.5px;font-weight:700;margin:0 0 4px;line-height:1.25;}
  body[data-tpl="sitio"] .st-pdesc{font-size:13px;line-height:1.4;color:#6b7079;margin:0 0 8px;font-weight:500;
    display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="sitio"] .st-price{margin-top:auto;font-size:15.5px;font-weight:800;}
  body[data-tpl="sitio"] .st-media{position:relative;flex:0 0 auto;width:112px;height:112px;border-radius:14px;overflow:hidden;background:#F4F5F7;}
  body[data-tpl="sitio"] .st-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="sitio"] .st-card.sin-foto{padding-right:64px;}

  /* ---------- BOTÓN + / STEPPER ---------- */
  body[data-tpl="sitio"] .st-ctrl{position:absolute;right:10px;bottom:10px;display:flex;align-items:center;gap:2px;
    background:#fff;border-radius:999px;box-shadow:0 4px 14px rgba(17,20,28,.16);padding:3px;z-index:2;}
  body[data-tpl="sitio"] .st-ctrl .st-btn{width:34px;height:34px;border-radius:50%;font-size:20px;background:#fff;color:#1C1F26;}
  body[data-tpl="sitio"] .st-ctrl .st-add{background:var(--marca);color:#fff;}
  body[data-tpl="sitio"] .st-ctrl .st-min{background:#F4F5F7;}
  body[data-tpl="sitio"] .st-ctrl .st-q{font-size:15px;min-width:22px;}
  body[data-tpl="sitio"] .st-pop-card .st-ctrl{right:8px;bottom:8px;top:auto;}

  body[data-tpl="sitio"] .st-none{display:none;text-align:center;color:#9aa0a8;font-weight:600;padding:40px 16px;}
  body[data-tpl="sitio"] .st-hide{display:none !important;}

  /* ---------- PIE: HORARIO Y DATOS ---------- */
  body[data-tpl="sitio"] .st-info{margin:34px 18px 0;padding:22px 20px;border-radius:20px;background:#F7F8FA;border:1px solid #ECEDF0;
    display:grid;grid-template-columns:1fr;gap:22px;}
  body[data-tpl="sitio"] .st-info h3{font-size:15px;font-weight:800;margin:0 0 10px;}
  body[data-tpl="sitio"] .st-horario{width:100%;border-collapse:collapse;font-size:13.5px;}
  body[data-tpl="sitio"] .st-horario td{padding:5px 0;color:#4b5058;}
  body[data-tpl="sitio"] .st-horario td:last-child{text-align:right;font-weight:600;}
  body[data-tpl="sitio"] .st-horario tr.hoy td{color:#1C1F26;font-weight:800;}
  body[data-tpl="sitio"] .st-dato{font-size:14px;line-height:1.5;color:#30343c;margin:0 0 6px;}
  body[data-tpl="sitio"] .st-dato a{font-weight:700;}
  body[data-tpl="sitio"] .st-firma{text-align:center;color:#9aa0a8;font-size:12px;padding:22px 0 6px;}

  /* ---------- CARRITO (mismo motor, otra piel) ---------- */
  body[data-tpl="sitio"] #cart-fab{background:#1C1F26 !important;color:#fff !important;border-radius:16px !important;}
  body[data-tpl="sitio"] #cart-fab #fab-cant{background:var(--marca) !important;color:#fff !important;}
  body[data-tpl="sitio"] #cart .cart-row .st-add{background:var(--marca) !important;color:#fff !important;}
  body[data-tpl="sitio"] #enviar{background:var(--marca) !important;color:#fff !important;}

  /* ---------- PC ---------- */
  @media (min-width:820px){
    body[data-tpl="sitio"] .st-cover{height:300px;border-radius:0 0 26px 26px;}
    body[data-tpl="sitio"] .st-id,body[data-tpl="sitio"] .st-head,body[data-tpl="sitio"] .st-facts{padding-left:32px;padding-right:32px;}
    body[data-tpl="sitio"] .st-logo{width:112px;height:112px;border-radius:26px;}
    body[data-tpl="sitio"] .st-id{margin-top:-52px;}
    body[data-tpl="sitio"] .st-name{font-size:34px;}
    body[data-tpl="sitio"] .st-promo,body[data-tpl="sitio"] .st-search,body[data-tpl="sitio"] .st-info{margin-left:32px;margin-right:32px;}
    body[data-tpl="sitio"] .st-h2{margin-left:32px;margin-right:32px;}
    body[data-tpl="sitio"] .st-pop-row{padding:0 32px 8px;scroll-padding:0 32px;}
    body[data-tpl="sitio"] .st-pop-card{flex-basis:210px;}
    body[data-tpl="sitio"] .st-chips{padding:12px 32px;}
    body[data-tpl="sitio"] .st-menu{padding:0 32px;}
    body[data-tpl="sitio"] .st-grid{grid-template-columns:1fr 1fr;gap:14px;}
    body[data-tpl="sitio"] .st-info{grid-template-columns:1fr 1fr;}
  }
  `,
  render(R, root, ctrl, slug) {
    const TX = window.TEXTOS || {};
    const t = (k, d) => (TX[k] != null ? TX[k] : d);
    const P = window.PAGINA || {};
    const EN = (P.idioma || document.documentElement.lang) === "en";
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const nom = (it) => (EN && it.nombre_en) || it.nombre;
    const des = (it) => (EN && it.desc_en) || it.desc || "";
    const cat = (c) => (EN && c.categoria_en) || c.categoria;
    const precio = (n) => "$" + Number(n).toFixed(2);
    const ctl = (id) => `<span class="st-ctrl">${ctrl(id)}</span>`;

    /* ---- abierto / cerrado en la hora DEL LOCAL ---- */
    const DIAS = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    const NOMBRES = EN ? ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                       : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const aMin = (hhmm) => { const [h, m] = String(hhmm).split(":").map(Number); return h * 60 + (m || 0); };
    const hora = (hhmm) => {
      const m = aMin(hhmm), h = Math.floor(m / 60) % 24, mi = m % 60;
      const d = new Date(2026, 0, 1, h, mi);
      return d.toLocaleTimeString(EN ? "en-US" : "es-US", { hour: "numeric", minute: mi ? "2-digit" : undefined, hour12: true });
    };
    function ahoraLocal() {
      try {
        const f = new Intl.DateTimeFormat("en-US", { timeZone: R.zona || undefined, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false });
        const p = Object.fromEntries(f.formatToParts(new Date()).map((x) => [x.type, x.value]));
        const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
        return { dia: wd, min: (Number(p.hour) % 24) * 60 + Number(p.minute) };
      } catch (e) { const d = new Date(); return { dia: d.getDay(), min: d.getHours() * 60 + d.getMinutes() }; }
    }
    function estado() {
      const H = R.horario;
      if (!H) return null;
      const now = ahoraLocal();
      const rangos = (d) => (H[DIAS[(d + 7) % 7]] || []);
      for (const [a, b] of rangos(now.dia)) {          // hoy
        const ia = aMin(a), ib = aMin(b) <= ia ? aMin(b) + 1440 : aMin(b);
        if (now.min >= ia && now.min < ib) return { abierto: true, hasta: b };
      }
      for (const [a, b] of rangos(now.dia - 1)) {      // ayer, si pasa de medianoche
        const ia = aMin(a), ib = aMin(b);
        if (ib <= ia && now.min < ib) return { abierto: true, hasta: b };
      }
      for (const [a] of rangos(now.dia)) if (aMin(a) > now.min) return { abierto: false, abre: a, hoy: true };
      for (let k = 1; k <= 7; k++) {
        const r = rangos(now.dia + k);
        if (r.length) return { abierto: false, abre: r[0][0], dia: (now.dia + k) % 7, manana: k === 1 };
      }
      return { abierto: false };
    }
    const est = estado();
    let estadoHtml = "";
    if (est) {
      const detalle = est.abierto
        ? t("cierraA", "cierra a las") + " " + hora(est.hasta)
        : est.abre
          ? (est.hoy ? t("abreHoy", "abre hoy a las") : est.manana ? t("abreManana", "abre mañana a las") : t("abreEl", "abre el") + " " + NOMBRES[est.dia] + " " + t("aLas", "a las")) + " " + hora(est.abre)
          : "";
      estadoHtml = `<p class="st-status ${est.abierto ? "abierto" : "cerrado"}"><i class="st-dot"></i><b>${est.abierto ? t("abierto", "Abierto") : t("cerrado", "Cerrado")}</b>${detalle ? `<span>· ${esc(detalle)}</span>` : ""}</p>`;
    }

    /* ---- botón ES / EN ---- */
    let langHtml = "";
    if (R.bilingue !== false) {
      const link = (l) => { const q = new URLSearchParams(location.search); q.set("lang", l); return "?" + q.toString(); };
      langHtml = `<nav class="st-lang" aria-label="Language"><a href="${link("es")}" class="${EN ? "" : "on"}">ES</a><a href="${link("en")}" class="${EN ? "on" : ""}">EN</a></nav>`;
    }

    /* ---- datos del local ---- */
    const mapa = R.direccion ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(R.nombre + " " + R.direccion) : "";
    const telLimpio = R.telefono ? String(R.telefono).replace(/[^\d+]/g, "") : "";
    const facts = [];
    if (R.checkout ? R.checkout.envio !== false : true) facts.push(`<span class="st-fact">🛵 ${esc(t("factEnvio", "A domicilio"))}</span>`);
    facts.push(`<span class="st-fact">🏪 ${esc(t("factRetiro", "Para retirar"))}</span>`);
    if (R.rating && R.rating.valor) facts.push(`<span class="st-fact">⭐ ${esc(R.rating.valor)}${R.rating.n ? ` (${esc(R.rating.n)})` : ""}${R.rating.fuente ? ` · ${esc(R.rating.fuente)}` : ""}</span>`);
    if (mapa) facts.push(`<a class="st-fact" href="${mapa}" target="_blank" rel="noopener">📍 ${esc(R.ciudad || R.direccion)}</a>`);
    if (telLimpio) facts.push(`<a class="st-fact" href="tel:${telLimpio}">📞 ${esc(R.telefono)}</a>`);

    /* ---- lo más pedido (solo con foto) ---- */
    const todos = (R.menu || []).flatMap((c) => (c.items || []).map((it) => ({ it, c })));
    let pops = [];
    if (Array.isArray(R.populares) && R.populares.length) pops = R.populares.map((id) => todos.find((x) => x.it.id === id)).filter(Boolean);
    if (!pops.length) pops = todos.filter((x) => x.it.popular);
    if (!pops.length) pops = todos.filter((x) => x.it.foto).slice(0, 6);
    pops = pops.filter((x) => x.it.foto).slice(0, 8);
    const popHtml = pops.length >= 3 ? `
      <section class="st-pop">
        <h2 class="st-h2">${esc(t("loMasPedido", "🔥 Lo más pedido"))}</h2>
        <div class="st-pop-row">${pops.map(({ it }) => `
          <article class="st-pop-card">
            <div class="st-pop-img"><img src="${esc(it.foto)}" alt="${esc(nom(it))}" loading="lazy">${ctl(it.id)}</div>
            <p class="st-pop-name">${esc(nom(it))}</p>
            <p class="st-pop-price">${precio(it.precio)}</p>
          </article>`).join("")}
        </div>
      </section>` : "";

    /* ---- menú completo ---- */
    const menuHtml = (R.menu || []).map((c) => {
      const cid = slug(c.categoria);
      const items = (c.items || []).map((it) => `
        <article class="st-card${it.foto ? "" : " sin-foto"}" data-n="${esc(norm(it.nombre + " " + (it.nombre_en || "") + " " + (it.desc || "") + " " + (it.desc_en || "")))}">
          <div class="st-txt">
            <h3 class="st-pname">${esc(nom(it))}</h3>
            ${des(it) ? `<p class="st-pdesc">${esc(des(it))}</p>` : ""}
            <span class="st-price">${precio(it.precio)}</span>
          </div>
          ${it.foto ? `<div class="st-media" data-media><img src="${esc(it.foto)}" alt="${esc(nom(it))}" loading="lazy"></div>` : `<div data-media hidden></div>`}
          ${ctl(it.id)}
        </article>`).join("");
      return `<section class="st-sec" id="cat-${cid}"><h2 class="st-sec-tt">${esc(cat(c))}</h2><div class="st-grid">${items}</div></section>`;
    }).join("");
    const chipsHtml = (R.menu || []).map((c, i) =>
      `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${esc(cat(c))}</button>`).join("");

    /* ---- pie: horario y datos ---- */
    let horarioHtml = "";
    if (R.horario) {
      const hoy = ahoraLocal().dia;
      const orden = [1, 2, 3, 4, 5, 6, 0];
      horarioHtml = `<div><h3>${esc(t("horario", "Horario"))}</h3><table class="st-horario">${orden.map((d) => {
        const r = R.horario[DIAS[d]] || [];
        const txt = r.length ? r.map(([a, b]) => hora(a) + " – " + hora(b)).join(", ") : t("cerradoDia", "Cerrado");
        return `<tr class="${d === hoy ? "hoy" : ""}"><td>${NOMBRES[d]}</td><td>${esc(txt)}</td></tr>`;
      }).join("")}</table></div>`;
    }
    const datos = [];
    if (R.direccion) datos.push(`<p class="st-dato">📍 ${esc(R.direccion)}<br><a href="${mapa}" target="_blank" rel="noopener">${esc(t("comoLlegar", "Cómo llegar"))} →</a></p>`);
    if (telLimpio) datos.push(`<p class="st-dato">📞 <a href="tel:${telLimpio}">${esc(R.telefono)}</a></p>`);
    if (R.instagram) datos.push(`<p class="st-dato">📸 <a href="https://instagram.com/${esc(String(R.instagram).replace(/^@/, ""))}" target="_blank" rel="noopener">@${esc(String(R.instagram).replace(/^@/, ""))}</a></p>`);
    if (R.facebook) datos.push(`<p class="st-dato">👍 <a href="${esc(R.facebook)}" target="_blank" rel="noopener">Facebook</a></p>`);
    const infoHtml = (horarioHtml || datos.length)
      ? `<section class="st-info">${horarioHtml}<div><h3>${esc(R.nombre)}</h3>${datos.join("")}</div></section>` : "";

    const portada = R.portada ? ` con-foto" style="background-image:url('${esc(R.portada)}')` : "";
    root.innerHTML = `
      <div class="st-page">
        <header>
          <div class="st-cover${portada}">${langHtml}</div>
          <div class="st-id"><div class="st-logo">${R.logo ? `<img src="${esc(R.logo)}" alt="${esc(R.nombre)}">` : ""}</div></div>
          <div class="st-head">
            <h1 class="st-name">${esc(R.nombre)}</h1>
            ${(R.slogan || R.bajada) ? `<p class="st-tag">${esc((EN && R.slogan_en) || R.slogan || R.bajada)}</p>` : ""}
            ${estadoHtml}
          </div>
          <div class="st-facts">${facts.join("")}</div>
          ${R.promo ? `<div class="st-promo">${esc((EN && R.promo_en) || R.promo)}</div>` : ""}
        </header>
        ${popHtml}
        <div class="st-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a8" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
          <input id="st-search" type="search" placeholder="${esc(t("buscarEn", "Buscar en") + " " + R.nombre)}…" />
        </div>
        <div class="st-bar"><nav class="st-chips">${chipsHtml}</nav></div>
        <div class="st-menu">
          ${menuHtml}
          <p class="st-none" id="st-none">${esc(t("sinResultados", "Sin resultados 🔍"))}</p>
        </div>
        ${infoHtml}
        <p class="st-firma">${esc(t("firma", "Pedidos en línea con DEWAN"))}</p>
      </div>`;

    /* ---- buscador ---- */
    const inp = root.querySelector("#st-search");
    const none = root.querySelector("#st-none");
    inp.addEventListener("input", () => {
      const q = norm(inp.value.trim());
      let total = 0;
      root.querySelectorAll(".st-sec").forEach((sec) => {
        let alguno = false;
        sec.querySelectorAll(".st-card").forEach((c) => {
          const ok = !q || c.dataset.n.includes(q);
          c.classList.toggle("st-hide", !ok);
          if (ok) { alguno = true; total++; }
        });
        sec.classList.toggle("st-hide", !alguno);
      });
      none.style.display = q && !total ? "block" : "none";
    });

    /* ---- la pestaña activa sigue al scroll ---- */
    const nav = root.querySelector(".st-chips");
    const chips = [...nav.querySelectorAll("button")];
    const secs = [...root.querySelectorAll(".st-sec")];
    if ("IntersectionObserver" in window && secs.length > 1) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id.replace(/^cat-/, "");
          chips.forEach((b) => {
            const on = b.dataset.cat === id;
            b.classList.toggle("activa", on);
            if (on) nav.scrollTo({ left: b.offsetLeft - nav.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
          });
        });
      }, { rootMargin: "-70px 0px -70% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  },
};
