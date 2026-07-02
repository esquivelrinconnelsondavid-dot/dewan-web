/* x-tenaza-n — "Tenaza de Día" — plantilla EXCLUSIVA de Tenaza Crab Food House.
   La identidad Esmeralda & Oro en tono invertido: fondo crema cálido de día,
   hero grande de apertura (corona, logo, ola dorada, esquinas line-art) y
   carta en una columna de tarjetas horizontales con la media verde a la izquierda. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-tenaza-n"] = {
  label: "Tenaza de Día",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Marcellus&family=Mulish:wght@400;600;700&display=swap');

  body[data-tpl="x-tenaza-n"]{
    --tn-verde:#023B2C; --tn-verde2:#022A20; --tn-oro:#E3AE45; --tn-crema:#F2EBDC;
    --tn-papel:#FFFDF6; --tn-bronce:#6C4F0D;
    background:linear-gradient(180deg,#F7F1E1 0%, var(--tn-crema) 38%, #EAE0C9 100%);
    background-attachment:fixed;
    color:#12352A; font-family:'Mulish',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-tenaza-n"] #app{overflow-x:hidden;}

  /* ---------- HERO DE DÍA con esquinas doradas ---------- */
  body[data-tpl="x-tenaza-n"] .td-hero{
    position:relative;text-align:center;min-height:min(50vh,420px);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    margin:calc(14px + env(safe-area-inset-top)) 16px 0;
    padding:30px 18px 28px;
  }
  body[data-tpl="x-tenaza-n"] .td-hero::before, body[data-tpl="x-tenaza-n"] .td-hero::after{
    content:""; position:absolute; width:52px; height:52px; pointer-events:none;
  }
  body[data-tpl="x-tenaza-n"] .td-hero::before{left:0;top:0;border-left:1.5px solid var(--tn-oro);border-top:1.5px solid var(--tn-oro);}
  body[data-tpl="x-tenaza-n"] .td-hero::after{right:0;bottom:0;border-right:1.5px solid var(--tn-oro);border-bottom:1.5px solid var(--tn-oro);}
  body[data-tpl="x-tenaza-n"] .td-corona{color:var(--tn-oro);font-size:20px;letter-spacing:.3em;}
  body[data-tpl="x-tenaza-n"] .td-logo{
    width:118px;height:118px;margin:14px auto;border-radius:50%;overflow:hidden;
    border:1.5px solid var(--tn-oro);box-shadow:0 0 0 6px rgba(227,174,69,.18), 0 20px 44px rgba(2,59,44,.22);
  }
  body[data-tpl="x-tenaza-n"] .td-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-tenaza-n"] .td-nombre{
    font-family:'Cinzel',serif;font-weight:700;font-size:40px;letter-spacing:.28em;color:var(--tn-verde);
    margin:4px 0 0;line-height:1;text-indent:.28em;
  }
  body[data-tpl="x-tenaza-n"] .td-slogan{
    font-size:12px;font-weight:700;letter-spacing:.46em;text-transform:uppercase;color:var(--tn-bronce);
    margin-top:12px;text-indent:.46em;
  }
  body[data-tpl="x-tenaza-n"] .td-by{font-size:10px;font-weight:600;letter-spacing:.34em;text-transform:uppercase;color:rgba(2,59,44,.55);margin-top:6px;text-indent:.34em;}
  body[data-tpl="x-tenaza-n"] .td-ola{
    height:16px;margin:14px auto 0;width:180px;opacity:.9;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='16' viewBox='0 0 60 16'%3E%3Cpath d='M0 8 Q 7.5 0 15 8 T 30 8 T 45 8 T 60 8' fill='none' stroke='%23E3AE45' stroke-width='1.4'/%3E%3C/svg%3E");
    background-repeat:repeat-x;
  }
  body[data-tpl="x-tenaza-n"] .td-datos{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:15px;}
  body[data-tpl="x-tenaza-n"] .td-datos span{
    font-size:11px;font-weight:600;color:var(--tn-verde);
    border:1px solid rgba(200,150,50,.55);border-radius:999px;padding:6px 12px;background:rgba(255,253,246,.8);
  }

  /* ---------- BUSCADOR + NAV ---------- */
  body[data-tpl="x-tenaza-n"] .td-search{padding:16px 18px 2px;}
  body[data-tpl="x-tenaza-n"] .td-search input{
    width:100%;border:1px solid rgba(200,150,50,.55);background:var(--tn-papel);border-radius:12px;
    padding:12px 16px;font-family:'Mulish';font-size:15.5px;color:var(--tn-verde);outline:none;
  }
  body[data-tpl="x-tenaza-n"] .td-search input::placeholder{color:rgba(2,59,44,.4);}
  body[data-tpl="x-tenaza-n"] .td-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 18px;scrollbar-width:none;
    background:linear-gradient(180deg, rgba(247,241,225,.98), rgba(242,235,220,.92));
    border-bottom:1px solid rgba(2,59,44,.16);
  }
  body[data-tpl="x-tenaza-n"] .td-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-tenaza-n"] .td-nav button{
    flex:0 0 auto;font-family:'Cinzel',serif;font-weight:600;font-size:11px;letter-spacing:.12em;
    color:var(--tn-verde);background:transparent;border:1px solid rgba(2,59,44,.35);border-radius:999px;
    padding:9px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-tenaza-n"] .td-nav button.activa{background:var(--tn-verde);color:var(--tn-oro);border-color:var(--tn-verde);font-weight:700;}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-tenaza-n"] .td-sec{padding:8px 16px 0;scroll-margin-top:64px;}
  body[data-tpl="x-tenaza-n"] .td-cat{display:flex;align-items:baseline;gap:11px;margin:26px 2px 12px;}
  body[data-tpl="x-tenaza-n"] .td-cat h2{font-family:'Marcellus',serif;font-size:21px;font-weight:400;color:var(--tn-verde);letter-spacing:.04em;}
  body[data-tpl="x-tenaza-n"] .td-cat .n{font-size:11px;font-weight:700;color:var(--tn-bronce);letter-spacing:.1em;}
  body[data-tpl="x-tenaza-n"] .td-cat::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(200,150,50,.7),transparent);}

  /* ---------- FILAS HORIZONTALES ---------- */
  body[data-tpl="x-tenaza-n"] .td-row{
    display:flex;gap:12px;align-items:center;
    background:var(--tn-papel);border:1px solid rgba(206,160,64,.5);border-radius:16px;
    padding:11px 12px;margin-bottom:11px;
    box-shadow:0 6px 18px -8px rgba(2,59,44,.18);
  }
  body[data-tpl="x-tenaza-n"] .td-media{
    flex:0 0 auto;width:76px;height:76px;border-radius:16px;overflow:hidden;
    display:flex;align-items:center;justify-content:center;font-size:34px;
    border:1px solid rgba(227,174,69,.5);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='16' viewBox='0 0 60 16'%3E%3Cpath d='M0 8 Q 7.5 0 15 8 T 30 8 T 45 8 T 60 8' fill='none' stroke='%23E3AE45' stroke-width='1.2' stroke-opacity='.3'/%3E%3C/svg%3E"),
      radial-gradient(circle at 50% 32%, rgba(227,174,69,.22), transparent 65%),
      linear-gradient(160deg,#0A4A38,#023B2C);
    background-repeat:repeat,no-repeat,no-repeat;
  }
  body[data-tpl="x-tenaza-n"] .td-media img{width:100%;height:100%;object-fit:cover;display:block;}
  body[data-tpl="x-tenaza-n"] .td-body{flex:1;min-width:0;}
  body[data-tpl="x-tenaza-n"] .td-nom{font-family:'Marcellus',serif;font-size:15.5px;line-height:1.25;color:var(--tn-verde);}
  body[data-tpl="x-tenaza-n"] .td-desc{font-size:12.5px;color:rgba(2,42,32,.62);line-height:1.45;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-tenaza-n"] .td-der{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
  body[data-tpl="x-tenaza-n"] .td-precio{
    font-family:'Cinzel',serif;font-weight:700;font-size:15px;color:var(--tn-bronce);
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-tenaza-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-tenaza-n"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;
    background:var(--tn-oro);color:#022A20;font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 16px -4px rgba(2,59,44,.35);
  }
  body[data-tpl="x-tenaza-n"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-tenaza-n"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:1px solid rgba(2,59,44,.4);background:transparent;color:var(--tn-verde);
    font-size:17px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-tenaza-n"] [data-cant]{display:none;font-family:'Cinzel';font-weight:700;font-size:14px;color:var(--tn-verde);min-width:16px;text-align:center;}
  body[data-tpl="x-tenaza-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-tenaza-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-tenaza-n"] .td-none{display:none;text-align:center;color:rgba(2,59,44,.6);font-weight:600;padding:34px 20px;}
  body[data-tpl="x-tenaza-n"] .td-hide{display:none !important;}
  body[data-tpl="x-tenaza-n"] .td-fin{text-align:center;padding:34px 0 12px;}
  body[data-tpl="x-tenaza-n"] .td-fin .c{color:var(--tn-oro);font-size:17px;letter-spacing:.3em;}
  body[data-tpl="x-tenaza-n"] .td-fin .t{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.4em;color:rgba(2,59,44,.55);margin-top:8px;text-indent:.4em;}

  /* carrito */
  body[data-tpl="x-tenaza-n"] #cart-fab{
    background:var(--tn-verde) !important;color:var(--tn-oro) !important;border-radius:14px !important;
    font-family:'Cinzel',serif !important;font-weight:700 !important;
    box-shadow:0 14px 34px rgba(2,42,32,.35) !important;
  }
  body[data-tpl="x-tenaza-n"] #cart-fab #fab-cant{background:var(--tn-oro) !important;color:#022A20 !important;}
  body[data-tpl="x-tenaza-n"] #cart h2{font-family:'Marcellus',serif;}
  body[data-tpl="x-tenaza-n"] #cart .cart-row .st-add{background:var(--tn-oro) !important;color:#022A20 !important;}

  @media(max-width:380px){
    body[data-tpl="x-tenaza-n"] .td-nombre{font-size:31px;}
    body[data-tpl="x-tenaza-n"] .td-logo{width:100px;height:100px;}
    body[data-tpl="x-tenaza-n"] .td-media{width:66px;height:66px;font-size:30px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🦀"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="td-row" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="td-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="td-body">
          <div class="td-nom">${it.nombre}</div>
          ${it.desc ? `<div class="td-desc">${it.desc}</div>` : ``}
        </div>
        <div class="td-der">
          <span class="td-precio">$${Number(it.precio).toFixed(2)}</span>
          ${ctrl(it.id)}
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="td-sec" id="cat-${slug(c.categoria)}">
        <div class="td-cat"><h2>${c.categoria}</h2><span class="n">${(c.items || []).length}</span></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const partes = (R.slogan || "").split("·").map((s) => s.trim());

    root.innerHTML = `
      <header class="td-hero">
        <div class="td-corona">♛</div>
        ${R.logo ? `<div class="td-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="td-nombre">${R.nombre.toUpperCase()}</h1>
        <div class="td-slogan">${partes[0] || "Crab Food House"}</div>
        <div class="td-by">${partes[1] || "By Liz & Oscar"}</div>
        <div class="td-ola"></div>
        <div class="td-datos">
          ${R.promo ? `<span>${R.promo}</span>` : ``}
          ${R.direccion ? `<span>📍 ${R.direccion.split("·")[0].trim()}</span>` : ``}
        </div>
      </header>
      <div class="td-search"><input id="td-q" type="text" placeholder="Buscar ceviches, cangrejo…"></div>
      <nav class="td-nav">${nav}</nav>
      ${secciones}
      <p class="td-none" id="td-none">Sin resultados 🌊</p>
      <div class="td-fin"><div class="c">♛</div><div class="t">${R.nombre} · ${partes[0] || "Crab Food House"}</div></div>`;

    /* buscador */
    const q = root.querySelector("#td-q"), none = root.querySelector("#td-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".td-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".td-row").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("td-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("td-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    const botones = [...root.querySelectorAll(".td-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".td-sec").forEach((s) => io.observe(s));
    }
  },
};
