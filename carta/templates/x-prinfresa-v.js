/* x-prinfresa-v — "Vitrina Prinfresa" — plantilla EXCLUSIVA alterna de Prinfresa.
   Variante VITRINA: grid de 2 columnas de tiles verticales (media cuadrada arriba
   con marco punteado de semillas y el "+" flotando sobre la esquina), header
   COMPACTO de barra con el logo coronado y el nombre en script rosa. Mantiene el
   vocabulario de "La reina de la fresa": rosa palidísimo con semillas, corona
   dorada, goteo de crema, hojitas y el precio en píldora dorada con corona. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-prinfresa-v"] = {
  label: "Vitrina Prinfresa",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@500;600;700&display=swap');

  body[data-tpl="x-prinfresa-v"]{
    --pfv-rosa:#E43C62; --pfv-rosa-honda:#D62E55; --pfv-rosa-borde:#C22548;
    --pfv-palido:#FFF2F6; --pfv-verde:#067D31; --pfv-oro:#E8A916; --pfv-tinta:#3D1F2A;
    background:#FFF7FA;
    /* semillas: dos capas de puntitos con offset a la mitad = retícula a 45° */
    background-image:
      radial-gradient(rgba(228,60,98,.12) 1.6px, transparent 2.1px),
      radial-gradient(rgba(228,60,98,.12) 1.6px, transparent 2.1px);
    background-size:22px 22px, 22px 22px;
    background-position:0 0, 11px 11px;
    color:var(--pfv-tinta); font-family:'Quicksand',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-prinfresa-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA COMPACTA: logo coronado + script rosa + 1 línea ---------- */
  body[data-tpl="x-prinfresa-v"] .pfv-top{
    display:flex;align-items:center;gap:12px;background:#fff;
    padding:calc(16px + env(safe-area-inset-top)) 16px 12px;
  }
  body[data-tpl="x-prinfresa-v"] .pfv-emblema{position:relative;flex:0 0 auto;}
  body[data-tpl="x-prinfresa-v"] .pfv-logo{
    width:48px;height:48px;border-radius:50%;overflow:hidden;background:#fff;
    border:2.5px solid var(--pfv-oro);box-shadow:0 4px 12px rgba(228,60,98,.22);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-prinfresa-v"] .pfv-corona{
    position:absolute;top:-12px;left:50%;transform:translateX(-50%) rotate(-8deg);
    font-size:15px;line-height:1;color:var(--pfv-oro);text-shadow:0 1px 0 rgba(184,124,10,.3);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-corona-solo{
    flex:0 0 auto;font-size:30px;line-height:1;color:var(--pfv-oro);
    text-shadow:0 2px 0 rgba(184,124,10,.3);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-hgroup{flex:1;min-width:0;}
  body[data-tpl="x-prinfresa-v"] .pfv-tit{
    margin:0;font-family:'Pacifico',cursive;font-weight:400;font-size:23px;line-height:1.2;
    color:var(--pfv-rosa);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-prinfresa-v"] .pfv-line{
    font-weight:700;font-size:11.5px;color:#7A4A58;margin-top:2px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }

  /* franja de crema: festones blancos que gotean del header (motivo insignia) */
  body[data-tpl="x-prinfresa-v"] .pfv-goteo{
    height:26px;margin-top:-1px;
    background-image:
      radial-gradient(circle at 50% 0, #fff 55%, rgba(255,255,255,0) 57%),
      radial-gradient(circle at 50% 4px, rgba(228,60,98,.18) 55%, rgba(228,60,98,0) 57%);
    background-size:34px 26px;
    background-repeat:repeat-x;
  }

  /* ---------- NAV PÍLDORAS STICKY CON HOJITAS ---------- */
  body[data-tpl="x-prinfresa-v"] .pfv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:10px 14px;scrollbar-width:none;
    background:rgba(255,247,250,.95);backdrop-filter:blur(6px);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-prinfresa-v"] .pfv-nav button{
    flex:0 0 auto;font-family:'Quicksand',sans-serif;font-weight:700;font-size:13px;
    color:var(--pfv-rosa-borde);background:#fff;border:2px solid #F0A8BC;border-radius:999px;
    padding:9px 15px;cursor:pointer;white-space:nowrap;box-shadow:0 3px 10px rgba(228,60,98,.10);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-nav button::before{content:'🌿';font-size:11px;margin-right:5px;}
  body[data-tpl="x-prinfresa-v"] .pfv-nav button.activa{
    background:var(--pfv-rosa-honda);border-color:#B01F44;color:#fff;
    box-shadow:0 6px 14px rgba(214,46,85,.35);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-nav button.activa::before{content:'♛';color:#FFDF96;}

  /* ---------- SECCIONES: título script con guirnalda de semillas ---------- */
  body[data-tpl="x-prinfresa-v"] .pfv-sec{padding:0 14px;scroll-margin-top:68px;}
  body[data-tpl="x-prinfresa-v"] .pfv-cat{display:flex;align-items:center;gap:12px;margin:20px 0 13px;}
  body[data-tpl="x-prinfresa-v"] .pfv-cat::before,
  body[data-tpl="x-prinfresa-v"] .pfv-cat::after{content:'';flex:1;border-top:3px dotted rgba(228,60,98,.45);}
  body[data-tpl="x-prinfresa-v"] .pfv-cat span{
    font-family:'Pacifico',cursive;font-weight:400;font-size:20px;line-height:1.3;
    color:var(--pfv-rosa-honda);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:78%;
  }

  /* ---------- GRID VITRINA 2 COLUMNAS: tiles blancos, borde superior rosa→oro ---------- */
  body[data-tpl="x-prinfresa-v"] .pfv-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 12px;}
  body[data-tpl="x-prinfresa-v"] .pfv-tile{
    position:relative;background:#fff;border-radius:20px;overflow:hidden;
    box-shadow:0 8px 22px rgba(228,60,98,.12);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-tile::before{
    content:'';position:absolute;top:0;left:0;right:0;height:5px;
    background:linear-gradient(90deg,var(--pfv-rosa),var(--pfv-oro));
  }
  body[data-tpl="x-prinfresa-v"] .pfv-mediaw{position:relative;margin:14px 10px 0;}
  body[data-tpl="x-prinfresa-v"] .pfv-media{
    aspect-ratio:1/1;border-radius:16px;overflow:hidden;
    background:var(--pfv-palido);border:3px dotted var(--pfv-rosa);
    display:flex;align-items:center;justify-content:center;font-size:46px;
  }
  body[data-tpl="x-prinfresa-v"] .pfv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-prinfresa-v"] .pfv-media.sin-foto{
    background-color:var(--pfv-palido);
    background-image:
      radial-gradient(circle at 50% 44%, rgba(255,255,255,.92), rgba(255,255,255,0) 64%),
      radial-gradient(rgba(228,60,98,.16) 1.5px, transparent 2px),
      radial-gradient(rgba(228,60,98,.16) 1.5px, transparent 2px);
    background-size:auto, 18px 18px, 18px 18px;
    background-position:center, 0 0, 9px 9px;
  }

  /* stepper flotante sobre la esquina de la media */
  body[data-tpl="x-prinfresa-v"] .pfv-ctrl{
    position:absolute;right:4px;bottom:-12px;z-index:3;
    display:flex;align-items:center;gap:6px;
  }
  body[data-tpl="x-prinfresa-v"] .pfv-ctrl [data-qtywrap]{
    display:none;align-items:center;gap:4px;
    background:#fff;border:2px solid var(--pfv-rosa);border-radius:999px;
    padding:3px 6px;box-shadow:0 3px 10px rgba(228,60,98,.25);
  }
  body[data-tpl="x-prinfresa-v"] .pfv-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-prinfresa-v"] [data-sub]{
    width:26px;height:26px;border-radius:50%;border:1.5px solid var(--pfv-rosa);cursor:pointer;
    background:transparent;color:var(--pfv-rosa-borde);font-size:16px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-prinfresa-v"] [data-cant]{
    font-weight:800;font-size:14px;color:var(--pfv-tinta);min-width:16px;text-align:center;
  }
  body[data-tpl="x-prinfresa-v"] [data-add]{
    width:40px;height:40px;border-radius:50%;border:2px solid var(--pfv-rosa-borde);cursor:pointer;
    background:var(--pfv-rosa);color:#fff;font-size:21px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 5px 12px rgba(228,60,98,.35);
  }
  body[data-tpl="x-prinfresa-v"] [data-add]:active{transform:scale(.92);}

  /* cuerpo del tile: nombre + precio coronado */
  body[data-tpl="x-prinfresa-v"] .pfv-info{padding:12px 12px 13px;}
  body[data-tpl="x-prinfresa-v"] .pfv-nom{
    font-weight:700;font-size:13.5px;line-height:1.25;color:var(--pfv-tinta);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:34px;
  }
  body[data-tpl="x-prinfresa-v"] .pfv-precio{
    display:inline-flex;align-items:center;gap:5px;white-space:nowrap;margin-top:7px;
    font-weight:800;font-size:13.5px;color:#8A5B00;background:#FFF6DF;
    border:1.5px solid #F2D9A0;border-radius:999px;padding:4px 11px;
  }
  body[data-tpl="x-prinfresa-v"] .pfv-precio::before{content:'♛';font-size:11px;color:var(--pfv-oro);}

  body[data-tpl="x-prinfresa-v"] .pfv-fin{
    text-align:center;padding:30px 16px 12px;font-family:'Pacifico',cursive;
    font-weight:400;font-size:16px;color:var(--pfv-rosa-honda);
  }

  /* carrito (override del motor) */
  body[data-tpl="x-prinfresa-v"] #cart-fab{
    background:var(--pfv-rosa) !important;color:#fff !important;
    border:2px solid var(--pfv-rosa-borde) !important;border-radius:999px !important;
    font-family:'Quicksand',sans-serif !important;font-weight:800 !important;
    box-shadow:0 10px 24px rgba(228,60,98,.4) !important;
  }
  body[data-tpl="x-prinfresa-v"] #cart-fab #fab-cant{background:#fff !important;color:var(--pfv-rosa) !important;}
  body[data-tpl="x-prinfresa-v"] #cart h2{font-family:'Pacifico',cursive;font-weight:400;color:var(--pfv-rosa-honda);}
  body[data-tpl="x-prinfresa-v"] #cart .cart-row .st-add{background:var(--pfv-rosa) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-prinfresa-v"] .pfv-tit{font-size:20px;}
    body[data-tpl="x-prinfresa-v"] .pfv-logo{width:44px;height:44px;}
    body[data-tpl="x-prinfresa-v"] .pfv-cat span{font-size:18px;}
    body[data-tpl="x-prinfresa-v"] .pfv-grid{gap:14px 10px;}
    body[data-tpl="x-prinfresa-v"] .pfv-media{font-size:40px;}
    body[data-tpl="x-prinfresa-v"] .pfv-nom{font-size:13px;min-height:33px;}
    body[data-tpl="x-prinfresa-v"] [data-add]{width:36px;height:36px;font-size:19px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍓"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="pfv-tile">
        <div class="pfv-mediaw">
          <div class="pfv-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="pfv-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="pfv-info">
          <div class="pfv-nom">${it.nombre}</div>
          <span class="pfv-precio">$${Number(it.precio).toFixed(2)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="pfv-sec" id="cat-${slug(c.categoria)}">
        <div class="pfv-cat"><span>${c.categoria}</span></div>
        <div class="pfv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const linea = [R.promo, R.direccion].filter(Boolean).join(" · ");
    const eslogan = R.slogan || "La reina de la fresa";
    const emblema = R.logo
      ? `<div class="pfv-emblema"><div class="pfv-logo"><img src="${R.logo}" alt="${R.nombre}"></div><span class="pfv-corona">♛</span></div>`
      : `<span class="pfv-corona-solo">♛</span>`;

    root.innerHTML = `
      <header class="pfv-top">
        ${emblema}
        <div class="pfv-hgroup">
          <h1 class="pfv-tit">${R.nombre}</h1>
          ${linea ? `<div class="pfv-line">${linea}</div>` : ``}
        </div>
      </header>
      <div class="pfv-goteo" aria-hidden="true"></div>
      <nav class="pfv-nav">${nav}</nav>
      ${secciones}
      <div class="pfv-fin">♛ ${R.nombre} · ${eslogan}</div>`;

    /* píldora activa al scrollear */
    const botones = [...root.querySelectorAll(".pfv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".pfv-sec").forEach((s) => io.observe(s));
    }
  },
};
