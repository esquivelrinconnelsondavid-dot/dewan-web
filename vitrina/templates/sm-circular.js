window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["sm-circular"] = {
  label: "Queso Redondo",
  css: `
  /* ===== Sr. moro — Queso Redondo (sm-circular) ===== */
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Pacifico&display=swap');

  body[data-tpl="sm-circular"]{
    margin:0;
    background:
      radial-gradient(circle at 12% 8%, rgba(252,189,67,.10), transparent 32%),
      radial-gradient(circle at 88% 22%, rgba(164,105,75,.16), transparent 38%),
      radial-gradient(circle at 50% 120%, rgba(252,189,67,.08), transparent 40%),
      var(--tinta);
    color:var(--crema);
    font-family:'Fredoka',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility;
    padding-bottom:118px;
    overflow-x:hidden;
  }
  body[data-tpl="sm-circular"] *{box-sizing:border-box;}

  body[data-tpl="sm-circular"] .sm-wrap{
    max-width:520px;
    margin:0 auto;
    padding:0 16px;
  }

  /* ---------- decorative drip divider ---------- */
  body[data-tpl="sm-circular"] .sm-drip{
    display:block;
    width:100%;
    height:26px;
    margin:6px 0 2px;
    color:var(--marca);
    opacity:.92;
  }
  body[data-tpl="sm-circular"] .sm-drip svg{display:block;width:100%;height:100%;}

  /* ---------- HEADER ---------- */
  body[data-tpl="sm-circular"] .sm-head{
    position:relative;
    text-align:center;
    padding:30px 0 12px;
  }
  body[data-tpl="sm-circular"] .sm-medallon{
    position:relative;
    width:140px;height:140px;
    margin:0 auto 14px;
  }
  body[data-tpl="sm-circular"] .sm-medallon::before{
    content:"";
    position:absolute;inset:-9px;
    border-radius:50%;
    border:2px dashed rgba(252,189,67,.55);
    animation:sm-spin 38s linear infinite;
  }
  @keyframes sm-spin{to{transform:rotate(360deg);}}
  body[data-tpl="sm-circular"] .sm-coin{
    position:absolute;inset:0;
    border-radius:50%;
    background:
      radial-gradient(circle at 36% 30%, rgba(255,255,255,.28), transparent 46%),
      linear-gradient(150deg, var(--marca), #e8a72f);
    display:flex;align-items:center;justify-content:center;
    overflow:hidden;
    box-shadow:0 14px 34px rgba(0,0,0,.42), inset 0 0 0 4px rgba(255,255,255,.18);
    border:4px solid var(--crema);
  }
  body[data-tpl="sm-circular"] .sm-coin img{
    width:100%;height:100%;object-fit:cover;border-radius:50%;
  }
  body[data-tpl="sm-circular"] .sm-coin .sm-coin-emoji{
    font-size:62px;line-height:1;filter:drop-shadow(0 3px 4px rgba(0,0,0,.2));
  }
  /* little cheese holes */
  body[data-tpl="sm-circular"] .sm-hole{
    position:absolute;border-radius:50%;
    background:radial-gradient(circle at 35% 35%, #e8a72f, #c98a22);
    box-shadow:inset 0 1px 2px rgba(0,0,0,.35);
    z-index:2;pointer-events:none;
  }
  body[data-tpl="sm-circular"] .sm-h1{width:15px;height:15px;top:30px;right:22px;}
  body[data-tpl="sm-circular"] .sm-h2{width:9px;height:9px;top:78px;right:40px;}
  body[data-tpl="sm-circular"] .sm-h3{width:11px;height:11px;bottom:34px;left:30px;}

  body[data-tpl="sm-circular"] .sm-name{
    font-size:34px;font-weight:700;letter-spacing:.4px;
    margin:0;line-height:1.02;color:var(--crema);
  }
  body[data-tpl="sm-circular"] .sm-name b{color:var(--marca);font-weight:700;}
  body[data-tpl="sm-circular"] .sm-slogan{
    font-family:'Pacifico',cursive;
    font-size:18px;color:var(--marca);
    margin:8px 0 0;font-weight:400;
    text-shadow:0 1px 0 rgba(0,0,0,.25);
  }
  body[data-tpl="sm-circular"] .sm-tag{
    display:inline-flex;align-items:center;gap:7px;
    margin-top:13px;
    font-size:11.5px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;
    color:var(--tinta);
    background:var(--crema);
    padding:5px 14px;border-radius:999px;
    box-shadow:0 4px 12px rgba(0,0,0,.28);
  }
  body[data-tpl="sm-circular"] .sm-tag::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--acento);}

  /* ---------- NAV (coins) ---------- */
  body[data-tpl="sm-circular"] .sm-nav{
    display:flex;gap:10px;
    overflow-x:auto;
    padding:14px 16px 16px;
    margin:6px -16px 0;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
  }
  body[data-tpl="sm-circular"] .sm-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="sm-circular"] .sm-nav button{
    flex:0 0 auto;
    font-family:'Fredoka',sans-serif;
    font-size:13.5px;font-weight:600;
    color:var(--crema);
    background:rgba(253,248,218,.07);
    border:1.5px solid rgba(253,248,218,.22);
    padding:9px 16px;
    border-radius:999px;
    cursor:pointer;
    white-space:nowrap;
    transition:transform .14s ease, background .14s ease, color .14s ease, border-color .14s ease;
  }
  body[data-tpl="sm-circular"] .sm-nav button:active{transform:scale(.95);}
  body[data-tpl="sm-circular"] .sm-nav button.active{
    background:var(--marca);
    color:var(--tinta);
    border-color:var(--marca);
    box-shadow:0 6px 16px rgba(252,189,67,.32);
  }

  /* ---------- SECTION ---------- */
  body[data-tpl="sm-circular"] .sm-sec{padding-top:6px;scroll-margin-top:14px;}
  body[data-tpl="sm-circular"] .sm-sec-head{
    display:flex;align-items:center;gap:13px;
    margin:14px 0 16px;
  }
  body[data-tpl="sm-circular"] .sm-sec-coin{
    flex:0 0 auto;
    width:44px;height:44px;border-radius:50%;
    background:linear-gradient(150deg,var(--marca),#e8a72f);
    border:3px solid var(--crema);
    display:flex;align-items:center;justify-content:center;
    font-size:22px;
    box-shadow:0 6px 14px rgba(0,0,0,.3);
  }
  body[data-tpl="sm-circular"] .sm-sec-tt{
    font-size:21px;font-weight:700;color:var(--crema);
    margin:0;line-height:1;letter-spacing:.2px;
  }
  body[data-tpl="sm-circular"] .sm-sec-line{
    flex:1;height:2px;border-radius:2px;
    background:repeating-linear-gradient(90deg,rgba(252,189,67,.5) 0 7px,transparent 7px 13px);
    opacity:.7;
  }

  /* ---------- PRODUCT FICHAS ---------- */
  body[data-tpl="sm-circular"] .sm-grid{
    display:flex;flex-direction:column;gap:15px;
  }
  body[data-tpl="sm-circular"] .sm-ficha{
    position:relative;
    display:flex;align-items:center;gap:15px;
    background:
      radial-gradient(circle at 100% 0%, rgba(252,189,67,.10), transparent 42%),
      rgba(253,248,218,.055);
    border:1.5px solid rgba(253,248,218,.14);
    border-radius:22px;
    padding:14px 16px 14px 14px;
    overflow:hidden;
    box-shadow:0 10px 24px rgba(0,0,0,.26);
  }
  /* cheese-corner drip */
  body[data-tpl="sm-circular"] .sm-ficha::after{
    content:"";
    position:absolute;top:-22px;right:-22px;
    width:56px;height:56px;border-radius:50%;
    background:radial-gradient(circle at 38% 38%, rgba(255,255,255,.25), transparent 50%),var(--marca);
    box-shadow:0 4px 10px rgba(0,0,0,.25);
    pointer-events:none;
  }

  /* round product token (photo or emoji) */
  body[data-tpl="sm-circular"] .sm-token{
    position:relative;
    flex:0 0 auto;
    width:74px;height:74px;border-radius:50%;
    background:
      radial-gradient(circle at 34% 30%, rgba(255,255,255,.10), transparent 55%),
      linear-gradient(150deg, rgba(164,105,75,.55), rgba(106,27,55,.55));
    border:2.5px solid var(--marca);
    display:flex;align-items:center;justify-content:center;
    overflow:hidden;
    box-shadow:inset 0 2px 8px rgba(0,0,0,.32), 0 5px 12px rgba(0,0,0,.25);
  }
  body[data-tpl="sm-circular"] .sm-token img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="sm-circular"] .sm-token .sm-emoji{font-size:36px;line-height:1;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4));}
  /* dish number coin (brown) */
  body[data-tpl="sm-circular"] .sm-num{
    position:absolute;top:-6px;left:-6px;
    width:26px;height:26px;border-radius:50%;
    background:var(--acento);
    color:var(--crema);
    border:2px solid var(--crema);
    display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:700;
    box-shadow:0 3px 7px rgba(0,0,0,.4);
    z-index:3;
  }

  body[data-tpl="sm-circular"] .sm-body{flex:1;min-width:0;}
  body[data-tpl="sm-circular"] .sm-pname{
    font-size:16.5px;font-weight:600;color:var(--crema);
    margin:0 0 3px;line-height:1.18;
  }
  body[data-tpl="sm-circular"] .sm-pdesc{
    font-size:12.5px;font-weight:400;line-height:1.34;
    color:rgba(253,248,218,.66);
    margin:0 0 9px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="sm-circular"] .sm-foot{
    display:flex;align-items:center;justify-content:space-between;gap:10px;
  }
  body[data-tpl="sm-circular"] .sm-price{
    display:inline-flex;align-items:baseline;gap:2px;
    font-size:17px;font-weight:700;color:var(--marca);
    letter-spacing:.3px;
  }
  body[data-tpl="sm-circular"] .sm-price small{font-size:11px;font-weight:600;opacity:.85;}

  /* ---------- QTY CONTROL (round) ---------- */
  body[data-tpl="sm-circular"] [data-qtywrap]{
    display:inline-flex;align-items:center;
  }
  body[data-tpl="sm-circular"] [data-qtywrap] button,
  body[data-tpl="sm-circular"] .qty button,
  body[data-tpl="sm-circular"] [data-add],
  body[data-tpl="sm-circular"] [data-sub]{
    font-family:'Fredoka',sans-serif;
    cursor:pointer;
  }
  /* the "+" pill when empty */
  body[data-tpl="sm-circular"] [data-add]{
    width:40px;height:40px;border-radius:50%;
    border:none;
    background:var(--marca);
    color:var(--tinta);
    font-size:24px;font-weight:600;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 14px rgba(252,189,67,.4), inset 0 0 0 2px rgba(255,255,255,.18);
    transition:transform .12s ease;
  }
  body[data-tpl="sm-circular"] [data-add]:active{transform:scale(.9);}
  body[data-tpl="sm-circular"] [data-sub]{
    width:32px;height:32px;border-radius:50%;
    border:1.5px solid var(--marca);
    background:transparent;
    color:var(--marca);
    font-size:20px;font-weight:600;line-height:1;
    display:none;align-items:center;justify-content:center;
    transition:transform .12s ease;
  }
  body[data-tpl="sm-circular"] [data-sub]:active{transform:scale(.9);}
  body[data-tpl="sm-circular"] [data-cant]{
    display:none;min-width:22px;text-align:center;
    font-size:16px;font-weight:700;color:var(--crema);
    padding:0 4px;
  }
  /* when has-qty: show counter layout */
  body[data-tpl="sm-circular"] [data-qtywrap].has-qty{
    gap:4px;
    background:rgba(253,248,218,.08);
    border:1.5px solid rgba(252,189,67,.4);
    border-radius:999px;
    padding:3px;
  }
  body[data-tpl="sm-circular"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="sm-circular"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="sm-circular"] [data-qtywrap].has-qty [data-add]{
    width:32px;height:32px;font-size:20px;
    box-shadow:0 3px 8px rgba(252,189,67,.35);
  }

  /* ---------- footer mark ---------- */
  body[data-tpl="sm-circular"] .sm-end{
    text-align:center;
    padding:30px 0 8px;
    color:rgba(253,248,218,.5);
    font-size:12px;letter-spacing:.5px;
  }
  body[data-tpl="sm-circular"] .sm-end .sm-dot{
    display:inline-block;width:6px;height:6px;border-radius:50%;
    background:var(--marca);margin:0 7px;vertical-align:middle;
  }

  /* ---------- SHARED CART (re-skin) ---------- */
  body[data-tpl="sm-circular"] #cart-fab{
    background:var(--marca) !important;
    color:var(--tinta) !important;
    border:3px solid var(--crema) !important;
    box-shadow:0 10px 26px rgba(0,0,0,.4), 0 0 0 6px rgba(252,189,67,.16) !important;
    font-weight:700 !important;
  }
  body[data-tpl="sm-circular"] #cart-fab *{color:var(--tinta) !important;}
  body[data-tpl="sm-circular"] #cart-fab .badge,
  body[data-tpl="sm-circular"] #cart-fab [class*="badge"]{
    background:var(--acento) !important;
    color:var(--crema) !important;
    border:2px solid var(--crema) !important;
  }
  body[data-tpl="sm-circular"] #cart{
    background:var(--tinta) !important;
    color:var(--crema) !important;
    border-top:4px solid var(--marca) !important;
    border-radius:26px 26px 0 0 !important;
    box-shadow:0 -12px 40px rgba(0,0,0,.5) !important;
  }
  body[data-tpl="sm-circular"] #cart *{color:var(--crema);}
  body[data-tpl="sm-circular"] #cart h1,
  body[data-tpl="sm-circular"] #cart h2,
  body[data-tpl="sm-circular"] #cart h3{color:var(--crema) !important;font-family:'Fredoka',sans-serif;}
  body[data-tpl="sm-circular"] #cart button{font-family:'Fredoka',sans-serif;}
  body[data-tpl="sm-circular"] #cart [class*="total"],
  body[data-tpl="sm-circular"] #cart strong{color:var(--marca) !important;}
  `,
  render(R, root, ctrl, slug){
    const drip = `
      <div class="sm-drip" aria-hidden="true">
        <svg viewBox="0 0 520 26" preserveAspectRatio="none">
          <path fill="currentColor" d="M0 0 H520 V8
            C500 8 498 22 482 22 C466 22 464 7 446 7
            C424 7 422 18 404 18 C386 18 384 6 362 6
            C342 6 340 24 320 24 C300 24 298 7 278 7
            C256 7 254 20 234 20 C214 20 212 6 190 6
            C170 6 168 22 148 22 C128 22 126 7 104 7
            C84 7 82 19 62 19 C42 19 40 6 20 6 C10 6 6 8 0 8 Z"/>
        </svg>
      </div>`;

    const menuHtml = (R.menu || []).map(cat => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []).map((it, i) => {
        const n = String(i + 1).padStart(2, '0');
        const token = it.foto
          ? `<img src="${it.foto}" alt="${it.nombre}">`
          : `<span class="sm-emoji">${it.emoji || '🧀'}</span>`;
        return `
          <article class="sm-ficha">
            <div class="sm-token">
              <span class="sm-num">${n}</span>
              ${token}
            </div>
            <div class="sm-body">
              <h3 class="sm-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="sm-pdesc">${it.desc}</p>` : ``}
              <div class="sm-foot">
                <span class="sm-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
                ${ctrl(it.id)}
              </div>
            </div>
          </article>`;
      }).join('');

      return `
        ${drip}
        <section class="sm-sec" id="cat-${cid}">
          <div class="sm-sec-head">
            <span class="sm-sec-coin">🧀</span>
            <h2 class="sm-sec-tt">${cat.categoria}</h2>
            <span class="sm-sec-line"></span>
          </div>
          <div class="sm-grid">${items}</div>
        </section>`;
    }).join('');

    const navHtml = (R.menu || []).map((cat, i) =>
      `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? 'active' : ''}">${cat.categoria}</button>`
    ).join('');

    root.innerHTML = `
      <div class="sm-wrap">
        <header class="sm-head">
          <div class="sm-medallon">
            <span class="sm-hole sm-h1"></span>
            <span class="sm-hole sm-h2"></span>
            <span class="sm-hole sm-h3"></span>
            <div class="sm-coin">
              ${(R.logoRedondo || R.logo)
                ? `<img src="${R.logoRedondo || R.logo}" alt="${R.nombre}">`
                : `<span class="sm-coin-emoji">🧀</span>`}
            </div>
          </div>
          <h1 class="sm-name">${R.nombre}</h1>
          ${R.slogan ? `<p class="sm-slogan">${R.slogan}</p>` : ``}
          <span class="sm-tag">Tan quesoso como delicioso</span>
        </header>
      </div>

      <nav class="sm-nav">${navHtml}</nav>

      <div class="sm-wrap">
        ${menuHtml}
        <div class="sm-end">
          <span class="sm-dot"></span> ${R.nombre} <span class="sm-dot"></span>
        </div>
      </div>
    `;
  }
};