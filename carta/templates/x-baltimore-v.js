/* x-baltimore-v — "Vitrina Baltimore" — plantilla EXCLUSIVA de Baltimore Food & Drinks.
   Variante VITRINA: grid de 2 columnas de tiles verticales con la media cuadrada
   arriba (foto o emoji sobre costuras de béisbol) y el stepper flotando sobre la
   esquina de la media. Mantiene el vocabulario del flagship "Ballpark Nocturno":
   negro de estadio, naranja Orioles, script Yellowtail, varsity Oswald,
   dorsales delineados y sombras duras quemadas. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-baltimore-v"] = {
  label: "Vitrina Baltimore",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Yellowtail&family=Oswald:wght@400;500;600;700&display=swap');

  body[data-tpl="x-baltimore-v"]{
    --bv-negro:#0D0D0D; --bv-naranja:#E05B19; --bv-vivo:#FF7A1A;
    --bv-panel:#17130F; --bv-linea:#2B211A; --bv-gris:#BCAE9F; --bv-quema:#7A2E0B;
    background:var(--bv-negro);
    background-image:
      radial-gradient(120% 82% at 50% -6%, rgba(224,91,25,.13), transparent 62%),
      radial-gradient(90% 60% at 50% 118%, rgba(255,122,26,.06), transparent 58%);
    background-attachment:fixed;
    color:#F4EEE7; font-family:'Oswald',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-baltimore-v"] #app{overflow-x:hidden;}

  /* ---------- HEADER COMPACTO DE BARRA ---------- */
  body[data-tpl="x-baltimore-v"] .bv-top{
    position:relative; overflow:hidden; display:flex; align-items:center; gap:13px;
    padding:calc(16px + env(safe-area-inset-top)) 16px 14px;
    background:linear-gradient(180deg, #161009, var(--bv-negro));
    border-bottom:1px solid var(--bv-linea);
  }
  body[data-tpl="x-baltimore-v"] .bv-top::before{
    content:""; position:absolute; left:0; right:0; top:0; height:3px;
    background:linear-gradient(90deg, var(--bv-quema), var(--bv-vivo) 50%, var(--bv-quema));
  }
  body[data-tpl="x-baltimore-v"] .bv-top::after{
    content:""; position:absolute; right:-46px; top:-54px; width:148px; height:148px;
    border:1.5px solid rgba(255,122,26,.22); border-radius:50%;
    outline:1.5px solid rgba(255,122,26,.1); outline-offset:7px; pointer-events:none;
  }
  body[data-tpl="x-baltimore-v"] .bv-logo{
    flex:0 0 auto; width:46px; height:46px; border-radius:50%; overflow:hidden; background:#000;
    border:2px solid var(--bv-vivo);
    box-shadow:0 0 0 3px var(--bv-negro), 0 0 0 4px var(--bv-naranja), 0 8px 16px rgba(0,0,0,.55);
    display:flex; align-items:center; justify-content:center; font-size:22px;
  }
  body[data-tpl="x-baltimore-v"] .bv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-baltimore-v"] .bv-tit{min-width:0;position:relative;}
  body[data-tpl="x-baltimore-v"] .bv-nombre{
    font-family:'Yellowtail',cursive;font-size:34px;line-height:1;color:var(--bv-vivo);
    text-shadow:0 3px 0 rgba(122,46,11,.55), 0 10px 24px rgba(224,91,25,.3);
  }
  body[data-tpl="x-baltimore-v"] .bv-linea{
    margin-top:4px;font-size:10.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
    color:var(--bv-gris);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }

  /* ---------- NAV VARSITY (chips sticky) ---------- */
  body[data-tpl="x-baltimore-v"] .bv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:10px 16px;scrollbar-width:none;background:rgba(13,13,13,.93);
    backdrop-filter:blur(7px);border-bottom:1px solid var(--bv-linea);
  }
  body[data-tpl="x-baltimore-v"] .bv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-baltimore-v"] .bv-nav button{
    flex:0 0 auto;font-family:'Oswald',sans-serif;font-size:12px;font-weight:600;
    letter-spacing:.1em;text-transform:uppercase;color:#F4EEE7;
    background:var(--bv-panel);border:1.5px solid var(--bv-naranja);border-radius:999px;
    padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-baltimore-v"] .bv-nav button.activa{
    background:var(--bv-vivo);border-color:var(--bv-vivo);color:var(--bv-negro);
    box-shadow:0 3px 0 var(--bv-quema);
  }

  /* ---------- SECCIONES: DORSAL + RAYA ---------- */
  body[data-tpl="x-baltimore-v"] .bv-sec{padding:4px 16px 0;scroll-margin-top:62px;}
  body[data-tpl="x-baltimore-v"] .bv-cat{display:flex;align-items:center;gap:11px;margin:22px 0 13px;}
  body[data-tpl="x-baltimore-v"] .bv-num{
    font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;line-height:1;
    color:transparent;-webkit-text-stroke:1.6px var(--bv-vivo);letter-spacing:.02em;
  }
  body[data-tpl="x-baltimore-v"] .bv-cat h2{
    font-family:'Oswald',sans-serif;font-size:19px;font-weight:600;letter-spacing:.14em;
    text-transform:uppercase;color:#FFFFFF;line-height:1.1;
  }
  body[data-tpl="x-baltimore-v"] .bv-cat .bv-raya{
    flex:1;height:2px;border-radius:2px;
    background:linear-gradient(90deg, var(--bv-naranja), transparent);
  }

  /* ---------- GRID VITRINA 2 COLUMNAS ---------- */
  body[data-tpl="x-baltimore-v"] .bv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:17px 11px;}
  body[data-tpl="x-baltimore-v"] .bv-tile{
    background:var(--bv-panel);border:1px solid var(--bv-linea);border-radius:16px;
    box-shadow:0 12px 26px -16px rgba(0,0,0,.8);
  }
  body[data-tpl="x-baltimore-v"] .bv-mediaw{position:relative;}
  body[data-tpl="x-baltimore-v"] .bv-media{
    aspect-ratio:1/1;border-radius:15px 15px 0 0;overflow:hidden;
    border-bottom:2px solid var(--bv-naranja);background:#221A12;
    display:flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-baltimore-v"] .bv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-baltimore-v"] .bv-media.sin-foto{
    font-size:52px;
    background:
      radial-gradient(circle at -36% 50%, transparent 54%, rgba(255,122,26,.3) 55%, rgba(255,122,26,.3) 58%, transparent 59.5%),
      radial-gradient(circle at 136% 50%, transparent 54%, rgba(255,122,26,.3) 55%, rgba(255,122,26,.3) 58%, transparent 59.5%),
      radial-gradient(circle at 50% 36%, #1C1610 0%, #0A0908 82%);
  }

  /* ---------- STEPPER FLOTANTE SOBRE LA ESQUINA ---------- */
  body[data-tpl="x-baltimore-v"] .bv-ctl{
    position:absolute;right:8px;bottom:-14px;z-index:2;
    display:flex;align-items:center;gap:6px;
  }
  body[data-tpl="x-baltimore-v"] .bv-ctl [data-qtywrap]{
    display:none;align-items:center;gap:6px;
    background:var(--bv-negro);border:1.5px solid var(--bv-vivo);border-radius:11px;
    padding:3px 7px;box-shadow:0 4px 0 var(--bv-quema), 0 10px 20px rgba(0,0,0,.55);
  }
  body[data-tpl="x-baltimore-v"] .bv-ctl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-baltimore-v"] [data-add]{
    width:38px;height:38px;border-radius:11px;border:2px solid var(--bv-negro);cursor:pointer;
    background:var(--bv-vivo);color:var(--bv-negro);font-size:20px;font-weight:700;
    font-family:'Oswald',sans-serif;display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 var(--bv-quema), 0 10px 20px rgba(0,0,0,.45);
  }
  body[data-tpl="x-baltimore-v"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--bv-quema);}
  body[data-tpl="x-baltimore-v"] [data-sub]{
    width:28px;height:28px;border-radius:8px;border:1.5px solid var(--bv-vivo);cursor:pointer;
    background:transparent;color:var(--bv-vivo);font-size:16px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-baltimore-v"] [data-cant]{
    font-family:'Oswald',sans-serif;font-size:15px;font-weight:600;
    color:#FFFFFF;min-width:16px;text-align:center;
  }

  /* ---------- CUERPO DEL TILE ---------- */
  body[data-tpl="x-baltimore-v"] .bv-body{padding:20px 11px 13px;}
  body[data-tpl="x-baltimore-v"] .bv-nom{
    font-family:'Oswald',sans-serif;font-size:13.5px;font-weight:600;letter-spacing:.02em;
    color:#FFFFFF;line-height:1.3;min-height:35px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-baltimore-v"] .bv-precio{
    margin-top:6px;font-family:'Yellowtail',cursive;font-size:22px;line-height:1;
    color:var(--bv-vivo);white-space:nowrap;text-shadow:0 2px 0 rgba(122,46,11,.5);
  }

  body[data-tpl="x-baltimore-v"] .bv-fin{
    text-align:center;padding:30px 0 12px;font-family:'Yellowtail',cursive;
    font-size:24px;color:var(--bv-vivo);
  }

  /* ---------- CARRITO ---------- */
  body[data-tpl="x-baltimore-v"] #cart-fab{
    background:var(--bv-vivo) !important;color:var(--bv-negro) !important;
    border:2px solid var(--bv-negro) !important;border-radius:14px !important;
    font-family:'Oswald',sans-serif !important;font-weight:700 !important;letter-spacing:.05em !important;
    box-shadow:0 6px 0 var(--bv-quema), 0 18px 34px rgba(0,0,0,.55) !important;
  }
  body[data-tpl="x-baltimore-v"] #cart-fab #fab-cant{background:var(--bv-negro) !important;color:var(--bv-vivo) !important;}
  body[data-tpl="x-baltimore-v"] #cart h2{
    font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
    color:#141210;border-left:4px solid var(--bv-naranja);padding-left:10px;
  }
  body[data-tpl="x-baltimore-v"] #cart .cart-row .st-add{background:var(--bv-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-baltimore-v"] .bv-nombre{font-size:30px;}
    body[data-tpl="x-baltimore-v"] .bv-grid{gap:15px 9px;}
    body[data-tpl="x-baltimore-v"] .bv-media.sin-foto{font-size:44px;}
    body[data-tpl="x-baltimore-v"] .bv-nom{font-size:12.5px;min-height:33px;}
    body[data-tpl="x-baltimore-v"] .bv-precio{font-size:20px;}
    body[data-tpl="x-baltimore-v"] [data-add]{width:36px;height:36px;}
    body[data-tpl="x-baltimore-v"] .bv-ctl{bottom:-13px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="bv-tile" data-n="${(it.nombre || "").toLowerCase()}">
        <div class="bv-mediaw">
          <div class="bv-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="bv-ctl">${ctrl(it.id)}</div>
        </div>
        <div class="bv-body">
          <div class="bv-nom">${it.nombre}</div>
          <div class="bv-precio">$${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c, i) => `
      <section class="bv-sec" id="cat-${slug(c.categoria)}">
        <div class="bv-cat">
          <span class="bv-num">${String(i + 1).padStart(2, "0")}</span>
          <h2>${c.categoria}</h2>
          <span class="bv-raya"></span>
        </div>
        <div class="bv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="bv-top">
        <div class="bv-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : `⚾`}</div>
        <div class="bv-tit">
          <h1 class="bv-nombre">${R.nombre}</h1>
          <div class="bv-linea">${R.promo || R.direccion || ""}</div>
        </div>
      </header>
      <nav class="bv-nav">${nav}</nav>
      ${secciones}
      <div class="bv-fin">#MomentosBaltimore ⚾</div>`;

    const botones = [...root.querySelectorAll(".bv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-66px 0px -74% 0px" });
      root.querySelectorAll(".bv-sec").forEach((s) => io.observe(s));
    }
  },
};
