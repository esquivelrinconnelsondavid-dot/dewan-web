/* x-ales — "Esquina Pop" — plantilla EXCLUSIVA de La Esquina de Ales.
   Amarillo vivo del logo, stickers con borde grueso, mascota al frente:
   el asadero alegre del barrio. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-ales"] = {
  label: "Esquina Pop",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Baloo+2:wght@500;600;700;800&display=swap');

  body[data-tpl="x-ales"]{
    --al-rojo:#E11224; --al-azul:#1D2B7C; --al-amarillo:#FFE500;
    background:#FFE500;
    background-image:radial-gradient(rgba(255,255,255,.55) 2.2px, transparent 2.6px);
    background-size:26px 26px;
    color:#22232A; font-family:'Baloo 2',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-ales"] #app{overflow-x:hidden;}

  /* ---------- BANNER ROJO ---------- */
  body[data-tpl="x-ales"] .al-top{padding:calc(18px + env(safe-area-inset-top)) 16px 4px;}
  body[data-tpl="x-ales"] .al-banner{
    display:flex;align-items:center;gap:14px;background:var(--al-rojo);
    border:4px solid #fff;border-radius:24px;padding:16px;transform:rotate(-1deg);
    box-shadow:0 10px 0 rgba(29,43,124,.22), 0 18px 34px rgba(160,10,25,.3);
  }
  body[data-tpl="x-ales"] .al-logo{
    flex:0 0 auto;width:88px;height:88px;border-radius:50%;overflow:hidden;background:#fff;
    border:4px solid #fff;box-shadow:0 6px 14px rgba(0,0,0,.25);transform:rotate(3deg);
  }
  body[data-tpl="x-ales"] .al-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-ales"] .al-tit{font-family:'Titan One',cursive;font-size:24px;line-height:1.04;color:#fff;text-shadow:0 3px 0 rgba(120,6,16,.45);}
  body[data-tpl="x-ales"] .al-sub{font-weight:700;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#FFD9DC;margin-top:6px;}
  body[data-tpl="x-ales"] .al-meta{display:flex;flex-wrap:wrap;gap:7px;padding:14px 4px 0;justify-content:center;}
  body[data-tpl="x-ales"] .al-meta span{
    font-weight:700;font-size:12px;color:#fff;background:var(--al-azul);
    border-radius:999px;padding:7px 13px;box-shadow:0 4px 0 rgba(0,0,0,.14);
  }

  /* ---------- NAV STICKERS ---------- */
  body[data-tpl="x-ales"] .al-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:9px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;background:rgba(255,229,0,.94);backdrop-filter:blur(6px);
  }
  body[data-tpl="x-ales"] .al-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-ales"] .al-nav button{
    flex:0 0 auto;font-family:'Titan One',cursive;font-size:13px;color:var(--al-azul);
    background:#fff;border:3px solid var(--al-azul);border-radius:14px;padding:9px 15px;
    cursor:pointer;white-space:nowrap;box-shadow:0 4px 0 rgba(29,43,124,.3);
  }
  body[data-tpl="x-ales"] .al-nav button:nth-child(odd){transform:rotate(-1.2deg);}
  body[data-tpl="x-ales"] .al-nav button:nth-child(even){transform:rotate(1.2deg);}
  body[data-tpl="x-ales"] .al-nav button.activa{
    background:var(--al-rojo);border-color:#8E0714;color:#fff;box-shadow:0 4px 0 #8E0714;
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-ales"] .al-sec{padding:6px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-ales"] .al-cat{
    display:inline-block;font-family:'Titan One',cursive;font-size:19px;color:#fff;
    background:var(--al-azul);border-radius:13px;padding:8px 18px;margin:20px 0 14px;
    transform:rotate(-1deg);box-shadow:0 5px 0 rgba(0,0,0,.18);
  }

  /* ---------- TARJETAS STICKER ---------- */
  body[data-tpl="x-ales"] .al-card{
    position:relative;display:flex;gap:13px;align-items:center;background:#fff;
    border:3px solid #23242C;border-radius:19px;padding:13px 13px 13px 13px;margin-bottom:14px;
    box-shadow:0 7px 0 rgba(35,36,44,.16);
  }
  body[data-tpl="x-ales"] .al-card:nth-child(odd){transform:rotate(.5deg);}
  body[data-tpl="x-ales"] .al-card:nth-child(even){transform:rotate(-.5deg);}
  body[data-tpl="x-ales"] .al-media{
    flex:0 0 auto;width:60px;height:60px;border-radius:50%;overflow:hidden;position:relative;
    background:#FFF4C2;border:3px solid var(--al-rojo);
    display:flex;align-items:center;justify-content:center;font-size:27px;
  }
  body[data-tpl="x-ales"] .al-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-ales"] .al-body{flex:1;min-width:0;}
  body[data-tpl="x-ales"] .al-nom{font-family:'Titan One',cursive;font-size:14.5px;line-height:1.2;color:var(--al-azul);}
  body[data-tpl="x-ales"] .al-desc{font-weight:500;font-size:12.5px;color:#6B6B57;line-height:1.35;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-ales"] .al-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="x-ales"] .al-precio{
    font-family:'Titan One',cursive;font-size:14.5px;color:#fff;background:var(--al-rojo);
    border-radius:999px;padding:6px 13px;transform:rotate(-2deg);
    box-shadow:0 4px 0 #8E0714;white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-ales"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-ales"] [data-add]{
    width:37px;height:37px;border-radius:50%;border:3px solid #8E0714;cursor:pointer;
    background:var(--al-rojo);color:#fff;font-size:21px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 0 #8E0714;
  }
  body[data-tpl="x-ales"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 #8E0714;}
  body[data-tpl="x-ales"] [data-sub]{
    width:32px;height:32px;border-radius:50%;border:3px solid var(--al-azul);background:#fff;color:var(--al-azul);
    font-size:18px;font-weight:800;display:none;align-items:center;justify-content:center;cursor:pointer;
    box-shadow:0 3px 0 rgba(29,43,124,.3);
  }
  body[data-tpl="x-ales"] [data-cant]{display:none;font-family:'Titan One';font-size:15px;color:var(--al-azul);min-width:18px;text-align:center;}
  body[data-tpl="x-ales"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-ales"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-ales"] .al-fin{
    text-align:center;padding:28px 0 10px;font-family:'Titan One',cursive;font-size:16px;color:var(--al-azul);
  }

  /* carrito */
  body[data-tpl="x-ales"] #cart-fab{
    background:var(--al-rojo) !important;color:#fff !important;border:3px solid #8E0714 !important;
    border-radius:18px !important;font-family:'Titan One',cursive !important;font-weight:400 !important;
    box-shadow:0 6px 0 #8E0714, 0 16px 30px rgba(160,10,25,.35) !important;
  }
  body[data-tpl="x-ales"] #cart-fab #fab-cant{background:#fff !important;color:var(--al-rojo) !important;}
  body[data-tpl="x-ales"] #cart h2{font-family:'Titan One',cursive;color:var(--al-azul);}
  body[data-tpl="x-ales"] #cart .cart-row .st-add{background:var(--al-rojo) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-ales"] .al-tit{font-size:20px;}
    body[data-tpl="x-ales"] .al-logo{width:74px;height:74px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍗"));
    const cats = R.menu || [];

    const sticker = (it, cat) => `
      <article class="al-card">
        <div class="al-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="al-body">
          <div class="al-nom">${it.nombre}</div>
          ${it.desc ? `<div class="al-desc">${it.desc}</div>` : ``}
          <div class="al-foot"><span class="al-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="al-sec" id="cat-${slug(c.categoria)}">
        <div class="al-cat">${c.categoria}</div>
        ${(c.items || []).map((it) => sticker(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || ""]).filter(Boolean);

    root.innerHTML = `
      <header class="al-top">
        <div class="al-banner">
          ${R.logo ? `<div class="al-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
          <div>
            <h1 class="al-tit">${R.nombre}</h1>
            <div class="al-sub">Asaderos · Riobamba</div>
          </div>
        </div>
        <div class="al-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      </header>
      <nav class="al-nav">${nav}</nav>
      ${secciones}
      <div class="al-fin">😉👌 ¡El sabor de la esquina!</div>`;

    const botones = [...root.querySelectorAll(".al-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".al-sec").forEach((s) => io.observe(s));
    }
  },
};
