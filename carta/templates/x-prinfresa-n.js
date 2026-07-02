/* x-prinfresa-n — "Prinfresa de Noche" — plantilla EXCLUSIVA alterna de Prinfresa.
   Variante NOCTURNA: hero grande de apertura (logo coronado con halo dorado,
   script rosa encendido, coronas de contorno flotando y goteo de mermelada de
   fresa al pie) sobre un ciruela-fresa profundo derivado de la tinta de la
   marca, y el menú en UNA columna de filas horizontales con la media redondeada
   a la izquierda y precio+stepper apilados a la derecha. Mismo vocabulario de
   "La reina de la fresa": semillas, corona, oro, hojitas y verde menta. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-prinfresa-n"] = {
  label: "Prinfresa de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@500;600;700&display=swap');

  body[data-tpl="x-prinfresa-n"]{
    --pfn-noche:#24101A; --pfn-carbon:#3A1C2A; --pfn-vitrina:#4A2334;
    --pfn-rosa:#E43C62; --pfn-rosa-honda:#D62E55; --pfn-rosa-borde:#C22548;
    --pfn-rosa-luz:#FF8FAB; --pfn-oro:#F2BE45; --pfn-oro-hondo:#E8A916;
    --pfn-crema:#FFF2F6; --pfn-humo:#D9AFC0; --pfn-menta:#7CDFA4;
    background:var(--pfn-noche);
    /* semillas de fresa sobre la noche: misma retícula a 45°, en rosa tenue */
    background-image:
      radial-gradient(rgba(255,143,171,.07) 1.6px, transparent 2.1px),
      radial-gradient(rgba(255,143,171,.07) 1.6px, transparent 2.1px);
    background-size:22px 22px, 22px 22px;
    background-position:0 0, 11px 11px;
    color:var(--pfn-crema); font-family:'Quicksand',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-prinfresa-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO: halo rosa, coronas de contorno, logo coronado ---------- */
  body[data-tpl="x-prinfresa-n"] .pfn-hero{
    position:relative;overflow:hidden;height:50vh;max-height:420px;min-height:300px;
    display:flex;align-items:center;justify-content:center;text-align:center;
    padding:calc(18px + env(safe-area-inset-top)) 20px 34px;
    background-color:var(--pfn-noche);
    background-image:
      radial-gradient(circle at 50% 30%, rgba(228,60,98,.30), rgba(228,60,98,0) 62%),
      radial-gradient(rgba(255,143,171,.09) 1.6px, transparent 2.1px),
      radial-gradient(rgba(255,143,171,.09) 1.6px, transparent 2.1px),
      linear-gradient(180deg,#3D1F2A 0%,var(--pfn-noche) 100%);
    background-size:auto, 22px 22px, 22px 22px, auto;
    background-position:center, 0 0, 11px 11px, center;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-coronas{position:absolute;inset:0;pointer-events:none;user-select:none;}
  body[data-tpl="x-prinfresa-n"] .pfn-coronas span{
    position:absolute;font-size:110px;line-height:1;color:transparent;
    -webkit-text-stroke:2px rgba(242,190,69,.18);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-coronas span:nth-child(1){top:6%;left:-18px;transform:rotate(-14deg);}
  body[data-tpl="x-prinfresa-n"] .pfn-coronas span:nth-child(2){bottom:9%;right:-22px;transform:rotate(10deg);font-size:132px;}
  body[data-tpl="x-prinfresa-n"] .pfn-centro{
    position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-emblema{position:relative;}
  body[data-tpl="x-prinfresa-n"] .pfn-logo{
    width:96px;height:96px;border-radius:50%;overflow:hidden;background:var(--pfn-carbon);
    border:3px solid var(--pfn-oro);
    box-shadow:0 0 0 5px rgba(228,60,98,.35), 0 0 42px rgba(242,190,69,.35);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-prinfresa-n"] .pfn-corona{
    position:absolute;top:-21px;left:50%;transform:translateX(-50%) rotate(-8deg);
    font-size:28px;line-height:1;color:var(--pfn-oro);text-shadow:0 0 16px rgba(242,190,69,.6);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-corona-solo{
    font-size:44px;line-height:1;color:var(--pfn-oro);text-shadow:0 0 18px rgba(242,190,69,.55);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-tit{
    margin:14px 0 0;font-family:'Pacifico',cursive;font-weight:400;font-size:42px;line-height:1.12;
    color:var(--pfn-rosa-luz);text-shadow:0 4px 26px rgba(228,60,98,.45);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-slogan{
    font-variant:small-caps;letter-spacing:.24em;font-weight:700;font-size:13px;
    color:var(--pfn-menta);margin-top:4px;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-dir{font-weight:600;font-size:12.5px;color:var(--pfn-humo);margin-top:8px;}
  body[data-tpl="x-prinfresa-n"] .pfn-promo{
    margin-top:12px;font-weight:700;font-size:12.5px;color:var(--pfn-crema);
    border:1.5px solid rgba(242,190,69,.55);border-radius:999px;padding:6px 14px;
  }

  /* goteo de mermelada de fresa: los festones del flagship, ahora en rosa sobre la noche */
  body[data-tpl="x-prinfresa-n"] .pfn-goteo{
    height:26px;margin-top:-1px;
    background-image:
      linear-gradient(180deg, var(--pfn-rosa) 0 5px, rgba(228,60,98,0) 5px),
      radial-gradient(circle at 50% 0, var(--pfn-rosa) 55%, rgba(228,60,98,0) 57%),
      radial-gradient(circle at 50% 4px, rgba(0,0,0,.4) 55%, rgba(0,0,0,0) 57%);
    background-size:auto, 34px 26px, 34px 26px;
    background-repeat:repeat-x;
  }

  /* ---------- NAV STICKY: píldoras de contorno rosa sobre la noche ---------- */
  body[data-tpl="x-prinfresa-n"] .pfn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 14px;scrollbar-width:none;
    background:rgba(36,16,26,.93);backdrop-filter:blur(8px);
    border-bottom:1.5px solid rgba(228,60,98,.35);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-prinfresa-n"] .pfn-nav button{
    flex:0 0 auto;font-family:'Quicksand',sans-serif;font-weight:700;font-size:13px;
    color:var(--pfn-rosa-luz);background:transparent;border:2px solid rgba(228,60,98,.55);
    border-radius:999px;padding:9px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-nav button::before{content:'🌿';font-size:11px;margin-right:5px;}
  body[data-tpl="x-prinfresa-n"] .pfn-nav button.activa{
    background:var(--pfn-rosa-honda);border-color:var(--pfn-rosa);color:#fff;
    box-shadow:0 0 18px rgba(228,60,98,.45);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-nav button.activa::before{content:'♛';color:#FFDF96;}

  /* ---------- SECCIONES: título script con guirnalda dorada ---------- */
  body[data-tpl="x-prinfresa-n"] .pfn-sec{padding:4px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-prinfresa-n"] .pfn-cat{display:flex;align-items:center;gap:12px;margin:24px 0 14px;}
  body[data-tpl="x-prinfresa-n"] .pfn-cat::before,
  body[data-tpl="x-prinfresa-n"] .pfn-cat::after{content:'';flex:1;border-top:3px dotted rgba(242,190,69,.4);}
  body[data-tpl="x-prinfresa-n"] .pfn-cat span{
    font-family:'Pacifico',cursive;font-weight:400;font-size:21px;line-height:1.3;
    color:var(--pfn-rosa-luz);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:78%;
  }

  /* ---------- FILAS (1 columna): media redondeada izq + precio/stepper der ---------- */
  body[data-tpl="x-prinfresa-n"] .pfn-fila{
    position:relative;display:flex;gap:12px;align-items:center;overflow:hidden;
    background:var(--pfn-carbon);border:1px solid rgba(228,60,98,.30);border-radius:20px;
    padding:13px 13px 13px 17px;margin-bottom:13px;box-shadow:0 8px 20px rgba(0,0,0,.4);
  }
  body[data-tpl="x-prinfresa-n"] .pfn-fila::before{
    content:'';position:absolute;top:0;left:0;bottom:0;width:5px;
    background:linear-gradient(180deg,var(--pfn-rosa),var(--pfn-oro-hondo));
  }
  body[data-tpl="x-prinfresa-n"] .pfn-media{
    flex:0 0 auto;width:72px;height:72px;border-radius:18px;overflow:hidden;
    background:var(--pfn-vitrina);border:3px dotted var(--pfn-rosa);
    display:flex;align-items:center;justify-content:center;font-size:30px;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-prinfresa-n"] .pfn-media.sin-foto{
    background-color:var(--pfn-vitrina);
    background-image:
      radial-gradient(circle at 50% 42%, rgba(228,60,98,.35), rgba(228,60,98,0) 66%),
      radial-gradient(rgba(255,143,171,.14) 1.4px, transparent 1.9px),
      radial-gradient(rgba(255,143,171,.14) 1.4px, transparent 1.9px);
    background-size:auto, 16px 16px, 16px 16px;
    background-position:center, 0 0, 8px 8px;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-body{flex:1;min-width:0;}
  body[data-tpl="x-prinfresa-n"] .pfn-nom{font-weight:700;font-size:15px;line-height:1.25;color:var(--pfn-crema);}
  body[data-tpl="x-prinfresa-n"] .pfn-desc{
    font-weight:500;font-size:12.5px;color:var(--pfn-humo);line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-lado{
    flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:8px;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-precio{
    display:inline-flex;align-items:center;gap:4px;white-space:nowrap;
    font-weight:800;font-size:14.5px;color:var(--pfn-oro);
    background:rgba(242,190,69,.10);border:1.5px solid rgba(242,190,69,.45);
    border-radius:999px;padding:4px 11px;
  }
  body[data-tpl="x-prinfresa-n"] .pfn-precio::before{content:'♛';font-size:11px;color:var(--pfn-oro);}
  body[data-tpl="x-prinfresa-n"] .pfn-ctrl{display:inline-flex;align-items:center;gap:6px;}

  /* steppers: rosa encendido sobre la noche */
  body[data-tpl="x-prinfresa-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-prinfresa-n"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid var(--pfn-rosa-borde);cursor:pointer;
    background:var(--pfn-rosa);color:#fff;font-size:21px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 0 14px rgba(228,60,98,.5);
  }
  body[data-tpl="x-prinfresa-n"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-prinfresa-n"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:2px solid rgba(255,143,171,.6);cursor:pointer;
    background:transparent;color:var(--pfn-rosa-luz);font-size:17px;font-weight:700;
    display:none;align-items:center;justify-content:center;
  }
  body[data-tpl="x-prinfresa-n"] [data-cant]{
    display:none;font-weight:800;font-size:15px;color:var(--pfn-crema);min-width:18px;text-align:center;
  }
  body[data-tpl="x-prinfresa-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-prinfresa-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-prinfresa-n"] .pfn-fin{
    text-align:center;padding:30px 16px 12px;font-family:'Pacifico',cursive;
    font-weight:400;font-size:16px;color:var(--pfn-rosa-luz);
  }

  /* carrito (override del motor) */
  body[data-tpl="x-prinfresa-n"] #cart-fab{
    background:var(--pfn-rosa) !important;color:#fff !important;
    border:2px solid var(--pfn-rosa-borde) !important;border-radius:999px !important;
    font-family:'Quicksand',sans-serif !important;font-weight:800 !important;
    box-shadow:0 10px 26px rgba(0,0,0,.5), 0 0 24px rgba(228,60,98,.35) !important;
  }
  body[data-tpl="x-prinfresa-n"] #cart-fab #fab-cant{background:#fff !important;color:var(--pfn-rosa) !important;}
  body[data-tpl="x-prinfresa-n"] #cart h2{font-family:'Pacifico',cursive;font-weight:400;color:var(--pfn-rosa-honda);}
  body[data-tpl="x-prinfresa-n"] #cart .cart-row .st-add{background:var(--pfn-rosa) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-prinfresa-n"] .pfn-tit{font-size:34px;}
    body[data-tpl="x-prinfresa-n"] .pfn-logo{width:82px;height:82px;}
    body[data-tpl="x-prinfresa-n"] .pfn-coronas span{font-size:88px;}
    body[data-tpl="x-prinfresa-n"] .pfn-coronas span:nth-child(2){font-size:104px;}
    body[data-tpl="x-prinfresa-n"] .pfn-cat span{font-size:19px;}
    body[data-tpl="x-prinfresa-n"] .pfn-media{width:60px;height:60px;font-size:25px;border-radius:15px;}
    body[data-tpl="x-prinfresa-n"] .pfn-fila{gap:10px;padding:12px 11px 12px 15px;}
    body[data-tpl="x-prinfresa-n"] [data-add]{width:34px;height:34px;font-size:19px;}
    body[data-tpl="x-prinfresa-n"] [data-sub]{width:28px;height:28px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍓"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="pfn-fila">
        <div class="pfn-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="pfn-body">
          <div class="pfn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="pfn-desc">${it.desc}</div>` : ``}
        </div>
        <div class="pfn-lado">
          <span class="pfn-precio">$${Number(it.precio).toFixed(2)}</span>
          <span class="pfn-ctrl">${ctrl(it.id)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="pfn-sec" id="cat-${slug(c.categoria)}">
        <div class="pfn-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const eslogan = R.slogan || "La reina de la fresa";
    const emblema = R.logo
      ? `<div class="pfn-emblema"><div class="pfn-logo"><img src="${R.logo}" alt="${R.nombre}"></div><span class="pfn-corona">♛</span></div>`
      : `<div class="pfn-corona-solo">♛</div>`;

    root.innerHTML = `
      <header class="pfn-hero">
        <div class="pfn-coronas" aria-hidden="true"><span>♛</span><span>♛</span></div>
        <div class="pfn-centro">
          ${emblema}
          <h1 class="pfn-tit">${R.nombre}</h1>
          <div class="pfn-slogan">${eslogan}</div>
          ${R.direccion ? `<div class="pfn-dir">📍 ${R.direccion}</div>` : ``}
          ${R.promo ? `<div class="pfn-promo">${R.promo}</div>` : ``}
        </div>
      </header>
      <div class="pfn-goteo" aria-hidden="true"></div>
      <nav class="pfn-nav">${nav}</nav>
      ${secciones}
      <div class="pfn-fin">♛ ${R.nombre} · ${eslogan}</div>`;

    /* píldora activa al scrollear */
    const botones = [...root.querySelectorAll(".pfn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-74px 0px -72% 0px" });
      root.querySelectorAll(".pfn-sec").forEach((s) => io.observe(s));
    }
  },
};
