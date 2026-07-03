/* x-verdebolon-v — "Vitrina Verde Bolón" — plantilla EXCLUSIVA de Verde Bolón.
   La carta de hacienda hecha vitrina: pergamino con textura de papel, barra
   compacta con la insignia chica de doble aro, grid de dos columnas con tiles
   de costal (puntada dashed, semillas punteadas en la media, verde/rojo de la
   casa) y el stepper flotando como etiqueta cosida sobre la esquina de la foto. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-verdebolon-v"] = {
  label: "Vitrina Verde Bolón",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@1,400;1,700&family=Bitter:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

  body[data-tpl="x-verdebolon-v"]{
    --vb-choco:#472919; --vb-tinta:#2A1810; --vb-crema:#E6D8AD; --vb-perg:#EFE3C0;
    --vb-verde:#3E7A34; --vb-rojo:#A41E22; --vb-claro:#F7EED3;
    background:var(--vb-perg);
    background-image:
      repeating-linear-gradient(0deg, rgba(71,41,25,.035) 0 1px, transparent 1px 7px),
      repeating-linear-gradient(90deg, rgba(71,41,25,.02) 0 1px, transparent 1px 9px);
    color:var(--vb-tinta); font-family:'Bitter',Georgia,serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-verdebolon-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA COMPACTA ---------- */
  body[data-tpl="x-verdebolon-v"] .vbv-bar{
    display:flex;align-items:center;gap:12px;
    padding:calc(12px + env(safe-area-inset-top)) 16px 11px;
    border-bottom:2px dashed rgba(71,41,25,.45);
  }
  body[data-tpl="x-verdebolon-v"] .vbv-logo{
    flex:0 0 auto;width:46px;height:46px;border-radius:50%;overflow:hidden;
    background:var(--vb-claro);border:2px solid var(--vb-choco);
    box-shadow:0 0 0 3px var(--vb-crema), 0 0 0 4px var(--vb-choco);
    display:flex;align-items:center;justify-content:center;font-size:22px;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-logo img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-verdebolon-v"] .vbv-bar-tx{flex:1;min-width:0;}
  body[data-tpl="x-verdebolon-v"] .vbv-tit{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:24px;line-height:1.08;margin:0;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-tit .vbv-tv{color:var(--vb-verde);}
  body[data-tpl="x-verdebolon-v"] .vbv-tit .vbv-tr{color:var(--vb-rojo);}
  body[data-tpl="x-verdebolon-v"] .vbv-sub{
    font-size:11.5px;font-style:italic;color:var(--vb-choco);opacity:.78;margin-top:2px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }

  /* ---------- NAV ETIQUETAS DE COSTAL ---------- */
  body[data-tpl="x-verdebolon-v"] .vbv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:9px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;
    background:rgba(239,227,192,.95);backdrop-filter:blur(6px);
    border-bottom:2px dashed rgba(71,41,25,.45);
  }
  body[data-tpl="x-verdebolon-v"] .vbv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-verdebolon-v"] .vbv-nav button{
    flex:0 0 auto;font-family:'Bitter',Georgia,serif;font-weight:700;font-size:12.5px;
    letter-spacing:.04em;color:var(--vb-choco);background:var(--vb-claro);
    border:2px dashed var(--vb-choco);border-radius:6px;padding:8px 14px;
    cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-nav button.activa{
    background:var(--vb-choco);color:var(--vb-perg);border:2px dashed var(--vb-crema);
  }

  /* ---------- SECCIONES + GRID VITRINA ---------- */
  body[data-tpl="x-verdebolon-v"] .vbv-sec{scroll-margin-top:64px;}
  body[data-tpl="x-verdebolon-v"] .vbv-cat{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:26px;text-align:center;margin:24px 16px 12px;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-cat.vbv-cv{color:var(--vb-verde);}
  body[data-tpl="x-verdebolon-v"] .vbv-cat.vbv-cr{color:var(--vb-rojo);}
  body[data-tpl="x-verdebolon-v"] .vbv-cat .vbv-grano{
    font-family:'Bitter',serif;font-style:normal;font-size:12px;
    color:var(--vb-choco);opacity:.5;vertical-align:middle;margin:0 9px;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-grid{
    display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
    gap:18px 13px;padding:2px 16px 0;
  }

  /* tile de costal */
  body[data-tpl="x-verdebolon-v"] .vbv-tile{
    background:var(--vb-claro);border:2px solid var(--vb-choco);border-radius:12px;
    box-shadow:0 4px 12px rgba(71,41,25,.14);
  }
  body[data-tpl="x-verdebolon-v"] .vbv-mediawrap{position:relative;}
  body[data-tpl="x-verdebolon-v"] .vbv-media{
    position:relative;width:100%;aspect-ratio:1/1;border-radius:10px 10px 0 0;overflow:hidden;
    background:radial-gradient(circle at 32% 28%, var(--vb-claro), var(--vb-crema));
    border-bottom:2px dashed rgba(71,41,25,.42);
    display:flex;align-items:center;justify-content:center;font-size:54px;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-media.vbv-emoji{
    background-image:
      radial-gradient(rgba(71,41,25,.13) 1.5px, transparent 1.6px),
      radial-gradient(circle at 32% 28%, #F7EED3, #E6D8AD);
    background-size:15px 15px, 100% 100%;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-media.vbv-emoji::after{
    content:"";position:absolute;inset:16px;border:2px dashed rgba(71,41,25,.34);border-radius:50%;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-media img{width:100%;height:100%;object-fit:cover;}

  /* stepper flotante como etiqueta cosida en la esquina de la media */
  body[data-tpl="x-verdebolon-v"] .vbv-ctl{position:absolute;right:8px;bottom:-16px;z-index:3;}
  body[data-tpl="x-verdebolon-v"] .vbv-ctl [data-qtywrap]{
    display:inline-flex;align-items:center;gap:5px;
    background:var(--vb-claro);border:2px dashed var(--vb-choco);border-radius:999px;
    padding:3px;box-shadow:0 4px 10px rgba(42,24,16,.28);
  }
  body[data-tpl="x-verdebolon-v"] .vbv-ctl [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid #2C5A25;cursor:pointer;
    background:var(--vb-verde);color:var(--vb-perg);font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-ctl [data-add]:active{transform:scale(.94);}
  body[data-tpl="x-verdebolon-v"] .vbv-ctl [data-sub]{
    width:32px;height:32px;border-radius:50%;border:2px solid var(--vb-verde);
    background:transparent;color:var(--vb-verde);font-size:17px;font-weight:800;
    display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-ctl [data-cant]{
    display:none;font-family:'Bitter',serif;font-weight:800;font-size:14.5px;
    color:var(--vb-choco);min-width:16px;text-align:center;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-ctl [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-verdebolon-v"] .vbv-ctl [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-verdebolon-v"] .vbv-info{padding:22px 11px 12px;}
  body[data-tpl="x-verdebolon-v"] .vbv-nom{
    font-weight:700;font-size:13.5px;line-height:1.3;color:var(--vb-tinta);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
    min-height:35px;
  }
  body[data-tpl="x-verdebolon-v"] .vbv-precio{
    display:inline-block;margin-top:6px;font-weight:800;font-size:15px;color:var(--vb-rojo);
    border-bottom:2px dashed var(--vb-rojo);padding-bottom:1px;white-space:nowrap;
  }

  body[data-tpl="x-verdebolon-v"] .vbv-fin{
    text-align:center;padding:30px 16px 12px;
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:19px;color:var(--vb-choco);
  }

  /* carrito */
  body[data-tpl="x-verdebolon-v"] #cart-fab{
    background:var(--vb-choco) !important;color:var(--vb-perg) !important;
    border:2px dashed var(--vb-crema) !important;border-radius:12px !important;
    font-family:'Bitter',Georgia,serif !important;font-weight:700 !important;
    box-shadow:0 5px 0 #2A1810, 0 16px 28px rgba(42,24,16,.35) !important;
  }
  body[data-tpl="x-verdebolon-v"] #cart-fab #fab-cant{background:var(--vb-crema) !important;color:var(--vb-choco) !important;}
  body[data-tpl="x-verdebolon-v"] #cart h2{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;color:var(--vb-choco);
  }
  body[data-tpl="x-verdebolon-v"] #cart .cart-row .st-add{background:var(--vb-verde) !important;color:var(--vb-perg) !important;}

  @media(max-width:380px){
    body[data-tpl="x-verdebolon-v"] .vbv-tit{font-size:21px;}
    body[data-tpl="x-verdebolon-v"] .vbv-grid{gap:16px 10px;padding:2px 12px 0;}
    body[data-tpl="x-verdebolon-v"] .vbv-media{font-size:46px;}
    body[data-tpl="x-verdebolon-v"] .vbv-cat{font-size:23px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const cats = R.menu || [];

    // Nombre bicolor verde/rojo en script — sello de la marca
    const palabras = (R.nombre || "").trim().split(/\s+/);
    const corte = Math.ceil(palabras.length / 2);
    const titulo = `<span class="vbv-tv">${palabras.slice(0, corte).join(" ")}</span> <span class="vbv-tr">${palabras.slice(corte).join(" ")}</span>`;
    const linea = R.promo || R.direccion || R.slogan || "";

    const tile = (it, cat) => `
      <article class="vbv-tile">
        <div class="vbv-mediawrap">
          <div class="vbv-media${it.foto ? "" : " vbv-emoji"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="vbv-ctl">${ctrl(it.id)}</div>
        </div>
        <div class="vbv-info">
          <div class="vbv-nom">${it.nombre}</div>
          <div class="vbv-precio">$ ${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c, i) => `
      <section class="vbv-sec" id="cat-${slug(c.categoria)}">
        <h2 class="vbv-cat ${i % 2 === 0 ? "vbv-cv" : "vbv-cr"}"><span class="vbv-grano">●</span>${c.categoria}<span class="vbv-grano">●</span></h2>
        <div class="vbv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="vbv-bar">
        <div class="vbv-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : "☕"}</div>
        <div class="vbv-bar-tx">
          <h1 class="vbv-tit">${titulo}</h1>
          ${linea ? `<div class="vbv-sub">${linea}</div>` : ``}
        </div>
      </header>
      <nav class="vbv-nav">${nav}</nav>
      ${secciones}
      <div class="vbv-fin">☕ De la olla, como siempre</div>`;

    const botones = [...root.querySelectorAll(".vbv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".vbv-sec").forEach((s) => io.observe(s));
    }
  },
};
