window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["dulce"] = {
  label: "Dulce Antojo",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap');

  body[data-tpl="dulce"]{
    margin:0;background:var(--crema);color:var(--tinta);
    font-family:'Nunito',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
    padding-bottom:120px;overflow-x:hidden;
  }
  body[data-tpl="dulce"] *{box-sizing:border-box;}
  body[data-tpl="dulce"] .du-wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---------- HERO ---------- */
  body[data-tpl="dulce"] .du-hero{position:relative;text-align:center;padding:30px 0 16px;overflow:hidden;}
  body[data-tpl="dulce"] .du-blob{position:absolute;border-radius:50% 48% 52% 47%;filter:blur(8px);opacity:.5;z-index:0;}
  body[data-tpl="dulce"] .du-blob.b1{width:150px;height:150px;background:var(--marca);top:-30px;left:-40px;}
  body[data-tpl="dulce"] .du-blob.b2{width:120px;height:120px;background:var(--acento);top:10px;right:-30px;}
  body[data-tpl="dulce"] .du-hero > *{position:relative;z-index:1;}
  body[data-tpl="dulce"] .du-logo{
    width:116px;height:116px;margin:0 auto 13px;border-radius:50%;overflow:hidden;
    border:5px solid #fff;box-shadow:0 14px 30px color-mix(in srgb,var(--marca) 30%,transparent);background:#fff;
  }
  body[data-tpl="dulce"] .du-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="dulce"] .du-name{font-family:'Fredoka',sans-serif;font-weight:700;font-size:clamp(2.1rem,8.5vw,2.8rem);line-height:1;margin:0;color:var(--tinta);}
  body[data-tpl="dulce"] .du-slogan{font-family:'Fredoka',sans-serif;font-weight:500;font-size:16px;color:var(--marca);margin:7px 0 0;}
  body[data-tpl="dulce"] .du-pill{display:inline-flex;align-items:center;gap:7px;margin-top:13px;font-family:'Fredoka',sans-serif;font-size:13px;font-weight:500;color:#fff;background:var(--acento);padding:8px 17px;border-radius:999px;box-shadow:0 8px 18px color-mix(in srgb,var(--acento) 40%,transparent);}
  body[data-tpl="dulce"] .du-addr{font-size:11.5px;color:rgba(0,0,0,.5);margin:11px 0 0;}

  /* ---------- NAV ---------- */
  body[data-tpl="dulce"] .du-nav{position:sticky;top:0;z-index:20;display:flex;gap:9px;overflow-x:auto;padding:13px 16px;margin:10px -16px 4px;background:color-mix(in srgb,var(--crema) 88%,#fff);backdrop-filter:blur(8px);scrollbar-width:none;}
  body[data-tpl="dulce"] .du-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="dulce"] .du-nav button{flex:0 0 auto;font-family:'Fredoka',sans-serif;font-weight:500;font-size:13.5px;color:var(--tinta);background:#fff;border:2px solid color-mix(in srgb,var(--marca) 16%,#fff);padding:8px 16px;border-radius:999px;cursor:pointer;white-space:nowrap;box-shadow:0 3px 10px color-mix(in srgb,var(--marca) 12%,transparent);transition:all .15s;}
  body[data-tpl="dulce"] .du-nav button.active{background:var(--marca);color:#fff;border-color:var(--marca);}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="dulce"] .du-sec{padding-top:16px;scroll-margin-top:60px;}
  body[data-tpl="dulce"] .du-sec-head{display:flex;align-items:center;gap:10px;margin:8px 4px 16px;}
  body[data-tpl="dulce"] .du-sec-ic{font-size:24px;}
  body[data-tpl="dulce"] .du-sec-tt{font-family:'Fredoka',sans-serif;font-weight:600;font-size:21px;color:var(--tinta);margin:0;}

  /* ---------- TARJETAS ---------- */
  body[data-tpl="dulce"] .du-grid{display:flex;flex-direction:column;gap:14px;}
  body[data-tpl="dulce"] .du-card{position:relative;display:flex;align-items:center;gap:14px;background:#fff;border-radius:24px;padding:13px;box-shadow:0 10px 24px color-mix(in srgb,var(--marca) 14%,transparent);transition:transform .16s;}
  body[data-tpl="dulce"] .du-card:active{transform:scale(.98);}
  body[data-tpl="dulce"] .du-media{position:relative;flex:0 0 auto;width:80px;height:80px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--acento) 16%,#fff);}
  body[data-tpl="dulce"] .du-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="dulce"] .du-emoji{font-size:38px;line-height:1;}
  body[data-tpl="dulce"] .du-body{flex:1;min-width:0;}
  body[data-tpl="dulce"] .du-pname{font-family:'Fredoka',sans-serif;font-weight:600;font-size:16px;color:var(--tinta);margin:0 0 3px;line-height:1.18;}
  body[data-tpl="dulce"] .du-pdesc{font-size:12.5px;line-height:1.34;color:rgba(0,0,0,.5);margin:0 0 9px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="dulce"] .du-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;}
  body[data-tpl="dulce"] .du-price{font-family:'Fredoka',sans-serif;font-weight:700;font-size:18px;color:var(--marca);}
  body[data-tpl="dulce"] .du-price small{font-size:12px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="dulce"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="dulce"] [data-add]{width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;background:var(--acento);color:#fff;font-size:22px;font-weight:600;line-height:1;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 14px color-mix(in srgb,var(--acento) 45%,transparent);transition:transform .14s;}
  body[data-tpl="dulce"] [data-add]:active{transform:scale(.82);}
  body[data-tpl="dulce"] [data-sub]{width:32px;height:32px;border-radius:50%;border:2px solid var(--acento);background:#fff;color:var(--acento);font-size:20px;font-weight:600;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;}
  body[data-tpl="dulce"] [data-cant]{display:none;min-width:22px;text-align:center;font-family:'Fredoka',sans-serif;font-size:16px;font-weight:700;color:var(--tinta);padding:0 4px;}
  body[data-tpl="dulce"] [data-qtywrap].has-qty{gap:5px;background:color-mix(in srgb,var(--acento) 10%,#fff);border-radius:999px;padding:3px;}
  body[data-tpl="dulce"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="dulce"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="dulce"] [data-qtywrap].has-qty [data-add]{width:32px;height:32px;font-size:20px;}

  body[data-tpl="dulce"] .du-end{text-align:center;padding:30px 0 8px;font-family:'Fredoka',sans-serif;color:var(--marca);font-size:17px;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="dulce"] #cart-fab{background:var(--marca) !important;color:#fff !important;border-radius:18px !important;box-shadow:0 10px 26px color-mix(in srgb,var(--marca) 35%,transparent) !important;font-family:'Fredoka',sans-serif !important;font-weight:500 !important;}
  body[data-tpl="dulce"] #cart-fab #fab-cant{background:var(--acento) !important;color:#fff !important;}
  body[data-tpl="dulce"] #cart{border-radius:26px 26px 0 0 !important;}
  body[data-tpl="dulce"] #cart h2{font-family:'Fredoka',sans-serif;}
  body[data-tpl="dulce"] #cart .cart-row-sub{color:var(--marca) !important;font-family:'Fredoka',sans-serif;font-weight:700;}
  body[data-tpl="dulce"] #cart .cart-total strong{color:var(--marca) !important;font-family:'Fredoka',sans-serif;}
  body[data-tpl="dulce"] #cart .cart-row .st-add{background:var(--acento) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍓"));
    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const ic = emo({ nombre: cat.categoria }, cat.categoria);
      const items = (cat.items || []).map((it) => {
        const media = it.foto ? `<img src="${it.foto}" alt="${it.nombre}">` : `<span class="du-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="du-card">
            <div class="du-media" data-media>${media}</div>
            <div class="du-body">
              <h3 class="du-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="du-pdesc">${it.desc}</p>` : ``}
              <div class="du-foot"><span class="du-price"><small>$</small>${Number(it.precio).toFixed(2)}</span><span>${ctrl(it.id)}</span></div>
            </div>
          </article>`;
      }).join("");
      return `<section class="du-sec" id="cat-${cid}"><div class="du-sec-head"><span class="du-sec-ic">${ic}</span><h2 class="du-sec-tt">${cat.categoria}</h2></div><div class="du-grid">${items}</div></section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <div class="du-wrap">
        <header class="du-hero">
          <span class="du-blob b1"></span><span class="du-blob b2"></span>
          <div class="du-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
          <h1 class="du-name">${R.nombre}</h1>
          ${R.slogan ? `<p class="du-slogan">${R.slogan}</p>` : ``}
          ${R.direccion ? `<p class="du-addr">📍 ${R.direccion}</p>` : ``}
          <span class="du-pill">${R.promo || "🛵 A domicilio o para retirar"}</span>
        </header>
      </div>
      <nav class="du-nav">${navHtml}</nav>
      <div class="du-wrap">${menuHtml}<div class="du-end">🍓 ${R.nombre} 🍓</div></div>`;
  },
};
