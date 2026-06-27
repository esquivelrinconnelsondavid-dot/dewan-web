window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["trattoria"] = {
  label: "Trattoria",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,600&family=Lora:wght@400;500;600&display=swap');

  body[data-tpl="trattoria"]{
    margin:0;background:var(--crema);color:var(--tinta);
    font-family:'Lora',Georgia,serif;-webkit-font-smoothing:antialiased;
    padding-bottom:120px;overflow-x:hidden;
  }
  body[data-tpl="trattoria"] *{box-sizing:border-box;}
  body[data-tpl="trattoria"] .tr-wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---------- HERO ---------- */
  body[data-tpl="trattoria"] .tr-tricolor{height:5px;display:flex;}
  body[data-tpl="trattoria"] .tr-tricolor i{flex:1;}
  body[data-tpl="trattoria"] .tr-tricolor i:nth-child(1){background:#1E7A3D;}
  body[data-tpl="trattoria"] .tr-tricolor i:nth-child(2){background:#fff;}
  body[data-tpl="trattoria"] .tr-tricolor i:nth-child(3){background:#C8442E;}
  body[data-tpl="trattoria"] .tr-hero{text-align:center;padding:26px 0 14px;}
  body[data-tpl="trattoria"] .tr-logo{
    width:108px;height:108px;margin:0 auto 14px;border-radius:50%;overflow:hidden;
    border:4px solid #fff;box-shadow:0 12px 30px rgba(60,40,20,.22);background:#fff;
  }
  body[data-tpl="trattoria"] .tr-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="trattoria"] .tr-name{
    font-family:'Playfair Display',serif;font-weight:800;font-size:clamp(2rem,8vw,2.7rem);
    line-height:1.02;margin:0;color:var(--tinta);
  }
  body[data-tpl="trattoria"] .tr-slogan{
    font-family:'Playfair Display',serif;font-style:italic;font-weight:500;
    font-size:16px;color:var(--marca);margin:9px 0 0;
  }
  body[data-tpl="trattoria"] .tr-orn{
    display:flex;align-items:center;justify-content:center;gap:10px;margin:14px 0 2px;color:var(--marca);
  }
  body[data-tpl="trattoria"] .tr-orn::before,
  body[data-tpl="trattoria"] .tr-orn::after{content:"";width:46px;height:1px;background:currentColor;opacity:.5;}
  body[data-tpl="trattoria"] .tr-pill{
    display:inline-flex;align-items:center;gap:7px;margin-top:12px;
    font-family:'Lora',serif;font-size:12.5px;font-weight:600;letter-spacing:.3px;
    color:#fff;background:var(--marca);padding:7px 16px;border-radius:999px;
    box-shadow:0 6px 16px rgba(0,0,0,.16);
  }
  body[data-tpl="trattoria"] .tr-addr{font-size:11.5px;color:rgba(0,0,0,.5);margin:11px 0 0;}

  /* ---------- NAV ---------- */
  body[data-tpl="trattoria"] .tr-nav{
    position:sticky;top:0;z-index:20;display:flex;gap:9px;overflow-x:auto;
    padding:13px 16px;margin:14px -16px 4px;background:color-mix(in srgb,var(--crema) 90%,#fff);
    backdrop-filter:blur(8px);border-top:1px solid rgba(0,0,0,.07);border-bottom:1px solid rgba(0,0,0,.07);
    scrollbar-width:none;
  }
  body[data-tpl="trattoria"] .tr-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="trattoria"] .tr-nav button{
    flex:0 0 auto;font-family:'Lora',serif;font-weight:600;font-size:13.5px;color:var(--tinta);
    background:#fff;border:1px solid rgba(0,0,0,.12);padding:9px 16px;border-radius:999px;cursor:pointer;white-space:nowrap;
    box-shadow:0 2px 6px rgba(60,40,20,.08);transition:all .15s;
  }
  body[data-tpl="trattoria"] .tr-nav button.active{background:var(--marca);color:#fff;border-color:var(--marca);}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="trattoria"] .tr-sec{padding-top:16px;scroll-margin-top:60px;}
  body[data-tpl="trattoria"] .tr-sec-head{text-align:center;margin:6px 0 18px;}
  body[data-tpl="trattoria"] .tr-sec-tt{
    font-family:'Playfair Display',serif;font-weight:700;font-size:24px;color:var(--tinta);margin:0;
  }
  body[data-tpl="trattoria"] .tr-sec-sub{display:inline-block;width:40px;height:2px;background:var(--marca);margin-top:8px;border-radius:2px;}

  /* ---------- TARJETAS ---------- */
  body[data-tpl="trattoria"] .tr-grid{display:flex;flex-direction:column;gap:14px;}
  body[data-tpl="trattoria"] .tr-card{
    position:relative;display:flex;align-items:center;gap:14px;background:#fff;border-radius:16px;padding:13px;
    box-shadow:0 8px 22px rgba(80,50,25,.10);border-top:3px solid var(--marca);
    transition:transform .16s, box-shadow .16s;
  }
  body[data-tpl="trattoria"] .tr-card:active{transform:translateY(-2px);}
  body[data-tpl="trattoria"] .tr-media{
    position:relative;flex:0 0 auto;width:78px;height:78px;border-radius:50%;overflow:hidden;
    display:flex;align-items:center;justify-content:center;
    background:color-mix(in srgb,var(--marca) 10%,#fff);border:2px solid color-mix(in srgb,var(--marca) 30%,#fff);
  }
  body[data-tpl="trattoria"] .tr-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="trattoria"] .tr-emoji{font-size:36px;line-height:1;}
  body[data-tpl="trattoria"] .tr-body{flex:1;min-width:0;}
  body[data-tpl="trattoria"] .tr-pname{font-family:'Playfair Display',serif;font-weight:700;font-size:16.5px;color:var(--tinta);margin:0 0 3px;line-height:1.18;}
  body[data-tpl="trattoria"] .tr-pdesc{
    font-size:12.5px;font-style:italic;line-height:1.34;color:rgba(0,0,0,.5);margin:0 0 9px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="trattoria"] .tr-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;}
  body[data-tpl="trattoria"] .tr-price{font-family:'Playfair Display',serif;font-weight:800;font-size:19px;color:var(--acento);}
  body[data-tpl="trattoria"] .tr-price small{font-size:12px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="trattoria"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="trattoria"] [data-add]{
    width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;background:var(--marca);color:#fff;
    font-size:22px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 5px 13px rgba(0,0,0,.2);transition:transform .12s;
  }
  body[data-tpl="trattoria"] [data-add]:active{transform:scale(.9);}
  body[data-tpl="trattoria"] [data-sub]{
    width:32px;height:32px;border-radius:50%;border:1.5px solid var(--marca);background:#fff;color:var(--marca);
    font-size:20px;font-weight:700;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="trattoria"] [data-cant]{display:none;min-width:22px;text-align:center;font-size:16px;font-weight:700;color:var(--tinta);padding:0 4px;}
  body[data-tpl="trattoria"] [data-qtywrap].has-qty{gap:5px;background:color-mix(in srgb,var(--marca) 8%,#fff);border:1px solid color-mix(in srgb,var(--marca) 30%,#fff);border-radius:999px;padding:3px;}
  body[data-tpl="trattoria"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="trattoria"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="trattoria"] [data-qtywrap].has-qty [data-add]{width:32px;height:32px;font-size:20px;}

  body[data-tpl="trattoria"] .tr-end{text-align:center;padding:30px 0 8px;font-family:'Playfair Display',serif;font-style:italic;color:var(--marca);font-size:16px;}

  /* ---------- CARRITO ---------- */
  body[data-tpl="trattoria"] #cart-fab{background:var(--marca) !important;color:#fff !important;box-shadow:0 10px 26px rgba(0,0,0,.22) !important;font-family:'Lora',serif !important;font-weight:600 !important;}
  body[data-tpl="trattoria"] #cart-fab #fab-cant{background:#fff !important;color:var(--marca) !important;}
  body[data-tpl="trattoria"] #cart h2{font-family:'Playfair Display',serif;}
  body[data-tpl="trattoria"] #cart .cart-row-sub{color:var(--acento) !important;font-family:'Playfair Display',serif;font-weight:800;}
  body[data-tpl="trattoria"] #cart .cart-total strong{color:var(--acento) !important;font-family:'Playfair Display',serif;}
  body[data-tpl="trattoria"] #cart .cart-row .st-add{background:var(--marca) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍝"));
    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []).map((it) => {
        const media = it.foto ? `<img src="${it.foto}" alt="${it.nombre}">` : `<span class="tr-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="tr-card">
            <div class="tr-media" data-media>${media}</div>
            <div class="tr-body">
              <h3 class="tr-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="tr-pdesc">${it.desc}</p>` : ``}
              <div class="tr-foot">
                <span class="tr-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
                <span>${ctrl(it.id)}</span>
              </div>
            </div>
          </article>`;
      }).join("");
      return `
        <section class="tr-sec" id="cat-${cid}">
          <div class="tr-sec-head"><h2 class="tr-sec-tt">${cat.categoria}</h2><br><span class="tr-sec-sub"></span></div>
          <div class="tr-grid">${items}</div>
        </section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <div class="tr-tricolor"><i></i><i></i><i></i></div>
      <div class="tr-wrap">
        <header class="tr-hero">
          <div class="tr-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
          <h1 class="tr-name">${R.nombre}</h1>
          ${R.slogan ? `<p class="tr-slogan">${R.slogan}</p>` : ``}
          <div class="tr-orn">✦</div>
          ${R.direccion ? `<p class="tr-addr">📍 ${R.direccion}</p>` : ``}
          <span class="tr-pill">${R.promo || "🛵 A domicilio o para retirar"}</span>
        </header>
      </div>
      <nav class="tr-nav">${navHtml}</nav>
      <div class="tr-wrap">
        ${menuHtml}
        <div class="tr-end">✦ ${R.nombre} ✦</div>
      </div>`;
  },
};
