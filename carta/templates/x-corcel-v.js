/* x-corcel-v — "Vitrina Corcel Negro" — plantilla EXCLUSIVA alterna de Corcel Negro.
   Variante VITRINA: grid de 2 columnas de tiles verticales (media cuadrada arriba,
   "+" flotando sobre la esquina de la media). Mantiene el vocabulario de "Vía
   Rápida": negro+amarillo del logo, franjas de peligro, bloques inclinados y
   sombras duras de fast food callejero. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-corcel-v"] = {
  label: "Vitrina Corcel Negro",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:wght@500;600;700;800&display=swap');

  body[data-tpl="x-corcel-v"]{
    --cnv-negro:#0F0D08; --cnv-amarillo:#FECB00; --cnv-sombra:#8A6E00; --cnv-crema:#FFF6D6;
    background:var(--cnv-amarillo); color:var(--cnv-negro);
    font-family:'Barlow Condensed',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-corcel-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA COMPACTA NEGRA ---------- */
  body[data-tpl="x-corcel-v"] .cnv-top{
    display:flex;align-items:center;gap:12px;background:var(--cnv-negro);color:#fff;
    padding:calc(14px + env(safe-area-inset-top)) 16px 14px;
  }
  body[data-tpl="x-corcel-v"] .cnv-logo{
    flex:0 0 auto;width:46px;height:46px;border-radius:10px;overflow:hidden;
    border:2px solid var(--cnv-amarillo);transform:rotate(-3deg);
    box-shadow:3px 3px 0 rgba(254,203,0,.35);
  }
  body[data-tpl="x-corcel-v"] .cnv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-corcel-v"] .cnv-hgroup{flex:1;min-width:0;}
  body[data-tpl="x-corcel-v"] .cnv-tit{
    margin:0;font-family:'Archivo Black',sans-serif;font-size:19px;line-height:1;
    color:var(--cnv-amarillo);text-transform:uppercase;transform:skewX(-6deg);letter-spacing:.01em;
  }
  body[data-tpl="x-corcel-v"] .cnv-line{
    font-weight:600;font-size:12.5px;letter-spacing:.05em;color:var(--cnv-crema);margin-top:4px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-corcel-v"] .cnv-hazard{
    height:9px;
    background:repeating-linear-gradient(45deg, var(--cnv-amarillo) 0 13px, var(--cnv-negro) 13px 26px);
    border-bottom:2px solid var(--cnv-negro);
  }

  /* ---------- NAV DE CHIPS STICKY ---------- */
  body[data-tpl="x-corcel-v"] .cnv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 14px;scrollbar-width:none;background:rgba(254,203,0,.95);backdrop-filter:blur(6px);
    border-bottom:3px solid var(--cnv-negro);
  }
  body[data-tpl="x-corcel-v"] .cnv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-corcel-v"] .cnv-nav button{
    flex:0 0 auto;font-family:'Barlow Condensed';font-weight:700;font-size:14.5px;letter-spacing:.05em;
    text-transform:uppercase;color:var(--cnv-amarillo);background:var(--cnv-negro);border:none;border-radius:5px;
    padding:9px 15px;cursor:pointer;white-space:nowrap;transform:skewX(-8deg);
    box-shadow:3px 3px 0 rgba(15,13,8,.25);
  }
  body[data-tpl="x-corcel-v"] .cnv-nav button span{display:inline-block;transform:skewX(8deg);}
  body[data-tpl="x-corcel-v"] .cnv-nav button.activa{background:#fff;color:var(--cnv-negro);box-shadow:3px 3px 0 var(--cnv-negro);}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-corcel-v"] .cnv-sec{padding:2px 16px 0;scroll-margin-top:64px;}
  body[data-tpl="x-corcel-v"] .cnv-cat{
    display:inline-block;font-family:'Archivo Black',sans-serif;font-size:16px;text-transform:uppercase;
    color:var(--cnv-amarillo);background:var(--cnv-negro);padding:8px 16px;border-radius:6px;
    transform:skewX(-8deg);margin:18px 0 14px;box-shadow:4px 4px 0 rgba(15,13,8,.22);
  }
  body[data-tpl="x-corcel-v"] .cnv-cat span{display:inline-block;transform:skewX(8deg);}

  /* ---------- GRID VITRINA 2 COLUMNAS ---------- */
  body[data-tpl="x-corcel-v"] .cnv-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 12px;}
  body[data-tpl="x-corcel-v"] .cnv-tile{
    position:relative;background:var(--cnv-negro);border-radius:14px;
    box-shadow:0 5px 0 var(--cnv-sombra);
  }
  body[data-tpl="x-corcel-v"] .cnv-mediaw{position:relative;margin:8px 8px 0;}
  body[data-tpl="x-corcel-v"] .cnv-media{
    position:relative;aspect-ratio:1/1;border-radius:10px;overflow:hidden;
    border:2px solid rgba(254,203,0,.7);background:#1F1B10;
    display:flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-corcel-v"] .cnv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-corcel-v"] .cnv-media.sin-foto{
    font-size:46px;
    background:
      radial-gradient(circle at 50% 40%, rgba(254,203,0,.30), rgba(254,203,0,0) 62%),
      repeating-linear-gradient(45deg, rgba(254,203,0,.10) 0 12px, rgba(254,203,0,0) 12px 24px),
      #1F1B10;
  }
  body[data-tpl="x-corcel-v"] .cnv-media.sin-foto::after{
    content:"";position:absolute;top:9px;left:-10px;width:48px;height:18px;
    background:repeating-linear-gradient(90deg, rgba(254,203,0,.5) 0 11px, transparent 11px 18px);
    transform:skewX(-30deg);pointer-events:none;
  }

  /* stepper flotante sobre la esquina de la media */
  body[data-tpl="x-corcel-v"] .cnv-ctrl{
    position:absolute;right:7px;bottom:-10px;z-index:3;
    display:flex;align-items:center;gap:5px;
  }
  body[data-tpl="x-corcel-v"] .cnv-ctrl [data-qtywrap]{
    display:none;align-items:center;gap:4px;
    background:var(--cnv-negro);border:2px solid var(--cnv-amarillo);border-radius:9px;
    padding:3px 5px;box-shadow:0 4px 0 var(--cnv-sombra);
  }
  body[data-tpl="x-corcel-v"] .cnv-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-corcel-v"] [data-add]{
    width:38px;height:38px;border-radius:9px;border:2px solid var(--cnv-negro);cursor:pointer;
    background:var(--cnv-amarillo);color:var(--cnv-negro);font-size:21px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 var(--cnv-sombra);
  }
  body[data-tpl="x-corcel-v"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--cnv-sombra);}
  body[data-tpl="x-corcel-v"] [data-sub]{
    width:26px;height:26px;border-radius:6px;border:1.5px solid rgba(254,203,0,.65);background:transparent;
    color:var(--cnv-amarillo);font-size:16px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-corcel-v"] [data-cant]{
    font-family:'Archivo Black';font-size:13.5px;color:#fff;min-width:16px;text-align:center;
  }

  /* cuerpo del tile */
  body[data-tpl="x-corcel-v"] .cnv-info{padding:13px 11px 12px;}
  body[data-tpl="x-corcel-v"] .cnv-nom{
    font-weight:800;font-size:15.5px;line-height:1.1;letter-spacing:.02em;text-transform:uppercase;color:#fff;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:34px;
  }
  body[data-tpl="x-corcel-v"] .cnv-precio{
    display:inline-block;margin-top:8px;font-family:'Archivo Black',sans-serif;font-size:13.5px;
    color:var(--cnv-negro);background:var(--cnv-amarillo);padding:4px 10px;border-radius:4px;
    transform:skewX(-8deg);white-space:nowrap;box-shadow:3px 3px 0 rgba(254,203,0,.3);
  }
  body[data-tpl="x-corcel-v"] .cnv-precio span{display:inline-block;transform:skewX(8deg);}

  body[data-tpl="x-corcel-v"] .cnv-fin{
    text-align:center;padding:26px 0 10px;font-family:'Archivo Black',sans-serif;font-size:13px;
    letter-spacing:.18em;text-transform:uppercase;color:var(--cnv-negro);
  }

  /* carrito */
  body[data-tpl="x-corcel-v"] #cart-fab{
    background:var(--cnv-negro) !important;color:var(--cnv-amarillo) !important;border-radius:10px !important;
    font-family:'Barlow Condensed' !important;font-weight:800 !important;font-size:17px !important;
    letter-spacing:.04em;text-transform:uppercase;
    box-shadow:0 6px 0 var(--cnv-sombra), 0 16px 30px rgba(15,13,8,.35) !important;
  }
  body[data-tpl="x-corcel-v"] #cart-fab #fab-cant{background:var(--cnv-amarillo) !important;color:var(--cnv-negro) !important;}
  body[data-tpl="x-corcel-v"] #cart h2{font-family:'Archivo Black',sans-serif;text-transform:uppercase;font-size:17px;}
  body[data-tpl="x-corcel-v"] #cart .cart-row .st-add{background:var(--cnv-amarillo) !important;color:var(--cnv-negro) !important;}

  @media(max-width:380px){
    body[data-tpl="x-corcel-v"] .cnv-tit{font-size:17px;}
    body[data-tpl="x-corcel-v"] .cnv-logo{width:42px;height:42px;}
    body[data-tpl="x-corcel-v"] .cnv-grid{gap:14px 10px;}
    body[data-tpl="x-corcel-v"] .cnv-media.sin-foto{font-size:40px;}
    body[data-tpl="x-corcel-v"] .cnv-nom{font-size:14px;min-height:31px;}
    body[data-tpl="x-corcel-v"] [data-add]{width:34px;height:34px;font-size:19px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="cnv-tile">
        <div class="cnv-mediaw">
          <div class="cnv-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="cnv-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="cnv-info">
          <div class="cnv-nom">${it.nombre}</div>
          <span class="cnv-precio"><span>$${Number(it.precio).toFixed(2)}</span></span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="cnv-sec" id="cat-${slug(c.categoria)}">
        <div class="cnv-cat"><span>${c.categoria}</span></div>
        <div class="cnv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}"><span>${c.categoria}</span></button>`).join("");
    const linea = R.promo || R.direccion || "";

    root.innerHTML = `
      <header class="cnv-top">
        ${R.logo ? `<div class="cnv-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="cnv-hgroup">
          <h1 class="cnv-tit">${R.nombre}</h1>
          ${linea ? `<div class="cnv-line">${linea}</div>` : ``}
        </div>
      </header>
      <div class="cnv-hazard"></div>
      <nav class="cnv-nav">${nav}</nav>
      ${secciones}
      <div class="cnv-fin">🐎 Corcel Negro · Al galope</div>`;

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".cnv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".cnv-sec").forEach((s) => io.observe(s));
    }
  },
};
