/* x-tenaza-v — "Vitrina Tenaza" — plantilla EXCLUSIVA de Tenaza Crab Food House.
   Vitrina esmeralda: grid de 2 columnas con tiles verticales (media cuadrada
   decorada con la ola dorada, stepper flotante en la esquina). Header compacto
   de barra con el mismo vocabulario Esmeralda & Oro del flagship. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-tenaza-v"] = {
  label: "Vitrina Tenaza",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Marcellus&family=Mulish:wght@400;600;700&display=swap');

  body[data-tpl="x-tenaza-v"]{
    --tn-verde:#023B2C; --tn-verde2:#022A20; --tn-oro:#E3AE45; --tn-crema:#F2EBDC;
    background:linear-gradient(180deg,#033326 0%, var(--tn-verde) 30%, var(--tn-verde2) 100%);
    background-attachment:fixed;
    color:var(--tn-crema); font-family:'Mulish',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-tenaza-v"] #app{overflow-x:hidden;}

  /* ---------- HEADER COMPACTO de barra ---------- */
  body[data-tpl="x-tenaza-v"] .tv-bar{
    position:relative;display:flex;align-items:center;gap:12px;
    padding:calc(12px + env(safe-area-inset-top)) 16px 20px;
  }
  body[data-tpl="x-tenaza-v"] .tv-bar::after{
    content:"";position:absolute;left:16px;right:16px;bottom:2px;height:12px;opacity:.75;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='16' viewBox='0 0 60 16'%3E%3Cpath d='M0 8 Q 7.5 0 15 8 T 30 8 T 45 8 T 60 8' fill='none' stroke='%23E3AE45' stroke-width='1.4'/%3E%3C/svg%3E");
    background-repeat:repeat-x;
  }
  body[data-tpl="x-tenaza-v"] .tv-logo{
    flex:0 0 auto;width:42px;height:42px;border-radius:50%;overflow:hidden;
    border:1.5px solid var(--tn-oro);box-shadow:0 0 0 3px rgba(227,174,69,.14);
  }
  body[data-tpl="x-tenaza-v"] .tv-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-tenaza-v"] .tv-tit{flex:1;min-width:0;}
  body[data-tpl="x-tenaza-v"] .tv-nombre{
    font-family:'Cinzel',serif;font-weight:600;font-size:19px;letter-spacing:.22em;color:var(--tn-oro);line-height:1;
  }
  body[data-tpl="x-tenaza-v"] .tv-linea{
    font-size:11px;font-weight:600;color:rgba(242,235,220,.72);margin-top:5px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  body[data-tpl="x-tenaza-v"] .tv-corona{flex:0 0 auto;color:var(--tn-oro);font-size:17px;}

  /* ---------- BUSCADOR + NAV ---------- */
  body[data-tpl="x-tenaza-v"] .tv-search{padding:10px 16px 2px;}
  body[data-tpl="x-tenaza-v"] .tv-search input{
    width:100%;border:1px solid rgba(227,174,69,.4);background:rgba(2,42,32,.6);border-radius:12px;
    padding:12px 16px;font-family:'Mulish';font-size:15.5px;color:var(--tn-crema);outline:none;
  }
  body[data-tpl="x-tenaza-v"] .tv-search input::placeholder{color:rgba(242,235,220,.4);}
  body[data-tpl="x-tenaza-v"] .tv-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;
    background:linear-gradient(180deg, rgba(2,42,32,.97), rgba(2,42,32,.9));
    border-bottom:1px solid rgba(227,174,69,.35);
  }
  body[data-tpl="x-tenaza-v"] .tv-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-tenaza-v"] .tv-nav button{
    flex:0 0 auto;font-family:'Cinzel',serif;font-weight:600;font-size:11px;letter-spacing:.12em;
    color:var(--tn-oro);background:transparent;border:1px solid rgba(227,174,69,.55);border-radius:999px;
    padding:9px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-tenaza-v"] .tv-nav button.activa{background:var(--tn-oro);color:#022A20;border-color:var(--tn-oro);font-weight:700;}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-tenaza-v"] .tv-sec{padding:6px 16px 0;scroll-margin-top:64px;}
  body[data-tpl="x-tenaza-v"] .tv-cat{display:flex;align-items:baseline;gap:11px;margin:24px 2px 12px;}
  body[data-tpl="x-tenaza-v"] .tv-cat h2{font-family:'Marcellus',serif;font-size:21px;font-weight:400;color:var(--tn-crema);letter-spacing:.04em;}
  body[data-tpl="x-tenaza-v"] .tv-cat .n{font-size:11px;font-weight:700;color:var(--tn-oro);letter-spacing:.1em;}
  body[data-tpl="x-tenaza-v"] .tv-cat::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(227,174,69,.55),transparent);}

  /* ---------- GRID VITRINA (2 columnas) ---------- */
  body[data-tpl="x-tenaza-v"] .tv-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
  body[data-tpl="x-tenaza-v"] .tv-tile{
    background:rgba(255,255,255,.045);border:1px solid rgba(227,174,69,.32);border-radius:14px;
  }
  body[data-tpl="x-tenaza-v"] .tv-mediaw{position:relative;}
  body[data-tpl="x-tenaza-v"] .tv-media{
    width:100%;aspect-ratio:1/1;border-radius:13px 13px 0 0;overflow:hidden;
    display:flex;align-items:center;justify-content:center;font-size:46px;
    border-bottom:1px solid rgba(227,174,69,.35);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='16' viewBox='0 0 60 16'%3E%3Cpath d='M0 8 Q 7.5 0 15 8 T 30 8 T 45 8 T 60 8' fill='none' stroke='%23E3AE45' stroke-width='1.2' stroke-opacity='.28'/%3E%3C/svg%3E"),
      radial-gradient(circle at 50% 30%, rgba(227,174,69,.18), transparent 62%),
      linear-gradient(165deg,#0A4A38,#022A20);
    background-repeat:repeat,no-repeat,no-repeat;
  }
  body[data-tpl="x-tenaza-v"] .tv-media img{width:100%;height:100%;object-fit:cover;display:block;}
  body[data-tpl="x-tenaza-v"] .tv-ctl{position:absolute;right:7px;bottom:7px;z-index:2;display:flex;justify-content:flex-end;}
  body[data-tpl="x-tenaza-v"] .tv-info{padding:9px 11px 12px;}
  body[data-tpl="x-tenaza-v"] .tv-nom{
    font-family:'Marcellus',serif;font-size:14px;line-height:1.3;color:#fff;min-height:36px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-tenaza-v"] .tv-precio{
    font-family:'Cinzel',serif;font-weight:700;font-size:15px;color:var(--tn-oro);margin-top:6px;
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  /* steppers flotantes */
  body[data-tpl="x-tenaza-v"] [data-qtywrap]{
    display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:2px;border:1px solid transparent;
  }
  body[data-tpl="x-tenaza-v"] [data-qtywrap].has-qty{
    background:rgba(2,42,32,.94);border-color:rgba(227,174,69,.6);
    box-shadow:0 8px 18px rgba(0,0,0,.45);padding:2px 4px;
  }
  body[data-tpl="x-tenaza-v"] [data-add]{
    width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;
    background:var(--tn-oro);color:#022A20;font-size:19px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 16px -4px rgba(2,10,8,.6);
  }
  body[data-tpl="x-tenaza-v"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-tenaza-v"] [data-sub]{
    width:26px;height:26px;border-radius:50%;border:1px solid rgba(227,174,69,.65);background:transparent;color:var(--tn-oro);
    font-size:15px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-tenaza-v"] [data-cant]{display:none;font-family:'Cinzel';font-weight:700;font-size:13px;color:#fff;min-width:14px;text-align:center;}
  body[data-tpl="x-tenaza-v"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-tenaza-v"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-tenaza-v"] .tv-none{display:none;text-align:center;color:rgba(242,235,220,.55);font-weight:600;padding:34px 20px;}
  body[data-tpl="x-tenaza-v"] .tv-hide{display:none !important;}
  body[data-tpl="x-tenaza-v"] .tv-fin{text-align:center;padding:34px 0 12px;}
  body[data-tpl="x-tenaza-v"] .tv-fin .c{color:var(--tn-oro);font-size:17px;letter-spacing:.3em;}
  body[data-tpl="x-tenaza-v"] .tv-fin .t{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.4em;color:rgba(242,235,220,.55);margin-top:8px;text-indent:.4em;}

  /* carrito */
  body[data-tpl="x-tenaza-v"] #cart-fab{
    background:var(--tn-oro) !important;color:#022A20 !important;border-radius:14px !important;
    font-family:'Cinzel',serif !important;font-weight:700 !important;
    box-shadow:0 14px 34px rgba(0,0,0,.5) !important;
  }
  body[data-tpl="x-tenaza-v"] #cart-fab #fab-cant{background:#022A20 !important;color:var(--tn-oro) !important;}
  body[data-tpl="x-tenaza-v"] #cart h2{font-family:'Marcellus',serif;}
  body[data-tpl="x-tenaza-v"] #cart .cart-row .st-add{background:var(--tn-oro) !important;color:#022A20 !important;}

  @media(max-width:380px){
    body[data-tpl="x-tenaza-v"] .tv-nombre{font-size:16px;}
    body[data-tpl="x-tenaza-v"] .tv-grid{gap:10px;}
    body[data-tpl="x-tenaza-v"] .tv-media{font-size:40px;}
    body[data-tpl="x-tenaza-v"] .tv-nom{font-size:13px;min-height:34px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🦀"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const tile = (it, cat) => `
      <article class="tv-tile" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="tv-mediaw">
          <div class="tv-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
          <div class="tv-ctl">${ctrl(it.id)}</div>
        </div>
        <div class="tv-info">
          <div class="tv-nom">${it.nombre}</div>
          <div class="tv-precio">$${Number(it.precio).toFixed(2)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="tv-sec" id="cat-${slug(c.categoria)}">
        <div class="tv-cat"><h2>${c.categoria}</h2><span class="n">${(c.items || []).length}</span></div>
        <div class="tv-grid">${(c.items || []).map((it) => tile(it, c.categoria)).join("")}</div>
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const partes = (R.slogan || "").split("·").map((s) => s.trim());
    const linea = R.promo || (R.direccion ? `📍 ${R.direccion.split("·")[0].trim()}` : (partes[0] || ""));

    root.innerHTML = `
      <header class="tv-bar">
        ${R.logo ? `<div class="tv-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="tv-tit">
          <h1 class="tv-nombre">${R.nombre.toUpperCase()}</h1>
          <div class="tv-linea">${linea}</div>
        </div>
        <span class="tv-corona">♛</span>
      </header>
      <div class="tv-search"><input id="tv-q" type="text" placeholder="Buscar ceviches, cangrejo…"></div>
      <nav class="tv-nav">${nav}</nav>
      ${secciones}
      <p class="tv-none" id="tv-none">Sin resultados 🌊</p>
      <div class="tv-fin"><div class="c">♛</div><div class="t">${R.nombre} · ${partes[0] || "Crab Food House"}</div></div>`;

    /* buscador */
    const q = root.querySelector("#tv-q"), none = root.querySelector("#tv-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".tv-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".tv-tile").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("tv-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("tv-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    const botones = [...root.querySelectorAll(".tv-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".tv-sec").forEach((s) => io.observe(s));
    }
  },
};
