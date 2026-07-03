window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["poster"] = {
  label: "Pregón",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@500;700&family=Archivo+Black&family=Bungee&family=Alfa+Slab+One&family=Bevan&family=Titan+One&family=Chewy&display=swap');

  body[data-tpl="poster"]{--pg-display:'Anton';--pg-radio:0px;margin:0;background:var(--crema);color:var(--tinta);font-family:'Space Grotesk',system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding-bottom:122px;overflow-x:hidden;}
  body[data-tpl="poster"] *{box-sizing:border-box;}

  /* ===== PACKS DE COCINA: el Pregón grita distinto según el local ===== */
  body[data-tpl="poster"][data-cocina="burger"]{--pg-display:'Archivo Black';}
  body[data-tpl="poster"][data-cocina="ceviche"]{--pg-display:'Bungee';--pg-radio:12px;}
  body[data-tpl="poster"][data-cocina="pizza"]{--pg-display:'Alfa Slab One';}
  body[data-tpl="poster"][data-cocina="cafe"]{--pg-display:'Bevan';}
  body[data-tpl="poster"][data-cocina="helados"]{--pg-display:'Titan One';--pg-radio:16px;}
  body[data-tpl="poster"][data-cocina="postres"]{--pg-display:'Chewy';--pg-radio:16px;}
  body[data-tpl="poster"] .pg-wrap{max-width:520px;margin:0 auto;padding:0 14px;}

  /* ---------- BANDA WORDMARK ---------- */
  body[data-tpl="poster"] .pg-band{position:relative;background:var(--marca);padding:22px 16px 18px;border-bottom:4px solid var(--tinta);overflow:hidden;}
  body[data-tpl="poster"] .pg-name{font-family:var(--pg-display),'Anton';color:var(--crema);font-size:clamp(54px,17vw,96px);line-height:.82;letter-spacing:.5px;text-transform:uppercase;margin:0;}
  body[data-tpl="poster"] .pg-slo{font-family:'Space Grotesk';font-weight:700;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--crema);opacity:.92;margin:12px 0 0;}
  body[data-tpl="poster"] .pg-seal{position:absolute;right:12px;bottom:12px;width:50px;height:50px;border:3px solid var(--tinta);overflow:hidden;transform:rotate(-5deg);background:#fff;box-shadow:3px 3px 0 var(--tinta);}
  body[data-tpl="poster"] .pg-seal img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="poster"] .pg-promo{position:absolute;right:10px;top:10px;background:var(--acento);color:var(--tinta);font-weight:700;font-size:11px;letter-spacing:.04em;padding:6px 11px;transform:rotate(-4deg);box-shadow:3px 3px 0 var(--tinta);border:2px solid var(--tinta);}

  /* ---------- NAV marquesina ---------- */
  body[data-tpl="poster"] .pg-nav{position:sticky;top:0;z-index:25;display:flex;gap:0;overflow-x:auto;background:var(--tinta);border-bottom:4px solid var(--tinta);scrollbar-width:none;}
  body[data-tpl="poster"] .pg-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="poster"] .pg-nav button{flex:0 0 auto;font-family:var(--pg-display),'Anton';font-size:15px;letter-spacing:1px;text-transform:uppercase;color:var(--crema);background:none;border:none;padding:11px 15px;cursor:pointer;white-space:nowrap;}
  body[data-tpl="poster"] .pg-nav button.activa{background:var(--acento);color:var(--tinta);}

  /* ---------- CABECERA DE SECCIÓN ---------- */
  body[data-tpl="poster"] .pg-sec{padding-top:14px;scroll-margin-top:46px;}
  body[data-tpl="poster"] .pg-sechead{display:flex;align-items:center;justify-content:space-between;background:var(--tinta);color:var(--crema);padding:10px 14px;margin-bottom:10px;}
  body[data-tpl="poster"] .pg-sechead h2{font-family:var(--pg-display),'Anton';font-size:clamp(28px,8vw,46px);line-height:.9;letter-spacing:.5px;text-transform:uppercase;margin:0;}
  body[data-tpl="poster"] .pg-sechead .ct{font-family:var(--pg-display),'Anton';font-size:16px;color:var(--tinta);background:var(--acento);border-radius:0;padding:3px 9px;}

  /* ---------- BENTO GRID ---------- */
  body[data-tpl="poster"] .pg-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  body[data-tpl="poster"] .pg-tile{position:relative;min-height:128px;border:3px solid var(--tinta);border-radius:var(--pg-radio);box-shadow:5px 5px 0 var(--tinta);overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:12px;transition:transform .12s, box-shadow .12s;}
  body[data-tpl="poster"] .pg-tile.wide{grid-column:1 / -1;min-height:120px;}
  body[data-tpl="poster"] .pg-tile:active{transform:translate(3px,3px);box-shadow:2px 2px 0 var(--tinta);}
  /* ciclo de color */
  body[data-tpl="poster"] .pg-tile.c0{background:var(--marca);color:var(--crema);}
  body[data-tpl="poster"] .pg-tile.c1{background:var(--crema);color:var(--tinta);}
  body[data-tpl="poster"] .pg-tile.c2{background:var(--acento);color:var(--tinta);}
  body[data-tpl="poster"] .pg-tile.c3{background:var(--tinta);color:var(--crema);}
  body[data-tpl="poster"] .pg-wm{position:absolute;top:-12px;right:-8px;font-size:84px;line-height:1;opacity:.16;transform:rotate(-8deg);pointer-events:none;}
  body[data-tpl="poster"] .pg-tile .bgph{position:absolute;inset:0;}
  body[data-tpl="poster"] .pg-tile .bgph img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="poster"] .pg-tile .bgph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.78));}
  body[data-tpl="poster"] .pg-tile.hasfoto{color:#fff;}
  body[data-tpl="poster"] .pg-pname{position:relative;font-family:var(--pg-display),'Anton';font-size:clamp(22px,6vw,32px);line-height:.85;letter-spacing:.4px;text-transform:uppercase;margin:0;}
  body[data-tpl="poster"] .pg-tile.wide .pg-pname{font-size:clamp(30px,8vw,44px);}
  body[data-tpl="poster"] .pg-pdesc{position:relative;font-family:'Space Grotesk';font-weight:500;font-size:10.5px;letter-spacing:.04em;text-transform:uppercase;opacity:.8;margin:6px 0 0;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="poster"] .pg-price{position:absolute;top:9px;left:9px;background:var(--acento);color:var(--tinta);font-family:'Space Grotesk';font-weight:700;font-size:14px;padding:3px 9px;transform:rotate(-4deg);border:2px solid var(--tinta);box-shadow:2px 2px 0 var(--tinta);}
  body[data-tpl="poster"] .pg-foot{position:relative;display:flex;justify-content:flex-end;margin-top:8px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="poster"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="poster"] [data-add]{width:34px;height:34px;border:2.5px solid var(--tinta);background:var(--crema);color:var(--tinta);font-family:var(--pg-display),'Anton';font-size:20px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:2px 2px 0 var(--tinta);}
  body[data-tpl="poster"] [data-add]:active{transform:translate(2px,2px);box-shadow:0 0 0 var(--tinta);}
  body[data-tpl="poster"] [data-sub]{width:30px;height:30px;border:2.5px solid var(--tinta);border-right:none;background:var(--crema);color:var(--tinta);font-family:var(--pg-display),'Anton';font-size:18px;line-height:1;cursor:pointer;display:none;align-items:center;justify-content:center;}
  body[data-tpl="poster"] [data-cant]{display:none;min-width:26px;height:30px;line-height:30px;text-align:center;font-family:var(--pg-display),'Anton';background:var(--crema);color:var(--tinta);border-top:2.5px solid var(--tinta);border-bottom:2.5px solid var(--tinta);}
  body[data-tpl="poster"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="poster"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="poster"] .pg-end{text-align:center;padding:26px 0 8px;font-family:var(--pg-display),'Anton';font-size:14px;letter-spacing:2px;text-transform:uppercase;color:var(--tinta);opacity:.5;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="poster"] #cart-fab{background:var(--tinta) !important;color:var(--crema) !important;border:3px solid var(--tinta) !important;border-radius:0 !important;box-shadow:4px 4px 0 var(--acento) !important;font-family:var(--pg-display),'Anton' !important;letter-spacing:.05em;text-transform:uppercase;}
  body[data-tpl="poster"] #cart-fab #fab-cant{background:var(--acento) !important;color:var(--tinta) !important;border-radius:0 !important;}
  body[data-tpl="poster"] #cart{border-radius:0 !important;border-top:4px solid var(--tinta) !important;}
  body[data-tpl="poster"] #cart h2{font-family:var(--pg-display),'Anton';text-transform:uppercase;letter-spacing:1px;}
  body[data-tpl="poster"] #cart .cart-row{border:2px solid var(--tinta) !important;border-radius:0 !important;box-shadow:3px 3px 0 var(--tinta) !important;}
  body[data-tpl="poster"] #cart .cart-row-sub{color:var(--tinta) !important;font-family:var(--pg-display),'Anton';}
  body[data-tpl="poster"] #cart .cart-total strong{font-family:var(--pg-display),'Anton';}
  body[data-tpl="poster"] #cart .campo input,body[data-tpl="poster"] #cart .campo select{border-radius:0 !important;border:2px solid var(--tinta) !important;}
  body[data-tpl="poster"] #cart .cart-row .st-add{background:var(--tinta) !important;color:var(--crema) !important;border-radius:0 !important;}
  body[data-tpl="poster"] #enviar{border-radius:0 !important;font-family:var(--pg-display),'Anton';text-transform:uppercase;letter-spacing:.05em;box-shadow:4px 4px 0 var(--tinta) !important;}
  body[data-tpl="poster"] .ubic-btn{border-radius:0 !important;}
  `,
  render(R, root, ctrl, slug) {
    document.body.dataset.cocina = R.cocina || "";
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    let ci = 0;
    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []);
      const tiles = items.map((it, i) => {
        const wide = i === 0 || i % 5 === 0;
        const c = "c" + (ci++ % 4);
        const foto = it.foto ? `<div class="bgph"><img src="${it.foto}" alt=""></div>` : `<span class="pg-wm">${emo(it, cat.categoria)}</span>`;
        return `<article class="pg-tile ${c} ${wide ? "wide" : ""} ${it.foto ? "hasfoto" : ""}">
          ${foto}
          <span class="pg-price">$${Number(it.precio).toFixed(2)}</span>
          <h3 class="pg-pname">${it.nombre}</h3>
          ${it.desc ? `<p class="pg-pdesc">${it.desc}</p>` : ``}
          <div class="pg-foot">${ctrl(it.id)}</div>
        </article>`;
      }).join("");
      return `<section class="pg-sec" id="cat-${cid}"><div class="pg-sechead"><h2>${cat.categoria}</h2><span class="ct">${items.length}</span></div><div class="pg-grid">${tiles}</div></section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "activa" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <header class="pg-band">
        ${R.promo ? `<span class="pg-promo">${R.promo}</span>` : ``}
        <h1 class="pg-name">${(R.nombre || "").replace(/\s+/g, "<br>")}</h1>
        ${R.slogan ? `<p class="pg-slo">${R.slogan}</p>` : ``}
        ${R.logo ? `<div class="pg-seal"><img src="${R.logo}" alt=""></div>` : ``}
      </header>
      <nav class="pg-nav">${navHtml}</nav>
      <div class="pg-wrap">${menuHtml}<div class="pg-end">✦ ${R.nombre} ✦</div></div>`;
    const chips = [...root.querySelectorAll(".pg-nav button")];
    const secs = [...root.querySelectorAll(".pg-sec")];
    if (window.IntersectionObserver && secs.length) {
      const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { const id = e.target.id.replace("cat-", ""); chips.forEach((c) => { const on = c.dataset.cat === id; c.classList.toggle("activa", on); if (on) c.scrollIntoView({ inline: "center", block: "nearest" }); }); } }), { rootMargin: "-46px 0px -75% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  },
};
