/* x-gitano-n — "Gitano de Día" — plantilla EXCLUSIVA de Gitano Resto Bar & Grill.
   Versión DE DÍA de "La Casa del Toro": la misma casta del flagship (Playfair,
   regla doble, ❧, medallón con aro dorado, regla fina de precios) pero sobre
   crema cálida. Hero grande de apertura y menú en una columna de tarjetas
   horizontales con la media redondeada a la izquierda. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-gitano-n"] = {
  label: "Gitano de Día",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap');

  body[data-tpl="x-gitano-n"]{
    --gd-vino:#4C0D20; --gd-vino2:#3A0917; --gd-crema:#F5EDE6; --gd-marfil:#FFFDFA;
    --gd-oro:#C9A15E; --gd-bronce:#8A5A25; --gd-borde:rgba(76,13,32,.14);
    background:radial-gradient(120% 60% at 50% 0%, #FFFDF9 0%, var(--gd-crema) 55%, #EDE1D3 100%);
    background-attachment:fixed;
    color:var(--gd-vino); font-family:'Cormorant Garamond',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-gitano-n"] #app{overflow-x:hidden;}

  /* ---------- HERO DE DÍA ---------- */
  body[data-tpl="x-gitano-n"] .gd-hero{
    position:relative; overflow:hidden; height:50vh; max-height:420px; min-height:310px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:calc(22px + env(safe-area-inset-top)) 24px 30px;
    background:radial-gradient(circle at 50% -32%, #FFF9F0, rgba(245,237,230,0) 62%);
    border-bottom:1px solid rgba(201,161,94,.55);
  }
  body[data-tpl="x-gitano-n"] .gd-hero::before{
    content:""; position:absolute; left:50%; top:-120px; transform:translateX(-50%);
    width:min(430px,120vw); aspect-ratio:1/1; border-radius:50%;
    border:1.5px solid rgba(201,161,94,.3); pointer-events:none;
  }
  body[data-tpl="x-gitano-n"] .gd-hero::after{
    content:"❧"; position:absolute; left:50%; bottom:9px; transform:translateX(-50%);
    font-size:14px; color:rgba(201,161,94,.55);
  }
  body[data-tpl="x-gitano-n"] .gd-hero > *{position:relative;z-index:1;}
  body[data-tpl="x-gitano-n"] .gd-logo{
    width:88px;height:88px;border-radius:50%;overflow:hidden;margin:0 auto 6px;
    border:1.5px solid rgba(201,161,94,.7); padding:3px; background:var(--gd-marfil);
    box-shadow:0 14px 30px -16px rgba(76,13,32,.4);
  }
  body[data-tpl="x-gitano-n"] .gd-logo img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-gitano-n"] .gd-tipo{
    font-family:'Playfair Display',serif;font-size:12.5px;letter-spacing:.34em;text-transform:uppercase;
    color:var(--gd-bronce);margin-top:6px;
  }
  body[data-tpl="x-gitano-n"] .gd-nombre{
    font-family:'Playfair Display',serif;font-weight:800;font-size:44px;letter-spacing:.16em;
    text-transform:uppercase;line-height:1;color:var(--gd-vino);margin-top:8px;
  }
  body[data-tpl="x-gitano-n"] .gd-doble{
    width:min(300px,76%);margin:12px auto 0;height:5px;opacity:.75;
    border-top:2px solid var(--gd-vino);border-bottom:1px solid var(--gd-vino);
  }
  body[data-tpl="x-gitano-n"] .gd-lema{font-style:italic;font-size:17px;color:rgba(76,13,32,.8);margin-top:9px;}
  body[data-tpl="x-gitano-n"] .gd-promo{
    margin-top:13px;display:inline-block;font-weight:600;font-size:14.5px;color:var(--gd-vino);
    border:1px solid rgba(201,161,94,.6);background:var(--gd-marfil);border-radius:999px;padding:7px 16px;
  }

  /* ---------- NAV STICKY (pestañas cuadradas de imprenta) ---------- */
  body[data-tpl="x-gitano-n"] .gd-nav{
    position:sticky; top:0; z-index:30; background:rgba(245,237,230,.96); backdrop-filter:blur(6px);
    display:flex; gap:8px; overflow-x:auto; padding:11px 16px; scrollbar-width:none;
    border-bottom:1px solid rgba(201,161,94,.5);
  }
  body[data-tpl="x-gitano-n"] .gd-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-gitano-n"] .gd-nav button{
    flex:0 0 auto; cursor:pointer; white-space:nowrap;
    font-family:'Playfair Display',serif; font-weight:600; font-size:11.5px;
    letter-spacing:.16em; text-transform:uppercase;
    color:rgba(76,13,32,.72); background:transparent;
    border:1px solid rgba(76,13,32,.28); border-radius:4px; padding:8px 14px;
  }
  body[data-tpl="x-gitano-n"] .gd-nav button.activa{
    background:var(--gd-vino); border-color:var(--gd-vino); color:var(--gd-crema);
    box-shadow:0 10px 20px -10px rgba(76,13,32,.5);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-gitano-n"] .gd-sec{padding:4px 18px 0;scroll-margin-top:66px;}
  body[data-tpl="x-gitano-n"] .gd-cat{text-align:center;margin:26px 0 12px;}
  body[data-tpl="x-gitano-n"] .gd-cat .orn{color:var(--gd-oro);font-size:14px;letter-spacing:.4em;}
  body[data-tpl="x-gitano-n"] .gd-cat h2{
    font-family:'Playfair Display',serif;font-weight:700;font-size:20px;
    letter-spacing:.2em;text-transform:uppercase;color:var(--gd-vino);margin-top:4px;
  }

  /* ---------- TARJETAS HORIZONTALES (1 columna) ---------- */
  body[data-tpl="x-gitano-n"] .gd-item{
    display:grid; grid-template-columns:86px 1fr auto; gap:13px; align-items:center;
    background:var(--gd-marfil); border:1px solid var(--gd-borde); border-radius:18px;
    padding:11px 13px; margin-bottom:12px;
    box-shadow:0 18px 34px -24px rgba(76,13,32,.35);
  }
  body[data-tpl="x-gitano-n"] .gd-media{
    position:relative; width:86px; height:86px; border-radius:16px; overflow:hidden;
    background:radial-gradient(circle at 50% 36%, #F8EFE4, #EFE0CE 78%);
    display:flex; align-items:center; justify-content:center; font-size:36px;
  }
  body[data-tpl="x-gitano-n"] .gd-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-gitano-n"] .gd-media.sin-foto::before{
    content:""; position:absolute; inset:12%; border:1.5px solid rgba(201,161,94,.5);
    border-radius:50%; pointer-events:none;
  }
  body[data-tpl="x-gitano-n"] .gd-nom{
    font-family:'Playfair Display',serif;font-weight:600;font-size:15.5px;line-height:1.25;color:var(--gd-vino);
  }
  body[data-tpl="x-gitano-n"] .gd-desc{
    font-style:italic;font-size:13.5px;color:rgba(76,13,32,.68);line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-gitano-n"] .gd-right{
    display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:8px;
    align-self:stretch;border-left:1px solid rgba(201,161,94,.55);padding-left:13px;
  }
  body[data-tpl="x-gitano-n"] .gd-precio{
    font-family:'Playfair Display',serif;font-weight:700;font-size:16.5px;color:var(--gd-bronce);
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-gitano-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-gitano-n"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;
    background:var(--gd-oro);color:#3A0917;font-size:20px;font-weight:700;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 8px 18px -6px rgba(138,90,37,.55);
  }
  body[data-tpl="x-gitano-n"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-gitano-n"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:1px solid rgba(76,13,32,.4);
    background:transparent;color:var(--gd-vino);
    font-size:17px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-gitano-n"] [data-cant]{
    display:none;font-family:'Playfair Display';font-weight:700;font-size:14.5px;color:var(--gd-vino);
    min-width:16px;text-align:center;
  }
  body[data-tpl="x-gitano-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-gitano-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-gitano-n"] .gd-fin{
    text-align:center;padding:34px 0 10px;color:var(--gd-bronce);
    font-family:'Playfair Display',serif;font-size:12.5px;letter-spacing:.34em;text-transform:uppercase;
  }

  /* carrito */
  body[data-tpl="x-gitano-n"] #cart-fab{
    background:var(--gd-vino) !important;color:var(--gd-crema) !important;border-radius:14px !important;
    font-family:'Playfair Display',serif !important;font-weight:700 !important;
    box-shadow:0 14px 34px -8px rgba(76,13,32,.55) !important;
  }
  body[data-tpl="x-gitano-n"] #cart-fab #fab-cant{background:var(--gd-oro) !important;color:#3A0917 !important;}
  body[data-tpl="x-gitano-n"] #cart h2{font-family:'Playfair Display',serif;}
  body[data-tpl="x-gitano-n"] #cart .cart-row .st-add{background:var(--gd-oro) !important;color:#3A0917 !important;}

  @media(max-width:380px){
    body[data-tpl="x-gitano-n"] .gd-hero{min-height:290px;}
    body[data-tpl="x-gitano-n"] .gd-nombre{font-size:34px;}
    body[data-tpl="x-gitano-n"] .gd-cat h2{font-size:18px;}
    body[data-tpl="x-gitano-n"] .gd-item{grid-template-columns:72px 1fr auto;gap:10px;}
    body[data-tpl="x-gitano-n"] .gd-media{width:72px;height:72px;font-size:31px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥩"));
    const cats = R.menu || [];
    const partes = (R.slogan || "").split("·").map((s) => s.trim());

    const fila = (it, cat) => `
      <article class="gd-item">
        <div class="gd-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div><div class="gd-nom">${it.nombre}</div>${it.desc ? `<div class="gd-desc">${it.desc}</div>` : ``}</div>
        <div class="gd-right"><span class="gd-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="gd-sec" id="cat-${slug(c.categoria)}">
        <div class="gd-cat"><div class="orn">❧</div><h2>${c.categoria}</h2></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="gd-hero">
        ${R.logo ? `<div class="gd-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="gd-tipo">${partes[0] || "Resto Bar & Grill"}</div>
        <h1 class="gd-nombre">${R.nombre}</h1>
        <div class="gd-doble"></div>
        <div class="gd-lema">${partes[1] || "Excelencia en sabor y calidad"}</div>
        ${R.promo ? `<div class="gd-promo">${R.promo}</div>` : ``}
      </header>
      <nav class="gd-nav">${nav}</nav>
      ${secciones}
      <div class="gd-fin">— Buen provecho —</div>`;

    /* pestaña activa al scrollear */
    const botones = [...root.querySelectorAll(".gd-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -72% 0px" });
      root.querySelectorAll(".gd-sec").forEach((s) => io.observe(s));
    }
  },
};
