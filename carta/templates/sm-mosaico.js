window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["sm-mosaico"] = {
  label: "Mosaico Quesoso",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Pacifico&display=swap');

  body[data-tpl="sm-mosaico"]{
    background:
      radial-gradient(circle at 12% 8%, rgba(252,189,67,.10), transparent 38%),
      radial-gradient(circle at 88% 22%, rgba(164,105,75,.16), transparent 42%),
      var(--tinta);
    color:var(--crema);
    font-family:'Fredoka',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;
  }

  /* ---------- HEADER ---------- */
  body[data-tpl="sm-mosaico"] .sm-header{
    position:relative;
    text-align:center;
    padding:30px 20px 0;
    overflow:hidden;
  }
  body[data-tpl="sm-mosaico"] .sm-header::before,
  body[data-tpl="sm-mosaico"] .sm-header::after{
    content:"";
    position:absolute;top:-30px;
    width:140px;height:140px;border-radius:50%;
    background:radial-gradient(circle at 40% 35%, rgba(252,189,67,.28), rgba(252,189,67,.05) 70%);
    filter:blur(2px);pointer-events:none;
  }
  body[data-tpl="sm-mosaico"] .sm-header::before{left:-46px;}
  body[data-tpl="sm-mosaico"] .sm-header::after{right:-50px;top:30px;width:110px;height:110px;}

  body[data-tpl="sm-mosaico"] .sm-logo{
    position:relative;
    width:108px;height:108px;
    margin:0 auto 12px;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    background:var(--crema);
    border:4px solid var(--marca);
    box-shadow:0 14px 30px rgba(0,0,0,.34), inset 0 0 0 6px var(--tinta);
    overflow:hidden;
  }
  body[data-tpl="sm-mosaico"] .sm-logo img{
    width:100%;height:100%;object-fit:cover;border-radius:50%;
  }
  body[data-tpl="sm-mosaico"] .sm-logo .sm-logo-fb{
    font-size:54px;line-height:1;
  }

  body[data-tpl="sm-mosaico"] .sm-name{
    font-weight:700;
    font-size:34px;
    letter-spacing:.4px;
    line-height:1.05;
    color:var(--crema);
    text-shadow:0 2px 0 rgba(0,0,0,.18);
  }
  body[data-tpl="sm-mosaico"] .sm-name b{color:var(--marca);font-weight:700;}

  body[data-tpl="sm-mosaico"] .sm-slogan{
    font-family:'Pacifico',cursive;
    font-size:19px;
    color:var(--marca);
    margin-top:4px;
    font-weight:400;
  }

  /* queso que chorrea como divisor del header */
  body[data-tpl="sm-mosaico"] .sm-drip{
    position:relative;
    height:26px;
    margin:18px 0 4px;
    background:var(--marca);
    border-radius:0 0 4px 4px;
  }
  body[data-tpl="sm-mosaico"] .sm-drip::after{
    content:"";
    position:absolute;left:0;right:0;bottom:-15px;height:20px;
    background:
      radial-gradient(12px 18px at 12% 0, var(--marca) 49%, transparent 51%),
      radial-gradient(10px 14px at 30% 0, var(--marca) 49%, transparent 51%),
      radial-gradient(14px 22px at 50% 0, var(--marca) 49%, transparent 51%),
      radial-gradient(9px 13px at 68% 0, var(--marca) 49%, transparent 51%),
      radial-gradient(12px 18px at 86% 0, var(--marca) 49%, transparent 51%);
    background-repeat:no-repeat;
  }
  body[data-tpl="sm-mosaico"] .sm-drip .sm-dot{
    position:absolute;top:7px;width:9px;height:9px;border-radius:50%;
    background:var(--tinta);opacity:.35;
  }
  body[data-tpl="sm-mosaico"] .sm-drip .sm-dot:nth-child(1){left:20%;}
  body[data-tpl="sm-mosaico"] .sm-drip .sm-dot:nth-child(2){left:50%;}
  body[data-tpl="sm-mosaico"] .sm-drip .sm-dot:nth-child(3){left:80%;}

  /* ---------- NAV CATEGORIAS ---------- */
  body[data-tpl="sm-mosaico"] .sm-nav{
    position:sticky;top:0;z-index:20;
    display:flex;gap:8px;
    padding:14px 14px 12px;
    margin-top:18px;
    overflow-x:auto;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:none;
    background:linear-gradient(var(--tinta) 72%, transparent);
  }
  body[data-tpl="sm-mosaico"] .sm-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="sm-mosaico"] .sm-nav button{
    flex:0 0 auto;
    font-family:'Fredoka',sans-serif;
    font-weight:600;
    font-size:14px;
    padding:9px 16px;
    border-radius:999px;
    border:1.5px solid rgba(253,248,218,.30);
    background:transparent;
    color:var(--crema);
    cursor:pointer;
    white-space:nowrap;
    transition:.18s;
  }
  body[data-tpl="sm-mosaico"] .sm-nav button:hover{border-color:var(--marca);}
  body[data-tpl="sm-mosaico"] .sm-nav button.active{
    background:var(--marca);
    color:var(--tinta);
    border-color:var(--marca);
    box-shadow:0 6px 14px rgba(252,189,67,.30);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="sm-mosaico"] .sm-section{
    padding:6px 14px 10px;
    scroll-margin-top:64px;
  }
  body[data-tpl="sm-mosaico"] .sm-cat-head{
    display:flex;align-items:center;gap:12px;
    margin:18px 2px 14px;
  }
  body[data-tpl="sm-mosaico"] .sm-cat-head .sm-cheese{
    width:26px;height:26px;border-radius:50%;
    background:var(--marca);
    position:relative;flex:0 0 auto;
    box-shadow:0 3px 8px rgba(252,189,67,.4);
  }
  body[data-tpl="sm-mosaico"] .sm-cat-head .sm-cheese::before,
  body[data-tpl="sm-mosaico"] .sm-cat-head .sm-cheese::after{
    content:"";position:absolute;border-radius:50%;background:var(--acento);opacity:.65;
  }
  body[data-tpl="sm-mosaico"] .sm-cat-head .sm-cheese::before{width:6px;height:6px;top:6px;left:7px;}
  body[data-tpl="sm-mosaico"] .sm-cat-head .sm-cheese::after{width:4px;height:4px;bottom:6px;right:7px;}
  body[data-tpl="sm-mosaico"] .sm-cat-head h2{
    font-family:'Fredoka',sans-serif;
    font-weight:700;
    font-size:22px;
    color:var(--crema);
    letter-spacing:.3px;
  }
  body[data-tpl="sm-mosaico"] .sm-cat-head .sm-line{
    flex:1;height:2px;border-radius:2px;
    background:linear-gradient(90deg, var(--marca), transparent);
  }

  /* ---------- GRID MOSAICO ---------- */
  body[data-tpl="sm-mosaico"] .sm-grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:12px;
  }
  body[data-tpl="sm-mosaico"] .sm-card{
    position:relative;
    border-radius:20px;
    padding:14px 14px 16px;
    display:flex;flex-direction:column;
    min-height:172px;
    overflow:hidden;
    box-shadow:0 10px 22px rgba(0,0,0,.26);
    transition:transform .18s ease;
  }
  body[data-tpl="sm-mosaico"] .sm-card:active{transform:scale(.985);}

  /* tarjeta grande (ocupa fila completa) */
  body[data-tpl="sm-mosaico"] .sm-card.wide{
    grid-column:1 / -1;
    flex-direction:row;
    align-items:center;
    min-height:120px;
    gap:14px;
  }

  /* variante BEIGE */
  body[data-tpl="sm-mosaico"] .sm-card.beige{
    background:var(--crema);
    color:var(--tinta);
    border:1px solid rgba(106,27,55,.10);
  }
  body[data-tpl="sm-mosaico"] .sm-card.beige .sm-pname{color:var(--tinta);}
  body[data-tpl="sm-mosaico"] .sm-card.beige .sm-pdesc{color:rgba(106,27,55,.62);}

  /* variante VINO con borde amarillo */
  body[data-tpl="sm-mosaico"] .sm-card.wine{
    background:linear-gradient(160deg, rgba(252,189,67,.07), rgba(164,105,75,.10)), var(--tinta);
    color:var(--crema);
    border:1.5px solid var(--marca);
  }
  body[data-tpl="sm-mosaico"] .sm-card.wine .sm-pname{color:var(--crema);}
  body[data-tpl="sm-mosaico"] .sm-card.wine .sm-pdesc{color:rgba(253,248,218,.66);}

  /* media: emoji o foto */
  body[data-tpl="sm-mosaico"] .sm-media{
    width:100%;
    aspect-ratio:16/10;
    border-radius:14px;
    display:flex;align-items:center;justify-content:center;
    margin-bottom:10px;
    overflow:hidden;
    flex:0 0 auto;
  }
  body[data-tpl="sm-mosaico"] .sm-card.wide .sm-media{
    width:84px;height:84px;aspect-ratio:auto;margin-bottom:0;border-radius:50%;
  }
  body[data-tpl="sm-mosaico"] .sm-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="sm-mosaico"] .sm-media .sm-emoji{
    font-size:46px;line-height:1;
    filter:drop-shadow(0 4px 6px rgba(0,0,0,.22));
  }
  body[data-tpl="sm-mosaico"] .sm-card.wide .sm-media .sm-emoji{font-size:40px;}
  /* fondo del media segun variante */
  body[data-tpl="sm-mosaico"] .sm-card.beige .sm-media{
    background:
      radial-gradient(circle at 70% 25%, rgba(252,189,67,.40), transparent 55%),
      linear-gradient(135deg, rgba(106,27,55,.07), rgba(164,105,75,.12));
  }
  body[data-tpl="sm-mosaico"] .sm-card.wine .sm-media{
    background:
      radial-gradient(circle at 30% 30%, rgba(252,189,67,.22), transparent 60%),
      rgba(0,0,0,.18);
    border:1px solid rgba(252,189,67,.30);
  }

  body[data-tpl="sm-mosaico"] .sm-body{
    display:flex;flex-direction:column;flex:1 1 auto;min-width:0;
  }
  body[data-tpl="sm-mosaico"] .sm-pname{
    font-family:'Fredoka',sans-serif;
    font-weight:600;
    font-size:16px;
    line-height:1.15;
    letter-spacing:.2px;
  }
  body[data-tpl="sm-mosaico"] .sm-pdesc{
    font-size:12px;
    font-weight:400;
    line-height:1.3;
    margin-top:4px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
    overflow:hidden;
  }
  body[data-tpl="sm-mosaico"] .sm-foot{
    display:flex;align-items:center;justify-content:space-between;
    margin-top:auto;padding-top:12px;gap:8px;
  }
  body[data-tpl="sm-mosaico"] .sm-price{
    font-family:'Fredoka',sans-serif;
    font-weight:700;
    font-size:18px;
    color:var(--marca);
    white-space:nowrap;
  }
  body[data-tpl="sm-mosaico"] .sm-card.beige .sm-price{
    color:var(--acento);
  }
  body[data-tpl="sm-mosaico"] .sm-price small{font-size:11px;font-weight:500;opacity:.8;}

  /* ---------- CONTROL DE CANTIDAD (ctrl) ---------- */
  body[data-tpl="sm-mosaico"] [data-qtywrap]{
    display:flex;align-items:center;gap:0;
  }
  body[data-tpl="sm-mosaico"] [data-add],
  body[data-tpl="sm-mosaico"] [data-sub]{
    width:34px;height:34px;
    border:none;border-radius:50%;
    font-family:'Fredoka',sans-serif;
    font-weight:600;font-size:20px;line-height:1;
    cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:.15s;
  }
  body[data-tpl="sm-mosaico"] [data-add]{
    background:var(--marca);
    color:var(--tinta);
    box-shadow:0 5px 12px rgba(252,189,67,.36);
  }
  body[data-tpl="sm-mosaico"] [data-add]:active{transform:scale(.9);}
  body[data-tpl="sm-mosaico"] [data-sub]{
    background:transparent;
    color:var(--marca);
    border:1.5px solid var(--marca);
    width:30px;height:30px;font-size:18px;
    opacity:0;transform:scale(.4);
    pointer-events:none;
    transition:.18s;
  }
  body[data-tpl="sm-mosaico"] [data-cant]{
    min-width:0;width:0;
    text-align:center;
    font-family:'Fredoka',sans-serif;
    font-weight:700;font-size:16px;
    overflow:hidden;
    opacity:0;
    transition:.18s;
  }
  body[data-tpl="sm-mosaico"] .sm-card.beige [data-cant]{color:var(--tinta);}
  body[data-tpl="sm-mosaico"] .sm-card.wine [data-cant]{color:var(--crema);}
  /* estado con cantidad > 0 */
  body[data-tpl="sm-mosaico"] [data-qtywrap].has-qty{gap:6px;}
  body[data-tpl="sm-mosaico"] [data-qtywrap].has-qty [data-sub]{
    opacity:1;transform:scale(1);pointer-events:auto;
  }
  body[data-tpl="sm-mosaico"] [data-qtywrap].has-qty [data-cant]{
    width:22px;opacity:1;
  }

  /* ---------- FAB CARRITO ---------- */
  body[data-tpl="sm-mosaico"] #cart-fab{
    background:var(--marca)!important;
    color:var(--tinta)!important;
    box-shadow:0 12px 28px rgba(252,189,67,.45), 0 4px 10px rgba(0,0,0,.3)!important;
    border:3px solid var(--tinta)!important;
    font-family:'Fredoka',sans-serif!important;
    font-weight:700!important;
  }
  body[data-tpl="sm-mosaico"] #cart-fab *{color:var(--tinta)!important;}
  body[data-tpl="sm-mosaico"] #cart-fab .badge,
  body[data-tpl="sm-mosaico"] #cart-fab [class*="badge"]{
    background:var(--tinta)!important;
    color:var(--marca)!important;
    border:2px solid var(--marca)!important;
  }

  /* ---------- PANEL CARRITO ---------- */
  body[data-tpl="sm-mosaico"] #cart{
    background:var(--tinta)!important;
    color:var(--crema)!important;
    border-top:4px solid var(--marca)!important;
    border-radius:24px 24px 0 0!important;
    font-family:'Fredoka',sans-serif!important;
  }
  body[data-tpl="sm-mosaico"] #cart h1,
  body[data-tpl="sm-mosaico"] #cart h2,
  body[data-tpl="sm-mosaico"] #cart h3,
  body[data-tpl="sm-mosaico"] #cart .cart-title{color:var(--crema)!important;}
  body[data-tpl="sm-mosaico"] #cart .cart-row{
    border-bottom:1px solid rgba(253,248,218,.14)!important;
    color:var(--crema)!important;
  }
  body[data-tpl="sm-mosaico"] #cart .cart-row .price,
  body[data-tpl="sm-mosaico"] #cart .cart-total,
  body[data-tpl="sm-mosaico"] #cart [class*="total"]{
    color:var(--marca)!important;
  }
  body[data-tpl="sm-mosaico"] #cart button[class*="check"],
  body[data-tpl="sm-mosaico"] #cart .cart-checkout,
  body[data-tpl="sm-mosaico"] #cart .btn-primary{
    background:var(--marca)!important;
    color:var(--tinta)!important;
    border:none!important;
    font-family:'Fredoka',sans-serif!important;
    font-weight:700!important;
    border-radius:14px!important;
  }
  body[data-tpl="sm-mosaico"] #cart [data-add],
  body[data-tpl="sm-mosaico"] #cart [data-sub]{
    background:rgba(252,189,67,.16)!important;
    color:var(--marca)!important;
  }

  /* ---------- FOOTER ---------- */
  body[data-tpl="sm-mosaico"] .sm-footer{
    text-align:center;
    padding:26px 20px 120px;
    color:rgba(253,248,218,.55);
    font-size:13px;
  }
  body[data-tpl="sm-mosaico"] .sm-footer .sm-foot-cheese{
    font-size:20px;display:block;margin-bottom:6px;
  }
  `,
  render(R, root, ctrl, slug) {
    const cats = (R.menu || []);

    const navHtml = cats.length > 1 ? `
      <nav class="sm-nav">
        ${cats.map((cat, i) => `
          <button data-cat="${slug(cat.categoria)}" class="${i === 0 ? 'active' : ''}">${cat.categoria}</button>
        `).join('')}
      </nav>` : '';

    const sectionsHtml = cats.map((cat) => {
      const items = (cat.items || []);
      const cardsHtml = items.map((it, idx) => {
        // patron mosaico: alterna beige / vino; cada 5to item es wide
        const isWide = (idx % 5 === 0) && idx !== 0;
        const variant = (idx % 2 === 0) ? 'beige' : 'wine';
        const media = it.foto
          ? `<img src="${it.foto}" alt="${it.nombre}">`
          : `<span class="sm-emoji">${it.emoji || '🧀'}</span>`;
        const descHtml = it.desc ? `<p class="sm-pdesc">${it.desc}</p>` : '';
        return `
          <article class="sm-card ${variant}${isWide ? ' wide' : ''}">
            <div class="sm-media">${media}</div>
            <div class="sm-body">
              <h3 class="sm-pname">${it.nombre}</h3>
              ${descHtml}
              <div class="sm-foot">
                <span class="sm-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
                ${ctrl(it.id)}
              </div>
            </div>
          </article>`;
      }).join('');

      return `
        <section class="sm-section" id="cat-${slug(cat.categoria)}">
          <div class="sm-cat-head">
            <span class="sm-cheese"></span>
            <h2>${cat.categoria}</h2>
            <span class="sm-line"></span>
          </div>
          <div class="sm-grid">
            ${cardsHtml}
          </div>
        </section>`;
    }).join('');

    root.innerHTML = `
      <header class="sm-header">
        <div class="sm-logo">
          ${R.logo
            ? `<img src="${R.logo}" alt="${R.nombre}">`
            : `<span class="sm-logo-fb">🧀</span>`}
        </div>
        <div class="sm-name">${R.nombre}</div>
        ${R.slogan ? `<div class="sm-slogan">${R.slogan}</div>` : ''}
        <div class="sm-drip">
          <span class="sm-dot"></span>
          <span class="sm-dot"></span>
          <span class="sm-dot"></span>
        </div>
      </header>

      ${navHtml}

      <main class="sm-menu">
        ${sectionsHtml}
      </main>

      <footer class="sm-footer">
        <span class="sm-foot-cheese">🧀</span>
        ${R.nombre} · ${R.slogan || 'Tan quesoso como delicioso'}
      </footer>
    `;
  }
};
