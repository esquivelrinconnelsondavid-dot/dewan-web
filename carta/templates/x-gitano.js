/* x-gitano — "La Casa del Toro" — plantilla EXCLUSIVA de Gitano Resto Bar & Grill.
   Vino profundo del logo, serif clásica de steakhouse, columna de precios
   con regla fina: una carta de cortes con casta. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-gitano"] = {
  label: "La Casa del Toro",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap');

  body[data-tpl="x-gitano"]{
    --gt-vino:#4C0D20; --gt-vino2:#3A0917; --gt-crema:#F5EDE6; --gt-oro:#C9A15E;
    background:radial-gradient(120% 60% at 50% 0%, #5C1428 0%, var(--gt-vino) 55%, var(--gt-vino2) 100%);
    background-attachment:fixed;
    color:var(--gt-crema); font-family:'Cormorant Garamond',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-gitano"] #app{overflow-x:hidden;}

  /* ---------- PORTADA ---------- */
  body[data-tpl="x-gitano"] .gt-top{
    text-align:center; padding:calc(26px + env(safe-area-inset-top)) 22px 8px; position:relative;
  }
  body[data-tpl="x-gitano"] .gt-logo{
    width:132px;height:132px;margin:0 auto 6px;border-radius:50%;overflow:hidden;
    border:1.5px solid rgba(201,161,94,.55); padding:4px;
  }
  body[data-tpl="x-gitano"] .gt-logo img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-gitano"] .gt-nombre{
    font-family:'Playfair Display',serif;font-weight:800;font-size:42px;letter-spacing:.16em;
    text-transform:uppercase;line-height:1;margin-top:10px;
  }
  body[data-tpl="x-gitano"] .gt-doble{
    width:min(320px,80%);margin:12px auto 0;border-top:2px solid var(--gt-crema);border-bottom:1px solid var(--gt-crema);height:5px;opacity:.85;
  }
  body[data-tpl="x-gitano"] .gt-tipo{
    font-family:'Playfair Display',serif;font-size:15px;letter-spacing:.34em;text-transform:uppercase;margin-top:11px;
  }
  body[data-tpl="x-gitano"] .gt-lema{
    font-style:italic;font-size:16.5px;color:rgba(245,237,230,.85);margin-top:7px;
  }
  body[data-tpl="x-gitano"] .gt-datos{
    display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-top:14px;
    font-size:13.5px;color:rgba(245,237,230,.75);
  }
  body[data-tpl="x-gitano"] .gt-datos span{display:inline-flex;align-items:center;gap:6px;}

  /* ---------- NAV serif ---------- */
  body[data-tpl="x-gitano"] .gt-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:2px;overflow-x:auto;justify-content:flex-start;
    padding:12px 14px 0;scrollbar-width:none;
    background:linear-gradient(180deg, rgba(58,9,23,.97), rgba(58,9,23,.88));
    border-bottom:1px solid rgba(201,161,94,.4);
    margin-top:18px;
  }
  body[data-tpl="x-gitano"] .gt-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-gitano"] .gt-nav button{
    flex:0 0 auto;background:none;border:none;cursor:pointer;
    font-family:'Playfair Display',serif;font-weight:600;font-size:12.5px;letter-spacing:.18em;text-transform:uppercase;
    color:rgba(245,237,230,.6);padding:9px 12px 13px;border-bottom:2px solid transparent;white-space:nowrap;
  }
  body[data-tpl="x-gitano"] .gt-nav button.activa{color:#fff;border-bottom-color:var(--gt-oro);}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-gitano"] .gt-sec{padding:8px 22px 0;scroll-margin-top:64px;}
  body[data-tpl="x-gitano"] .gt-cat{text-align:center;margin:28px 0 10px;}
  body[data-tpl="x-gitano"] .gt-cat .orn{color:var(--gt-oro);font-size:15px;letter-spacing:.4em;}
  body[data-tpl="x-gitano"] .gt-cat h2{
    font-family:'Playfair Display',serif;font-weight:700;font-size:22px;letter-spacing:.2em;text-transform:uppercase;
    margin-top:6px;
  }

  /* ---------- FILAS con columna de precio ---------- */
  body[data-tpl="x-gitano"] .gt-item{
    display:grid;grid-template-columns:44px 1fr auto;gap:13px;align-items:center;
    padding:14px 0;border-bottom:1px solid rgba(245,237,230,.14);
  }
  body[data-tpl="x-gitano"] .gt-item:last-child{border-bottom:none;}
  body[data-tpl="x-gitano"] .gt-media{
    width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.07);
    display:flex;align-items:center;justify-content:center;font-size:20px;overflow:hidden;position:relative;
    border:1px solid rgba(201,161,94,.35);
  }
  body[data-tpl="x-gitano"] .gt-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-gitano"] .gt-nom{font-family:'Playfair Display',serif;font-weight:600;font-size:16px;line-height:1.25;color:#fff;}
  body[data-tpl="x-gitano"] .gt-desc{font-style:italic;font-size:13.5px;color:rgba(245,237,230,.62);line-height:1.4;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-gitano"] .gt-right{
    display:flex;flex-direction:column;align-items:flex-end;gap:8px;
    border-left:1px solid rgba(201,161,94,.4);padding-left:13px;
  }
  body[data-tpl="x-gitano"] .gt-precio{font-family:'Playfair Display',serif;font-weight:700;font-size:16.5px;color:#E8C88F;font-variant-numeric:tabular-nums;white-space:nowrap;}

  /* steppers */
  body[data-tpl="x-gitano"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-gitano"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;
    background:var(--gt-oro);color:#3A0917;font-size:20px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 16px -4px rgba(201,161,94,.5);
  }
  body[data-tpl="x-gitano"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-gitano"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:1px solid rgba(245,237,230,.5);background:transparent;color:var(--gt-crema);
    font-size:17px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-gitano"] [data-cant]{display:none;font-family:'Playfair Display';font-weight:700;font-size:14.5px;color:#fff;min-width:16px;text-align:center;}
  body[data-tpl="x-gitano"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-gitano"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-gitano"] .gt-fin{
    text-align:center;padding:36px 0 12px;color:var(--gt-oro);
    font-family:'Playfair Display',serif;font-size:13px;letter-spacing:.34em;text-transform:uppercase;
  }

  /* carrito */
  body[data-tpl="x-gitano"] #cart-fab{
    background:var(--gt-oro) !important;color:#3A0917 !important;border-radius:14px !important;
    font-family:'Playfair Display',serif !important;font-weight:700 !important;
    box-shadow:0 14px 34px rgba(0,0,0,.45) !important;
  }
  body[data-tpl="x-gitano"] #cart-fab #fab-cant{background:#3A0917 !important;color:#E8C88F !important;}
  body[data-tpl="x-gitano"] #cart h2{font-family:'Playfair Display',serif;}
  body[data-tpl="x-gitano"] #cart .cart-row .st-add{background:var(--gt-oro) !important;color:#3A0917 !important;}

  @media(max-width:380px){
    body[data-tpl="x-gitano"] .gt-nombre{font-size:34px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥩"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="gt-item">
        <div class="gt-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div><div class="gt-nom">${it.nombre}</div>${it.desc ? `<div class="gt-desc">${it.desc}</div>` : ``}</div>
        <div class="gt-right"><span class="gt-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="gt-sec" id="cat-${slug(c.categoria)}">
        <div class="gt-cat"><div class="orn">❧</div><h2>${c.categoria}</h2></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const partes = (R.slogan || "").split("·").map((s) => s.trim());

    root.innerHTML = `
      <header class="gt-top">
        ${R.logo ? `<div class="gt-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="gt-nombre">${R.nombre}</h1>
        <div class="gt-doble"></div>
        <div class="gt-tipo">${partes[0] || "Resto Bar & Grill"}</div>
        <div class="gt-lema">${partes[1] || "Excelencia en sabor y calidad"}</div>
        <div class="gt-datos">
          ${R.direccion ? `<span>📍 ${R.direccion.split("·")[0].trim()}</span>` : ``}
          <span>🕐 Lunes a sábado</span>
        </div>
      </header>
      <nav class="gt-nav">${nav}</nav>
      ${secciones}
      <div class="gt-fin">— ${R.nombre} —</div>`;

    const botones = [...root.querySelectorAll(".gt-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -75% 0px" });
      root.querySelectorAll(".gt-sec").forEach((s) => io.observe(s));
    }
  },
};
