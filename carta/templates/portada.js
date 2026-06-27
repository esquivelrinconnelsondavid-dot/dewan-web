window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["portada"] = {
  label: "Portada",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&display=swap');

  body[data-tpl="portada"]{margin:0;background:#11100E;color:#1A1813;font-family:'Jost',system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding-bottom:122px;overflow-x:hidden;}
  body[data-tpl="portada"] *{box-sizing:border-box;}

  /* ---------- HERO COVER ---------- */
  body[data-tpl="portada"] .pt-hero{position:relative;min-height:78vh;max-height:600px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 24px 70px;background:linear-gradient(155deg,var(--marca),color-mix(in srgb,var(--tinta) 70%,#000));overflow:hidden;}
  body[data-tpl="portada"] .pt-hero .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55;}
  body[data-tpl="portada"] .pt-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.5));}
  body[data-tpl="portada"] .pt-hero > *{position:relative;z-index:1;}
  body[data-tpl="portada"] .pt-logo{width:84px;height:84px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,.5);margin-bottom:20px;background:#fff;}
  body[data-tpl="portada"] .pt-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="portada"] .pt-name{font-family:'Marcellus';font-size:clamp(40px,13vw,62px);line-height:1;color:#fff;margin:0;letter-spacing:.5px;}
  body[data-tpl="portada"] .pt-slo{font-family:'Jost';font-weight:300;font-size:14px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.88);margin:16px 0 0;}
  body[data-tpl="portada"] .pt-rule{width:42px;height:1px;background:rgba(255,255,255,.6);margin:18px auto;}
  body[data-tpl="portada"] .pt-promo{font-family:'Jost';font-weight:400;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:8px 18px;}
  body[data-tpl="portada"] .pt-down{position:absolute;bottom:80px;left:0;right:0;text-align:center;color:rgba(255,255,255,.8);font-size:24px;z-index:1;animation:pt-b 1.7s ease-in-out infinite;}
  @keyframes pt-b{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}

  /* ---------- HOJA ---------- */
  body[data-tpl="portada"] .pt-sheet{position:relative;background:#FBFAF7;border-radius:30px 30px 0 0;margin-top:-34px;padding:8px 0 0;box-shadow:0 -16px 40px rgba(0,0,0,.4);z-index:2;}
  body[data-tpl="portada"] .pt-handle{width:40px;height:4px;border-radius:4px;background:#d8d4cc;margin:10px auto 4px;}
  body[data-tpl="portada"] .pt-tabs{position:sticky;top:0;z-index:20;display:flex;gap:20px;overflow-x:auto;padding:13px 22px;background:rgba(251,250,247,.92);backdrop-filter:blur(8px);border-bottom:1px solid #eee7da;scrollbar-width:none;}
  body[data-tpl="portada"] .pt-tabs::-webkit-scrollbar{display:none;}
  body[data-tpl="portada"] .pt-tabs button{flex:0 0 auto;background:none;border:none;cursor:pointer;font-family:'Jost';font-weight:500;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:#a99f8e;padding:3px 0;white-space:nowrap;position:relative;}
  body[data-tpl="portada"] .pt-tabs button .rn{font-family:'Marcellus';margin-right:6px;color:var(--marca);}
  body[data-tpl="portada"] .pt-tabs button.activa{color:#1A1813;}
  body[data-tpl="portada"] .pt-tabs button.activa::after{content:"";position:absolute;left:0;right:0;bottom:-13px;height:2px;background:var(--marca);}

  /* ---------- SECCIÓN + filas ---------- */
  body[data-tpl="portada"] .pt-sec{padding:8px 22px 0;scroll-margin-top:54px;}
  body[data-tpl="portada"] .pt-sectt{font-family:'Marcellus';font-size:25px;color:#1A1813;margin:22px 0 6px;}
  body[data-tpl="portada"] .pt-row{display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid #efeae0;}
  body[data-tpl="portada"] .pt-thumb{flex:0 0 auto;width:64px;height:64px;border-radius:12px;overflow:hidden;background:color-mix(in srgb,var(--marca) 10%,#fff);display:flex;align-items:center;justify-content:center;}
  body[data-tpl="portada"] .pt-thumb img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="portada"] .pt-thumb .emo{font-size:30px;opacity:.85;}
  body[data-tpl="portada"] .pt-info{flex:1;min-width:0;}
  body[data-tpl="portada"] .pt-pn{font-family:'Marcellus';font-size:17px;color:#1A1813;line-height:1.2;margin-bottom:3px;}
  body[data-tpl="portada"] .pt-pd{font-family:'Jost';font-weight:300;font-size:12.5px;color:#8c8475;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="portada"] .pt-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex:0 0 auto;}
  body[data-tpl="portada"] .pt-pp{font-family:'Marcellus';font-size:17px;color:var(--marca);font-variant-numeric:tabular-nums;}

  /* ---------- stepper ---------- */
  body[data-tpl="portada"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="portada"] [data-add]{width:34px;height:34px;border-radius:50%;border:1px solid var(--marca);background:var(--marca);color:#fff;font-size:19px;font-weight:400;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;}
  body[data-tpl="portada"] [data-add]:active{transform:scale(.88);}
  body[data-tpl="portada"] [data-sub]{width:30px;height:30px;border-radius:50%;border:1px solid #d8d4cc;background:#fff;color:#1A1813;font-size:18px;line-height:1;cursor:pointer;display:none;align-items:center;justify-content:center;}
  body[data-tpl="portada"] [data-cant]{display:none;min-width:18px;text-align:center;font-family:'Marcellus';font-size:16px;padding:0 2px;}
  body[data-tpl="portada"] [data-qtywrap].has-qty{gap:5px;}
  body[data-tpl="portada"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="portada"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="portada"] .pt-end{text-align:center;padding:30px 0 8px;font-family:'Marcellus';color:var(--marca);font-size:16px;}

  body[data-tpl="portada"] #cart-fab{background:#1A1813 !important;color:#FBFAF7 !important;border-radius:14px !important;font-family:'Jost' !important;font-weight:500 !important;letter-spacing:.04em;}
  body[data-tpl="portada"] #cart-fab #fab-cant{background:var(--marca) !important;color:#fff !important;}
  body[data-tpl="portada"] #cart h2{font-family:'Marcellus';}
  body[data-tpl="portada"] #cart .cart-row-sub{color:var(--marca) !important;font-family:'Marcellus';}
  body[data-tpl="portada"] #cart .cart-total strong{font-family:'Marcellus';}
  body[data-tpl="portada"] #cart .cart-row .st-add{background:var(--marca) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const roman = (n) => ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"][n] || (n + 1);
    const cats = (R.menu || []).map((c) => ({ categoria: c.categoria, items: [...(c.items || [])].sort((a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0)) }));
    const secsHtml = cats.map((cat) => {
      const cid = slug(cat.categoria);
      const rows = (cat.items || []).map((it) => {
        const th = it.foto ? `<img src="${it.foto}" alt="">` : `<span class="emo">${emo(it, cat.categoria)}</span>`;
        return `<div class="pt-row"><div class="pt-thumb">${th}</div><div class="pt-info"><div class="pt-pn">${it.nombre}</div>${it.desc ? `<div class="pt-pd">${it.desc}</div>` : ``}</div><div class="pt-right"><span class="pt-pp">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div></div>`;
      }).join("");
      return `<section class="pt-sec" id="cat-${cid}"><h2 class="pt-sectt">${cat.categoria}</h2>${rows}</section>`;
    }).join("");
    const tabs = cats.map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "activa" : ""}"><span class="rn">${roman(i)}</span>${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <header class="pt-hero">
        ${R.heroFoto ? `<img class="bg" src="${R.heroFoto}" alt="">` : ``}
        ${R.logo ? `<div class="pt-logo"><img src="${R.logo}" alt=""></div>` : ``}
        <h1 class="pt-name">${R.nombre}</h1>
        ${R.slogan ? `<p class="pt-slo">${R.slogan}</p>` : ``}
        <div class="pt-rule"></div>
        ${R.promo ? `<span class="pt-promo">${R.promo}</span>` : ``}
        <div class="pt-down">⌄</div>
      </header>
      <div class="pt-sheet">
        <div class="pt-handle"></div>
        <nav class="pt-tabs">${tabs}</nav>
        ${secsHtml}
        <div class="pt-end">✦ ${R.nombre} ✦</div>
      </div>`;
    const chips = [...root.querySelectorAll(".pt-tabs button")];
    const secs = [...root.querySelectorAll(".pt-sec")];
    if (window.IntersectionObserver && secs.length) {
      const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { const id = e.target.id.replace("cat-", ""); chips.forEach((c) => { const on = c.dataset.cat === id; c.classList.toggle("activa", on); if (on) c.scrollIntoView({ inline: "center", block: "nearest" }); }); } }), { rootMargin: "-54px 0px -75% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  },
};
