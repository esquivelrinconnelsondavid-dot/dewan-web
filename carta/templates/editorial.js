window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["editorial"] = {
  label: "Carta Elegante",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&display=swap');

  body[data-tpl="editorial"]{
    margin:0;background:var(--crema);color:var(--tinta);
    font-family:'Jost',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
    padding-bottom:120px;overflow-x:hidden;
  }
  body[data-tpl="editorial"] *{box-sizing:border-box;}
  body[data-tpl="editorial"] .ed-wrap{max-width:520px;margin:0 auto;padding:0 22px;}

  /* ---------- HERO ---------- */
  body[data-tpl="editorial"] .ed-hero{text-align:center;padding:40px 0 18px;}
  body[data-tpl="editorial"] .ed-logo{
    width:96px;height:96px;margin:0 auto 18px;border-radius:50%;overflow:hidden;
    border:1px solid color-mix(in srgb,var(--acento) 50%,transparent);background:#fff;
    box-shadow:0 8px 22px rgba(0,0,0,.10);
  }
  body[data-tpl="editorial"] .ed-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="editorial"] .ed-name{
    font-family:'Cormorant Garamond',serif;font-weight:600;font-size:clamp(2.3rem,9vw,3.1rem);
    line-height:1;margin:0;color:var(--tinta);letter-spacing:.5px;
  }
  body[data-tpl="editorial"] .ed-slogan{
    font-family:'Jost',sans-serif;font-weight:400;font-size:12px;letter-spacing:.34em;text-transform:uppercase;
    color:var(--marca);margin:14px 0 0;
  }
  body[data-tpl="editorial"] .ed-rule{
    display:flex;align-items:center;justify-content:center;gap:12px;margin:16px auto 0;max-width:240px;color:var(--acento);
  }
  body[data-tpl="editorial"] .ed-rule::before,
  body[data-tpl="editorial"] .ed-rule::after{content:"";flex:1;height:1px;background:currentColor;opacity:.55;}
  body[data-tpl="editorial"] .ed-rule span{font-size:13px;}
  body[data-tpl="editorial"] .ed-addr{font-size:11px;letter-spacing:.05em;color:rgba(0,0,0,.45);margin:14px 0 0;}
  body[data-tpl="editorial"] .ed-pill{
    display:inline-block;margin-top:14px;font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;
    color:var(--tinta);border:1px solid color-mix(in srgb,var(--acento) 55%,transparent);padding:7px 16px;border-radius:2px;
  }

  /* ---------- NAV ---------- */
  body[data-tpl="editorial"] .ed-nav{
    position:sticky;top:0;z-index:20;display:flex;gap:18px;overflow-x:auto;justify-content:flex-start;
    padding:15px 22px;margin:18px -22px 6px;background:color-mix(in srgb,var(--crema) 92%,#fff);
    border-top:1px solid rgba(0,0,0,.08);border-bottom:1px solid rgba(0,0,0,.08);scrollbar-width:none;
  }
  body[data-tpl="editorial"] .ed-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="editorial"] .ed-nav button{
    flex:0 0 auto;font-family:'Jost',sans-serif;font-weight:500;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;
    color:rgba(0,0,0,.5);background:none;border:none;padding:4px 0;cursor:pointer;white-space:nowrap;position:relative;transition:color .15s;
  }
  body[data-tpl="editorial"] .ed-nav button.active{color:var(--tinta);}
  body[data-tpl="editorial"] .ed-nav button.active::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:1.5px;background:var(--acento);}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="editorial"] .ed-sec{padding-top:20px;scroll-margin-top:58px;}
  body[data-tpl="editorial"] .ed-sec-head{text-align:center;margin:8px 0 20px;}
  body[data-tpl="editorial"] .ed-sec-tt{
    font-family:'Cormorant Garamond',serif;font-weight:600;font-size:26px;color:var(--tinta);margin:0;font-style:italic;
  }

  /* ---------- PLATOS (carta con línea de puntos) ---------- */
  body[data-tpl="editorial"] .ed-list{display:flex;flex-direction:column;}
  body[data-tpl="editorial"] .ed-item{
    display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid rgba(0,0,0,.08);
  }
  body[data-tpl="editorial"] .ed-item:last-child{border-bottom:none;}
  body[data-tpl="editorial"] .ed-top{flex:1;min-width:0;}
  body[data-tpl="editorial"] .ed-headline{display:flex;align-items:baseline;gap:8px;}
  body[data-tpl="editorial"] .ed-iname{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:19px;color:var(--tinta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  body[data-tpl="editorial"] .ed-dots{flex:1;border-bottom:1.5px dotted color-mix(in srgb,var(--tinta) 35%,transparent);transform:translateY(-4px);min-width:14px;}
  body[data-tpl="editorial"] .ed-price{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:19px;color:var(--acento);white-space:nowrap;}
  body[data-tpl="editorial"] .ed-desc{
    font-family:'Jost',sans-serif;font-weight:300;font-size:12.5px;line-height:1.4;color:rgba(0,0,0,.52);margin:5px 0 0;max-width:90%;
  }
  body[data-tpl="editorial"] .ed-ctrl{flex:0 0 auto;padding-top:2px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="editorial"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="editorial"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:1px solid var(--acento);background:transparent;color:var(--acento);
    font-size:20px;font-weight:400;line-height:1;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .14s;
  }
  body[data-tpl="editorial"] [data-add]:active{transform:scale(.9);background:var(--acento);color:#fff;}
  body[data-tpl="editorial"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:1px solid rgba(0,0,0,.2);background:transparent;color:var(--tinta);
    font-size:18px;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="editorial"] [data-cant]{display:none;min-width:20px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:var(--tinta);padding:0 3px;}
  body[data-tpl="editorial"] [data-qtywrap].has-qty{gap:4px;}
  body[data-tpl="editorial"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="editorial"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="editorial"] [data-qtywrap].has-qty [data-add]{background:var(--acento);color:#fff;}

  body[data-tpl="editorial"] .ed-end{text-align:center;padding:34px 0 8px;color:var(--acento);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="editorial"] #cart-fab{background:var(--tinta) !important;color:var(--crema) !important;border-radius:4px !important;font-family:'Jost',sans-serif !important;font-weight:500 !important;letter-spacing:.04em;}
  body[data-tpl="editorial"] #cart-fab #fab-cant{background:var(--acento) !important;color:#fff !important;}
  body[data-tpl="editorial"] #cart h2{font-family:'Cormorant Garamond',serif;font-weight:700;}
  body[data-tpl="editorial"] #cart .cart-row-sub{color:var(--acento) !important;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:16px;}
  body[data-tpl="editorial"] #cart .cart-total strong{color:var(--acento) !important;font-family:'Cormorant Garamond',serif;}
  body[data-tpl="editorial"] #cart .cart-row .st-add{background:var(--acento) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []).map((it) => `
        <article class="ed-item">
          <div class="ed-top">
            <div class="ed-headline">
              <span class="ed-iname">${it.nombre}</span>
              <span class="ed-dots"></span>
              <span class="ed-price">$${Number(it.precio).toFixed(2)}</span>
            </div>
            ${it.desc ? `<p class="ed-desc">${it.desc}</p>` : ``}
          </div>
          <div class="ed-ctrl">${ctrl(it.id)}</div>
        </article>`).join("");
      return `
        <section class="ed-sec" id="cat-${cid}">
          <div class="ed-sec-head"><h2 class="ed-sec-tt">${cat.categoria}</h2></div>
          <div class="ed-list">${items}</div>
        </section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <div class="ed-wrap">
        <header class="ed-hero">
          <div class="ed-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
          <h1 class="ed-name">${R.nombre}</h1>
          ${R.slogan ? `<p class="ed-slogan">${R.slogan}</p>` : ``}
          <div class="ed-rule"><span>✦</span></div>
          ${R.direccion ? `<p class="ed-addr">${R.direccion}</p>` : ``}
          <span class="ed-pill">${R.promo || "A domicilio o para retirar"}</span>
        </header>
      </div>
      <nav class="ed-nav">${navHtml}</nav>
      <div class="ed-wrap">
        ${menuHtml}
        <div class="ed-end">✦ ${R.nombre} ✦</div>
      </div>`;
  },
};
