/* x-tenaza — "Esmeralda & Oro" — plantilla EXCLUSIVA de Tenaza Crab Food House.
   Verde profundo del logo con línea dorada tipo line-art: paneles con
   filo de oro, olas y corona. Marisquería con porte de casa grande. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-tenaza"] = {
  label: "Esmeralda & Oro",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Marcellus&family=Mulish:wght@400;600;700&display=swap');

  body[data-tpl="x-tenaza"]{
    --tn-verde:#023B2C; --tn-verde2:#022A20; --tn-oro:#E3AE45; --tn-crema:#F2EBDC;
    background:linear-gradient(180deg,#033326 0%, var(--tn-verde) 30%, var(--tn-verde2) 100%);
    background-attachment:fixed;
    color:var(--tn-crema); font-family:'Mulish',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-tenaza"] #app{overflow-x:hidden;}

  /* ---------- PORTADA con esquinas doradas ---------- */
  body[data-tpl="x-tenaza"] .tn-top{
    position:relative; text-align:center; margin:calc(16px + env(safe-area-inset-top)) 16px 0;
    padding:26px 18px 24px;
  }
  body[data-tpl="x-tenaza"] .tn-top::before, body[data-tpl="x-tenaza"] .tn-top::after{
    content:""; position:absolute; width:46px; height:46px; pointer-events:none;
  }
  body[data-tpl="x-tenaza"] .tn-top::before{left:0;top:0;border-left:1.5px solid var(--tn-oro);border-top:1.5px solid var(--tn-oro);}
  body[data-tpl="x-tenaza"] .tn-top::after{right:0;bottom:0;border-right:1.5px solid var(--tn-oro);border-bottom:1.5px solid var(--tn-oro);}
  body[data-tpl="x-tenaza"] .tn-corona{color:var(--tn-oro);font-size:19px;letter-spacing:.3em;}
  body[data-tpl="x-tenaza"] .tn-logo{
    width:112px;height:112px;margin:12px auto;border-radius:50%;overflow:hidden;
    border:1.5px solid var(--tn-oro);box-shadow:0 0 0 5px rgba(227,174,69,.14), 0 18px 40px rgba(0,0,0,.4);
  }
  body[data-tpl="x-tenaza"] .tn-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-tenaza"] .tn-nombre{
    font-family:'Cinzel',serif;font-weight:600;font-size:35px;letter-spacing:.3em;color:var(--tn-oro);
    margin:6px 0 0;line-height:1;text-indent:.3em;
  }
  body[data-tpl="x-tenaza"] .tn-sub{
    font-size:10.5px;font-weight:700;letter-spacing:.5em;text-transform:uppercase;color:rgba(242,235,220,.75);
    margin-top:11px;text-indent:.5em;
  }
  body[data-tpl="x-tenaza"] .tn-by{font-size:9.5px;font-weight:600;letter-spacing:.34em;text-transform:uppercase;color:rgba(242,235,220,.5);margin-top:5px;text-indent:.34em;}
  body[data-tpl="x-tenaza"] .tn-datos{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:15px;}
  body[data-tpl="x-tenaza"] .tn-datos span{
    font-size:11px;font-weight:600;color:var(--tn-crema);
    border:1px solid rgba(227,174,69,.45);border-radius:999px;padding:6px 12px;background:rgba(2,42,32,.5);
  }

  /* ola divisoria */
  body[data-tpl="x-tenaza"] .tn-ola{
    height:16px;margin:6px auto 0;width:180px;opacity:.8;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='16' viewBox='0 0 60 16'%3E%3Cpath d='M0 8 Q 7.5 0 15 8 T 30 8 T 45 8 T 60 8' fill='none' stroke='%23E3AE45' stroke-width='1.4'/%3E%3C/svg%3E");
    background-repeat:repeat-x;
  }

  /* ---------- BUSCADOR + NAV ---------- */
  body[data-tpl="x-tenaza"] .tn-search{padding:16px 18px 2px;}
  body[data-tpl="x-tenaza"] .tn-search input{
    width:100%;border:1px solid rgba(227,174,69,.4);background:rgba(2,42,32,.6);border-radius:12px;
    padding:12px 16px;font-family:'Mulish';font-size:15.5px;color:var(--tn-crema);outline:none;
  }
  body[data-tpl="x-tenaza"] .tn-search input::placeholder{color:rgba(242,235,220,.4);}
  body[data-tpl="x-tenaza"] .tn-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 18px;scrollbar-width:none;
    background:linear-gradient(180deg, rgba(2,42,32,.97), rgba(2,42,32,.9));
    border-bottom:1px solid rgba(227,174,69,.35);
  }
  body[data-tpl="x-tenaza"] .tn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-tenaza"] .tn-nav button{
    flex:0 0 auto;font-family:'Cinzel',serif;font-weight:600;font-size:11px;letter-spacing:.12em;
    color:var(--tn-oro);background:transparent;border:1px solid rgba(227,174,69,.55);border-radius:999px;
    padding:9px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-tenaza"] .tn-nav button.activa{background:var(--tn-oro);color:#022A20;border-color:var(--tn-oro);font-weight:700;}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-tenaza"] .tn-sec{padding:8px 18px 0;scroll-margin-top:66px;}
  body[data-tpl="x-tenaza"] .tn-cat{display:flex;align-items:baseline;gap:11px;margin:26px 2px 12px;}
  body[data-tpl="x-tenaza"] .tn-cat h2{font-family:'Marcellus',serif;font-size:22px;font-weight:400;color:var(--tn-crema);letter-spacing:.04em;}
  body[data-tpl="x-tenaza"] .tn-cat .n{font-size:11px;font-weight:700;color:var(--tn-oro);letter-spacing:.1em;}
  body[data-tpl="x-tenaza"] .tn-cat::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(227,174,69,.55),transparent);}

  /* ---------- PANELES ---------- */
  body[data-tpl="x-tenaza"] .tn-card{
    display:flex;gap:13px;align-items:center;
    background:rgba(255,255,255,.045);border:1px solid rgba(227,174,69,.32);border-radius:13px;
    padding:12px 13px;margin-bottom:11px;
  }
  body[data-tpl="x-tenaza"] .tn-media{
    flex:0 0 auto;width:54px;height:54px;border-radius:10px;overflow:hidden;position:relative;
    background:rgba(2,42,32,.65);border:1px solid rgba(227,174,69,.4);
    display:flex;align-items:center;justify-content:center;font-size:25px;
  }
  body[data-tpl="x-tenaza"] .tn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-tenaza"] .tn-body{flex:1;min-width:0;}
  body[data-tpl="x-tenaza"] .tn-nom{font-family:'Marcellus',serif;font-size:15.5px;line-height:1.25;color:#fff;}
  body[data-tpl="x-tenaza"] .tn-desc{font-size:12.5px;color:rgba(242,235,220,.6);line-height:1.45;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-tenaza"] .tn-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="x-tenaza"] .tn-precio{
    font-family:'Cinzel',serif;font-weight:700;font-size:15.5px;color:var(--tn-oro);
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-tenaza"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-tenaza"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;
    background:var(--tn-oro);color:#022A20;font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 16px -4px rgba(227,174,69,.45);
  }
  body[data-tpl="x-tenaza"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-tenaza"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:1px solid rgba(227,174,69,.6);background:transparent;color:var(--tn-oro);
    font-size:17px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-tenaza"] [data-cant]{display:none;font-family:'Cinzel';font-weight:700;font-size:14px;color:#fff;min-width:16px;text-align:center;}
  body[data-tpl="x-tenaza"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-tenaza"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-tenaza"] .tn-none{display:none;text-align:center;color:rgba(242,235,220,.55);font-weight:600;padding:34px 20px;}
  body[data-tpl="x-tenaza"] .tn-hide{display:none !important;}
  body[data-tpl="x-tenaza"] .tn-fin{text-align:center;padding:34px 0 12px;}
  body[data-tpl="x-tenaza"] .tn-fin .c{color:var(--tn-oro);font-size:17px;letter-spacing:.3em;}
  body[data-tpl="x-tenaza"] .tn-fin .t{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.4em;color:rgba(242,235,220,.55);margin-top:8px;text-indent:.4em;}

  /* carrito */
  body[data-tpl="x-tenaza"] #cart-fab{
    background:var(--tn-oro) !important;color:#022A20 !important;border-radius:14px !important;
    font-family:'Cinzel',serif !important;font-weight:700 !important;
    box-shadow:0 14px 34px rgba(0,0,0,.5) !important;
  }
  body[data-tpl="x-tenaza"] #cart-fab #fab-cant{background:#022A20 !important;color:var(--tn-oro) !important;}
  body[data-tpl="x-tenaza"] #cart h2{font-family:'Marcellus',serif;}
  body[data-tpl="x-tenaza"] #cart .cart-row .st-add{background:var(--tn-oro) !important;color:#022A20 !important;}

  @media(max-width:380px){
    body[data-tpl="x-tenaza"] .tn-nombre{font-size:29px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🦀"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const panel = (it, cat) => `
      <article class="tn-card" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="tn-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="tn-body">
          <div class="tn-nom">${it.nombre}</div>
          ${it.desc ? `<div class="tn-desc">${it.desc}</div>` : ``}
          <div class="tn-foot"><span class="tn-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="tn-sec" id="cat-${slug(c.categoria)}">
        <div class="tn-cat"><h2>${c.categoria}</h2><span class="n">${(c.items || []).length}</span></div>
        ${(c.items || []).map((it) => panel(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const partes = (R.slogan || "").split("·").map((s) => s.trim());

    root.innerHTML = `
      <header class="tn-top">
        <div class="tn-corona">♛</div>
        ${R.logo ? `<div class="tn-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <h1 class="tn-nombre">${R.nombre.toUpperCase()}</h1>
        <div class="tn-sub">${partes[0] || "Crab Food House"}</div>
        <div class="tn-by">${partes[1] || "By Liz & Oscar"}</div>
        <div class="tn-ola"></div>
        <div class="tn-datos">
          ${R.promo ? `<span>${R.promo}</span>` : ``}
          ${R.direccion ? `<span>📍 ${R.direccion.split("·")[0].trim()}</span>` : ``}
        </div>
      </header>
      <div class="tn-search"><input id="tn-q" type="text" placeholder="Buscar ceviches, cangrejo…"></div>
      <nav class="tn-nav">${nav}</nav>
      ${secciones}
      <p class="tn-none" id="tn-none">Sin resultados 🌊</p>
      <div class="tn-fin"><div class="c">♛</div><div class="t">${R.nombre} · Crab Food House</div></div>`;

    /* buscador */
    const q = root.querySelector("#tn-q"), none = root.querySelector("#tn-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".tn-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".tn-card").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("tn-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("tn-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    const botones = [...root.querySelectorAll(".tn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -75% 0px" });
      root.querySelectorAll(".tn-sec").forEach((s) => io.observe(s));
    }
  },
};
