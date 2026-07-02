/* x-baltimore-n — "Baltimore de Día" — plantilla EXCLUSIVA de Baltimore Food & Drinks.
   Variante DE DÍA: la misma insignia de béisbol del flagship "Ballpark Nocturno"
   pero en tono invertido — crema cálida de tarde de estadio, sol de rayos tras la
   insignia, naranja Orioles sobre claro. Hero grande de apertura (~50vh) y el menú
   en UNA columna de tarjetas horizontales con la media redondeada a la izquierda
   y precio + stepper a la derecha. Script Yellowtail, varsity Oswald,
   costuras de béisbol y sombras duras quemadas. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-baltimore-n"] = {
  label: "Baltimore de Día",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Yellowtail&family=Oswald:wght@400;500;600;700&display=swap');

  body[data-tpl="x-baltimore-n"]{
    --bd-crema:#FAF2E6; --bd-papel:#FFFFFF; --bd-tinta:#1C130C;
    --bd-naranja:#E05B19; --bd-vivo:#FF7A1A; --bd-quema:#7A2E0B;
    --bd-linea:#EBDCC9; --bd-gris:#6E6257;
    background:var(--bd-crema);
    background-image:radial-gradient(120% 70% at 50% -10%, rgba(255,122,26,.12), transparent 60%);
    background-attachment:fixed;
    color:var(--bd-tinta); font-family:'Oswald',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-baltimore-n"] #app{overflow-x:hidden;}

  /* ---------- HERO DE DÍA: SOL + INSIGNIA ---------- */
  body[data-tpl="x-baltimore-n"] .bd-hero{
    position:relative; overflow:hidden; height:50vh; max-height:420px; min-height:330px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:calc(20px + env(safe-area-inset-top)) 20px 26px;
    background:radial-gradient(130% 100% at 50% -24%, #FFDFBE 0%, var(--bd-crema) 62%);
    border-bottom:1px solid var(--bd-linea);
  }
  body[data-tpl="x-baltimore-n"] .bd-hero::before{
    content:""; position:absolute; left:50%; top:-190px; transform:translateX(-50%);
    width:560px; height:560px; border-radius:50%;
    background:repeating-conic-gradient(from -6deg at 50% 50%, rgba(224,91,25,.09) 0deg 6deg, transparent 6deg 15deg);
    pointer-events:none;
  }
  body[data-tpl="x-baltimore-n"] .bd-hero > *{position:relative;z-index:1;}
  body[data-tpl="x-baltimore-n"] .bd-badge{
    position:relative;width:140px;height:140px;border-radius:50%;
    background:radial-gradient(circle at 50% 36%, #FFFFFF 0%, #FFF1DE 80%);
    border:2px solid var(--bd-naranja);
    box-shadow:0 0 0 6px var(--bd-crema), 0 0 0 8px var(--bd-naranja), 0 18px 36px rgba(122,46,11,.18);
  }
  body[data-tpl="x-baltimore-n"] .bd-arc{position:absolute;inset:0;width:100%;height:100%;}
  body[data-tpl="x-baltimore-n"] .bd-arc text{
    font-family:'Oswald',sans-serif;font-size:14.5px;font-weight:600;fill:var(--bd-quema);letter-spacing:.3em;
  }
  body[data-tpl="x-baltimore-n"] .bd-logo{
    position:absolute;left:50%;top:56%;transform:translate(-50%,-50%);
    width:78px;height:78px;border-radius:50%;overflow:hidden;background:#FFFFFF;
    border:2px solid var(--bd-vivo);box-shadow:0 8px 16px rgba(122,46,11,.22);
    display:flex;align-items:center;justify-content:center;font-size:36px;
  }
  body[data-tpl="x-baltimore-n"] .bd-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-baltimore-n"] .bd-eyebrow{
    margin-top:14px;font-size:11px;font-weight:600;letter-spacing:.42em;text-transform:uppercase;
    color:var(--bd-quema);text-indent:.42em;
  }
  body[data-tpl="x-baltimore-n"] .bd-nom{
    font-family:'Yellowtail',cursive;font-size:54px;line-height:1;color:var(--bd-naranja);
    margin-top:2px;text-shadow:0 3px 0 #FFFFFF, 0 14px 30px rgba(224,91,25,.28);
  }
  body[data-tpl="x-baltimore-n"] .bd-swoosh{display:block;width:190px;height:16px;margin:2px auto 0;}
  body[data-tpl="x-baltimore-n"] .bd-promo{
    margin-top:12px;display:inline-block;font-size:12px;font-weight:600;letter-spacing:.06em;
    color:#FFD9B8;background:var(--bd-tinta);border-radius:999px;padding:8px 16px;
    box-shadow:0 4px 0 var(--bd-quema);
  }

  /* ---------- NAV DE DÍA (chips sticky) ---------- */
  body[data-tpl="x-baltimore-n"] .bd-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:11px 16px;scrollbar-width:none;background:rgba(250,242,230,.94);
    backdrop-filter:blur(7px);border-bottom:1px solid var(--bd-linea);
  }
  body[data-tpl="x-baltimore-n"] .bd-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-baltimore-n"] .bd-nav button{
    flex:0 0 auto;font-family:'Oswald',sans-serif;font-size:12px;font-weight:600;
    letter-spacing:.1em;text-transform:uppercase;color:var(--bd-quema);
    background:var(--bd-papel);border:1.5px solid rgba(224,91,25,.5);border-radius:999px;
    padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-baltimore-n"] .bd-nav button.activa{
    background:var(--bd-vivo);border-color:var(--bd-vivo);color:var(--bd-tinta);
    box-shadow:0 3px 0 var(--bd-quema);
  }

  /* ---------- SECCIONES: DORSAL + RAYA ---------- */
  body[data-tpl="x-baltimore-n"] .bd-sec{padding:6px 16px 0;scroll-margin-top:64px;}
  body[data-tpl="x-baltimore-n"] .bd-cat{display:flex;align-items:center;gap:11px;margin:24px 0 13px;}
  body[data-tpl="x-baltimore-n"] .bd-num{
    font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;line-height:1;
    color:transparent;-webkit-text-stroke:1.6px var(--bd-naranja);letter-spacing:.02em;
  }
  body[data-tpl="x-baltimore-n"] .bd-cat h2{
    font-family:'Oswald',sans-serif;font-size:19px;font-weight:600;letter-spacing:.14em;
    text-transform:uppercase;color:var(--bd-tinta);line-height:1.1;
  }
  body[data-tpl="x-baltimore-n"] .bd-cat .bd-raya{
    flex:1;height:2px;border-radius:2px;
    background:linear-gradient(90deg, var(--bd-naranja), transparent);
  }

  /* ---------- TARJETAS HORIZONTALES (1 columna) ---------- */
  body[data-tpl="x-baltimore-n"] .bd-row{
    display:grid;grid-template-columns:86px 1fr auto;gap:13px;align-items:center;
    background:var(--bd-papel);border:1px solid var(--bd-linea);border-radius:18px;
    padding:11px 12px 11px 11px;margin-bottom:11px;
    box-shadow:0 12px 26px -18px rgba(122,46,11,.35);
  }
  body[data-tpl="x-baltimore-n"] .bd-media{
    width:86px;height:86px;border-radius:16px;overflow:hidden;
    border:2px solid var(--bd-vivo);background:#FFE8CD;
    display:flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-baltimore-n"] .bd-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-baltimore-n"] .bd-media.sin-foto{
    font-size:38px;
    background:
      radial-gradient(circle at -36% 50%, transparent 54%, rgba(224,91,25,.3) 55%, rgba(224,91,25,.3) 58%, transparent 59.5%),
      radial-gradient(circle at 136% 50%, transparent 54%, rgba(224,91,25,.3) 55%, rgba(224,91,25,.3) 58%, transparent 59.5%),
      radial-gradient(circle at 50% 32%, #FFE8CD, #FFD9AF 78%);
  }
  body[data-tpl="x-baltimore-n"] .bd-body{min-width:0;}
  body[data-tpl="x-baltimore-n"] .bd-nomit{
    font-family:'Oswald',sans-serif;font-size:15px;font-weight:600;letter-spacing:.02em;
    color:var(--bd-tinta);line-height:1.25;
  }
  body[data-tpl="x-baltimore-n"] .bd-desc{
    font-size:12.5px;font-weight:400;color:var(--bd-gris);line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-baltimore-n"] .bd-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
  body[data-tpl="x-baltimore-n"] .bd-precio{
    font-family:'Yellowtail',cursive;font-size:22px;line-height:1;color:var(--bd-quema);
    white-space:nowrap;text-shadow:0 1px 0 #FFFFFF;
  }

  /* ---------- STEPPERS ---------- */
  body[data-tpl="x-baltimore-n"] .bd-ctl{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-baltimore-n"] .bd-ctl [data-qtywrap]{display:none;align-items:center;gap:6px;}
  body[data-tpl="x-baltimore-n"] .bd-ctl [data-qtywrap].has-qty{display:inline-flex;}
  body[data-tpl="x-baltimore-n"] [data-add]{
    width:36px;height:36px;border-radius:10px;border:none;cursor:pointer;
    background:var(--bd-vivo);color:var(--bd-tinta);font-size:20px;font-weight:700;
    font-family:'Oswald',sans-serif;display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 0 var(--bd-quema);
  }
  body[data-tpl="x-baltimore-n"] [data-add]:active{transform:translateY(3px);box-shadow:0 1px 0 var(--bd-quema);}
  body[data-tpl="x-baltimore-n"] [data-sub]{
    width:30px;height:30px;border-radius:9px;border:1.5px solid var(--bd-naranja);cursor:pointer;
    background:var(--bd-papel);color:var(--bd-quema);font-size:17px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
  }
  body[data-tpl="x-baltimore-n"] [data-cant]{
    font-family:'Oswald',sans-serif;font-size:15px;font-weight:600;
    color:var(--bd-tinta);min-width:18px;text-align:center;
  }

  body[data-tpl="x-baltimore-n"] .bd-fin{
    text-align:center;padding:30px 0 12px;font-family:'Yellowtail',cursive;
    font-size:24px;color:var(--bd-naranja);text-shadow:0 1px 0 #FFFFFF;
  }

  /* ---------- CARRITO ---------- */
  body[data-tpl="x-baltimore-n"] #cart-fab{
    background:var(--bd-vivo) !important;color:var(--bd-tinta) !important;
    border:2px solid var(--bd-tinta) !important;border-radius:14px !important;
    font-family:'Oswald',sans-serif !important;font-weight:700 !important;letter-spacing:.05em !important;
    box-shadow:0 6px 0 var(--bd-quema), 0 18px 34px rgba(122,46,11,.3) !important;
  }
  body[data-tpl="x-baltimore-n"] #cart-fab #fab-cant{background:var(--bd-tinta) !important;color:var(--bd-vivo) !important;}
  body[data-tpl="x-baltimore-n"] #cart h2{
    font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
    color:#141210;border-left:4px solid var(--bd-naranja);padding-left:10px;
  }
  body[data-tpl="x-baltimore-n"] #cart .cart-row .st-add{background:var(--bd-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-baltimore-n"] .bd-nom{font-size:44px;}
    body[data-tpl="x-baltimore-n"] .bd-badge{width:122px;height:122px;}
    body[data-tpl="x-baltimore-n"] .bd-logo{width:68px;height:68px;font-size:30px;}
    body[data-tpl="x-baltimore-n"] .bd-arc text{font-size:13px;letter-spacing:.24em;}
    body[data-tpl="x-baltimore-n"] .bd-hero{min-height:310px;}
    body[data-tpl="x-baltimore-n"] .bd-row{grid-template-columns:72px 1fr auto;gap:10px;}
    body[data-tpl="x-baltimore-n"] .bd-media{width:72px;height:72px;}
    body[data-tpl="x-baltimore-n"] .bd-media.sin-foto{font-size:32px;}
    body[data-tpl="x-baltimore-n"] .bd-precio{font-size:20px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="bd-row" data-n="${(it.nombre || "").toLowerCase()}">
        <div class="bd-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="bd-body">
          <div class="bd-nomit">${it.nombre}</div>
          ${it.desc ? `<div class="bd-desc">${it.desc}</div>` : ``}
        </div>
        <div class="bd-right">
          <span class="bd-precio">$${Number(it.precio).toFixed(2)}</span>
          <span class="bd-ctl">${ctrl(it.id)}</span>
        </div>
      </article>`;

    const secciones = cats.map((c, i) => `
      <section class="bd-sec" id="cat-${slug(c.categoria)}">
        <div class="bd-cat">
          <span class="bd-num">${String(i + 1).padStart(2, "0")}</span>
          <h2>${c.categoria}</h2>
          <span class="bd-raya"></span>
        </div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="bd-hero">
        <div class="bd-badge">
          <svg class="bd-arc" viewBox="0 0 176 176" aria-hidden="true">
            <defs><path id="bdn-arco" d="M88,88 m-64,0 a64,64 0 1,1 128,0"></path></defs>
            <text><textPath href="#bdn-arco" startOffset="50%" text-anchor="middle">ARE YOU READY FOR?</textPath></text>
          </svg>
          <div class="bd-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : `⚾`}</div>
        </div>
        <div class="bd-eyebrow">Food &amp; Drinks · Multiplaza</div>
        <h1 class="bd-nom">${R.nombre}</h1>
        <svg class="bd-swoosh" viewBox="0 0 190 16" aria-hidden="true">
          <path d="M6 11 Q95 1 184 8" fill="none" stroke="#E05B19" stroke-width="4.5" stroke-linecap="round"></path>
        </svg>
        ${R.promo ? `<span class="bd-promo">${R.promo}</span>` : ``}
      </header>
      <nav class="bd-nav">${nav}</nav>
      ${secciones}
      <div class="bd-fin">#MomentosBaltimore ⚾</div>`;

    const botones = [...root.querySelectorAll(".bd-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -72% 0px" });
      root.querySelectorAll(".bd-sec").forEach((s) => io.observe(s));
    }
  },
};
