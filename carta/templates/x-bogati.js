/* x-bogati — "Crema derretida" — plantilla EXCLUSIVA de Bogati.
   Heladería artesanal de helados con queso: header chocolate que GOTEA
   sobre el fondo crema, las 3 ondas del logo como franjas blob,
   bochas de helado como miniaturas y pills naranja redondísimas. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-bogati"] = {
  label: "Crema derretida",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@500;600;700;800&display=swap');

  body[data-tpl="x-bogati"]{
    --bo-choco:#4A2A0C; --bo-marca:#653B0E; --bo-tinta:#3A2408;
    --bo-crema:#FBF4E9; --bo-vainilla:#F5E7C9;
    --bo-naranja:#E8912D; --bo-caramelo:#B95F06; --bo-caramelo-osc:#8A4504;
    background:var(--bo-crema); color:var(--bo-tinta);
    font-family:'Nunito',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-bogati"] #app{overflow-x:hidden;}

  /* ---------- HEADER CHOCOLATE ---------- */
  body[data-tpl="x-bogati"] .bo-head{
    background:var(--bo-choco);text-align:center;
    padding:calc(22px + env(safe-area-inset-top)) 18px 10px;
  }
  body[data-tpl="x-bogati"] .bo-logo{
    width:86px;height:86px;margin:0 auto 10px;border-radius:50%;overflow:hidden;
    background:var(--bo-crema);border:4px solid var(--bo-vainilla);
    box-shadow:0 8px 18px rgba(0,0,0,.3);
  }
  body[data-tpl="x-bogati"] .bo-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bogati"] .bo-tit{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:38px;line-height:1;
    color:var(--bo-crema);letter-spacing:.01em;
  }
  body[data-tpl="x-bogati"] .bo-chip{
    display:inline-block;margin-top:9px;background:var(--bo-naranja);color:var(--bo-tinta);
    font-weight:800;font-size:11px;letter-spacing:.18em;text-transform:uppercase;
    border-radius:999px;padding:7px 16px;box-shadow:0 4px 10px rgba(0,0,0,.25);
  }

  /* las 3 ondas del logo como franjas blob */
  body[data-tpl="x-bogati"] .bo-olas{display:flex;flex-direction:column;align-items:center;gap:5px;margin:14px auto 4px;}
  body[data-tpl="x-bogati"] .bo-olas span{display:block;height:11px;}
  body[data-tpl="x-bogati"] .bo-olas span:nth-child(1){width:132px;background:var(--bo-vainilla);border-radius:12px 22px 16px 24px;transform:translateX(-7px);}
  body[data-tpl="x-bogati"] .bo-olas span:nth-child(2){width:100px;background:var(--bo-naranja);border-radius:22px 14px 24px 12px;transform:translateX(4px);}
  body[data-tpl="x-bogati"] .bo-olas span:nth-child(3){width:72px;background:#5C3514;border-radius:14px 24px 12px 22px;transform:translateX(-3px);box-shadow:0 0 0 2px rgba(251,244,233,.3);}

  body[data-tpl="x-bogati"] .bo-meta{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;padding:12px 0 4px;}
  body[data-tpl="x-bogati"] .bo-meta span{
    font-weight:700;font-size:12px;color:var(--bo-crema);
    background:rgba(251,244,233,.12);border:1.5px solid rgba(251,244,233,.4);
    border-radius:999px;padding:6px 12px;
  }

  /* ---------- BORDE DE GOTEO ---------- */
  body[data-tpl="x-bogati"] .bo-drips{
    display:flex;align-items:flex-start;height:42px;margin-top:-1px;
    overflow:visible;pointer-events:none;
  }
  body[data-tpl="x-bogati"] .bo-drips span{flex:1;background:var(--bo-choco);border-radius:0 0 999px 999px;height:12px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(1){height:17px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(2){height:27px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(3){height:13px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(4){height:32px;position:relative;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(4)::after{
    content:"";position:absolute;left:50%;bottom:-13px;transform:translateX(-50%);
    width:9px;height:12px;background:var(--bo-choco);
    border-radius:50% 50% 50% 50% / 62% 62% 38% 38%;
  }
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(5){height:19px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(6){height:25px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(7){height:14px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(8){height:29px;}
  body[data-tpl="x-bogati"] .bo-drips span:nth-child(9){height:18px;}

  /* ---------- NAV BLOB ---------- */
  body[data-tpl="x-bogati"] .bo-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:9px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;
    background:rgba(251,244,233,.95);backdrop-filter:blur(6px);
  }
  body[data-tpl="x-bogati"] .bo-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-bogati"] .bo-nav button{
    flex:0 0 auto;font-family:'Baloo 2',cursive;font-weight:700;font-size:13.5px;
    color:var(--bo-marca);background:#fff;border:2.5px solid var(--bo-marca);
    border-radius:18px 26px 18px 26px;padding:8px 15px;cursor:pointer;white-space:nowrap;
    box-shadow:0 3px 8px rgba(101,59,14,.14);
  }
  body[data-tpl="x-bogati"] .bo-nav button:nth-child(even){border-radius:26px 18px 26px 18px;}
  body[data-tpl="x-bogati"] .bo-nav button.activa{
    background:var(--bo-choco);border-color:var(--bo-choco);color:var(--bo-crema);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-bogati"] .bo-sec{padding:6px 16px 0;scroll-margin-top:72px;}
  body[data-tpl="x-bogati"] .bo-cat{
    display:flex;align-items:center;gap:9px;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:21px;color:var(--bo-choco);margin:20px 0 13px;
  }
  body[data-tpl="x-bogati"] .bo-gota{
    flex:0 0 auto;width:13px;height:13px;background:var(--bo-naranja);
    border-radius:0 50% 50% 50%;transform:rotate(45deg);
    box-shadow:0 2px 5px rgba(184,94,6,.4);
  }

  /* ---------- TARJETAS ---------- */
  body[data-tpl="x-bogati"] .bo-card{
    display:flex;gap:13px;align-items:center;background:#fff;
    border-radius:26px;padding:13px;margin-bottom:13px;
    box-shadow:0 8px 20px rgba(101,59,14,.12);
  }
  body[data-tpl="x-bogati"] .bo-bocha{
    flex:0 0 auto;width:58px;height:58px;border-radius:50%;overflow:hidden;
    background:var(--bo-vainilla);border:3px solid var(--bo-marca);border-top-width:9px;
    display:flex;align-items:center;justify-content:center;font-size:26px;
  }
  body[data-tpl="x-bogati"] .bo-bocha img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-bogati"] .bo-body{flex:1;min-width:0;}
  body[data-tpl="x-bogati"] .bo-nom{font-family:'Baloo 2',cursive;font-weight:700;font-size:15.5px;line-height:1.22;color:var(--bo-marca);}
  body[data-tpl="x-bogati"] .bo-desc{
    font-weight:600;font-size:12.5px;color:#6E5B44;line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-bogati"] .bo-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="x-bogati"] .bo-precio{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:15px;color:#fff;
    background:var(--bo-caramelo);border-radius:999px;padding:6px 15px;white-space:nowrap;
    box-shadow:0 4px 10px rgba(185,95,6,.35);
  }

  /* steppers */
  body[data-tpl="x-bogati"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-bogati"] [data-add]{
    width:38px;height:38px;border-radius:50%;border:2.5px solid var(--bo-caramelo-osc);cursor:pointer;
    background:var(--bo-caramelo);color:#fff;font-size:21px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 var(--bo-caramelo-osc);
  }
  body[data-tpl="x-bogati"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--bo-caramelo-osc);}
  body[data-tpl="x-bogati"] [data-sub]{
    width:32px;height:32px;border-radius:50%;border:2.5px solid var(--bo-caramelo);
    background:#fff;color:var(--bo-caramelo);font-size:18px;font-weight:800;line-height:1;
    display:none;align-items:center;justify-content:center;cursor:pointer;
    box-shadow:0 3px 8px rgba(185,95,6,.22);
  }
  body[data-tpl="x-bogati"] [data-cant]{
    display:none;font-family:'Baloo 2',cursive;font-weight:800;font-size:15px;
    color:var(--bo-choco);min-width:18px;text-align:center;
  }
  body[data-tpl="x-bogati"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-bogati"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-bogati"] .bo-fin{
    text-align:center;padding:28px 0 10px;font-family:'Baloo 2',cursive;
    font-weight:700;font-size:15px;color:var(--bo-marca);
  }

  /* carrito */
  body[data-tpl="x-bogati"] #cart-fab{
    background:var(--bo-choco) !important;color:var(--bo-crema) !important;
    border:3px solid #2E1905 !important;border-radius:999px !important;
    font-family:'Baloo 2',cursive !important;font-weight:800 !important;
    box-shadow:0 6px 0 #2E1905, 0 16px 30px rgba(74,42,12,.35) !important;
  }
  body[data-tpl="x-bogati"] #cart-fab #fab-cant{background:var(--bo-naranja) !important;color:var(--bo-tinta) !important;}
  body[data-tpl="x-bogati"] #cart h2{font-family:'Baloo 2',cursive;font-weight:800;color:var(--bo-choco);}
  body[data-tpl="x-bogati"] #cart .cart-row .st-add{background:var(--bo-caramelo) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-bogati"] .bo-tit{font-size:31px;}
    body[data-tpl="x-bogati"] .bo-logo{width:72px;height:72px;}
    body[data-tpl="x-bogati"] .bo-cat{font-size:19px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍦"));
    const cats = R.menu || [];

    const card = (it, cat) => `
      <article class="bo-card">
        <div class="bo-bocha" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="bo-body">
          <div class="bo-nom">${it.nombre}</div>
          ${it.desc ? `<div class="bo-desc">${it.desc}</div>` : ``}
          <div class="bo-foot"><span class="bo-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="bo-sec" id="cat-${slug(c.categoria)}">
        <h2 class="bo-cat"><span class="bo-gota"></span>${c.categoria}</h2>
        ${(c.items || []).map((it) => card(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || ""]).filter(Boolean);
    const drips = Array.from({ length: 9 }, () => "<span></span>").join("");

    root.innerHTML = `
      <header class="bo-head">
        ${R.logo ? `<div class="bo-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="bo-tit">${R.nombre}</h1>
        <div class="bo-chip">${(R.slogan || "Helados con Queso").toUpperCase()}</div>
        <div class="bo-olas"><span></span><span></span><span></span></div>
        <div class="bo-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      </header>
      <div class="bo-drips" aria-hidden="true">${drips}</div>
      <nav class="bo-nav">${nav}</nav>
      ${secciones}
      <div class="bo-fin">🍦 ${R.nombre} · ${R.slogan || "Helados con Queso"}</div>`;

    const botones = [...root.querySelectorAll(".bo-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".bo-sec").forEach((s) => io.observe(s));
    }
  },
};
