/* x-mammamia — "Trattoria Tricolore" — plantilla EXCLUSIVA de Mamma mia!
   El tricolor a brochazos del logo, mantel de cuadros rojos y script de
   pizzería: el verdadero sabor de la pizza, hecho carta. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-mammamia"] = {
  label: "Trattoria Tricolore",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,700;1,700&family=Lora:ital,wght@0,500;0,600;1,500&display=swap');

  body[data-tpl="x-mammamia"]{
    --mm-rojo:#9E2224; --mm-verde:#1F7A3D; --mm-crema:#FBF3E4; --mm-madera:#241511;
    background:var(--mm-crema);
    background-image:
      repeating-linear-gradient(0deg, rgba(158,34,36,.055) 0 16px, transparent 16px 32px),
      repeating-linear-gradient(90deg, rgba(158,34,36,.055) 0 16px, transparent 16px 32px);
    color:#33231A; font-family:'Lora',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-mammamia"] #app{overflow-x:hidden;}

  /* ---------- CABECERA DE MADERA ---------- */
  body[data-tpl="x-mammamia"] .mm-top{
    background:linear-gradient(180deg,#2E1B14,#241511); color:#fff; text-align:center;
    padding:calc(24px + env(safe-area-inset-top)) 20px 0; position:relative;
  }
  body[data-tpl="x-mammamia"] .mm-logo{
    width:118px;height:118px;margin:0 auto;border-radius:50%;overflow:hidden;background:#fff;
    border:4px solid #fff;box-shadow:0 14px 34px rgba(0,0,0,.5);
  }
  body[data-tpl="x-mammamia"] .mm-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-mammamia"] .mm-nombre{
    font-family:'Lobster Two',cursive;font-weight:700;font-style:italic;font-size:44px;line-height:1;
    margin-top:14px;text-shadow:0 4px 14px rgba(0,0,0,.45);
  }
  body[data-tpl="x-mammamia"] .mm-slogan{
    font-style:italic;font-size:14.5px;color:rgba(255,255,255,.85);margin:8px 0 18px;
  }
  body[data-tpl="x-mammamia"] .mm-tricolor{
    height:12px;display:flex;transform:skewY(-1.2deg);margin:0 -4px -6px;position:relative;z-index:2;
  }
  body[data-tpl="x-mammamia"] .mm-tricolor i{flex:1;}
  body[data-tpl="x-mammamia"] .mm-tricolor i:nth-child(1){background:var(--mm-verde);}
  body[data-tpl="x-mammamia"] .mm-tricolor i:nth-child(2){background:#fff;}
  body[data-tpl="x-mammamia"] .mm-tricolor i:nth-child(3){background:#C22A2C;}

  body[data-tpl="x-mammamia"] .mm-datos{
    display:flex;flex-wrap:wrap;gap:7px;justify-content:center;padding:20px 16px 0;
  }
  body[data-tpl="x-mammamia"] .mm-datos span{
    font-size:12px;font-weight:600;color:#6B4A33;background:#fff;
    border:1.5px solid #E8D3B4;border-radius:999px;padding:6px 12px;
    box-shadow:0 3px 8px rgba(158,34,36,.07);
  }

  /* ---------- NAV BANDERINES ---------- */
  body[data-tpl="x-mammamia"] .mm-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;background:rgba(251,243,228,.95);backdrop-filter:blur(6px);
    border-bottom:2px solid #E8D3B4;
  }
  body[data-tpl="x-mammamia"] .mm-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-mammamia"] .mm-nav button{
    flex:0 0 auto;font-family:'Lobster Two',cursive;font-weight:700;font-size:14.5px;
    color:var(--mm-rojo);background:#fff;border:2px solid var(--mm-rojo);border-radius:999px;
    padding:8px 16px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-mammamia"] .mm-nav button.activa{
    background:var(--mm-rojo);color:#fff;
    box-shadow:0 6px 14px -4px rgba(158,34,36,.5);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-mammamia"] .mm-sec{padding:6px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-mammamia"] .mm-cat{display:flex;align-items:center;gap:12px;margin:24px 2px 12px;}
  body[data-tpl="x-mammamia"] .mm-cat::before, body[data-tpl="x-mammamia"] .mm-cat::after{
    content:""; flex:1; height:3px;
    background:linear-gradient(90deg, var(--mm-verde) 0 33%, #fff 33% 66%, #C22A2C 66%);
    border-radius:99px; opacity:.85;
  }
  body[data-tpl="x-mammamia"] .mm-cat span{
    font-family:'Lobster Two',cursive;font-weight:700;font-style:italic;font-size:27px;color:var(--mm-rojo);
    text-align:center;
  }

  /* ---------- TARJETAS TRATTORIA ---------- */
  body[data-tpl="x-mammamia"] .mm-card{
    display:flex;gap:13px;align-items:center;background:#fff;
    border:1.5px solid #EAD8BC;border-left:6px solid var(--mm-verde);border-radius:14px;
    padding:12px 13px;margin-bottom:12px;
    box-shadow:0 6px 16px -8px rgba(120,60,20,.18);
  }
  body[data-tpl="x-mammamia"] .mm-card:nth-child(even){border-left-color:#C22A2C;}
  body[data-tpl="x-mammamia"] .mm-media{
    flex:0 0 auto;width:58px;height:58px;border-radius:50%;overflow:hidden;position:relative;
    background:#FBEED3;border:2px dashed #D9B98C;
    display:flex;align-items:center;justify-content:center;font-size:26px;
  }
  body[data-tpl="x-mammamia"] .mm-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-mammamia"] .mm-body{flex:1;min-width:0;}
  body[data-tpl="x-mammamia"] .mm-nom{font-weight:600;font-size:15.5px;line-height:1.25;color:#33231A;}
  body[data-tpl="x-mammamia"] .mm-desc{font-style:italic;font-size:12.5px;color:#8B7059;line-height:1.4;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-mammamia"] .mm-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="x-mammamia"] .mm-precio{
    font-family:'Lobster Two',cursive;font-weight:700;font-size:16.5px;color:var(--mm-verde);
    white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-mammamia"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-mammamia"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;
    background:var(--mm-rojo);color:#fff;font-size:21px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 14px -4px rgba(158,34,36,.55);
  }
  body[data-tpl="x-mammamia"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-mammamia"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:2px solid var(--mm-verde);background:#fff;color:var(--mm-verde);
    font-size:17px;font-weight:700;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-mammamia"] [data-cant]{display:none;font-family:'Lobster Two';font-weight:700;font-size:15px;color:#33231A;min-width:17px;text-align:center;}
  body[data-tpl="x-mammamia"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-mammamia"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-mammamia"] .mm-fin{
    text-align:center;padding:30px 0 10px;font-family:'Lobster Two',cursive;font-style:italic;
    font-size:23px;color:var(--mm-rojo);
  }

  /* carrito */
  body[data-tpl="x-mammamia"] #cart-fab{
    background:var(--mm-rojo) !important;color:#fff !important;border-radius:999px !important;
    font-family:'Lobster Two',cursive !important;font-weight:700 !important;font-size:17px !important;
    box-shadow:0 14px 30px rgba(158,34,36,.45) !important;
  }
  body[data-tpl="x-mammamia"] #cart-fab #fab-cant{background:#fff !important;color:var(--mm-rojo) !important;}
  body[data-tpl="x-mammamia"] #cart h2{font-family:'Lobster Two',cursive;font-style:italic;}
  body[data-tpl="x-mammamia"] #cart .cart-row .st-add{background:var(--mm-verde) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-mammamia"] .mm-nombre{font-size:37px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍕"));
    const cats = R.menu || [];

    const card = (it, cat) => `
      <article class="mm-card">
        <div class="mm-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="mm-body">
          <div class="mm-nom">${it.nombre}</div>
          ${it.desc ? `<div class="mm-desc">${it.desc}</div>` : ``}
          <div class="mm-foot"><span class="mm-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="mm-sec" id="cat-${slug(c.categoria)}">
        <div class="mm-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => card(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || "", R.direccion ? "📍 " + R.direccion.split("·")[0].trim() : ""]).filter(Boolean);

    root.innerHTML = `
      <header class="mm-top">
        ${R.logo ? `<div class="mm-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="mm-nombre">${R.nombre}</h1>
        <div class="mm-slogan">${R.slogan || "El verdadero sabor de la pizza"}</div>
        <div class="mm-tricolor"><i></i><i></i><i></i></div>
      </header>
      <div class="mm-datos">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      <nav class="mm-nav">${nav}</nav>
      ${secciones}
      <div class="mm-fin">Buon appetito! 🇮🇹</div>`;

    const botones = [...root.querySelectorAll(".mm-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".mm-sec").forEach((s) => io.observe(s));
    }
  },
};
