window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["sm-vino"] = {
  label: "Vino Elegante",
  css: `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Sacramento&display=swap');

body[data-tpl="sm-vino"]{
  background:var(--tinta);
  color:var(--crema);
  font-family:'Fredoka',system-ui,-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased;
  margin:0;
  position:relative;
}

/* sutil textura de luz calida sobre el vino */
body[data-tpl="sm-vino"]::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(120% 60% at 50% -10%, rgba(252,189,67,.16), transparent 60%),
    radial-gradient(90% 50% at 100% 110%, rgba(164,105,75,.18), transparent 60%);
  z-index:0;
}
body[data-tpl="sm-vino"] .tpl-wrap{position:relative;z-index:1;}

/* ===== HEADER ===== */
body[data-tpl="sm-vino"] .sm-header{
  position:relative;
  text-align:center;
  padding:34px 22px 0;
}
body[data-tpl="sm-vino"] .sm-logo{
  width:104px;
  height:104px;
  margin:0 auto 14px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:
    radial-gradient(circle at 35% 30%, rgba(253,248,218,.28), transparent 55%),
    var(--marca);
  box-shadow:
    0 0 0 4px rgba(253,248,218,.9),
    0 0 0 9px rgba(164,105,75,.55),
    0 18px 40px -14px rgba(0,0,0,.6);
  overflow:hidden;
}
body[data-tpl="sm-vino"] .sm-logo img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}
body[data-tpl="sm-vino"] .sm-logo .sm-logo-fallback{
  font-size:52px;
  line-height:1;
}

body[data-tpl="sm-vino"] .sm-name{
  font-family:'Fredoka',sans-serif;
  font-weight:700;
  font-size:38px;
  letter-spacing:.5px;
  line-height:1.02;
  margin:0;
  color:var(--crema);
  text-shadow:0 2px 18px rgba(0,0,0,.35);
}
body[data-tpl="sm-vino"] .sm-slogan{
  font-family:'Sacramento',cursive;
  font-size:30px;
  line-height:1;
  margin:8px 0 0;
  color:var(--marca);
  text-shadow:0 1px 10px rgba(0,0,0,.3);
}
body[data-tpl="sm-vino"] .sm-eyebrow{
  display:inline-block;
  margin:16px 0 4px;
  font-size:11px;
  font-weight:600;
  letter-spacing:3px;
  text-transform:uppercase;
  color:var(--acento);
  background:rgba(253,248,218,.07);
  border:1px solid rgba(164,105,75,.5);
  padding:5px 14px;
  border-radius:999px;
}

/* ===== DRIP de queso bajo el header ===== */
body[data-tpl="sm-vino"] .sm-drip{
  position:relative;
  height:26px;
  margin-top:26px;
}
body[data-tpl="sm-vino"] .sm-drip svg{
  display:block;
  width:100%;
  height:100%;
}
body[data-tpl="sm-vino"] .sm-drip .sm-blob{
  position:absolute;
  top:18px;
  width:14px;
  height:14px;
  border-radius:50%;
  background:var(--marca);
  box-shadow:0 6px 10px -4px rgba(0,0,0,.4);
}
body[data-tpl="sm-vino"] .sm-drip .sm-blob.b1{left:22%;}
body[data-tpl="sm-vino"] .sm-drip .sm-blob.b2{left:54%;top:23px;width:10px;height:10px;}
body[data-tpl="sm-vino"] .sm-drip .sm-blob.b3{left:78%;top:20px;width:12px;height:12px;}

/* ===== NAV CATEGORIAS ===== */
body[data-tpl="sm-vino"] .sm-nav{
  position:sticky;
  top:0;
  z-index:5;
  display:flex;
  gap:8px;
  overflow-x:auto;
  padding:14px 18px;
  margin-top:6px;
  background:linear-gradient(var(--tinta) 70%, rgba(106,27,55,0));
  -webkit-overflow-scrolling:touch;
  scrollbar-width:none;
}
body[data-tpl="sm-vino"] .sm-nav::-webkit-scrollbar{display:none;}
body[data-tpl="sm-vino"] .sm-nav button{
  flex:0 0 auto;
  font-family:'Fredoka',sans-serif;
  font-weight:500;
  font-size:13px;
  letter-spacing:.3px;
  color:var(--crema);
  background:rgba(253,248,218,.06);
  border:1px solid rgba(253,248,218,.18);
  padding:8px 16px;
  border-radius:999px;
  cursor:pointer;
  white-space:nowrap;
  transition:all .2s ease;
}
body[data-tpl="sm-vino"] .sm-nav button:hover{
  border-color:var(--marca);
}
body[data-tpl="sm-vino"] .sm-nav button.active{
  background:var(--marca);
  color:var(--tinta);
  border-color:var(--marca);
  font-weight:600;
}

/* ===== SECCION ===== */
body[data-tpl="sm-vino"] .sm-section{
  padding:30px 20px 8px;
}
body[data-tpl="sm-vino"] .sm-cat-head{
  display:flex;
  align-items:center;
  gap:12px;
  margin:0 0 22px;
}
body[data-tpl="sm-vino"] .sm-cat-num{
  font-family:'Fredoka',sans-serif;
  font-weight:700;
  font-size:14px;
  color:var(--marca);
  opacity:.9;
}
body[data-tpl="sm-vino"] .sm-cat-title{
  font-family:'Fredoka',sans-serif;
  font-weight:600;
  font-size:23px;
  letter-spacing:.3px;
  margin:0;
  color:var(--crema);
}
body[data-tpl="sm-vino"] .sm-cat-line{
  flex:1;
  height:1px;
  background:linear-gradient(90deg, var(--acento), rgba(164,105,75,0));
}

/* ===== PLATO DESTACADO (portada de categoria) ===== */
body[data-tpl="sm-vino"] .sm-feature{
  position:relative;
  border-radius:22px;
  padding:24px 22px 22px;
  margin:0 0 24px;
  background:
    radial-gradient(130% 90% at 50% 0%, rgba(252,189,67,.14), transparent 60%),
    rgba(253,248,218,.05);
  border:1px solid rgba(253,248,218,.14);
  box-shadow:0 22px 45px -24px rgba(0,0,0,.7);
  overflow:hidden;
}
body[data-tpl="sm-vino"] .sm-feature::after{
  content:"";
  position:absolute;
  left:0;right:0;bottom:0;
  height:4px;
  background:linear-gradient(90deg,var(--marca),var(--acento));
}
body[data-tpl="sm-vino"] .sm-feature-num{
  font-family:'Fredoka',sans-serif;
  font-weight:700;
  font-size:13px;
  letter-spacing:2px;
  color:var(--marca);
}
body[data-tpl="sm-vino"] .sm-feature-media{
  width:100%;
  height:170px;
  border-radius:16px;
  margin:14px 0 16px;
  display:grid;
  place-items:center;
  background:
    radial-gradient(circle at 50% 35%, rgba(252,189,67,.22), transparent 65%),
    rgba(106,27,55,.4);
  border:1px solid rgba(253,248,218,.12);
  overflow:hidden;
}
body[data-tpl="sm-vino"] .sm-feature-media img{
  width:100%;height:100%;object-fit:cover;display:block;
}
body[data-tpl="sm-vino"] .sm-feature-emoji{
  font-size:86px;
  line-height:1;
  filter:drop-shadow(0 10px 18px rgba(0,0,0,.45));
}
body[data-tpl="sm-vino"] .sm-feature-name{
  font-family:'Fredoka',sans-serif;
  font-weight:600;
  font-size:24px;
  margin:0 0 6px;
  color:var(--crema);
}
body[data-tpl="sm-vino"] .sm-feature-desc{
  font-size:14px;
  line-height:1.5;
  font-weight:400;
  color:rgba(253,248,218,.78);
  margin:0 0 16px;
}
body[data-tpl="sm-vino"] .sm-feature-foot{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
}
body[data-tpl="sm-vino"] .sm-price-big{
  font-family:'Fredoka',sans-serif;
  font-weight:700;
  font-size:26px;
  color:var(--marca);
}
body[data-tpl="sm-vino"] .sm-price-big small{
  font-size:14px;
  font-weight:500;
  opacity:.8;
}

/* ===== TARJETAS NORMALES ===== */
body[data-tpl="sm-vino"] .sm-list{
  display:flex;
  flex-direction:column;
}
body[data-tpl="sm-vino"] .sm-card{
  display:flex;
  align-items:center;
  gap:16px;
  padding:20px 4px;
  position:relative;
}
body[data-tpl="sm-vino"] .sm-card + .sm-card{
  border-top:1px solid rgba(253,248,218,.12);
}
/* divisor de queso (gota) entre tarjetas */
body[data-tpl="sm-vino"] .sm-card + .sm-card::before{
  content:"";
  position:absolute;
  top:-4px;left:50%;
  transform:translateX(-50%);
  width:7px;height:7px;
  border-radius:50%;
  background:var(--marca);
  box-shadow:0 0 0 3px var(--tinta);
}
body[data-tpl="sm-vino"] .sm-thumb{
  flex:0 0 66px;
  width:66px;height:66px;
  border-radius:16px;
  display:grid;
  place-items:center;
  background:
    radial-gradient(circle at 50% 35%, rgba(252,189,67,.18), transparent 70%),
    rgba(253,248,218,.06);
  border:1px solid rgba(164,105,75,.4);
  overflow:hidden;
}
body[data-tpl="sm-vino"] .sm-thumb img{
  width:100%;height:100%;object-fit:cover;display:block;
}
body[data-tpl="sm-vino"] .sm-thumb .sm-emoji{
  font-size:34px;
  line-height:1;
  filter:drop-shadow(0 4px 7px rgba(0,0,0,.4));
}
body[data-tpl="sm-vino"] .sm-info{
  flex:1;
  min-width:0;
}
body[data-tpl="sm-vino"] .sm-item-name{
  font-family:'Fredoka',sans-serif;
  font-weight:600;
  font-size:17px;
  line-height:1.2;
  margin:0 0 3px;
  color:var(--crema);
}
body[data-tpl="sm-vino"] .sm-item-desc{
  font-size:12.5px;
  font-weight:400;
  line-height:1.45;
  color:rgba(253,248,218,.66);
  margin:0 0 7px;
}
body[data-tpl="sm-vino"] .sm-item-price{
  font-family:'Fredoka',sans-serif;
  font-weight:600;
  font-size:16px;
  color:var(--marca);
}
body[data-tpl="sm-vino"] .sm-item-price small{font-size:11px;font-weight:500;opacity:.8;}
body[data-tpl="sm-vino"] .sm-card-ctrl{
  flex:0 0 auto;
}

/* ===== CONTROL DE CANTIDAD (motor) ===== */
body[data-tpl="sm-vino"] [data-qtywrap]{
  display:inline-flex;
  align-items:center;
  gap:2px;
  background:rgba(253,248,218,.07);
  border:1px solid rgba(253,248,218,.2);
  border-radius:999px;
  padding:3px;
  transition:all .2s ease;
}
body[data-tpl="sm-vino"] [data-qtywrap].has-qty{
  background:var(--marca);
  border-color:var(--marca);
}
body[data-tpl="sm-vino"] [data-qtywrap] button,
body[data-tpl="sm-vino"] [data-add],
body[data-tpl="sm-vino"] [data-sub]{
  width:32px;height:32px;
  border-radius:50%;
  border:none;
  cursor:pointer;
  font-family:'Fredoka',sans-serif;
  font-weight:700;
  font-size:19px;
  line-height:1;
  display:grid;
  place-items:center;
  background:transparent;
  color:var(--crema);
  transition:transform .12s ease, background .2s ease;
}
body[data-tpl="sm-vino"] [data-qtywrap].has-qty button,
body[data-tpl="sm-vino"] [data-qtywrap].has-qty [data-add],
body[data-tpl="sm-vino"] [data-qtywrap].has-qty [data-sub]{
  color:var(--tinta);
}
body[data-tpl="sm-vino"] [data-add]:active,
body[data-tpl="sm-vino"] [data-sub]:active{transform:scale(.88);}
body[data-tpl="sm-vino"] [data-qtywrap]:not(.has-qty) [data-sub],
body[data-tpl="sm-vino"] [data-qtywrap]:not(.has-qty) [data-cant]{
  display:none;
}
body[data-tpl="sm-vino"] [data-qtywrap].has-qty [data-add]{
  background:rgba(106,27,55,.18);
}
body[data-tpl="sm-vino"] [data-cant]{
  min-width:20px;
  text-align:center;
  font-family:'Fredoka',sans-serif;
  font-weight:700;
  font-size:15px;
  color:var(--tinta);
}

/* ===== FOOTER ===== */
body[data-tpl="sm-vino"] .sm-foot{
  text-align:center;
  padding:34px 20px 120px;
}
body[data-tpl="sm-vino"] .sm-foot .sm-foot-drip{font-size:22px;letter-spacing:6px;color:var(--marca);}
body[data-tpl="sm-vino"] .sm-foot p{
  font-family:'Sacramento',cursive;
  font-size:24px;
  color:rgba(253,248,218,.85);
  margin:10px 0 0;
}

/* ===== CART FAB (compartido) ===== */
body[data-tpl="sm-vino"] #cart-fab{
  background:var(--marca) !important;
  color:var(--tinta) !important;
  box-shadow:0 14px 30px -10px rgba(0,0,0,.65), 0 0 0 4px rgba(253,248,218,.18) !important;
  border:none !important;
  font-family:'Fredoka',sans-serif !important;
  font-weight:700 !important;
}
body[data-tpl="sm-vino"] #cart-fab *{color:var(--tinta) !important;}
body[data-tpl="sm-vino"] #cart-fab .badge,
body[data-tpl="sm-vino"] #cart-fab [class*="badge"]{
  background:var(--tinta) !important;
  color:var(--crema) !important;
}

/* ===== CART PANEL (compartido) ===== */
body[data-tpl="sm-vino"] #cart{
  background:var(--tinta) !important;
  color:var(--crema) !important;
  border-top:3px solid var(--marca) !important;
  border-top-left-radius:22px !important;
  border-top-right-radius:22px !important;
  box-shadow:0 -20px 50px -20px rgba(0,0,0,.7) !important;
  font-family:'Fredoka',sans-serif !important;
}
body[data-tpl="sm-vino"] #cart h2,
body[data-tpl="sm-vino"] #cart h3,
body[data-tpl="sm-vino"] #cart .cart-title{
  font-family:'Fredoka',sans-serif !important;
  color:var(--crema) !important;
}
body[data-tpl="sm-vino"] #cart .cart-row{
  border-bottom:1px solid rgba(253,248,218,.14) !important;
  color:var(--crema) !important;
}
body[data-tpl="sm-vino"] #cart .cart-row [class*="price"],
body[data-tpl="sm-vino"] #cart .cart-total,
body[data-tpl="sm-vino"] #cart [class*="total"]{
  color:var(--marca) !important;
}
body[data-tpl="sm-vino"] #cart button[class*="send"],
body[data-tpl="sm-vino"] #cart button[class*="checkout"],
body[data-tpl="sm-vino"] #cart .cart-send,
body[data-tpl="sm-vino"] #cart button[type="submit"]{
  background:var(--marca) !important;
  color:var(--tinta) !important;
  border:none !important;
  border-radius:999px !important;
  font-family:'Fredoka',sans-serif !important;
  font-weight:700 !important;
}
  `,
  render(R, root, ctrl, slug){
    const menu = Array.isArray(R.menu) ? R.menu : [];

    const navHtml = menu.length > 1 ? `
      <nav class="sm-nav">
        ${menu.map((cat,i)=>`<button data-cat="${slug(cat.categoria)}"${i===0?' class="active"':''}>${cat.categoria}</button>`).join("")}
      </nav>` : "";

    const pad = n => String(n).padStart(2,"0");

    const sectionsHtml = menu.map((cat, ci) => {
      const items = Array.isArray(cat.items) ? cat.items : [];
      const feat = items[0];
      const rest = items.slice(1);

      const featHtml = feat ? `
        <article class="sm-feature">
          <div class="sm-feature-num">PLATO DESTACADO · ${pad(ci+1)}</div>
          <div class="sm-feature-media">
            ${feat.foto
              ? `<img src="${feat.foto}" alt="${feat.nombre}">`
              : `<span class="sm-feature-emoji">${feat.emoji || "🧀"}</span>`}
          </div>
          <h3 class="sm-feature-name">${feat.nombre}</h3>
          ${feat.desc ? `<p class="sm-feature-desc">${feat.desc}</p>` : ``}
          <div class="sm-feature-foot">
            <span class="sm-price-big"><small>$</small>${Number(feat.precio).toFixed(2)}</span>
            <span class="sm-card-ctrl">${ctrl(feat.id)}</span>
          </div>
        </article>` : "";

      const restHtml = rest.length ? `
        <div class="sm-list">
          ${rest.map(it => `
            <div class="sm-card">
              <div class="sm-thumb">
                ${it.foto
                  ? `<img src="${it.foto}" alt="${it.nombre}">`
                  : `<span class="sm-emoji">${it.emoji || "🧀"}</span>`}
              </div>
              <div class="sm-info">
                <h4 class="sm-item-name">${it.nombre}</h4>
                ${it.desc ? `<p class="sm-item-desc">${it.desc}</p>` : ``}
                <span class="sm-item-price"><small>$</small> ${Number(it.precio).toFixed(2)}</span>
              </div>
              <div class="sm-card-ctrl">${ctrl(it.id)}</div>
            </div>`).join("")}
        </div>` : "";

      return `
        <section class="sm-section" id="cat-${slug(cat.categoria)}">
          <div class="sm-cat-head">
            <span class="sm-cat-num">${pad(ci+1)}</span>
            <h2 class="sm-cat-title">${cat.categoria}</h2>
            <span class="sm-cat-line"></span>
          </div>
          ${featHtml}
          ${restHtml}
        </section>`;
    }).join("");

    root.innerHTML = `
      <div class="tpl-wrap">
        <header class="sm-header">
          <div class="sm-logo">
            ${R.logo
              ? `<img src="${R.logo}" alt="${R.nombre}" onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<span class=\\'sm-logo-fallback\\'>🧀</span>')">`
              : `<span class="sm-logo-fallback">🧀</span>`}
          </div>
          <h1 class="sm-name">${R.nombre}</h1>
          ${R.slogan ? `<p class="sm-slogan">${R.slogan}</p>` : ``}
          <span class="sm-eyebrow">Carta de Autor</span>
          <div class="sm-drip" aria-hidden="true">
            <svg viewBox="0 0 100 26" preserveAspectRatio="none">
              <path d="M0 0 H100 V8
                       Q92 8 90 16 Q88 23 84 23 Q80 23 78 15 Q76 8 70 8
                       Q60 8 58 18 Q56 25 52 25 Q48 25 46 17 Q44 8 36 8
                       Q26 8 24 14 Q22 19 18 19 Q14 19 12 12 Q10 8 0 8 Z"
                    fill="var(--marca)"></path>
            </svg>
            <span class="sm-blob b1"></span>
            <span class="sm-blob b2"></span>
            <span class="sm-blob b3"></span>
          </div>
        </header>

        ${navHtml}

        <main>
          ${sectionsHtml}
        </main>

        <footer class="sm-foot">
          <div class="sm-foot-drip">• • •</div>
          <p>Tan quesoso como delicioso</p>
        </footer>
      </div>
    `;
  }
};
