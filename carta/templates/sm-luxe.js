window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["sm-luxe"] = {
  label: "Premium Dorado",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Sacramento&display=swap');

  /* ===========================================================
     sm-luxe — "Premium Dorado"
     Carta de hotel 5 estrellas. Fondo VINO, letras BEIGE,
     dorado (amarillo) como foil: hairlines, marcos, numeros.
     Mucho aire. Cada categoria = un capitulo centrado.
     =========================================================== */

  body[data-tpl="sm-luxe"]{
    margin:0;
    background:
      radial-gradient(120% 80% at 50% -10%, rgba(252,189,67,.10), transparent 60%),
      radial-gradient(100% 60% at 50% 120%, rgba(164,105,75,.18), transparent 60%),
      var(--tinta);
    color:var(--crema);
    font-family:'Fredoka',system-ui,sans-serif;
    font-weight:300;
    -webkit-font-smoothing:antialiased;
    letter-spacing:.2px;
  }
  body[data-tpl="sm-luxe"] *{box-sizing:border-box;}

  body[data-tpl="sm-luxe"] .luxe{
    max-width:560px;
    margin:0 auto;
    padding:0 22px 140px;
    position:relative;
  }

  /* thin foil frame around whole carta */
  body[data-tpl="sm-luxe"] .luxe::before{
    content:"";
    position:fixed;
    inset:12px;
    border:1px solid rgba(252,189,67,.28);
    border-radius:4px;
    pointer-events:none;
    max-width:584px;
    margin:0 auto;
    z-index:0;
  }
  body[data-tpl="sm-luxe"] .luxe > *{position:relative;z-index:1;}

  /* ===================== HEADER ===================== */
  body[data-tpl="sm-luxe"] .lx-head{
    text-align:center;
    padding:46px 6px 30px;
  }
  body[data-tpl="sm-luxe"] .lx-estab{
    font-size:9.5px;
    letter-spacing:5px;
    text-transform:uppercase;
    color:var(--marca);
    opacity:.85;
    margin-bottom:20px;
    font-weight:500;
  }

  /* cheese-wheel logo ring with drip */
  body[data-tpl="sm-luxe"] .lx-logo{
    width:96px;height:96px;
    margin:0 auto 22px;
    border-radius:50%;
    display:grid;place-items:center;
    position:relative;
    background:
      radial-gradient(circle at 38% 32%, rgba(252,189,67,.18), transparent 60%),
      rgba(253,248,218,.04);
    border:1px solid rgba(252,189,67,.45);
    box-shadow:
      0 0 0 6px rgba(106,27,55,.5),
      0 0 0 7px rgba(252,189,67,.20),
      0 14px 34px rgba(0,0,0,.35);
  }
  body[data-tpl="sm-luxe"] .lx-logo img{
    width:62%;height:62%;
    object-fit:contain;
    border-radius:50%;
    filter:drop-shadow(0 4px 8px rgba(0,0,0,.3));
  }
  body[data-tpl="sm-luxe"] .lx-logo .lx-fallback{
    font-size:40px;line-height:1;
  }
  /* cheese drips under the ring */
  body[data-tpl="sm-luxe"] .lx-logo::after{
    content:"";
    position:absolute;
    bottom:-7px;left:50%;
    transform:translateX(-50%);
    width:42px;height:14px;
    background:
      radial-gradient(7px 11px at 10px 0, var(--marca) 60%, transparent 62%),
      radial-gradient(5px 8px  at 22px 0, var(--marca) 60%, transparent 62%),
      radial-gradient(6px 13px at 33px 0, var(--marca) 60%, transparent 62%);
    opacity:.9;
    filter:drop-shadow(0 3px 3px rgba(0,0,0,.25));
  }

  body[data-tpl="sm-luxe"] .lx-name{
    font-size:38px;
    font-weight:400;
    line-height:1;
    margin:0 0 8px;
    letter-spacing:.5px;
    color:var(--crema);
  }
  body[data-tpl="sm-luxe"] .lx-name b{
    font-weight:600;
    color:var(--marca);
  }
  body[data-tpl="sm-luxe"] .lx-slogan{
    font-family:'Sacramento',cursive;
    font-size:26px;
    color:var(--marca);
    line-height:1;
    margin:4px 0 0;
    font-weight:400;
  }

  /* ornament divider (· — · ) */
  body[data-tpl="sm-luxe"] .lx-orn{
    display:flex;align-items:center;justify-content:center;
    gap:10px;
    margin:24px auto 0;
    max-width:200px;
    opacity:.9;
  }
  body[data-tpl="sm-luxe"] .lx-orn i{
    height:1px;flex:1;
    background:linear-gradient(90deg,transparent,var(--marca));
  }
  body[data-tpl="sm-luxe"] .lx-orn i:last-child{
    background:linear-gradient(90deg,var(--marca),transparent);
  }
  body[data-tpl="sm-luxe"] .lx-orn span{
    width:6px;height:6px;border-radius:50%;
    background:var(--marca);
    box-shadow:0 0 0 3px rgba(252,189,67,.18);
  }

  /* ===================== NAV ===================== */
  body[data-tpl="sm-luxe"] .lx-nav{
    display:flex;
    gap:8px;
    overflow-x:auto;
    padding:6px 2px 14px;
    margin:8px 0 6px;
    scrollbar-width:none;
    justify-content:flex-start;
    -webkit-overflow-scrolling:touch;
  }
  body[data-tpl="sm-luxe"] .lx-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="sm-luxe"] .lx-nav button{
    flex:0 0 auto;
    background:transparent;
    color:var(--crema);
    border:1px solid rgba(253,248,218,.22);
    border-radius:999px;
    padding:8px 16px;
    font-family:'Fredoka',sans-serif;
    font-size:11px;
    font-weight:500;
    letter-spacing:2px;
    text-transform:uppercase;
    cursor:pointer;
    white-space:nowrap;
    transition:.25s;
    opacity:.75;
  }
  body[data-tpl="sm-luxe"] .lx-nav button:hover,
  body[data-tpl="sm-luxe"] .lx-nav button.active{
    border-color:var(--marca);
    color:var(--marca);
    opacity:1;
    background:rgba(252,189,67,.06);
  }

  /* ===================== CHAPTER ===================== */
  body[data-tpl="sm-luxe"] .lx-chapter{
    scroll-margin-top:18px;
    padding:30px 0 6px;
  }
  body[data-tpl="sm-luxe"] .lx-chead{
    text-align:center;
    margin:0 0 30px;
  }
  body[data-tpl="sm-luxe"] .lx-chead .num{
    display:inline-block;
    font-size:10px;
    letter-spacing:4px;
    color:var(--acento);
    font-weight:500;
    margin-bottom:10px;
  }
  body[data-tpl="sm-luxe"] .lx-chead h2{
    font-size:21px;
    font-weight:400;
    letter-spacing:6px;
    text-transform:uppercase;
    color:var(--crema);
    margin:0;
    position:relative;
    display:inline-block;
    padding:0 4px;
  }
  body[data-tpl="sm-luxe"] .lx-chead .sub{
    display:flex;align-items:center;justify-content:center;gap:9px;
    margin-top:14px;
  }
  body[data-tpl="sm-luxe"] .lx-chead .sub i{
    height:1px;width:34px;
    background:var(--marca);opacity:.6;
  }
  body[data-tpl="sm-luxe"] .lx-chead .sub b{
    width:5px;height:5px;border-radius:50%;
    background:var(--marca);
    transform:rotate(45deg);
    border-radius:1px;
  }

  /* ===================== DISH ROW ===================== */
  body[data-tpl="sm-luxe"] .lx-dish{
    display:grid;
    grid-template-columns:54px 1fr auto;
    gap:14px;
    align-items:start;
    padding:20px 2px;
    border-top:1px solid rgba(253,248,218,.10);
  }
  body[data-tpl="sm-luxe"] .lx-dish:first-of-type{border-top:none;}

  /* plate number / emoji ring */
  body[data-tpl="sm-luxe"] .lx-media{
    width:54px;height:54px;
    border-radius:50%;
    display:grid;place-items:center;
    position:relative;
    overflow:hidden;
    border:1px solid rgba(252,189,67,.40);
    background:
      radial-gradient(circle at 36% 30%, rgba(252,189,67,.14), transparent 65%),
      rgba(253,248,218,.03);
  }
  body[data-tpl="sm-luxe"] .lx-media img{
    width:100%;height:100%;object-fit:cover;border-radius:50%;
  }
  body[data-tpl="sm-luxe"] .lx-media .em{font-size:25px;line-height:1;}
  /* tiny drip on each plate */
  body[data-tpl="sm-luxe"] .lx-media::after{
    content:"";
    position:absolute;
    top:0;right:13px;
    width:9px;height:7px;
    background:
      radial-gradient(4px 6px at 4px 0, var(--marca) 60%, transparent 62%);
    opacity:.55;
  }
  body[data-tpl="sm-luxe"] .lx-plate-no{
    position:absolute;
    bottom:-7px;right:-7px;
    width:21px;height:21px;
    border-radius:50%;
    background:var(--tinta);
    border:1px solid var(--marca);
    color:var(--marca);
    font-size:10px;font-weight:600;
    display:grid;place-items:center;
    letter-spacing:0;
  }

  body[data-tpl="sm-luxe"] .lx-body{min-width:0;padding-top:2px;}
  body[data-tpl="sm-luxe"] .lx-line{
    display:flex;align-items:baseline;gap:8px;
  }
  body[data-tpl="sm-luxe"] .lx-title{
    font-size:16px;
    font-weight:500;
    color:var(--crema);
    line-height:1.2;
    letter-spacing:.3px;
  }
  /* dotted leader */
  body[data-tpl="sm-luxe"] .lx-lead{
    flex:1;
    height:1px;
    align-self:flex-end;
    margin-bottom:4px;
    background-image:radial-gradient(circle, rgba(252,189,67,.55) 1px, transparent 1.4px);
    background-size:7px 2px;
    background-repeat:repeat-x;
    background-position:left bottom;
    min-width:14px;
  }
  body[data-tpl="sm-luxe"] .lx-price{
    font-size:15px;
    font-weight:500;
    color:var(--marca);
    white-space:nowrap;
    letter-spacing:.5px;
  }
  body[data-tpl="sm-luxe"] .lx-price small{
    font-size:9px;opacity:.7;font-weight:400;margin-right:1px;
    letter-spacing:1px;
  }
  body[data-tpl="sm-luxe"] .lx-desc{
    font-size:12.5px;
    font-weight:300;
    line-height:1.55;
    color:var(--crema);
    opacity:.62;
    margin:6px 0 0;
    letter-spacing:.4px;
    max-width:38ch;
  }

  /* qty control sits in 3rd column under price */
  body[data-tpl="sm-luxe"] .lx-act{
    grid-column:3;
    display:flex;justify-content:flex-end;
    margin-top:12px;
  }

  /* ---- shared ctrl(it.id) restyle: minimal gold ---- */
  body[data-tpl="sm-luxe"] .lx-act [data-qtywrap]{
    display:inline-flex;align-items:center;
    gap:0;
  }
  body[data-tpl="sm-luxe"] .lx-act button{
    width:30px;height:30px;
    border-radius:50%;
    border:1px solid var(--marca);
    background:transparent;
    color:var(--marca);
    font-size:17px;line-height:1;
    font-family:'Fredoka',sans-serif;
    cursor:pointer;
    display:grid;place-items:center;
    transition:.2s;
    padding:0;
  }
  body[data-tpl="sm-luxe"] .lx-act button[data-add]{
    background:var(--marca);
    color:var(--tinta);
    border-color:var(--marca);
    box-shadow:0 4px 12px rgba(252,189,67,.28);
    font-weight:600;
  }
  body[data-tpl="sm-luxe"] .lx-act button:active{transform:scale(.9);}
  body[data-tpl="sm-luxe"] .lx-act [data-sub]{
    width:0;opacity:0;margin:0;border:none;pointer-events:none;
    transition:.22s;
  }
  body[data-tpl="sm-luxe"] .lx-act [data-cant]{
    min-width:0;width:0;overflow:hidden;opacity:0;
    text-align:center;
    font-size:14px;font-weight:600;color:var(--marca);
    transition:.22s;
    display:inline-block;
  }
  /* expanded state when qty>0 */
  body[data-tpl="sm-luxe"] .lx-act [data-qtywrap].has-qty{
    border:1px solid rgba(252,189,67,.40);
    border-radius:999px;
    padding:2px;
    background:rgba(252,189,67,.05);
  }
  body[data-tpl="sm-luxe"] .lx-act [data-qtywrap].has-qty [data-sub]{
    width:30px;opacity:1;pointer-events:auto;
    border:1px solid var(--marca);
  }
  body[data-tpl="sm-luxe"] .lx-act [data-qtywrap].has-qty [data-cant]{
    width:30px;opacity:1;
  }
  body[data-tpl="sm-luxe"] .lx-act [data-qtywrap].has-qty [data-add]{
    box-shadow:none;
  }

  /* ===================== FOOTER ===================== */
  body[data-tpl="sm-luxe"] .lx-foot{
    text-align:center;
    padding:46px 10px 8px;
    color:var(--crema);
  }
  body[data-tpl="sm-luxe"] .lx-foot .lx-orn{margin-bottom:18px;}
  body[data-tpl="sm-luxe"] .lx-foot p{
    font-size:10px;
    letter-spacing:3px;
    text-transform:uppercase;
    opacity:.5;
    margin:6px 0;
  }
  body[data-tpl="sm-luxe"] .lx-foot .sig{
    font-family:'Sacramento',cursive;
    font-size:24px;
    letter-spacing:0;
    text-transform:none;
    color:var(--marca);
    opacity:.95;
  }

  /* ===================== SHARED CART (re-skin) ===================== */
  body[data-tpl="sm-luxe"] #cart-fab{
    background:var(--marca) !important;
    color:var(--tinta) !important;
    border:1px solid rgba(253,248,218,.55) !important;
    box-shadow:0 10px 30px rgba(0,0,0,.4), 0 0 0 5px rgba(252,189,67,.16) !important;
    font-family:'Fredoka',sans-serif !important;
    font-weight:600 !important;
    letter-spacing:.5px;
  }
  body[data-tpl="sm-luxe"] #cart-fab *{color:var(--tinta) !important;}

  body[data-tpl="sm-luxe"] #cart{
    background:var(--tinta) !important;
    color:var(--crema) !important;
    border-top:1px solid rgba(252,189,67,.4) !important;
    border-left:1px solid rgba(252,189,67,.25) !important;
    font-family:'Fredoka',sans-serif !important;
  }
  body[data-tpl="sm-luxe"] #cart *{color:var(--crema);}
  body[data-tpl="sm-luxe"] #cart h2,
  body[data-tpl="sm-luxe"] #cart h3{
    color:var(--crema);
    font-weight:500;
    letter-spacing:2px;
    text-transform:uppercase;
    font-size:15px;
  }
  body[data-tpl="sm-luxe"] #cart button{
    font-family:'Fredoka',sans-serif;
  }
  /* primary confirm-ish buttons in cart -> gold */
  body[data-tpl="sm-luxe"] #cart button:not([class*="close"]):not([class*="x"]){
    background:var(--marca);
    color:var(--tinta) !important;
    border:none;
    border-radius:999px;
    font-weight:600;
    letter-spacing:.5px;
  }
  body[data-tpl="sm-luxe"] #cart .cart-total,
  body[data-tpl="sm-luxe"] #cart [class*="total"]{
    color:var(--marca);
    font-weight:600;
  }

  /* ===================== RESPONSIVE ===================== */
  @media (max-width:520px){
    body[data-tpl="sm-luxe"] .luxe{padding:0 16px 140px;}
    body[data-tpl="sm-luxe"] .luxe::before{inset:8px;}
    body[data-tpl="sm-luxe"] .lx-name{font-size:32px;}
    body[data-tpl="sm-luxe"] .lx-dish{grid-template-columns:48px 1fr auto;gap:12px;}
    body[data-tpl="sm-luxe"] .lx-media{width:48px;height:48px;}
    body[data-tpl="sm-luxe"] .lx-media .em{font-size:22px;}
    body[data-tpl="sm-luxe"] .lx-chead h2{font-size:18px;letter-spacing:4px;}
    body[data-tpl="sm-luxe"] .lx-title{font-size:15px;}
  }
  `,
  render(R, root, ctrl, slug){
    const roman = (n) => {
      const map = [["X",10],["IX",9],["V",5],["IV",4],["I",1]];
      let s = "", x = n;
      for (const [r, v] of map){ while (x >= v){ s += r; x -= v; } }
      return s || "I";
    };

    const nav = (R.menu || []).map(cat =>
      `<button data-cat="${slug(cat.categoria)}">${cat.categoria}</button>`
    ).join("");

    const chapters = (R.menu || []).map((cat, ci) => {
      const dishes = (cat.items || []).map((it, di) => {
        const media = it.foto
          ? `<img src="${it.foto}" alt="${it.nombre}">`
          : `<span class="em">${it.emoji || "🧀"}</span>`;
        const desc = it.desc
          ? `<p class="lx-desc">${it.desc}</p>`
          : "";
        return `
        <article class="lx-dish">
          <div class="lx-media">
            ${media}
            <span class="lx-plate-no">${di + 1}</span>
          </div>
          <div class="lx-body">
            <div class="lx-line">
              <span class="lx-title">${it.nombre}</span>
              <span class="lx-lead"></span>
              <span class="lx-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
            </div>
            ${desc}
          </div>
          <div class="lx-act">${ctrl(it.id)}</div>
        </article>`;
      }).join("");

      return `
      <section class="lx-chapter" id="cat-${slug(cat.categoria)}">
        <header class="lx-chead">
          <span class="num">CAPÍTULO ${roman(ci + 1)}</span>
          <h2>${cat.categoria}</h2>
          <div class="sub"><i></i><b></b><i></i></div>
        </header>
        ${dishes}
      </section>`;
    }).join("");

    root.innerHTML = `
    <div class="luxe">
      <header class="lx-head">
        <div class="lx-estab">Casa de Moros · Selección</div>
        <div class="lx-logo">
          ${R.logo
            ? `<img src="${R.logo}" alt="${R.nombre}">`
            : `<span class="lx-fallback">🧀</span>`}
        </div>
        <h1 class="lx-name">${R.nombre}</h1>
        <p class="lx-slogan">${R.slogan || ""}</p>
        <div class="lx-orn"><i></i><span></span><i></i></div>
      </header>

      <nav class="lx-nav">${nav}</nav>

      ${chapters}

      <footer class="lx-foot">
        <div class="lx-orn"><i></i><span></span><i></i></div>
        <p class="sig">${R.slogan || "Bon appétit"}</p>
        <p>Tan quesoso como delicioso</p>
      </footer>
    </div>`;
  }
};