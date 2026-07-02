/* x-mammamia-v — "Vitrina Mamma mia!" — plantilla EXCLUSIVA de Mamma mia!
   La trattoria en vitrina: tiles verticales a 2 columnas sobre el mantel de
   cuadros rojos, con la madera, el tricolor y el borde de masa del flagship. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-mammamia-v"] = {
  label: "Vitrina Mamma mia!",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,700;1,700&family=Lora:ital,wght@0,500;0,600;1,500&display=swap');

  body[data-tpl="x-mammamia-v"]{
    --mm-rojo:#9E2224; --mm-rojo2:#C22A2C; --mm-verde:#1F7A3D; --mm-crema:#FBF3E4; --mm-madera:#241511;
    background:var(--mm-crema);
    background-image:
      repeating-linear-gradient(0deg, rgba(158,34,36,.055) 0 16px, transparent 16px 32px),
      repeating-linear-gradient(90deg, rgba(158,34,36,.055) 0 16px, transparent 16px 32px);
    color:#33231A; font-family:'Lora',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-mammamia-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA DE MADERA COMPACTA ---------- */
  body[data-tpl="x-mammamia-v"] .mmv-top{
    display:flex;align-items:center;gap:12px;
    background:linear-gradient(180deg,#2E1B14,#241511);color:#fff;
    padding:calc(12px + env(safe-area-inset-top)) 16px 12px;
  }
  body[data-tpl="x-mammamia-v"] .mmv-logo{
    flex:0 0 auto;width:46px;height:46px;border-radius:50%;overflow:hidden;background:#fff;
    border:2.5px solid #fff;box-shadow:0 6px 16px rgba(0,0,0,.45);
  }
  body[data-tpl="x-mammamia-v"] .mmv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-mammamia-v"] .mmv-tit{flex:1;min-width:0;}
  body[data-tpl="x-mammamia-v"] .mmv-nombre{
    font-family:'Lobster Two',cursive;font-weight:700;font-style:italic;font-size:24px;line-height:1.05;
    margin:0;text-shadow:0 3px 10px rgba(0,0,0,.4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-mammamia-v"] .mmv-linea{
    font-style:italic;font-size:12px;color:rgba(255,255,255,.82);margin-top:3px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-mammamia-v"] .mmv-tricolor{height:5px;display:flex;}
  body[data-tpl="x-mammamia-v"] .mmv-tricolor i{flex:1;}
  body[data-tpl="x-mammamia-v"] .mmv-tricolor i:nth-child(1){background:var(--mm-verde);}
  body[data-tpl="x-mammamia-v"] .mmv-tricolor i:nth-child(2){background:#fff;}
  body[data-tpl="x-mammamia-v"] .mmv-tricolor i:nth-child(3){background:var(--mm-rojo2);}

  /* ---------- NAV BANDERINES ---------- */
  body[data-tpl="x-mammamia-v"] .mmv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;background:rgba(251,243,228,.95);backdrop-filter:blur(6px);
    border-bottom:2px solid #E8D3B4;
  }
  body[data-tpl="x-mammamia-v"] .mmv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-mammamia-v"] .mmv-nav button{
    flex:0 0 auto;font-family:'Lobster Two',cursive;font-weight:700;font-size:14.5px;
    color:var(--mm-rojo);background:#fff;border:2px solid var(--mm-rojo);border-radius:999px;
    padding:8px 16px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-mammamia-v"] .mmv-nav button.activa{
    background:var(--mm-rojo);color:#fff;
    box-shadow:0 6px 14px -4px rgba(158,34,36,.5);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-mammamia-v"] .mmv-sec{padding:6px 14px 0;scroll-margin-top:70px;}
  body[data-tpl="x-mammamia-v"] .mmv-cat{display:flex;align-items:center;gap:12px;margin:22px 2px 12px;}
  body[data-tpl="x-mammamia-v"] .mmv-cat::before, body[data-tpl="x-mammamia-v"] .mmv-cat::after{
    content:""; flex:1; height:3px;
    background:linear-gradient(90deg, var(--mm-verde) 0 33%, #fff 33% 66%, var(--mm-rojo2) 66%);
    border-radius:99px; opacity:.85;
  }
  body[data-tpl="x-mammamia-v"] .mmv-cat span{
    font-family:'Lobster Two',cursive;font-weight:700;font-style:italic;font-size:24px;color:var(--mm-rojo);
    text-align:center;
  }

  /* ---------- VITRINA: GRID 2 COLUMNAS ---------- */
  body[data-tpl="x-mammamia-v"] .mmv-grid{
    display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;
  }
  body[data-tpl="x-mammamia-v"] .mmv-tile{
    display:flex;flex-direction:column;background:#fff;
    border:1.5px solid #EAD8BC;border-radius:16px;overflow:hidden;
    box-shadow:0 8px 18px -10px rgba(120,60,20,.28);
  }
  body[data-tpl="x-mammamia-v"] .mmv-tile::before{
    content:"";display:block;height:5px;flex:0 0 auto;
    background:linear-gradient(90deg, var(--mm-verde) 0 33%, #fff 33% 66%, var(--mm-rojo2) 66%);
  }
  body[data-tpl="x-mammamia-v"] .mmv-mediawrap{position:relative;}
  body[data-tpl="x-mammamia-v"] .mmv-media{
    aspect-ratio:1/1;position:relative;overflow:hidden;
    background:#FBEED3;
    background-image:
      repeating-linear-gradient(0deg, rgba(158,34,36,.06) 0 12px, transparent 12px 24px),
      repeating-linear-gradient(90deg, rgba(158,34,36,.06) 0 12px, transparent 12px 24px);
    display:flex;align-items:center;justify-content:center;font-size:54px;
  }
  body[data-tpl="x-mammamia-v"] .mmv-media.is-emoji::after{
    content:"";position:absolute;inset:8px;border:2px dashed #D9B98C;border-radius:12px;pointer-events:none;
  }
  body[data-tpl="x-mammamia-v"] .mmv-media img{width:100%;height:100%;object-fit:cover;display:block;}
  body[data-tpl="x-mammamia-v"] .mmv-ctl{position:absolute;right:8px;bottom:8px;z-index:2;}
  body[data-tpl="x-mammamia-v"] .mmv-body{
    flex:1;display:flex;flex-direction:column;gap:5px;padding:9px 11px 12px;
  }
  body[data-tpl="x-mammamia-v"] .mmv-nom{
    font-weight:600;font-size:13.5px;line-height:1.3;color:#33231A;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-mammamia-v"] .mmv-precio{
    margin-top:auto;font-family:'Lobster Two',cursive;font-weight:700;font-size:17px;color:var(--mm-verde);
    white-space:nowrap;
  }

  /* steppers (flotan sobre la esquina de la media) */
  body[data-tpl="x-mammamia-v"] [data-qtywrap]{
    display:inline-flex;align-items:center;gap:5px;
    background:rgba(255,255,255,.96);border:1.5px solid #EAD8BC;border-radius:999px;padding:3px;
    box-shadow:0 6px 14px rgba(36,21,17,.28);
  }
  body[data-tpl="x-mammamia-v"] [data-add]{
    width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;
    background:var(--mm-rojo);color:#fff;font-size:19px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 5px 12px -4px rgba(158,34,36,.55);
  }
  body[data-tpl="x-mammamia-v"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-mammamia-v"] [data-sub]{
    width:28px;height:28px;border-radius:50%;border:2px solid var(--mm-verde);background:#fff;color:var(--mm-verde);
    font-size:16px;font-weight:700;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-mammamia-v"] [data-cant]{display:none;font-family:'Lobster Two';font-weight:700;font-size:15px;color:#33231A;min-width:17px;text-align:center;}
  body[data-tpl="x-mammamia-v"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-mammamia-v"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-mammamia-v"] .mmv-fin{
    text-align:center;padding:30px 0 10px;font-family:'Lobster Two',cursive;font-style:italic;
    font-size:23px;color:var(--mm-rojo);
  }

  /* carrito */
  body[data-tpl="x-mammamia-v"] #cart-fab{
    background:var(--mm-rojo) !important;color:#fff !important;border-radius:999px !important;
    font-family:'Lobster Two',cursive !important;font-weight:700 !important;font-size:17px !important;
    box-shadow:0 14px 30px rgba(158,34,36,.45) !important;
  }
  body[data-tpl="x-mammamia-v"] #cart-fab #fab-cant{background:#fff !important;color:var(--mm-rojo) !important;}
  body[data-tpl="x-mammamia-v"] #cart h2{font-family:'Lobster Two',cursive;font-style:italic;}
  body[data-tpl="x-mammamia-v"] #cart .cart-row .st-add{background:var(--mm-verde) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-mammamia-v"] .mmv-grid{gap:10px;}
    body[data-tpl="x-mammamia-v"] .mmv-nombre{font-size:21px;}
    body[data-tpl="x-mammamia-v"] .mmv-media{font-size:46px;}
    body[data-tpl="x-mammamia-v"] .mmv-nom{font-size:12.5px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍕"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="mmv-tile">
        <div class="mmv-mediawrap">
          <div class="mmv-media ${it.foto ? "" : "is-emoji"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="mmv-ctl">${ctrl(it.id)}</div>
        </div>
        <div class="mmv-body">
          <div class="mmv-nom">${it.nombre}</div>
          <div class="mmv-precio">$${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="mmv-sec" id="cat-${slug(c.categoria)}">
        <div class="mmv-cat"><span>${c.categoria}</span></div>
        <div class="mmv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const linea = R.promo || (R.direccion ? "📍 " + R.direccion.split("·")[0].trim() : "") || R.slogan || "";

    root.innerHTML = `
      <header class="mmv-top">
        ${R.logo ? `<div class="mmv-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="mmv-tit">
          <h1 class="mmv-nombre">${R.nombre}</h1>
          ${linea ? `<div class="mmv-linea">${linea}</div>` : ``}
        </div>
      </header>
      <div class="mmv-tricolor"><i></i><i></i><i></i></div>
      <nav class="mmv-nav">${nav}</nav>
      ${secciones}
      <div class="mmv-fin">Buon appetito! 🇮🇹</div>`;

    const botones = [...root.querySelectorAll(".mmv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-74px 0px -75% 0px" });
      root.querySelectorAll(".mmv-sec").forEach((s) => io.observe(s));
    }
  },
};
