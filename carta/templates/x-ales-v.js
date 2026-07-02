/* x-ales-v — "Vitrina La Esquina de Ales" — plantilla EXCLUSIVA de La Esquina de Ales.
   Variante VITRINA de "Esquina Pop": grid de 2 columnas de tiles-sticker verticales
   con la media cuadrada arriba y el stepper rojo flotando sobre la esquina.
   Mantiene el vocabulario del flagship: amarillo con lunares, borde grueso,
   sombras duras, rotaciones traviesas y píldoras rojas de precio. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-ales-v"] = {
  label: "Vitrina La Esquina de Ales",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Baloo+2:wght@500;600;700;800&display=swap');

  body[data-tpl="x-ales-v"]{
    --av-rojo:#E11224; --av-azul:#1D2B7C; --av-amarillo:#FFE500; --av-rojo2:#8E0714;
    background:#FFE500;
    background-image:radial-gradient(rgba(255,255,255,.55) 2.2px, transparent 2.6px);
    background-size:26px 26px;
    color:#22232A; font-family:'Baloo 2',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-ales-v"] #app{overflow-x:hidden;}

  /* ---------- HEADER COMPACTO DE BARRA ---------- */
  body[data-tpl="x-ales-v"] .av-top{
    display:flex; align-items:center; gap:12px;
    background:var(--av-rojo); border-bottom:4px solid #fff;
    padding:calc(10px + env(safe-area-inset-top)) 16px 10px;
    box-shadow:0 6px 0 rgba(29,43,124,.18);
  }
  body[data-tpl="x-ales-v"] .av-logo{
    flex:0 0 auto; width:48px; height:48px; border-radius:50%; overflow:hidden;
    background:#fff; border:3px solid #fff; transform:rotate(3deg);
    box-shadow:0 4px 10px rgba(0,0,0,.25);
    display:flex; align-items:center; justify-content:center; font-size:24px;
  }
  body[data-tpl="x-ales-v"] .av-logo img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-ales-v"] .av-tit{min-width:0;}
  body[data-tpl="x-ales-v"] .av-nombre{
    font-family:'Titan One',cursive; font-size:19px; line-height:1.05; color:#fff;
    text-shadow:0 2px 0 rgba(120,6,16,.45);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  body[data-tpl="x-ales-v"] .av-linea{
    font-weight:700; font-size:11.5px; color:#FFD9DC; margin-top:3px; letter-spacing:.03em;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }

  /* ---------- NAV STICKERS STICKY ---------- */
  body[data-tpl="x-ales-v"] .av-nav{
    position:sticky; top:0; z-index:30; display:flex; gap:9px; overflow-x:auto;
    padding:11px 16px; scrollbar-width:none;
    background:rgba(255,229,0,.94); backdrop-filter:blur(6px);
  }
  body[data-tpl="x-ales-v"] .av-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-ales-v"] .av-nav button{
    flex:0 0 auto; font-family:'Titan One',cursive; font-size:13px; color:var(--av-azul);
    background:#fff; border:3px solid var(--av-azul); border-radius:14px; padding:9px 15px;
    cursor:pointer; white-space:nowrap; box-shadow:0 4px 0 rgba(29,43,124,.3);
  }
  body[data-tpl="x-ales-v"] .av-nav button:nth-child(odd){transform:rotate(-1.2deg);}
  body[data-tpl="x-ales-v"] .av-nav button:nth-child(even){transform:rotate(1.2deg);}
  body[data-tpl="x-ales-v"] .av-nav button.activa{
    background:var(--av-rojo); border-color:var(--av-rojo2); color:#fff; box-shadow:0 4px 0 var(--av-rojo2);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-ales-v"] .av-sec{padding:2px 14px 0;scroll-margin-top:66px;}
  body[data-tpl="x-ales-v"] .av-cat{
    display:inline-block; font-family:'Titan One',cursive; font-size:19px; color:#fff;
    background:var(--av-azul); border-radius:13px; padding:8px 18px; margin:20px 0 14px;
    transform:rotate(-1deg); box-shadow:0 5px 0 rgba(0,0,0,.18);
  }

  /* ---------- GRID VITRINA 2 COLUMNAS ---------- */
  body[data-tpl="x-ales-v"] .av-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px 12px;}
  body[data-tpl="x-ales-v"] .av-tile{
    background:#fff; border:3px solid #23242C; border-radius:19px;
    box-shadow:0 7px 0 rgba(35,36,44,.16);
  }
  body[data-tpl="x-ales-v"] .av-tile:nth-child(odd){transform:rotate(.6deg);}
  body[data-tpl="x-ales-v"] .av-tile:nth-child(even){transform:rotate(-.6deg);}
  body[data-tpl="x-ales-v"] .av-mediaw{position:relative;}
  body[data-tpl="x-ales-v"] .av-media{
    position:relative; aspect-ratio:1/1; border-radius:15px 15px 0 0; overflow:hidden;
    border-bottom:3px solid #23242C; background:#FFF4C2;
    display:flex; align-items:center; justify-content:center;
  }
  body[data-tpl="x-ales-v"] .av-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-ales-v"] .av-media.sin-foto{
    font-size:54px;
    background:#FFF4C2;
    background-image:radial-gradient(rgba(255,255,255,.85) 2px, transparent 2.4px);
    background-size:20px 20px;
  }
  body[data-tpl="x-ales-v"] .av-media.sin-foto::before{
    content:""; position:absolute; inset:12%;
    border:3px dashed rgba(225,18,36,.45); border-radius:50%; pointer-events:none;
  }

  /* stepper flotante sobre la esquina de la media */
  body[data-tpl="x-ales-v"] .av-ctrl{
    position:absolute; right:7px; bottom:-15px; z-index:2;
    display:flex; align-items:center; gap:5px;
  }
  body[data-tpl="x-ales-v"] .av-ctrl [data-qtywrap]{
    display:none; align-items:center; gap:3px;
    background:#fff; border:3px solid var(--av-azul); border-radius:999px; padding:1px 7px 1px 3px;
    box-shadow:0 3px 0 rgba(29,43,124,.3);
  }
  body[data-tpl="x-ales-v"] .av-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-ales-v"] [data-add]{
    width:37px;height:37px;border-radius:50%;border:3px solid var(--av-rojo2);cursor:pointer;
    background:var(--av-rojo);color:#fff;font-size:20px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 0 var(--av-rojo2);
  }
  body[data-tpl="x-ales-v"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--av-rojo2);}
  body[data-tpl="x-ales-v"] [data-sub]{
    width:27px;height:27px;border-radius:50%;border:none;background:transparent;color:var(--av-azul);
    font-size:17px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-ales-v"] [data-cant]{
    font-family:'Titan One';font-size:14px;color:var(--av-azul);min-width:15px;text-align:center;
  }

  /* cuerpo del tile */
  body[data-tpl="x-ales-v"] .av-body{padding:17px 11px 12px;}
  body[data-tpl="x-ales-v"] .av-nom{
    font-family:'Titan One',cursive;font-size:13.5px;line-height:1.25;color:var(--av-azul);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:34px;
  }
  body[data-tpl="x-ales-v"] .av-precio{
    display:inline-block;margin-top:8px;font-family:'Titan One',cursive;font-size:13.5px;color:#fff;
    background:var(--av-rojo);border-radius:999px;padding:5px 12px;transform:rotate(-2deg);
    box-shadow:0 3px 0 var(--av-rojo2);white-space:nowrap;
  }

  body[data-tpl="x-ales-v"] .av-fin{
    text-align:center;padding:28px 0 10px;font-family:'Titan One',cursive;font-size:16px;color:var(--av-azul);
  }

  /* carrito */
  body[data-tpl="x-ales-v"] #cart-fab{
    background:var(--av-rojo) !important;color:#fff !important;border:3px solid var(--av-rojo2) !important;
    border-radius:18px !important;font-family:'Titan One',cursive !important;font-weight:400 !important;
    box-shadow:0 6px 0 var(--av-rojo2), 0 16px 30px rgba(160,10,25,.35) !important;
  }
  body[data-tpl="x-ales-v"] #cart-fab #fab-cant{background:#fff !important;color:var(--av-rojo) !important;}
  body[data-tpl="x-ales-v"] #cart h2{font-family:'Titan One',cursive;color:var(--av-azul);}
  body[data-tpl="x-ales-v"] #cart .cart-row .st-add{background:var(--av-rojo) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-ales-v"] .av-nombre{font-size:17px;}
    body[data-tpl="x-ales-v"] .av-grid{gap:16px 10px;}
    body[data-tpl="x-ales-v"] .av-media.sin-foto{font-size:46px;}
    body[data-tpl="x-ales-v"] .av-nom{font-size:12.5px;min-height:32px;}
    body[data-tpl="x-ales-v"] .av-precio{font-size:12.5px;padding:4px 10px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍗"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="av-tile">
        <div class="av-mediaw">
          <div class="av-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="av-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="av-body">
          <div class="av-nom">${it.nombre}</div>
          <div class="av-precio">$${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="av-sec" id="cat-${slug(c.categoria)}">
        <div class="av-cat">${c.categoria}</div>
        <div class="av-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="av-top">
        ${R.logo ? `<div class="av-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="av-tit">
          <h1 class="av-nombre">${R.nombre}</h1>
          <div class="av-linea">${R.promo || R.direccion || ""}</div>
        </div>
      </header>
      <nav class="av-nav">${nav}</nav>
      ${secciones}
      <div class="av-fin">😉👌 ¡El sabor de la esquina!</div>`;

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".av-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -72% 0px" });
      root.querySelectorAll(".av-sec").forEach((s) => io.observe(s));
    }
  },
};
