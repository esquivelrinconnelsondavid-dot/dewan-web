/* x-western-app — página de pedidos de Western Pizzería (Quito, 4 locales), estilo app real (copia de x-western-app, 12-nov-2026).
   Marca = naranja tostado de su logo #B5531A, oscuro #7E3A12, café #3B2416 + grises cálidos. Logo = el suyo (disco blanco).
   Fotos enteras (object-fit contain, sin recortar). Sin emojis ni letra a mano. Platos sin foto = fila de texto limpia.
   Generada con _receta-presentacion/wp_base.py. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-western-app"] = {
  label: "Western · pedidos",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  body[data-tpl="x-western-app"]{
    --bx-navy:#B5531A; --bx-navy2:#7E3A12; --bx-ink:#1B1C1A; --bx-muted:#67625C; --bx-line:#E9E6E1;
    --bx-bg:#F6F5F2; --bx-wood:#3B2416; --bx-ok:#15803D;
    background:#fff; color:var(--bx-ink); font-family:'Inter',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:110px;
  }
  html:has(body[data-tpl="x-western-app"]){background:#ECEAE6;}
  @media (min-width:560px){ body[data-tpl="x-western-app"]{box-shadow:0 0 0 1px #DCDFE7,0 24px 60px rgba(15,23,42,.12);min-height:100vh;} }
  body[data-tpl="x-western-app"] #app{overflow-x:hidden;}
  body[data-tpl="x-western-app"] svg{display:block;}

  /* ---------- portada + ficha del local ---------- */
  body[data-tpl="x-western-app"] .bx-hero{height:210px;background:#2A1A10 center/cover no-repeat;position:relative;}
  body[data-tpl="x-western-app"] .bx-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,23,42,0) 45%,rgba(15,23,42,.35));}
  body[data-tpl="x-western-app"] .bx-info{position:relative;background:#fff;border-radius:22px 22px 0 0;margin-top:-22px;padding:0 18px 16px;z-index:2;}
  body[data-tpl="x-western-app"] .bx-logo{
    display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;padding:0;border-radius:50%;background:#fff;margin-top:-42px;
    box-shadow:0 0 0 4px #fff,0 10px 24px rgba(181,83,26,.20);
  }
  body[data-tpl="x-western-app"] .bx-logo img{width:84px;height:84px;border-radius:50%;display:block;}
  body[data-tpl="x-western-app"] .bx-h1{font-size:24px;font-weight:800;letter-spacing:-.02em;margin-top:12px;line-height:1.15;}
  body[data-tpl="x-western-app"] .bx-tipo{font-size:14px;color:var(--bx-muted);margin-top:3px;}
  body[data-tpl="x-western-app"] .bx-meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin-top:10px;font-size:13.5px;color:#334155;}
  body[data-tpl="x-western-app"] .bx-meta span{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-western-app"] .bx-meta svg{width:15px;height:15px;}
  body[data-tpl="x-western-app"] .bx-star{color:#B45309;font-weight:700;}
  body[data-tpl="x-western-app"] .bx-abierto{color:#334155;font-weight:500;}
  body[data-tpl="x-western-app"] .bx-modos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px;}
  body[data-tpl="x-western-app"] .bx-modo{border:1px solid var(--bx-line);border-radius:14px;padding:10px 8px;text-align:center;font-size:12px;color:#334155;font-weight:600;line-height:1.25;}
  body[data-tpl="x-western-app"] .bx-modo svg{width:20px;height:20px;margin:0 auto 5px;color:var(--bx-navy);}

  /* ---------- destacados (fichas oficiales enteras) ---------- */
  body[data-tpl="x-western-app"] .bx-tt{font-size:18px;font-weight:800;letter-spacing:-.01em;padding:0 18px;margin-top:14px;}
  body[data-tpl="x-western-app"] .bx-dest{display:flex;gap:12px;overflow-x:auto;padding:10px 18px 16px;scrollbar-width:none;scroll-snap-type:x mandatory;}
  body[data-tpl="x-western-app"] .bx-dest::-webkit-scrollbar{display:none;}
  body[data-tpl="x-western-app"] .bx-dcard{flex:0 0 62%;scroll-snap-align:start;border:1px solid var(--bx-line);border-radius:16px;overflow:hidden;background:#fff;}
  body[data-tpl="x-western-app"] .bx-dcard img{width:100%;aspect-ratio:1/1;object-fit:contain;background:#F6F5F2;}
  body[data-tpl="x-western-app"] .bx-dpie{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;}
  body[data-tpl="x-western-app"] .bx-dpie b{font-size:15px;font-weight:700;}
  body[data-tpl="x-western-app"] .bx-dpie small{display:block;font-size:13.5px;color:var(--bx-navy2);font-weight:700;margin-top:1px;}

  /* ---------- pestañas ---------- */
  body[data-tpl="x-western-app"] .bx-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:4px;overflow-x:auto;padding:0 12px;background:#fff;
    border-bottom:1px solid var(--bx-line);scrollbar-width:none;
  }
  body[data-tpl="x-western-app"] .bx-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-western-app"] .bx-nav button{
    flex:0 0 auto;font-family:inherit;font-size:14px;font-weight:600;color:var(--bx-muted);background:none;border:none;
    padding:14px 8px 12px;border-bottom:2.5px solid transparent;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-western-app"] .bx-nav button.activa{color:var(--bx-ink);border-bottom-color:var(--bx-navy);}

  /* ---------- secciones ---------- */
  body[data-tpl="x-western-app"] .bx-sec{padding:16px 18px 4px;scroll-margin-top:52px;}
  body[data-tpl="x-western-app"] .bx-banner{width:100%;aspect-ratio:16/7;object-fit:cover;border-radius:16px;margin-bottom:14px;background:var(--bx-bg);}
  body[data-tpl="x-western-app"] .bx-sec h2{font-size:20px;font-weight:800;letter-spacing:-.01em;}
  body[data-tpl="x-western-app"] .bx-sec h2 small{display:block;font-size:13px;font-weight:500;color:var(--bx-muted);margin-top:2px;letter-spacing:0;}
  body[data-tpl="x-western-app"] .bx-row{display:flex;gap:14px;align-items:flex-start;padding:16px 0;border-bottom:1px solid var(--bx-line);}
  body[data-tpl="x-western-app"] .bx-row:last-child{border-bottom:none;}
  body[data-tpl="x-western-app"] .bx-txt{flex:1;min-width:0;}
  body[data-tpl="x-western-app"] .bx-nom{font-size:15.5px;font-weight:700;line-height:1.3;}
  body[data-tpl="x-western-app"] .bx-desc{font-size:13.5px;line-height:1.45;color:var(--bx-muted);margin-top:4px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-western-app"] .bx-pre{font-size:15px;font-weight:700;color:var(--bx-ink);margin-top:8px;}
  body[data-tpl="x-western-app"] .bx-lado{flex:0 0 auto;position:relative;display:flex;flex-direction:column;align-items:flex-end;}
  body[data-tpl="x-western-app"] .bx-thumb{width:92px;height:92px;border-radius:14px;object-fit:contain;background:#F6F5F2;}
  body[data-tpl="x-western-app"] .bx-lado.con-foto [data-qtywrap]{position:absolute;right:-6px;bottom:-8px;}
  body[data-tpl="x-western-app"] .bx-lado:not(.con-foto){padding-top:2px;}

  /* etiquetas de su carta (Keto, Vegano, Sin gluten…) y aviso de la categoría (pasteles: 48 horas) */
  body[data-tpl="x-western-app"] .bx-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px;}
  body[data-tpl="x-western-app"] .bx-tags span{font-size:11px;font-weight:700;letter-spacing:.02em;color:#7E3A12;background:#FBEFE6;border-radius:999px;padding:3px 8px;}
  body[data-tpl="x-western-app"] .bx-aviso{display:flex;gap:10px;align-items:flex-start;background:#F6F5F2;border:1px solid #F2D6C2;border-radius:14px;padding:11px 13px;margin:10px 0 2px;font-size:13.5px;line-height:1.45;color:#6B3410;}
  body[data-tpl="x-western-app"] .bx-aviso svg{width:19px;height:19px;flex:0 0 auto;color:var(--bx-navy);margin-top:1px;}

  /* tamaños */
  body[data-tpl="x-western-app"] .bx-tcab{display:flex;gap:14px;justify-content:space-between;align-items:flex-start;}
  body[data-tpl="x-western-app"] .bx-tcab .bx-thumb{flex:0 0 auto;}
  body[data-tpl="x-western-app"] .bx-tams{display:flex;gap:8px;margin-top:10px;}
  body[data-tpl="x-western-app"] .bx-tam{flex:1;display:flex;align-items:center;justify-content:space-between;gap:6px;border:1px solid var(--bx-line);border-radius:12px;padding:7px 7px 7px 11px;}
  body[data-tpl="x-western-app"] .bx-tam.has-qty{border-color:var(--bx-navy);background:#FBEFE6;}
  body[data-tpl="x-western-app"] .bx-tam-l{display:flex;flex-direction:column;line-height:1.2;}
  body[data-tpl="x-western-app"] .bx-tam-l small{font-size:12px;color:var(--bx-muted);font-weight:500;}
  body[data-tpl="x-western-app"] .bx-tam-l b{font-size:14.5px;font-weight:700;}

  /* botón agregar / contador */
  body[data-tpl="x-western-app"] [data-qtywrap]{display:inline-flex;align-items:center;border-radius:999px;background:#fff;}
  body[data-tpl="x-western-app"] .bx-tam[data-qtywrap]{display:flex;border-radius:12px;background:#fff;}
  body[data-tpl="x-western-app"] .bx-tam.has-qty[data-qtywrap]{background:#FBEFE6;}
  body[data-tpl="x-western-app"] .bx-ctl{display:inline-flex;align-items:center;border-radius:999px;}
  body[data-tpl="x-western-app"] [data-add], body[data-tpl="x-western-app"] [data-sub]{
    width:34px;height:34px;border-radius:50%;border:1.5px solid var(--bx-line);background:#fff;color:var(--bx-navy);
    display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;box-shadow:0 2px 6px rgba(15,23,42,.10);
  }
  body[data-tpl="x-western-app"] [data-add] svg, body[data-tpl="x-western-app"] [data-sub] svg{width:16px;height:16px;}
  body[data-tpl="x-western-app"] [data-sub], body[data-tpl="x-western-app"] [data-cant]{display:none;}
  body[data-tpl="x-western-app"] .has-qty .bx-ctl{background:var(--bx-navy);box-shadow:0 4px 12px rgba(181,83,26,.3);}
  body[data-tpl="x-western-app"] .has-qty [data-add], body[data-tpl="x-western-app"] .has-qty [data-sub]{display:inline-flex;background:transparent;border-color:transparent;color:#fff;box-shadow:none;}
  body[data-tpl="x-western-app"] .has-qty [data-cant]{display:inline-block;color:#fff;font-weight:700;font-size:14.5px;min-width:16px;text-align:center;}

  /* pie */
  body[data-tpl="x-western-app"] .bx-pie{margin:22px 18px 0;border:1px solid var(--bx-line);border-radius:16px;overflow:hidden;}
  body[data-tpl="x-western-app"] .bx-pie img{width:100%;aspect-ratio:16/10;object-fit:cover;object-position:50% 40%;}
  body[data-tpl="x-western-app"] .bx-pie div{padding:12px 14px;font-size:13.5px;color:#334155;line-height:1.5;}
  body[data-tpl="x-western-app"] .bx-pie b{display:block;font-size:15px;color:var(--bx-ink);}

  /* carrito (piezas compartidas) */
  body[data-tpl="x-western-app"] #cart-fab{background:var(--bx-navy) !important;color:#fff !important;border-radius:16px !important;font-family:'Inter',sans-serif !important;font-weight:700 !important;box-shadow:0 14px 30px rgba(181,83,26,.35) !important;}
  body[data-tpl="x-western-app"] #cart-fab #fab-cant{background:#fff !important;color:var(--bx-navy) !important;}
  body[data-tpl="x-western-app"] #cart-fab svg{width:20px;height:20px;flex:0 0 auto;}
  body[data-tpl="x-western-app"] #cart-fab .fab-l{white-space:nowrap;}   /* «Ver pedido» en un renglón */
  body[data-tpl="x-western-app"] #cart{background:#F6F7F9;font-family:'Inter',sans-serif;}
  body[data-tpl="x-western-app"] .cart-head{background:#F6F7F9;}
  body[data-tpl="x-western-app"] #cart h2{font-size:20px;font-weight:800;}
  body[data-tpl="x-western-app"] #cart .st-add{background:var(--bx-navy) !important;color:#fff !important;}
  body[data-tpl="x-western-app"] .ubic-btn{border-color:var(--bx-navy);font-family:inherit;}
  `,
  render(R, root, ctrl, slug) {
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
    const $$ = (n) => `$${Number(n).toFixed(2)}`;
    const SZ = /\s+(mini|mediana|mediano|gigante|grande|peque[nñ]a|peque[nñ]o|personal|familiar)$/i;
    const cats = R.menu || [];
    const I = {
      mas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
      menos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>`,
      estrella: `<svg viewBox="0 0 24 24" fill="#D97706"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z"/></svg>`,
      reloj: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
      pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
      moto: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h5l3-6h-4M14 6h3l2 5M5.5 14l2.5-4h4"/></svg>`,
      bolsa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
      tarjeta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/></svg>`,
    };
    const ctl = (id) => `<span class="bx-ctl"><button data-sub="${id}" aria-label="quitar">${I.menos}</button><b data-cant="${id}">0</b><button data-add="${id}" aria-label="agregar">${I.mas}</button></span>`;

    const fila = (it) => `
      <article class="bx-row">
        <div class="bx-txt">
          <div class="bx-nom">${it.nombre}</div>
          ${it.desc ? `<div class="bx-desc">${it.desc}</div>` : ``}
          ${(it.tags || []).length ? `<div class="bx-tags">${it.tags.map((t) => `<span>${t}</span>`).join("")}</div>` : ``}
          <div class="bx-pre">${$$(it.precio)}</div>
        </div>
        <div class="bx-lado ${it.foto ? "con-foto" : ""}">
          ${it.foto ? `<img class="bx-thumb" src="${it.foto}" alt="${it.nombre}" loading="lazy">` : ``}
          <span data-qtywrap="${it.id}">${ctl(it.id)}</span>
        </div>
      </article>`;

    const nProd = (items) => new Set(items.map((it) => norm(it.nombre.replace(SZ, "")))).size;
    const conTamanos = (items) => {
      const orden = [], g = {};
      items.forEach((it) => {
        const base = it.nombre.replace(SZ, "").trim(), k = norm(base);
        if (!g[k]) { g[k] = { base, items: [] }; orden.push(k); }
        g[k].items.push(it);
      });
      return orden.map((k) => {
        const gr = g[k];
        if (gr.items.length < 2) return fila(gr.items[0]);
        const xs = [...gr.items].sort((a, b) => a.precio - b.precio);
        const desc = (xs.find((it) => it.desc) || {}).desc || "";
        const foto = (xs.find((it) => it.foto) || {}).foto || "";
        return `
          <article class="bx-row" style="display:block">
            <div class="bx-tcab"><div class="bx-txt"><div class="bx-nom">${gr.base}</div>
            ${desc ? `<div class="bx-desc">${desc}</div>` : ``}</div>${foto ? `<img class="bx-thumb" src="${foto}" alt="${gr.base}" loading="lazy">` : ``}</div>
            <div class="bx-tams">${xs.map((it) => `
              <div class="bx-tam" data-qtywrap="${it.id}">
                <span class="bx-tam-l"><small>${(it.nombre.match(SZ) || [, ""])[1]}</small><b>${$$(it.precio)}</b></span>
                ${ctl(it.id)}
              </div>`).join("")}
            </div>
          </article>`;
      }).join("");
    };

    const todos = cats.flatMap((c) => c.items);
    const dest = (R.destacados || []).map((n) => todos.find((it) => norm(it.nombre) === norm(n))).filter((it) => it && it.foto);

    const secciones = cats.map((c) => {
      const items = c.items || [];
      const banner = (R.banners || {})[c.categoria];
      return `
      <section class="bx-sec" id="cat-${slug(c.categoria)}">
        ${banner ? `<img class="bx-banner" src="${banner}" alt="${c.categoria}" loading="lazy">` : ``}
        <h2>${c.categoria}<small>${c.nota ? c.nota + " · " : ""}${nProd(items)} ${nProd(items) === 1 ? "opción" : "opciones"}</small></h2>
        ${c.aviso ? `<div class="bx-aviso">${I.reloj}<span>${c.aviso}</span></div>` : ``}
        ${items.some((it) => SZ.test(it.nombre)) ? conTamanos(items) : items.map(fila).join("")}
      </section>`;
    }).join("");

    const cal = R.calificacion;
    root.innerHTML = `
      <div class="bx-hero" style="background-image:url('${R.portada || ""}')"></div>
      <section class="bx-info">
        <div class="bx-logo"><img src="${R.logo}" alt="${R.nombre}"></div>
        <h1 class="bx-h1">${R.nombreLargo || R.nombre}</h1>
        <div class="bx-tipo">Pizzería · ${R.slogan}</div>
        <div class="bx-meta">
          ${cal ? `<span class="bx-star">${I.estrella}${cal.nota}</span><span>${cal.opiniones} opiniones en ${cal.fuente}</span>` : ``}
          <span class="bx-abierto">${I.reloj}Horario ${R.horario}</span>
        </div>
        <div class="bx-meta"><span>${I.pin}${R.zona || R.direccion || ""}</span></div>
        <div class="bx-modos">
          <div class="bx-modo">${I.moto}A domicilio</div>
          <div class="bx-modo">${I.bolsa}Retiro en el local</div>
          <div class="bx-modo">${I.tarjeta}${R.pagos || "Efectivo o transferencia"}</div>
        </div>
      </section>
      ${dest.length ? `
      <div class="bx-tt">Destacados</div>
      <div class="bx-dest">${dest.map((it) => `
        <div class="bx-dcard">
          <img src="${it.foto}" alt="${it.nombre}">
          <div class="bx-dpie"><div><b>${it.nombre}</b><small>${$$(it.precio)}</small></div><span data-qtywrap="${it.id}">${ctl(it.id)}</span></div>
        </div>`).join("")}
      </div>` : ``}
      <nav class="bx-nav">${cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("")}</nav>
      ${secciones}
      <div class="bx-pie">
        ${R.fachada ? `<img src="${R.fachada}" alt="Local de ${R.nombre}" loading="lazy">` : ``}
        <div><b>${R.nombreLargo || R.nombre}</b>${R.zona || R.direccion || ""} · ${R.horario}</div>
      </div>`;

    // la pestaña elegida queda siempre a la vista
    root.querySelector(".bx-nav").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      const barra = b.parentElement;   /* solo la barra: scrollIntoView movía también la página (y el teléfono de la presentación) */
      setTimeout(() => barra.scrollTo({ left: b.offsetLeft - (barra.clientWidth - b.offsetWidth) / 2, behavior: "smooth" }), 30);
    });
  },
};
