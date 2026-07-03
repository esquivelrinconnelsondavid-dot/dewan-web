window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["inmersivo"] = {
  label: "Carta Nocturna",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fraunces:ital,opsz,wght@1,9..144,400;0,9..144,500&family=Oswald:wght@500;600&family=Archivo+Black&family=Marcellus&family=Cinzel:wght@600&family=Cormorant+Garamond:wght@700&family=Baloo+2:wght@800&family=Quicksand:wght@700&display=swap');

  body[data-tpl="inmersivo"]{
    --nc-display:'Bebas Neue'; --nc-lh:.82; --nc-ls:1px;
    --nc-h1:clamp(58px,22vw,98px); --nc-h2:clamp(40px,13vw,64px); --nc-nom:25px; --nc-precio:29px;
    margin:0;background:#0E0C0B;color:var(--crema,#EDE6DA);
    font-family:'Fraunces',Georgia,serif;-webkit-font-smoothing:antialiased;padding-bottom:118px;overflow-x:hidden;
  }
  body[data-tpl="inmersivo"] *{box-sizing:border-box;}

  /* ===== PACKS DE COCINA: la Carta Nocturna cambia de voz segun el local ===== */
  body[data-tpl="inmersivo"][data-cocina="burger"]{--nc-display:'Archivo Black';--nc-lh:1;--nc-ls:0px;--nc-h1:clamp(32px,10vw,52px);--nc-h2:clamp(24px,7vw,38px);--nc-nom:16.5px;--nc-precio:20px;}
  body[data-tpl="inmersivo"][data-cocina="pizza"]{--nc-display:'Marcellus';--nc-lh:1;--nc-ls:.5px;--nc-h1:clamp(40px,13vw,62px);--nc-h2:clamp(28px,9vw,44px);--nc-nom:19px;--nc-precio:22px;}
  body[data-tpl="inmersivo"][data-cocina="ceviche"]{--nc-display:'Cinzel';--nc-lh:1.02;--nc-ls:1px;--nc-h1:clamp(36px,11vw,56px);--nc-h2:clamp(26px,8vw,40px);--nc-nom:17px;--nc-precio:20px;}
  body[data-tpl="inmersivo"][data-cocina="cafe"]{--nc-display:'Cormorant Garamond';--nc-lh:.98;--nc-ls:.5px;--nc-h1:clamp(44px,14vw,68px);--nc-h2:clamp(30px,10vw,48px);--nc-nom:20px;--nc-precio:23px;}
  body[data-tpl="inmersivo"][data-cocina="helados"]{--nc-display:'Baloo 2';--nc-lh:1;--nc-ls:0px;--nc-h1:clamp(38px,12vw,58px);--nc-h2:clamp(27px,8vw,42px);--nc-nom:17.5px;--nc-precio:21px;}
  body[data-tpl="inmersivo"][data-cocina="postres"]{--nc-display:'Quicksand';--nc-lh:1.02;--nc-ls:0px;--nc-h1:clamp(36px,11vw,56px);--nc-h2:clamp(26px,8vw,40px);--nc-nom:17px;--nc-precio:20px;}

  /* ---------- BARRA CAPÍTULO (sticky) ---------- */
  body[data-tpl="inmersivo"] .nc-bar{
    position:sticky;top:0;z-index:30;display:flex;align-items:center;justify-content:space-between;
    padding:11px 16px;background:rgba(14,12,11,.7);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);
  }
  body[data-tpl="inmersivo"] .nc-bar .now{font-family:'Oswald';font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--crema);opacity:.85;}
  body[data-tpl="inmersivo"] .nc-bar .idx-btn{font-family:'Oswald';font-weight:600;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0E0C0B;background:var(--acento);border:none;border-radius:999px;padding:7px 14px;cursor:pointer;}

  /* ---------- HERO 00 ---------- */
  body[data-tpl="inmersivo"] .nc-hero{
    position:relative;min-height:74vh;max-height:640px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;
    padding:30px 22px;background:linear-gradient(165deg, var(--marca), color-mix(in srgb,var(--tinta) 72%,#000));overflow:hidden;
  }
  body[data-tpl="inmersivo"] .nc-hero .wm{position:absolute;top:-6%;right:-12%;width:62%;opacity:.10;filter:grayscale(1) contrast(1.2);mix-blend-mode:luminosity;pointer-events:none;}
  body[data-tpl="inmersivo"] .nc-hero h1{font-family:var(--nc-display),'Bebas Neue';font-size:var(--nc-h1);line-height:var(--nc-lh);margin:0;color:#fff;letter-spacing:var(--nc-ls);text-shadow:0 6px 30px rgba(0,0,0,.4);}
  body[data-tpl="inmersivo"] .nc-hero .slo{font-family:'Fraunces';font-style:italic;font-size:16px;color:rgba(255,255,255,.9);margin:14px 0 0;}
  body[data-tpl="inmersivo"] .nc-hero .promo{margin-top:20px;font-family:'Oswald';font-weight:600;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#fff;border:1px solid var(--acento);border-radius:999px;padding:8px 16px;}
  body[data-tpl="inmersivo"] .nc-hero .addr{position:absolute;bottom:18px;left:0;right:0;font-family:'Oswald';font-weight:500;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);}
  body[data-tpl="inmersivo"] .nc-hero .chev{margin-top:24px;font-size:26px;color:#fff;animation:nc-bounce 1.6s ease-in-out infinite;}
  @keyframes nc-bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(8px);}}

  /* ---------- CAPÍTULO ---------- */
  body[data-tpl="inmersivo"] .nc-chap{scroll-margin-top:48px;}
  body[data-tpl="inmersivo"] .nc-cover{
    position:relative;min-height:42vh;max-height:380px;display:flex;flex-direction:column;justify-content:flex-end;padding:26px 18px 18px;overflow:hidden;
    background:linear-gradient(160deg, var(--marca), color-mix(in srgb,var(--tinta) 74%,#000));
  }
  body[data-tpl="inmersivo"] .nc-cover .wm{position:absolute;top:-10%;right:-10%;width:58%;opacity:.08;filter:grayscale(1) contrast(1.2);mix-blend-mode:luminosity;pointer-events:none;}
  body[data-tpl="inmersivo"] .nc-cover .num{font-family:'Oswald';font-weight:600;font-size:14px;letter-spacing:.2em;color:var(--acento);}
  body[data-tpl="inmersivo"] .nc-cover h2{font-family:var(--nc-display),'Bebas Neue';font-size:var(--nc-h2);line-height:var(--nc-lh);margin:6px 0 0;color:#fff;letter-spacing:var(--nc-ls);}

  /* ---------- LÍNEAS ---------- */
  body[data-tpl="inmersivo"] .nc-lineas{list-style:none;margin:0;padding:0;background:#0E0C0B;}
  body[data-tpl="inmersivo"] .nc-renglon{padding:15px 18px;border-bottom:1px solid rgba(255,255,255,.08);}
  body[data-tpl="inmersivo"] .nc-head{display:flex;align-items:baseline;gap:10px;}
  body[data-tpl="inmersivo"] .nc-glifo{flex:0 0 auto;font-size:24px;line-height:1;filter:drop-shadow(0 0 8px color-mix(in srgb,var(--acento) 45%,transparent));align-self:center;}
  body[data-tpl="inmersivo"] .nc-nom{flex:0 1 auto;font-family:var(--nc-display),'Bebas Neue';font-size:var(--nc-nom);letter-spacing:.5px;color:var(--crema);line-height:1;}
  body[data-tpl="inmersivo"] .nc-leader{flex:1 1 auto;min-width:12px;border-bottom:1px dotted rgba(255,255,255,.28);transform:translateY(-5px);}
  body[data-tpl="inmersivo"] .nc-precio{flex:0 0 auto;font-family:var(--nc-display),'Bebas Neue';font-size:var(--nc-precio);color:var(--crema);letter-spacing:.5px;line-height:1;}
  body[data-tpl="inmersivo"] .nc-precio i{font-style:normal;font-size:15px;color:var(--acento);vertical-align:top;margin-right:1px;}
  body[data-tpl="inmersivo"] .nc-sub{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:6px;padding-left:34px;}
  body[data-tpl="inmersivo"] .nc-desc{font-family:'Fraunces';font-style:italic;font-weight:400;font-size:13px;color:rgba(237,230,218,.6);line-height:1.35;margin:0;flex:1;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="inmersivo"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="inmersivo"] [data-add]{width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:var(--acento);color:#0E0C0B;font-size:20px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center;transition:transform .14s;box-shadow:0 0 0 0 color-mix(in srgb,var(--acento) 60%,transparent);}
  body[data-tpl="inmersivo"] [data-add]:active{transform:scale(.85);}
  body[data-tpl="inmersivo"] [data-sub]{width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:transparent;color:var(--crema);font-size:18px;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;}
  body[data-tpl="inmersivo"] [data-cant]{display:none;min-width:20px;text-align:center;font-family:'Bebas Neue';font-size:20px;color:var(--crema);padding:0 3px;}
  body[data-tpl="inmersivo"] [data-qtywrap].has-qty{gap:4px;}
  body[data-tpl="inmersivo"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="inmersivo"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  /* ---------- ÍNDICE overlay ---------- */
  body[data-tpl="inmersivo"] .nc-index{position:fixed;inset:0;z-index:60;background:#17120F;display:none;flex-direction:column;padding:30px 22px;overflow-y:auto;}
  body[data-tpl="inmersivo"] .nc-index.open{display:flex;}
  body[data-tpl="inmersivo"] .nc-index .x{align-self:flex-end;background:none;border:none;color:var(--crema);font-size:30px;cursor:pointer;line-height:1;}
  body[data-tpl="inmersivo"] .nc-index .it{display:flex;align-items:baseline;gap:14px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.1);cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;width:100%;text-align:left;}
  body[data-tpl="inmersivo"] .nc-index .it .n{font-family:'Oswald';font-weight:600;font-size:14px;color:var(--acento);}
  body[data-tpl="inmersivo"] .nc-index .it .t{font-family:var(--nc-display),'Bebas Neue';font-size:var(--nc-precio);color:var(--crema);letter-spacing:.5px;}

  body[data-tpl="inmersivo"] .nc-end{text-align:center;padding:34px 0 8px;font-family:'Oswald';font-weight:500;letter-spacing:.2em;text-transform:uppercase;font-size:11px;color:rgba(237,230,218,.4);}

  /* ---------- CARRITO ---------- */
  body[data-tpl="inmersivo"] #cart-fab{background:#0E0C0B !important;color:var(--crema) !important;border:1px solid var(--acento) !important;border-radius:0 !important;font-family:'Oswald' !important;font-weight:600 !important;letter-spacing:.08em;text-transform:uppercase;}
  body[data-tpl="inmersivo"] #cart-fab #fab-cant{background:var(--acento) !important;color:#0E0C0B !important;}
  body[data-tpl="inmersivo"] #cart{background:#17120F !important;color:var(--crema) !important;border-top:2px solid var(--acento) !important;}
  body[data-tpl="inmersivo"] #cart .cart-head{background:#17120F !important;}
  body[data-tpl="inmersivo"] #cart h2{color:var(--crema) !important;font-family:'Bebas Neue';font-size:26px;}
  body[data-tpl="inmersivo"] #cart .cart-row{background:#0E0C0B !important;border-color:rgba(255,255,255,.1) !important;}
  body[data-tpl="inmersivo"] #cart .cart-row-nom{color:var(--crema) !important;}
  body[data-tpl="inmersivo"] #cart .cart-row-pre{color:rgba(237,230,218,.5) !important;}
  body[data-tpl="inmersivo"] #cart .cart-row-sub{color:var(--acento) !important;font-family:'Bebas Neue';font-size:18px;}
  body[data-tpl="inmersivo"] #cart .campo{color:rgba(237,230,218,.6) !important;}
  body[data-tpl="inmersivo"] #cart .campo input,body[data-tpl="inmersivo"] #cart .campo select{background:#0E0C0B !important;color:var(--crema) !important;border-color:rgba(255,255,255,.2) !important;}
  body[data-tpl="inmersivo"] #cart .cart-total strong{color:var(--acento) !important;font-family:'Bebas Neue';}
  body[data-tpl="inmersivo"] #cart .ubic-btn{border-color:var(--acento) !important;color:var(--acento) !important;background:rgba(255,255,255,.04) !important;}
  body[data-tpl="inmersivo"] #cart .fact-toggle{color:var(--crema) !important;}
  body[data-tpl="inmersivo"] #cart .cart-row .st-add{background:var(--acento) !important;color:#0E0C0B !important;}
  `,
  render(R, root, ctrl, slug) {
    document.body.dataset.cocina = R.cocina || "";
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const cats = R.menu || [];
    const chaptersHtml = cats.map((cat, ci) => {
      const cid = slug(cat.categoria);
      const num = String(ci + 1).padStart(2, "0");
      const lineas = (cat.items || []).map((it) => `
        <li class="nc-renglon">
          <div class="nc-head">
            <span class="nc-glifo">${it.foto ? "" : emo(it, cat.categoria)}</span>
            <h3 class="nc-nom">${it.nombre}</h3>
            <span class="nc-leader"></span>
            <span class="nc-precio"><i>$</i>${Number(it.precio).toFixed(2)}</span>
          </div>
          <div class="nc-sub">
            <p class="nc-desc">${it.desc || ""}</p>
            <div class="nc-ctrl">${ctrl(it.id)}</div>
          </div>
        </li>`).join("");
      return `
        <section class="nc-chap" id="cat-${cid}">
          <header class="nc-cover">
            ${R.logo ? `<img class="wm" src="${R.logo}" alt="">` : ``}
            <span class="num">CAP. ${num}</span>
            <h2>${cat.categoria}</h2>
          </header>
          <ul class="nc-lineas">${lineas}</ul>
        </section>`;
    }).join("");

    const indexHtml = cats.map((cat, ci) =>
      `<button class="it" data-cat="${slug(cat.categoria)}"><span class="n">${String(ci + 1).padStart(2, "0")}</span><span class="t">${cat.categoria}</span></button>`
    ).join("");

    root.innerHTML = `
      <div class="nc-bar"><span class="now" id="nc-now">${R.nombre}</span><button class="idx-btn" id="nc-idx-open">☰ Índice</button></div>
      <section class="nc-hero">
        ${R.logo ? `<img class="wm" src="${R.logo}" alt="">` : ``}
        <h1>${(R.nombre || "").replace(/\s+/, "<br>")}</h1>
        ${R.slogan ? `<p class="slo">${R.slogan}</p>` : ``}
        ${R.promo ? `<span class="promo">${R.promo}</span>` : ``}
        <span class="chev">⌄</span>
        ${R.direccion ? `<div class="addr">${R.direccion}</div>` : ``}
      </section>
      ${chaptersHtml}
      <div class="nc-end">— ${R.nombre} —</div>
      <div class="nc-index" id="nc-index">
        <button class="x" id="nc-idx-close">✕</button>
        ${indexHtml}
      </div>`;

    const overlay = root.querySelector("#nc-index");
    root.querySelector("#nc-idx-open").addEventListener("click", () => overlay.classList.add("open"));
    root.querySelector("#nc-idx-close").addEventListener("click", () => overlay.classList.remove("open"));
    overlay.querySelectorAll("[data-cat]").forEach((b) => b.addEventListener("click", () => setTimeout(() => overlay.classList.remove("open"), 60)));

    // scrollspy: nombre del capítulo actual en la barra
    const now = root.querySelector("#nc-now");
    const covers = [...root.querySelectorAll(".nc-chap")];
    if (window.IntersectionObserver && covers.length) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => { if (e.isIntersecting) { const t = e.target.querySelector("h2"); if (t && now) now.textContent = t.textContent; } });
      }, { rootMargin: "-20% 0px -70% 0px" });
      covers.forEach((c) => io.observe(c));
    }
  },
};
