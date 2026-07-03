/* x-texas-v — "Vitrina Texas Asadero" — plantilla EXCLUSIVA de Texas Asadero.
   La vitrina del rancho: tablones verticales en grilla de 2 columnas, madera,
   latón y fuego; el stepper flota como fierro de marcar sobre cada foto. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-texas-v"] = {
  label: "Vitrina Texas Asadero",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Rye&family=Bitter:ital,wght@0,400;0,600;0,800;1,400&display=swap');

  body[data-tpl="x-texas-v"]{
    --tx-fuego:#E8541C; --tx-brasa:#A03114; --tx-cactus:#4E8C3A; --tx-crema:#FFE9C8;
    background:
      repeating-linear-gradient(90deg, rgba(0,0,0,.07) 0 2px, transparent 2px 96px),
      repeating-linear-gradient(0deg, #8A5A2E 0 86px, #7A4B22 86px 90px);
    color:var(--tx-crema); font-family:'Bitter',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-texas-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA COMPACTA DE RANCHO ---------- */
  body[data-tpl="x-texas-v"] .txv-bar{
    display:flex; align-items:center; gap:12px;
    padding:calc(12px + env(safe-area-inset-top)) 16px 12px;
    background:linear-gradient(180deg,#2E1B0C,#3A2410);
    border-bottom:2px solid #C88A3C;
    box-shadow:0 6px 14px rgba(30,12,0,.45);
  }
  body[data-tpl="x-texas-v"] .txv-logo{
    flex:0 0 auto; width:46px; height:46px; object-fit:cover; border-radius:10px;
    border:2px solid #C88A3C; box-shadow:0 4px 10px rgba(30,12,0,.5);
  }
  body[data-tpl="x-texas-v"] .txv-tit{flex:1;min-width:0;}
  body[data-tpl="x-texas-v"] .txv-nombre{
    font-family:'Rye',serif; font-size:18px; line-height:1.15; color:var(--tx-crema);
    text-shadow:0 2px 0 rgba(60,25,0,.6); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  body[data-tpl="x-texas-v"] .txv-linea{
    font-size:11.5px; font-weight:600; color:#E3B268; margin-top:3px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }

  /* ---------- NAV FIERROS DE MARCAR ---------- */
  body[data-tpl="x-texas-v"] .txv-nav{
    position:sticky; top:0; z-index:30; display:flex; gap:8px; overflow-x:auto;
    padding:11px 16px; scrollbar-width:none;
    background:linear-gradient(180deg, rgba(58,36,16,.97), rgba(58,36,16,.9));
    border-bottom:2px solid #C88A3C;
  }
  body[data-tpl="x-texas-v"] .txv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-texas-v"] .txv-nav button{
    flex:0 0 auto; font-family:'Rye',serif; font-size:12px; letter-spacing:.06em;
    color:var(--tx-crema); background:#2E1B0C; border:2px dashed #C88A3C; border-radius:9px;
    padding:8px 14px; cursor:pointer; white-space:nowrap;
    box-shadow:inset 0 1px 0 rgba(255,220,160,.15);
  }
  body[data-tpl="x-texas-v"] .txv-nav button.activa{
    background:var(--tx-brasa); border-style:solid; border-color:#FF9A4D; color:#fff;
  }

  /* ---------- SECCIONES + SOGA ---------- */
  body[data-tpl="x-texas-v"] .txv-sec{padding:4px 14px 0; scroll-margin-top:70px;}
  body[data-tpl="x-texas-v"] .txv-cat{display:flex; align-items:center; gap:11px; margin:22px 2px 13px;}
  body[data-tpl="x-texas-v"] .txv-cat i{
    flex:1; height:6px; border-radius:99px;
    background:repeating-linear-gradient(60deg,#C88A3C 0 9px,#A96F27 9px 18px);
    box-shadow:0 2px 5px rgba(30,12,0,.45);
  }
  body[data-tpl="x-texas-v"] .txv-cat span{
    font-family:'Rye',serif; font-size:19px; color:var(--tx-crema); text-align:center;
    text-shadow:0 2px 0 rgba(60,25,0,.55);
  }

  /* ---------- VITRINA: GRILLA DE TABLONES ---------- */
  body[data-tpl="x-texas-v"] .txv-grid{display:grid; grid-template-columns:1fr 1fr; gap:12px;}
  body[data-tpl="x-texas-v"] .txv-tile{
    position:relative; min-width:0;
    background:linear-gradient(175deg,#B0783F,#96602F 70%,#8B5628);
    border:3px solid #4A2C10; border-radius:14px; overflow:hidden;
    box-shadow:inset 0 0 0 2px rgba(255,220,160,.16), 0 8px 16px -6px rgba(30,12,0,.55);
  }
  body[data-tpl="x-texas-v"] .txv-media{
    position:relative; width:100%; aspect-ratio:1/1;
    display:flex; align-items:center; justify-content:center; font-size:54px;
    background:
      radial-gradient(circle at 50% 60%, rgba(255,138,42,.38), rgba(255,120,20,.1) 55%, transparent 75%),
      repeating-linear-gradient(0deg,#6E4218 0 26px,#5F3812 26px 28px);
    border-bottom:3px solid #4A2C10;
  }
  body[data-tpl="x-texas-v"] .txv-media::after{
    content:""; position:absolute; inset:6px; border:2px dashed rgba(227,178,104,.85);
    border-radius:9px; pointer-events:none; z-index:1;
  }
  body[data-tpl="x-texas-v"] .txv-media img{width:100%; height:100%; object-fit:cover;}
  body[data-tpl="x-texas-v"] .txv-info{padding:10px 11px 12px;}
  body[data-tpl="x-texas-v"] .txv-nom{
    font-family:'Rye',serif; font-size:13.5px; line-height:1.25; color:#241206;
    text-shadow:0 1px 0 rgba(255,225,170,.4);
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
  }
  body[data-tpl="x-texas-v"] .txv-precio{
    display:inline-block; margin-top:8px;
    font-family:'Rye',serif; font-size:13.5px; color:#fff;
    background:linear-gradient(160deg,#FF8A2A,var(--tx-brasa));
    border-radius:7px; padding:4px 10px; transform:rotate(-2deg);
    box-shadow:0 4px 10px -3px rgba(160,49,20,.7); white-space:nowrap;
  }

  /* ---------- STEPPER LATÓN FLOTANTE (esquina de la media) ---------- */
  body[data-tpl="x-texas-v"] .txv-ctrl{
    position:absolute; right:8px; bottom:8px; z-index:2;
    display:flex; align-items:center; gap:5px;
  }
  body[data-tpl="x-texas-v"] [data-qtywrap]{
    display:none; align-items:center; gap:3px;
    background:rgba(36,18,6,.92); border:2px solid #C88A3C; border-radius:10px; padding:2px 6px;
  }
  body[data-tpl="x-texas-v"] [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-texas-v"] [data-sub]{
    width:26px; height:26px; border:0; border-radius:7px; background:transparent;
    color:#E3B268; font-size:18px; cursor:pointer;
    display:inline-flex; align-items:center; justify-content:center;
  }
  body[data-tpl="x-texas-v"] [data-cant]{
    font-family:'Rye',serif; font-size:14px; color:var(--tx-crema); min-width:16px; text-align:center;
  }
  body[data-tpl="x-texas-v"] [data-add]{
    width:36px; height:36px; border-radius:9px; border:2px solid #7A4B15; cursor:pointer;
    background:linear-gradient(180deg,#E3B268,#C88A3C); color:#2A1607; font-size:20px; font-weight:800;
    display:inline-flex; align-items:center; justify-content:center;
    box-shadow:0 3px 0 #4A2C10, 0 6px 12px rgba(30,12,0,.45);
  }
  body[data-tpl="x-texas-v"] [data-add]:active{transform:translateY(2px); box-shadow:0 1px 0 #4A2C10;}

  body[data-tpl="x-texas-v"] .txv-fin{
    text-align:center; padding:30px 0 12px; font-family:'Rye',serif; font-size:13px; letter-spacing:.2em;
    color:var(--tx-crema); text-shadow:0 2px 0 rgba(60,25,0,.6);
  }

  /* carrito */
  body[data-tpl="x-texas-v"] #cart-fab{
    background:linear-gradient(160deg,#FF8A2A,var(--tx-brasa)) !important; color:#fff !important;
    border:2px solid #4A2C10 !important; border-radius:12px !important;
    font-family:'Rye',serif !important; font-weight:400 !important;
    box-shadow:0 6px 0 #4A2C10, 0 16px 30px rgba(30,12,0,.5) !important;
  }
  body[data-tpl="x-texas-v"] #cart-fab #fab-cant{background:#FFE9C8 !important; color:var(--tx-brasa) !important;}
  body[data-tpl="x-texas-v"] #cart h2{font-family:'Rye',serif;}
  body[data-tpl="x-texas-v"] #cart .cart-row .st-add{background:#C88A3C !important; color:#2A1607 !important;}

  @media(max-width:380px){
    body[data-tpl="x-texas-v"] .txv-grid{gap:9px;}
    body[data-tpl="x-texas-v"] .txv-media{font-size:46px;}
    body[data-tpl="x-texas-v"] .txv-nom{font-size:12.5px;}
    body[data-tpl="x-texas-v"] .txv-nombre{font-size:16px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥩"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="txv-tile">
        <div class="txv-media" data-media>
          ${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}
          <div class="txv-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="txv-info">
          <div class="txv-nom">${it.nombre}</div>
          <span class="txv-precio">$${Number(it.precio).toFixed(2)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="txv-sec" id="cat-${slug(c.categoria)}">
        <div class="txv-cat"><i></i><span>${c.categoria}</span><i></i></div>
        <div class="txv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const linea = R.promo || (R.direccion ? "📍 " + R.direccion.split("·")[0].trim() : "");

    root.innerHTML = `
      <header class="txv-bar">
        ${R.logo ? `<img class="txv-logo" src="${R.logo}" alt="${R.nombre}">` : ``}
        <div class="txv-tit">
          <div class="txv-nombre">${R.nombre}</div>
          ${linea ? `<div class="txv-linea">${linea}</div>` : ``}
        </div>
      </header>
      <nav class="txv-nav">${nav}</nav>
      ${secciones}
      <div class="txv-fin">🌵 Desde 1989 🔥</div>`;

    const botones = [...root.querySelectorAll(".txv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".txv-sec").forEach((s) => io.observe(s));
    }
  },
};
