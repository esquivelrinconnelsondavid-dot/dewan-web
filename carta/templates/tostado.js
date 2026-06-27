window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["tostado"] = {
  label: "Café Acogedor",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Work+Sans:wght@400;500;600&family=Caveat:wght@600&display=swap');

  body[data-tpl="tostado"]{
    margin:0;background:var(--crema);color:var(--tinta);
    font-family:'Work Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
    padding-bottom:120px;overflow-x:hidden;
    background-image:radial-gradient(rgba(91,58,41,.05) 1px, transparent 1px);background-size:18px 18px;
  }
  body[data-tpl="tostado"] *{box-sizing:border-box;}
  body[data-tpl="tostado"] .to-wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---------- HERO ---------- */
  body[data-tpl="tostado"] .to-hero{text-align:center;padding:30px 0 14px;position:relative;}
  body[data-tpl="tostado"] .to-logo{
    width:114px;height:114px;margin:0 auto 14px;border-radius:50%;overflow:hidden;
    border:3px solid #fff;box-shadow:0 12px 28px rgba(74,41,25,.25);background:#fff;
  }
  body[data-tpl="tostado"] .to-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="tostado"] .to-name{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(2rem,8vw,2.6rem);line-height:1.02;margin:0;color:var(--tinta);}
  body[data-tpl="tostado"] .to-slogan{font-family:'Caveat',cursive;font-size:23px;color:var(--marca);margin:6px 0 0;}
  body[data-tpl="tostado"] .to-pill{
    display:inline-flex;align-items:center;gap:7px;margin-top:14px;font-size:12.5px;font-weight:600;
    color:#fff;background:var(--marca);padding:7px 16px;border-radius:999px;box-shadow:0 6px 16px rgba(74,41,25,.22);
  }
  body[data-tpl="tostado"] .to-addr{font-size:11.5px;color:rgba(0,0,0,.5);margin:11px 0 0;}

  /* ---------- NAV ---------- */
  body[data-tpl="tostado"] .to-nav{
    position:sticky;top:0;z-index:20;display:flex;gap:9px;overflow-x:auto;padding:13px 16px;margin:14px -16px 4px;
    background:color-mix(in srgb,var(--crema) 88%,#fff);backdrop-filter:blur(8px);border-bottom:1.5px dashed color-mix(in srgb,var(--marca) 40%,transparent);scrollbar-width:none;
  }
  body[data-tpl="tostado"] .to-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="tostado"] .to-nav button{
    flex:0 0 auto;font-family:'Work Sans',sans-serif;font-weight:600;font-size:13.5px;color:var(--tinta);
    background:#fff;border:1.5px solid color-mix(in srgb,var(--marca) 22%,#fff);padding:9px 16px;border-radius:999px;cursor:pointer;white-space:nowrap;
    box-shadow:0 2px 7px rgba(74,41,25,.1);transition:all .15s;
  }
  body[data-tpl="tostado"] .to-nav button.active{background:var(--marca);color:#fff;border-color:var(--marca);}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="tostado"] .to-sec{padding-top:16px;scroll-margin-top:60px;}
  body[data-tpl="tostado"] .to-sec-head{display:flex;align-items:center;gap:12px;margin:8px 2px 16px;}
  body[data-tpl="tostado"] .to-sec-tt{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:21px;color:var(--tinta);margin:0;}
  body[data-tpl="tostado"] .to-dash{flex:1;height:0;border-top:2px dashed color-mix(in srgb,var(--marca) 40%,transparent);}

  /* ---------- TARJETAS ---------- */
  body[data-tpl="tostado"] .to-grid{display:flex;flex-direction:column;gap:13px;}
  body[data-tpl="tostado"] .to-card{
    position:relative;display:flex;align-items:center;gap:14px;background:#fffdf9;border-radius:16px;padding:13px;
    border:1px solid color-mix(in srgb,var(--marca) 14%,#fff);box-shadow:0 8px 20px rgba(74,41,25,.1);transition:transform .16s;
  }
  body[data-tpl="tostado"] .to-card:active{transform:scale(.99);}
  body[data-tpl="tostado"] .to-media{
    position:relative;flex:0 0 auto;width:78px;height:78px;border-radius:14px;overflow:hidden;display:flex;align-items:center;justify-content:center;
    background:color-mix(in srgb,var(--marca) 10%,#fff);border:1px solid color-mix(in srgb,var(--marca) 20%,#fff);
  }
  body[data-tpl="tostado"] .to-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="tostado"] .to-emoji{font-size:36px;line-height:1;}
  body[data-tpl="tostado"] .to-body{flex:1;min-width:0;}
  body[data-tpl="tostado"] .to-pname{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:16px;color:var(--tinta);margin:0 0 3px;line-height:1.18;}
  body[data-tpl="tostado"] .to-pdesc{font-size:12.5px;line-height:1.34;color:rgba(0,0,0,.5);margin:0 0 9px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="tostado"] .to-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;}
  body[data-tpl="tostado"] .to-price{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:18px;color:var(--acento);}
  body[data-tpl="tostado"] .to-price small{font-size:12px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="tostado"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="tostado"] [data-add]{width:38px;height:38px;border-radius:12px;border:none;cursor:pointer;background:var(--marca);color:#fff;font-size:22px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 5px 13px rgba(74,41,25,.25);transition:transform .12s;}
  body[data-tpl="tostado"] [data-add]:active{transform:scale(.9);}
  body[data-tpl="tostado"] [data-sub]{width:32px;height:32px;border-radius:10px;border:1.5px solid var(--marca);background:transparent;color:var(--marca);font-size:20px;font-weight:700;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;}
  body[data-tpl="tostado"] [data-cant]{display:none;min-width:22px;text-align:center;font-size:16px;font-weight:700;color:var(--tinta);padding:0 4px;}
  body[data-tpl="tostado"] [data-qtywrap].has-qty{gap:5px;background:color-mix(in srgb,var(--marca) 8%,#fff);border:1px solid color-mix(in srgb,var(--marca) 25%,#fff);border-radius:999px;padding:3px;}
  body[data-tpl="tostado"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="tostado"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="tostado"] [data-qtywrap].has-qty [data-add]{width:32px;height:32px;font-size:20px;border-radius:10px;}

  body[data-tpl="tostado"] .to-end{text-align:center;padding:30px 0 8px;font-family:'Caveat',cursive;color:var(--marca);font-size:20px;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="tostado"] #cart-fab{background:var(--marca) !important;color:#fff !important;box-shadow:0 10px 26px rgba(74,41,25,.28) !important;font-weight:700 !important;}
  body[data-tpl="tostado"] #cart-fab #fab-cant{background:#fff !important;color:var(--marca) !important;}
  body[data-tpl="tostado"] #cart h2{font-family:'Bricolage Grotesque',sans-serif;}
  body[data-tpl="tostado"] #cart .cart-row-sub{color:var(--acento) !important;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;}
  body[data-tpl="tostado"] #cart .cart-total strong{color:var(--acento) !important;}
  body[data-tpl="tostado"] #cart .cart-row .st-add{background:var(--marca) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "☕"));
    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []).map((it) => {
        const media = it.foto ? `<img src="${it.foto}" alt="${it.nombre}">` : `<span class="to-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="to-card">
            <div class="to-media" data-media>${media}</div>
            <div class="to-body">
              <h3 class="to-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="to-pdesc">${it.desc}</p>` : ``}
              <div class="to-foot"><span class="to-price"><small>$</small>${Number(it.precio).toFixed(2)}</span><span>${ctrl(it.id)}</span></div>
            </div>
          </article>`;
      }).join("");
      return `<section class="to-sec" id="cat-${cid}"><div class="to-sec-head"><h2 class="to-sec-tt">${cat.categoria}</h2><span class="to-dash"></span></div><div class="to-grid">${items}</div></section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <div class="to-wrap">
        <header class="to-hero">
          <div class="to-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
          <h1 class="to-name">${R.nombre}</h1>
          ${R.slogan ? `<p class="to-slogan">${R.slogan}</p>` : ``}
          ${R.direccion ? `<p class="to-addr">📍 ${R.direccion}</p>` : ``}
          <span class="to-pill">${R.promo || "🛵 A domicilio o para retirar"}</span>
        </header>
      </div>
      <nav class="to-nav">${navHtml}</nav>
      <div class="to-wrap">${menuHtml}<div class="to-end">${R.nombre} ♥</div></div>`;
  },
};
