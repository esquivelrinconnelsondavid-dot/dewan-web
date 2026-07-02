/* x-andaluza-v — "Vitrina La Andaluza" — plantilla EXCLUSIVA de La Andaluza (Embutidos & Deli).
   La etiqueta negra hecha vitrina: grid de 2 columnas de tiles con marco dorado,
   fondo de bodega, listón rojo y el stepper flotando sobre la esquina de cada foto. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-andaluza-v"] = {
  label: "Vitrina La Andaluza",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@400;500;600&display=swap');

  body[data-tpl="x-andaluza-v"]{
    --an-negro:#100C09; --an-oro:#C89B4B; --an-rojo:#B12629; --an-crema:#F3EADB;
    background:radial-gradient(140% 50% at 50% 0%, #1D1610 0%, var(--an-negro) 60%);
    background-attachment:fixed;
    color:var(--an-crema); font-family:'Cormorant Garamond',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-andaluza-v"] #app{overflow-x:hidden;}

  /* marco dorado fijo (firma de la casa) */
  body[data-tpl="x-andaluza-v"] .av-marco{
    position:fixed;inset:9px;border:1px solid rgba(200,155,75,.4);border-radius:6px;
    pointer-events:none;z-index:70;
  }

  /* ---------- BARRA COMPACTA ---------- */
  body[data-tpl="x-andaluza-v"] .av-bar{
    display:flex;align-items:center;gap:12px;
    padding:calc(18px + env(safe-area-inset-top)) 20px 13px;
    border-bottom:1px solid rgba(200,155,75,.35);
  }
  body[data-tpl="x-andaluza-v"] .av-logo{
    width:44px;height:44px;border-radius:50%;object-fit:cover;flex:0 0 auto;
    border:1px solid rgba(200,155,75,.75);box-shadow:0 6px 16px rgba(0,0,0,.5);
  }
  body[data-tpl="x-andaluza-v"] .av-tit{min-width:0;}
  body[data-tpl="x-andaluza-v"] .av-nombre{
    font-family:'Great Vibes',cursive;font-weight:400;font-size:30px;line-height:1;
    color:#fff;margin:0;text-shadow:0 3px 16px rgba(200,155,75,.3);
  }
  body[data-tpl="x-andaluza-v"] .av-sub{
    font-family:'Jost';font-size:11.5px;letter-spacing:.06em;color:rgba(243,234,219,.6);
    margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }

  /* ---------- BUSCADOR + NAV ---------- */
  body[data-tpl="x-andaluza-v"] .av-search{padding:14px 20px 0;}
  body[data-tpl="x-andaluza-v"] .av-search input{
    width:100%;border:1px solid rgba(200,155,75,.4);background:rgba(255,255,255,.05);border-radius:4px;
    padding:12px 15px;font-family:'Jost';font-size:15px;color:var(--an-crema);outline:none;
  }
  body[data-tpl="x-andaluza-v"] .av-search input::placeholder{color:rgba(243,234,219,.35);}
  body[data-tpl="x-andaluza-v"] .av-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 20px;scrollbar-width:none;
    background:linear-gradient(180deg, rgba(16,12,9,.98), rgba(16,12,9,.9));
    border-bottom:1px solid rgba(200,155,75,.3);
  }
  body[data-tpl="x-andaluza-v"] .av-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-andaluza-v"] .av-nav button{
    flex:0 0 auto;cursor:pointer;white-space:nowrap;
    font-family:'Jost';font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;
    color:rgba(243,234,219,.7);background:rgba(255,255,255,.04);
    border:1px solid rgba(200,155,75,.4);border-radius:999px;padding:8px 14px;
  }
  body[data-tpl="x-andaluza-v"] .av-nav button.activa{
    background:var(--an-rojo);border-color:var(--an-rojo);color:#fff;
    box-shadow:0 6px 14px rgba(177,38,41,.35);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-andaluza-v"] .av-sec{padding:4px 20px 0;scroll-margin-top:72px;}
  body[data-tpl="x-andaluza-v"] .av-cat{text-align:center;margin:26px 0 14px;}
  body[data-tpl="x-andaluza-v"] .av-cat .mini-liston{
    position:relative;display:inline-block;background:var(--an-rojo);color:#fff;
    font-family:'Jost';font-size:11px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;
    padding:7px 18px;text-indent:.3em;
  }
  body[data-tpl="x-andaluza-v"] .av-cat .mini-liston::before, body[data-tpl="x-andaluza-v"] .av-cat .mini-liston::after{
    content:"";position:absolute;top:0;bottom:0;width:12px;background:var(--an-rojo);
  }
  body[data-tpl="x-andaluza-v"] .av-cat .mini-liston::before{left:-11px;clip-path:polygon(100% 0,0 50%,100% 100%);}
  body[data-tpl="x-andaluza-v"] .av-cat .mini-liston::after{right:-11px;clip-path:polygon(0 0,100% 50%,0 100%);}

  /* ---------- VITRINA (grid 2 col) ---------- */
  body[data-tpl="x-andaluza-v"] .av-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  body[data-tpl="x-andaluza-v"] .av-tile{
    display:flex;flex-direction:column;overflow:hidden;border-radius:10px;
    background:linear-gradient(180deg,#1B140E,#151009);
    border:1px solid rgba(200,155,75,.35);
    box-shadow:0 12px 26px -14px rgba(0,0,0,.7);
  }
  body[data-tpl="x-andaluza-v"] .av-media{
    position:relative;width:100%;aspect-ratio:1/1;
    display:flex;align-items:center;justify-content:center;
    background:radial-gradient(120% 110% at 50% 25%, #2A1F13 0%, #17110B 70%);
  }
  body[data-tpl="x-andaluza-v"] .av-media::before{
    content:"";position:absolute;inset:6px;border:1px solid rgba(200,155,75,.35);border-radius:6px;
    pointer-events:none;z-index:2;
  }
  body[data-tpl="x-andaluza-v"] .av-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;}
  body[data-tpl="x-andaluza-v"] .av-emoji{font-size:46px;line-height:1;filter:drop-shadow(0 8px 16px rgba(200,155,75,.28));}
  body[data-tpl="x-andaluza-v"] .av-step{position:absolute;right:7px;bottom:7px;z-index:3;}

  body[data-tpl="x-andaluza-v"] .av-body{display:flex;flex-direction:column;gap:6px;flex:1;padding:10px 11px 12px;}
  body[data-tpl="x-andaluza-v"] .av-nom{font-weight:600;font-size:15.5px;line-height:1.22;color:#fff;}
  body[data-tpl="x-andaluza-v"] .av-precio{
    margin-top:auto;font-weight:700;font-size:16px;color:var(--an-oro);
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  /* steppers (flotan sobre la media) */
  body[data-tpl="x-andaluza-v"] [data-qtywrap]{
    display:inline-flex;align-items:center;gap:5px;padding:3px;border-radius:999px;
    background:rgba(16,12,9,.8);border:1px solid rgba(200,155,75,.55);
    -webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);
  }
  body[data-tpl="x-andaluza-v"] [data-add]{
    width:31px;height:31px;border-radius:50%;border:none;cursor:pointer;
    background:var(--an-oro);color:#1D1207;font-size:18px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-andaluza-v"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-andaluza-v"] [data-sub]{
    width:27px;height:27px;border-radius:50%;border:1px solid rgba(243,234,219,.5);background:transparent;color:var(--an-crema);
    font-size:15px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-andaluza-v"] [data-cant]{display:none;font-family:'Jost';font-weight:600;font-size:13.5px;color:#fff;min-width:14px;text-align:center;}
  body[data-tpl="x-andaluza-v"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-andaluza-v"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-andaluza-v"] .av-none{display:none;text-align:center;color:rgba(243,234,219,.5);font-family:'Jost';padding:34px 20px;}
  body[data-tpl="x-andaluza-v"] .av-hide{display:none !important;}
  body[data-tpl="x-andaluza-v"] .av-fin{text-align:center;padding:36px 0 14px;}
  body[data-tpl="x-andaluza-v"] .av-fin .s{font-family:'Great Vibes',cursive;font-size:31px;color:var(--an-oro);}
  body[data-tpl="x-andaluza-v"] .av-fin .r{font-family:'Jost';font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:rgba(243,234,219,.4);margin-top:6px;text-indent:.4em;}

  /* carrito */
  body[data-tpl="x-andaluza-v"] #cart-fab{
    background:var(--an-rojo) !important;color:#fff !important;border-radius:6px !important;
    font-family:'Jost' !important;font-weight:600 !important;letter-spacing:.05em;
    box-shadow:0 14px 34px rgba(177,38,41,.4) !important;
  }
  body[data-tpl="x-andaluza-v"] #cart-fab #fab-cant{background:#fff !important;color:var(--an-rojo) !important;}
  body[data-tpl="x-andaluza-v"] #cart h2{font-family:'Cormorant Garamond',serif;}
  body[data-tpl="x-andaluza-v"] #cart .cart-row .st-add{background:var(--an-oro) !important;color:#1D1207 !important;}

  @media(max-width:380px){
    body[data-tpl="x-andaluza-v"] .av-grid{gap:9px;}
    body[data-tpl="x-andaluza-v"] .av-sec{padding:4px 14px 0;}
    body[data-tpl="x-andaluza-v"] .av-emoji{font-size:38px;}
    body[data-tpl="x-andaluza-v"] .av-nombre{font-size:26px;}
    body[data-tpl="x-andaluza-v"] .av-nom{font-size:14.5px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥪"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="av-tile" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="av-media" data-media>
          ${it.foto ? `<img src="${it.foto}" alt="">` : `<span class="av-emoji">${emo(it, cat)}</span>`}
          <div class="av-step">${ctrl(it.id)}</div>
        </div>
        <div class="av-body">
          <div class="av-nom">${it.nombre}</div>
          <div class="av-precio">$${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="av-sec" id="cat-${slug(c.categoria)}">
        <div class="av-cat"><span class="mini-liston">${c.categoria}</span></div>
        <div class="av-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <div class="av-marco"></div>
      <header class="av-bar">
        ${R.logo ? `<img class="av-logo" src="${R.logo}" alt="">` : ``}
        <div class="av-tit">
          <h1 class="av-nombre">${R.nombre}</h1>
          <div class="av-sub">${R.promo || R.direccion || "Embutidos &amp; Deli · De la Sierra"}</div>
        </div>
      </header>
      <div class="av-search"><input id="av-q" type="text" placeholder="Buscar en la vitrina…"></div>
      <nav class="av-nav">${nav}</nav>
      ${secciones}
      <p class="av-none" id="av-none">Sin resultados</p>
      <div class="av-fin"><div class="s">La Andaluza</div><div class="r">De la Sierra · ®</div></div>`;

    /* buscador */
    const q = root.querySelector("#av-q"), none = root.querySelector("#av-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".av-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".av-tile").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("av-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("av-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    const botones = [...root.querySelectorAll(".av-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-78px 0px -72% 0px" });
      root.querySelectorAll(".av-sec").forEach((s) => io.observe(s));
    }
  },
};
