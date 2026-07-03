/* x-gitano-v — "Vitrina Gitano" — plantilla EXCLUSIVA de Gitano Resto Bar & Grill.
   Variante VITRINA: grid de 2 columnas de tiles verticales con la media cuadrada
   arriba y el stepper dorado flotando sobre la esquina. Mantiene el vocabulario
   de "La Casa del Toro": vino profundo, oro, regla doble, ❧ y medallón con aro. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-gitano-v"] = {
  label: "Vitrina Gitano",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap');

  body[data-tpl="x-gitano-v"]{
    --gv-vino:#4C0D20; --gv-vino2:#3A0917; --gv-claro:#5C1428; --gv-crema:#F5EDE6;
    --gv-oro:#C9A15E; --gv-oroclaro:#E8C88F;
    background:radial-gradient(120% 60% at 50% 0%, #5C1428 0%, var(--gv-vino) 55%, var(--gv-vino2) 100%);
    background-attachment:fixed;
    color:var(--gv-crema); font-family:'Cormorant Garamond',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-gitano-v"] #app{overflow-x:hidden;}

  /* ---------- HEADER COMPACTO DE BARRA ---------- */
  body[data-tpl="x-gitano-v"] .gv-top{
    position:relative; overflow:hidden;
    display:flex; align-items:center; gap:13px;
    background:linear-gradient(180deg, rgba(58,9,23,.98), rgba(58,9,23,.9));
    border-bottom:1px solid rgba(201,161,94,.45);
    padding:calc(12px + env(safe-area-inset-top)) 16px 12px;
  }
  body[data-tpl="x-gitano-v"] .gv-top::after{
    content:"❧"; position:absolute; right:14px; top:50%; transform:translateY(-50%);
    font-size:28px; color:rgba(201,161,94,.28); pointer-events:none;
  }
  body[data-tpl="x-gitano-v"] .gv-logo{
    flex:0 0 auto; width:46px; height:46px; border-radius:50%; overflow:hidden;
    border:1.5px solid rgba(201,161,94,.65); padding:2px; background:var(--gv-vino2);
    display:flex; align-items:center; justify-content:center; font-size:22px;
  }
  body[data-tpl="x-gitano-v"] .gv-logo img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-gitano-v"] .gv-tit{min-width:0;}
  body[data-tpl="x-gitano-v"] .gv-nombre{
    font-family:'Playfair Display',serif; font-weight:800; font-size:23px;
    letter-spacing:.14em; text-transform:uppercase; line-height:1; color:#fff;
  }
  body[data-tpl="x-gitano-v"] .gv-doble{
    width:58px; height:4px; margin:5px 0 4px;
    border-top:2px solid var(--gv-oro); border-bottom:1px solid var(--gv-oro); opacity:.8;
  }
  body[data-tpl="x-gitano-v"] .gv-linea{
    font-style:italic; font-size:13.5px; color:rgba(245,237,230,.8);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }

  /* ---------- NAV DE CHIPS STICKY ---------- */
  body[data-tpl="x-gitano-v"] .gv-nav{
    position:sticky; top:0; z-index:30;
    display:flex; gap:8px; overflow-x:auto; padding:10px 14px; scrollbar-width:none;
    background:linear-gradient(180deg, rgba(58,9,23,.97), rgba(58,9,23,.9));
    border-bottom:1px solid rgba(201,161,94,.4);
  }
  body[data-tpl="x-gitano-v"] .gv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-gitano-v"] .gv-nav button{
    flex:0 0 auto; cursor:pointer; white-space:nowrap;
    font-family:'Playfair Display',serif; font-weight:600; font-size:11.5px;
    letter-spacing:.16em; text-transform:uppercase;
    color:rgba(245,237,230,.75); background:rgba(255,255,255,.04);
    border:1px solid rgba(201,161,94,.4); border-radius:999px; padding:8px 14px;
  }
  body[data-tpl="x-gitano-v"] .gv-nav button.activa{
    background:var(--gv-oro); border-color:var(--gv-oro); color:#3A0917; font-weight:700;
    box-shadow:0 8px 18px -8px rgba(201,161,94,.6);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-gitano-v"] .gv-sec{padding:2px 16px 0;scroll-margin-top:64px;}
  body[data-tpl="x-gitano-v"] .gv-cat{text-align:center;margin:24px 0 12px;}
  body[data-tpl="x-gitano-v"] .gv-cat .orn{color:var(--gv-oro);font-size:14px;letter-spacing:.4em;}
  body[data-tpl="x-gitano-v"] .gv-cat h2{
    font-family:'Playfair Display',serif; font-weight:700; font-size:19px;
    letter-spacing:.2em; text-transform:uppercase; color:#fff; margin-top:4px;
  }
  body[data-tpl="x-gitano-v"] .gv-cat .doble{
    width:min(170px,58%); margin:9px auto 0; height:4px; opacity:.65;
    border-top:2px solid var(--gv-crema); border-bottom:1px solid var(--gv-crema);
  }

  /* ---------- GRID VITRINA 2 COLUMNAS ---------- */
  body[data-tpl="x-gitano-v"] .gv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px 12px;}
  body[data-tpl="x-gitano-v"] .gv-tile{
    background:rgba(255,255,255,.05); border:1px solid rgba(201,161,94,.4);
    border-radius:12px; overflow:visible;
    box-shadow:0 16px 34px -20px rgba(0,0,0,.8);
  }
  body[data-tpl="x-gitano-v"] .gv-mediaw{position:relative;}
  body[data-tpl="x-gitano-v"] .gv-media{
    position:relative; aspect-ratio:1/1; border-radius:11px 11px 0 0; overflow:hidden;
    background:var(--gv-claro); display:flex; align-items:center; justify-content:center;
  }
  body[data-tpl="x-gitano-v"] .gv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-gitano-v"] .gv-media.sin-foto{
    background:radial-gradient(circle at 50% 38%, #6B1A30, var(--gv-vino) 78%);
    font-size:52px;
  }
  body[data-tpl="x-gitano-v"] .gv-media.sin-foto::before{
    content:""; position:absolute; inset:14%; border:1.5px solid rgba(201,161,94,.45);
    border-radius:50%; pointer-events:none;
  }
  body[data-tpl="x-gitano-v"] .gv-media.sin-foto::after{
    content:"❧"; position:absolute; left:50%; bottom:7px; transform:translateX(-50%);
    font-size:11px; color:rgba(201,161,94,.55);
  }

  /* stepper flotante sobre la esquina de la media */
  body[data-tpl="x-gitano-v"] .gv-ctrl{
    position:absolute; right:8px; bottom:-13px; z-index:2;
    display:flex; align-items:center; gap:5px;
  }
  body[data-tpl="x-gitano-v"] .gv-ctrl [data-qtywrap]{
    display:none; align-items:center; gap:4px;
    background:var(--gv-vino2); border:1px solid rgba(201,161,94,.55);
    border-radius:999px; padding:2px 4px 2px 2px;
    box-shadow:0 8px 18px -8px rgba(0,0,0,.75);
  }
  body[data-tpl="x-gitano-v"] .gv-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-gitano-v"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;
    background:var(--gv-oro);color:#3A0917;font-size:20px;font-weight:700;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 16px -4px rgba(201,161,94,.5);
  }
  body[data-tpl="x-gitano-v"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-gitano-v"] [data-sub]{
    width:26px;height:26px;border-radius:50%;border:1px solid rgba(245,237,230,.5);
    background:transparent;color:var(--gv-crema);
    font-size:16px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-gitano-v"] [data-cant]{
    font-family:'Playfair Display';font-weight:700;font-size:13.5px;color:#fff;
    min-width:15px;text-align:center;
  }

  /* cuerpo del tile */
  body[data-tpl="x-gitano-v"] .gv-body{padding:18px 12px 13px;border-top:1px solid rgba(201,161,94,.25);}
  body[data-tpl="x-gitano-v"] .gv-nom{
    font-family:'Playfair Display',serif;font-weight:600;font-size:13.5px;line-height:1.3;color:#fff;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:35px;
  }
  body[data-tpl="x-gitano-v"] .gv-precio{
    margin-top:7px;display:inline-block;padding-top:5px;
    border-top:1px solid rgba(201,161,94,.5);
    font-family:'Playfair Display',serif;font-weight:700;font-size:16px;color:var(--gv-oroclaro);
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  body[data-tpl="x-gitano-v"] .gv-fin{
    text-align:center;padding:34px 0 10px;color:var(--gv-oro);
    font-family:'Playfair Display',serif;font-size:12.5px;letter-spacing:.34em;text-transform:uppercase;
  }

  /* carrito */
  body[data-tpl="x-gitano-v"] #cart-fab{
    background:var(--gv-oro) !important;color:#3A0917 !important;border-radius:14px !important;
    font-family:'Playfair Display',serif !important;font-weight:700 !important;
    box-shadow:0 14px 34px rgba(0,0,0,.45) !important;
  }
  body[data-tpl="x-gitano-v"] #cart-fab #fab-cant{background:#3A0917 !important;color:var(--gv-oroclaro) !important;}
  body[data-tpl="x-gitano-v"] #cart h2{font-family:'Playfair Display',serif;}
  body[data-tpl="x-gitano-v"] #cart .cart-row .st-add{background:var(--gv-oro) !important;color:#3A0917 !important;}

  @media(max-width:380px){
    body[data-tpl="x-gitano-v"] .gv-nombre{font-size:20px;}
    body[data-tpl="x-gitano-v"] .gv-cat h2{font-size:17px;}
    body[data-tpl="x-gitano-v"] .gv-grid{gap:14px 10px;}
    body[data-tpl="x-gitano-v"] .gv-media.sin-foto{font-size:46px;}
    body[data-tpl="x-gitano-v"] .gv-nom{font-size:12.5px;min-height:33px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥩"));
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="gv-tile">
        <div class="gv-mediaw">
          <div class="gv-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="gv-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="gv-body">
          <div class="gv-nom">${it.nombre}</div>
          <div class="gv-precio">$${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="gv-sec" id="cat-${slug(c.categoria)}">
        <div class="gv-cat"><div class="orn">❧</div><h2>${c.categoria}</h2><div class="doble"></div></div>
        <div class="gv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="gv-top">
        <div class="gv-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : (R.emojiDefault || "🥩")}</div>
        <div class="gv-tit">
          <h1 class="gv-nombre">${R.nombre}</h1>
          <div class="gv-doble"></div>
          <div class="gv-linea">${R.promo || R.direccion || ""}</div>
        </div>
      </header>
      <nav class="gv-nav">${nav}</nav>
      ${secciones}
      <div class="gv-fin">— ${R.nombre} —</div>`;

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".gv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".gv-sec").forEach((s) => io.observe(s));
    }
  },
};
