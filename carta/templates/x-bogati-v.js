/* x-bogati-v — "Vitrina Bogati" — plantilla EXCLUSIVA de Bogati.
   Variante VITRINA de "Crema derretida": barra chocolate compacta con las
   3 ondas del logo, el goteo cayendo sobre el fondo crema y un grid de
   2 columnas de tiles blancos. Cada media cuadrada viene "bañada" en
   chocolate que gotea desde arriba; los platos sin foto llevan bochas
   sugeridas + las mini olas del logo, y el stepper caramelo flota sobre
   la esquina de la media. Mismo vocabulario: blobs, gotas y píldoras. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-bogati-v"] = {
  label: "Vitrina Bogati",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@500;600;700;800&display=swap');

  body[data-tpl="x-bogati-v"]{
    --bo-choco:#4A2A0C; --bo-marca:#653B0E; --bo-tinta:#3A2408;
    --bo-crema:#FBF4E9; --bo-vainilla:#F5E7C9;
    --bo-naranja:#E8912D; --bo-caramelo:#B95F06; --bo-caramelo-osc:#8A4504;
    background:var(--bo-crema); color:var(--bo-tinta);
    font-family:'Nunito',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-bogati-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA CHOCOLATE COMPACTA ---------- */
  body[data-tpl="x-bogati-v"] .bov-top{
    display:flex;align-items:center;gap:11px;background:var(--bo-choco);
    padding:calc(10px + env(safe-area-inset-top)) 16px 12px;
  }
  body[data-tpl="x-bogati-v"] .bov-logo{
    flex:0 0 auto;width:46px;height:46px;border-radius:50%;overflow:hidden;
    background:var(--bo-crema);border:3px solid var(--bo-vainilla);
    box-shadow:0 4px 10px rgba(0,0,0,.3);
  }
  body[data-tpl="x-bogati-v"] .bov-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bogati-v"] .bov-tit{flex:1;min-width:0;}
  body[data-tpl="x-bogati-v"] .bov-nombre{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:21px;line-height:1.05;
    color:var(--bo-crema);letter-spacing:.01em;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-bogati-v"] .bov-linea{
    font-weight:700;font-size:11.5px;color:rgba(251,244,233,.82);margin-top:2px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  /* las 3 ondas del logo, en miniatura, al final de la barra */
  body[data-tpl="x-bogati-v"] .bov-olas{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:3px;}
  body[data-tpl="x-bogati-v"] .bov-olas span{display:block;height:6px;}
  body[data-tpl="x-bogati-v"] .bov-olas span:nth-child(1){width:38px;background:var(--bo-vainilla);border-radius:6px 12px 8px 13px;transform:translateX(-3px);}
  body[data-tpl="x-bogati-v"] .bov-olas span:nth-child(2){width:29px;background:var(--bo-naranja);border-radius:12px 7px 13px 6px;transform:translateX(2px);}
  body[data-tpl="x-bogati-v"] .bov-olas span:nth-child(3){width:20px;background:#5C3514;border-radius:7px 13px 6px 12px;transform:translateX(-1px);box-shadow:0 0 0 1.5px rgba(251,244,233,.3);}

  /* ---------- BORDE DE GOTEO (versión corta) ---------- */
  body[data-tpl="x-bogati-v"] .bov-drips{
    display:flex;align-items:flex-start;height:30px;margin-top:-1px;
    overflow:visible;pointer-events:none;
  }
  body[data-tpl="x-bogati-v"] .bov-drips span{flex:1;background:var(--bo-choco);border-radius:0 0 999px 999px;height:8px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(1){height:12px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(2){height:19px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(3){height:9px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(4){height:23px;position:relative;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(4)::after{
    content:"";position:absolute;left:50%;bottom:-10px;transform:translateX(-50%);
    width:7px;height:9px;background:var(--bo-choco);
    border-radius:50% 50% 50% 50% / 62% 62% 38% 38%;
  }
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(5){height:14px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(6){height:18px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(7){height:10px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(8){height:21px;}
  body[data-tpl="x-bogati-v"] .bov-drips span:nth-child(9){height:13px;}

  /* ---------- NAV BLOB STICKY ---------- */
  body[data-tpl="x-bogati-v"] .bov-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:9px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;
    background:rgba(251,244,233,.96);backdrop-filter:blur(6px);
    border-bottom:2px solid rgba(101,59,14,.14);
  }
  body[data-tpl="x-bogati-v"] .bov-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-bogati-v"] .bov-nav button{
    flex:0 0 auto;font-family:'Baloo 2',cursive;font-weight:700;font-size:13.5px;
    color:var(--bo-marca);background:#fff;border:2.5px solid var(--bo-marca);
    border-radius:18px 26px 18px 26px;padding:8px 15px;cursor:pointer;white-space:nowrap;
    box-shadow:0 3px 8px rgba(101,59,14,.14);
  }
  body[data-tpl="x-bogati-v"] .bov-nav button:nth-child(even){border-radius:26px 18px 26px 18px;}
  body[data-tpl="x-bogati-v"] .bov-nav button.activa{
    background:var(--bo-choco);border-color:var(--bo-choco);color:var(--bo-crema);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-bogati-v"] .bov-sec{padding:2px 14px 0;scroll-margin-top:66px;}
  body[data-tpl="x-bogati-v"] .bov-cat{
    display:flex;align-items:center;gap:9px;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:20px;color:var(--bo-choco);margin:20px 2px 13px;
  }
  body[data-tpl="x-bogati-v"] .bov-gota{
    flex:0 0 auto;width:13px;height:13px;background:var(--bo-naranja);
    border-radius:0 50% 50% 50%;transform:rotate(45deg);
    box-shadow:0 2px 5px rgba(184,94,6,.4);
  }

  /* ---------- GRID VITRINA 2 COLUMNAS ---------- */
  body[data-tpl="x-bogati-v"] .bov-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px 12px;}
  body[data-tpl="x-bogati-v"] .bov-tile{
    background:#fff;border-radius:20px 26px 20px 26px;
    box-shadow:0 8px 20px rgba(101,59,14,.14);
  }
  body[data-tpl="x-bogati-v"] .bov-grid .bov-tile:nth-child(even){border-radius:26px 20px 26px 20px;}
  body[data-tpl="x-bogati-v"] .bov-mediaw{position:relative;}
  body[data-tpl="x-bogati-v"] .bov-media{
    position:relative;aspect-ratio:1/1;border-radius:20px 26px 0 0;overflow:hidden;
    background:var(--bo-vainilla);
    display:flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-bogati-v"] .bov-grid .bov-tile:nth-child(even) .bov-media{border-radius:26px 20px 0 0;}
  body[data-tpl="x-bogati-v"] .bov-media img{width:100%;height:100%;object-fit:cover;}
  /* baño de chocolate que gotea desde arriba (foto o no) */
  body[data-tpl="x-bogati-v"] .bov-media::before{
    content:"";position:absolute;top:-1px;left:0;right:0;height:24px;z-index:2;pointer-events:none;
    background:
      radial-gradient(circle at 8% 9px, var(--bo-choco) 0 6px, rgba(0,0,0,0) 6.5px),
      radial-gradient(circle at 26% 13px, var(--bo-choco) 0 7px, rgba(0,0,0,0) 7.5px),
      radial-gradient(circle at 47% 8px, var(--bo-choco) 0 5px, rgba(0,0,0,0) 5.5px),
      radial-gradient(circle at 68% 14px, var(--bo-choco) 0 7px, rgba(0,0,0,0) 7.5px),
      radial-gradient(circle at 88% 10px, var(--bo-choco) 0 6px, rgba(0,0,0,0) 6.5px),
      linear-gradient(var(--bo-choco), var(--bo-choco)) 0 0/100% 7px no-repeat;
  }
  /* sin foto: bochas de helado sugeridas de fondo + emoji grande */
  body[data-tpl="x-bogati-v"] .bov-media.sin-foto{
    font-size:50px;
    background:
      radial-gradient(circle at 27% 32%, #fff 0 21%, rgba(0,0,0,0) 22%),
      radial-gradient(circle at 73% 26%, rgba(232,145,45,.3) 0 17%, rgba(0,0,0,0) 18%),
      radial-gradient(circle at 60% 74%, rgba(101,59,14,.14) 0 23%, rgba(0,0,0,0) 24%),
      var(--bo-vainilla);
  }
  body[data-tpl="x-bogati-v"] .bov-emo{position:relative;z-index:1;filter:drop-shadow(0 4px 6px rgba(74,42,12,.28));}
  /* mini olas del logo al pie de la media sin foto */
  body[data-tpl="x-bogati-v"] .bov-miniolas{
    position:absolute;left:50%;bottom:10px;transform:translateX(-50%);
    display:flex;flex-direction:column;align-items:center;gap:4px;z-index:1;
  }
  body[data-tpl="x-bogati-v"] .bov-miniolas i{display:block;height:7px;}
  body[data-tpl="x-bogati-v"] .bov-miniolas i:nth-child(1){width:58px;background:#fff;border-radius:8px 14px 10px 16px;transform:translateX(-4px);}
  body[data-tpl="x-bogati-v"] .bov-miniolas i:nth-child(2){width:44px;background:var(--bo-naranja);border-radius:14px 9px 16px 8px;transform:translateX(3px);}
  body[data-tpl="x-bogati-v"] .bov-miniolas i:nth-child(3){width:31px;background:#5C3514;border-radius:9px 16px 8px 14px;transform:translateX(-2px);}

  /* stepper caramelo flotando sobre la esquina de la media */
  body[data-tpl="x-bogati-v"] .bov-ctrl{
    position:absolute;right:8px;bottom:-16px;z-index:3;
    display:flex;align-items:center;gap:5px;
  }
  body[data-tpl="x-bogati-v"] .bov-ctrl [data-qtywrap]{
    display:none;align-items:center;gap:3px;
    background:var(--bo-crema);border:2px solid var(--bo-caramelo);border-radius:999px;
    padding:2px 8px 2px 4px;box-shadow:0 3px 0 rgba(138,69,4,.4);
  }
  body[data-tpl="x-bogati-v"] .bov-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-bogati-v"] [data-add]{
    width:38px;height:38px;border-radius:50%;border:2.5px solid var(--bo-caramelo-osc);cursor:pointer;
    background:var(--bo-caramelo);color:#fff;font-size:20px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 3px 0 var(--bo-caramelo-osc);
  }
  body[data-tpl="x-bogati-v"] [data-add]:active{transform:translateY(2px);box-shadow:0 1px 0 var(--bo-caramelo-osc);}
  body[data-tpl="x-bogati-v"] [data-sub]{
    width:27px;height:27px;border-radius:50%;border:none;background:transparent;
    color:var(--bo-caramelo-osc);font-size:17px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-bogati-v"] [data-cant]{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:14px;
    color:var(--bo-choco);min-width:16px;text-align:center;
  }

  /* cuerpo del tile */
  body[data-tpl="x-bogati-v"] .bov-body{padding:18px 11px 12px;}
  body[data-tpl="x-bogati-v"] .bov-nom{
    font-family:'Baloo 2',cursive;font-weight:700;font-size:14px;line-height:1.22;color:var(--bo-marca);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:34px;
  }
  body[data-tpl="x-bogati-v"] .bov-foot{margin-top:8px;}
  body[data-tpl="x-bogati-v"] .bov-precio{
    display:inline-block;font-family:'Baloo 2',cursive;font-weight:800;font-size:14px;
    color:#fff;background:var(--bo-caramelo-osc);border-radius:999px;padding:5px 12px;white-space:nowrap;
    box-shadow:0 3px 8px rgba(138,69,4,.28);
  }

  body[data-tpl="x-bogati-v"] .bov-fin{
    text-align:center;padding:28px 16px 8px;font-family:'Baloo 2',cursive;
    font-weight:700;font-size:15px;color:var(--bo-marca);
  }

  /* carrito */
  body[data-tpl="x-bogati-v"] #cart-fab{
    background:var(--bo-choco) !important;color:var(--bo-crema) !important;
    border:3px solid #2E1905 !important;border-radius:999px !important;
    font-family:'Baloo 2',cursive !important;font-weight:800 !important;
    box-shadow:0 6px 0 #2E1905, 0 16px 30px rgba(74,42,12,.35) !important;
  }
  body[data-tpl="x-bogati-v"] #cart-fab #fab-cant{background:var(--bo-naranja) !important;color:var(--bo-tinta) !important;}
  body[data-tpl="x-bogati-v"] #cart h2{font-family:'Baloo 2',cursive;font-weight:800;color:var(--bo-choco);}
  body[data-tpl="x-bogati-v"] #cart .cart-row .st-add{background:var(--bo-caramelo) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-bogati-v"] .bov-nombre{font-size:18px;}
    body[data-tpl="x-bogati-v"] .bov-grid{gap:20px 10px;}
    body[data-tpl="x-bogati-v"] .bov-media.sin-foto{font-size:42px;}
    body[data-tpl="x-bogati-v"] .bov-nom{font-size:13px;min-height:32px;}
    body[data-tpl="x-bogati-v"] .bov-precio{font-size:13px;padding:4px 10px;}
    body[data-tpl="x-bogati-v"] .bov-cat{font-size:18px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍦"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="bov-tile">
        <div class="bov-mediaw">
          <div class="bov-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : `<span class="bov-emo">${emo(it, cat)}</span><span class="bov-miniolas" aria-hidden="true"><i></i><i></i><i></i></span>`}</div>
          <div class="bov-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="bov-body">
          <div class="bov-nom">${it.nombre}</div>
          <div class="bov-foot"><span class="bov-precio">$${Number(it.precio).toFixed(2)}</span></div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="bov-sec" id="cat-${slug(c.categoria)}">
        <h2 class="bov-cat"><span class="bov-gota"></span>${c.categoria}</h2>
        <div class="bov-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const linea = [R.promo || "", R.direccion ? `📍 ${R.direccion.split("·")[0].trim()}` : ""].filter(Boolean).join("  ·  ");
    const drips = Array.from({ length: 9 }, () => "<span></span>").join("");

    root.innerHTML = `
      <header class="bov-top">
        ${R.logo ? `<div class="bov-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="bov-tit">
          <h1 class="bov-nombre">${R.nombre}</h1>
          <div class="bov-linea">${linea}</div>
        </div>
        <div class="bov-olas" aria-hidden="true"><span></span><span></span><span></span></div>
      </header>
      <div class="bov-drips" aria-hidden="true">${drips}</div>
      <nav class="bov-nav">${nav}</nav>
      ${secciones}
      <div class="bov-fin">🍦 ${R.nombre} · ${R.slogan || "Helados con Queso"}</div>`;

    const botones = [...root.querySelectorAll(".bov-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-66px 0px -74% 0px" });
      root.querySelectorAll(".bov-sec").forEach((s) => io.observe(s));
    }
  },
};
