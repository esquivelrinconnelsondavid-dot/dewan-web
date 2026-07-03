/* x-bellavista — "Balcón Colonial" — plantilla EXCLUSIVA de Bellavista Burguer.
   Amarillo dorado del logo con palabras outline gigantes de fondo
   (HAMBURGUESAS · PAPAS FRITAS · HOTDOG), logotipo serif con drop-caps
   rojas enormes y secciones enmarcadas en ARCO colonial con balaustrada:
   la hamburguesería clásica de barrio, desde 1998. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-bellavista"] = {
  label: "Balcón Colonial",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

  body[data-tpl="x-bellavista"]{
    --bv-rojo:#D81E05; --bv-vino:#8E1503; --bv-amarillo:#F7B500; --bv-oro:#C98A00;
    --bv-crema:#FFF8E7; --bv-tinta:#3A2A18;
    background:linear-gradient(180deg,#FFD84D 0%,#F7B500 46%,#EFA700 100%);
    color:var(--bv-tinta); font-family:'Lora',Georgia,serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-bellavista"] #app{overflow-x:hidden;}

  /* ---------- HEADER: palabras outline de fondo + logotipo serif ---------- */
  body[data-tpl="x-bellavista"] .bv-top{
    position:relative;overflow:hidden;
    padding:calc(22px + env(safe-area-inset-top)) 0 18px;
  }
  body[data-tpl="x-bellavista"] .bv-fondo{
    position:absolute;inset:-10px 0;display:flex;flex-direction:column;justify-content:space-between;
    pointer-events:none;user-select:none;
  }
  body[data-tpl="x-bellavista"] .bv-fondo span{
    font-family:'Rozha One',serif;font-size:52px;line-height:1;text-transform:uppercase;
    letter-spacing:.03em;white-space:nowrap;color:transparent;
    -webkit-text-stroke:2px rgba(168,115,0,.25);
  }
  body[data-tpl="x-bellavista"] .bv-fondo span:nth-child(1){transform:rotate(-5deg) translateX(-6%);}
  body[data-tpl="x-bellavista"] .bv-fondo span:nth-child(2){transform:rotate(3deg) translateX(4%);align-self:flex-end;}
  body[data-tpl="x-bellavista"] .bv-fondo span:nth-child(3){transform:rotate(-3deg) translateX(-3%);}

  body[data-tpl="x-bellavista"] .bv-hero{
    position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;
    padding:0 16px;text-align:center;
  }
  body[data-tpl="x-bellavista"] .bv-ventana{
    width:112px;height:128px;overflow:hidden;background:var(--bv-crema);
    border:6px double var(--bv-crema);border-radius:56px 56px 14px 14px;
    box-shadow:0 0 0 2px rgba(142,21,3,.35), 0 12px 24px rgba(120,70,0,.35);
  }
  body[data-tpl="x-bellavista"] .bv-ventana img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bellavista"] .bv-tit{
    font-family:'Rozha One',serif;font-weight:400;font-size:31px;line-height:1.02;
    color:#A3170A;margin-top:14px;text-shadow:2px 2px 0 rgba(255,248,231,.55);
  }
  body[data-tpl="x-bellavista"] .bv-tit .bv-dc{
    font-size:1.65em;line-height:.85;color:var(--bv-rojo);vertical-align:-.08em;
  }
  body[data-tpl="x-bellavista"] .bv-slogan{
    font-style:italic;font-weight:600;font-size:15.5px;color:#6B3E00;margin-top:7px;
  }
  body[data-tpl="x-bellavista"] .bv-chips{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:13px;}
  body[data-tpl="x-bellavista"] .bv-chip{
    font-weight:600;font-size:12px;color:var(--bv-vino);background:var(--bv-crema);
    border:1.5px solid var(--bv-rojo);border-radius:999px;padding:6px 13px;
  }
  body[data-tpl="x-bellavista"] .bv-chip-1998{
    background:var(--bv-rojo);color:var(--bv-crema);border-color:var(--bv-vino);
    text-transform:uppercase;letter-spacing:.1em;font-weight:700;
  }

  /* ---------- NAV STICKY: crema con borde rojo, serif ---------- */
  body[data-tpl="x-bellavista"] .bv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:10px 14px;scrollbar-width:none;
    background:linear-gradient(180deg,rgba(255,216,77,.97),rgba(247,181,0,.97));
    backdrop-filter:blur(6px);border-bottom:2px solid rgba(216,30,5,.28);
  }
  body[data-tpl="x-bellavista"] .bv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-bellavista"] .bv-nav button{
    flex:0 0 auto;font-family:'Rozha One',serif;font-weight:400;font-size:13.5px;
    color:var(--bv-vino);background:var(--bv-crema);border:2px solid var(--bv-rojo);
    border-radius:999px;padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-bellavista"] .bv-nav button.activa{
    background:var(--bv-rojo);color:var(--bv-crema);border-color:var(--bv-vino);
  }

  /* ---------- SECCIONES: marco con ARCO colonial + balaustrada ---------- */
  body[data-tpl="x-bellavista"] .bv-sec{padding:0 12px;margin-top:26px;scroll-margin-top:76px;}
  body[data-tpl="x-bellavista"] .bv-marco{
    border:6px double var(--bv-crema);
    border-radius:50% 50% 22px 22px / 88px 88px 22px 22px;
    background:rgba(255,248,231,.14);
    padding:30px 12px 14px;
  }
  body[data-tpl="x-bellavista"] .bv-cat{
    font-family:'Rozha One',serif;font-weight:400;font-size:21px;line-height:1.1;
    color:var(--bv-vino);text-align:center;margin:0;
  }
  body[data-tpl="x-bellavista"] .bv-balaustre{
    width:112px;height:10px;margin:8px auto 16px;
    background:repeating-linear-gradient(90deg,var(--bv-crema) 0 5px,transparent 5px 11px);
    border-top:2px solid var(--bv-crema);border-bottom:2px solid var(--bv-crema);
  }

  /* ---------- TARJETAS: crema, borde fino rojo, ventanita arco ---------- */
  body[data-tpl="x-bellavista"] .bv-card{
    display:flex;gap:12px;align-items:center;background:var(--bv-crema);
    border:1.5px solid var(--bv-rojo);border-radius:14px;padding:12px;margin-bottom:12px;
    box-shadow:0 5px 14px rgba(120,70,0,.18);
  }
  body[data-tpl="x-bellavista"] .bv-media{
    flex:0 0 auto;width:58px;height:68px;overflow:hidden;
    background:#FFEFB8;border:3px solid var(--bv-oro);
    border-radius:29px 29px 10px 10px;
    display:flex;align-items:center;justify-content:center;font-size:26px;
  }
  body[data-tpl="x-bellavista"] .bv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-bellavista"] .bv-body{flex:1;min-width:0;}
  body[data-tpl="x-bellavista"] .bv-nom{
    font-family:'Rozha One',serif;font-weight:400;font-size:15px;line-height:1.25;color:var(--bv-vino);
  }
  body[data-tpl="x-bellavista"] .bv-desc{
    font-size:12.5px;color:#6B5B45;line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-bellavista"] .bv-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="x-bellavista"] .bv-pre{
    display:inline-flex;align-items:baseline;gap:1px;white-space:nowrap;
    font-weight:700;font-size:15px;color:var(--bv-rojo);
  }
  body[data-tpl="x-bellavista"] .bv-pre .bv-dol{font-family:'Rozha One',serif;font-weight:400;font-size:21px;line-height:1;}

  /* ---------- STEPPERS ROJOS ---------- */
  body[data-tpl="x-bellavista"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-bellavista"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid var(--bv-vino);cursor:pointer;
    background:var(--bv-rojo);color:var(--bv-crema);font-size:20px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 3px 8px rgba(142,21,3,.32);
  }
  body[data-tpl="x-bellavista"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-bellavista"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:2px solid var(--bv-rojo);cursor:pointer;
    background:var(--bv-crema);color:var(--bv-rojo);font-size:17px;font-weight:700;
    display:none;align-items:center;justify-content:center;
  }
  body[data-tpl="x-bellavista"] [data-cant]{
    display:none;font-family:'Rozha One',serif;font-size:15px;color:var(--bv-vino);
    min-width:18px;text-align:center;
  }
  body[data-tpl="x-bellavista"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-bellavista"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  /* ---------- FOOTER ---------- */
  body[data-tpl="x-bellavista"] .bv-pie{
    text-align:center;padding:30px 16px 8px;font-family:'Rozha One',serif;
    font-size:14.5px;color:var(--bv-vino);
  }
  body[data-tpl="x-bellavista"] .bv-pie .bv-balaustre{margin-bottom:12px;}

  /* ---------- CARRITO (override del motor) ---------- */
  body[data-tpl="x-bellavista"] #cart-fab{
    background:var(--bv-rojo) !important;color:var(--bv-crema) !important;
    border:3px solid var(--bv-vino) !important;border-radius:18px !important;
    font-family:'Rozha One',serif !important;font-weight:400 !important;
    box-shadow:0 8px 22px rgba(142,21,3,.42) !important;
  }
  body[data-tpl="x-bellavista"] #cart-fab #fab-cant{background:var(--bv-crema) !important;color:var(--bv-rojo) !important;}
  body[data-tpl="x-bellavista"] #cart h2{font-family:'Rozha One',serif;color:var(--bv-vino);}
  body[data-tpl="x-bellavista"] #cart .cart-row .st-add{background:var(--bv-rojo) !important;color:var(--bv-crema) !important;}

  @media(max-width:380px){
    body[data-tpl="x-bellavista"] .bv-tit{font-size:26px;}
    body[data-tpl="x-bellavista"] .bv-fondo span{font-size:42px;}
    body[data-tpl="x-bellavista"] .bv-ventana{width:96px;height:110px;border-radius:48px 48px 12px 12px;}
    body[data-tpl="x-bellavista"] .bv-cat{font-size:18px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    // Drop-caps rojas enormes en la inicial de cada palabra del nombre
    const nombreDC = (R.nombre || "").split(" ").filter(Boolean)
      .map((w) => `<span class="bv-w"><span class="bv-dc">${w.charAt(0)}</span>${w.slice(1)}</span>`)
      .join(" ");

    const fila = (it, cat) => `
      <article class="bv-card">
        <div class="bv-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="bv-body">
          <div class="bv-nom">${it.nombre}</div>
          ${it.desc ? `<div class="bv-desc">${it.desc}</div>` : ``}
          <div class="bv-foot">
            <span class="bv-pre"><span class="bv-dol">$</span>${Number(it.precio).toFixed(2)}</span>
            ${ctrl(it.id)}
          </div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="bv-sec" id="cat-${slug(c.categoria)}">
        <div class="bv-marco">
          <h2 class="bv-cat">${c.categoria}</h2>
          <div class="bv-balaustre" aria-hidden="true"></div>
          ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
        </div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || ""]).filter(Boolean);

    root.innerHTML = `
      <header class="bv-top">
        <div class="bv-fondo" aria-hidden="true">
          <span>Hamburguesas</span><span>Papas Fritas</span><span>Hotdog</span>
        </div>
        <div class="bv-hero">
          ${R.logo ? `<div class="bv-ventana"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
          <h1 class="bv-tit">${nombreDC}</h1>
          <div class="bv-slogan">¡El placer de degustar!</div>
          <div class="bv-chips">
            <span class="bv-chip bv-chip-1998">Desde 1998</span>
            ${meta.map((m) => `<span class="bv-chip">${m}</span>`).join("")}
          </div>
        </div>
      </header>
      <nav class="bv-nav">${nav}</nav>
      ${secciones}
      <footer class="bv-pie">
        <div class="bv-balaustre" aria-hidden="true"></div>
        Desde 1998 · Loja y México
      </footer>`;

    const botones = [...root.querySelectorAll(".bv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-80px 0px -75% 0px" });
      root.querySelectorAll(".bv-sec").forEach((s) => io.observe(s));
    }
  },
};
