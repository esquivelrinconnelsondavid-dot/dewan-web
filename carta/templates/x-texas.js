/* x-texas — "El Tablón" — plantilla EXCLUSIVA de Texas Asadero (desde 1989).
   Madera de rancho, fuego y tipografía del oeste: cada plato es un tablón
   marcado a fuego. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-texas"] = {
  label: "El Tablón Texas",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Rye&family=Bitter:ital,wght@0,400;0,600;0,800;1,400&display=swap');

  body[data-tpl="x-texas"]{
    --tx-fuego:#E8541C; --tx-brasa:#A03114; --tx-cactus:#4E8C3A; --tx-crema:#FFE9C8;
    background:
      repeating-linear-gradient(90deg, rgba(0,0,0,.07) 0 2px, transparent 2px 96px),
      repeating-linear-gradient(0deg, #8A5A2E 0 86px, #7A4B22 86px 90px);
    color:var(--tx-crema); font-family:'Bitter',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-texas"] #app{overflow-x:hidden;}

  /* ---------- CABECERA DE RANCHO ---------- */
  body[data-tpl="x-texas"] .tx-top{
    position:relative; text-align:center; padding:calc(24px + env(safe-area-inset-top)) 18px 10px;
  }
  body[data-tpl="x-texas"] .tx-top::before{
    content:""; position:absolute; left:50%; top:0; transform:translateX(-50%);
    width:340px; height:270px;
    background:radial-gradient(closest-side, rgba(255,120,20,.42), rgba(255,120,20,.12) 55%, transparent);
    pointer-events:none;
  }
  body[data-tpl="x-texas"] .tx-logo{position:relative;width:186px;margin:0 auto;filter:drop-shadow(0 14px 24px rgba(40,16,0,.55));border-radius:18px;}
  body[data-tpl="x-texas"] .tx-lema{
    position:relative; font-family:'Rye',serif; font-size:13px; letter-spacing:.28em; text-transform:uppercase;
    color:var(--tx-crema); margin-top:12px; text-shadow:0 2px 0 rgba(60,25,0,.6);
  }
  body[data-tpl="x-texas"] .tx-meta{position:relative;display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:13px;}
  body[data-tpl="x-texas"] .tx-meta span{
    font-size:11.5px;font-weight:600;color:var(--tx-crema);background:#3A2410;
    border:1px solid #C88A3C;border-radius:8px;padding:6px 11px;
    box-shadow:inset 0 1px 0 rgba(255,220,160,.18), 0 3px 8px rgba(30,12,0,.4);
  }
  body[data-tpl="x-texas"] .tx-soga{
    height:8px;margin:16px 14px 0;border-radius:99px;
    background:repeating-linear-gradient(60deg,#C88A3C 0 9px,#A96F27 9px 18px);
    box-shadow:0 2px 6px rgba(30,12,0,.5);
  }

  /* ---------- NAV MARCAS DE HIERRO ---------- */
  body[data-tpl="x-texas"] .tx-nav{
    position:sticky; top:0; z-index:30; display:flex; gap:8px; overflow-x:auto;
    padding:12px 16px; scrollbar-width:none;
    background:linear-gradient(180deg, rgba(74,44,16,.97), rgba(74,44,16,.9));
    border-bottom:2px solid #C88A3C;
  }
  body[data-tpl="x-texas"] .tx-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-texas"] .tx-nav button{
    flex:0 0 auto; font-family:'Rye',serif; font-size:12px; letter-spacing:.06em;
    color:var(--tx-crema); background:#2E1B0C; border:2px solid #C88A3C; border-radius:7px;
    padding:9px 14px; cursor:pointer; white-space:nowrap;
    box-shadow:inset 0 1px 0 rgba(255,220,160,.15);
  }
  body[data-tpl="x-texas"] .tx-nav button.activa{background:var(--tx-brasa);border-color:#FF9A4D;color:#fff;}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-texas"] .tx-sec{padding:4px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-texas"] .tx-cat{
    display:flex;align-items:center;gap:12px;margin:24px 2px 14px;
  }
  body[data-tpl="x-texas"] .tx-cat::before, body[data-tpl="x-texas"] .tx-cat::after{
    content:""; flex:1; height:2px;
    background:repeating-linear-gradient(90deg,#C88A3C 0 10px,transparent 10px 16px);
  }
  body[data-tpl="x-texas"] .tx-cat span{
    font-family:'Rye',serif;font-size:21px;color:var(--tx-crema);text-shadow:0 2px 0 rgba(60,25,0,.55);
    text-align:center;
  }

  /* ---------- TABLONES ---------- */
  body[data-tpl="x-texas"] .tx-card{
    position:relative; display:flex; gap:13px; align-items:center;
    background:linear-gradient(175deg,#B0783F,#96602F 70%,#8B5628);
    border:3px solid #4A2C10; border-radius:12px; padding:13px; margin-bottom:13px;
    box-shadow:inset 0 0 0 2px rgba(255,220,160,.16), 0 8px 16px -6px rgba(30,12,0,.55);
  }
  body[data-tpl="x-texas"] .tx-media{
    flex:0 0 auto; width:64px; height:64px; border-radius:9px; overflow:hidden; position:relative;
    background:#6E4218; border:2px dashed #E3B268; display:flex; align-items:center; justify-content:center;
    font-size:29px;
  }
  body[data-tpl="x-texas"] .tx-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-texas"] .tx-body{flex:1;min-width:0;}
  body[data-tpl="x-texas"] .tx-nom{
    font-family:'Rye',serif;font-size:15.5px;line-height:1.2;color:#241206;
    text-shadow:0 1px 0 rgba(255,225,170,.4);
  }
  body[data-tpl="x-texas"] .tx-desc{font-size:12.5px;line-height:1.4;color:#3F2610;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-texas"] .tx-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:9px;}
  body[data-tpl="x-texas"] .tx-precio{
    font-family:'Rye',serif;font-size:14.5px;color:#fff;
    background:linear-gradient(160deg,#FF8A2A,var(--tx-brasa));
    border-radius:7px;padding:5px 11px;transform:rotate(-2deg);
    box-shadow:0 4px 10px -3px rgba(160,49,20,.7);white-space:nowrap;
  }

  /* steppers latón */
  body[data-tpl="x-texas"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-texas"] [data-add]{
    width:36px;height:36px;border-radius:8px;border:2px solid #7A4B15;cursor:pointer;
    background:linear-gradient(180deg,#E3B268,#C88A3C);color:#2A1607;font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 #4A2C10;
  }
  body[data-tpl="x-texas"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 #4A2C10;}
  body[data-tpl="x-texas"] [data-sub]{
    width:32px;height:32px;border-radius:8px;border:2px solid #4A2C10;background:#6E4218;color:var(--tx-crema);
    font-size:18px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-texas"] [data-cant]{display:none;font-family:'Rye';font-size:15px;color:#241206;min-width:18px;text-align:center;}
  body[data-tpl="x-texas"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-texas"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-texas"] .tx-fin{
    text-align:center;padding:30px 0 12px;font-family:'Rye',serif;font-size:13px;letter-spacing:.2em;
    color:var(--tx-crema);text-shadow:0 2px 0 rgba(60,25,0,.6);
  }

  /* carrito */
  body[data-tpl="x-texas"] #cart-fab{
    background:linear-gradient(160deg,#FF8A2A,var(--tx-brasa)) !important;color:#fff !important;
    border:2px solid #4A2C10 !important;border-radius:12px !important;
    font-family:'Rye',serif !important;font-weight:400 !important;
    box-shadow:0 6px 0 #4A2C10, 0 16px 30px rgba(30,12,0,.5) !important;
  }
  body[data-tpl="x-texas"] #cart-fab #fab-cant{background:#FFE9C8 !important;color:var(--tx-brasa) !important;}
  body[data-tpl="x-texas"] #cart h2{font-family:'Rye',serif;}
  body[data-tpl="x-texas"] #cart .cart-row .st-add{background:#C88A3C !important;color:#2A1607 !important;}

  @media(max-width:380px){
    body[data-tpl="x-texas"] .tx-logo{width:158px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥩"));
    const cats = R.menu || [];

    const tablon = (it, cat) => `
      <article class="tx-card">
        <div class="tx-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="tx-body">
          <div class="tx-nom">${it.nombre}</div>
          ${it.desc ? `<div class="tx-desc">${it.desc}</div>` : ``}
          <div class="tx-foot"><span class="tx-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="tx-sec" id="cat-${slug(c.categoria)}">
        <div class="tx-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => tablon(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || "", R.direccion ? "📍 " + R.direccion.split("·")[0].trim() : ""]).filter(Boolean);

    root.innerHTML = `
      <header class="tx-top">
        ${R.logo ? `<img class="tx-logo" src="${R.logo}" alt="${R.nombre}">` : `<h1 class="tx-lema" style="font-size:30px">${R.nombre}</h1>`}
        <div class="tx-lema">Asadero · Riobamba</div>
        <div class="tx-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
        <div class="tx-soga"></div>
      </header>
      <nav class="tx-nav">${nav}</nav>
      ${secciones}
      <div class="tx-fin">🌵 Desde 1989 🔥</div>`;

    const botones = [...root.querySelectorAll(".tx-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".tx-sec").forEach((s) => io.observe(s));
    }
  },
};
