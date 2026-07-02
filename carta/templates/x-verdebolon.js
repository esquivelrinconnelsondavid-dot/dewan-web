/* x-verdebolon — "Cafetería de la Abuela" — plantilla EXCLUSIVA de Verde Bolón.
   Pergamino con textura de papel, insignia circular chocolate con vapor de café,
   nombre bicolor verde/rojo en script, filas con puntada dashed estilo carta de
   hacienda y etiquetas de costal en la nav. De la olla, como siempre. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-verdebolon"] = {
  label: "Cafetería de la Abuela",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@1,400;1,700&family=Bitter:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

  body[data-tpl="x-verdebolon"]{
    --vb-choco:#472919; --vb-tinta:#2A1810; --vb-crema:#E6D8AD; --vb-perg:#EFE3C0;
    --vb-verde:#3E7A34; --vb-rojo:#A41E22; --vb-claro:#F7EED3;
    background:var(--vb-perg);
    background-image:
      repeating-linear-gradient(0deg, rgba(71,41,25,.035) 0 1px, transparent 1px 7px),
      repeating-linear-gradient(90deg, rgba(71,41,25,.02) 0 1px, transparent 1px 9px);
    color:var(--vb-tinta); font-family:'Bitter',Georgia,serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-verdebolon"] #app{overflow-x:hidden;}

  /* ---------- CABECERA INSIGNIA ---------- */
  body[data-tpl="x-verdebolon"] .vb-top{
    text-align:center;padding:calc(16px + env(safe-area-inset-top)) 16px 10px;
  }
  body[data-tpl="x-verdebolon"] .vb-eyebrow{
    font-weight:700;font-size:11px;letter-spacing:.34em;text-transform:uppercase;
    color:var(--vb-choco);opacity:.82;
  }
  body[data-tpl="x-verdebolon"] .vb-insignia-wrap{
    position:relative;display:inline-block;margin-top:34px;
  }
  body[data-tpl="x-verdebolon"] .vb-vapor{
    position:absolute;top:-30px;left:50%;transform:translateX(-50%);
    display:flex;gap:10px;align-items:flex-end;
  }
  body[data-tpl="x-verdebolon"] .vb-vapor i{
    display:block;width:9px;border-left:3px solid rgba(71,41,25,.3);border-radius:50%;
  }
  body[data-tpl="x-verdebolon"] .vb-vapor i:nth-child(1){height:24px;transform:rotate(16deg);}
  body[data-tpl="x-verdebolon"] .vb-vapor i:nth-child(2){height:32px;transform:rotate(-10deg);}
  body[data-tpl="x-verdebolon"] .vb-vapor i:nth-child(3){height:21px;transform:rotate(20deg);}
  body[data-tpl="x-verdebolon"] .vb-insignia{
    width:118px;height:118px;border-radius:50%;overflow:hidden;margin:0 auto;
    background:var(--vb-claro);border:3px solid var(--vb-choco);
    box-shadow:0 0 0 5px var(--vb-crema), 0 0 0 7px var(--vb-choco), 0 12px 22px rgba(71,41,25,.22);
    display:flex;align-items:center;justify-content:center;font-size:52px;
  }
  body[data-tpl="x-verdebolon"] .vb-insignia img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-verdebolon"] .vb-tit{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:40px;line-height:1.05;margin-top:14px;
  }
  body[data-tpl="x-verdebolon"] .vb-tit .vb-tv{color:var(--vb-verde);}
  body[data-tpl="x-verdebolon"] .vb-tit .vb-tr{color:var(--vb-rojo);}
  body[data-tpl="x-verdebolon"] .vb-eyebrow-b{margin-top:8px;}
  body[data-tpl="x-verdebolon"] .vb-dir{
    font-size:11.5px;font-style:italic;color:var(--vb-choco);opacity:.7;margin-top:6px;
  }
  body[data-tpl="x-verdebolon"] .vb-meta{
    display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px;
  }
  body[data-tpl="x-verdebolon"] .vb-meta span{
    font-weight:600;font-size:11.5px;letter-spacing:.06em;color:var(--vb-choco);
    background:rgba(255,255,255,.4);border:1px solid rgba(71,41,25,.5);
    border-radius:4px;padding:6px 11px;
  }

  /* ---------- NAV ETIQUETAS DE COSTAL ---------- */
  body[data-tpl="x-verdebolon"] .vb-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:9px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;
    background:rgba(239,227,192,.95);backdrop-filter:blur(6px);
    border-bottom:2px dashed rgba(71,41,25,.45);
  }
  body[data-tpl="x-verdebolon"] .vb-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-verdebolon"] .vb-nav button{
    flex:0 0 auto;font-family:'Bitter',Georgia,serif;font-weight:700;font-size:12.5px;
    letter-spacing:.04em;color:var(--vb-choco);background:var(--vb-claro);
    border:2px dashed var(--vb-choco);border-radius:6px;padding:8px 14px;
    cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-verdebolon"] .vb-nav button.activa{
    background:var(--vb-choco);color:var(--vb-perg);border:2px dashed var(--vb-crema);
  }

  /* ---------- SECCIONES CARTA DE HACIENDA ---------- */
  body[data-tpl="x-verdebolon"] .vb-sec{padding:8px 18px 0;scroll-margin-top:66px;}
  body[data-tpl="x-verdebolon"] .vb-cat{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:27px;text-align:center;margin:22px 0 4px;
  }
  body[data-tpl="x-verdebolon"] .vb-cat.vb-cv{color:var(--vb-verde);}
  body[data-tpl="x-verdebolon"] .vb-cat.vb-cr{color:var(--vb-rojo);}
  body[data-tpl="x-verdebolon"] .vb-cat .vb-grano{
    font-family:'Bitter',serif;font-style:normal;font-size:12px;
    color:var(--vb-choco);opacity:.5;vertical-align:middle;margin:0 9px;
  }

  /* filas con puntada, sin caja */
  body[data-tpl="x-verdebolon"] .vb-row{
    display:flex;gap:13px;align-items:center;padding:15px 2px;
    border-bottom:2px dashed rgba(71,41,25,.42);
  }
  body[data-tpl="x-verdebolon"] .vb-media{
    flex:0 0 auto;width:56px;height:56px;border-radius:50%;overflow:hidden;
    background:var(--vb-claro);border:2px solid var(--vb-choco);
    outline:1px solid rgba(71,41,25,.45);outline-offset:3px;
    display:flex;align-items:center;justify-content:center;font-size:26px;
  }
  body[data-tpl="x-verdebolon"] .vb-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-verdebolon"] .vb-body{flex:1;min-width:0;}
  body[data-tpl="x-verdebolon"] .vb-nom{
    font-weight:700;font-size:15px;line-height:1.25;color:var(--vb-tinta);
  }
  body[data-tpl="x-verdebolon"] .vb-desc{
    font-style:italic;font-weight:400;font-size:12.5px;color:#6B5238;line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-verdebolon"] .vb-foot{
    display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;
  }
  body[data-tpl="x-verdebolon"] .vb-precio{
    font-weight:800;font-size:15.5px;color:var(--vb-rojo);
    border-bottom:2px dashed var(--vb-rojo);padding-bottom:1px;white-space:nowrap;
  }

  /* steppers verdes */
  body[data-tpl="x-verdebolon"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-verdebolon"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid #2C5A25;cursor:pointer;
    background:var(--vb-verde);color:var(--vb-perg);font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 3px 0 #2C5A25;
  }
  body[data-tpl="x-verdebolon"] [data-add]:active{transform:translateY(2px);box-shadow:0 1px 0 #2C5A25;}
  body[data-tpl="x-verdebolon"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:2px solid var(--vb-verde);
    background:transparent;color:var(--vb-verde);font-size:17px;font-weight:800;
    display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-verdebolon"] [data-cant]{
    display:none;font-family:'Bitter',serif;font-weight:800;font-size:15px;
    color:var(--vb-choco);min-width:18px;text-align:center;
  }
  body[data-tpl="x-verdebolon"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-verdebolon"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-verdebolon"] .vb-fin{
    text-align:center;padding:30px 16px 12px;
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:19px;color:var(--vb-choco);
  }

  /* carrito */
  body[data-tpl="x-verdebolon"] #cart-fab{
    background:var(--vb-choco) !important;color:var(--vb-perg) !important;
    border:2px dashed var(--vb-crema) !important;border-radius:12px !important;
    font-family:'Bitter',Georgia,serif !important;font-weight:700 !important;
    box-shadow:0 5px 0 #2A1810, 0 16px 28px rgba(42,24,16,.35) !important;
  }
  body[data-tpl="x-verdebolon"] #cart-fab #fab-cant{background:var(--vb-crema) !important;color:var(--vb-choco) !important;}
  body[data-tpl="x-verdebolon"] #cart h2{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;color:var(--vb-choco);
  }
  body[data-tpl="x-verdebolon"] #cart .cart-row .st-add{background:var(--vb-verde) !important;color:var(--vb-perg) !important;}

  @media(max-width:380px){
    body[data-tpl="x-verdebolon"] .vb-tit{font-size:33px;}
    body[data-tpl="x-verdebolon"] .vb-insignia{width:100px;height:100px;font-size:44px;}
    body[data-tpl="x-verdebolon"] .vb-cat{font-size:23px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const cats = R.menu || [];

    // Nombre bicolor: primera mitad en verde script, segunda mitad en rojo (sello de la marca)
    const palabras = (R.nombre || "").trim().split(/\s+/);
    const corte = Math.ceil(palabras.length / 2);
    const titulo = `<span class="vb-tv">${palabras.slice(0, corte).join(" ")}</span> <span class="vb-tr">${palabras.slice(corte).join(" ")}</span>`;

    const fila = (it, cat) => `
      <article class="vb-row">
        <div class="vb-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="vb-body">
          <div class="vb-nom">${it.nombre}</div>
          ${it.desc ? `<div class="vb-desc">${it.desc}</div>` : ``}
          <div class="vb-foot"><span class="vb-precio">$ ${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c, i) => `
      <section class="vb-sec" id="cat-${slug(c.categoria)}">
        <h2 class="vb-cat ${i % 2 === 0 ? "vb-cv" : "vb-cr"}"><span class="vb-grano">●</span>${c.categoria}<span class="vb-grano">●</span></h2>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || ""]).filter(Boolean);

    root.innerHTML = `
      <header class="vb-top">
        <div class="vb-eyebrow">Cafetería · Tradicional</div>
        <div class="vb-insignia-wrap">
          <div class="vb-vapor"><i></i><i></i><i></i></div>
          <div class="vb-insignia">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : "☕"}</div>
        </div>
        <h1 class="vb-tit">${titulo}</h1>
        <div class="vb-eyebrow vb-eyebrow-b">Riobamba</div>
        ${R.direccion ? `<div class="vb-dir">${R.direccion}</div>` : ``}
        ${meta.length ? `<div class="vb-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>` : ``}
      </header>
      <nav class="vb-nav">${nav}</nav>
      ${secciones}
      <div class="vb-fin">☕ De la olla, como siempre</div>`;

    const botones = [...root.querySelectorAll(".vb-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -75% 0px" });
      root.querySelectorAll(".vb-sec").forEach((s) => io.observe(s));
    }
  },
};
