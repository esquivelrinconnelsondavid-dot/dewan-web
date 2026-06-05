/* ====================================================================
   PLANTILLA  pz-street  —  "Street Neon"
   Estilo street / graffiti nocturno. Fondo carbón a pantalla completa,
   tipografía display ENORME (Anton), queso amarillo usado como neón.
   Categorías = tabs horizontales sticky. Productos en filas grandes
   con precio en etiqueta amarilla inclinada y botón + redondo neón.
   Scopeado bajo  body[data-tpl="pz-street"].
   ==================================================================== */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["pz-street"] = {
  label: "Street Neon",

  css: `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Archivo:wght@500;600;700;800&family=Bagel+Fat+One&display=swap');

/* ---- lienzo carbón a pantalla completa ---- */
body[data-tpl="pz-street"] {
  background: var(--tinta);
  color: var(--crema);
  font-family: 'Archivo', system-ui, sans-serif;
}
body[data-tpl="pz-street"]::before {
  content: "";
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(120% 80% at 80% -10%, color-mix(in srgb, var(--marca) 24%, transparent) 0%, transparent 46%),
    radial-gradient(90% 70% at -10% 18%, color-mix(in srgb, var(--acento) 30%, transparent) 0%, transparent 50%),
    repeating-linear-gradient(135deg, rgba(255,255,255,.02) 0 2px, transparent 2px 9px);
}
body[data-tpl="pz-street"] #app {
  position: relative; z-index: 1;
  padding: 0 0 18px;
  overflow: hidden;
}

/* =================== HEADER =================== */
body[data-tpl="pz-street"] .pz-hero {
  position: relative;
  padding: 26px 20px 18px;
  overflow: hidden;
  border-bottom: 3px solid var(--marca);
}
body[data-tpl="pz-street"] .pz-hero::after {
  content: "OPEN LATE · OPEN LATE · OPEN LATE · ";
  position: absolute; top: 10px; right: -10px;
  font-family: 'Anton', sans-serif; font-size: 11px; letter-spacing: .22em;
  color: color-mix(in srgb, var(--marca) 60%, transparent);
  white-space: nowrap; transform: rotate(0deg); opacity: .55;
}
body[data-tpl="pz-street"] .pz-tagstrip {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--marca); color: var(--tinta);
  font-family: 'Anton', sans-serif; font-size: 12px; letter-spacing: .18em;
  padding: 5px 12px; border-radius: 3px; text-transform: uppercase;
  transform: rotate(-2.5deg);
  box-shadow: 4px 4px 0 rgba(0,0,0,.45);
  margin-bottom: 16px;
}
body[data-tpl="pz-street"] .pz-tagstrip .dot {
  width: 8px; height: 8px; border-radius: 50%; background: var(--tinta);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--tinta) 40%, transparent);
}
body[data-tpl="pz-street"] .pz-head-row {
  display: flex; align-items: center; gap: 16px;
}
body[data-tpl="pz-street"] .pz-logo {
  width: 78px; height: 78px; flex: 0 0 auto;
  border-radius: 16px; object-fit: cover;
  border: 3px solid var(--marca);
  box-shadow: 0 0 0 4px var(--tinta), 6px 6px 0 var(--acento);
  transform: rotate(-3deg);
}
body[data-tpl="pz-street"] .pz-title h1 {
  font-family: 'Bagel Fat One', system-ui, sans-serif;  /* tipografía gruesa/derretida como el logo */
  font-size: clamp(33px, 12vw, 54px);
  line-height: .98;
  text-transform: uppercase;
  letter-spacing: 0;
  color: var(--marca);              /* amarillo queso, igual que el logo */
  margin: 0;
  text-shadow:
    0 3px 0 rgba(0,0,0,.5),
    4px 5px 0 color-mix(in srgb, var(--acento) 75%, transparent),
    0 0 26px color-mix(in srgb, var(--marca) 40%, transparent);
}
body[data-tpl="pz-street"] .pz-title-img {
  display: block;
  width: 100%;
  max-width: 250px;
  height: auto;
  filter:
    drop-shadow(0 3px 0 rgba(0,0,0,.45))
    drop-shadow(4px 5px 0 color-mix(in srgb, var(--acento) 55%, transparent));
}
body[data-tpl="pz-street"] .pz-slogan {
  margin-top: 10px;
  font-weight: 700; font-size: 13px; letter-spacing: .04em;
  color: color-mix(in srgb, var(--crema) 75%, var(--tinta));
}
body[data-tpl="pz-street"] .pz-slogan b { color: var(--marca); }

/* =================== TABS DE CATEGORÍA (sticky) =================== */
body[data-tpl="pz-street"] .pz-tabs {
  position: sticky; top: 0; z-index: 20;
  display: flex; gap: 10px; overflow-x: auto;
  padding: 13px 16px;
  background: color-mix(in srgb, var(--tinta) 88%, #000);
  border-bottom: 2px solid color-mix(in srgb, var(--marca) 35%, transparent);
  backdrop-filter: blur(6px);
  scrollbar-width: none;
}
body[data-tpl="pz-street"] .pz-tabs::-webkit-scrollbar { display: none; }
body[data-tpl="pz-street"] .pz-tab {
  flex: 0 0 auto;
  font-family: 'Anton', sans-serif;
  font-size: 16px; letter-spacing: .06em; text-transform: uppercase;
  color: var(--crema);
  background: transparent;
  border: 2px solid color-mix(in srgb, var(--crema) 28%, transparent);
  border-radius: 999px;
  padding: 8px 18px; cursor: pointer; white-space: nowrap;
  transition: transform .12s ease, background .12s ease, color .12s ease;
}
body[data-tpl="pz-street"] .pz-tab:active { transform: scale(.94); }
body[data-tpl="pz-street"] .pz-tab.activa {
  background: var(--marca); color: var(--tinta);
  border-color: var(--marca);
  box-shadow: 0 0 18px color-mix(in srgb, var(--marca) 60%, transparent);
}

/* =================== SECCIONES =================== */
body[data-tpl="pz-street"] .pz-sec { padding: 22px 16px 2px; scroll-margin-top: 64px; }
body[data-tpl="pz-street"] .pz-sec-head {
  display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;
}
body[data-tpl="pz-street"] .pz-sec-head h2 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(26px, 8vw, 38px); line-height: .9;
  text-transform: uppercase; letter-spacing: .01em;
  color: var(--marca);
  text-shadow: 2px 2px 0 var(--tinta), 3px 3px 0 var(--acento);
}
body[data-tpl="pz-street"] .pz-sec-head .pz-num {
  font-family: 'Anton', sans-serif; font-size: 13px; letter-spacing: .15em;
  color: color-mix(in srgb, var(--crema) 45%, var(--tinta));
}
body[data-tpl="pz-street"] .pz-sec-head .pz-rule {
  flex: 1; height: 3px; align-self: center;
  background: repeating-linear-gradient(90deg, var(--marca) 0 8px, transparent 8px 14px);
  opacity: .55;
}

/* =================== FILAS DE PRODUCTO =================== */
body[data-tpl="pz-street"] .pz-row {
  position: relative;
  display: grid;
  grid-template-columns: 66px 1fr auto;
  align-items: center; gap: 14px;
  padding: 14px 14px 16px;
  margin-bottom: 14px;
  background: color-mix(in srgb, var(--tinta) 78%, #000);
  border: 2px solid color-mix(in srgb, var(--crema) 12%, transparent);
  border-left: 5px solid var(--marca);
  border-radius: 16px;
  box-shadow: 0 8px 22px rgba(0,0,0,.34);
  overflow: hidden;
}
body[data-tpl="pz-street"] .pz-row::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(70% 120% at 100% 0%, color-mix(in srgb, var(--marca) 12%, transparent), transparent 60%);
}

/* media (emoji o foto) — sticker grande con halo neón */
body[data-tpl="pz-street"] .pz-media {
  position: relative; width: 66px; height: 66px; flex: 0 0 auto;
  display: flex; align-items: center; justify-content: center;
  border-radius: 14px;
  background:
    radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--marca) 30%, var(--tinta)) 0%, var(--tinta) 72%);
  border: 2px dashed color-mix(in srgb, var(--marca) 70%, transparent);
  box-shadow: inset 0 0 16px color-mix(in srgb, var(--marca) 22%, transparent);
}
body[data-tpl="pz-street"] .pz-emoji {
  font-size: 34px; line-height: 1;
  filter: drop-shadow(0 3px 5px rgba(0,0,0,.5));
  transform: rotate(-6deg);
}
body[data-tpl="pz-street"] .pz-photo {
  width: 100%; height: 100%; object-fit: cover; border-radius: 12px;
}

/* texto */
body[data-tpl="pz-street"] .pz-info { min-width: 0; }
body[data-tpl="pz-street"] .pz-nom {
  font-family: 'Anton', sans-serif;
  font-size: 23px; line-height: .96; letter-spacing: .01em;
  text-transform: uppercase; color: var(--crema);
  word-break: break-word;
}
body[data-tpl="pz-street"] .pz-desc {
  margin-top: 5px; font-size: 12.5px; line-height: 1.32;
  color: color-mix(in srgb, var(--crema) 64%, var(--tinta));
  font-weight: 500;
}
body[data-tpl="pz-street"] .pz-price {
  display: inline-block; margin-top: 9px;
  font-family: 'Anton', sans-serif; font-size: 17px; letter-spacing: .02em;
  background: var(--marca); color: var(--tinta);
  padding: 3px 11px 2px; border-radius: 4px;
  transform: rotate(-3deg);
  box-shadow: 3px 3px 0 rgba(0,0,0,.5);
}
body[data-tpl="pz-street"] .pz-price small {
  font-family: 'Archivo', sans-serif; font-size: 10px; font-weight: 800;
  opacity: .7; margin-right: 1px;
}

/* zona del control */
body[data-tpl="pz-street"] .pz-ctrl {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  flex: 0 0 auto;
}

/* =================== STEPPER re-estilado =================== */
body[data-tpl="pz-street"] .stepper {
  background: color-mix(in srgb, var(--tinta) 60%, #000);
  border: 2px solid color-mix(in srgb, var(--marca) 45%, transparent);
  border-radius: 999px; padding: 2px; gap: 2px;
}
body[data-tpl="pz-street"] .pz-ctrl .st-add {
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--marca); color: var(--tinta);
  font-size: 28px; font-weight: 900;
  box-shadow: 0 0 0 4px var(--tinta), 0 6px 16px color-mix(in srgb, var(--marca) 55%, transparent), 0 0 22px color-mix(in srgb, var(--marca) 45%, transparent);
  transition: transform .1s ease;
}
body[data-tpl="pz-street"] .pz-ctrl .st-add:active { transform: scale(.88) rotate(90deg); }
body[data-tpl="pz-street"] .pz-ctrl .st-min {
  width: 34px; height: 34px; border-radius: 50%;
  background: transparent; color: var(--crema); font-size: 22px;
}
body[data-tpl="pz-street"] .pz-ctrl .st-q {
  color: var(--marca); font-family: 'Anton', sans-serif; font-size: 19px;
  min-width: 24px;
}

/* cuando hay >0, el stepper se ilumina */
body[data-tpl="pz-street"] .stepper.has-qty {
  box-shadow: 0 0 16px color-mix(in srgb, var(--marca) 50%, transparent);
}

/* =================== FOOTER STICKER =================== */
body[data-tpl="pz-street"] .pz-foot {
  text-align: center; padding: 30px 20px 8px;
  font-family: 'Anton', sans-serif; font-size: 13px; letter-spacing: .2em;
  color: color-mix(in srgb, var(--crema) 40%, var(--tinta));
  text-transform: uppercase;
}
body[data-tpl="pz-street"] .pz-foot span { color: var(--marca); }

/* =================== RE-ESTILO DEL CARRITO COMPARTIDO =================== */
body[data-tpl="pz-street"] #cart-fab {
  background: var(--marca); color: var(--tinta);
  border-radius: 14px;
  font-family: 'Anton', sans-serif; letter-spacing: .04em; font-size: 17px;
  box-shadow: 0 0 0 3px var(--tinta), 0 12px 30px color-mix(in srgb, var(--marca) 55%, transparent);
}
body[data-tpl="pz-street"] #cart-fab .fab-l { text-transform: uppercase; }
body[data-tpl="pz-street"] #fab-cant {
  background: var(--tinta); color: var(--marca);
}
body[data-tpl="pz-street"] #cart {
  background: var(--tinta);
  border-radius: 22px 22px 0 0;
  border-top: 3px solid var(--marca);
  color: var(--crema);
}
body[data-tpl="pz-street"] .cart-head {
  background: var(--tinta);
  border-bottom: 2px solid color-mix(in srgb, var(--marca) 30%, transparent);
}
body[data-tpl="pz-street"] .cart-head h2 {
  font-family: 'Anton', sans-serif; text-transform: uppercase;
  letter-spacing: .04em; font-size: 24px; color: var(--marca);
}
body[data-tpl="pz-street"] #cart-cerrar { color: var(--crema); }
body[data-tpl="pz-street"] .cart-row {
  background: color-mix(in srgb, var(--tinta) 80%, #000);
  border: 2px solid color-mix(in srgb, var(--crema) 12%, transparent);
  border-left: 4px solid var(--marca);
}
body[data-tpl="pz-street"] .cart-row-nom { color: var(--crema); font-weight: 800; }
body[data-tpl="pz-street"] .cart-row-pre { color: color-mix(in srgb, var(--crema) 55%, var(--tinta)); }
body[data-tpl="pz-street"] .cart-row-sub { color: var(--marca); }
body[data-tpl="pz-street"] .stepper.compact {
  background: color-mix(in srgb, var(--tinta) 55%, #000);
  border: 2px solid color-mix(in srgb, var(--marca) 40%, transparent);
}
body[data-tpl="pz-street"] .stepper.compact .st-add { background: var(--marca); color: var(--tinta); }
body[data-tpl="pz-street"] .stepper.compact .st-min { background: transparent; color: var(--crema); }
body[data-tpl="pz-street"] .stepper.compact .st-q { color: var(--marca); }
body[data-tpl="pz-street"] #cart-vacio {
  color: color-mix(in srgb, var(--crema) 50%, var(--tinta));
  font-family: 'Anton', sans-serif; letter-spacing: .08em; text-transform: uppercase;
}
body[data-tpl="pz-street"] .campo { color: color-mix(in srgb, var(--crema) 60%, var(--tinta)); }
body[data-tpl="pz-street"] .campo input,
body[data-tpl="pz-street"] .campo select {
  background: color-mix(in srgb, var(--tinta) 70%, #000);
  border: 2px solid color-mix(in srgb, var(--crema) 18%, transparent);
  color: var(--crema);
}
body[data-tpl="pz-street"] .campo input::placeholder { color: color-mix(in srgb, var(--crema) 35%, var(--tinta)); }
body[data-tpl="pz-street"] .cart-total {
  border-top: 2px dashed color-mix(in srgb, var(--marca) 40%, transparent);
  color: var(--crema);
}
body[data-tpl="pz-street"] .cart-total strong {
  color: var(--marca); font-family: 'Anton', sans-serif; font-size: 28px;
}
body[data-tpl="pz-street"] #enviar {
  border-radius: 14px;
  font-family: 'Anton', sans-serif; letter-spacing: .04em; font-size: 18px;
  text-transform: uppercase;
  box-shadow: 0 8px 20px rgba(37,211,102,.35);
}
`,

  render(R, root, ctrl, slug) {
    const cats = R.menu.map((c) => {
      const id = slug(c.categoria);
      const filas = c.items.map((it) => {
        const media = it.foto
          ? `<img class="pz-photo" src="${it.foto}" alt="${it.nombre}">`
          : `<span class="pz-emoji">${it.emoji || "🧀"}</span>`;
        return `
        <article class="pz-row">
          <div class="pz-media">${media}</div>
          <div class="pz-info">
            <h3 class="pz-nom">${it.nombre}</h3>
            ${it.desc ? `<p class="pz-desc">${it.desc}</p>` : ``}
            <span class="pz-price"><small>$</small>${it.precio.toFixed(2)}</span>
          </div>
          <div class="pz-ctrl">${ctrl(it.id)}</div>
        </article>`;
      }).join("");

      return `
      <section class="pz-sec" id="cat-${id}">
        <div class="pz-sec-head">
          <h2>${c.categoria}</h2>
          <span class="pz-rule"></span>
          <span class="pz-num">${String(c.items.length).padStart(2, "0")}</span>
        </div>
        ${filas}
      </section>`;
    }).join("");

    const tabs = R.menu.map((c, i) =>
      `<button class="pz-tab${i === 0 ? " activa" : ""}" data-cat="${slug(c.categoria)}">${c.categoria}</button>`
    ).join("");

    root.innerHTML = `
      <header class="pz-hero">
        <div class="pz-tagstrip"><span class="dot"></span> Street Food · Cheese Lovers</div>
        <div class="pz-head-row">
          <img class="pz-logo" src="${R.logo}" alt="${R.nombre}">
          <div class="pz-title">
            ${R.tituloImg
              ? `<img class="pz-title-img" src="${R.tituloImg}" alt="${R.nombre}">`
              : `<h1>${R.nombre}</h1>`}
          </div>
        </div>
        <p class="pz-slogan">${R.slogan || "Papas cargadas de queso"} <b>// hecho en la calle</b></p>
      </header>

      <nav class="pz-tabs">${tabs}</nav>

      ${cats}

      <div class="pz-foot">Papazota <span>★</span> Cheese Squad <span>★</span> Pedí ya</div>
    `;
  }
};
