/* ====================================================================
   PLANTILLA  pz-delivery  —  "Combo Delivery"
   Estilo: app de delivery / marketplace moderno y comercial.
   Fondo claro, header con logo + búsqueda decorativa, carrusel
   "🔥 Los más pedidos", chips de categoría y tarjetas horizontales.
   Solo look (css + render). La lógica vive en engine.js.
   ==================================================================== */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["pz-delivery"] = {
  label: "Combo Delivery",

  css: `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

body[data-tpl="pz-delivery"]{
  background: var(--crema);
  font-family:'Inter',system-ui,sans-serif;
  color: var(--tinta);
}
body[data-tpl="pz-delivery"] #app{
  --ink: var(--tinta);
  --soft:#7c7a75;
  --line: rgba(59,58,56,.10);
  --card:#ffffff;
  background:
    radial-gradient(120% 60% at 100% -10%, rgba(236,212,74,.20), transparent 60%),
    var(--crema);
  padding-bottom: 8px;
}

/* ===== HEADER ===== */
body[data-tpl="pz-delivery"] .pzd-head{
  position: sticky; top:0; z-index:20;
  background: rgba(253,246,216,.86);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom:1px solid var(--line);
  padding:14px 16px 12px;
}
body[data-tpl="pz-delivery"] .pzd-toprow{
  display:flex; align-items:center; gap:12px;
}
body[data-tpl="pz-delivery"] .pzd-logo{
  width:50px; height:50px; border-radius:15px; object-fit:cover;
  border:2px solid #fff;
  box-shadow:0 6px 16px rgba(59,58,56,.18);
  flex:0 0 auto;
}
body[data-tpl="pz-delivery"] .pzd-id{ min-width:0; flex:1; line-height:1.1; }
body[data-tpl="pz-delivery"] .pzd-nom{
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800; font-size:19px; letter-spacing:-.02em;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
body[data-tpl="pz-delivery"] .pzd-slo{
  font-size:12.5px; color:var(--soft); font-weight:500; margin-top:2px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
body[data-tpl="pz-delivery"] .pzd-open{
  flex:0 0 auto; display:inline-flex; align-items:center; gap:5px;
  background: var(--marca); color: var(--tinta);
  font-size:11px; font-weight:800; letter-spacing:.02em;
  padding:6px 10px; border-radius:999px;
  box-shadow:0 4px 12px rgba(236,212,74,.5);
}
body[data-tpl="pz-delivery"] .pzd-open i{
  width:6px; height:6px; border-radius:50%; background:#1e9e54;
  box-shadow:0 0 0 3px rgba(30,158,84,.25);
}

/* search decorativa */
body[data-tpl="pz-delivery"] .pzd-search{
  display:flex; align-items:center; gap:9px;
  margin-top:13px;
  background:#fff; border:1px solid var(--line);
  border-radius:14px; padding:12px 14px;
  box-shadow:0 4px 14px rgba(59,58,56,.05);
  cursor:text;
}
body[data-tpl="pz-delivery"] .pzd-search svg{ flex:0 0 auto; }
body[data-tpl="pz-delivery"] .pzd-search span{
  color:#a6a39c; font-size:14.5px; font-weight:500;
}

/* ===== CARRUSEL "Los más pedidos" ===== */
body[data-tpl="pz-delivery"] .pzd-sec-head{
  display:flex; align-items:baseline; justify-content:space-between;
  padding:20px 16px 11px;
}
body[data-tpl="pz-delivery"] .pzd-sec-title{
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800; font-size:17px; letter-spacing:-.02em;
}
body[data-tpl="pz-delivery"] .pzd-sec-sub{ font-size:12px; color:var(--soft); font-weight:600; }

body[data-tpl="pz-delivery"] .pzd-rail{
  display:flex; gap:13px; overflow-x:auto; scroll-snap-type:x mandatory;
  padding:2px 16px 6px;
  -ms-overflow-style:none; scrollbar-width:none;
}
body[data-tpl="pz-delivery"] .pzd-rail::-webkit-scrollbar{ display:none; }

body[data-tpl="pz-delivery"] .pzd-hot{
  scroll-snap-align:start; flex:0 0 76%; max-width:240px;
  position:relative; border-radius:20px; overflow:hidden;
  background:var(--card); border:1px solid var(--line);
  box-shadow:0 12px 26px rgba(59,58,56,.10);
  display:flex; flex-direction:column;
}
body[data-tpl="pz-delivery"] .pzd-hot-media{
  position:relative; height:124px;
  background:
    radial-gradient(140% 120% at 20% 0%, rgba(255,255,255,.55), transparent 55%),
    linear-gradient(135deg, var(--marca), color-mix(in srgb, var(--marca) 55%, var(--acento)));
  display:flex; align-items:center; justify-content:center;
}
body[data-tpl="pz-delivery"] .pzd-hot-media img{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
}
body[data-tpl="pz-delivery"] .pzd-hot-emoji{
  font-size:58px; line-height:1;
  filter:drop-shadow(0 8px 14px rgba(59,58,56,.30));
}
body[data-tpl="pz-delivery"] .pzd-rank{
  position:absolute; top:10px; left:10px;
  background:rgba(59,58,56,.92); color:#fff;
  font-size:11px; font-weight:800; letter-spacing:.03em;
  padding:5px 9px; border-radius:999px;
  display:inline-flex; align-items:center; gap:4px;
}
body[data-tpl="pz-delivery"] .pzd-hot-body{
  padding:12px 13px 14px; display:flex; flex-direction:column; gap:4px; flex:1;
}
body[data-tpl="pz-delivery"] .pzd-hot-nom{
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:700; font-size:15px; letter-spacing:-.01em; line-height:1.2;
}
body[data-tpl="pz-delivery"] .pzd-hot-desc{
  font-size:12px; color:var(--soft); line-height:1.35;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
body[data-tpl="pz-delivery"] .pzd-hot-foot{
  display:flex; align-items:center; justify-content:space-between;
  margin-top:auto; padding-top:8px;
}
body[data-tpl="pz-delivery"] .pzd-hot-price{
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800; font-size:17px; color:var(--ink);
}
body[data-tpl="pz-delivery"] .pzd-hot-price small{ font-size:11px; color:var(--soft); font-weight:600; }

/* ===== CHIPS de categoría ===== */
body[data-tpl="pz-delivery"] .pzd-chips{
  position:sticky; top:0; z-index:15;
  display:flex; gap:9px; overflow-x:auto;
  padding:11px 16px; margin-top:6px;
  background: rgba(253,246,216,.92);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-top:1px solid var(--line); border-bottom:1px solid var(--line);
  -ms-overflow-style:none; scrollbar-width:none;
}
body[data-tpl="pz-delivery"] .pzd-chips::-webkit-scrollbar{ display:none; }
body[data-tpl="pz-delivery"] .pzd-chip{
  flex:0 0 auto; cursor:pointer;
  background:#fff; border:1px solid var(--line); color:var(--ink);
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:700; font-size:13px; letter-spacing:-.01em;
  padding:9px 15px; border-radius:999px;
  box-shadow:0 2px 8px rgba(59,58,56,.05);
  transition:transform .12s ease;
}
body[data-tpl="pz-delivery"] .pzd-chip:active{ transform:scale(.95); }
body[data-tpl="pz-delivery"] .pzd-chip.activa{
  background:var(--tinta); color:#fff; border-color:var(--tinta);
}
body[data-tpl="pz-delivery"] .pzd-chip .e{ margin-right:4px; }

/* ===== SECCIONES + tarjetas horizontales ===== */
body[data-tpl="pz-delivery"] .pzd-cat{ padding:18px 16px 4px; scroll-margin-top:62px; }
body[data-tpl="pz-delivery"] .pzd-cat-title{
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800; font-size:18px; letter-spacing:-.02em;
  display:flex; align-items:center; gap:9px; margin-bottom:13px;
}
body[data-tpl="pz-delivery"] .pzd-cat-title::after{
  content:""; flex:1; height:1px; background:var(--line);
}
body[data-tpl="pz-delivery"] .pzd-cat-count{
  font-size:11px; font-weight:800; color:var(--acento);
  background:color-mix(in srgb, var(--marca) 32%, #fff);
  padding:3px 9px; border-radius:999px; letter-spacing:.02em;
}

body[data-tpl="pz-delivery"] .pzd-list{ display:flex; flex-direction:column; gap:11px; }
body[data-tpl="pz-delivery"] .pzd-card{
  display:flex; align-items:stretch; gap:13px;
  background:var(--card); border:1px solid var(--line);
  border-radius:18px; padding:11px;
  box-shadow:0 6px 16px rgba(59,58,56,.06);
}
body[data-tpl="pz-delivery"] .pzd-thumb{
  flex:0 0 78px; width:78px; height:78px; border-radius:14px; overflow:hidden;
  position:relative;
  display:flex; align-items:center; justify-content:center;
  background:
    radial-gradient(120% 120% at 25% 15%, rgba(255,255,255,.7), transparent 60%),
    color-mix(in srgb, var(--marca) 60%, var(--crema));
  border:1px solid color-mix(in srgb, var(--marca) 45%, #fff);
}
body[data-tpl="pz-delivery"] .pzd-thumb img{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
}
body[data-tpl="pz-delivery"] .pzd-thumb .e{
  font-size:38px; line-height:1;
  filter:drop-shadow(0 4px 7px rgba(59,58,56,.22));
}
body[data-tpl="pz-delivery"] .pzd-info{
  flex:1; min-width:0; display:flex; flex-direction:column; gap:3px;
  padding:2px 0;
}
body[data-tpl="pz-delivery"] .pzd-info .pzd-nom{
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:700; font-size:15.5px; letter-spacing:-.01em; line-height:1.2;
  white-space:normal;
}
body[data-tpl="pz-delivery"] .pzd-desc{
  font-size:12.5px; color:var(--soft); line-height:1.35;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
body[data-tpl="pz-delivery"] .pzd-price{
  margin-top:auto; padding-top:5px;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800; font-size:16px; color:var(--ink);
}
body[data-tpl="pz-delivery"] .pzd-price small{ font-size:11px; color:var(--soft); font-weight:600; }

/* zona de control a la derecha */
body[data-tpl="pz-delivery"] .pzd-ctrl{
  flex:0 0 auto; display:flex; align-items:flex-end; justify-content:center;
  padding-bottom:2px;
}

/* ===== STEPPER re-estilado (data-attrs intactos) ===== */
body[data-tpl="pz-delivery"] .pzd-ctrl .stepper{
  background:color-mix(in srgb, var(--marca) 22%, #fff);
  border:1px solid color-mix(in srgb, var(--marca) 50%, #fff);
  border-radius:999px; overflow:hidden; height:36px;
}
body[data-tpl="pz-delivery"] .pzd-ctrl .stepper .st-btn{
  width:34px; height:34px; border-radius:0; background:transparent; color:var(--tinta);
  font-size:19px;
}
body[data-tpl="pz-delivery"] .pzd-ctrl .stepper .st-q{
  min-width:22px; font-size:14px; color:var(--tinta);
}
/* botón + cuando NO hay cantidad: pastilla amarilla destacada */
body[data-tpl="pz-delivery"] .pzd-ctrl .st-add{
  width:36px; height:36px; border-radius:12px;
  background:var(--marca); color:var(--tinta); font-size:22px; font-weight:800;
  box-shadow:0 5px 13px rgba(236,212,74,.55);
  margin-left:6px;
  transition:transform .12s ease;
}
body[data-tpl="pz-delivery"] .pzd-ctrl .st-add:active{ transform:scale(.9); }
/* cuando ya hay cantidad, el + de la pastilla se integra (engine pone .has-qty al qtywrap, no al add) */
body[data-tpl="pz-delivery"] .pzd-ctrl .stepper.has-qty + .st-add{
  border-radius:0 999px 999px 0; box-shadow:none; margin-left:-1px;
  width:34px; height:36px;
  background:color-mix(in srgb, var(--marca) 22%, #fff);
  border:1px solid color-mix(in srgb, var(--marca) 50%, #fff); border-left:none;
}

/* banda promocional inferior */
body[data-tpl="pz-delivery"] .pzd-promo{
  margin:18px 16px 4px; padding:16px 18px;
  border-radius:18px;
  background:linear-gradient(120deg, var(--tinta), color-mix(in srgb, var(--tinta) 78%, var(--acento)));
  color:#fff; display:flex; align-items:center; gap:14px;
}
body[data-tpl="pz-delivery"] .pzd-promo .ic{ font-size:30px; flex:0 0 auto; }
body[data-tpl="pz-delivery"] .pzd-promo b{
  font-family:'Plus Jakarta Sans',sans-serif; font-size:14.5px; display:block; margin-bottom:2px;
}
body[data-tpl="pz-delivery"] .pzd-promo span{ font-size:12.5px; opacity:.85; }

body[data-tpl="pz-delivery"] .pzd-foot{
  text-align:center; color:var(--soft); font-size:11.5px;
  padding:22px 16px 14px; font-weight:600;
}
body[data-tpl="pz-delivery"] .pzd-foot b{ color:var(--ink); }

/* ===== re-skin del carrito compartido ===== */
body[data-tpl="pz-delivery"] #cart-fab{ border-radius:18px; }
body[data-tpl="pz-delivery"] #cart{ background:var(--crema); }
body[data-tpl="pz-delivery"] .cart-head{ background:var(--crema); }
body[data-tpl="pz-delivery"] .cart-head h2{ font-family:'Plus Jakarta Sans',sans-serif; }
body[data-tpl="pz-delivery"] .cart-row{ border-radius:14px; border-color:var(--line); }
body[data-tpl="pz-delivery"] .cart-total strong{ font-family:'Plus Jakarta Sans',sans-serif; }
`,

  render(R, root, ctrl, slug) {
    const money = (n) => "$" + Number(n).toFixed(2);

    // primeros items del menú -> carrusel "Los más pedidos"
    const flat = R.menu.flatMap((c) => c.items);
    const hot = flat.slice(0, 3);

    const hotCard = (it, i) => `
      <article class="pzd-hot">
        <div class="pzd-hot-media">
          ${it.foto
            ? `<img src="${it.foto}" alt="${it.nombre}">`
            : `<span class="pzd-hot-emoji">${it.emoji || "🍽️"}</span>`}
          <span class="pzd-rank">🔥 #${i + 1}</span>
        </div>
        <div class="pzd-hot-body">
          <div class="pzd-hot-nom">${it.nombre}</div>
          <div class="pzd-hot-desc">${it.desc || ""}</div>
          <div class="pzd-hot-foot">
            <div class="pzd-hot-price">${money(it.precio)}</div>
            <div class="pzd-ctrl">${ctrl(it.id)}</div>
          </div>
        </div>
      </article>`;

    const itemRow = (it) => `
      <article class="pzd-card">
        <div class="pzd-thumb">
          ${it.foto
            ? `<img src="${it.foto}" alt="${it.nombre}">`
            : `<span class="e">${it.emoji || "🍽️"}</span>`}
        </div>
        <div class="pzd-info">
          <div class="pzd-nom">${it.nombre}</div>
          <div class="pzd-desc">${it.desc || ""}</div>
          <div class="pzd-price">${money(it.precio)}</div>
        </div>
        <div class="pzd-ctrl">${ctrl(it.id)}</div>
      </article>`;

    const chips = R.menu.map((c, i) => `
      <button class="pzd-chip${i === 0 ? " activa" : ""}" data-cat="${slug(c.categoria)}">
        ${c.items[0] && c.items[0].emoji ? `<span class="e">${c.items[0].emoji}</span>` : ""}${c.categoria}
      </button>`).join("");

    const secciones = R.menu.map((c) => `
      <section class="pzd-cat" id="cat-${slug(c.categoria)}">
        <h3 class="pzd-cat-title">${c.categoria}<span class="pzd-cat-count">${c.items.length}</span></h3>
        <div class="pzd-list">
          ${c.items.map(itemRow).join("")}
        </div>
      </section>`).join("");

    root.innerHTML = `
      <header class="pzd-head">
        <div class="pzd-toprow">
          <img class="pzd-logo" src="${R.logo}" alt="${R.nombre}">
          <div class="pzd-id">
            <div class="pzd-nom">${R.nombre}</div>
            <div class="pzd-slo">${R.slogan || ""}</div>
          </div>
          <span class="pzd-open"><i></i>Abierto</span>
        </div>
        <div class="pzd-search" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a6a39c" stroke-width="2.4" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line>
          </svg>
          <span>Buscar en ${R.nombre}…</span>
        </div>
      </header>

      ${hot.length ? `
      <div class="pzd-sec-head">
        <div class="pzd-sec-title">🔥 Los más pedidos</div>
        <div class="pzd-sec-sub">desliza →</div>
      </div>
      <div class="pzd-rail">
        ${hot.map(hotCard).join("")}
      </div>` : ""}

      <nav class="pzd-chips">${chips}</nav>

      ${secciones}

      <div class="pzd-promo">
        <span class="ic">🛵</span>
        <div>
          <b>Delivery rapidito a tu puerta</b>
          <span>Arma tu combo y envíalo directo por WhatsApp</span>
        </div>
      </div>

      <div class="pzd-foot">Pedido seguro · <b>${R.nombre}</b> 🧀</div>
    `;
  },
};
