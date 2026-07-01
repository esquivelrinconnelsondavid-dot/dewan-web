/* x-corcel — "Vía Rápida" — plantilla EXCLUSIVA de Corcel Negro (comida rápida).
   Negro y amarillo del logo con franjas de velocidad: tarjetas negras sobre
   amarillo, bloques inclinados y energía de fast food callejero. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-corcel"] = {
  label: "Vía Rápida",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:wght@500;600;700;800&display=swap');

  body[data-tpl="x-corcel"]{
    --cn-negro:#0F0D08; --cn-amarillo:#FECB00; --cn-sombra:#8A6E00;
    background:var(--cn-amarillo); color:var(--cn-negro);
    font-family:'Barlow Condensed',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-corcel"] #app{overflow-x:hidden;}

  /* ---------- CABECERA NEGRA ---------- */
  body[data-tpl="x-corcel"] .cn-top{
    background:var(--cn-negro); color:#fff; padding:calc(22px + env(safe-area-inset-top)) 20px 22px;
    border-radius:0 0 26px 26px; position:relative;
  }
  body[data-tpl="x-corcel"] .cn-row{display:flex;align-items:center;gap:15px;}
  body[data-tpl="x-corcel"] .cn-logo{
    flex:0 0 auto;width:82px;height:82px;border-radius:16px;overflow:hidden;
    border:3px solid var(--cn-amarillo);transform:rotate(-3deg);
    box-shadow:6px 6px 0 rgba(254,203,0,.35);
  }
  body[data-tpl="x-corcel"] .cn-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-corcel"] .cn-tit{
    font-family:'Archivo Black',sans-serif;font-size:29px;line-height:.98;color:var(--cn-amarillo);
    text-transform:uppercase;transform:skewX(-6deg);letter-spacing:.01em;
  }
  body[data-tpl="x-corcel"] .cn-sub{
    font-weight:700;font-size:13px;letter-spacing:.42em;text-transform:uppercase;color:#fff;
    margin-top:7px;
  }
  body[data-tpl="x-corcel"] .cn-meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px;}
  body[data-tpl="x-corcel"] .cn-meta span{
    font-weight:600;font-size:13px;letter-spacing:.03em;color:var(--cn-amarillo);
    border:1.5px solid rgba(254,203,0,.55);border-radius:6px;padding:5px 11px;transform:skewX(-6deg);
  }
  body[data-tpl="x-corcel"] .cn-hazard{
    height:11px;margin-top:18px;border-radius:99px;
    background:repeating-linear-gradient(45deg, var(--cn-amarillo) 0 13px, var(--cn-negro) 13px 26px);
    border:2px solid var(--cn-negro);
  }

  /* ---------- NAV VELOCIDAD ---------- */
  body[data-tpl="x-corcel"] .cn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;background:rgba(254,203,0,.95);backdrop-filter:blur(6px);
    border-bottom:3px solid var(--cn-negro);
  }
  body[data-tpl="x-corcel"] .cn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-corcel"] .cn-nav button{
    flex:0 0 auto;font-family:'Barlow Condensed';font-weight:700;font-size:14.5px;letter-spacing:.05em;
    text-transform:uppercase;color:var(--cn-amarillo);background:var(--cn-negro);border:none;border-radius:5px;
    padding:9px 15px;cursor:pointer;white-space:nowrap;transform:skewX(-8deg);
    box-shadow:3px 3px 0 rgba(15,13,8,.25);
  }
  body[data-tpl="x-corcel"] .cn-nav button span{display:inline-block;transform:skewX(8deg);}
  body[data-tpl="x-corcel"] .cn-nav button.activa{background:#fff;color:var(--cn-negro);box-shadow:3px 3px 0 var(--cn-negro);}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-corcel"] .cn-sec{padding:4px 16px 0;scroll-margin-top:72px;}
  body[data-tpl="x-corcel"] .cn-cat{
    display:inline-block;font-family:'Archivo Black',sans-serif;font-size:16.5px;text-transform:uppercase;
    color:var(--cn-amarillo);background:var(--cn-negro);padding:8px 16px;border-radius:6px;
    transform:skewX(-8deg);margin:20px 0 14px;box-shadow:4px 4px 0 rgba(15,13,8,.22);
  }
  body[data-tpl="x-corcel"] .cn-cat span{display:inline-block;transform:skewX(8deg);}

  /* ---------- TARJETAS NEGRAS ---------- */
  body[data-tpl="x-corcel"] .cn-card{
    position:relative;display:flex;gap:13px;align-items:center;
    background:var(--cn-negro);border-radius:14px;padding:13px;margin-bottom:13px;
    box-shadow:0 6px 0 var(--cn-sombra);overflow:hidden;
  }
  body[data-tpl="x-corcel"] .cn-card::after{
    content:"";position:absolute;top:12px;right:-14px;width:52px;height:22px;
    background:repeating-linear-gradient(90deg, rgba(254,203,0,.5) 0 12px, transparent 12px 20px);
    transform:skewX(-30deg);pointer-events:none;
  }
  body[data-tpl="x-corcel"] .cn-media{
    flex:0 0 auto;width:58px;height:58px;border-radius:11px;overflow:hidden;position:relative;
    background:#1F1B10;border:2px solid rgba(254,203,0,.7);
    display:flex;align-items:center;justify-content:center;font-size:26px;
  }
  body[data-tpl="x-corcel"] .cn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-corcel"] .cn-body{flex:1;min-width:0;}
  body[data-tpl="x-corcel"] .cn-nom{
    font-weight:800;font-size:17.5px;line-height:1.05;letter-spacing:.02em;text-transform:uppercase;color:#fff;
  }
  body[data-tpl="x-corcel"] .cn-desc{font-weight:500;font-size:13px;color:#C9C4B0;line-height:1.3;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-corcel"] .cn-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="x-corcel"] .cn-precio{
    font-family:'Archivo Black',sans-serif;font-size:14.5px;color:var(--cn-negro);
    background:var(--cn-amarillo);padding:5px 12px;border-radius:4px;transform:skewX(-8deg);
    white-space:nowrap;box-shadow:3px 3px 0 rgba(254,203,0,.3);
  }
  body[data-tpl="x-corcel"] .cn-precio span{display:inline-block;transform:skewX(8deg);}

  /* steppers */
  body[data-tpl="x-corcel"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-corcel"] [data-add]{
    width:36px;height:36px;border-radius:7px;border:none;cursor:pointer;
    background:var(--cn-amarillo);color:var(--cn-negro);font-size:21px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 var(--cn-sombra);
  }
  body[data-tpl="x-corcel"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--cn-sombra);}
  body[data-tpl="x-corcel"] [data-sub]{
    width:32px;height:32px;border-radius:7px;border:2px solid rgba(254,203,0,.6);background:transparent;color:var(--cn-amarillo);
    font-size:18px;font-weight:800;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-corcel"] [data-cant]{display:none;font-family:'Archivo Black';font-size:14.5px;color:#fff;min-width:18px;text-align:center;}
  body[data-tpl="x-corcel"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-corcel"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-corcel"] .cn-fin{
    text-align:center;padding:26px 0 10px;font-family:'Archivo Black',sans-serif;font-size:13px;
    letter-spacing:.18em;text-transform:uppercase;color:var(--cn-negro);
  }

  /* carrito */
  body[data-tpl="x-corcel"] #cart-fab{
    background:var(--cn-negro) !important;color:var(--cn-amarillo) !important;border-radius:10px !important;
    font-family:'Barlow Condensed' !important;font-weight:800 !important;font-size:17px !important;
    letter-spacing:.04em;text-transform:uppercase;
    box-shadow:0 6px 0 var(--cn-sombra), 0 16px 30px rgba(15,13,8,.35) !important;
  }
  body[data-tpl="x-corcel"] #cart-fab #fab-cant{background:var(--cn-amarillo) !important;color:var(--cn-negro) !important;}
  body[data-tpl="x-corcel"] #cart h2{font-family:'Archivo Black',sans-serif;text-transform:uppercase;font-size:17px;}
  body[data-tpl="x-corcel"] #cart .cart-row .st-add{background:var(--cn-amarillo) !important;color:var(--cn-negro) !important;}

  @media(max-width:380px){
    body[data-tpl="x-corcel"] .cn-tit{font-size:24px;}
    body[data-tpl="x-corcel"] .cn-logo{width:70px;height:70px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    const card = (it, cat) => `
      <article class="cn-card">
        <div class="cn-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="cn-body">
          <div class="cn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="cn-desc">${it.desc}</div>` : ``}
          <div class="cn-foot"><span class="cn-precio"><span>$${Number(it.precio).toFixed(2)}</span></span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="cn-sec" id="cat-${slug(c.categoria)}">
        <div class="cn-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => card(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}"><span>${c.categoria}</span></button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || ""]).filter(Boolean);

    root.innerHTML = `
      <header class="cn-top">
        <div class="cn-row">
          ${R.logo ? `<div class="cn-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
          <div>
            <h1 class="cn-tit">${R.nombre}</h1>
            <div class="cn-sub">Comida rápida</div>
          </div>
        </div>
        <div class="cn-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
        <div class="cn-hazard"></div>
      </header>
      <nav class="cn-nav">${nav}</nav>
      ${secciones}
      <div class="cn-fin">🐎 Corcel Negro · Al galope</div>`;

    const botones = [...root.querySelectorAll(".cn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-78px 0px -75% 0px" });
      root.querySelectorAll(".cn-sec").forEach((s) => io.observe(s));
    }
  },
};
