/* x-bogati-n — "Bogati de Noche" — plantilla EXCLUSIVA de Bogati.
   "Crema derretida" en tono invertido: el chocolate del logo vuelto noche
   cerrada. Hero grande de apertura (logo que brilla como bocha bajo una
   luna de crema, BOGATI gigante, las 3 ondas y gotas de caramelo flotando)
   y el goteo cayendo del hero sobre la carta. Menú en UNA columna de
   tarjetas horizontales: media redondeada a la izquierda con su baño de
   caramelo, texto al centro y precio + stepper naranja a la derecha. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-bogati-n"] = {
  label: "Bogati de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@500;600;700;800&display=swap');

  body[data-tpl="x-bogati-n"]{
    --bo-choco:#4A2A0C; --bo-marca:#653B0E; --bo-tinta:#3A2408;
    --bo-crema:#FBF4E9; --bo-vainilla:#F5E7C9;
    --bo-naranja:#E8912D; --bo-caramelo:#B95F06; --bo-caramelo-osc:#8A4504;
    --bn-noche:#190C02; --bn-fondo:#2A1605; --bn-carta:#3B2009; --bn-borde:#5E3A16;
    background:var(--bn-fondo);
    background-image:linear-gradient(180deg,#2E1806 0%,#2A1605 55%,#200F03 100%);
    color:var(--bo-crema);
    font-family:'Nunito',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-bogati-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO ---------- */
  body[data-tpl="x-bogati-n"] .bon-hero{
    position:relative;text-align:center;min-height:min(50vh,420px);overflow:hidden;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    background:var(--bn-noche);
    padding:calc(26px + env(safe-area-inset-top)) 18px 30px;
  }
  /* luna de crema: resplandor detrás del logo */
  body[data-tpl="x-bogati-n"] .bon-hero::before{
    content:"";position:absolute;left:50%;top:8%;transform:translateX(-50%);
    width:340px;height:340px;border-radius:50%;pointer-events:none;
    background:radial-gradient(circle, rgba(232,145,45,.16) 0 38%, rgba(232,145,45,0) 70%);
  }
  body[data-tpl="x-bogati-n"] .bon-logo{
    position:relative;z-index:1;width:96px;height:96px;margin:0 auto 12px;
    border-radius:50%;overflow:hidden;background:var(--bo-crema);
    border:4px solid var(--bo-vainilla);
    box-shadow:0 0 0 7px rgba(232,145,45,.15), 0 14px 34px rgba(0,0,0,.55);
  }
  body[data-tpl="x-bogati-n"] .bon-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bogati-n"] .bon-tit{
    position:relative;z-index:1;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:clamp(46px,17vw,74px);line-height:.98;color:var(--bo-crema);
    letter-spacing:.01em;text-shadow:0 5px 0 rgba(0,0,0,.4);
  }
  body[data-tpl="x-bogati-n"] .bon-chip{
    position:relative;z-index:1;display:inline-block;margin-top:10px;
    background:var(--bo-naranja);color:var(--bo-tinta);
    font-weight:800;font-size:11px;letter-spacing:.18em;text-transform:uppercase;
    border-radius:999px;padding:7px 16px;box-shadow:0 4px 14px rgba(232,145,45,.35);
  }
  /* las 3 ondas del logo, brillando en la noche */
  body[data-tpl="x-bogati-n"] .bon-olas{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:5px;margin:16px auto 4px;}
  body[data-tpl="x-bogati-n"] .bon-olas span{display:block;height:11px;}
  body[data-tpl="x-bogati-n"] .bon-olas span:nth-child(1){width:132px;background:var(--bo-vainilla);border-radius:12px 22px 16px 24px;transform:translateX(-7px);box-shadow:0 0 14px rgba(245,231,201,.28);}
  body[data-tpl="x-bogati-n"] .bon-olas span:nth-child(2){width:100px;background:var(--bo-naranja);border-radius:22px 14px 24px 12px;transform:translateX(4px);box-shadow:0 0 14px rgba(232,145,45,.35);}
  body[data-tpl="x-bogati-n"] .bon-olas span:nth-child(3){width:72px;background:#5C3514;border-radius:14px 24px 12px 22px;transform:translateX(-3px);box-shadow:0 0 0 2px rgba(251,244,233,.3);}
  body[data-tpl="x-bogati-n"] .bon-meta{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}
  body[data-tpl="x-bogati-n"] .bon-meta span{
    font-weight:700;font-size:12px;color:var(--bo-vainilla);
    background:rgba(245,231,201,.1);border:1.5px solid rgba(245,231,201,.38);
    border-radius:999px;padding:6px 12px;
  }
  /* gotas de caramelo flotando en la noche */
  body[data-tpl="x-bogati-n"] .bon-gota-flot{
    position:absolute;z-index:0;background:var(--bo-naranja);
    border-radius:0 50% 50% 50%;transform:rotate(45deg);
    box-shadow:0 0 18px rgba(232,145,45,.45);
  }
  body[data-tpl="x-bogati-n"] .bon-gota-flot.g1{width:16px;height:16px;left:26px;top:calc(58px + env(safe-area-inset-top));}
  body[data-tpl="x-bogati-n"] .bon-gota-flot.g2{width:12px;height:12px;right:32px;top:40%;background:var(--bo-caramelo);box-shadow:0 0 14px rgba(185,95,6,.5);}
  body[data-tpl="x-bogati-n"] .bon-gota-flot.g3{width:9px;height:9px;left:14%;bottom:46px;background:var(--bo-vainilla);box-shadow:0 0 12px rgba(245,231,201,.4);}

  /* ---------- BORDE DE GOTEO: el hero gotea sobre la carta ---------- */
  body[data-tpl="x-bogati-n"] .bon-drips{
    display:flex;align-items:flex-start;height:36px;margin-top:-1px;
    overflow:visible;pointer-events:none;
  }
  body[data-tpl="x-bogati-n"] .bon-drips span{flex:1;background:var(--bn-noche);border-radius:0 0 999px 999px;height:10px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(1){height:15px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(2){height:24px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(3){height:11px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(4){height:28px;position:relative;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(4)::after{
    content:"";position:absolute;left:50%;bottom:-12px;transform:translateX(-50%);
    width:8px;height:11px;background:var(--bn-noche);
    border-radius:50% 50% 50% 50% / 62% 62% 38% 38%;
  }
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(5){height:17px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(6){height:22px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(7){height:12px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(8){height:26px;}
  body[data-tpl="x-bogati-n"] .bon-drips span:nth-child(9){height:16px;}

  /* ---------- NAV BLOB STICKY (estilo nocturno) ---------- */
  body[data-tpl="x-bogati-n"] .bon-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:9px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;
    background:rgba(25,12,2,.94);backdrop-filter:blur(6px);
    border-bottom:2px solid var(--bn-borde);
  }
  body[data-tpl="x-bogati-n"] .bon-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-bogati-n"] .bon-nav button{
    flex:0 0 auto;font-family:'Baloo 2',cursive;font-weight:700;font-size:13.5px;
    color:var(--bo-vainilla);background:#311906;border:2.5px solid var(--bo-caramelo);
    border-radius:18px 26px 18px 26px;padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-bogati-n"] .bon-nav button:nth-child(even){border-radius:26px 18px 26px 18px;}
  body[data-tpl="x-bogati-n"] .bon-nav button.activa{
    background:var(--bo-naranja);border-color:var(--bo-caramelo-osc);color:var(--bo-tinta);
    box-shadow:0 3px 0 var(--bo-caramelo-osc);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-bogati-n"] .bon-sec{padding:4px 16px 0;scroll-margin-top:74px;}
  body[data-tpl="x-bogati-n"] .bon-cat{
    display:flex;align-items:center;gap:9px;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:21px;color:var(--bo-vainilla);margin:22px 0 13px;
  }
  body[data-tpl="x-bogati-n"] .bon-gota{
    flex:0 0 auto;width:13px;height:13px;background:var(--bo-naranja);
    border-radius:0 50% 50% 50%;transform:rotate(45deg);
    box-shadow:0 0 10px rgba(232,145,45,.5);
  }
  /* onda blob que remata el título */
  body[data-tpl="x-bogati-n"] .bon-cat::after{
    content:"";flex:1;height:7px;border-radius:12px 22px 16px 24px;
    background:rgba(232,145,45,.16);margin-left:2px;
  }

  /* ---------- TARJETAS HORIZONTALES ---------- */
  body[data-tpl="x-bogati-n"] .bon-row{
    display:flex;gap:12px;align-items:center;
    background:var(--bn-carta);border:1.5px solid var(--bn-borde);
    border-radius:20px 26px 20px 26px;padding:11px 12px;margin-bottom:12px;
    box-shadow:0 8px 18px rgba(0,0,0,.35);
  }
  body[data-tpl="x-bogati-n"] .bon-row:nth-child(even){border-radius:26px 20px 26px 20px;}
  body[data-tpl="x-bogati-n"] .bon-media{
    flex:0 0 auto;width:74px;height:74px;border-radius:16px;overflow:hidden;
    display:flex;align-items:center;justify-content:center;font-size:33px;
    background:#2A1505;border:2px solid rgba(232,145,45,.4);
    border-top:8px solid var(--bo-caramelo);
  }
  body[data-tpl="x-bogati-n"] .bon-media img{width:100%;height:100%;object-fit:cover;}
  /* sin foto: bochas apagadas tras el emoji */
  body[data-tpl="x-bogati-n"] .bon-media.sin-foto{
    background:
      radial-gradient(circle at 30% 30%, rgba(251,244,233,.16) 0 26%, rgba(0,0,0,0) 27%),
      radial-gradient(circle at 72% 68%, rgba(232,145,45,.2) 0 22%, rgba(0,0,0,0) 23%),
      linear-gradient(160deg,#3E2109,#241103);
  }
  body[data-tpl="x-bogati-n"] .bon-body{flex:1;min-width:0;}
  body[data-tpl="x-bogati-n"] .bon-nom{font-family:'Baloo 2',cursive;font-weight:700;font-size:15.5px;line-height:1.22;color:var(--bo-crema);}
  body[data-tpl="x-bogati-n"] .bon-desc{
    font-weight:600;font-size:12.5px;color:rgba(245,231,201,.68);line-height:1.38;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-bogati-n"] .bon-der{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
  body[data-tpl="x-bogati-n"] .bon-precio{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:14.5px;
    color:var(--bo-tinta);background:var(--bo-naranja);border-radius:999px;padding:5px 12px;
    white-space:nowrap;box-shadow:0 3px 10px rgba(232,145,45,.28);
  }
  body[data-tpl="x-bogati-n"] .bon-step{display:flex;align-items:center;gap:6px;}

  /* steppers */
  body[data-tpl="x-bogati-n"] .bon-step [data-qtywrap]{display:none;align-items:center;gap:6px;}
  body[data-tpl="x-bogati-n"] .bon-step [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-bogati-n"] [data-add]{
    width:37px;height:37px;border-radius:50%;border:2.5px solid var(--bo-caramelo-osc);cursor:pointer;
    background:var(--bo-naranja);color:var(--bo-tinta);font-size:20px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 3px 0 var(--bo-caramelo-osc), 0 0 16px rgba(232,145,45,.3);
  }
  body[data-tpl="x-bogati-n"] [data-add]:active{transform:translateY(2px);box-shadow:0 1px 0 var(--bo-caramelo-osc);}
  body[data-tpl="x-bogati-n"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:2px solid rgba(245,231,201,.55);
    background:transparent;color:var(--bo-vainilla);font-size:17px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-bogati-n"] [data-cant]{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:15px;
    color:var(--bo-crema);min-width:18px;text-align:center;
  }

  body[data-tpl="x-bogati-n"] .bon-fin{
    text-align:center;padding:30px 0 8px;font-family:'Baloo 2',cursive;
    font-weight:700;font-size:15px;color:var(--bo-naranja);
  }

  /* carrito */
  body[data-tpl="x-bogati-n"] #cart-fab{
    background:var(--bo-naranja) !important;color:var(--bo-tinta) !important;
    border:3px solid var(--bo-caramelo-osc) !important;border-radius:999px !important;
    font-family:'Baloo 2',cursive !important;font-weight:800 !important;
    box-shadow:0 5px 0 var(--bo-caramelo-osc), 0 16px 34px rgba(0,0,0,.5) !important;
  }
  body[data-tpl="x-bogati-n"] #cart-fab #fab-cant{background:var(--bo-choco) !important;color:var(--bo-crema) !important;}
  body[data-tpl="x-bogati-n"] #cart h2{font-family:'Baloo 2',cursive;font-weight:800;color:var(--bo-choco);}
  body[data-tpl="x-bogati-n"] #cart .cart-row .st-add{background:var(--bo-caramelo) !important;color:#fff !important;}
  /* la hoja del carrito es clara: devolver tinta oscura al stepper ahí */
  body[data-tpl="x-bogati-n"] #cart [data-cant]{color:var(--bo-choco);}
  body[data-tpl="x-bogati-n"] #cart [data-sub]{color:var(--bo-caramelo-osc);border-color:var(--bo-caramelo);}

  @media(max-width:380px){
    body[data-tpl="x-bogati-n"] .bon-tit{font-size:42px;}
    body[data-tpl="x-bogati-n"] .bon-logo{width:84px;height:84px;}
    body[data-tpl="x-bogati-n"] .bon-media{width:64px;height:64px;font-size:29px;border-top-width:7px;}
    body[data-tpl="x-bogati-n"] .bon-cat{font-size:19px;}
    body[data-tpl="x-bogati-n"] .bon-gota-flot.g1{width:13px;height:13px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍦"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="bon-row">
        <div class="bon-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="bon-body">
          <div class="bon-nom">${it.nombre}</div>
          ${it.desc ? `<div class="bon-desc">${it.desc}</div>` : ``}
        </div>
        <div class="bon-der">
          <span class="bon-precio">$${Number(it.precio).toFixed(2)}</span>
          <span class="bon-step">${ctrl(it.id)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="bon-sec" id="cat-${slug(c.categoria)}">
        <h2 class="bon-cat"><span class="bon-gota"></span>${c.categoria}</h2>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || ""]).filter(Boolean);
    const drips = Array.from({ length: 9 }, () => "<span></span>").join("");

    root.innerHTML = `
      <header class="bon-hero">
        <span class="bon-gota-flot g1"></span><span class="bon-gota-flot g2"></span><span class="bon-gota-flot g3"></span>
        ${R.logo ? `<div class="bon-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="bon-tit">${R.nombre}</h1>
        <div class="bon-chip">${(R.slogan || "Helados con Queso").toUpperCase()}</div>
        <div class="bon-olas" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="bon-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      </header>
      <div class="bon-drips" aria-hidden="true">${drips}</div>
      <nav class="bon-nav">${nav}</nav>
      ${secciones}
      <div class="bon-fin">🌙 ${R.nombre} · ${R.slogan || "Helados con Queso"}</div>`;

    const botones = [...root.querySelectorAll(".bon-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".bon-sec").forEach((s) => io.observe(s));
    }
  },
};
