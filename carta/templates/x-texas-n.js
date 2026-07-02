/* x-texas-n — "Texas Asadero de Día" — plantilla EXCLUSIVA de Texas Asadero.
   El rancho al mediodía: madera blanqueada por el sol, crema de pan, latón y
   brasa. Hero grande de apertura y carta en filas con medallón redondo. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-texas-n"] = {
  label: "Texas Asadero de Día",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Rye&family=Bitter:ital,wght@0,400;0,600;0,800;1,400&display=swap');

  body[data-tpl="x-texas-n"]{
    --tx-fuego:#E8541C; --tx-brasa:#A03114; --tx-cactus:#4E8C3A;
    --tx-tinta:#321F13; --tx-madera:#4A2C10; --tx-panel:#FFF9EE;
    background:
      repeating-linear-gradient(90deg, rgba(74,44,16,.06) 0 2px, transparent 2px 96px),
      repeating-linear-gradient(0deg, #F6EBD6 0 86px, #EFE1C6 86px 90px);
    color:var(--tx-tinta); font-family:'Bitter',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-texas-n"] #app{overflow-x:hidden;}

  /* ---------- HERO DE MEDIODÍA ---------- */
  body[data-tpl="x-texas-n"] .txn-hero{
    position:relative; min-height:min(50vh, 420px);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
    text-align:center; padding:calc(30px + env(safe-area-inset-top)) 20px 30px; overflow:hidden;
  }
  body[data-tpl="x-texas-n"] .txn-hero::before{
    content:""; position:absolute; left:50%; top:8%; transform:translateX(-50%);
    width:380px; height:320px;
    background:radial-gradient(closest-side, rgba(232,84,28,.20), rgba(232,84,28,.07) 55%, transparent);
    pointer-events:none;
  }
  body[data-tpl="x-texas-n"] .txn-hero::after{
    content:""; position:absolute; left:14px; right:14px; bottom:10px; height:2px;
    background:repeating-linear-gradient(90deg,#C88A3C 0 10px,transparent 10px 16px);
    pointer-events:none;
  }
  body[data-tpl="x-texas-n"] .txn-logo{
    position:relative; width:150px; border-radius:18px;
    border:3px solid var(--tx-madera);
    box-shadow:0 12px 24px -8px rgba(74,44,16,.45);
  }
  body[data-tpl="x-texas-n"] .txn-nombre{
    position:relative; margin:2px 0 0; font-family:'Rye',serif; font-weight:400;
    font-size:34px; line-height:1.1; color:var(--tx-madera);
    text-shadow:0 2px 0 rgba(255,249,238,.9), 0 4px 8px rgba(74,44,16,.25);
  }
  body[data-tpl="x-texas-n"] .txn-slogan{
    position:relative; font-size:12px; font-weight:800; letter-spacing:.26em; text-transform:uppercase;
    color:var(--tx-brasa);
  }
  body[data-tpl="x-texas-n"] .txn-meta{position:relative; display:flex; flex-wrap:wrap; gap:7px; justify-content:center; margin-top:6px;}
  body[data-tpl="x-texas-n"] .txn-meta span{
    font-size:11.5px; font-weight:600; color:var(--tx-tinta); background:#FFF3DC;
    border:1px solid #C88A3C; border-radius:8px; padding:6px 11px;
    box-shadow:0 3px 8px rgba(74,44,16,.15);
  }
  body[data-tpl="x-texas-n"] .txn-soga{
    height:8px; margin:0 14px 4px; border-radius:99px;
    background:repeating-linear-gradient(60deg,#C88A3C 0 9px,#A96F27 9px 18px);
    box-shadow:0 2px 6px rgba(74,44,16,.3);
  }

  /* ---------- NAV CLARA ---------- */
  body[data-tpl="x-texas-n"] .txn-nav{
    position:sticky; top:0; z-index:30; display:flex; gap:8px; overflow-x:auto;
    padding:11px 16px; scrollbar-width:none;
    background:rgba(255,246,229,.96); backdrop-filter:blur(6px);
    border-bottom:2px solid #C88A3C;
  }
  body[data-tpl="x-texas-n"] .txn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-texas-n"] .txn-nav button{
    flex:0 0 auto; font-family:'Rye',serif; font-size:12px; letter-spacing:.05em;
    color:#6B3E12; background:var(--tx-panel); border:2px solid #C88A3C; border-radius:999px;
    padding:8px 15px; cursor:pointer; white-space:nowrap;
    box-shadow:0 2px 6px rgba(74,44,16,.12);
  }
  body[data-tpl="x-texas-n"] .txn-nav button.activa{background:var(--tx-brasa); border-color:var(--tx-brasa); color:#fff;}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-texas-n"] .txn-sec{padding:4px 16px 0; scroll-margin-top:70px;}
  body[data-tpl="x-texas-n"] .txn-cat{display:flex; align-items:center; gap:12px; margin:24px 2px 14px;}
  body[data-tpl="x-texas-n"] .txn-cat::before, body[data-tpl="x-texas-n"] .txn-cat::after{
    content:""; flex:1; height:2px;
    background:repeating-linear-gradient(90deg,#C88A3C 0 10px,transparent 10px 16px);
  }
  body[data-tpl="x-texas-n"] .txn-cat span{
    font-family:'Rye',serif; font-size:20px; color:var(--tx-brasa); text-align:center;
  }

  /* ---------- FILAS CON MEDALLÓN ---------- */
  body[data-tpl="x-texas-n"] .txn-row{
    display:flex; gap:13px; align-items:center;
    background:var(--tx-panel); border:2px solid #E4CFA6; border-radius:16px;
    padding:11px 12px; margin-bottom:12px;
    box-shadow:0 6px 14px -8px rgba(74,44,16,.3);
  }
  body[data-tpl="x-texas-n"] .txn-media{
    flex:0 0 auto; width:72px; height:72px; border-radius:50%; overflow:hidden; position:relative;
    border:2px dashed #C88A3C;
    background:radial-gradient(circle at 50% 42%, #FFE9C8, #F0DBB0);
    display:flex; align-items:center; justify-content:center; font-size:31px;
  }
  body[data-tpl="x-texas-n"] .txn-media img{width:100%; height:100%; object-fit:cover;}
  body[data-tpl="x-texas-n"] .txn-body{flex:1; min-width:0;}
  body[data-tpl="x-texas-n"] .txn-nom{font-family:'Rye',serif; font-size:15px; line-height:1.25; color:var(--tx-madera);}
  body[data-tpl="x-texas-n"] .txn-desc{
    font-size:12.5px; line-height:1.45; color:#6B4A2A; margin-top:4px;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
  }
  body[data-tpl="x-texas-n"] .txn-der{flex:0 0 auto; display:flex; flex-direction:column; align-items:flex-end; gap:8px;}
  body[data-tpl="x-texas-n"] .txn-precio{
    font-family:'Rye',serif; font-size:14.5px; color:var(--tx-brasa);
    background:#FDE4D2; border-radius:8px; padding:4px 10px; white-space:nowrap;
    box-shadow:inset 0 0 0 1px rgba(160,49,20,.25);
  }
  body[data-tpl="x-texas-n"] .txn-ctrl{display:flex; align-items:center; gap:5px;}

  /* steppers latón al sol */
  body[data-tpl="x-texas-n"] [data-qtywrap]{display:inline-flex; align-items:center; gap:5px;}
  body[data-tpl="x-texas-n"] [data-add]{
    width:36px; height:36px; border-radius:9px; border:2px solid #7A4B15; cursor:pointer;
    background:linear-gradient(180deg,#E3B268,#C88A3C); color:#2A1607; font-size:20px; font-weight:800;
    display:inline-flex; align-items:center; justify-content:center;
    box-shadow:0 4px 0 #A96F27;
  }
  body[data-tpl="x-texas-n"] [data-add]:active{transform:translateY(3px); box-shadow:0 1px 0 #A96F27;}
  body[data-tpl="x-texas-n"] [data-sub]{
    width:32px; height:32px; border-radius:9px; border:2px solid #C88A3C; background:#FFF3DC;
    color:#6B3E12; font-size:18px; display:none; align-items:center; justify-content:center; cursor:pointer;
  }
  body[data-tpl="x-texas-n"] [data-cant]{
    display:none; font-family:'Rye',serif; font-size:15px; color:var(--tx-tinta); min-width:18px; text-align:center;
  }
  body[data-tpl="x-texas-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-texas-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-texas-n"] .txn-fin{
    text-align:center; padding:30px 0 12px; font-family:'Rye',serif; font-size:13px; letter-spacing:.2em;
    color:#8A5A2E;
  }

  /* carrito */
  body[data-tpl="x-texas-n"] #cart-fab{
    background:linear-gradient(160deg,#FF8A2A,var(--tx-brasa)) !important; color:#fff !important;
    border:2px solid var(--tx-madera) !important; border-radius:12px !important;
    font-family:'Rye',serif !important; font-weight:400 !important;
    box-shadow:0 6px 0 #7A4B15, 0 16px 30px rgba(74,44,16,.35) !important;
  }
  body[data-tpl="x-texas-n"] #cart-fab #fab-cant{background:#FFE9C8 !important; color:var(--tx-brasa) !important;}
  body[data-tpl="x-texas-n"] #cart h2{font-family:'Rye',serif;}
  body[data-tpl="x-texas-n"] #cart .cart-row .st-add{background:#C88A3C !important; color:#2A1607 !important;}

  @media(max-width:380px){
    body[data-tpl="x-texas-n"] .txn-logo{width:126px;}
    body[data-tpl="x-texas-n"] .txn-nombre{font-size:28px;}
    body[data-tpl="x-texas-n"] .txn-media{width:64px; height:64px; font-size:27px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥩"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="txn-row">
        <div class="txn-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="txn-body">
          <div class="txn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="txn-desc">${it.desc}</div>` : ``}
        </div>
        <div class="txn-der">
          <span class="txn-precio">$${Number(it.precio).toFixed(2)}</span>
          <span class="txn-ctrl">${ctrl(it.id)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="txn-sec" id="cat-${slug(c.categoria)}">
        <div class="txn-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || "", R.direccion ? "📍 " + R.direccion.split("·")[0].trim() : ""]).filter(Boolean);

    root.innerHTML = `
      <header class="txn-hero">
        ${R.logo ? `<img class="txn-logo" src="${R.logo}" alt="${R.nombre}">` : ``}
        <h1 class="txn-nombre">${R.nombre}</h1>
        <div class="txn-slogan">${R.slogan || "Asadero · Riobamba"}</div>
        <div class="txn-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      </header>
      <div class="txn-soga"></div>
      <nav class="txn-nav">${nav}</nav>
      ${secciones}
      <div class="txn-fin">🌵 Al carbón desde 1989 🔥</div>`;

    const botones = [...root.querySelectorAll(".txn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".txn-sec").forEach((s) => io.observe(s));
    }
  },
};
