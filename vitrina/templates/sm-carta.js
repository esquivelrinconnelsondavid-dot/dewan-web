window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["sm-carta"] = {
  label: "Carta Quesosa",
  css: `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Sacramento&display=swap');

body[data-tpl="sm-carta"]{
  background:
    radial-gradient(circle at 18% -8%, rgba(252,189,67,.10), transparent 42%),
    radial-gradient(circle at 92% 4%, rgba(164,105,75,.16), transparent 46%),
    var(--tinta);
  color: var(--crema);
  font-family: 'Fredoka', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ---------- HEADER ---------- */
body[data-tpl="sm-carta"] .sm-header{
  position: relative;
  text-align: center;
  padding: 30px 22px 40px;
  overflow: hidden;
}
body[data-tpl="sm-carta"] .sm-header::after{
  /* goteo de queso amarillo al borde inferior del header */
  content:"";
  position:absolute; left:0; right:0; bottom:0; height:20px;
  background:
    radial-gradient(circle at 8px 0, var(--marca) 8px, transparent 9px) 0 100%/26px 20px repeat-x,
    linear-gradient(var(--marca), var(--marca)) 0 0/100% 9px no-repeat;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,.22));
  opacity:.95;
}
body[data-tpl="sm-carta"] .sm-logo-wrap{
  width: 116px; height: 116px;
  margin: 0 auto 14px;
  border-radius: 50%;
  display:flex; align-items:center; justify-content:center;
  background: radial-gradient(circle at 32% 28%, #ffe39a, var(--marca) 72%);
  border: 3px solid var(--crema);
  box-shadow: 0 10px 26px rgba(0,0,0,.32), inset 0 0 0 6px rgba(106,27,55,.10);
  position: relative;
}
body[data-tpl="sm-carta"] .sm-logo-wrap::before{
  /* "agujeros" de queso decorativos */
  content:"";
  position:absolute; inset:14px;
  border-radius:50%;
  background:
    radial-gradient(circle at 30% 38%, rgba(164,105,75,.35) 0 5px, transparent 6px),
    radial-gradient(circle at 68% 30%, rgba(164,105,75,.30) 0 4px, transparent 5px),
    radial-gradient(circle at 58% 66%, rgba(164,105,75,.30) 0 6px, transparent 7px),
    radial-gradient(circle at 36% 70%, rgba(164,105,75,.25) 0 3px, transparent 4px);
  pointer-events:none;
}
body[data-tpl="sm-carta"] .sm-logo-wrap img{
  width: 100%; height: 100%;
  object-fit: cover; border-radius: 50%;
  position: relative; z-index:1;
}
body[data-tpl="sm-carta"] .sm-logo-emoji{
  font-size: 56px; line-height:1; position:relative; z-index:1;
  filter: drop-shadow(0 2px 3px rgba(106,27,55,.4));
}
body[data-tpl="sm-carta"] .sm-name{
  font-family:'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 33px;
  letter-spacing: .5px;
  color: var(--crema);
  margin: 2px 0 2px;
  text-shadow: 0 2px 0 rgba(0,0,0,.18);
}
body[data-tpl="sm-carta"] .sm-slogan{
  font-family:'Sacramento', cursive;
  font-size: 27px;
  line-height:1;
  color: var(--marca);
  margin-top: 4px;
  text-shadow: 0 1px 6px rgba(0,0,0,.25);
}
body[data-tpl="sm-carta"] .sm-rule{
  display:flex; align-items:center; justify-content:center; gap:10px;
  margin: 14px auto 0; max-width: 230px;
  color: var(--marca);
}
body[data-tpl="sm-carta"] .sm-rule::before,
body[data-tpl="sm-carta"] .sm-rule::after{
  content:""; flex:1; height:2px; border-radius:2px;
  background: linear-gradient(90deg, transparent, var(--acento), transparent);
}
body[data-tpl="sm-carta"] .sm-rule span{ font-size:13px; }

/* ---------- NAV CATEGORIAS ---------- */
body[data-tpl="sm-carta"] .sm-nav{
  position: sticky; top: 0; z-index: 20;
  display:flex; gap:8px; overflow-x:auto;
  padding: 12px 16px;
  background: linear-gradient(var(--tinta), rgba(106,27,55,.92));
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(252,189,67,.22);
  scrollbar-width:none;
}
body[data-tpl="sm-carta"] .sm-nav::-webkit-scrollbar{ display:none; }
body[data-tpl="sm-carta"] .sm-nav button{
  flex: 0 0 auto;
  font-family:'Fredoka', sans-serif; font-weight:500; font-size:13.5px;
  color: var(--crema);
  background: rgba(253,248,218,.07);
  border: 1px solid rgba(252,189,67,.35);
  padding: 7px 15px; border-radius: 999px;
  white-space: nowrap; cursor: pointer;
  transition: all .18s ease;
}
body[data-tpl="sm-carta"] .sm-nav button:hover{ background: rgba(252,189,67,.18); }
body[data-tpl="sm-carta"] .sm-nav button.active{
  background: var(--marca); color: var(--tinta);
  border-color: var(--marca); font-weight:600;
  box-shadow: 0 3px 10px rgba(252,189,67,.3);
}

/* ---------- MENU ---------- */
body[data-tpl="sm-carta"] .sm-menu{ padding: 22px 18px 130px; }
body[data-tpl="sm-carta"] .sm-cat{ margin-bottom: 30px; }
body[data-tpl="sm-carta"] .sm-cat-head{
  display:flex; align-items:center; gap:11px;
  margin: 4px 0 16px;
}
body[data-tpl="sm-carta"] .sm-cheese-badge{
  flex:0 0 auto;
  width: 26px; height: 26px; border-radius:50%;
  background: radial-gradient(circle at 34% 30%, #ffe39a, var(--marca) 75%);
  border: 2px solid var(--crema);
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
  position: relative;
}
body[data-tpl="sm-carta"] .sm-cheese-badge::after{
  content:""; position:absolute; inset:4px; border-radius:50%;
  background:
    radial-gradient(circle at 32% 40%, rgba(164,105,75,.45) 0 2px, transparent 3px),
    radial-gradient(circle at 66% 60%, rgba(164,105,75,.4) 0 2px, transparent 3px);
}
body[data-tpl="sm-carta"] .sm-cat-title{
  font-family:'Fredoka', sans-serif; font-weight:600;
  font-size: 21px; color: var(--crema);
  letter-spacing:.3px;
}

/* ---------- ITEM (linea de carta) ---------- */
body[data-tpl="sm-carta"] .sm-item{
  display:flex; align-items:flex-start; gap:13px;
  padding: 13px 0;
  position: relative;
}
body[data-tpl="sm-carta"] .sm-item + .sm-item{
  border-top: 2px dotted rgba(252,189,67,.4);
}
body[data-tpl="sm-carta"] .sm-thumb{
  flex:0 0 auto;
  width: 52px; height:52px; border-radius: 14px;
  display:flex; align-items:center; justify-content:center;
  font-size: 26px;
  background: linear-gradient(150deg, rgba(252,189,67,.16), rgba(164,105,75,.20));
  border: 1.5px solid rgba(252,189,67,.30);
  box-shadow: inset 0 1px 3px rgba(0,0,0,.18);
}
body[data-tpl="sm-carta"] .sm-thumb img{
  width:100%; height:100%; object-fit:cover; border-radius: 13px;
}
body[data-tpl="sm-carta"] .sm-body{ flex:1 1 auto; min-width:0; }
body[data-tpl="sm-carta"] .sm-line{
  display:flex; align-items:baseline; gap:8px;
}
body[data-tpl="sm-carta"] .sm-iname{
  font-family:'Fredoka', sans-serif; font-weight:500;
  font-size: 16.5px; color: var(--crema);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  flex: 0 1 auto;
}
body[data-tpl="sm-carta"] .sm-leaders{
  flex:1 1 auto;
  height: 0;
  align-self: flex-end;
  margin-bottom: 4px;
  border-bottom: 2px dotted rgba(252,189,67,.55);
  min-width: 14px;
}
body[data-tpl="sm-carta"] .sm-price{
  flex: 0 0 auto;
  font-family:'Fredoka', sans-serif; font-weight:700;
  font-size: 16.5px; color: var(--marca);
  letter-spacing:.2px;
}
body[data-tpl="sm-carta"] .sm-desc{
  font-size: 13px; line-height:1.4;
  color: rgba(253,248,218,.7);
  margin-top: 4px;
  font-weight: 400;
}
body[data-tpl="sm-carta"] .sm-ctrl-row{ margin-top: 9px; }

/* ---------- CONTROL CANTIDAD (motor) ---------- */
body[data-tpl="sm-carta"] [data-qtywrap]{
  display:inline-flex; align-items:center; gap:0;
  background: rgba(253,248,218,.06);
  border: 1.5px solid rgba(252,189,67,.4);
  border-radius: 999px;
  overflow:hidden;
  transition: all .2s ease;
}
body[data-tpl="sm-carta"] [data-qtywrap].has-qty{
  background: var(--marca);
  border-color: var(--marca);
  box-shadow: 0 3px 12px rgba(252,189,67,.3);
}
body[data-tpl="sm-carta"] [data-qtywrap] button,
body[data-tpl="sm-carta"] [data-add],
body[data-tpl="sm-carta"] [data-sub]{
  width: 32px; height: 32px;
  border:0; cursor:pointer;
  font-family:'Fredoka', sans-serif; font-size: 19px; font-weight:600;
  line-height:1;
  background: transparent; color: var(--crema);
  display:flex; align-items:center; justify-content:center;
}
body[data-tpl="sm-carta"] [data-qtywrap].has-qty button,
body[data-tpl="sm-carta"] [data-qtywrap].has-qty [data-add],
body[data-tpl="sm-carta"] [data-qtywrap].has-qty [data-sub]{
  color: var(--tinta);
}
body[data-tpl="sm-carta"] [data-qtywrap] [data-sub]{ display:none; }
body[data-tpl="sm-carta"] [data-qtywrap].has-qty [data-sub]{ display:flex; }
body[data-tpl="sm-carta"] [data-cant]{
  min-width: 0; width:0; overflow:hidden;
  text-align:center;
  font-family:'Fredoka', sans-serif; font-weight:700; font-size:15px;
  color: var(--tinta);
  transition: width .2s ease;
}
body[data-tpl="sm-carta"] [data-qtywrap].has-qty [data-cant]{ width: 26px; }
body[data-tpl="sm-carta"] [data-qtywrap]:not(.has-qty) [data-add]::after{
  content:" Agregar";
  font-size: 13px; font-weight:500; white-space:nowrap;
}
body[data-tpl="sm-carta"] [data-qtywrap]:not(.has-qty) [data-add]{
  width:auto; padding: 0 16px 0 13px;
}

/* ---------- FOOTER ---------- */
body[data-tpl="sm-carta"] .sm-foot{
  text-align:center; padding: 4px 20px 30px;
  color: rgba(253,248,218,.55); font-size:12.5px;
}
body[data-tpl="sm-carta"] .sm-foot .sm-foot-slogan{
  font-family:'Sacramento', cursive;
  font-size: 22px; color: var(--marca); display:block; margin-bottom:4px;
}

/* ---------- CARRITO COMPARTIDO (re-estilo) ---------- */
body[data-tpl="sm-carta"] #cart-fab{
  background: var(--marca) !important;
  color: var(--tinta) !important;
  border: 2px solid var(--crema) !important;
  box-shadow: 0 8px 22px rgba(0,0,0,.35), 0 0 0 4px rgba(252,189,67,.18) !important;
  font-family:'Fredoka', sans-serif; font-weight:700;
}
body[data-tpl="sm-carta"] #cart-fab *{ color: var(--tinta) !important; }
body[data-tpl="sm-carta"] #cart{
  background: var(--tinta);
  color: var(--crema);
  border-top: 3px solid var(--marca);
  border-radius: 22px 22px 0 0;
  box-shadow: 0 -10px 30px rgba(0,0,0,.4);
}
body[data-tpl="sm-carta"] #cart h2,
body[data-tpl="sm-carta"] #cart h3{
  font-family:'Fredoka', sans-serif; color: var(--crema);
}
body[data-tpl="sm-carta"] .cart-row{
  border-bottom: 1px dotted rgba(252,189,67,.35);
  color: var(--crema);
}
body[data-tpl="sm-carta"] .cart-row .price,
body[data-tpl="sm-carta"] #cart .total,
body[data-tpl="sm-carta"] #cart .cart-total{
  color: var(--marca); font-weight:700;
}
body[data-tpl="sm-carta"] #cart button.checkout,
body[data-tpl="sm-carta"] #cart .checkout,
body[data-tpl="sm-carta"] #cart button[data-checkout]{
  background: var(--marca); color: var(--tinta);
  font-family:'Fredoka', sans-serif; font-weight:700;
  border:0; border-radius: 14px;
}
`,
  render(R, root, ctrl, slug){
    const menuHtml = (R.menu || []).map(cat => {
      const items = (cat.items || []).map(it => {
        const thumb = it.foto
          ? `<img src="${it.foto}" alt="${it.nombre}">`
          : `<span>${it.emoji || '🧀'}</span>`;
        const desc = it.desc ? `<div class="sm-desc">${it.desc}</div>` : '';
        const precio = (typeof it.precio === 'number')
          ? '$' + it.precio.toFixed(2)
          : '$' + it.precio;
        return `
          <div class="sm-item">
            <div class="sm-thumb">${thumb}</div>
            <div class="sm-body">
              <div class="sm-line">
                <span class="sm-iname">${it.nombre}</span>
                <span class="sm-leaders"></span>
                <span class="sm-price">${precio}</span>
              </div>
              ${desc}
              <div class="sm-ctrl-row">${ctrl(it.id)}</div>
            </div>
          </div>`;
      }).join('');
      const cid = slug(cat.categoria);
      return `
        <section class="sm-cat" id="cat-${cid}">
          <div class="sm-cat-head">
            <span class="sm-cheese-badge"></span>
            <h2 class="sm-cat-title">${cat.categoria}</h2>
          </div>
          ${items}
        </section>`;
    }).join('');

    const nav = (R.menu || []).map((cat, i) => {
      const cid = slug(cat.categoria);
      return `<button data-cat="${cid}" class="${i === 0 ? 'active' : ''}">${cat.categoria}</button>`;
    }).join('');

    const logoInner = R.logo
      ? `<img src="${R.logo}" alt="${R.nombre}">`
      : `<span class="sm-logo-emoji">🧀</span>`;

    root.innerHTML = `
      <header class="sm-header">
        <div class="sm-logo-wrap">${logoInner}</div>
        <h1 class="sm-name">${R.nombre}</h1>
        <div class="sm-slogan">${R.slogan || ''}</div>
        <div class="sm-rule"><span>♦</span></div>
      </header>

      <nav class="sm-nav">${nav}</nav>

      <main class="sm-menu">
        ${menuHtml}
      </main>

      <footer class="sm-foot">
        <span class="sm-foot-slogan">${R.slogan || ''}</span>
        ${R.nombre} · Carta Quesosa
      </footer>
    `;
  }
};
