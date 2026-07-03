/* x-ales-n — "La Esquina de Ales de Noche" — plantilla EXCLUSIVA de La Esquina de Ales.
   Versión NOCTURNA de "Esquina Pop": el barrio con el letrero encendido.
   Azul noche derivado del azul insignia, lunares tenues, el amarillo del logo
   como neón y el mismo lenguaje sticker (borde grueso, sombras duras, rotaciones,
   píldoras rojas). Hero grande de apertura y menú en una columna de tarjetas
   horizontales con la media cuadrada redondeada a la izquierda. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-ales-n"] = {
  label: "La Esquina de Ales de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Baloo+2:wght@500;600;700;800&display=swap');

  body[data-tpl="x-ales-n"]{
    --an-noche:#0E1440; --an-noche2:#080C2B; --an-tarjeta:#1A2160;
    --an-rojo:#E11224; --an-rojo2:#8E0714; --an-amarillo:#FFE500; --an-oscuro:#C7B300;
    --an-crema:#FFF6D6;
    background:var(--an-noche);
    background-image:radial-gradient(rgba(255,229,0,.08) 2.2px, transparent 2.6px);
    background-size:26px 26px;
    color:var(--an-crema); font-family:'Baloo 2',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-ales-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO ---------- */
  body[data-tpl="x-ales-n"] .an-hero{
    position:relative; overflow:hidden; height:50vh; max-height:420px; min-height:300px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:calc(20px + env(safe-area-inset-top)) 22px 26px;
    background:radial-gradient(circle at 50% -30%, rgba(255,229,0,.24), rgba(255,229,0,0) 62%);
    border-bottom:4px solid var(--an-amarillo);
  }
  body[data-tpl="x-ales-n"] .an-hero::before{
    content:""; position:absolute; left:50%; top:-130px; transform:translateX(-50%);
    width:min(420px,120vw); aspect-ratio:1/1; border-radius:50%;
    border:3px dashed rgba(255,229,0,.2); pointer-events:none;
  }
  body[data-tpl="x-ales-n"] .an-hero > *{position:relative;z-index:1;}
  body[data-tpl="x-ales-n"] .an-logo{
    width:92px;height:92px;border-radius:50%;overflow:hidden;margin:0 auto 10px;
    background:#fff;border:4px solid var(--an-amarillo);transform:rotate(3deg);
    box-shadow:0 10px 24px rgba(0,0,0,.5);
    display:flex;align-items:center;justify-content:center;font-size:44px;
  }
  body[data-tpl="x-ales-n"] .an-logo img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-ales-n"] .an-tipo{
    font-weight:800;font-size:12px;letter-spacing:.26em;text-transform:uppercase;
    color:rgba(255,246,214,.85);
  }
  body[data-tpl="x-ales-n"] .an-nombre{
    font-family:'Titan One',cursive;font-size:40px;line-height:1.02;color:var(--an-amarillo);
    transform:rotate(-1deg);text-shadow:0 4px 0 rgba(0,0,0,.45);margin-top:8px;
  }
  body[data-tpl="x-ales-n"] .an-promo{
    margin-top:15px;display:inline-block;font-weight:700;font-size:13px;color:var(--an-crema);
    background:rgba(8,12,43,.55);border:3px solid rgba(255,229,0,.55);border-radius:999px;
    padding:7px 15px;box-shadow:0 4px 0 rgba(0,0,0,.35);
  }

  /* ---------- NAV STICKY NOCTURNA ---------- */
  body[data-tpl="x-ales-n"] .an-nav{
    position:sticky; top:0; z-index:30; display:flex; gap:9px; overflow-x:auto;
    padding:11px 16px; scrollbar-width:none;
    background:rgba(8,12,43,.92); backdrop-filter:blur(8px);
    border-bottom:3px solid rgba(255,229,0,.35);
  }
  body[data-tpl="x-ales-n"] .an-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-ales-n"] .an-nav button{
    flex:0 0 auto; font-family:'Titan One',cursive; font-size:12.5px; color:var(--an-crema);
    background:transparent; border:3px solid rgba(255,246,214,.35); border-radius:14px;
    padding:8px 14px; cursor:pointer; white-space:nowrap; box-shadow:0 4px 0 rgba(0,0,0,.35);
  }
  body[data-tpl="x-ales-n"] .an-nav button:nth-child(odd){transform:rotate(-1.2deg);}
  body[data-tpl="x-ales-n"] .an-nav button:nth-child(even){transform:rotate(1.2deg);}
  body[data-tpl="x-ales-n"] .an-nav button.activa{
    background:var(--an-amarillo); border-color:var(--an-oscuro); color:#1D2B7C;
    box-shadow:0 4px 0 var(--an-oscuro);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-ales-n"] .an-sec{padding:4px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-ales-n"] .an-cat{
    display:inline-block;font-family:'Titan One',cursive;font-size:18px;color:var(--an-amarillo);
    background:rgba(255,229,0,.08);border:3px solid var(--an-amarillo);border-radius:13px;
    padding:7px 16px;margin:22px 0 14px;transform:rotate(-1deg);box-shadow:0 5px 0 rgba(0,0,0,.35);
  }

  /* ---------- TARJETAS HORIZONTALES (1 columna) ---------- */
  body[data-tpl="x-ales-n"] .an-item{
    display:grid; grid-template-columns:84px 1fr auto; gap:13px; align-items:center;
    background:var(--an-tarjeta); border:3px solid rgba(255,229,0,.4); border-radius:19px;
    padding:12px; margin-bottom:14px; box-shadow:0 7px 0 rgba(0,0,0,.35);
  }
  body[data-tpl="x-ales-n"] .an-item:nth-of-type(odd){transform:rotate(.4deg);}
  body[data-tpl="x-ales-n"] .an-item:nth-of-type(even){transform:rotate(-.4deg);}
  body[data-tpl="x-ales-n"] .an-media{
    position:relative; width:84px; height:84px; border-radius:16px; overflow:hidden;
    background:#141B52; border:3px solid var(--an-rojo);
    display:flex; align-items:center; justify-content:center; font-size:36px;
  }
  body[data-tpl="x-ales-n"] .an-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-ales-n"] .an-media.sin-foto{
    background-image:radial-gradient(rgba(255,229,0,.16) 1.8px, transparent 2.2px);
    background-size:16px 16px;
  }
  body[data-tpl="x-ales-n"] .an-media.sin-foto::before{
    content:""; position:absolute; inset:10%;
    border:2px dashed rgba(255,229,0,.35); border-radius:50%; pointer-events:none;
  }
  body[data-tpl="x-ales-n"] .an-nom{
    font-family:'Titan One',cursive;font-size:14.5px;line-height:1.25;color:#fff;
  }
  body[data-tpl="x-ales-n"] .an-desc{
    font-weight:500;font-size:12.5px;color:rgba(255,246,214,.72);line-height:1.35;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-ales-n"] .an-right{
    display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:9px;
    align-self:stretch;border-left:3px dotted rgba(255,229,0,.3);padding-left:12px;
  }
  body[data-tpl="x-ales-n"] .an-precio{
    font-family:'Titan One',cursive;font-size:13px;color:#fff;background:var(--an-rojo);
    border-radius:999px;padding:4px 11px;transform:rotate(-2deg);
    box-shadow:0 3px 0 var(--an-rojo2);white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-ales-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-ales-n"] [data-add]{
    width:37px;height:37px;border-radius:50%;border:3px solid var(--an-oscuro);cursor:pointer;
    background:var(--an-amarillo);color:#1D2B7C;font-size:20px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 0 var(--an-oscuro);
  }
  body[data-tpl="x-ales-n"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--an-oscuro);}
  body[data-tpl="x-ales-n"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:3px solid rgba(255,246,214,.5);
    background:transparent;color:var(--an-crema);font-size:17px;font-weight:800;
    display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-ales-n"] [data-cant]{
    display:none;font-family:'Titan One';font-size:15px;color:var(--an-amarillo);
    min-width:17px;text-align:center;
  }
  body[data-tpl="x-ales-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-ales-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-ales-n"] .an-fin{
    text-align:center;padding:30px 0 10px;font-family:'Titan One',cursive;font-size:15px;color:var(--an-amarillo);
  }

  /* carrito */
  body[data-tpl="x-ales-n"] #cart-fab{
    background:var(--an-amarillo) !important;color:#1D2B7C !important;border:3px solid var(--an-oscuro) !important;
    border-radius:18px !important;font-family:'Titan One',cursive !important;font-weight:400 !important;
    box-shadow:0 6px 0 var(--an-oscuro), 0 16px 30px rgba(0,0,0,.5) !important;
  }
  body[data-tpl="x-ales-n"] #cart-fab #fab-cant{background:#1D2B7C !important;color:var(--an-amarillo) !important;}
  body[data-tpl="x-ales-n"] #cart h2{font-family:'Titan One',cursive;color:#1D2B7C;}
  body[data-tpl="x-ales-n"] #cart .cart-row .st-add{background:var(--an-amarillo) !important;color:#1D2B7C !important;}

  @media(max-width:380px){
    body[data-tpl="x-ales-n"] .an-hero{min-height:280px;}
    body[data-tpl="x-ales-n"] .an-nombre{font-size:32px;}
    body[data-tpl="x-ales-n"] .an-logo{width:78px;height:78px;}
    body[data-tpl="x-ales-n"] .an-cat{font-size:16px;}
    body[data-tpl="x-ales-n"] .an-item{grid-template-columns:70px 1fr auto;gap:10px;}
    body[data-tpl="x-ales-n"] .an-media{width:70px;height:70px;font-size:30px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍗"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="an-item">
        <div class="an-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div><div class="an-nom">${it.nombre}</div>${it.desc ? `<div class="an-desc">${it.desc}</div>` : ``}</div>
        <div class="an-right"><span class="an-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="an-sec" id="cat-${slug(c.categoria)}">
        <div class="an-cat">${c.categoria}</div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="an-hero">
        ${R.logo ? `<div class="an-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="an-tipo">${R.slogan || "Asaderos · Riobamba"}</div>
        <h1 class="an-nombre">${R.nombre}</h1>
        ${R.promo ? `<div class="an-promo">${R.promo}</div>` : ``}
      </header>
      <nav class="an-nav">${nav}</nav>
      ${secciones}
      <div class="an-fin">😉👌 ¡El sabor de la esquina, de noche!</div>`;

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".an-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -72% 0px" });
      root.querySelectorAll(".an-sec").forEach((s) => io.observe(s));
    }
  },
};
