/* x-verdebolon-n — "Verde Bolón de Noche" — plantilla EXCLUSIVA de Verde Bolón.
   La misma cafetería de la abuela con la luz apagada: café tostado casi negro
   como fondo, hero grande con la insignia de doble aro y el vapor en crema,
   nombre script bicolor en verde hoja y rojo teja aclarados para contraste AA,
   y la carta en una columna de tarjetas cosidas (puntada dashed, granos). */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-verdebolon-n"] = {
  label: "Verde Bolón de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@1,400;1,700&family=Bitter:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

  body[data-tpl="x-verdebolon-n"]{
    --vbn-noche:#1E1008; --vbn-carta:#332014; --vbn-crema:#E6D8AD; --vbn-claro:#F7EED3;
    --vbn-verde:#3E7A34; --vbn-verdeluz:#8FCF7A; --vbn-rojoluz:#E4737A; --vbn-humo:#C9B892;
    --vbn-borde:rgba(230,216,173,.22); --vbn-puntada:rgba(230,216,173,.4);
    background:var(--vbn-noche);
    background-image:
      repeating-linear-gradient(0deg, rgba(230,216,173,.03) 0 1px, transparent 1px 7px),
      repeating-linear-gradient(90deg, rgba(230,216,173,.02) 0 1px, transparent 1px 9px);
    color:var(--vbn-crema); font-family:'Bitter',Georgia,serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-verdebolon-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO ---------- */
  body[data-tpl="x-verdebolon-n"] .vbn-hero{
    min-height:clamp(330px, 50vh, 420px);
    display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
    padding:calc(22px + env(safe-area-inset-top)) 18px 26px;
    background:
      radial-gradient(rgba(230,216,173,.05) 1.5px, transparent 1.6px),
      radial-gradient(circle at 50% 0%, rgba(62,122,52,.18), transparent 60%),
      linear-gradient(180deg, #3A2416, var(--vbn-noche));
    background-size:17px 17px, 100% 100%, 100% 100%;
    border-bottom:2px dashed var(--vbn-puntada);
  }
  body[data-tpl="x-verdebolon-n"] .vbn-eyebrow{
    font-weight:700;font-size:11px;letter-spacing:.34em;text-transform:uppercase;
    color:var(--vbn-crema);opacity:.85;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-insignia-wrap{position:relative;display:inline-block;margin-top:36px;}
  body[data-tpl="x-verdebolon-n"] .vbn-vapor{
    position:absolute;top:-30px;left:50%;transform:translateX(-50%);
    display:flex;gap:10px;align-items:flex-end;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-vapor i{
    display:block;width:9px;border-left:3px solid rgba(230,216,173,.45);border-radius:50%;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-vapor i:nth-child(1){height:24px;transform:rotate(16deg);}
  body[data-tpl="x-verdebolon-n"] .vbn-vapor i:nth-child(2){height:32px;transform:rotate(-10deg);}
  body[data-tpl="x-verdebolon-n"] .vbn-vapor i:nth-child(3){height:21px;transform:rotate(20deg);}
  body[data-tpl="x-verdebolon-n"] .vbn-insignia{
    width:112px;height:112px;border-radius:50%;overflow:hidden;margin:0 auto;
    background:var(--vbn-carta);border:3px solid var(--vbn-crema);
    box-shadow:0 0 0 5px #3A2416, 0 0 0 7px rgba(230,216,173,.75), 0 14px 30px rgba(0,0,0,.5);
    display:flex;align-items:center;justify-content:center;font-size:50px;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-insignia img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-verdebolon-n"] .vbn-tit{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:42px;line-height:1.05;margin:16px 0 0;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-tit .vbn-tv{color:var(--vbn-verdeluz);}
  body[data-tpl="x-verdebolon-n"] .vbn-tit .vbn-tr{color:var(--vbn-rojoluz);}
  body[data-tpl="x-verdebolon-n"] .vbn-dir{
    font-size:12px;font-style:italic;color:var(--vbn-humo);margin-top:8px;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-promo{
    display:inline-block;margin-top:13px;font-weight:600;font-size:12px;letter-spacing:.05em;
    color:var(--vbn-crema);border:2px dashed rgba(230,216,173,.55);border-radius:6px;padding:7px 13px;
  }

  /* ---------- NAV NOCTURNA ---------- */
  body[data-tpl="x-verdebolon-n"] .vbn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:9px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;
    background:rgba(30,16,8,.93);backdrop-filter:blur(7px);
    border-bottom:2px dashed var(--vbn-puntada);
  }
  body[data-tpl="x-verdebolon-n"] .vbn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-verdebolon-n"] .vbn-nav button{
    flex:0 0 auto;font-family:'Bitter',Georgia,serif;font-weight:700;font-size:12.5px;
    letter-spacing:.04em;color:var(--vbn-crema);background:transparent;
    border:2px dashed rgba(230,216,173,.55);border-radius:999px;padding:8px 15px;
    cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-nav button.activa{
    background:var(--vbn-crema);color:#2A1810;border:2px solid var(--vbn-crema);
  }

  /* ---------- SECCIONES: UNA COLUMNA DE TARJETAS ---------- */
  body[data-tpl="x-verdebolon-n"] .vbn-sec{padding:6px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-verdebolon-n"] .vbn-cat{
    display:flex;align-items:center;gap:10px;
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:26px;margin:22px 0 13px;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-cat::after{
    content:"";flex:1;border-top:2px dashed var(--vbn-puntada);
  }
  body[data-tpl="x-verdebolon-n"] .vbn-cat.vbn-cv{color:var(--vbn-verdeluz);}
  body[data-tpl="x-verdebolon-n"] .vbn-cat.vbn-cr{color:var(--vbn-rojoluz);}
  body[data-tpl="x-verdebolon-n"] .vbn-cat .vbn-grano{
    font-family:'Bitter',serif;font-style:normal;font-size:11px;
    color:var(--vbn-crema);opacity:.55;
  }

  /* tarjeta horizontal cosida */
  body[data-tpl="x-verdebolon-n"] .vbn-card{
    display:flex;gap:12px;align-items:center;
    background:var(--vbn-carta);border:1px solid var(--vbn-borde);border-radius:16px;
    outline:1px dashed rgba(230,216,173,.18);outline-offset:-5px;
    padding:10px;margin-bottom:12px;
    box-shadow:0 6px 16px rgba(0,0,0,.35);
  }
  body[data-tpl="x-verdebolon-n"] .vbn-media{
    position:relative;flex:0 0 auto;width:78px;height:78px;border-radius:14px;overflow:hidden;
    background:radial-gradient(circle at 32% 28%, #4A2E1C, #2A1810);
    border:2px solid var(--vbn-borde);
    display:flex;align-items:center;justify-content:center;font-size:34px;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-media.vbn-emoji::after{
    content:"";position:absolute;inset:7px;border:1.5px dashed rgba(230,216,173,.35);border-radius:50%;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-verdebolon-n"] .vbn-body{flex:1;min-width:0;}
  body[data-tpl="x-verdebolon-n"] .vbn-nom{
    font-weight:700;font-size:15px;line-height:1.25;color:var(--vbn-claro);
  }
  body[data-tpl="x-verdebolon-n"] .vbn-desc{
    font-style:italic;font-weight:400;font-size:12px;color:var(--vbn-humo);line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-lado{
    flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:8px;
  }
  body[data-tpl="x-verdebolon-n"] .vbn-precio{
    font-weight:800;font-size:15px;color:var(--vbn-rojoluz);
    border-bottom:2px dashed var(--vbn-rojoluz);padding-bottom:1px;white-space:nowrap;
  }

  /* steppers verdes de la casa, aclarados para la noche */
  body[data-tpl="x-verdebolon-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-verdebolon-n"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid #5FA452;cursor:pointer;
    background:var(--vbn-verde);color:var(--vbn-claro);font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 3px 0 #234D1C;
  }
  body[data-tpl="x-verdebolon-n"] [data-add]:active{transform:translateY(2px);box-shadow:0 1px 0 #234D1C;}
  body[data-tpl="x-verdebolon-n"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:2px solid var(--vbn-verdeluz);
    background:transparent;color:var(--vbn-verdeluz);font-size:17px;font-weight:800;
    display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-verdebolon-n"] [data-cant]{
    display:none;font-family:'Bitter',serif;font-weight:800;font-size:15px;
    color:var(--vbn-crema);min-width:18px;text-align:center;
  }
  body[data-tpl="x-verdebolon-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-verdebolon-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-verdebolon-n"] .vbn-fin{
    text-align:center;padding:30px 16px 12px;
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;
    font-size:19px;color:var(--vbn-crema);
  }

  /* carrito */
  body[data-tpl="x-verdebolon-n"] #cart-fab{
    background:var(--vbn-crema) !important;color:#2A1810 !important;
    border:2px dashed #472919 !important;border-radius:12px !important;
    font-family:'Bitter',Georgia,serif !important;font-weight:700 !important;
    box-shadow:0 5px 0 #B7A67E, 0 16px 28px rgba(0,0,0,.5) !important;
  }
  body[data-tpl="x-verdebolon-n"] #cart-fab #fab-cant{background:#472919 !important;color:var(--vbn-crema) !important;}
  body[data-tpl="x-verdebolon-n"] #cart h2{
    font-family:'Lobster Two',cursive;font-style:italic;font-weight:700;color:#472919;
  }
  body[data-tpl="x-verdebolon-n"] #cart .cart-row .st-add{background:var(--vbn-verde) !important;color:var(--vbn-claro) !important;}

  @media(max-width:380px){
    body[data-tpl="x-verdebolon-n"] .vbn-tit{font-size:34px;}
    body[data-tpl="x-verdebolon-n"] .vbn-insignia{width:96px;height:96px;font-size:42px;}
    body[data-tpl="x-verdebolon-n"] .vbn-cat{font-size:22px;}
    body[data-tpl="x-verdebolon-n"] .vbn-media{width:70px;height:70px;font-size:30px;}
    body[data-tpl="x-verdebolon-n"] .vbn-lado{gap:6px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const cats = R.menu || [];

    // Nombre bicolor en script, aclarado para fondo oscuro — sello de la marca
    const palabras = (R.nombre || "").trim().split(/\s+/);
    const corte = Math.ceil(palabras.length / 2);
    const titulo = `<span class="vbn-tv">${palabras.slice(0, corte).join(" ")}</span> <span class="vbn-tr">${palabras.slice(corte).join(" ")}</span>`;

    const carta = (it, cat) => `
      <article class="vbn-card">
        <div class="vbn-media${it.foto ? "" : " vbn-emoji"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="vbn-body">
          <div class="vbn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="vbn-desc">${it.desc}</div>` : ``}
        </div>
        <div class="vbn-lado">
          <span class="vbn-precio">$ ${Number(it.precio).toFixed(2)}</span>
          ${ctrl(it.id)}
        </div>
      </article>`;

    const secciones = cats.map((c, i) => `
      <section class="vbn-sec" id="cat-${slug(c.categoria)}">
        <h2 class="vbn-cat ${i % 2 === 0 ? "vbn-cv" : "vbn-cr"}"><span class="vbn-grano">●</span>${c.categoria}</h2>
        ${(c.items || []).map((it) => carta(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="vbn-hero">
        <div class="vbn-eyebrow">${R.slogan || "Cafetería Tradicional"}</div>
        <div class="vbn-insignia-wrap">
          <div class="vbn-vapor"><i></i><i></i><i></i></div>
          <div class="vbn-insignia">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : "☕"}</div>
        </div>
        <h1 class="vbn-tit">${titulo}</h1>
        ${R.direccion ? `<div class="vbn-dir">${R.direccion}</div>` : ``}
        ${R.promo ? `<div class="vbn-promo">${R.promo}</div>` : ``}
      </header>
      <nav class="vbn-nav">${nav}</nav>
      ${secciones}
      <div class="vbn-fin">☕ De la olla, como siempre</div>`;

    const botones = [...root.querySelectorAll(".vbn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -72% 0px" });
      root.querySelectorAll(".vbn-sec").forEach((s) => io.observe(s));
    }
  },
};
