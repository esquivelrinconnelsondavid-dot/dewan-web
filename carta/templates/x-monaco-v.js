/* x-monaco-v — "Vitrina Mônaco" — plantilla EXCLUSIVA de Mônaco Parrillada & Pizza.
   Variante VITRINA: grid de 2 columnas de tiles verticales con la media cuadrada
   arriba y el stepper flotando sobre la esquina. Mantiene el vocabulario del
   flagship "El Domo": naranja domo, crema, arcos, rombo ◆ y caligrafía. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-monaco-v"] = {
  label: "Vitrina Mônaco",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Prata&family=Italianno&family=Jost:wght@400;500;600;700&display=swap');

  body[data-tpl="x-monaco-v"]{
    --mo-naranja:#FC6608; --mo-quemado:#C0491A; --mo-tinta:#332014; --mo-crema:#FFF7ED;
    background:var(--mo-crema); color:var(--mo-tinta);
    font-family:'Jost',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-monaco-v"] #app{overflow-x:hidden;}

  /* ---------- HEADER COMPACTO DE BARRA ---------- */
  body[data-tpl="x-monaco-v"] .mv-top{
    position:relative; overflow:hidden;
    display:flex; align-items:center; gap:13px;
    background:linear-gradient(120deg,#FF7E1F,#FC6608 55%,#E85B05);
    padding:calc(14px + env(safe-area-inset-top)) 18px 16px; color:#fff;
    box-shadow:0 12px 28px -14px rgba(192,73,26,.55);
  }
  body[data-tpl="x-monaco-v"] .mv-top::before{
    content:""; position:absolute; right:-46px; top:-64px; width:170px; height:170px;
    border:1.5px solid rgba(255,255,255,.3); border-radius:50%; pointer-events:none;
  }
  body[data-tpl="x-monaco-v"] .mv-logo{
    flex:0 0 auto; width:46px; height:46px; border-radius:50%; overflow:hidden;
    border:2px solid rgba(255,255,255,.75); background:#FFEAD2;
    display:flex; align-items:center; justify-content:center; font-size:22px;
    box-shadow:0 6px 14px -6px rgba(120,40,0,.5);
  }
  body[data-tpl="x-monaco-v"] .mv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-monaco-v"] .mv-tit{min-width:0;}
  body[data-tpl="x-monaco-v"] .mv-nombre{
    font-family:'Italianno',cursive; font-size:38px; line-height:.9;
    text-shadow:0 2px 10px rgba(120,40,0,.35);
  }
  body[data-tpl="x-monaco-v"] .mv-linea{
    font-weight:600; font-size:11px; letter-spacing:.14em; text-transform:uppercase;
    opacity:.95; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }

  /* ---------- BUSCADOR ---------- */
  body[data-tpl="x-monaco-v"] .mv-search{padding:14px 16px 2px;}
  body[data-tpl="x-monaco-v"] .mv-search input{
    width:100%; border:1px solid #EFD9BF; background:#fff; border-radius:999px;
    padding:12px 18px; font-family:'Jost'; font-size:15.5px; color:var(--mo-tinta); outline:none;
  }
  body[data-tpl="x-monaco-v"] .mv-search input::placeholder{color:#C9A985;}

  /* ---------- NAV DE CHIPS STICKY ---------- */
  body[data-tpl="x-monaco-v"] .mv-nav{
    position:sticky; top:0; z-index:30; background:var(--mo-crema);
    display:flex; gap:8px; overflow-x:auto; padding:10px 16px; scrollbar-width:none;
    border-bottom:1px solid #F2DFC6;
  }
  body[data-tpl="x-monaco-v"] .mv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-monaco-v"] .mv-nav button{
    flex:0 0 auto; cursor:pointer; white-space:nowrap;
    font-family:'Jost'; font-weight:600; font-size:12.5px; letter-spacing:.08em; text-transform:uppercase;
    color:var(--mo-quemado); background:#fff; border:1px solid #EFD9BF; border-radius:999px;
    padding:8px 15px;
  }
  body[data-tpl="x-monaco-v"] .mv-nav button.activa{
    background:var(--mo-naranja); border-color:var(--mo-naranja); color:#fff;
    box-shadow:0 8px 18px -8px rgba(252,102,8,.65);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-monaco-v"] .mv-sec{padding:2px 16px 0;scroll-margin-top:64px;}
  body[data-tpl="x-monaco-v"] .mv-cat{display:flex;align-items:center;gap:14px;margin:22px 0 12px;}
  body[data-tpl="x-monaco-v"] .mv-cat::before, body[data-tpl="x-monaco-v"] .mv-cat::after{
    content:""; flex:1; height:1px; background:#EBD4B6;
  }
  body[data-tpl="x-monaco-v"] .mv-cat span{
    font-family:'Italianno',cursive; font-size:38px; line-height:1; color:var(--mo-naranja);
    text-align:center; max-width:75%;
  }

  /* ---------- GRID VITRINA 2 COLUMNAS ---------- */
  body[data-tpl="x-monaco-v"] .mv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px 12px;}
  body[data-tpl="x-monaco-v"] .mv-tile{
    background:#fff; border:1px solid #F4DFC8; border-radius:18px; overflow:visible;
    box-shadow:0 14px 30px -18px rgba(146,64,14,.3);
  }
  body[data-tpl="x-monaco-v"] .mv-mediaw{position:relative;}
  body[data-tpl="x-monaco-v"] .mv-media{
    position:relative; aspect-ratio:1/1; border-radius:17px 17px 0 0; overflow:hidden;
    background:#FFEAD2; display:flex; align-items:center; justify-content:center;
  }
  body[data-tpl="x-monaco-v"] .mv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-monaco-v"] .mv-media.sin-foto{
    background:radial-gradient(circle at 50% 34%,#FFDFB6,#FFEAD2 72%);
    font-size:52px;
  }
  body[data-tpl="x-monaco-v"] .mv-media.sin-foto::before{
    content:""; position:absolute; left:50%; top:12%; transform:translateX(-50%);
    width:76%; aspect-ratio:1/1; border:1.5px solid rgba(192,73,26,.28); border-radius:50%;
    clip-path:inset(0 0 55% 0);
  }
  body[data-tpl="x-monaco-v"] .mv-media.sin-foto::after{
    content:"◆"; position:absolute; left:50%; bottom:9px; transform:translateX(-50%);
    font-size:8px; color:rgba(192,73,26,.45);
  }

  /* stepper flotante sobre la esquina de la media */
  body[data-tpl="x-monaco-v"] .mv-ctrl{
    position:absolute; right:8px; bottom:-13px; z-index:2;
    display:flex; align-items:center; gap:5px;
  }
  body[data-tpl="x-monaco-v"] .mv-ctrl [data-qtywrap]{
    display:none; align-items:center; gap:4px;
    background:#fff; border:1px solid #F0D9BC; border-radius:999px; padding:2px 4px 2px 2px;
    box-shadow:0 8px 18px -8px rgba(146,64,14,.5);
  }
  body[data-tpl="x-monaco-v"] .mv-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-monaco-v"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:var(--mo-naranja);color:#fff;
    font-size:20px;font-weight:600;line-height:1;display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 8px 16px -5px rgba(252,102,8,.65);
  }
  body[data-tpl="x-monaco-v"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-monaco-v"] [data-sub]{
    width:26px;height:26px;border-radius:50%;border:1px solid #EBCBA4;background:#fff;color:var(--mo-quemado);
    font-size:16px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-monaco-v"] [data-cant]{
    font-family:'Prata';font-size:13.5px;color:var(--mo-tinta);min-width:15px;text-align:center;
  }

  /* cuerpo del tile */
  body[data-tpl="x-monaco-v"] .mv-body{padding:19px 12px 13px;border-top:1px dashed #F0D9BC;}
  body[data-tpl="x-monaco-v"] .mv-nom{
    font-family:'Prata',serif;font-size:13.5px;line-height:1.3;color:var(--mo-tinta);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:35px;
  }
  body[data-tpl="x-monaco-v"] .mv-precio{
    margin-top:7px;font-family:'Prata',serif;font-size:16px;color:var(--mo-quemado);
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  body[data-tpl="x-monaco-v"] .mv-none{display:none;text-align:center;color:#B08A66;font-weight:500;padding:34px 20px;}
  body[data-tpl="x-monaco-v"] .mv-hide{display:none !important;}
  body[data-tpl="x-monaco-v"] .mv-fin{
    text-align:center;padding:34px 0 10px;font-family:'Italianno',cursive;font-size:30px;color:#D9A878;
  }

  /* carrito */
  body[data-tpl="x-monaco-v"] #cart-fab{
    background:var(--mo-naranja) !important;color:#fff !important;border-radius:999px !important;
    font-family:'Jost' !important;font-weight:700 !important;
    box-shadow:0 12px 30px -6px rgba(252,102,8,.6) !important;
  }
  body[data-tpl="x-monaco-v"] #cart-fab #fab-cant{background:#fff !important;color:var(--mo-quemado) !important;}
  body[data-tpl="x-monaco-v"] #cart h2{font-family:'Prata',serif;}
  body[data-tpl="x-monaco-v"] #cart .cart-row .st-add{background:var(--mo-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-monaco-v"] .mv-nombre{font-size:33px;}
    body[data-tpl="x-monaco-v"] .mv-cat span{font-size:33px;}
    body[data-tpl="x-monaco-v"] .mv-grid{gap:14px 10px;}
    body[data-tpl="x-monaco-v"] .mv-media.sin-foto{font-size:46px;}
    body[data-tpl="x-monaco-v"] .mv-nom{font-size:12.5px;min-height:33px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="mv-tile" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="mv-mediaw">
          <div class="mv-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="mv-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="mv-body">
          <div class="mv-nom">${it.nombre}</div>
          <div class="mv-precio">$${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="mv-sec" id="cat-${slug(c.categoria)}">
        <div class="mv-cat"><span>${c.categoria}</span></div>
        <div class="mv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="mv-top">
        <div class="mv-logo">${R.logo ? `<img src="${R.logo}" alt="">` : "🍽️"}</div>
        <div class="mv-tit">
          <h1 class="mv-nombre">${R.nombre}</h1>
          <div class="mv-linea">${R.promo || R.direccion || ""}</div>
        </div>
      </header>
      <div class="mv-search"><input id="mv-q" type="text" placeholder="Buscar en la vitrina…"></div>
      <nav class="mv-nav">${nav}</nav>
      ${secciones}
      <p class="mv-none" id="mv-none">Sin resultados en la carta 🔍</p>
      <div class="mv-fin">Buen provecho</div>`;

    /* buscador */
    const q = root.querySelector("#mv-q"), none = root.querySelector("#mv-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".mv-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".mv-tile").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("mv-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("mv-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".mv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".mv-sec").forEach((s) => io.observe(s));
    }
  },
};
