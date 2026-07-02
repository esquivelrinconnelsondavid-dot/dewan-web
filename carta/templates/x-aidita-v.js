/* x-aidita-v — "Vitrina Ceviches Aidita" — plantilla EXCLUSIVA de Ceviches Aidita.
   Variante VITRINA de "Costa Fresca": barra blanca compacta con la ola gorda
   colgando, grid de 2 columnas de tiles blancos sobre el naranja pleno del logo,
   rodajas de limón CSS de fondo en los platos sin foto y el stepper naranja
   flotando sobre la esquina de la media. Mismo vocabulario del flagship:
   ola, punteados, sombras duras 3D y píldora pálida de precio. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-aidita-v"] = {
  label: "Vitrina Ceviches Aidita",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600;1,700&display=swap');

  body[data-tpl="x-aidita-v"]{
    --ai-naranja:#FD5B03; --ai-hondo:#C23F00; --ai-tinta:#2A1607;
    --ai-limon:#8FBF2F; --ai-pulpa:#EAF6C8; --ai-palido:#FFF3C9;
    background:#FD5B03;
    background-image:linear-gradient(180deg,#FD5B03 0%,#F35200 42%,#DD4600 100%);
    color:var(--ai-tinta); font-family:'Nunito',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-aidita-v"] #app{overflow-x:hidden;}

  /* ---------- BARRA BLANCA COMPACTA con la ola colgando ---------- */
  body[data-tpl="x-aidita-v"] .aiv-top{
    position:relative;display:flex;align-items:center;gap:11px;background:#fff;
    padding:calc(10px + env(safe-area-inset-top)) 16px 12px;
  }
  body[data-tpl="x-aidita-v"] .aiv-top::after{
    content:"";position:absolute;left:0;right:0;bottom:-15px;height:16px;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='16' viewBox='0 0 64 16'%3E%3Cpath d='M0 0 L0 7 Q 16 19 32 7 T 64 7 L64 0 Z' fill='%23ffffff'/%3E%3C/svg%3E");
    background-repeat:repeat-x;background-size:64px 16px;
  }
  body[data-tpl="x-aidita-v"] .aiv-logo{
    flex:0 0 auto;width:46px;height:46px;border-radius:50%;overflow:hidden;
    background:#fff;border:3px solid var(--ai-naranja);
    box-shadow:0 4px 10px rgba(140,40,0,.22);
  }
  body[data-tpl="x-aidita-v"] .aiv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-aidita-v"] .aiv-tit{flex:1;min-width:0;}
  body[data-tpl="x-aidita-v"] .aiv-nombre{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:19px;line-height:1.05;
    color:var(--ai-naranja);text-transform:uppercase;letter-spacing:.01em;
    text-shadow:0 2px 0 rgba(194,63,0,.18);
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-aidita-v"] .aiv-linea{
    font-weight:700;font-size:11.5px;color:#8A6A52;margin-top:3px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  /* rodaja de limón chiquita al final de la barra (puro CSS) */
  body[data-tpl="x-aidita-v"] .aiv-rodaja{
    flex:0 0 auto;width:34px;height:34px;border-radius:50%;border:4px solid var(--ai-limon);
    transform:rotate(14deg);
    background:
      radial-gradient(circle at center, #F6FBE6 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, var(--ai-pulpa) 0deg 50deg, #A9CE54 50deg 60deg);
    box-shadow:0 4px 8px rgba(90,30,0,.18);
  }

  /* ---------- BUSCADOR sobre el naranja ---------- */
  body[data-tpl="x-aidita-v"] .aiv-search{padding:26px 16px 4px;}
  body[data-tpl="x-aidita-v"] .aiv-search input{
    width:100%;border:2px solid #FFD3B8;background:#FFF9F4;border-radius:14px;
    padding:12px 16px;font-family:'Nunito',sans-serif;font-weight:600;font-size:15.5px;
    color:var(--ai-tinta);outline:none;box-shadow:0 4px 0 rgba(150,45,0,.32);
  }
  body[data-tpl="x-aidita-v"] .aiv-search input:focus{border-color:var(--ai-hondo);}
  body[data-tpl="x-aidita-v"] .aiv-search input::placeholder{color:#B08A6E;}

  /* ---------- NAV CHIPS STICKY ---------- */
  body[data-tpl="x-aidita-v"] .aiv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;background:rgba(255,255,255,.96);
    backdrop-filter:blur(6px);border-bottom:2px solid #FFE4D2;
  }
  body[data-tpl="x-aidita-v"] .aiv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-aidita-v"] .aiv-nav button{
    flex:0 0 auto;font-family:'Baloo 2',cursive;font-weight:700;font-size:13.5px;
    color:var(--ai-hondo);background:#fff;border:2px solid var(--ai-naranja);
    border-radius:999px;padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-aidita-v"] .aiv-nav button.activa{
    background:var(--ai-naranja);border-color:var(--ai-hondo);color:#fff;
    box-shadow:0 3px 0 var(--ai-hondo);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-aidita-v"] .aiv-sec{padding:2px 14px 0;scroll-margin-top:66px;}
  body[data-tpl="x-aidita-v"] .aiv-cat{
    display:flex;align-items:center;gap:9px;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:20px;color:#fff;text-shadow:0 2px 0 rgba(150,45,0,.35);margin:22px 2px 13px;
  }
  body[data-tpl="x-aidita-v"] .aiv-mini{
    flex:0 0 auto;width:19px;height:19px;border-radius:50%;border:3px solid var(--ai-limon);
    background:
      radial-gradient(circle at center, #F6FBE6 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, var(--ai-pulpa) 0deg 50deg, #A9CE54 50deg 60deg);
  }

  /* ---------- GRID VITRINA 2 COLUMNAS ---------- */
  body[data-tpl="x-aidita-v"] .aiv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px 12px;}
  body[data-tpl="x-aidita-v"] .aiv-tile{
    background:#fff;border-radius:18px;
    box-shadow:0 6px 0 rgba(150,45,0,.30);
  }
  body[data-tpl="x-aidita-v"] .aiv-mediaw{position:relative;}
  body[data-tpl="x-aidita-v"] .aiv-media{
    position:relative;aspect-ratio:1/1;border-radius:16px 16px 0 0;overflow:hidden;
    background:#FFF6EC;border-bottom:2px dotted #FFCFB0;
    display:flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-aidita-v"] .aiv-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-aidita-v"] .aiv-media.sin-foto{font-size:52px;}
  /* rodaja de limón gigante detrás del emoji */
  body[data-tpl="x-aidita-v"] .aiv-media.sin-foto::before{
    content:"";position:absolute;inset:13%;border-radius:50%;border:5px solid var(--ai-limon);
    background:
      radial-gradient(circle at center, #F6FBE6 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, var(--ai-pulpa) 0deg 50deg, #A9CE54 50deg 60deg);
    box-shadow:0 6px 12px rgba(90,30,0,.16);
  }
  /* ola blanca gorda al pie de la media sin foto */
  body[data-tpl="x-aidita-v"] .aiv-media.sin-foto::after{
    content:"";position:absolute;left:0;right:0;bottom:-1px;height:12px;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='16' viewBox='0 0 64 16'%3E%3Cpath d='M0 16 L0 9 Q 16 -3 32 9 T 64 9 L64 16 Z' fill='%23ffffff'/%3E%3C/svg%3E");
    background-repeat:repeat-x;background-size:48px 12px;
  }
  body[data-tpl="x-aidita-v"] .aiv-emo{position:relative;z-index:1;filter:drop-shadow(0 4px 6px rgba(90,30,0,.25));}

  /* stepper flotante sobre la esquina de la media */
  body[data-tpl="x-aidita-v"] .aiv-ctrl{
    position:absolute;right:8px;bottom:-15px;z-index:3;
    display:flex;align-items:center;gap:5px;
  }
  body[data-tpl="x-aidita-v"] .aiv-ctrl [data-qtywrap]{
    display:none;align-items:center;gap:3px;
    background:#fff;border:2px solid var(--ai-naranja);border-radius:999px;padding:2px 8px 2px 4px;
    box-shadow:0 3px 0 rgba(194,63,0,.45);
  }
  body[data-tpl="x-aidita-v"] .aiv-ctrl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-aidita-v"] [data-add]{
    width:38px;height:38px;border-radius:50%;border:2px solid var(--ai-hondo);cursor:pointer;
    background:var(--ai-naranja);color:#fff;font-size:20px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;box-shadow:0 3px 0 var(--ai-hondo);
  }
  body[data-tpl="x-aidita-v"] [data-add]:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ai-hondo);}
  body[data-tpl="x-aidita-v"] [data-sub]{
    width:27px;height:27px;border-radius:50%;border:none;background:transparent;
    color:var(--ai-hondo);font-size:17px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-aidita-v"] [data-cant]{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:14px;
    color:var(--ai-tinta);min-width:16px;text-align:center;
  }

  /* cuerpo del tile */
  body[data-tpl="x-aidita-v"] .aiv-body{padding:17px 11px 12px;}
  body[data-tpl="x-aidita-v"] .aiv-nom{
    font-family:'Baloo 2',cursive;font-weight:700;font-size:14px;line-height:1.22;color:var(--ai-tinta);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:34px;
  }
  body[data-tpl="x-aidita-v"] .aiv-foot{margin-top:9px;padding-top:9px;border-top:2px dotted #FFCFB0;}
  body[data-tpl="x-aidita-v"] .aiv-precio{
    display:inline-block;font-family:'Baloo 2',cursive;font-weight:800;font-size:14.5px;
    color:var(--ai-hondo);background:var(--ai-palido);border-radius:999px;padding:5px 12px;white-space:nowrap;
  }

  /* buscador: ocultos + sin resultados */
  body[data-tpl="x-aidita-v"] .aiv-hide{display:none !important;}
  body[data-tpl="x-aidita-v"] .aiv-none{
    display:none;text-align:center;padding:34px 18px;font-family:'Baloo 2',cursive;
    font-weight:700;font-size:15.5px;color:#FFE9D8;text-shadow:0 2px 0 rgba(150,45,0,.3);
  }

  body[data-tpl="x-aidita-v"] .aiv-fin{
    text-align:center;padding:30px 16px 8px;font-family:'Baloo 2',cursive;
    font-weight:800;font-size:16px;color:#fff;text-shadow:0 2px 0 rgba(150,45,0,.35);
  }

  /* carrito */
  body[data-tpl="x-aidita-v"] #cart-fab{
    background:var(--ai-naranja) !important;color:#fff !important;border:3px solid var(--ai-hondo) !important;
    border-radius:999px !important;font-family:'Baloo 2',cursive !important;font-weight:800 !important;
    box-shadow:0 5px 0 var(--ai-hondo), 0 16px 30px rgba(160,55,0,.4) !important;
  }
  body[data-tpl="x-aidita-v"] #cart-fab #fab-cant{background:#fff !important;color:var(--ai-naranja) !important;}
  body[data-tpl="x-aidita-v"] #cart h2{font-family:'Baloo 2',cursive;font-weight:800;color:var(--ai-tinta);}
  body[data-tpl="x-aidita-v"] #cart .cart-row .st-add{background:var(--ai-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-aidita-v"] .aiv-nombre{font-size:17px;}
    body[data-tpl="x-aidita-v"] .aiv-grid{gap:18px 10px;}
    body[data-tpl="x-aidita-v"] .aiv-media.sin-foto{font-size:44px;}
    body[data-tpl="x-aidita-v"] .aiv-nom{font-size:13px;min-height:32px;}
    body[data-tpl="x-aidita-v"] .aiv-precio{font-size:13px;padding:4px 10px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🦐"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="aiv-tile" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="aiv-mediaw">
          <div class="aiv-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : `<span class="aiv-emo">${emo(it, cat)}</span>`}</div>
          <div class="aiv-ctrl">${ctrl(it.id)}</div>
        </div>
        <div class="aiv-body">
          <div class="aiv-nom">${it.nombre}</div>
          <div class="aiv-foot"><span class="aiv-precio">$${Number(it.precio).toFixed(2)}</span></div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="aiv-sec" id="cat-${slug(c.categoria)}">
        <h2 class="aiv-cat"><span class="aiv-mini"></span>${c.categoria}</h2>
        <div class="aiv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    const linea = [R.promo || "", R.direccion ? `📍 ${R.direccion.split("·")[0].trim()}` : ""].filter(Boolean).join("  ·  ");

    root.innerHTML = `
      <header class="aiv-top">
        ${R.logo ? `<div class="aiv-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="aiv-tit">
          <h1 class="aiv-nombre">${R.nombre}</h1>
          <div class="aiv-linea">${linea}</div>
        </div>
        <div class="aiv-rodaja"></div>
      </header>
      <div class="aiv-search"><input id="aiv-q" type="text" placeholder="Buscar ceviches, encebollados…"></div>
      <nav class="aiv-nav">${nav}</nav>
      ${secciones}
      <p class="aiv-none" id="aiv-none">Nada por aquí… pruebe con otro antojo 🍋</p>
      <div class="aiv-fin">🍋 ${R.slogan || "Fresquito como el mar"}</div>`;

    /* buscador */
    const q = root.querySelector("#aiv-q"), none = root.querySelector("#aiv-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".aiv-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".aiv-tile").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("aiv-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("aiv-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".aiv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-66px 0px -72% 0px" });
      root.querySelectorAll(".aiv-sec").forEach((s) => io.observe(s));
    }
  },
};
