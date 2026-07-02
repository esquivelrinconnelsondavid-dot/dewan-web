/* x-baltimore — "Ballpark Nocturno" — plantilla EXCLUSIVA de Baltimore Food & Drinks.
   Insignia circular de béisbol con texto en arco, script naranja estilo Orioles
   sobre negro profundo, nav varsity y filas con dorsal: el patio de comidas
   con luces de estadio. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-baltimore"] = {
  label: "Ballpark Nocturno",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Yellowtail&family=Oswald:wght@400;500;600;700&display=swap');

  body[data-tpl="x-baltimore"]{
    --bt-negro:#0D0D0D; --bt-naranja:#E05B19; --bt-vivo:#FF7A1A;
    --bt-panel:#17130F; --bt-linea:#2B211A; --bt-gris:#BCAE9F; --bt-quema:#7A2E0B;
    background:var(--bt-negro);
    background-image:
      radial-gradient(120% 82% at 50% -6%, rgba(224,91,25,.14), transparent 62%),
      radial-gradient(90% 60% at 50% 118%, rgba(255,122,26,.06), transparent 58%);
    background-attachment:fixed;
    color:#F4EEE7; font-family:'Oswald',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-baltimore"] #app{overflow-x:hidden;}

  /* ---------- HEADER: INSIGNIA + ARCO ---------- */
  body[data-tpl="x-baltimore"] .bt-top{
    padding:calc(20px + env(safe-area-inset-top)) 16px 6px;text-align:center;
  }
  body[data-tpl="x-baltimore"] .bt-badge{
    position:relative;width:176px;height:176px;margin:8px auto 0;border-radius:50%;
    background:radial-gradient(circle at 50% 38%, #1C1610 0%, #0A0908 78%);
    border:2px solid var(--bt-naranja);
    box-shadow:0 0 0 6px var(--bt-negro), 0 0 0 8px var(--bt-naranja), 0 22px 44px rgba(0,0,0,.6);
  }
  body[data-tpl="x-baltimore"] .bt-arc{position:absolute;inset:0;width:100%;height:100%;}
  body[data-tpl="x-baltimore"] .bt-arc text{
    font-family:'Oswald',sans-serif;font-size:14.5px;font-weight:600;fill:#FFFFFF;letter-spacing:.3em;
  }
  body[data-tpl="x-baltimore"] .bt-logo{
    position:absolute;left:50%;top:56%;transform:translate(-50%,-50%);
    width:96px;height:96px;border-radius:50%;overflow:hidden;background:#000;
    border:2px solid var(--bt-vivo);box-shadow:0 8px 18px rgba(0,0,0,.55);
    display:flex;align-items:center;justify-content:center;font-size:44px;
  }
  body[data-tpl="x-baltimore"] .bt-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-baltimore"] .bt-eyebrow{
    margin-top:16px;font-size:11px;font-weight:600;letter-spacing:.42em;text-transform:uppercase;
    color:#FFFFFF;text-indent:.42em;
  }
  body[data-tpl="x-baltimore"] .bt-nom{
    font-family:'Yellowtail',cursive;font-size:58px;line-height:1;color:var(--bt-vivo);
    margin-top:2px;text-shadow:0 4px 0 rgba(122,46,11,.55), 0 14px 34px rgba(224,91,25,.3);
  }
  body[data-tpl="x-baltimore"] .bt-swoosh{display:block;width:190px;height:16px;margin:2px auto 0;}
  body[data-tpl="x-baltimore"] .bt-hash{
    display:inline-block;margin-top:12px;font-size:12px;font-weight:700;letter-spacing:.12em;
    text-transform:uppercase;color:var(--bt-negro);background:var(--bt-vivo);
    border-radius:999px;padding:7px 16px;box-shadow:0 4px 0 var(--bt-quema);
  }
  body[data-tpl="x-baltimore"] .bt-meta{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;padding:14px 4px 4px;}
  body[data-tpl="x-baltimore"] .bt-meta span{
    font-size:11px;font-weight:500;letter-spacing:.06em;color:#EDE4D9;
    border:1px solid var(--bt-linea);border-radius:999px;padding:6px 12px;background:rgba(23,19,15,.7);
  }

  /* ---------- NAV VARSITY ---------- */
  body[data-tpl="x-baltimore"] .bt-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;background:rgba(13,13,13,.93);
    backdrop-filter:blur(7px);border-bottom:1px solid var(--bt-linea);
  }
  body[data-tpl="x-baltimore"] .bt-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-baltimore"] .bt-nav button{
    flex:0 0 auto;font-family:'Oswald',sans-serif;font-size:12px;font-weight:600;
    letter-spacing:.1em;text-transform:uppercase;color:#F4EEE7;
    background:var(--bt-panel);border:1.5px solid var(--bt-naranja);border-radius:999px;
    padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-baltimore"] .bt-nav button.activa{
    background:var(--bt-vivo);border-color:var(--bt-vivo);color:var(--bt-negro);
    box-shadow:0 3px 0 var(--bt-quema);
  }

  /* ---------- SECCIONES: MARCADOR + DORSAL ---------- */
  body[data-tpl="x-baltimore"] .bt-sec{padding:8px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-baltimore"] .bt-cat{display:flex;align-items:center;gap:11px;margin:22px 0 13px;}
  body[data-tpl="x-baltimore"] .bt-num{
    font-family:'Oswald',sans-serif;font-size:30px;font-weight:700;line-height:1;
    color:transparent;-webkit-text-stroke:1.6px var(--bt-vivo);letter-spacing:.02em;
  }
  body[data-tpl="x-baltimore"] .bt-cat h2{
    font-family:'Oswald',sans-serif;font-size:20px;font-weight:600;letter-spacing:.14em;
    text-transform:uppercase;color:#FFFFFF;line-height:1.1;
  }
  body[data-tpl="x-baltimore"] .bt-cat .bt-raya{
    flex:1;height:2px;border-radius:2px;
    background:linear-gradient(90deg, var(--bt-naranja), transparent);
  }

  /* ---------- FILAS CON BORDE NARANJA ---------- */
  body[data-tpl="x-baltimore"] .bt-row{
    display:flex;gap:13px;align-items:center;background:var(--bt-panel);
    border:1px solid var(--bt-linea);border-left:4px solid var(--bt-naranja);
    border-radius:13px;padding:12px 12px 12px 14px;margin-bottom:10px;
  }
  body[data-tpl="x-baltimore"] .bt-media{
    flex:0 0 auto;width:54px;height:54px;margin:6px 8px 6px 4px;border-radius:15px;
    transform:rotate(45deg);overflow:hidden;background:#221A12;
    border:2px solid var(--bt-vivo);box-shadow:0 6px 14px rgba(0,0,0,.45);
    display:flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-baltimore"] .bt-media > span{
    flex:0 0 auto;width:142%;height:142%;transform:rotate(-45deg);
    display:flex;align-items:center;justify-content:center;font-size:26px;
  }
  body[data-tpl="x-baltimore"] .bt-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-baltimore"] .bt-body{flex:1;min-width:0;}
  body[data-tpl="x-baltimore"] .bt-item-nom{
    font-family:'Oswald',sans-serif;font-size:15px;font-weight:600;letter-spacing:.02em;
    color:#FFFFFF;line-height:1.25;
  }
  body[data-tpl="x-baltimore"] .bt-desc{
    font-size:12.5px;font-weight:400;color:var(--bt-gris);line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-baltimore"] .bt-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:7px;}
  body[data-tpl="x-baltimore"] .bt-precio{
    font-family:'Yellowtail',cursive;font-size:24px;line-height:1;color:var(--bt-vivo);
    white-space:nowrap;text-shadow:0 2px 0 rgba(122,46,11,.5);
  }

  /* ---------- STEPPERS ---------- */
  body[data-tpl="x-baltimore"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-baltimore"] [data-add]{
    width:36px;height:36px;border-radius:10px;border:none;cursor:pointer;
    background:var(--bt-vivo);color:var(--bt-negro);font-size:20px;font-weight:700;
    font-family:'Oswald',sans-serif;display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 var(--bt-quema);
  }
  body[data-tpl="x-baltimore"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--bt-quema);}
  body[data-tpl="x-baltimore"] [data-sub]{
    width:31px;height:31px;border-radius:9px;border:1.5px solid var(--bt-vivo);cursor:pointer;
    background:transparent;color:var(--bt-vivo);font-size:17px;font-weight:700;
    display:none;align-items:center;justify-content:center;
  }
  body[data-tpl="x-baltimore"] [data-cant]{
    display:none;font-family:'Oswald',sans-serif;font-size:15px;font-weight:600;
    color:#FFFFFF;min-width:18px;text-align:center;
  }
  body[data-tpl="x-baltimore"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-baltimore"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-baltimore"] .bt-fin{
    text-align:center;padding:30px 0 12px;font-family:'Yellowtail',cursive;
    font-size:24px;color:var(--bt-vivo);
  }

  /* ---------- CARRITO ---------- */
  body[data-tpl="x-baltimore"] #cart-fab{
    background:var(--bt-vivo) !important;color:var(--bt-negro) !important;
    border:2px solid var(--bt-negro) !important;border-radius:14px !important;
    font-family:'Oswald',sans-serif !important;font-weight:700 !important;letter-spacing:.05em !important;
    box-shadow:0 6px 0 var(--bt-quema), 0 18px 34px rgba(0,0,0,.55) !important;
  }
  body[data-tpl="x-baltimore"] #cart-fab #fab-cant{background:var(--bt-negro) !important;color:var(--bt-vivo) !important;}
  body[data-tpl="x-baltimore"] #cart h2{
    font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
    color:#141210;border-left:4px solid var(--bt-naranja);padding-left:10px;
  }
  body[data-tpl="x-baltimore"] #cart .cart-row .st-add{background:var(--bt-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-baltimore"] .bt-nom{font-size:46px;}
    body[data-tpl="x-baltimore"] .bt-badge{width:152px;height:152px;}
    body[data-tpl="x-baltimore"] .bt-logo{width:82px;height:82px;}
    body[data-tpl="x-baltimore"] .bt-arc text{font-size:13px;letter-spacing:.24em;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="bt-row" data-n="${(it.nombre || "").toLowerCase()}">
        <div class="bt-media" data-media><span>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</span></div>
        <div class="bt-body">
          <div class="bt-item-nom">${it.nombre}</div>
          ${it.desc ? `<div class="bt-desc">${it.desc}</div>` : ``}
          <div class="bt-foot"><span class="bt-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c, i) => `
      <section class="bt-sec" id="cat-${slug(c.categoria)}">
        <div class="bt-cat">
          <span class="bt-num">${String(i + 1).padStart(2, "0")}</span>
          <h2>${c.categoria}</h2>
          <span class="bt-raya"></span>
        </div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const badges = (R.badges && R.badges.length ? R.badges : [R.promo || ""]).filter(Boolean);

    root.innerHTML = `
      <header class="bt-top">
        <div class="bt-badge">
          <svg class="bt-arc" viewBox="0 0 176 176" aria-hidden="true">
            <defs><path id="bt-arco" d="M88,88 m-64,0 a64,64 0 1,1 128,0"></path></defs>
            <text><textPath href="#bt-arco" startOffset="50%" text-anchor="middle">ARE YOU READY FOR?</textPath></text>
          </svg>
          <div class="bt-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : `⚾`}</div>
        </div>
        <div class="bt-eyebrow">Food &amp; Drinks · Multiplaza</div>
        <h1 class="bt-nom">${R.nombre}</h1>
        <svg class="bt-swoosh" viewBox="0 0 190 16" aria-hidden="true">
          <path d="M6 11 Q95 1 184 8" fill="none" stroke="#E05B19" stroke-width="4.5" stroke-linecap="round"></path>
        </svg>
        <div><span class="bt-hash">#MomentosBaltimore</span></div>
        <div class="bt-meta">${badges.map((b) => `<span>${b}</span>`).join("")}</div>
      </header>
      <nav class="bt-nav">${nav}</nav>
      ${secciones}
      <div class="bt-fin">#MomentosBaltimore ⚾</div>`;

    const botones = [...root.querySelectorAll(".bt-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".bt-sec").forEach((s) => io.observe(s));
    }
  },
};
