/* x-bellavista-v — "Vitrina Bellavista Burguer" — plantilla EXCLUSIVA alterna de Bellavista Burguer.
   Variante VITRINA: grid de 2 columnas de tiles verticales (media cuadrada arriba
   como ventana de ARCO colonial, "+" flotando sobre la esquina). Header compacto
   de barra con el logotipo serif de drop-caps rojas y una palabra outline de eco.
   Mantiene el vocabulario de "Balcón Colonial": amarillo dorado, crema, rojo/vino,
   dobles bordes oro, balaustradas y la voz "Desde 1998". */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-bellavista-v"] = {
  label: "Vitrina Bellavista Burguer",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

  body[data-tpl="x-bellavista-v"]{
    --bvv-rojo:#D81E05; --bvv-vino:#8E1503; --bvv-amarillo:#F7B500; --bvv-oro:#C98A00;
    --bvv-crema:#FFF8E7; --bvv-tinta:#3A2A18;
    background:linear-gradient(180deg,#FFD84D 0%,#F7B500 46%,#EFA700 100%);
    color:var(--bvv-tinta); font-family:'Lora',Georgia,serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-bellavista-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA COMPACTA CREMA con palabra outline de eco ---------- */
  body[data-tpl="x-bellavista-v"] .bvv-top{
    position:relative;overflow:hidden;display:flex;align-items:center;gap:12px;
    background:var(--bvv-crema);
    padding:calc(14px + env(safe-area-inset-top)) 16px 13px;
    border-bottom:2px solid rgba(216,30,5,.3);
  }
  body[data-tpl="x-bellavista-v"] .bvv-eco{
    position:absolute;top:50%;right:-14px;transform:translateY(-46%) rotate(-4deg);
    font-family:'Rozha One',serif;font-size:44px;line-height:1;text-transform:uppercase;
    letter-spacing:.03em;white-space:nowrap;color:transparent;
    -webkit-text-stroke:2px rgba(201,138,0,.22);
    pointer-events:none;user-select:none;
  }
  body[data-tpl="x-bellavista-v"] .bvv-logo{
    position:relative;z-index:1;flex:0 0 auto;width:46px;height:54px;overflow:hidden;
    background:#FFEFB8;border:3px double var(--bvv-oro);border-radius:23px 23px 8px 8px;
    box-shadow:0 3px 8px rgba(120,70,0,.28);
  }
  body[data-tpl="x-bellavista-v"] .bvv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bellavista-v"] .bvv-hgroup{position:relative;z-index:1;flex:1;min-width:0;}
  body[data-tpl="x-bellavista-v"] .bvv-tit{
    margin:0;font-family:'Rozha One',serif;font-weight:400;font-size:19px;line-height:1.05;
    color:#A3170A;text-shadow:1px 1px 0 rgba(255,216,77,.55);
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-bellavista-v"] .bvv-tit .bvv-dc{
    font-size:1.4em;line-height:.85;color:var(--bvv-rojo);vertical-align:-.06em;
  }
  body[data-tpl="x-bellavista-v"] .bvv-line{
    font-style:italic;font-weight:600;font-size:12px;color:#6B3E00;margin-top:4px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-bellavista-v"] .bvv-line .bvv-1998{
    font-style:normal;font-weight:700;font-size:10.5px;color:var(--bvv-crema);
    background:var(--bvv-rojo);border-radius:999px;padding:2px 8px;
    text-transform:uppercase;letter-spacing:.08em;
  }

  /* balaustrada de balcón como cinta separadora */
  body[data-tpl="x-bellavista-v"] .bvv-baranda{
    height:12px;
    background:repeating-linear-gradient(90deg,var(--bvv-crema) 0 5px,transparent 5px 12px);
    border-top:2px solid var(--bvv-crema);border-bottom:2px solid var(--bvv-crema);
  }

  /* ---------- NAV DE CHIPS STICKY: crema con borde rojo, serif ---------- */
  body[data-tpl="x-bellavista-v"] .bvv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:10px 14px;scrollbar-width:none;
    background:linear-gradient(180deg,rgba(255,216,77,.97),rgba(247,181,0,.97));
    backdrop-filter:blur(6px);border-bottom:2px solid rgba(216,30,5,.28);
  }
  body[data-tpl="x-bellavista-v"] .bvv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-bellavista-v"] .bvv-nav button{
    flex:0 0 auto;font-family:'Rozha One',serif;font-weight:400;font-size:13.5px;
    color:var(--bvv-vino);background:var(--bvv-crema);border:2px solid var(--bvv-rojo);
    border-radius:999px;padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-bellavista-v"] .bvv-nav button.activa{
    background:var(--bvv-rojo);color:var(--bvv-crema);border-color:var(--bvv-vino);
  }

  /* ---------- SECCIONES: título serif + balaustrada ---------- */
  body[data-tpl="x-bellavista-v"] .bvv-sec{padding:0 14px;margin-top:22px;scroll-margin-top:66px;}
  body[data-tpl="x-bellavista-v"] .bvv-cat{
    font-family:'Rozha One',serif;font-weight:400;font-size:20px;line-height:1.1;
    color:var(--bvv-vino);text-align:center;margin:0;
  }
  body[data-tpl="x-bellavista-v"] .bvv-balaustre{
    width:92px;height:10px;margin:8px auto 14px;
    background:repeating-linear-gradient(90deg,var(--bvv-crema) 0 5px,transparent 5px 11px);
    border-top:2px solid var(--bvv-crema);border-bottom:2px solid var(--bvv-crema);
  }

  /* ---------- GRID VITRINA 2 COLUMNAS: tiles crema con ventana de arco ---------- */
  body[data-tpl="x-bellavista-v"] .bvv-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 12px;}
  body[data-tpl="x-bellavista-v"] .bvv-tile{
    background:var(--bvv-crema);border:1.5px solid var(--bvv-rojo);border-radius:16px;
    box-shadow:0 5px 14px rgba(120,70,0,.18);
  }
  body[data-tpl="x-bellavista-v"] .bvv-mediaw{position:relative;margin:9px 9px 0;}
  body[data-tpl="x-bellavista-v"] .bvv-media{
    position:relative;aspect-ratio:1/1;overflow:hidden;
    background:#FFEFB8;border:3px solid var(--bvv-oro);
    border-radius:50% 50% 12px 12px / 42% 42% 12px 12px;
    display:flex;align-items:center;justify-content:center;font-size:46px;
  }
  body[data-tpl="x-bellavista-v"] .bvv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bellavista-v"] .bvv-media.sin-foto{
    background:
      radial-gradient(circle at 50% 42%, rgba(255,216,77,.85), rgba(255,216,77,0) 66%),
      repeating-linear-gradient(90deg, rgba(201,138,0,.16) 0 6px, transparent 6px 14px),
      #FFEFB8;
  }

  /* stepper flotante sobre la esquina de la media */
  body[data-tpl="x-bellavista-v"] .bvv-ctrl{
    position:absolute;right:6px;bottom:-12px;z-index:3;
    display:flex;align-items:center;gap:6px;
  }
  body[data-tpl="x-bellavista-v"] .bvv-ctrl [data-qtywrap]{
    display:none;align-items:center;gap:4px;
    background:var(--bvv-crema);border:2px solid var(--bvv-rojo);border-radius:999px;
    padding:3px 6px;box-shadow:0 3px 8px rgba(120,70,0,.28);
  }
  body[data-tpl="x-bellavista-v"] .bvv-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-bellavista-v"] [data-sub]{
    width:26px;height:26px;border-radius:50%;border:1.5px solid var(--bvv-rojo);cursor:pointer;
    background:transparent;color:var(--bvv-rojo);font-size:16px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-bellavista-v"] [data-cant]{
    font-family:'Rozha One',serif;font-size:14px;color:var(--bvv-vino);
    min-width:16px;text-align:center;
  }
  body[data-tpl="x-bellavista-v"] [data-add]{
    width:40px;height:40px;border-radius:50%;border:2px solid var(--bvv-vino);cursor:pointer;
    background:var(--bvv-rojo);color:var(--bvv-crema);font-size:20px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 10px rgba(142,21,3,.38);
  }
  body[data-tpl="x-bellavista-v"] [data-add]:active{transform:scale(.92);}

  /* cuerpo del tile */
  body[data-tpl="x-bellavista-v"] .bvv-info{padding:12px 11px 13px;}
  body[data-tpl="x-bellavista-v"] .bvv-nom{
    font-family:'Rozha One',serif;font-weight:400;font-size:14px;line-height:1.25;color:var(--bvv-vino);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:35px;
  }
  body[data-tpl="x-bellavista-v"] .bvv-pre{
    display:inline-flex;align-items:baseline;gap:1px;white-space:nowrap;margin-top:6px;
    font-weight:700;font-size:15px;color:var(--bvv-rojo);
  }
  body[data-tpl="x-bellavista-v"] .bvv-pre .bvv-dol{font-family:'Rozha One',serif;font-weight:400;font-size:20px;line-height:1;}

  /* ---------- FOOTER ---------- */
  body[data-tpl="x-bellavista-v"] .bvv-pie{
    text-align:center;padding:28px 16px 8px;font-family:'Rozha One',serif;
    font-size:14.5px;color:var(--bvv-vino);
  }
  body[data-tpl="x-bellavista-v"] .bvv-pie .bvv-balaustre{margin-bottom:12px;}

  /* ---------- CARRITO (override del motor) ---------- */
  body[data-tpl="x-bellavista-v"] #cart-fab{
    background:var(--bvv-rojo) !important;color:var(--bvv-crema) !important;
    border:3px solid var(--bvv-vino) !important;border-radius:18px !important;
    font-family:'Rozha One',serif !important;font-weight:400 !important;
    box-shadow:0 8px 22px rgba(142,21,3,.42) !important;
  }
  body[data-tpl="x-bellavista-v"] #cart-fab #fab-cant{background:var(--bvv-crema) !important;color:var(--bvv-rojo) !important;}
  body[data-tpl="x-bellavista-v"] #cart h2{font-family:'Rozha One',serif;color:var(--bvv-vino);}
  body[data-tpl="x-bellavista-v"] #cart .cart-row .st-add{background:var(--bvv-rojo) !important;color:var(--bvv-crema) !important;}

  @media(max-width:380px){
    body[data-tpl="x-bellavista-v"] .bvv-tit{font-size:17px;}
    body[data-tpl="x-bellavista-v"] .bvv-logo{width:42px;height:49px;border-radius:21px 21px 7px 7px;}
    body[data-tpl="x-bellavista-v"] .bvv-eco{font-size:38px;}
    body[data-tpl="x-bellavista-v"] .bvv-cat{font-size:18px;}
    body[data-tpl="x-bellavista-v"] .bvv-grid{gap:14px 10px;}
    body[data-tpl="x-bellavista-v"] .bvv-media{font-size:40px;}
    body[data-tpl="x-bellavista-v"] .bvv-nom{font-size:13px;min-height:33px;}
    body[data-tpl="x-bellavista-v"] [data-add]{width:36px;height:36px;font-size:19px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    // Drop-caps rojas en la inicial de cada palabra del nombre (motivo del flagship)
    const nombreDC = (R.nombre || "").split(" ").filter(Boolean)
      .map((w) => `<span class="bvv-w"><span class="bvv-dc">${w.charAt(0)}</span>${w.slice(1)}</span>`)
      .join(" ");

    const tile = (it, cat) => `
      <article class="bvv-tile">
        <div class="bvv-mediaw">
          <div class="bvv-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="bvv-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="bvv-info">
          <div class="bvv-nom">${it.nombre}</div>
          <span class="bvv-pre"><span class="bvv-dol">$</span>${Number(it.precio).toFixed(2)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="bvv-sec" id="cat-${slug(c.categoria)}">
        <h2 class="bvv-cat">${c.categoria}</h2>
        <div class="bvv-balaustre" aria-hidden="true"></div>
        <div class="bvv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const linea = R.promo || R.direccion || "";

    root.innerHTML = `
      <header class="bvv-top">
        <span class="bvv-eco" aria-hidden="true">Hamburguesas</span>
        ${R.logo ? `<div class="bvv-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="bvv-hgroup">
          <h1 class="bvv-tit">${nombreDC}</h1>
          <div class="bvv-line"><span class="bvv-1998">Desde 1998</span>${linea ? ` · ${linea}` : ``}</div>
        </div>
      </header>
      <div class="bvv-baranda" aria-hidden="true"></div>
      <nav class="bvv-nav">${nav}</nav>
      ${secciones}
      <footer class="bvv-pie">
        <div class="bvv-balaustre" aria-hidden="true"></div>
        Desde 1998 · ${R.direccion || "Loja y México"}
      </footer>`;

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".bvv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".bvv-sec").forEach((s) => io.observe(s));
    }
  },
};
