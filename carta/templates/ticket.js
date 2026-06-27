window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["ticket"] = {
  label: "La Comanda",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  body[data-tpl="ticket"]{
    margin:0;background:#1C1A17;color:#2A2622;
    font-family:'JetBrains Mono',monospace;-webkit-font-smoothing:antialiased;padding:14px 0 120px;overflow-x:hidden;
    --papel:#FBF7EF;
  }
  body[data-tpl="ticket"] *{box-sizing:border-box;}
  body[data-tpl="ticket"] .tk-paper{
    position:relative;max-width:384px;margin:0 auto;background:var(--papel);
    background-image:radial-gradient(rgba(0,0,0,.025) 1px,transparent 1px);background-size:7px 7px;
    box-shadow:0 14px 40px rgba(0,0,0,.5);
  }
  /* bordes perforados */
  body[data-tpl="ticket"] .tk-paper::before,
  body[data-tpl="ticket"] .tk-paper::after{
    content:"";position:absolute;left:0;right:0;height:9px;background:
      radial-gradient(circle at 6px 9px, transparent 6px, var(--papel) 6.5px) repeat-x;
    background-size:12px 9px;
  }
  body[data-tpl="ticket"] .tk-paper::before{top:-8px;transform:rotate(180deg);}
  body[data-tpl="ticket"] .tk-paper::after{bottom:-8px;}

  body[data-tpl="ticket"] .tk-in{padding:18px 20px;}

  /* ---------- CABECERA DE RECIBO ---------- */
  body[data-tpl="ticket"] .tk-head{text-align:center;}
  body[data-tpl="ticket"] .tk-stamp{width:50px;height:50px;margin:0 auto 10px;border:1.5px solid #2A2622;border-radius:6px;overflow:hidden;background:var(--papel);}
  body[data-tpl="ticket"] .tk-stamp img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);mix-blend-mode:multiply;}
  body[data-tpl="ticket"] .tk-name{font-family:'Space Mono',monospace;font-weight:700;font-size:19px;letter-spacing:2px;text-transform:uppercase;margin:0;}
  body[data-tpl="ticket"] .tk-rule{border:none;border-top:2px double #2A2622;margin:10px 0;}
  body[data-tpl="ticket"] .tk-rule.thin{border-top:1px dashed rgba(42,38,34,.45);}
  body[data-tpl="ticket"] .tk-meta{font-size:10.5px;letter-spacing:.5px;color:rgba(42,38,34,.65);text-align:center;}
  body[data-tpl="ticket"] .tk-promo{text-align:center;font-weight:700;font-size:11.5px;letter-spacing:1px;margin:8px 0 0;}

  /* ---------- NAV teclas de caja ---------- */
  body[data-tpl="ticket"] .tk-nav{position:sticky;top:0;z-index:25;display:flex;overflow-x:auto;background:var(--papel);border-top:1px dashed rgba(42,38,34,.4);border-bottom:1px dashed rgba(42,38,34,.4);margin:0 -20px;scrollbar-width:none;}
  body[data-tpl="ticket"] .tk-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="ticket"] .tk-nav button{flex:0 0 auto;font-family:'JetBrains Mono';font-weight:700;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:#2A2622;background:none;border:none;border-right:1px dashed rgba(42,38,34,.35);padding:10px 13px;cursor:pointer;white-space:nowrap;}
  body[data-tpl="ticket"] .tk-nav button.activa{background:#2A2622;color:var(--papel);}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="ticket"] .tk-sec{padding-top:14px;scroll-margin-top:42px;}
  body[data-tpl="ticket"] .tk-sechead{background:var(--marca);color:#fff;text-align:center;font-family:'Space Mono';font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:7px;margin:0 0 4px;}

  /* ---------- LÍNEA DE TICKET ---------- */
  body[data-tpl="ticket"] .tk-line{padding:11px 0;border-bottom:1px dashed rgba(42,38,34,.32);}
  body[data-tpl="ticket"] .tk-row{display:flex;align-items:baseline;gap:8px;}
  body[data-tpl="ticket"] .tk-glifo{flex:0 0 24px;text-align:center;font-size:17px;}
  body[data-tpl="ticket"] .tk-thumb{flex:0 0 40px;width:40px;height:40px;border:1px solid #2A2622;object-fit:cover;align-self:center;}
  body[data-tpl="ticket"] .tk-nom{flex:0 1 auto;font-weight:700;font-size:13.5px;text-transform:uppercase;letter-spacing:.3px;line-height:1.2;}
  body[data-tpl="ticket"] .tk-lead{flex:1 1 auto;min-width:14px;border-bottom:2px dotted rgba(42,38,34,.5);transform:translateY(-3px);}
  body[data-tpl="ticket"] .tk-price{flex:0 0 auto;font-weight:700;font-size:14px;font-variant-numeric:tabular-nums;}
  body[data-tpl="ticket"] .tk-sub{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:6px;padding-left:32px;}
  body[data-tpl="ticket"] .tk-desc{font-size:11px;color:rgba(42,38,34,.6);line-height:1.3;flex:1;}

  /* ---------- STEPPER teclas ---------- */
  body[data-tpl="ticket"] [data-qtywrap]{display:inline-flex;align-items:center;gap:0;}
  body[data-tpl="ticket"] [data-add]{min-width:32px;height:30px;padding:0 9px;border:1.5px solid #2A2622;background:var(--acento);color:#fff;font-family:'JetBrains Mono';font-size:16px;font-weight:700;line-height:1;cursor:pointer;border-radius:0;display:inline-flex;align-items:center;justify-content:center;}
  body[data-tpl="ticket"] [data-add]:active{transform:translateY(1px);}
  body[data-tpl="ticket"] [data-sub]{width:30px;height:30px;border:1.5px solid #2A2622;background:var(--papel);color:#2A2622;font-family:'JetBrains Mono';font-size:16px;font-weight:700;line-height:1;cursor:pointer;border-radius:0;border-right:none;display:none;align-items:center;justify-content:center;}
  body[data-tpl="ticket"] [data-cant]{display:none;min-width:30px;height:30px;text-align:center;font-weight:700;font-variant-numeric:tabular-nums;border-top:1.5px solid #2A2622;border-bottom:1.5px solid #2A2622;line-height:30px;}
  body[data-tpl="ticket"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="ticket"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="ticket"] [data-qtywrap].has-qty + [data-add]{border-left:none;}

  /* ---------- PIE: código de barras ---------- */
  body[data-tpl="ticket"] .tk-foot{text-align:center;padding-top:14px;}
  body[data-tpl="ticket"] .tk-bars{height:42px;margin:8px 14px 6px;
    background:repeating-linear-gradient(90deg,#2A2622 0 2px,transparent 2px 4px,#2A2622 4px 5px,transparent 5px 9px,#2A2622 9px 12px,transparent 12px 14px);}
  body[data-tpl="ticket"] .tk-foot .gracias{font-weight:700;font-size:11px;letter-spacing:1px;}
  body[data-tpl="ticket"] .tk-foot .code{font-size:10px;color:rgba(42,38,34,.6);letter-spacing:2px;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="ticket"] #cart-fab{background:#2A2622 !important;color:var(--papel) !important;border-radius:0 !important;font-family:'JetBrains Mono' !important;font-weight:700 !important;letter-spacing:.05em;}
  body[data-tpl="ticket"] #cart-fab #fab-cant{background:var(--acento) !important;color:#fff !important;border-radius:0 !important;}
  body[data-tpl="ticket"] #cart{background:var(--papel) !important;border-radius:0 !important;}
  body[data-tpl="ticket"] #cart .cart-head{background:var(--papel) !important;}
  body[data-tpl="ticket"] #cart h2{font-family:'Space Mono';text-transform:uppercase;letter-spacing:1px;font-size:16px;}
  body[data-tpl="ticket"] #cart .cart-row{border:1px dashed rgba(42,38,34,.4) !important;border-radius:0 !important;background:var(--papel) !important;}
  body[data-tpl="ticket"] #cart .cart-row-nom{text-transform:uppercase;font-size:13px;}
  body[data-tpl="ticket"] #cart .cart-row-sub{color:#2A2622 !important;font-variant-numeric:tabular-nums;}
  body[data-tpl="ticket"] #cart .campo input,body[data-tpl="ticket"] #cart .campo select{border-radius:0 !important;border:1px solid #2A2622 !important;font-family:'JetBrains Mono';}
  body[data-tpl="ticket"] #cart .cart-total strong{color:var(--marca) !important;font-family:'Space Mono';}
  body[data-tpl="ticket"] #cart .cart-row .st-add{background:var(--acento) !important;color:#fff !important;border-radius:0 !important;}
  body[data-tpl="ticket"] #cart .cart-row .st-min{border-radius:0 !important;}
  body[data-tpl="ticket"] #enviar{border-radius:0 !important;font-family:'JetBrains Mono';text-transform:uppercase;letter-spacing:.05em;}
  body[data-tpl="ticket"] .ubic-btn{border-radius:0 !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const secs = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const lineas = (cat.items || []).map((it) => {
        const glifo = it.foto ? `<img class="tk-thumb" src="${it.foto}" alt="">` : `<span class="tk-glifo">${emo(it, cat.categoria)}</span>`;
        return `
          <div class="tk-line">
            <div class="tk-row">
              ${glifo}
              <span class="tk-nom">${it.nombre}</span>
              <span class="tk-lead"></span>
              <span class="tk-price">${Number(it.precio).toFixed(2)}</span>
            </div>
            <div class="tk-sub">
              <span class="tk-desc">${it.desc || ""}</span>
              <span class="tk-ctrl">${ctrl(it.id)}</span>
            </div>
          </div>`;
      }).join("");
      return `<section class="tk-sec" id="cat-${cid}"><div class="tk-sechead">▌ ${cat.categoria} ▐</div>${lineas}</section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "activa" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <div class="tk-paper">
        <div class="tk-in">
          <div class="tk-head">
            <div class="tk-stamp">${R.logo ? `<img src="${R.logo}" alt="">` : ``}</div>
            <h1 class="tk-name">${R.nombre}</h1>
            <hr class="tk-rule">
            <div class="tk-meta">RIOBAMBA · ${R.direccion || ""}</div>
            ${R.promo ? `<p class="tk-promo">*** ${R.promo} ***</p>` : ``}
          </div>
        </div>
        <nav class="tk-nav">${navHtml}</nav>
        <div class="tk-in" style="padding-top:6px">
          ${secs}
          <div class="tk-foot">
            <hr class="tk-rule thin">
            <p class="gracias">*** GRACIAS POR SU PEDIDO ***</p>
            <div class="tk-bars"></div>
            <p class="code">${(R.nombre || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10)} · #00472</p>
          </div>
        </div>
      </div>`;

    const chips = [...root.querySelectorAll(".tk-nav button")];
    const sections = [...root.querySelectorAll(".tk-sec")];
    if (window.IntersectionObserver && sections.length) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => { if (e.isIntersecting) { const id = e.target.id.replace("cat-", ""); chips.forEach((c) => c.classList.toggle("activa", c.dataset.cat === id)); } });
      }, { rootMargin: "-50px 0px -75% 0px" });
      sections.forEach((s) => io.observe(s));
    }
  },
};
