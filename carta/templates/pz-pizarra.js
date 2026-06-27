/* ====================================================================
   PLANTILLA  pz-pizarra  —  "Pizarra Food-Truck"
   Estilo: carta escrita a mano sobre PIZARRA de carbón.
   Tipografía manuscrita/marker (Permanent Marker + Caveat).
   Menú tipográfico: "Nombre ·········· $precio" con líneas de puntos
   (leaders) que rellenan el espacio. Categorías subrayadas a mano.
   El amarillo (var(--marca)) funciona como tiza/gis que resalta.
   Solo look (css + render). La lógica vive en engine.js.
   ==================================================================== */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["pz-pizarra"] = {
  label: "Pizarra Food-Truck",

  css: `
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Caveat:wght@500;600;700&display=swap');

body[data-tpl="pz-pizarra"]{
  background: var(--tinta);
  font-family:'Caveat', cursive;
  color: var(--crema);
}

/* ===== EL TABLERO ===== */
body[data-tpl="pz-pizarra"] #app{
  --chalk: var(--crema);
  --chalk-soft: color-mix(in srgb, var(--crema) 60%, transparent);
  --dust: color-mix(in srgb, var(--crema) 26%, transparent);
  position:relative;
  color: var(--chalk);
  padding: 0 0 14px;
  background:
    /* viñeta para dar profundidad de pizarra */
    radial-gradient(120% 80% at 50% -8%, color-mix(in srgb, var(--acento) 26%, transparent), transparent 58%),
    radial-gradient(140% 120% at 50% 120%, rgba(0,0,0,.45), transparent 60%),
    /* polvo de tiza muy sutil */
    repeating-linear-gradient(115deg, rgba(255,255,255,.012) 0 2px, transparent 2px 6px),
    repeating-linear-gradient(28deg, rgba(255,255,255,.012) 0 2px, transparent 2px 7px),
    color-mix(in srgb, var(--tinta) 92%, #000);
  box-shadow: inset 0 0 90px rgba(0,0,0,.55);
}

/* marco de madera del tablero (food-truck) */
body[data-tpl="pz-pizarra"] #app::before{
  content:"";
  position:absolute; inset:8px; pointer-events:none; z-index:0;
  border-radius:10px;
  border:7px solid color-mix(in srgb, var(--acento) 80%, #000 12%);
  box-shadow:
    0 0 0 2px rgba(0,0,0,.35),
    inset 0 0 0 2px color-mix(in srgb, var(--acento) 55%, #000),
    inset 0 0 34px rgba(0,0,0,.5);
}
body[data-tpl="pz-pizarra"] #app > *{ position:relative; z-index:1; }

/* ===== HEADER ===== */
body[data-tpl="pz-pizarra"] .pzz-head{
  text-align:center;
  padding: 30px 22px 14px;
}
body[data-tpl="pz-pizarra"] .pzz-truck{
  display:inline-flex; align-items:center; gap:8px;
  font-family:'Caveat',cursive; font-weight:700;
  font-size:15px; letter-spacing:.16em; text-transform:uppercase;
  color: var(--chalk-soft);
  padding:3px 14px;
  border:2px dashed var(--dust);
  border-radius:999px;
  transform: rotate(-1.2deg);
}
body[data-tpl="pz-pizarra"] .pzz-logo{
  width:88px; height:88px; margin:16px auto 8px;
  border-radius:50%;
  object-fit:cover;
  display:block;
  filter: grayscale(.15) contrast(1.05);
  border:3px solid var(--marca);
  box-shadow:
    0 0 0 5px var(--tinta),
    0 0 0 7px color-mix(in srgb, var(--marca) 55%, transparent),
    0 10px 26px rgba(0,0,0,.55);
}
body[data-tpl="pz-pizarra"] .pzz-nom{
  font-family:'Permanent Marker', cursive;
  font-weight:400;
  font-size:42px; line-height:1.02;
  color: var(--marca);
  letter-spacing:.4px;
  margin:6px 0 2px;
  text-shadow:
    0 2px 0 rgba(0,0,0,.35),
    -1px -1px 0 color-mix(in srgb, var(--marca) 30%, transparent);
  transform: rotate(-1.5deg);
}
body[data-tpl="pz-pizarra"] .pzz-slo{
  font-family:'Caveat',cursive;
  font-size:23px; font-weight:600;
  color: var(--chalk);
  opacity:.92;
  transform: rotate(.6deg);
}
/* línea decorativa de tiza bajo el header */
body[data-tpl="pz-pizarra"] .pzz-rule{
  width: 78%; height:14px; margin:14px auto 2px;
  opacity:.75;
}

/* ===== NAV de categorías (chips de tiza) ===== */
body[data-tpl="pz-pizarra"] .pzz-nav{
  display:flex; gap:9px; overflow-x:auto;
  padding: 12px 20px 14px;
  -ms-overflow-style:none; scrollbar-width:none;
  scroll-snap-type:x proximity;
}
body[data-tpl="pz-pizarra"] .pzz-nav::-webkit-scrollbar{ display:none; }
body[data-tpl="pz-pizarra"] .pzz-navbtn{
  flex:0 0 auto; cursor:pointer; scroll-snap-align:start;
  background:transparent;
  color: var(--chalk);
  font-family:'Caveat',cursive; font-weight:700;
  font-size:20px; line-height:1;
  padding:7px 15px;
  border:2px solid var(--dust);
  border-radius:18px 16px 19px 15px / 16px 19px 15px 18px; /* borde "a mano" */
  transition: transform .12s ease;
}
body[data-tpl="pz-pizarra"] .pzz-navbtn .e{ margin-right:5px; font-size:16px; }
body[data-tpl="pz-pizarra"] .pzz-navbtn:active{ transform: scale(.94) rotate(-1deg); }
body[data-tpl="pz-pizarra"] .pzz-navbtn.activa{
  color: var(--tinta);
  background: var(--marca);
  border-color: var(--marca);
  box-shadow: 0 3px 0 color-mix(in srgb, var(--marca) 45%, #000), 0 6px 14px rgba(0,0,0,.35);
  transform: rotate(-1.5deg);
}

/* ===== CATEGORÍA ===== */
body[data-tpl="pz-pizarra"] .pzz-cat{
  padding: 16px 22px 6px;
  scroll-margin-top: 14px;
}
body[data-tpl="pz-pizarra"] .pzz-cat + .pzz-cat{ padding-top:24px; }

body[data-tpl="pz-pizarra"] .pzz-cat-head{
  display:flex; align-items:baseline; gap:10px;
  margin-bottom:4px;
}
body[data-tpl="pz-pizarra"] .pzz-cat-title{
  font-family:'Permanent Marker',cursive; font-weight:400;
  font-size:30px; line-height:1;
  color: var(--chalk);
  transform: rotate(-1deg);
  letter-spacing:.3px;
}
body[data-tpl="pz-pizarra"] .pzz-cat-emoji{
  font-size:24px; transform: rotate(6deg); filter: drop-shadow(0 2px 3px rgba(0,0,0,.4));
}
/* subrayado "a mano" en tiza amarilla */
body[data-tpl="pz-pizarra"] .pzz-underline{
  display:block; width:62%; height:13px; margin:0 0 10px 2px;
  color: var(--marca);
  opacity:.92;
}

/* ===== ITEM = línea de carta con leaders ===== */
body[data-tpl="pz-pizarra"] .pzz-item{
  display:flex; align-items:flex-start; gap:11px;
  padding:11px 0 12px;
}
body[data-tpl="pz-pizarra"] .pzz-item + .pzz-item{
  border-top:1px solid color-mix(in srgb, var(--crema) 12%, transparent);
}

/* "ficha" del emoji — intencional, no parche */
body[data-tpl="pz-pizarra"] .pzz-chip{
  flex:0 0 auto;
  width:42px; height:42px; margin-top:2px;
  display:grid; place-items:center;
  font-size:23px; line-height:1;
  border-radius:50%;
  background:
    radial-gradient(120% 120% at 30% 22%, rgba(255,255,255,.10), transparent 60%),
    color-mix(in srgb, var(--tinta) 70%, #000);
  border:2px dashed color-mix(in srgb, var(--marca) 55%, transparent);
  box-shadow: inset 0 1px 4px rgba(0,0,0,.5);
  filter: drop-shadow(0 2px 2px rgba(0,0,0,.3));
}
body[data-tpl="pz-pizarra"] .pzz-chip.foto{
  border-style:solid; padding:0; overflow:hidden; background:none;
}
body[data-tpl="pz-pizarra"] .pzz-chip img{
  width:100%; height:100%; object-fit:cover; border-radius:50%;
  filter: grayscale(.12) contrast(1.03);
}

body[data-tpl="pz-pizarra"] .pzz-body{ flex:1; min-width:0; }

/* fila nombre ···· precio (los puntos rellenan) */
body[data-tpl="pz-pizarra"] .pzz-line{
  display:flex; align-items:flex-end; gap:6px;
  width:100%;
}
body[data-tpl="pz-pizarra"] .pzz-name{
  font-family:'Caveat',cursive; font-weight:700;
  font-size:25px; line-height:1.05;
  color: var(--chalk);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  max-width: 68%;
  flex:0 1 auto;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
}
/* los LEADERS: puntitos que crecen para llenar el hueco */
body[data-tpl="pz-pizarra"] .pzz-leader{
  flex:1 1 auto;
  align-self:flex-end;
  height:0;
  margin-bottom:7px;
  min-width:18px;
  border-bottom: 3px dotted var(--dust);
  transform: translateY(-1px);
}
body[data-tpl="pz-pizarra"] .pzz-price{
  flex:0 0 auto;
  font-family:'Permanent Marker',cursive; font-weight:400;
  font-size:21px; line-height:1;
  color: var(--marca);
  transform: rotate(-2deg);
  text-shadow: 0 2px 0 rgba(0,0,0,.32);
}
body[data-tpl="pz-pizarra"] .pzz-desc{
  font-family:'Caveat',cursive; font-weight:500;
  font-size:18px; line-height:1.2;
  color: var(--chalk-soft);
  margin-top:1px; padding-right:8px;
}

/* fila inferior del item: control de cantidad discreto */
body[data-tpl="pz-pizarra"] .pzz-foot{
  display:flex; align-items:center; gap:8px;
  margin-top:7px;
}
body[data-tpl="pz-pizarra"] .pzz-tag{
  font-family:'Caveat',cursive; font-weight:600;
  font-size:15px; letter-spacing:.06em; text-transform:uppercase;
  color: var(--chalk-soft);
  border:1.5px dotted var(--dust);
  border-radius:999px; padding:1px 10px;
  transform: rotate(-.8deg);
}
body[data-tpl="pz-pizarra"] .pzz-ctrl{ margin-left:auto; }

/* ===== STEPPER re-estilado (tiza) — data-attrs intactos ===== */
body[data-tpl="pz-pizarra"] .pzz-ctrl .stepper{
  display:inline-flex; align-items:center;
  height:30px; overflow:hidden;
  background: color-mix(in srgb, var(--tinta) 60%, #000);
  border:2px solid var(--dust);
  border-radius:999px;
  transition: border-color .15s ease, background .15s ease;
}
body[data-tpl="pz-pizarra"] .pzz-ctrl .stepper.has-qty{
  border-color: var(--marca);
  background: color-mix(in srgb, var(--marca) 16%, var(--tinta));
}
body[data-tpl="pz-pizarra"] .pzz-ctrl .stepper .st-btn{
  width:28px; height:28px; border:none; background:transparent;
  color: var(--chalk); font-size:19px; cursor:pointer;
  display:grid; place-items:center; line-height:1;
}
body[data-tpl="pz-pizarra"] .pzz-ctrl .stepper .st-min{ display:none; }
body[data-tpl="pz-pizarra"] .pzz-ctrl .stepper.has-qty .st-min{ display:grid; color: var(--marca); }
body[data-tpl="pz-pizarra"] .pzz-ctrl .stepper .st-q{
  display:none; min-width:16px; text-align:center;
  font-family:'Permanent Marker',cursive; font-size:14px; color: var(--marca);
}
body[data-tpl="pz-pizarra"] .pzz-ctrl .stepper.has-qty .st-q{ display:inline-block; }

/* botón "agregar +" : pastilla de tiza amarilla */
body[data-tpl="pz-pizarra"] .pzz-ctrl .st-add{
  width:30px; height:30px; margin-left:6px;
  border:none; cursor:pointer;
  border-radius:999px;
  background: var(--marca);
  color: var(--tinta);
  font-size:22px; line-height:1; font-weight:700;
  display:grid; place-items:center;
  box-shadow: 0 3px 0 color-mix(in srgb, var(--marca) 45%, #000), 0 5px 12px rgba(0,0,0,.4);
  transition: transform .12s ease;
}
body[data-tpl="pz-pizarra"] .pzz-ctrl .st-add:active{ transform: translateY(2px) scale(.94); box-shadow:0 1px 0 color-mix(in srgb,var(--marca) 45%,#000); }

/* ===== nota final escrita a mano ===== */
body[data-tpl="pz-pizarra"] .pzz-foot-note{
  text-align:center;
  margin:26px 22px 8px;
  padding-top:16px;
  border-top:2px dashed var(--dust);
}
body[data-tpl="pz-pizarra"] .pzz-foot-note .big{
  font-family:'Permanent Marker',cursive; font-size:22px;
  color: var(--marca); transform:rotate(-1.5deg); display:inline-block;
  text-shadow:0 2px 0 rgba(0,0,0,.3);
}
body[data-tpl="pz-pizarra"] .pzz-foot-note .small{
  display:block; margin-top:6px;
  font-family:'Caveat',cursive; font-size:18px; color: var(--chalk-soft);
}

/* ===== re-skin del carrito compartido (que combine con la pizarra) ===== */
body[data-tpl="pz-pizarra"] #cart-fab{
  background: var(--marca); color: var(--tinta);
  border:2px solid color-mix(in srgb, var(--marca) 60%, #000);
  border-radius:16px;
  box-shadow:0 6px 18px rgba(0,0,0,.5);
}
body[data-tpl="pz-pizarra"] #cart-fab #fab-total,
body[data-tpl="pz-pizarra"] #cart-fab #fab-cant{ font-family:'Permanent Marker',cursive; }

body[data-tpl="pz-pizarra"] #cart{
  background: color-mix(in srgb, var(--tinta) 94%, #000);
  color: var(--crema);
  background-image:
    repeating-linear-gradient(115deg, rgba(255,255,255,.012) 0 2px, transparent 2px 6px);
}
body[data-tpl="pz-pizarra"] .cart-head{
  background: transparent;
  border-bottom:2px dashed var(--dust);
}
body[data-tpl="pz-pizarra"] .cart-head h2{
  font-family:'Permanent Marker',cursive; color: var(--marca); font-weight:400;
}
body[data-tpl="pz-pizarra"] .cart-row{
  background: color-mix(in srgb, var(--tinta) 70%, #000);
  border:1.5px dashed var(--dust); border-radius:12px;
  color: var(--crema);
}
body[data-tpl="pz-pizarra"] .cart-row-nom{ font-family:'Caveat',cursive; font-weight:700; font-size:20px; }
body[data-tpl="pz-pizarra"] .cart-row-pre,
body[data-tpl="pz-pizarra"] .cart-row-sub{ font-family:'Caveat',cursive; font-size:18px; color: var(--marca); }
body[data-tpl="pz-pizarra"] .cart-row .stepper{
  background: color-mix(in srgb, var(--tinta) 55%, #000);
  border:2px solid var(--dust); border-radius:999px;
}
body[data-tpl="pz-pizarra"] .cart-row .st-btn{ color: var(--marca); background:transparent; }
body[data-tpl="pz-pizarra"] .cart-row .st-q{ color: var(--crema); font-family:'Permanent Marker',cursive; }
body[data-tpl="pz-pizarra"] .cart-total{ color: var(--crema); }
body[data-tpl="pz-pizarra"] .cart-total strong{ font-family:'Permanent Marker',cursive; color: var(--marca); }
body[data-tpl="pz-pizarra"] #cart input,
body[data-tpl="pz-pizarra"] #cart select,
body[data-tpl="pz-pizarra"] #cart textarea{
  font-family:'Caveat',cursive; font-size:18px;
}
body[data-tpl="pz-pizarra"] #enviar{
  font-family:'Permanent Marker',cursive; font-weight:400; letter-spacing:.5px;
  background: var(--marca); color: var(--tinta);
}
`,

  render(R, root, ctrl, slug) {
    const money = (n) => "$" + Number(n).toFixed(2);

    // SVG de tiza "a mano" reutilizable (trazo ondulado, currentColor)
    const handLine = (cls) => `
      <svg class="${cls}" viewBox="0 0 300 12" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M2 7 C 40 2, 70 11, 110 6 S 190 2, 230 8 S 285 4, 298 6"
              stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>
      </svg>`;

    const item = (it) => `
      <div class="pzz-item">
        <div class="pzz-chip${it.foto ? " foto" : ""}">
          ${it.foto
            ? `<img src="${it.foto}" alt="${it.nombre}">`
            : `${it.emoji || "🍽️"}`}
        </div>
        <div class="pzz-body">
          <div class="pzz-line">
            <span class="pzz-name">${it.nombre}</span>
            <span class="pzz-leader"></span>
            <span class="pzz-price">${money(it.precio)}</span>
          </div>
          ${it.desc ? `<div class="pzz-desc">${it.desc}</div>` : ""}
          <div class="pzz-foot">
            <span class="pzz-tag">${it.emoji || "🍽️"} pídela</span>
            <div class="pzz-ctrl">${ctrl(it.id)}</div>
          </div>
        </div>
      </div>`;

    const nav = R.menu.map((c, i) => `
      <button class="pzz-navbtn${i === 0 ? " activa" : ""}" data-cat="${slug(c.categoria)}">
        ${c.items[0] && c.items[0].emoji ? `<span class="e">${c.items[0].emoji}</span>` : ""}${c.categoria}
      </button>`).join("");

    const secciones = R.menu.map((c) => `
      <section class="pzz-cat" id="cat-${slug(c.categoria)}">
        <div class="pzz-cat-head">
          ${c.items[0] && c.items[0].emoji ? `<span class="pzz-cat-emoji">${c.items[0].emoji}</span>` : ""}
          <h2 class="pzz-cat-title">${c.categoria}</h2>
        </div>
        ${handLine("pzz-underline")}
        ${c.items.map(item).join("")}
      </section>`).join("");

    root.innerHTML = `
      <header class="pzz-head">
        <span class="pzz-truck">🚚 Food-Truck</span>
        <img class="pzz-logo" src="${R.logo}" alt="${R.nombre}">
        <h1 class="pzz-nom">${R.nombre}</h1>
        <div class="pzz-slo">${R.slogan || ""}</div>
        ${handLine("pzz-rule")}
      </header>

      <nav class="pzz-nav">${nav}</nav>

      ${secciones}

      <div class="pzz-foot-note">
        <span class="big">¡Buen provecho!</span>
        <span class="small">Arma tu carta y envíala directo por WhatsApp 🧀</span>
      </div>
    `;
  },
};
