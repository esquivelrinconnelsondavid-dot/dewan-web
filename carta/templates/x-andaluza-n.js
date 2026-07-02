/* x-andaluza-n — "La Andaluza de Día" — plantilla EXCLUSIVA de La Andaluza (Embutidos & Deli).
   La Etiqueta Negra en tono invertido: mañana de cafetería sobre papel crema cálido,
   hero grande de apertura (marco dorado doble, caligrafía, listón rojo) y la carta
   en una columna de tarjetas horizontales con la media redondeada a la izquierda. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-andaluza-n"] = {
  label: "La Andaluza de Día",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@400;500;600&display=swap');

  body[data-tpl="x-andaluza-n"]{
    --an-tinta:#171009; --an-oro:#C89B4B; --an-oro-tinta:#7A571B; --an-rojo:#B12629;
    --an-papel:#F3EADB; --an-carta:#FFFDF6;
    background:radial-gradient(140% 50% at 50% 0%, #FBF4E3 0%, #F1E7D2 60%);
    background-attachment:fixed;
    color:var(--an-tinta); font-family:'Cormorant Garamond',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-andaluza-n"] #app{overflow-x:hidden;}

  /* ---------- HERO DE DÍA (etiqueta enmarcada a plena luz) ---------- */
  body[data-tpl="x-andaluza-n"] .dn-hero{
    position:relative;min-height:min(50vh,420px);
    display:flex;align-items:center;justify-content:center;text-align:center;
    padding:calc(30px + env(safe-area-inset-top)) 26px 34px;
    background:
      radial-gradient(95% 75% at 50% -12%, rgba(255,205,120,.5) 0%, rgba(255,205,120,0) 62%),
      linear-gradient(180deg,#FBF3E0 0%,#F5EBD6 100%);
    border-bottom:1px solid rgba(200,155,75,.5);
  }
  /* marco dorado doble, firma de la casa, ahora abrazando el hero */
  body[data-tpl="x-andaluza-n"] .dn-hero::before{
    content:"";position:absolute;inset:12px;border:1px solid rgba(122,87,27,.55);border-radius:8px;pointer-events:none;
  }
  body[data-tpl="x-andaluza-n"] .dn-hero::after{
    content:"";position:absolute;inset:17px;border:1px solid rgba(200,155,75,.4);border-radius:6px;pointer-events:none;
  }
  body[data-tpl="x-andaluza-n"] .dn-hero-in{position:relative;max-width:440px;}
  body[data-tpl="x-andaluza-n"] .dn-logo{
    width:68px;height:68px;border-radius:50%;object-fit:cover;
    border:2px solid rgba(200,155,75,.85);box-shadow:0 0 0 5px rgba(200,155,75,.18), 0 12px 26px -10px rgba(122,87,27,.5);
    margin-bottom:10px;
  }
  body[data-tpl="x-andaluza-n"] .dn-emb{font-family:'Jost';font-size:11px;font-weight:600;letter-spacing:.5em;text-transform:uppercase;color:var(--an-oro-tinta);text-indent:.5em;}
  body[data-tpl="x-andaluza-n"] .dn-script{
    font-family:'Great Vibes',cursive;font-weight:400;font-size:58px;line-height:1;color:var(--an-tinta);
    margin:12px 0 4px;text-shadow:0 3px 18px rgba(200,155,75,.4);
  }
  body[data-tpl="x-andaluza-n"] .dn-sierra{font-style:italic;font-size:17px;color:var(--an-oro-tinta);}
  body[data-tpl="x-andaluza-n"] .dn-rules{width:min(300px,78%);margin:13px auto 0;border-top:1px solid rgba(122,87,27,.75);border-bottom:1px solid rgba(122,87,27,.35);height:4px;}

  /* listón rojo de la etiqueta */
  body[data-tpl="x-andaluza-n"] .dn-liston{
    position:relative;display:table;margin:16px auto 0;background:var(--an-rojo);color:#fff;
    font-family:'Jost';font-size:10.5px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;
    padding:8px 22px;text-indent:.32em;
    box-shadow:0 10px 20px -8px rgba(177,38,41,.55);
  }
  body[data-tpl="x-andaluza-n"] .dn-liston::before, body[data-tpl="x-andaluza-n"] .dn-liston::after{
    content:"";position:absolute;top:0;bottom:0;width:14px;background:var(--an-rojo);
  }
  body[data-tpl="x-andaluza-n"] .dn-liston::before{left:-13px;clip-path:polygon(100% 0,0 50%,100% 100%);}
  body[data-tpl="x-andaluza-n"] .dn-liston::after{right:-13px;clip-path:polygon(0 0,100% 50%,0 100%);}
  body[data-tpl="x-andaluza-n"] .dn-datos{font-family:'Jost';font-size:12.5px;color:rgba(23,16,9,.72);margin-top:12px;letter-spacing:.04em;}
  body[data-tpl="x-andaluza-n"] .dn-promo{margin-top:5px;color:var(--an-rojo);font-weight:500;}

  /* ---------- BUSCADOR + NAV ---------- */
  body[data-tpl="x-andaluza-n"] .dn-search{padding:16px 18px 0;}
  body[data-tpl="x-andaluza-n"] .dn-search input{
    width:100%;border:1px solid rgba(122,87,27,.45);background:var(--an-carta);border-radius:10px;
    padding:12px 15px;font-family:'Jost';font-size:15px;color:var(--an-tinta);outline:none;
    box-shadow:0 8px 18px -14px rgba(122,87,27,.6);
  }
  body[data-tpl="x-andaluza-n"] .dn-search input::placeholder{color:rgba(23,16,9,.45);}
  body[data-tpl="x-andaluza-n"] .dn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:6px;overflow-x:auto;
    padding:10px 18px;scrollbar-width:none;
    background:linear-gradient(180deg, rgba(251,244,227,.98), rgba(251,244,227,.92));
    -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);
    border-bottom:1px solid rgba(200,155,75,.55);
  }
  body[data-tpl="x-andaluza-n"] .dn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-andaluza-n"] .dn-nav button{
    flex:0 0 auto;background:none;border:none;cursor:pointer;white-space:nowrap;
    font-family:'Jost';font-weight:500;font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;
    color:rgba(23,16,9,.68);padding:9px 14px;
  }
  /* la pestaña activa se vuelve listón (puntas de cinta) */
  body[data-tpl="x-andaluza-n"] .dn-nav button.activa{
    background:var(--an-rojo);color:#fff;font-weight:600;padding:9px 20px;
    clip-path:polygon(7px 0,calc(100% - 7px) 0,100% 50%,calc(100% - 7px) 100%,7px 100%,0 50%);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-andaluza-n"] .dn-sec{padding:6px 18px 0;scroll-margin-top:62px;}
  body[data-tpl="x-andaluza-n"] .dn-cat{display:flex;align-items:center;gap:14px;margin:24px 2px 12px;}
  body[data-tpl="x-andaluza-n"] .dn-cat .s{font-family:'Great Vibes',cursive;font-size:31px;line-height:1;color:var(--an-rojo);white-space:nowrap;}
  body[data-tpl="x-andaluza-n"] .dn-cat::after{
    content:"";flex:1;height:4px;
    border-top:1px solid rgba(122,87,27,.6);border-bottom:1px solid rgba(122,87,27,.25);
  }
  body[data-tpl="x-andaluza-n"] .dn-list{display:flex;flex-direction:column;gap:11px;}

  /* ---------- TARJETAS HORIZONTALES ---------- */
  body[data-tpl="x-andaluza-n"] .dn-card{
    display:grid;grid-template-columns:76px 1fr auto;gap:13px;align-items:center;
    background:var(--an-carta);border:1px solid rgba(200,155,75,.45);border-radius:18px;
    padding:11px;box-shadow:0 14px 28px -20px rgba(122,87,27,.6);
  }
  body[data-tpl="x-andaluza-n"] .dn-media{
    width:76px;height:76px;border-radius:16px;overflow:hidden;position:relative;
    background:linear-gradient(160deg,#FFF6E2,#F2E5CB);
    border:1px solid rgba(200,155,75,.55);
    display:flex;align-items:center;justify-content:center;font-size:34px;
  }
  body[data-tpl="x-andaluza-n"] .dn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-andaluza-n"] .dn-nom{font-weight:700;font-size:17px;line-height:1.18;color:var(--an-tinta);}
  body[data-tpl="x-andaluza-n"] .dn-desc{
    font-style:italic;font-size:13.5px;color:rgba(23,16,9,.66);line-height:1.35;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-andaluza-n"] .dn-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;padding-right:2px;}
  body[data-tpl="x-andaluza-n"] .dn-precio{font-weight:700;font-size:17px;color:var(--an-oro-tinta);font-variant-numeric:tabular-nums;white-space:nowrap;}

  /* steppers */
  body[data-tpl="x-andaluza-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-andaluza-n"] [data-add]{
    width:33px;height:33px;border-radius:50%;border:none;cursor:pointer;
    background:var(--an-rojo);color:#fff;font-size:19px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 8px 18px -8px rgba(177,38,41,.7);
  }
  body[data-tpl="x-andaluza-n"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-andaluza-n"] [data-sub]{
    width:29px;height:29px;border-radius:50%;border:1px solid rgba(23,16,9,.4);background:transparent;color:var(--an-tinta);
    font-size:16px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-andaluza-n"] [data-cant]{display:none;font-family:'Jost';font-weight:600;font-size:14px;color:var(--an-tinta);min-width:16px;text-align:center;}
  body[data-tpl="x-andaluza-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-andaluza-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-andaluza-n"] .dn-none{display:none;text-align:center;color:rgba(23,16,9,.6);font-family:'Jost';padding:34px 20px;}
  body[data-tpl="x-andaluza-n"] .dn-hide{display:none !important;}
  body[data-tpl="x-andaluza-n"] .dn-fin{text-align:center;padding:36px 0 14px;}
  body[data-tpl="x-andaluza-n"] .dn-fin .s{font-family:'Great Vibes',cursive;font-size:31px;color:var(--an-rojo);}
  body[data-tpl="x-andaluza-n"] .dn-fin .r{font-family:'Jost';font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:rgba(23,16,9,.55);margin-top:6px;text-indent:.4em;}

  /* carrito */
  body[data-tpl="x-andaluza-n"] #cart-fab{
    background:var(--an-rojo) !important;color:#fff !important;border-radius:999px !important;
    font-family:'Jost' !important;font-weight:600 !important;letter-spacing:.05em;
    box-shadow:0 14px 34px rgba(177,38,41,.35) !important;
  }
  body[data-tpl="x-andaluza-n"] #cart-fab #fab-cant{background:#fff !important;color:var(--an-rojo) !important;}
  body[data-tpl="x-andaluza-n"] #cart h2{font-family:'Cormorant Garamond',serif;}
  body[data-tpl="x-andaluza-n"] #cart .cart-row .st-add{background:var(--an-rojo) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-andaluza-n"] .dn-script{font-size:47px;}
    body[data-tpl="x-andaluza-n"] .dn-logo{width:58px;height:58px;}
    body[data-tpl="x-andaluza-n"] .dn-hero{padding-left:20px;padding-right:20px;}
    body[data-tpl="x-andaluza-n"] .dn-sec{padding:6px 14px 0;}
    body[data-tpl="x-andaluza-n"] .dn-card{grid-template-columns:64px 1fr auto;gap:10px;}
    body[data-tpl="x-andaluza-n"] .dn-media{width:64px;height:64px;font-size:29px;border-radius:14px;}
    body[data-tpl="x-andaluza-n"] .dn-nom{font-size:15.5px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥪"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const carta = (it, cat) => `
      <article class="dn-card" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="dn-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div><div class="dn-nom">${it.nombre}</div>${it.desc ? `<div class="dn-desc">${it.desc}</div>` : ``}</div>
        <div class="dn-right"><span class="dn-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="dn-sec" id="cat-${slug(c.categoria)}">
        <div class="dn-cat"><span class="s">${c.categoria}</span></div>
        <div class="dn-list">${(c.items || []).map((it) => carta(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="dn-hero">
        <div class="dn-hero-in">
          ${R.logo ? `<img class="dn-logo" src="${R.logo}" alt="">` : ``}
          <div class="dn-emb">Embutidos &amp; Deli</div>
          <h1 class="dn-script">${R.nombre}</h1>
          <div class="dn-sierra">De la Sierra</div>
          <div class="dn-rules"></div>
          <div class="dn-liston">Cafetería · Riobamba</div>
          ${R.direccion ? `<div class="dn-datos">📍 ${R.direccion}</div>` : ``}
          ${R.promo ? `<div class="dn-datos dn-promo">${R.promo}</div>` : ``}
        </div>
      </header>
      <div class="dn-search"><input id="dn-q" type="text" placeholder="Buscar desayunos, sánduches, batidos…"></div>
      <nav class="dn-nav">${nav}</nav>
      ${secciones}
      <p class="dn-none" id="dn-none">Sin resultados</p>
      <div class="dn-fin"><div class="s">La Andaluza</div><div class="r">De la Sierra · ®</div></div>`;

    /* buscador */
    const q = root.querySelector("#dn-q"), none = root.querySelector("#dn-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".dn-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".dn-card").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("dn-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("dn-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    const botones = [...root.querySelectorAll(".dn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-64px 0px -72% 0px" });
      root.querySelectorAll(".dn-sec").forEach((s) => io.observe(s));
    }
  },
};
