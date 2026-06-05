window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["sm-delivery"] = {
  label: "Delivery Premium",
  css: `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Pacifico&display=swap');

body[data-tpl="sm-delivery"]{
  background:var(--tinta);
  color:var(--crema);
  font-family:'Fredoka',system-ui,-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased;
  margin:0;
}
body[data-tpl="sm-delivery"] *{box-sizing:border-box;}
body[data-tpl="sm-delivery"] .sm-app{
  max-width:520px;
  margin:0 auto;
  position:relative;
}

/* ===================== HEADER ===================== */
body[data-tpl="sm-delivery"] .sm-top{
  position:relative;
  padding:18px 18px 0;
  background:
    radial-gradient(120% 80% at 18% -20%, rgba(252,189,67,.16), transparent 60%),
    radial-gradient(100% 70% at 110% 0%, rgba(164,105,75,.20), transparent 55%);
}
body[data-tpl="sm-delivery"] .sm-bar{
  display:flex;
  align-items:center;
  gap:12px;
}
body[data-tpl="sm-delivery"] .sm-logo{
  flex:0 0 auto;
  width:56px;height:56px;
  border-radius:50%;
  display:grid;place-items:center;
  background:
    radial-gradient(circle at 36% 30%, rgba(253,248,218,.45), transparent 55%),
    var(--marca);
  box-shadow:0 0 0 3px rgba(253,248,218,.85), 0 8px 18px -8px rgba(0,0,0,.6);
  overflow:hidden;
}
body[data-tpl="sm-delivery"] .sm-logo img{width:100%;height:100%;object-fit:cover;display:block;}
body[data-tpl="sm-delivery"] .sm-logo .sm-logo-fb{font-size:30px;line-height:1;}

body[data-tpl="sm-delivery"] .sm-brand{flex:1;min-width:0;}
body[data-tpl="sm-delivery"] .sm-name{
  font-weight:700;
  font-size:23px;
  line-height:1;
  letter-spacing:.3px;
  margin:0;
  color:var(--crema);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
body[data-tpl="sm-delivery"] .sm-slogan{
  font-family:'Pacifico',cursive;
  font-size:14px;
  line-height:1.1;
  margin:3px 0 0;
  color:var(--marca);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
body[data-tpl="sm-delivery"] .sm-deliv-pill{
  flex:0 0 auto;
  display:inline-flex;
  align-items:center;
  gap:5px;
  font-size:11px;
  font-weight:600;
  letter-spacing:.2px;
  color:var(--tinta);
  background:var(--marca);
  border-radius:999px;
  padding:6px 11px;
  box-shadow:0 6px 14px -6px rgba(0,0,0,.5);
}
body[data-tpl="sm-delivery"] .sm-deliv-pill .sm-dot{
  width:6px;height:6px;border-radius:50%;
  background:var(--tinta);
}

/* ===== SEARCH (decorativa) ===== */
body[data-tpl="sm-delivery"] .sm-search{
  display:flex;
  align-items:center;
  gap:10px;
  margin:14px 0 16px;
  padding:12px 16px;
  border-radius:16px;
  background:var(--crema);
  color:rgba(106,27,55,.55);
  box-shadow:0 10px 24px -14px rgba(0,0,0,.55), inset 0 0 0 1px rgba(164,105,75,.18);
  font-size:14px;
  font-weight:500;
  cursor:text;
}
body[data-tpl="sm-delivery"] .sm-search svg{flex:0 0 auto;width:18px;height:18px;}
body[data-tpl="sm-delivery"] .sm-search .sm-search-key{
  margin-left:auto;
  font-size:10px;
  font-weight:600;
  letter-spacing:.5px;
  color:var(--acento);
  background:rgba(164,105,75,.12);
  border-radius:7px;
  padding:3px 7px;
}

/* ===================== CARRUSEL ===================== */
body[data-tpl="sm-delivery"] .sm-rail-head{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  padding:0 18px;
  margin:4px 0 12px;
}
body[data-tpl="sm-delivery"] .sm-rail-title{
  font-weight:700;
  font-size:17px;
  letter-spacing:.2px;
  margin:0;
  color:var(--crema);
  display:flex;
  align-items:center;
  gap:7px;
}
body[data-tpl="sm-delivery"] .sm-rail-title .sm-fire{
  font-size:15px;
  filter:drop-shadow(0 2px 4px rgba(0,0,0,.4));
}
body[data-tpl="sm-delivery"] .sm-rail-sub{
  font-size:11px;
  font-weight:500;
  color:rgba(253,248,218,.55);
}
body[data-tpl="sm-delivery"] .sm-rail{
  display:flex;
  gap:14px;
  overflow-x:auto;
  padding:4px 18px 22px;
  scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;
  scrollbar-width:none;
}
body[data-tpl="sm-delivery"] .sm-rail::-webkit-scrollbar{display:none;}
body[data-tpl="sm-delivery"] .sm-hero{
  scroll-snap-align:start;
  flex:0 0 70%;
  max-width:240px;
  position:relative;
  border-radius:22px;
  padding:0 0 16px;
  background:linear-gradient(165deg, rgba(252,189,67,.10), rgba(164,105,75,.14)), rgba(253,248,218,.05);
  border:1px solid rgba(253,248,218,.14);
  box-shadow:0 20px 38px -22px rgba(0,0,0,.75);
  overflow:hidden;
}
body[data-tpl="sm-delivery"] .sm-hero-media{
  position:relative;
  height:128px;
  display:grid;place-items:center;
  background:
    radial-gradient(circle at 50% 28%, rgba(252,189,67,.30), transparent 62%),
    rgba(106,27,55,.45);
  overflow:hidden;
}
body[data-tpl="sm-delivery"] .sm-hero-media img{width:100%;height:100%;object-fit:cover;display:block;}
body[data-tpl="sm-delivery"] .sm-hero-emoji{
  font-size:64px;line-height:1;
  filter:drop-shadow(0 8px 14px rgba(0,0,0,.5));
}
/* drip de queso bajo la imagen del hero */
body[data-tpl="sm-delivery"] .sm-hero-media::after{
  content:"";
  position:absolute;left:0;right:0;bottom:-1px;height:14px;
  background:
    radial-gradient(11px 16px at 12% 0, var(--marca) 49%, transparent 51%),
    radial-gradient(9px 12px at 32% 0, var(--marca) 49%, transparent 51%),
    radial-gradient(13px 20px at 52% 0, var(--marca) 49%, transparent 51%),
    radial-gradient(8px 11px at 72% 0, var(--marca) 49%, transparent 51%),
    radial-gradient(11px 16px at 90% 0, var(--marca) 49%, transparent 51%);
  background-repeat:no-repeat;
}
body[data-tpl="sm-delivery"] .sm-hero-tag{
  position:absolute;top:10px;left:10px;
  z-index:2;
  font-size:10px;font-weight:700;letter-spacing:.4px;
  text-transform:uppercase;
  color:var(--tinta);
  background:var(--marca);
  border-radius:999px;
  padding:4px 9px;
  box-shadow:0 4px 10px -3px rgba(0,0,0,.5);
}
body[data-tpl="sm-delivery"] .sm-hero-body{
  padding:14px 14px 0;
}
body[data-tpl="sm-delivery"] .sm-hero-name{
  font-weight:600;
  font-size:16px;
  line-height:1.18;
  margin:0 0 4px;
  color:var(--crema);
}
body[data-tpl="sm-delivery"] .sm-hero-desc{
  font-size:11.5px;
  font-weight:400;
  line-height:1.35;
  color:rgba(253,248,218,.62);
  margin:0 0 12px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  min-height:31px;
}
body[data-tpl="sm-delivery"] .sm-hero-foot{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
body[data-tpl="sm-delivery"] .sm-hero-price{
  font-weight:700;
  font-size:19px;
  color:var(--marca);
}
body[data-tpl="sm-delivery"] .sm-hero-price small{font-size:12px;font-weight:500;opacity:.85;}

/* ===================== CHIPS CATEGORIA (sticky) ===================== */
body[data-tpl="sm-delivery"] .sm-chips{
  position:sticky;
  top:0;
  z-index:20;
  display:flex;
  gap:9px;
  overflow-x:auto;
  padding:12px 18px;
  background:linear-gradient(var(--tinta) 78%, rgba(106,27,55,0));
  -webkit-overflow-scrolling:touch;
  scrollbar-width:none;
}
body[data-tpl="sm-delivery"] .sm-chips::-webkit-scrollbar{display:none;}
body[data-tpl="sm-delivery"] .sm-chips button{
  flex:0 0 auto;
  font-family:'Fredoka',sans-serif;
  font-weight:500;
  font-size:13.5px;
  letter-spacing:.2px;
  color:var(--crema);
  background:rgba(253,248,218,.07);
  border:1px solid rgba(253,248,218,.20);
  padding:9px 17px;
  border-radius:999px;
  cursor:pointer;
  white-space:nowrap;
  transition:background .18s ease, color .18s ease, border-color .18s ease;
}
body[data-tpl="sm-delivery"] .sm-chips button:hover{border-color:var(--marca);}
body[data-tpl="sm-delivery"] .sm-chips button.active{
  background:var(--marca);
  color:var(--tinta);
  border-color:var(--marca);
  font-weight:600;
  box-shadow:0 6px 14px -6px rgba(252,189,67,.6);
}

/* ===================== SECCIONES + TARJETAS HORIZONTALES ===================== */
body[data-tpl="sm-delivery"] .sm-section{
  padding:16px 18px 4px;
  scroll-margin-top:60px;
}
body[data-tpl="sm-delivery"] .sm-cat-head{
  display:flex;
  align-items:center;
  gap:10px;
  margin:6px 2px 14px;
}
body[data-tpl="sm-delivery"] .sm-cat-head .sm-cheese{
  flex:0 0 auto;
  position:relative;
  width:22px;height:22px;border-radius:50%;
  background:var(--marca);
  box-shadow:0 3px 8px -2px rgba(252,189,67,.6);
}
body[data-tpl="sm-delivery"] .sm-cat-head .sm-cheese::before,
body[data-tpl="sm-delivery"] .sm-cat-head .sm-cheese::after{
  content:"";position:absolute;border-radius:50%;background:var(--acento);opacity:.6;
}
body[data-tpl="sm-delivery"] .sm-cat-head .sm-cheese::before{width:5px;height:5px;top:5px;left:6px;}
body[data-tpl="sm-delivery"] .sm-cat-head .sm-cheese::after{width:3.5px;height:3.5px;bottom:5px;right:6px;}
body[data-tpl="sm-delivery"] .sm-cat-head h2{
  font-weight:700;
  font-size:20px;
  letter-spacing:.2px;
  margin:0;
  color:var(--crema);
}
body[data-tpl="sm-delivery"] .sm-cat-head .sm-line{
  flex:1;height:1px;
  background:linear-gradient(90deg, rgba(164,105,75,.7), rgba(164,105,75,0));
}

body[data-tpl="sm-delivery"] .sm-list{
  display:flex;
  flex-direction:column;
  gap:12px;
}
body[data-tpl="sm-delivery"] .sm-row{
  position:relative;
  display:flex;
  align-items:center;
  gap:14px;
  padding:12px;
  border-radius:18px;
  background:rgba(253,248,218,.05);
  border:1px solid rgba(253,248,218,.10);
  box-shadow:0 10px 26px -20px rgba(0,0,0,.8);
  transition:transform .15s ease, border-color .18s ease;
}
body[data-tpl="sm-delivery"] .sm-row:active{transform:scale(.99);}
body[data-tpl="sm-delivery"] .sm-row.is-active{border-color:rgba(252,189,67,.45);}

body[data-tpl="sm-delivery"] .sm-thumb{
  flex:0 0 72px;
  width:72px;height:72px;
  border-radius:15px;
  display:grid;place-items:center;
  background:
    radial-gradient(circle at 50% 32%, rgba(252,189,67,.22), transparent 68%),
    rgba(106,27,55,.5);
  border:1px solid rgba(253,248,218,.10);
  overflow:hidden;
}
body[data-tpl="sm-delivery"] .sm-thumb img{width:100%;height:100%;object-fit:cover;display:block;}
body[data-tpl="sm-delivery"] .sm-thumb .sm-emoji{
  font-size:36px;line-height:1;
  filter:drop-shadow(0 4px 7px rgba(0,0,0,.45));
}

body[data-tpl="sm-delivery"] .sm-info{flex:1;min-width:0;}
body[data-tpl="sm-delivery"] .sm-iname{
  font-weight:600;
  font-size:16px;
  line-height:1.2;
  margin:0 0 3px;
  color:var(--crema);
}
body[data-tpl="sm-delivery"] .sm-idesc{
  font-size:12px;
  font-weight:400;
  line-height:1.4;
  color:rgba(253,248,218,.6);
  margin:0 0 8px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
body[data-tpl="sm-delivery"] .sm-irow{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
body[data-tpl="sm-delivery"] .sm-iprice{
  font-weight:700;
  font-size:16px;
  color:var(--marca);
  white-space:nowrap;
}
body[data-tpl="sm-delivery"] .sm-iprice small{font-size:11px;font-weight:500;opacity:.85;}

/* ===================== CONTROL DE CANTIDAD (ctrl del motor) ===================== */
body[data-tpl="sm-delivery"] [data-qtywrap]{
  display:inline-flex;
  align-items:center;
  gap:0;
  flex:0 0 auto;
}
body[data-tpl="sm-delivery"] [data-add],
body[data-tpl="sm-delivery"] [data-sub]{
  width:34px;height:34px;
  border:none;border-radius:50%;
  font-family:'Fredoka',sans-serif;
  font-weight:700;font-size:21px;line-height:1;
  cursor:pointer;
  display:grid;place-items:center;
  transition:transform .12s ease, background .18s ease;
}
body[data-tpl="sm-delivery"] [data-add]{
  background:var(--marca);
  color:var(--tinta);
  box-shadow:0 6px 14px -5px rgba(252,189,67,.65);
}
body[data-tpl="sm-delivery"] [data-add]:active{transform:scale(.88);}
body[data-tpl="sm-delivery"] [data-sub]{
  background:transparent;
  color:var(--marca);
  border:1.5px solid var(--marca);
  width:30px;height:30px;font-size:19px;
  opacity:0;transform:scale(.4);
  pointer-events:none;
  transition:opacity .16s ease, transform .16s ease;
}
body[data-tpl="sm-delivery"] [data-sub]:active{transform:scale(.9);}
body[data-tpl="sm-delivery"] [data-cant]{
  width:0;
  text-align:center;
  font-family:'Fredoka',sans-serif;
  font-weight:700;font-size:16px;
  color:var(--crema);
  overflow:hidden;
  opacity:0;
  transition:width .16s ease, opacity .16s ease;
}
body[data-tpl="sm-delivery"] [data-qtywrap].has-qty{gap:7px;}
body[data-tpl="sm-delivery"] [data-qtywrap].has-qty [data-sub]{
  opacity:1;transform:scale(1);pointer-events:auto;
}
body[data-tpl="sm-delivery"] [data-qtywrap].has-qty [data-cant]{
  width:22px;opacity:1;
}

/* ===================== FOOTER ===================== */
body[data-tpl="sm-delivery"] .sm-foot{
  text-align:center;
  padding:30px 20px 130px;
}
body[data-tpl="sm-delivery"] .sm-foot .sm-foot-cheese{
  font-size:22px;
  display:block;
  margin-bottom:8px;
  filter:drop-shadow(0 4px 8px rgba(0,0,0,.4));
}
body[data-tpl="sm-delivery"] .sm-foot p{
  font-family:'Pacifico',cursive;
  font-size:18px;
  color:rgba(253,248,218,.8);
  margin:0;
}

/* ===================== CART FAB (compartido) ===================== */
body[data-tpl="sm-delivery"] #cart-fab{
  background:var(--marca)!important;
  color:var(--tinta)!important;
  box-shadow:0 14px 30px -10px rgba(0,0,0,.6), 0 0 0 4px rgba(253,248,218,.18)!important;
  border:none!important;
  font-family:'Fredoka',sans-serif!important;
  font-weight:700!important;
}
body[data-tpl="sm-delivery"] #cart-fab *{color:var(--tinta)!important;}
body[data-tpl="sm-delivery"] #cart-fab .badge,
body[data-tpl="sm-delivery"] #cart-fab [class*="badge"]{
  background:var(--tinta)!important;
  color:var(--crema)!important;
  border:2px solid var(--marca)!important;
}

/* ===================== CART PANEL (compartido) ===================== */
body[data-tpl="sm-delivery"] #cart{
  background:var(--tinta)!important;
  color:var(--crema)!important;
  border-top:3px solid var(--marca)!important;
  border-top-left-radius:24px!important;
  border-top-right-radius:24px!important;
  box-shadow:0 -20px 50px -20px rgba(0,0,0,.7)!important;
  font-family:'Fredoka',sans-serif!important;
}
body[data-tpl="sm-delivery"] #cart h1,
body[data-tpl="sm-delivery"] #cart h2,
body[data-tpl="sm-delivery"] #cart h3,
body[data-tpl="sm-delivery"] #cart .cart-title{
  font-family:'Fredoka',sans-serif!important;
  color:var(--crema)!important;
}
body[data-tpl="sm-delivery"] #cart .cart-row{
  border-bottom:1px solid rgba(253,248,218,.14)!important;
  color:var(--crema)!important;
}
body[data-tpl="sm-delivery"] #cart .cart-row [class*="price"],
body[data-tpl="sm-delivery"] #cart .cart-total,
body[data-tpl="sm-delivery"] #cart [class*="total"]{
  color:var(--marca)!important;
}
body[data-tpl="sm-delivery"] #cart [data-add],
body[data-tpl="sm-delivery"] #cart [data-sub]{
  background:rgba(252,189,67,.16)!important;
  color:var(--marca)!important;
  border-color:var(--marca)!important;
}
body[data-tpl="sm-delivery"] #cart button[class*="send"],
body[data-tpl="sm-delivery"] #cart button[class*="checkout"],
body[data-tpl="sm-delivery"] #cart button[class*="check"],
body[data-tpl="sm-delivery"] #cart .cart-send,
body[data-tpl="sm-delivery"] #cart .cart-checkout,
body[data-tpl="sm-delivery"] #cart button[type="submit"]{
  background:var(--marca)!important;
  color:var(--tinta)!important;
  border:none!important;
  border-radius:999px!important;
  font-family:'Fredoka',sans-serif!important;
  font-weight:700!important;
}
  `,
  render(R, root, ctrl, slug) {
    const cats = Array.isArray(R.menu) ? R.menu : [];

    // ---- pool de "mas pedidos": toma los primeros items de las categorias ----
    const pool = [];
    cats.forEach(cat => (cat.items || []).forEach(it => pool.push(it)));
    const heroes = pool.slice(0, 3);
    const heroTags = ["Top ventas", "Favorito", "Recomendado"];

    const heroHtml = heroes.length ? `
      <div class="sm-rail-head">
        <h2 class="sm-rail-title"><span class="sm-fire">🔥</span> Los más pedidos</h2>
        <span class="sm-rail-sub">Desliza →</span>
      </div>
      <div class="sm-rail">
        ${heroes.map((it, i) => `
          <article class="sm-hero">
            <div class="sm-hero-media">
              <span class="sm-hero-tag">${heroTags[i] || "Estrella"}</span>
              ${it.foto
                ? `<img src="${it.foto}" alt="${it.nombre}">`
                : `<span class="sm-hero-emoji">${it.emoji || "🧀"}</span>`}
            </div>
            <div class="sm-hero-body">
              <h3 class="sm-hero-name">${it.nombre}</h3>
              <p class="sm-hero-desc">${it.desc || ""}</p>
              <div class="sm-hero-foot">
                <span class="sm-hero-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
                ${ctrl(it.id)}
              </div>
            </div>
          </article>`).join("")}
      </div>` : "";

    // ---- chips de categoria (sticky) ----
    const chipsHtml = cats.length > 1 ? `
      <nav class="sm-chips">
        ${cats.map((cat, i) => `<button data-cat="${slug(cat.categoria)}"${i === 0 ? ' class="active"' : ''}>${cat.categoria}</button>`).join("")}
      </nav>` : "";

    // ---- secciones con tarjetas horizontales ----
    const sectionsHtml = cats.map(cat => {
      const items = cat.items || [];
      const rowsHtml = items.map(it => `
        <article class="sm-row">
          <div class="sm-thumb">
            ${it.foto
              ? `<img src="${it.foto}" alt="${it.nombre}">`
              : `<span class="sm-emoji">${it.emoji || "🧀"}</span>`}
          </div>
          <div class="sm-info">
            <h3 class="sm-iname">${it.nombre}</h3>
            ${it.desc ? `<p class="sm-idesc">${it.desc}</p>` : ``}
            <div class="sm-irow">
              <span class="sm-iprice"><small>$</small>${Number(it.precio).toFixed(2)}</span>
              ${ctrl(it.id)}
            </div>
          </div>
        </article>`).join("");

      return `
        <section class="sm-section" id="cat-${slug(cat.categoria)}">
          <div class="sm-cat-head">
            <span class="sm-cheese"></span>
            <h2>${cat.categoria}</h2>
            <span class="sm-line"></span>
          </div>
          <div class="sm-list">
            ${rowsHtml}
          </div>
        </section>`;
    }).join("");

    root.innerHTML = `
      <div class="sm-app">
        <header class="sm-top">
          <div class="sm-bar">
            <div class="sm-logo">
              ${R.logo
                ? `<img src="${R.logo}" alt="${R.nombre}" onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<span class=\\'sm-logo-fb\\'>🧀</span>')">`
                : `<span class="sm-logo-fb">🧀</span>`}
            </div>
            <div class="sm-brand">
              <h1 class="sm-name">${R.nombre}</h1>
              ${R.slogan ? `<p class="sm-slogan">${R.slogan}</p>` : ``}
            </div>
            <span class="sm-deliv-pill"><span class="sm-dot"></span> 25-35 min</span>
          </div>
          <div class="sm-search" role="search" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
            </svg>
            <span>Buscar moros, antojos, bebidas…</span>
            <span class="sm-search-key">MENÚ</span>
          </div>
        </header>

        ${heroHtml}

        ${chipsHtml}

        <main>
          ${sectionsHtml}
        </main>

        <footer class="sm-foot">
          <span class="sm-foot-cheese">🧀</span>
          <p>${R.slogan || "Tan quesoso como delicioso"}</p>
        </footer>
      </div>
    `;
  }
};
