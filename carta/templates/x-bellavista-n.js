/* x-bellavista-n — "Bellavista Burguer de Noche" — plantilla EXCLUSIVA alterna de Bellavista Burguer.
   Variante NOCTURNA: hero grande de apertura (ventana de arco colonial iluminada,
   logotipo serif con drop-caps rojas y palabras outline doradas flotando en la
   noche) sobre fondo espresso profundo derivado del vino/tinta de la marca, y el
   menú en UNA columna de tarjetas horizontales con la media redonda a la izquierda
   y precio+stepper a la derecha. Mismo vocabulario de "Balcón Colonial" —
   balaustradas, oro, crema, rojo — con el ámbar como luz. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-bellavista-n"] = {
  label: "Bellavista Burguer de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

  body[data-tpl="x-bellavista-n"]{
    --bvn-noche:#1F0E05; --bvn-carbon:#351A0C; --bvn-rojo:#D81E05; --bvn-vino:#8E1503;
    --bvn-ambar:#F7B500; --bvn-brillo:#FFD84D; --bvn-oro:#C98A00;
    --bvn-crema:#FFF8E7; --bvn-humo:#D9C9B2;
    background:var(--bvn-noche); color:var(--bvn-crema);
    font-family:'Lora',Georgia,serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-bellavista-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO: arco iluminado + palabras outline doradas ---------- */
  body[data-tpl="x-bellavista-n"] .bvn-hero{
    position:relative;overflow:hidden;height:50vh;max-height:420px;min-height:300px;
    display:flex;align-items:center;justify-content:center;
    padding:calc(18px + env(safe-area-inset-top)) 20px 34px;
    background:
      radial-gradient(circle at 50% 34%, rgba(247,181,0,.22), rgba(247,181,0,0) 60%),
      linear-gradient(180deg,#33170A 0%,var(--bvn-noche) 100%);
  }
  body[data-tpl="x-bellavista-n"] .bvn-fondo{
    position:absolute;inset:-8px 0;display:flex;flex-direction:column;justify-content:space-between;
    pointer-events:none;user-select:none;
  }
  body[data-tpl="x-bellavista-n"] .bvn-fondo span{
    font-family:'Rozha One',serif;font-size:52px;line-height:1;text-transform:uppercase;
    letter-spacing:.03em;white-space:nowrap;color:transparent;
    -webkit-text-stroke:2px rgba(247,181,0,.16);
  }
  body[data-tpl="x-bellavista-n"] .bvn-fondo span:nth-child(1){transform:rotate(-5deg) translateX(-6%);}
  body[data-tpl="x-bellavista-n"] .bvn-fondo span:nth-child(2){transform:rotate(3deg) translateX(4%);align-self:flex-end;}
  body[data-tpl="x-bellavista-n"] .bvn-fondo span:nth-child(3){transform:rotate(-3deg) translateX(-3%);}
  body[data-tpl="x-bellavista-n"] .bvn-centro{
    position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;
  }
  body[data-tpl="x-bellavista-n"] .bvn-ventana{
    width:104px;height:118px;overflow:hidden;background:var(--bvn-carbon);
    border:5px double var(--bvn-ambar);border-radius:52px 52px 12px 12px;
    box-shadow:0 0 0 2px rgba(216,30,5,.4), 0 0 44px rgba(247,181,0,.3);
  }
  body[data-tpl="x-bellavista-n"] .bvn-ventana img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bellavista-n"] .bvn-tit{
    margin:13px 0 0;font-family:'Rozha One',serif;font-weight:400;font-size:33px;line-height:1.02;
    color:var(--bvn-crema);text-shadow:0 4px 26px rgba(247,181,0,.32);
  }
  body[data-tpl="x-bellavista-n"] .bvn-tit .bvn-dc{
    font-size:1.6em;line-height:.85;color:var(--bvn-rojo);vertical-align:-.08em;
  }
  body[data-tpl="x-bellavista-n"] .bvn-slogan{
    font-style:italic;font-weight:600;font-size:15px;color:var(--bvn-brillo);margin-top:8px;
  }
  body[data-tpl="x-bellavista-n"] .bvn-dir{
    font-weight:500;font-size:13px;color:var(--bvn-humo);margin-top:7px;
  }
  body[data-tpl="x-bellavista-n"] .bvn-promo{
    margin-top:12px;font-weight:600;font-size:12.5px;color:var(--bvn-crema);
    border:1.5px solid rgba(247,181,0,.55);border-radius:999px;padding:6px 14px;
  }
  /* balaustrada del balcón, ahora en ámbar, al pie del hero */
  body[data-tpl="x-bellavista-n"] .bvn-baranda{
    position:absolute;left:0;right:0;bottom:0;height:12px;z-index:1;
    background:repeating-linear-gradient(90deg,rgba(247,181,0,.75) 0 5px,transparent 5px 12px);
    border-top:2px solid var(--bvn-ambar);border-bottom:2px solid var(--bvn-ambar);
  }

  /* ---------- NAV STICKY: chips serif sobre la noche ---------- */
  body[data-tpl="x-bellavista-n"] .bvn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 14px;scrollbar-width:none;
    background:rgba(31,14,5,.93);backdrop-filter:blur(8px);
    border-bottom:2px solid rgba(247,181,0,.4);
  }
  body[data-tpl="x-bellavista-n"] .bvn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-bellavista-n"] .bvn-nav button{
    flex:0 0 auto;font-family:'Rozha One',serif;font-weight:400;font-size:13.5px;
    color:var(--bvn-ambar);background:transparent;border:1.5px solid rgba(247,181,0,.5);
    border-radius:999px;padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-bellavista-n"] .bvn-nav button.activa{
    background:var(--bvn-ambar);color:var(--bvn-noche);border-color:var(--bvn-ambar);
    box-shadow:0 0 18px rgba(247,181,0,.35);
  }

  /* ---------- SECCIONES: título ámbar + balaustrada ---------- */
  body[data-tpl="x-bellavista-n"] .bvn-sec{padding:0 14px;margin-top:24px;scroll-margin-top:70px;}
  body[data-tpl="x-bellavista-n"] .bvn-cat{
    font-family:'Rozha One',serif;font-weight:400;font-size:21px;line-height:1.1;
    color:var(--bvn-ambar);text-align:center;margin:0;
  }
  body[data-tpl="x-bellavista-n"] .bvn-balaustre{
    width:112px;height:10px;margin:8px auto 15px;
    background:repeating-linear-gradient(90deg,var(--bvn-ambar) 0 5px,transparent 5px 11px);
    border-top:2px solid var(--bvn-ambar);border-bottom:2px solid var(--bvn-ambar);
  }

  /* ---------- FILAS HORIZONTALES (1 columna): media redonda + lado derecho ---------- */
  body[data-tpl="x-bellavista-n"] .bvn-fila{
    display:flex;gap:12px;align-items:center;
    background:var(--bvn-carbon);border:1px solid rgba(247,181,0,.28);border-radius:18px;
    padding:12px;margin-bottom:12px;box-shadow:0 6px 16px rgba(0,0,0,.4);
  }
  body[data-tpl="x-bellavista-n"] .bvn-media{
    flex:0 0 auto;width:64px;height:64px;border-radius:50%;overflow:hidden;
    background:#46220F;border:3px solid var(--bvn-oro);
    display:flex;align-items:center;justify-content:center;font-size:27px;
  }
  body[data-tpl="x-bellavista-n"] .bvn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bellavista-n"] .bvn-media.sin-foto{
    background:radial-gradient(circle at 50% 38%, rgba(247,181,0,.34), rgba(247,181,0,0) 70%), #46220F;
  }
  body[data-tpl="x-bellavista-n"] .bvn-body{flex:1;min-width:0;}
  body[data-tpl="x-bellavista-n"] .bvn-nom{
    font-family:'Rozha One',serif;font-weight:400;font-size:15.5px;line-height:1.2;color:var(--bvn-crema);
  }
  body[data-tpl="x-bellavista-n"] .bvn-desc{
    font-size:12.5px;color:var(--bvn-humo);line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-bellavista-n"] .bvn-lado{
    flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:8px;
  }
  body[data-tpl="x-bellavista-n"] .bvn-pre{
    display:inline-flex;align-items:baseline;gap:1px;white-space:nowrap;
    font-weight:700;font-size:15px;color:var(--bvn-ambar);
  }
  body[data-tpl="x-bellavista-n"] .bvn-pre .bvn-dol{font-family:'Rozha One',serif;font-weight:400;font-size:21px;line-height:1;}
  body[data-tpl="x-bellavista-n"] .bvn-ctrl{display:inline-flex;align-items:center;gap:6px;}

  /* ---------- STEPPERS: rojo de la casa como luz sobre la noche ---------- */
  body[data-tpl="x-bellavista-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-bellavista-n"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid var(--bvn-vino);cursor:pointer;
    background:var(--bvn-rojo);color:var(--bvn-crema);font-size:20px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 3px 10px rgba(216,30,5,.45);
  }
  body[data-tpl="x-bellavista-n"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-bellavista-n"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:2px solid rgba(247,181,0,.6);cursor:pointer;
    background:transparent;color:var(--bvn-ambar);font-size:17px;font-weight:700;
    display:none;align-items:center;justify-content:center;
  }
  body[data-tpl="x-bellavista-n"] [data-cant]{
    display:none;font-family:'Rozha One',serif;font-size:15px;color:var(--bvn-crema);
    min-width:18px;text-align:center;
  }
  body[data-tpl="x-bellavista-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-bellavista-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  /* ---------- FOOTER ---------- */
  body[data-tpl="x-bellavista-n"] .bvn-pie{
    text-align:center;padding:30px 16px 8px;font-family:'Rozha One',serif;
    font-size:14.5px;color:var(--bvn-ambar);
  }
  body[data-tpl="x-bellavista-n"] .bvn-pie .bvn-balaustre{margin-bottom:12px;}

  /* ---------- CARRITO (override del motor) ---------- */
  body[data-tpl="x-bellavista-n"] #cart-fab{
    background:var(--bvn-rojo) !important;color:var(--bvn-crema) !important;
    border:3px solid var(--bvn-vino) !important;border-radius:18px !important;
    font-family:'Rozha One',serif !important;font-weight:400 !important;
    box-shadow:0 8px 26px rgba(0,0,0,.5), 0 0 28px rgba(247,181,0,.22) !important;
  }
  body[data-tpl="x-bellavista-n"] #cart-fab #fab-cant{background:var(--bvn-crema) !important;color:var(--bvn-rojo) !important;}
  body[data-tpl="x-bellavista-n"] #cart h2{font-family:'Rozha One',serif;color:var(--bvn-vino);}
  body[data-tpl="x-bellavista-n"] #cart .cart-row .st-add{background:var(--bvn-rojo) !important;color:var(--bvn-crema) !important;}

  @media(max-width:380px){
    body[data-tpl="x-bellavista-n"] .bvn-tit{font-size:28px;}
    body[data-tpl="x-bellavista-n"] .bvn-fondo span{font-size:42px;}
    body[data-tpl="x-bellavista-n"] .bvn-ventana{width:90px;height:102px;border-radius:45px 45px 10px 10px;}
    body[data-tpl="x-bellavista-n"] .bvn-cat{font-size:18px;}
    body[data-tpl="x-bellavista-n"] .bvn-media{width:56px;height:56px;font-size:23px;}
    body[data-tpl="x-bellavista-n"] .bvn-fila{gap:10px;padding:11px;}
    body[data-tpl="x-bellavista-n"] [data-add]{width:34px;height:34px;font-size:19px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    // Drop-caps rojas en la inicial de cada palabra del nombre (motivo del flagship)
    const nombreDC = (R.nombre || "").split(" ").filter(Boolean)
      .map((w) => `<span class="bvn-w"><span class="bvn-dc">${w.charAt(0)}</span>${w.slice(1)}</span>`)
      .join(" ");

    const fila = (it, cat) => `
      <article class="bvn-fila">
        <div class="bvn-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="bvn-body">
          <div class="bvn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="bvn-desc">${it.desc}</div>` : ``}
        </div>
        <div class="bvn-lado">
          <span class="bvn-pre"><span class="bvn-dol">$</span>${Number(it.precio).toFixed(2)}</span>
          <span class="bvn-ctrl">${ctrl(it.id)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="bvn-sec" id="cat-${slug(c.categoria)}">
        <h2 class="bvn-cat">${c.categoria}</h2>
        <div class="bvn-balaustre" aria-hidden="true"></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="bvn-hero">
        <div class="bvn-fondo" aria-hidden="true">
          <span>Hamburguesas</span><span>Papas Fritas</span><span>Hotdog</span>
        </div>
        <div class="bvn-centro">
          ${R.logo ? `<div class="bvn-ventana"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
          <h1 class="bvn-tit">${nombreDC}</h1>
          <div class="bvn-slogan">${R.slogan || "¡El placer de degustar!"}</div>
          ${R.direccion ? `<div class="bvn-dir">📍 ${R.direccion}</div>` : ``}
          ${R.promo ? `<div class="bvn-promo">${R.promo}</div>` : ``}
        </div>
        <div class="bvn-baranda" aria-hidden="true"></div>
      </header>
      <nav class="bvn-nav">${nav}</nav>
      ${secciones}
      <footer class="bvn-pie">
        <div class="bvn-balaustre" aria-hidden="true"></div>
        Desde 1998 · ${R.direccion || "Loja y México"}
      </footer>`;

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".bvn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-74px 0px -72% 0px" });
      root.querySelectorAll(".bvn-sec").forEach((s) => io.observe(s));
    }
  },
};
