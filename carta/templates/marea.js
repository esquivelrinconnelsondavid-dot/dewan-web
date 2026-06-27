window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["marea"] = {
  label: "Costeño Fresco",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Nunito+Sans:wght@400;600;700;800&display=swap');

  body[data-tpl="marea"]{
    margin:0;background:var(--crema);color:var(--tinta);
    font-family:'Nunito Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
    padding-bottom:120px;overflow-x:hidden;
  }
  body[data-tpl="marea"] *{box-sizing:border-box;}
  body[data-tpl="marea"] .ma-wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---------- HERO ---------- */
  body[data-tpl="marea"] .ma-hero{
    position:relative;text-align:center;padding:30px 16px 44px;margin:0 -16px;
    background:linear-gradient(180deg, color-mix(in srgb,var(--marca) 22%,#fff), color-mix(in srgb,var(--marca) 6%,#fff));
  }
  body[data-tpl="marea"] .ma-wave{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:34px;display:block;color:var(--crema);}
  body[data-tpl="marea"] .ma-wave svg{display:block;width:100%;height:100%;}
  body[data-tpl="marea"] .ma-logo{
    width:112px;height:112px;margin:0 auto 13px;border-radius:50%;overflow:hidden;
    border:4px solid #fff;box-shadow:0 14px 32px rgba(11,57,84,.22);background:#fff;
  }
  body[data-tpl="marea"] .ma-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="marea"] .ma-name{font-family:'Fraunces',serif;font-weight:700;font-size:clamp(2rem,8vw,2.7rem);line-height:1.02;margin:0;color:var(--tinta);}
  body[data-tpl="marea"] .ma-slogan{font-weight:700;font-size:14.5px;color:var(--marca);margin:8px 0 0;}
  body[data-tpl="marea"] .ma-pill{display:inline-flex;align-items:center;gap:7px;margin-top:13px;font-size:12.5px;font-weight:700;color:#fff;background:var(--acento);padding:7px 16px;border-radius:999px;box-shadow:0 6px 16px rgba(0,0,0,.14);}
  body[data-tpl="marea"] .ma-addr{font-size:11.5px;color:rgba(0,0,0,.5);margin:10px 0 0;}

  /* ---------- NAV ---------- */
  body[data-tpl="marea"] .ma-nav{
    position:sticky;top:0;z-index:20;display:flex;gap:9px;overflow-x:auto;padding:13px 16px;margin:8px -16px 4px;
    background:color-mix(in srgb,var(--crema) 90%,#fff);backdrop-filter:blur(8px);scrollbar-width:none;
  }
  body[data-tpl="marea"] .ma-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="marea"] .ma-nav button{
    flex:0 0 auto;font-family:'Nunito Sans',sans-serif;font-weight:700;font-size:13.5px;color:var(--tinta);
    background:#fff;border:1.5px solid color-mix(in srgb,var(--marca) 18%,#fff);padding:9px 16px;border-radius:999px;cursor:pointer;white-space:nowrap;
    box-shadow:0 3px 10px rgba(11,57,84,.08);transition:all .15s;
  }
  body[data-tpl="marea"] .ma-nav button.active{background:var(--marca);color:#fff;border-color:var(--marca);}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="marea"] .ma-sec{padding-top:16px;scroll-margin-top:60px;}
  body[data-tpl="marea"] .ma-sec-head{display:flex;align-items:center;gap:11px;margin:8px 2px 16px;}
  body[data-tpl="marea"] .ma-sec-tt{font-family:'Fraunces',serif;font-weight:600;font-size:22px;color:var(--tinta);margin:0;}
  body[data-tpl="marea"] .ma-sec-ic{font-size:18px;}

  /* ---------- TARJETAS ---------- */
  body[data-tpl="marea"] .ma-grid{display:flex;flex-direction:column;gap:14px;}
  body[data-tpl="marea"] .ma-card{
    position:relative;display:flex;align-items:center;gap:14px;background:#fff;border-radius:22px;padding:13px;
    box-shadow:0 10px 26px rgba(11,57,84,.10);transition:transform .16s, box-shadow .16s;
  }
  body[data-tpl="marea"] .ma-card:active{transform:translateY(-2px);}
  body[data-tpl="marea"] .ma-media{
    position:relative;flex:0 0 auto;width:80px;height:80px;border-radius:18px;overflow:hidden;display:flex;align-items:center;justify-content:center;
    background:color-mix(in srgb,var(--marca) 12%,#fff);
  }
  body[data-tpl="marea"] .ma-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="marea"] .ma-emoji{font-size:38px;line-height:1;}
  body[data-tpl="marea"] .ma-body{flex:1;min-width:0;}
  body[data-tpl="marea"] .ma-pname{font-weight:800;font-size:15.5px;color:var(--tinta);margin:0 0 3px;line-height:1.18;}
  body[data-tpl="marea"] .ma-pdesc{font-size:12.5px;line-height:1.34;color:rgba(0,0,0,.5);margin:0 0 9px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="marea"] .ma-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;}
  body[data-tpl="marea"] .ma-price{font-family:'Fraunces',serif;font-weight:700;font-size:19px;color:var(--marca);}
  body[data-tpl="marea"] .ma-price small{font-size:12px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="marea"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="marea"] [data-add]{width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;background:var(--acento);color:#fff;font-size:22px;font-weight:800;line-height:1;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 14px color-mix(in srgb,var(--acento) 45%,transparent);transition:transform .12s;}
  body[data-tpl="marea"] [data-add]:active{transform:scale(.85);}
  body[data-tpl="marea"] [data-sub]{width:32px;height:32px;border-radius:50%;border:1.5px solid var(--acento);background:#fff;color:var(--acento);font-size:20px;font-weight:800;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;}
  body[data-tpl="marea"] [data-cant]{display:none;min-width:22px;text-align:center;font-size:16px;font-weight:800;color:var(--tinta);padding:0 4px;}
  body[data-tpl="marea"] [data-qtywrap].has-qty{gap:5px;background:color-mix(in srgb,var(--marca) 8%,#fff);border-radius:999px;padding:3px;}
  body[data-tpl="marea"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="marea"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="marea"] [data-qtywrap].has-qty [data-add]{width:32px;height:32px;font-size:20px;}

  body[data-tpl="marea"] .ma-end{text-align:center;padding:30px 0 8px;color:var(--marca);font-family:'Fraunces',serif;font-size:16px;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="marea"] #cart-fab{background:var(--marca) !important;color:#fff !important;box-shadow:0 10px 26px rgba(11,57,84,.24) !important;font-weight:800 !important;}
  body[data-tpl="marea"] #cart-fab #fab-cant{background:var(--acento) !important;color:#fff !important;}
  body[data-tpl="marea"] #cart h2{font-family:'Fraunces',serif;}
  body[data-tpl="marea"] #cart .cart-row-sub{color:var(--marca) !important;font-family:'Fraunces',serif;font-weight:700;}
  body[data-tpl="marea"] #cart .cart-total strong{color:var(--marca) !important;font-family:'Fraunces',serif;}
  body[data-tpl="marea"] #cart .cart-row .st-add{background:var(--acento) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🦐"));
    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []).map((it) => {
        const media = it.foto ? `<img src="${it.foto}" alt="${it.nombre}">` : `<span class="ma-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="ma-card">
            <div class="ma-media" data-media>${media}</div>
            <div class="ma-body">
              <h3 class="ma-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="ma-pdesc">${it.desc}</p>` : ``}
              <div class="ma-foot"><span class="ma-price"><small>$</small>${Number(it.precio).toFixed(2)}</span><span>${ctrl(it.id)}</span></div>
            </div>
          </article>`;
      }).join("");
      return `<section class="ma-sec" id="cat-${cid}"><div class="ma-sec-head"><span class="ma-sec-ic">🌊</span><h2 class="ma-sec-tt">${cat.categoria}</h2></div><div class="ma-grid">${items}</div></section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`).join("");
    const wave = `<div class="ma-wave"><svg viewBox="0 0 520 34" preserveAspectRatio="none"><path fill="currentColor" d="M0 34 V14 C70 28 110 0 180 8 C250 16 290 30 360 22 C430 14 470 2 520 12 V34 Z"/></svg></div>`;
    root.innerHTML = `
      <header class="ma-hero">
        <div class="ma-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
        <h1 class="ma-name">${R.nombre}</h1>
        ${R.slogan ? `<p class="ma-slogan">${R.slogan}</p>` : ``}
        ${R.direccion ? `<p class="ma-addr">📍 ${R.direccion}</p>` : ``}
        <span class="ma-pill">${R.promo || "🛵 A domicilio o para retirar"}</span>
        ${wave}
      </header>
      <nav class="ma-nav">${navHtml}</nav>
      <div class="ma-wrap">${menuHtml}<div class="ma-end">🌊 ${R.nombre} 🌊</div></div>`;
  },
};
