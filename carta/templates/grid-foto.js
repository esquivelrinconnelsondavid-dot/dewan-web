window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["grid-foto"] = {
  label: "Vitrina",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Manrope:wght@500;600;700&family=Alfa+Slab+One&family=Archivo+Black&family=Baloo+2:wght@700;800&family=Fraunces:opsz,wght@9..144,700&family=Bitter:wght@700&family=Quicksand:wght@700&display=swap');

  body[data-tpl="grid-foto"]{
    --vt-display:'Plus Jakarta Sans'; --vt-radio:16px; --vt-chip:999px; --vt-up:none; --vt-ls:0em;
    margin:0;background:color-mix(in srgb,var(--crema) 92%,#777);color:var(--tinta);
    font-family:'Manrope',system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding-bottom:120px;overflow-x:hidden;
  }
  body[data-tpl="grid-foto"] *{box-sizing:border-box;}

  /* ===== PACKS DE COCINA: la Vitrina cambia de carácter según el local ===== */
  body[data-tpl="grid-foto"][data-cocina="parrilla"]{--vt-display:'Alfa Slab One';--vt-radio:9px;--vt-chip:8px;--vt-up:uppercase;--vt-ls:.02em;}
  body[data-tpl="grid-foto"][data-cocina="burger"]{--vt-display:'Archivo Black';--vt-radio:12px;--vt-chip:10px;}
  body[data-tpl="grid-foto"][data-cocina="ceviche"]{--vt-display:'Baloo 2';--vt-radio:20px;}
  body[data-tpl="grid-foto"][data-cocina="pizza"]{--vt-display:'Fraunces';--vt-radio:13px;}
  body[data-tpl="grid-foto"][data-cocina="cafe"]{--vt-display:'Bitter';--vt-radio:11px;--vt-chip:7px;}
  body[data-tpl="grid-foto"][data-cocina="helados"]{--vt-display:'Baloo 2';--vt-radio:26px;}
  body[data-tpl="grid-foto"][data-cocina="postres"]{--vt-display:'Quicksand';--vt-radio:24px;}

  /* ---------- TOOLBAR (logo cuadrado IZQUIERDA) ---------- */
  body[data-tpl="grid-foto"] .vt-bar{
    position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:11px;
    padding:9px 14px;background:color-mix(in srgb,var(--crema) 82%,transparent);backdrop-filter:blur(12px);
    border-bottom:1px solid color-mix(in srgb,var(--tinta) 10%,transparent);
  }
  body[data-tpl="grid-foto"] .vt-logo{width:44px;height:44px;flex:0 0 auto;border-radius:13px;overflow:hidden;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.12);}
  body[data-tpl="grid-foto"] .vt-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="grid-foto"] .vt-id{flex:1;min-width:0;}
  body[data-tpl="grid-foto"] .vt-name{font-family:var(--vt-display),'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-transform:var(--vt-up);letter-spacing:var(--vt-ls);}
  body[data-tpl="grid-foto"] .vt-sub{font-size:11.5px;color:color-mix(in srgb,var(--tinta) 55%,transparent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px;}
  body[data-tpl="grid-foto"] .vt-wa{flex:0 0 auto;font-family:'Manrope';font-weight:700;font-size:12px;color:#fff;background:#25D366;border-radius:999px;padding:7px 11px;}

  body[data-tpl="grid-foto"] .vt-promo{background:var(--acento);color:#fff;text-align:center;font-weight:700;font-size:12.5px;padding:7px 12px;}

  /* ---------- CHIPS sticky ---------- */
  body[data-tpl="grid-foto"] .vt-chips{position:sticky;top:62px;z-index:25;display:flex;gap:8px;overflow-x:auto;padding:11px 14px;background:color-mix(in srgb,var(--crema) 90%,transparent);backdrop-filter:blur(8px);scrollbar-width:none;}
  body[data-tpl="grid-foto"] .vt-chips::-webkit-scrollbar{display:none;}
  body[data-tpl="grid-foto"] .vt-chips button{flex:0 0 auto;font-family:'Manrope';font-weight:600;font-size:13px;color:color-mix(in srgb,var(--tinta) 70%,transparent);background:#fff;border:1px solid color-mix(in srgb,var(--tinta) 10%,transparent);padding:8px 14px;border-radius:var(--vt-chip);cursor:pointer;white-space:nowrap;transition:all .15s;}
  body[data-tpl="grid-foto"] .vt-chips button.activa{background:var(--marca);color:#fff;border-color:var(--marca);box-shadow:0 4px 14px color-mix(in srgb,var(--marca) 35%,transparent);}

  /* ---------- SECCIÓN + GRID 2 COL ---------- */
  body[data-tpl="grid-foto"] .vt-sec{padding-top:14px;scroll-margin-top:108px;}
  body[data-tpl="grid-foto"] .vt-label{font-weight:700;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:color-mix(in srgb,var(--tinta) 60%,transparent);padding:0 16px;margin-bottom:10px;}
  body[data-tpl="grid-foto"] .vt-label b{color:var(--marca);font-weight:700;}
  body[data-tpl="grid-foto"] .vt-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 14px;}

  /* ---------- TILE vertical (foto/emoji ARRIBA) ---------- */
  body[data-tpl="grid-foto"] .vt-tile{background:#fff;border-radius:var(--vt-radio);overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);display:flex;flex-direction:column;}
  body[data-tpl="grid-foto"] .vt-media{position:relative;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, color-mix(in srgb,var(--marca) 15%,var(--crema)), var(--crema));}
  body[data-tpl="grid-foto"] .vt-tile:nth-child(even) .vt-media{background:linear-gradient(315deg, color-mix(in srgb,var(--marca) 15%,var(--crema)), var(--crema));}
  body[data-tpl="grid-foto"] .vt-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="grid-foto"] .vt-emoji{font-size:54px;line-height:1;filter:drop-shadow(0 4px 8px rgba(0,0,0,.12));}
  body[data-tpl="grid-foto"] .vt-fab{position:absolute;right:8px;bottom:8px;display:inline-flex;align-items:center;}
  body[data-tpl="grid-foto"] .vt-body{padding:10px 11px 12px;display:flex;flex-direction:column;gap:3px;}
  body[data-tpl="grid-foto"] .vt-pname{font-family:'Manrope';font-weight:700;font-size:13.5px;line-height:1.2;color:var(--tinta);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:32px;}
  body[data-tpl="grid-foto"] .vt-pdesc{font-size:11px;color:color-mix(in srgb,var(--tinta) 50%,transparent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  body[data-tpl="grid-foto"] .vt-price{font-family:var(--vt-display),'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;color:var(--marca);margin-top:3px;}
  body[data-tpl="grid-foto"] .vt-price small{font-size:11px;}

  /* ---------- STEPPER (FAB sobre la media) ---------- */
  body[data-tpl="grid-foto"] .vt-fab [data-add]{width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:var(--acento);color:#fff;font-size:21px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.25);transition:transform .16s cubic-bezier(.34,1.56,.64,1);}
  body[data-tpl="grid-foto"] .vt-fab [data-add]:active{transform:scale(.85);}
  body[data-tpl="grid-foto"] .vt-fab [data-sub]{width:28px;height:28px;border-radius:50%;border:none;background:#fff;color:var(--tinta);font-size:18px;font-weight:700;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.2);}
  body[data-tpl="grid-foto"] .vt-fab [data-cant]{display:none;min-width:18px;text-align:center;font-family:'Plus Jakarta Sans';font-size:14px;font-weight:800;color:var(--tinta);}
  body[data-tpl="grid-foto"] .vt-fab [data-qtywrap]{display:inline-flex;align-items:center;gap:3px;}
  body[data-tpl="grid-foto"] .vt-fab [data-qtywrap].has-qty{background:#fff;border-radius:999px;padding:3px;box-shadow:0 2px 8px rgba(0,0,0,.2);}
  body[data-tpl="grid-foto"] .vt-fab [data-qtywrap].has-qty + [data-add]{margin-left:3px;}
  body[data-tpl="grid-foto"] .vt-fab [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="grid-foto"] .vt-fab [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="grid-foto"] .vt-end{text-align:center;padding:30px 14px 8px;color:color-mix(in srgb,var(--tinta) 45%,transparent);font-size:12px;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="grid-foto"] #cart-fab{background:var(--acento) !important;color:#fff !important;border-radius:16px !important;font-family:'Plus Jakarta Sans' !important;font-weight:800 !important;}
  body[data-tpl="grid-foto"] #cart-fab #fab-cant{background:#fff !important;color:var(--acento) !important;}
  body[data-tpl="grid-foto"] #cart{border-radius:22px 22px 0 0 !important;}
  body[data-tpl="grid-foto"] #cart h2{font-family:'Plus Jakarta Sans';}
  body[data-tpl="grid-foto"] #cart .cart-row-sub{color:var(--marca) !important;font-family:'Plus Jakarta Sans';font-weight:800;}
  body[data-tpl="grid-foto"] #cart .cart-total strong{color:var(--marca) !important;font-family:'Plus Jakarta Sans';}
  body[data-tpl="grid-foto"] #cart .cart-row .st-add{background:var(--acento) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    document.body.dataset.cocina = R.cocina || "";
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const tiles = (cat.items || []).map((it) => {
        const media = it.foto ? `<img src="${it.foto}" alt="${it.nombre}">` : `<span class="vt-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="vt-tile">
            <div class="vt-media" data-media>
              ${media}
              <div class="vt-fab">${ctrl(it.id)}</div>
            </div>
            <div class="vt-body">
              <h3 class="vt-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="vt-pdesc">${it.desc}</p>` : ``}
              <span class="vt-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
            </div>
          </article>`;
      }).join("");
      const n = (cat.items || []).length;
      return `<section class="vt-sec" id="cat-${cid}"><div class="vt-label">${cat.categoria} <b>· ${n}</b></div><div class="vt-grid">${tiles}</div></section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "activa" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <header class="vt-bar">
        <div class="vt-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
        <div class="vt-id"><div class="vt-name">${R.nombre}</div><div class="vt-sub">${R.slogan || R.direccion || ""}</div></div>
        <span class="vt-wa">WhatsApp</span>
      </header>
      ${R.promo ? `<div class="vt-promo">${R.promo}</div>` : ``}
      <nav class="vt-chips">${navHtml}</nav>
      ${menuHtml}
      <div class="vt-end">— ${R.nombre} —</div>`;

    // scroll-spy: marca el chip de la categoría visible
    const chips = [...root.querySelectorAll(".vt-chips button")];
    const secs = [...root.querySelectorAll(".vt-sec")];
    if (window.IntersectionObserver && secs.length) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id.replace("cat-", "");
            chips.forEach((c) => c.classList.toggle("activa", c.dataset.cat === id));
          }
        });
      }, { rootMargin: "-120px 0px -65% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  },
};
