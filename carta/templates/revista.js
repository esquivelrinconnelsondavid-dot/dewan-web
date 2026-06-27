window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["revista"] = {
  label: "Revista",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Archivo:wght@500;700;800&display=swap');

  body[data-tpl="revista"]{margin:0;background:#FAF8F3;color:#1C1A16;font-family:'Archivo',system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding-bottom:122px;overflow-x:hidden;}
  body[data-tpl="revista"] *{box-sizing:border-box;}
  body[data-tpl="revista"] .rv-wrap{max-width:520px;margin:0 auto;padding:0 18px;}

  /* ---------- MASTHEAD ---------- */
  body[data-tpl="revista"] .rv-mast{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:26px 0 14px;border-bottom:2px solid #1C1A16;}
  body[data-tpl="revista"] .rv-mast .l{flex:1;min-width:0;}
  body[data-tpl="revista"] .rv-kick{font-family:'Archivo';font-weight:700;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--marca);margin-bottom:6px;}
  body[data-tpl="revista"] .rv-name{font-family:'Fraunces';font-weight:700;font-size:clamp(34px,11vw,52px);line-height:.92;letter-spacing:-.01em;margin:0;}
  body[data-tpl="revista"] .rv-slo{font-family:'Fraunces';font-style:italic;font-weight:500;font-size:15px;color:#6f6a60;margin:10px 0 0;}
  body[data-tpl="revista"] .rv-seal{flex:0 0 auto;width:54px;height:54px;border:1.5px solid #1C1A16;overflow:hidden;background:#fff;}
  body[data-tpl="revista"] .rv-seal img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="revista"] .rv-meta{display:flex;flex-wrap:wrap;gap:6px 14px;padding:10px 0 2px;border-bottom:1px solid #e4ded2;}
  body[data-tpl="revista"] .rv-meta span{font-family:'Archivo';font-weight:500;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#6f6a60;}

  /* ---------- SUMARIO (nav) ---------- */
  body[data-tpl="revista"] .rv-sum{position:sticky;top:0;z-index:25;display:flex;gap:16px;overflow-x:auto;padding:11px 0;margin:0 -18px;padding-left:18px;padding-right:18px;background:rgba(250,248,243,.94);backdrop-filter:blur(8px);border-bottom:1px solid #e4ded2;scrollbar-width:none;}
  body[data-tpl="revista"] .rv-sum::-webkit-scrollbar{display:none;}
  body[data-tpl="revista"] .rv-sum button{flex:0 0 auto;background:none;border:none;cursor:pointer;font-family:'Archivo';font-weight:700;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#9c9486;white-space:nowrap;padding:2px 0;position:relative;}
  body[data-tpl="revista"] .rv-sum button .n{color:var(--marca);margin-right:5px;}
  body[data-tpl="revista"] .rv-sum button.activa{color:#1C1A16;}
  body[data-tpl="revista"] .rv-sum button.activa::after{content:"";position:absolute;left:0;right:0;bottom:-11px;height:2px;background:var(--marca);}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="revista"] .rv-sec{padding-top:8px;scroll-margin-top:50px;}
  body[data-tpl="revista"] .rv-sechead{display:flex;align-items:baseline;gap:10px;margin:22px 0 8px;}
  body[data-tpl="revista"] .rv-secn{font-family:'Archivo';font-weight:800;font-size:13px;color:var(--marca);}
  body[data-tpl="revista"] .rv-sectt{font-family:'Fraunces';font-weight:700;font-size:23px;letter-spacing:-.01em;margin:0;}

  /* ---------- HEADLINER (1er ítem) ---------- */
  body[data-tpl="revista"] .rv-head{position:relative;border-top:1px solid #1C1A16;border-bottom:1px solid #e4ded2;padding:14px 0;margin-bottom:2px;}
  body[data-tpl="revista"] .rv-head.foto{min-height:170px;border-radius:4px;overflow:hidden;border:none;display:flex;flex-direction:column;justify-content:flex-end;padding:16px;color:#fff;}
  body[data-tpl="revista"] .rv-head.foto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;}
  body[data-tpl="revista"] .rv-head.foto::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.8));z-index:-1;}
  body[data-tpl="revista"] .rv-head .hn{font-family:'Fraunces';font-weight:700;font-size:25px;line-height:1.05;margin:0;}
  body[data-tpl="revista"] .rv-head .hd{font-family:'Fraunces';font-style:italic;font-weight:400;font-size:13.5px;opacity:.85;margin:5px 0 0;}
  body[data-tpl="revista"] .rv-head .hf{display:flex;align-items:center;justify-content:space-between;margin-top:10px;}
  body[data-tpl="revista"] .rv-head .hp{font-family:'Fraunces';font-weight:700;font-size:20px;font-variant-numeric:tabular-nums;}
  body[data-tpl="revista"] .rv-head.foto .hp{color:#fff;}

  /* ---------- FILAS numeradas ---------- */
  body[data-tpl="revista"] .rv-row{display:flex;gap:13px;padding:13px 0;border-bottom:1px solid #e4ded2;}
  body[data-tpl="revista"] .rv-num{flex:0 0 auto;font-family:'Archivo';font-weight:800;font-size:13px;color:#bcb3a2;width:26px;padding-top:3px;font-variant-numeric:tabular-nums;}
  body[data-tpl="revista"] .rv-rb{flex:1;min-width:0;}
  body[data-tpl="revista"] .rv-rn{font-family:'Fraunces';font-weight:600;font-size:16.5px;line-height:1.2;}
  body[data-tpl="revista"] .rv-rd{font-family:'Archivo';font-weight:400;font-size:12.5px;color:#7c7568;line-height:1.4;margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="revista"] .rv-rr{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:7px;}
  body[data-tpl="revista"] .rv-rp{font-family:'Fraunces';font-weight:700;font-size:16px;color:var(--marca);font-variant-numeric:tabular-nums;}

  /* ---------- stepper ---------- */
  body[data-tpl="revista"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="revista"] [data-add]{width:32px;height:32px;border-radius:50%;border:1.5px solid #1C1A16;background:#1C1A16;color:#fff;font-size:18px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;}
  body[data-tpl="revista"] .rv-head.foto [data-add]{border-color:#fff;background:#fff;color:#1C1A16;}
  body[data-tpl="revista"] [data-add]:active{transform:scale(.88);}
  body[data-tpl="revista"] [data-sub]{width:28px;height:28px;border-radius:50%;border:1.5px solid #cfc7b8;background:transparent;color:#1C1A16;font-size:16px;line-height:1;cursor:pointer;display:none;align-items:center;justify-content:center;}
  body[data-tpl="revista"] [data-cant]{display:none;min-width:18px;text-align:center;font-family:'Fraunces';font-weight:700;font-size:15px;padding:0 2px;}
  body[data-tpl="revista"] [data-qtywrap].has-qty{gap:5px;}
  body[data-tpl="revista"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="revista"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="revista"] .rv-end{text-align:center;padding:30px 0 8px;font-family:'Fraunces';font-style:italic;color:var(--marca);font-size:16px;}

  body[data-tpl="revista"] #cart-fab{background:#1C1A16 !important;color:#FAF8F3 !important;border-radius:4px !important;font-family:'Archivo' !important;font-weight:700 !important;letter-spacing:.04em;text-transform:uppercase;}
  body[data-tpl="revista"] #cart-fab #fab-cant{background:var(--marca) !important;color:#fff !important;border-radius:3px !important;}
  body[data-tpl="revista"] #cart h2{font-family:'Fraunces';}
  body[data-tpl="revista"] #cart .cart-row-sub{color:var(--marca) !important;font-family:'Fraunces';}
  body[data-tpl="revista"] #cart .cart-total strong{font-family:'Fraunces';}
  body[data-tpl="revista"] #cart .cart-row .st-add{background:#1C1A16 !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const cats = (R.menu || []).map((c) => ({ categoria: c.categoria, items: [...(c.items || [])].sort((a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0)) }));
    const secsHtml = cats.map((cat, ci) => {
      const cid = slug(cat.categoria);
      const items = cat.items || [];
      const head = items[0];
      const headFoto = head && head.foto;
      const headHtml = head ? `<div class="rv-head ${headFoto ? "foto" : ""}">${headFoto ? `<img src="${head.foto}" alt="">` : ``}<h3 class="hn">${head.nombre}</h3>${head.desc ? `<p class="hd">${head.desc}</p>` : ``}<div class="hf"><span class="hp">$${Number(head.precio).toFixed(2)}</span>${ctrl(head.id)}</div></div>` : "";
      const rows = items.slice(1).map((it, i) => `<div class="rv-row"><span class="rv-num">${String(i + 2).padStart(2, "0")}</span><div class="rv-rb"><div class="rv-rn">${it.nombre}</div>${it.desc ? `<div class="rv-rd">${it.desc}</div>` : ``}</div><div class="rv-rr"><span class="rv-rp">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div></div>`).join("");
      return `<section class="rv-sec" id="cat-${cid}"><div class="rv-sechead"><span class="rv-secn">${String(ci + 1).padStart(2, "0")}</span><h2 class="rv-sectt">${cat.categoria}</h2></div>${headHtml}${rows}</section>`;
    }).join("");
    const sum = cats.map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "activa" : ""}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${cat.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || "", R.direccion || ""]).filter(Boolean);
    root.innerHTML = `
      <div class="rv-wrap">
        <header class="rv-mast">
          <div class="l"><div class="rv-kick">La Carta</div><h1 class="rv-name">${R.nombre}</h1>${R.slogan ? `<p class="rv-slo">${R.slogan}</p>` : ``}</div>
          ${R.logo ? `<div class="rv-seal"><img src="${R.logo}" alt=""></div>` : ``}
        </header>
        ${meta.length ? `<div class="rv-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>` : ``}
        <nav class="rv-sum">${sum}</nav>
        ${secsHtml}
        <div class="rv-end">✦ ${R.nombre} ✦</div>
      </div>`;
    const chips = [...root.querySelectorAll(".rv-sum button")];
    const secs = [...root.querySelectorAll(".rv-sec")];
    if (window.IntersectionObserver && secs.length) {
      const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { const id = e.target.id.replace("cat-", ""); chips.forEach((c) => { const on = c.dataset.cat === id; c.classList.toggle("activa", on); if (on) c.scrollIntoView({ inline: "center", block: "nearest" }); }); } }), { rootMargin: "-50px 0px -75% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  },
};
