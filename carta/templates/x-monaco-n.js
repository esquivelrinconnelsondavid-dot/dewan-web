/* x-monaco-n — "Mônaco de Noche" — plantilla EXCLUSIVA de Mônaco Parrillada & Pizza.
   Variante NOCTURNA: hero grande de apertura con el domo brillando sobre fondo
   oscuro de brasa y el menú en una columna de tarjetas horizontales. Misma
   paleta del flagship invertida: naranja domo, crema de carta, arcos y ◆. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-monaco-n"] = {
  label: "Mônaco de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Prata&family=Italianno&family=Jost:wght@400;500;600;700&display=swap');

  body[data-tpl="x-monaco-n"]{
    --mn-fondo:#1C110A; --mn-carbon:#2A190E; --mn-naranja:#FF7E1F; --mn-brasa:#FFA24D;
    --mn-crema:#FFE9CF; --mn-arena:#C89F79; --mn-borde:rgba(255,126,31,.2);
    background:var(--mn-fondo); color:var(--mn-crema);
    font-family:'Jost',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-monaco-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO ---------- */
  body[data-tpl="x-monaco-n"] .mn-hero{
    position:relative; overflow:hidden; height:50vh; max-height:420px; min-height:300px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:calc(24px + env(safe-area-inset-top)) 24px 34px;
    background:radial-gradient(circle at 50% -30%,#5A2E10,var(--mn-fondo) 62%);
    border-bottom:1px solid var(--mn-borde);
  }
  body[data-tpl="x-monaco-n"] .mn-hero::before{
    content:""; position:absolute; left:50%; bottom:-58%; transform:translateX(-50%);
    width:min(430px,120vw); aspect-ratio:1/1; border-radius:50%;
    background:radial-gradient(circle at 50% 18%,rgba(252,102,8,.34),transparent 62%);
    border:1.5px solid rgba(255,126,31,.4); clip-path:inset(0 0 50% 0); pointer-events:none;
  }
  body[data-tpl="x-monaco-n"] .mn-hero > *{position:relative;z-index:1;}
  body[data-tpl="x-monaco-n"] .mn-logo{
    width:62px;height:62px;border-radius:50%;overflow:hidden;margin:0 auto 10px;
    border:2px solid rgba(255,162,77,.6);background:var(--mn-carbon);
    display:flex;align-items:center;justify-content:center;font-size:28px;
    box-shadow:0 0 26px rgba(252,102,8,.35);
  }
  body[data-tpl="x-monaco-n"] .mn-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-monaco-n"] .mn-sub{font-weight:600;font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--mn-brasa);}
  body[data-tpl="x-monaco-n"] .mn-script{
    font-family:'Italianno',cursive;font-size:76px;line-height:.9;margin:10px 0 2px;color:var(--mn-crema);
    text-shadow:0 0 30px rgba(252,102,8,.45);
  }
  body[data-tpl="x-monaco-n"] .mn-rule{width:64px;height:1px;background:rgba(255,162,77,.5);margin:14px auto 0;position:relative;}
  body[data-tpl="x-monaco-n"] .mn-rule::after{content:"◆";position:absolute;left:50%;top:50%;transform:translate(-50%,-52%);font-size:8px;color:var(--mn-brasa);}
  body[data-tpl="x-monaco-n"] .mn-slogan{font-family:'Italianno',cursive;font-size:29px;margin-top:12px;color:var(--mn-arena);}
  body[data-tpl="x-monaco-n"] .mn-promo{
    margin-top:14px;display:inline-block;font-weight:600;font-size:12.5px;color:var(--mn-crema);
    border:1px solid var(--mn-borde);background:rgba(42,25,14,.75);border-radius:999px;padding:8px 16px;
  }

  /* ---------- BUSCADOR ---------- */
  body[data-tpl="x-monaco-n"] .mn-search{padding:16px 20px 2px;}
  body[data-tpl="x-monaco-n"] .mn-search input{
    width:100%; border:1px solid var(--mn-borde); background:var(--mn-carbon); border-radius:999px;
    padding:12px 18px; font-family:'Jost'; font-size:15.5px; color:var(--mn-crema); outline:none;
  }
  body[data-tpl="x-monaco-n"] .mn-search input::placeholder{color:#A17C5B;}

  /* ---------- NAV STICKY ---------- */
  body[data-tpl="x-monaco-n"] .mn-nav{
    position:sticky; top:0; z-index:30; background:rgba(28,17,10,.96);
    display:flex; gap:8px; overflow-x:auto; padding:12px 16px; scrollbar-width:none;
    border-bottom:1px solid var(--mn-borde); backdrop-filter:blur(6px);
  }
  body[data-tpl="x-monaco-n"] .mn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-monaco-n"] .mn-nav button{
    flex:0 0 auto; cursor:pointer; white-space:nowrap;
    font-family:'Jost'; font-weight:600; font-size:12.5px; letter-spacing:.1em; text-transform:uppercase;
    color:var(--mn-arena); background:transparent; border:1px solid rgba(200,159,121,.35); border-radius:999px;
    padding:8px 15px;
  }
  body[data-tpl="x-monaco-n"] .mn-nav button.activa{
    color:#241407; background:var(--mn-naranja); border-color:var(--mn-naranja); font-weight:700;
    box-shadow:0 0 22px rgba(252,102,8,.45);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-monaco-n"] .mn-sec{padding:4px 18px 0;scroll-margin-top:66px;}
  body[data-tpl="x-monaco-n"] .mn-cat{display:flex;align-items:center;gap:14px;margin:26px 0 12px;}
  body[data-tpl="x-monaco-n"] .mn-cat::before, body[data-tpl="x-monaco-n"] .mn-cat::after{
    content:""; flex:1; height:1px; background:rgba(255,162,77,.25);
  }
  body[data-tpl="x-monaco-n"] .mn-cat span{
    font-family:'Italianno',cursive; font-size:40px; line-height:1; color:var(--mn-brasa);
    text-align:center; max-width:75%; text-shadow:0 0 18px rgba(252,102,8,.35);
  }

  /* ---------- TARJETAS HORIZONTALES (1 columna) ---------- */
  body[data-tpl="x-monaco-n"] .mn-item{
    display:grid; grid-template-columns:84px 1fr auto; gap:13px; align-items:center;
    background:var(--mn-carbon); border:1px solid var(--mn-borde); border-radius:18px;
    padding:11px 13px; margin-bottom:12px;
    box-shadow:0 16px 34px -20px rgba(0,0,0,.85);
  }
  body[data-tpl="x-monaco-n"] .mn-media{
    position:relative; width:84px; height:84px; border-radius:16px; overflow:hidden;
    background:radial-gradient(circle at 50% 32%,#3D2412,#241407 76%);
    display:flex; align-items:center; justify-content:center; font-size:36px;
  }
  body[data-tpl="x-monaco-n"] .mn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-monaco-n"] .mn-media.sin-foto::before{
    content:""; position:absolute; left:50%; top:10%; transform:translateX(-50%);
    width:74%; aspect-ratio:1/1; border:1.5px solid rgba(255,126,31,.35); border-radius:50%;
    clip-path:inset(0 0 55% 0);
  }
  body[data-tpl="x-monaco-n"] .mn-nom{font-family:'Prata',serif;font-size:15px;line-height:1.25;color:var(--mn-crema);}
  body[data-tpl="x-monaco-n"] .mn-desc{
    font-size:12.5px;color:#B08A66;line-height:1.4;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-monaco-n"] .mn-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
  body[data-tpl="x-monaco-n"] .mn-precio{
    font-family:'Prata',serif;font-size:16px;color:var(--mn-brasa);
    font-variant-numeric:tabular-nums;white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-monaco-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-monaco-n"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:var(--mn-naranja);color:#241407;
    font-size:20px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 0 18px rgba(252,102,8,.5);
  }
  body[data-tpl="x-monaco-n"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-monaco-n"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,162,77,.45);background:transparent;color:var(--mn-brasa);
    font-size:17px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-monaco-n"] [data-cant]{display:none;font-family:'Prata';font-size:14.5px;color:var(--mn-crema);min-width:16px;text-align:center;}
  body[data-tpl="x-monaco-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-monaco-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-monaco-n"] .mn-none{display:none;text-align:center;color:var(--mn-arena);font-weight:500;padding:34px 20px;}
  body[data-tpl="x-monaco-n"] .mn-hide{display:none !important;}
  body[data-tpl="x-monaco-n"] .mn-fin{
    text-align:center;padding:34px 0 10px;font-family:'Italianno',cursive;font-size:30px;color:#A17C5B;
  }

  /* carrito */
  body[data-tpl="x-monaco-n"] #cart-fab{
    background:var(--mn-naranja) !important;color:#241407 !important;border-radius:999px !important;
    font-family:'Jost' !important;font-weight:700 !important;
    box-shadow:0 0 26px rgba(252,102,8,.55) !important;
  }
  body[data-tpl="x-monaco-n"] #cart-fab #fab-cant{background:#241407 !important;color:var(--mn-brasa) !important;}
  body[data-tpl="x-monaco-n"] #cart h2{font-family:'Prata',serif;}
  body[data-tpl="x-monaco-n"] #cart .cart-row .st-add{background:var(--mn-naranja) !important;color:#241407 !important;}

  @media(max-width:380px){
    body[data-tpl="x-monaco-n"] .mn-script{font-size:62px;}
    body[data-tpl="x-monaco-n"] .mn-cat span{font-size:34px;}
    body[data-tpl="x-monaco-n"] .mn-item{grid-template-columns:72px 1fr auto;gap:10px;}
    body[data-tpl="x-monaco-n"] .mn-media{width:72px;height:72px;font-size:31px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="mn-item" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="mn-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div><div class="mn-nom">${it.nombre}</div>${it.desc ? `<div class="mn-desc">${it.desc}</div>` : ``}</div>
        <div class="mn-right"><span class="mn-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="mn-sec" id="cat-${slug(c.categoria)}">
        <div class="mn-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="mn-hero">
        <div class="mn-logo">${R.logo ? `<img src="${R.logo}" alt="">` : "🍽️"}</div>
        <div class="mn-sub">Parrillada &amp; Pizza</div>
        <h1 class="mn-script">${R.nombre}</h1>
        <div class="mn-rule"></div>
        <div class="mn-slogan">${R.slogan ? R.slogan.split("·")[0].trim() : "Tradición y Buen Gusto"}</div>
        ${R.promo ? `<div class="mn-promo">${R.promo}</div>` : ``}
      </header>
      <div class="mn-search"><input id="mn-q" type="text" placeholder="Buscar en la carta…"></div>
      <nav class="mn-nav">${nav}</nav>
      ${secciones}
      <p class="mn-none" id="mn-none">Sin resultados en la carta 🔍</p>
      <div class="mn-fin">Buenas noches y buen provecho</div>`;

    /* buscador */
    const q = root.querySelector("#mn-q"), none = root.querySelector("#mn-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".mn-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".mn-item").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("mn-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("mn-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".mn-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -72% 0px" });
      root.querySelectorAll(".mn-sec").forEach((s) => io.observe(s));
    }
  },
};
