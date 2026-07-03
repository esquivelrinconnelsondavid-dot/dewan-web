/* x-corcel-n — "Corcel Negro de Noche" — plantilla EXCLUSIVA alterna de Corcel Negro.
   Variante NOCTURNA: hero grande de apertura (logo, nombre y slogan bajo un
   resplandor amarillo) sobre fondo negro profundo, y el menú en una columna de
   tarjetas horizontales con la media redonda a la izquierda. Misma paleta del
   flagship "Vía Rápida" invertida: amarillo #FECB00 como luz sobre la noche,
   franjas de peligro, bloques inclinados y sombras duras. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-corcel-n"] = {
  label: "Corcel Negro de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:wght@500;600;700;800&display=swap');

  body[data-tpl="x-corcel-n"]{
    --cnn-noche:#0B0A06; --cnn-carbon:#17140C; --cnn-amarillo:#FECB00;
    --cnn-crema:#FFF6D6; --cnn-humo:#C9C4B0; --cnn-sombra:#6B5600;
    background:var(--cnn-noche); color:var(--cnn-crema);
    font-family:'Barlow Condensed',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-corcel-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO ---------- */
  body[data-tpl="x-corcel-n"] .cnn-hero{
    position:relative;overflow:hidden;height:50vh;max-height:420px;min-height:300px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    text-align:center;padding:calc(18px + env(safe-area-inset-top)) 22px 36px;
    background:
      radial-gradient(circle at 50% 30%, rgba(254,203,0,.20), rgba(254,203,0,0) 58%),
      repeating-linear-gradient(45deg, rgba(254,203,0,.05) 0 14px, rgba(254,203,0,0) 14px 28px),
      linear-gradient(180deg,#191509,var(--cnn-noche));
  }
  body[data-tpl="x-corcel-n"] .cnn-hero::before{
    content:"";position:absolute;bottom:52px;left:-18px;width:92px;height:24px;
    background:repeating-linear-gradient(90deg, rgba(254,203,0,.35) 0 13px, transparent 13px 22px);
    transform:skewX(-30deg);pointer-events:none;
  }
  body[data-tpl="x-corcel-n"] .cnn-hero::after{
    content:"";position:absolute;top:calc(28px + env(safe-area-inset-top));right:-18px;width:92px;height:24px;
    background:repeating-linear-gradient(90deg, rgba(254,203,0,.35) 0 13px, transparent 13px 22px);
    transform:skewX(-30deg);pointer-events:none;
  }
  body[data-tpl="x-corcel-n"] .cnn-hero > *{position:relative;z-index:1;}
  body[data-tpl="x-corcel-n"] .cnn-logo{
    width:92px;height:92px;border-radius:18px;overflow:hidden;margin-bottom:16px;
    border:3px solid var(--cnn-amarillo);transform:rotate(-3deg);
    box-shadow:6px 6px 0 rgba(254,203,0,.28), 0 0 46px rgba(254,203,0,.22);
  }
  body[data-tpl="x-corcel-n"] .cnn-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-corcel-n"] .cnn-tit{
    margin:0;font-family:'Archivo Black',sans-serif;font-size:38px;line-height:.98;
    color:var(--cnn-amarillo);text-transform:uppercase;transform:skewX(-6deg);letter-spacing:.01em;
    text-shadow:0 6px 30px rgba(254,203,0,.25);
  }
  body[data-tpl="x-corcel-n"] .cnn-slogan{
    margin-top:11px;font-weight:700;font-size:13.5px;letter-spacing:.42em;text-transform:uppercase;
    color:var(--cnn-crema);
  }
  body[data-tpl="x-corcel-n"] .cnn-dir{
    margin-top:9px;font-weight:600;font-size:13px;letter-spacing:.05em;color:var(--cnn-humo);
  }
  body[data-tpl="x-corcel-n"] .cnn-promo{
    margin-top:14px;font-weight:700;font-size:12.5px;letter-spacing:.04em;color:var(--cnn-amarillo);
    border:1.5px solid rgba(254,203,0,.55);border-radius:6px;padding:6px 13px;transform:skewX(-6deg);
  }
  body[data-tpl="x-corcel-n"] .cnn-promo span{display:inline-block;transform:skewX(6deg);}
  body[data-tpl="x-corcel-n"] .cnn-hero .cnn-hazard{
    position:absolute;left:0;right:0;bottom:0;height:10px;
    background:repeating-linear-gradient(45deg, var(--cnn-amarillo) 0 13px, var(--cnn-noche) 13px 26px);
  }

  /* ---------- NAV STICKY ---------- */
  body[data-tpl="x-corcel-n"] .cnn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;background:rgba(11,10,6,.93);backdrop-filter:blur(8px);
    border-bottom:2px solid rgba(254,203,0,.4);
  }
  body[data-tpl="x-corcel-n"] .cnn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-corcel-n"] .cnn-nav button{
    flex:0 0 auto;font-family:'Barlow Condensed';font-weight:700;font-size:14.5px;letter-spacing:.05em;
    text-transform:uppercase;color:var(--cnn-amarillo);background:transparent;
    border:1.5px solid rgba(254,203,0,.55);border-radius:5px;
    padding:8px 14px;cursor:pointer;white-space:nowrap;transform:skewX(-8deg);
  }
  body[data-tpl="x-corcel-n"] .cnn-nav button span{display:inline-block;transform:skewX(8deg);}
  body[data-tpl="x-corcel-n"] .cnn-nav button.activa{
    background:var(--cnn-amarillo);color:var(--cnn-noche);border-color:var(--cnn-amarillo);
    box-shadow:0 0 20px rgba(254,203,0,.35);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-corcel-n"] .cnn-sec{padding:4px 16px 0;scroll-margin-top:66px;}
  body[data-tpl="x-corcel-n"] .cnn-cat{
    display:inline-block;font-family:'Archivo Black',sans-serif;font-size:16px;text-transform:uppercase;
    color:var(--cnn-noche);background:var(--cnn-amarillo);padding:8px 16px;border-radius:6px;
    transform:skewX(-8deg);margin:20px 0 14px;box-shadow:4px 4px 0 rgba(254,203,0,.16);
  }
  body[data-tpl="x-corcel-n"] .cnn-cat span{display:inline-block;transform:skewX(8deg);}

  /* ---------- FILAS HORIZONTALES (1 columna) ---------- */
  body[data-tpl="x-corcel-n"] .cnn-fila{
    position:relative;display:flex;gap:12px;align-items:center;
    background:var(--cnn-carbon);border:1px solid rgba(254,203,0,.22);border-radius:16px;
    padding:12px;margin-bottom:12px;box-shadow:0 5px 0 #241D06;overflow:hidden;
  }
  body[data-tpl="x-corcel-n"] .cnn-fila::after{
    content:"";position:absolute;top:11px;right:-14px;width:52px;height:20px;
    background:repeating-linear-gradient(90deg, rgba(254,203,0,.3) 0 12px, transparent 12px 20px);
    transform:skewX(-30deg);pointer-events:none;
  }
  body[data-tpl="x-corcel-n"] .cnn-media{
    flex:0 0 auto;width:64px;height:64px;border-radius:50%;overflow:hidden;position:relative;
    border:2px solid rgba(254,203,0,.65);background:#221C0E;
    display:flex;align-items:center;justify-content:center;font-size:27px;
  }
  body[data-tpl="x-corcel-n"] .cnn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-corcel-n"] .cnn-media.sin-foto{
    background:radial-gradient(circle at 50% 38%, rgba(254,203,0,.24), rgba(254,203,0,0) 70%), #221C0E;
  }
  body[data-tpl="x-corcel-n"] .cnn-body{flex:1;min-width:0;}
  body[data-tpl="x-corcel-n"] .cnn-nom{
    font-weight:800;font-size:17px;line-height:1.06;letter-spacing:.02em;text-transform:uppercase;
    color:var(--cnn-crema);
  }
  body[data-tpl="x-corcel-n"] .cnn-desc{
    font-weight:500;font-size:13px;color:var(--cnn-humo);line-height:1.3;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-corcel-n"] .cnn-lado{
    flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:9px;
  }
  body[data-tpl="x-corcel-n"] .cnn-precio{
    font-family:'Archivo Black',sans-serif;font-size:14px;color:var(--cnn-noche);
    background:var(--cnn-amarillo);padding:4px 10px;border-radius:4px;transform:skewX(-8deg);
    white-space:nowrap;box-shadow:3px 3px 0 rgba(254,203,0,.22);
  }
  body[data-tpl="x-corcel-n"] .cnn-precio span{display:inline-block;transform:skewX(8deg);}
  body[data-tpl="x-corcel-n"] .cnn-ctrl{display:inline-flex;align-items:center;gap:5px;}

  /* steppers */
  body[data-tpl="x-corcel-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-corcel-n"] [data-add]{
    width:36px;height:36px;border-radius:7px;border:none;cursor:pointer;
    background:var(--cnn-amarillo);color:var(--cnn-noche);font-size:21px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 var(--cnn-sombra);
  }
  body[data-tpl="x-corcel-n"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--cnn-sombra);}
  body[data-tpl="x-corcel-n"] [data-sub]{
    width:32px;height:32px;border-radius:7px;border:2px solid rgba(254,203,0,.6);background:transparent;
    color:var(--cnn-amarillo);font-size:18px;font-weight:800;
    display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-corcel-n"] [data-cant]{
    display:none;font-family:'Archivo Black';font-size:14.5px;color:var(--cnn-crema);min-width:18px;text-align:center;
  }
  body[data-tpl="x-corcel-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-corcel-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-corcel-n"] .cnn-fin{
    text-align:center;padding:26px 0 10px;font-family:'Archivo Black',sans-serif;font-size:13px;
    letter-spacing:.18em;text-transform:uppercase;color:var(--cnn-amarillo);
  }

  /* carrito */
  body[data-tpl="x-corcel-n"] #cart-fab{
    background:var(--cnn-amarillo) !important;color:var(--cnn-noche) !important;border-radius:10px !important;
    font-family:'Barlow Condensed' !important;font-weight:800 !important;font-size:17px !important;
    letter-spacing:.04em;text-transform:uppercase;
    box-shadow:0 6px 0 var(--cnn-sombra), 0 16px 34px rgba(254,203,0,.30) !important;
  }
  body[data-tpl="x-corcel-n"] #cart-fab #fab-cant{background:var(--cnn-noche) !important;color:var(--cnn-amarillo) !important;}
  body[data-tpl="x-corcel-n"] #cart h2{font-family:'Archivo Black',sans-serif;text-transform:uppercase;font-size:17px;}
  body[data-tpl="x-corcel-n"] #cart .cart-row .st-add{background:var(--cnn-amarillo) !important;color:var(--cnn-noche) !important;}

  @media(max-width:380px){
    body[data-tpl="x-corcel-n"] .cnn-tit{font-size:31px;}
    body[data-tpl="x-corcel-n"] .cnn-logo{width:78px;height:78px;}
    body[data-tpl="x-corcel-n"] .cnn-media{width:56px;height:56px;font-size:24px;}
    body[data-tpl="x-corcel-n"] .cnn-fila{gap:10px;padding:11px;}
    body[data-tpl="x-corcel-n"] .cnn-precio{font-size:13px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="cnn-fila">
        <div class="cnn-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="cnn-body">
          <div class="cnn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="cnn-desc">${it.desc}</div>` : ``}
        </div>
        <div class="cnn-lado">
          <span class="cnn-precio"><span>$${Number(it.precio).toFixed(2)}</span></span>
          <span class="cnn-ctrl">${ctrl(it.id)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="cnn-sec" id="cat-${slug(c.categoria)}">
        <div class="cnn-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}"><span>${c.categoria}</span></button>`).join("");

    root.innerHTML = `
      <header class="cnn-hero">
        ${R.logo ? `<div class="cnn-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="cnn-tit">${R.nombre}</h1>
        <div class="cnn-slogan">${R.slogan || "Comida rápida"}</div>
        ${R.direccion ? `<div class="cnn-dir">📍 ${R.direccion}</div>` : ``}
        ${R.promo ? `<div class="cnn-promo"><span>${R.promo}</span></div>` : ``}
        <div class="cnn-hazard"></div>
      </header>
      <nav class="cnn-nav">${nav}</nav>
      ${secciones}
      <div class="cnn-fin">🐎 Corcel Negro · De noche, al galope</div>`;

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".cnn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -72% 0px" });
      root.querySelectorAll(".cnn-sec").forEach((s) => io.observe(s));
    }
  },
};
