/* x-mammamia-n — "Mamma mia! de Noche" — plantilla EXCLUSIVA de Mamma mia!
   La trattoria después del atardecer: la misma madera, el tricolor y el borde
   de masa del flagship, en tono nocturno. Hero grande + carta en una columna. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-mammamia-n"] = {
  label: "Mamma mia! de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,700;1,700&family=Lora:ital,wght@0,500;0,600;1,500&display=swap');

  body[data-tpl="x-mammamia-n"]{
    --mm-rojo:#C22A2C; --mm-verde:#1F7A3D; --mm-verde-luz:#58C27D; --mm-crema:#FBF3E4;
    --mm-noche:#1A0E0A; --mm-carta:#2B1A13; --mm-borde:rgba(232,211,180,.25); --mm-tan:#E8D3B4;
    background:var(--mm-noche);
    background-image:
      repeating-linear-gradient(0deg, rgba(251,243,228,.03) 0 16px, transparent 16px 32px),
      repeating-linear-gradient(90deg, rgba(251,243,228,.03) 0 16px, transparent 16px 32px);
    color:#F3E9D8; font-family:'Lora',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-mammamia-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO ---------- */
  body[data-tpl="x-mammamia-n"] .mmn-hero{
    position:relative;height:50vh;max-height:420px;min-height:330px;overflow:hidden;
    display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
    padding:calc(18px + env(safe-area-inset-top)) 20px 40px;
    background:radial-gradient(120% 95% at 50% 0%, #3A241A 0%, #241511 55%, #1A0E0A 100%);
  }
  body[data-tpl="x-mammamia-n"] .mmn-hero::before{
    content:"";position:absolute;inset:0;pointer-events:none;
    background-image:
      repeating-linear-gradient(0deg, rgba(194,42,44,.07) 0 16px, transparent 16px 32px),
      repeating-linear-gradient(90deg, rgba(194,42,44,.07) 0 16px, transparent 16px 32px);
  }
  body[data-tpl="x-mammamia-n"] .mmn-logo{
    position:relative;width:96px;height:96px;border-radius:50%;overflow:hidden;background:#fff;
    border:3px solid #fff;box-shadow:0 0 0 6px rgba(194,42,44,.28), 0 16px 36px rgba(0,0,0,.65);
  }
  body[data-tpl="x-mammamia-n"] .mmn-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-mammamia-n"] .mmn-nombre{
    position:relative;font-family:'Lobster Two',cursive;font-weight:700;font-style:italic;
    font-size:46px;line-height:1;margin:16px 0 0;color:var(--mm-crema);
    text-shadow:0 4px 18px rgba(0,0,0,.7);
  }
  body[data-tpl="x-mammamia-n"] .mmn-slogan{
    position:relative;font-style:italic;font-size:15px;color:rgba(251,243,228,.82);margin-top:9px;
  }
  body[data-tpl="x-mammamia-n"] .mmn-datos{
    position:relative;display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:16px;
  }
  body[data-tpl="x-mammamia-n"] .mmn-datos span{
    font-size:12px;font-weight:600;color:var(--mm-tan);background:rgba(251,243,228,.08);
    border:1.5px solid var(--mm-borde);border-radius:999px;padding:6px 12px;
  }
  body[data-tpl="x-mammamia-n"] .mmn-tricolor{
    position:absolute;left:-6px;right:-6px;bottom:-5px;height:11px;display:flex;
    transform:skewY(-1.2deg);z-index:2;
  }
  body[data-tpl="x-mammamia-n"] .mmn-tricolor i{flex:1;}
  body[data-tpl="x-mammamia-n"] .mmn-tricolor i:nth-child(1){background:var(--mm-verde);}
  body[data-tpl="x-mammamia-n"] .mmn-tricolor i:nth-child(2){background:#fff;}
  body[data-tpl="x-mammamia-n"] .mmn-tricolor i:nth-child(3){background:var(--mm-rojo);}

  /* ---------- NAV NOCTURNA (subrayado tricolor) ---------- */
  body[data-tpl="x-mammamia-n"] .mmn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:4px;overflow-x:auto;
    padding:10px 14px;scrollbar-width:none;background:rgba(26,14,10,.93);backdrop-filter:blur(8px);
    border-bottom:1px solid var(--mm-borde);
  }
  body[data-tpl="x-mammamia-n"] .mmn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-mammamia-n"] .mmn-nav button{
    flex:0 0 auto;font-family:'Lobster Two',cursive;font-weight:700;font-size:15px;
    color:rgba(251,243,228,.78);background:transparent;border:none;border-radius:0;
    padding:8px 13px 10px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-mammamia-n"] .mmn-nav button.activa{
    color:#fff;
    background:linear-gradient(90deg, var(--mm-verde) 0 33%, #fff 33% 66%, var(--mm-rojo) 66%) bottom/100% 3px no-repeat;
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-mammamia-n"] .mmn-sec{padding:6px 16px 0;scroll-margin-top:68px;}
  body[data-tpl="x-mammamia-n"] .mmn-cat{display:flex;align-items:center;gap:12px;margin:26px 2px 14px;}
  body[data-tpl="x-mammamia-n"] .mmn-cat::before, body[data-tpl="x-mammamia-n"] .mmn-cat::after{
    content:""; flex:1; height:2px;
    background:linear-gradient(90deg, var(--mm-verde) 0 33%, rgba(251,243,228,.85) 33% 66%, var(--mm-rojo) 66%);
    border-radius:99px; opacity:.7;
  }
  body[data-tpl="x-mammamia-n"] .mmn-cat span{
    font-family:'Lobster Two',cursive;font-weight:700;font-style:italic;font-size:26px;color:var(--mm-tan);
    text-align:center;
  }

  /* ---------- FILAS: MEDIA GRANDE IZQUIERDA ---------- */
  body[data-tpl="x-mammamia-n"] .mmn-card{
    display:flex;gap:13px;align-items:center;background:var(--mm-carta);
    border:1px solid var(--mm-borde);border-radius:18px;
    padding:11px;margin-bottom:12px;
    box-shadow:0 10px 22px -12px rgba(0,0,0,.6);
  }
  body[data-tpl="x-mammamia-n"] .mmn-media{
    flex:0 0 auto;width:86px;height:86px;border-radius:16px;overflow:hidden;position:relative;
    background:#3A241A;border:1px solid rgba(232,211,180,.3);
    display:flex;align-items:center;justify-content:center;font-size:38px;
  }
  body[data-tpl="x-mammamia-n"] .mmn-media.is-emoji::after{
    content:"";position:absolute;inset:6px;border:2px dashed rgba(217,185,140,.55);border-radius:11px;pointer-events:none;
  }
  body[data-tpl="x-mammamia-n"] .mmn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-mammamia-n"] .mmn-body{flex:1;min-width:0;}
  body[data-tpl="x-mammamia-n"] .mmn-nom{font-weight:600;font-size:15.5px;line-height:1.25;color:var(--mm-crema);}
  body[data-tpl="x-mammamia-n"] .mmn-desc{
    font-style:italic;font-size:12.5px;color:#C9B39A;line-height:1.4;margin-top:4px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-mammamia-n"] .mmn-lado{
    flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:9px;
  }
  body[data-tpl="x-mammamia-n"] .mmn-precio{
    font-family:'Lobster Two',cursive;font-weight:700;font-size:17px;color:var(--mm-verde-luz);
    white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-mammamia-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-mammamia-n"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;
    background:var(--mm-rojo);color:#fff;font-size:21px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 8px 16px -4px rgba(194,42,44,.55);
  }
  body[data-tpl="x-mammamia-n"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-mammamia-n"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:2px solid var(--mm-verde-luz);background:transparent;color:var(--mm-verde-luz);
    font-size:17px;font-weight:700;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-mammamia-n"] [data-cant]{display:none;font-family:'Lobster Two';font-weight:700;font-size:15px;color:var(--mm-crema);min-width:17px;text-align:center;}
  body[data-tpl="x-mammamia-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-mammamia-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-mammamia-n"] .mmn-fin{
    text-align:center;padding:30px 0 10px;font-family:'Lobster Two',cursive;font-style:italic;
    font-size:22px;color:var(--mm-tan);
  }

  /* carrito */
  body[data-tpl="x-mammamia-n"] #cart-fab{
    background:var(--mm-rojo) !important;color:#fff !important;border-radius:999px !important;
    font-family:'Lobster Two',cursive !important;font-weight:700 !important;font-size:17px !important;
    box-shadow:0 14px 30px rgba(194,42,44,.5) !important;
  }
  body[data-tpl="x-mammamia-n"] #cart-fab #fab-cant{background:#fff !important;color:var(--mm-rojo) !important;}
  body[data-tpl="x-mammamia-n"] #cart h2{font-family:'Lobster Two',cursive;font-style:italic;}
  body[data-tpl="x-mammamia-n"] #cart .cart-row .st-add{background:var(--mm-verde) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-mammamia-n"] .mmn-nombre{font-size:38px;}
    body[data-tpl="x-mammamia-n"] .mmn-media{width:74px;height:74px;font-size:33px;}
    body[data-tpl="x-mammamia-n"] .mmn-nom{font-size:14.5px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍕"));
    const cats = R.menu || [];

    const card = (it, cat) => `
      <article class="mmn-card">
        <div class="mmn-media ${it.foto ? "" : "is-emoji"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="mmn-body">
          <div class="mmn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="mmn-desc">${it.desc}</div>` : ``}
        </div>
        <div class="mmn-lado">
          <span class="mmn-precio">$${Number(it.precio).toFixed(2)}</span>
          ${ctrl(it.id)}
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="mmn-sec" id="cat-${slug(c.categoria)}">
        <div class="mmn-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => card(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || "", R.direccion ? "📍 " + R.direccion.split("·")[0].trim() : ""]).filter(Boolean);

    root.innerHTML = `
      <header class="mmn-hero">
        ${R.logo ? `<div class="mmn-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="mmn-nombre">${R.nombre}</h1>
        <div class="mmn-slogan">${R.slogan || "El verdadero sabor de la pizza"}</div>
        ${meta.length ? `<div class="mmn-datos">${meta.map((m) => `<span>${m}</span>`).join("")}</div>` : ``}
        <div class="mmn-tricolor"><i></i><i></i><i></i></div>
      </header>
      <nav class="mmn-nav">${nav}</nav>
      ${secciones}
      <div class="mmn-fin">Buonanotte e buon appetito! 🌙</div>`;

    const botones = [...root.querySelectorAll(".mmn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -75% 0px" });
      root.querySelectorAll(".mmn-sec").forEach((s) => io.observe(s));
    }
  },
};
