window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["estantes"] = {
  label: "Estantes",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,600;9..40,700;9..40,800&display=swap');

  body[data-tpl="estantes"]{margin:0;background:#F4F5F7;color:#191B22;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding-bottom:122px;overflow-x:hidden;}
  body[data-tpl="estantes"] *{box-sizing:border-box;}

  /* ---------- COVER banner (NO logo-cuadrado-izq) ---------- */
  body[data-tpl="estantes"] .es-cover{position:relative;height:172px;overflow:hidden;background:linear-gradient(135deg,var(--marca),color-mix(in srgb,var(--marca) 60%,#000));}
  body[data-tpl="estantes"] .es-cover .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9;}
  body[data-tpl="estantes"] .es-cover::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.55));}
  body[data-tpl="estantes"] .es-cv{position:absolute;left:0;right:0;bottom:0;padding:16px;z-index:1;}
  body[data-tpl="estantes"] .es-mono{width:38px;height:38px;border-radius:10px;overflow:hidden;background:#fff;margin-bottom:9px;box-shadow:0 4px 12px rgba(0,0,0,.25);}
  body[data-tpl="estantes"] .es-mono img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="estantes"] .es-name{font-family:'DM Sans';font-weight:800;font-size:27px;line-height:1;letter-spacing:-.02em;color:#fff;margin:0;}
  body[data-tpl="estantes"] .es-slo{font-size:12.5px;color:rgba(255,255,255,.9);margin:5px 0 0;font-weight:500;}
  body[data-tpl="estantes"] .es-promo{position:absolute;top:14px;right:14px;z-index:1;font-size:11.5px;font-weight:700;color:#fff;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:6px 11px;}

  /* ---------- buscador en barra ---------- */
  body[data-tpl="estantes"] .es-search{position:sticky;top:0;z-index:30;background:#F4F5F7;padding:11px 16px 7px;}
  body[data-tpl="estantes"] .es-search .box{display:flex;align-items:center;gap:9px;background:#fff;border-radius:13px;padding:12px 14px;box-shadow:0 2px 10px rgba(0,0,0,.05);}
  body[data-tpl="estantes"] .es-search input{border:none;outline:none;width:100%;font-family:'DM Sans';font-size:16px;color:#191B22;background:none;}

  /* ---------- chips ---------- */
  body[data-tpl="estantes"] .es-chips{position:sticky;top:60px;z-index:28;display:flex;gap:8px;overflow-x:auto;padding:5px 16px 9px;background:#F4F5F7;scrollbar-width:none;}
  body[data-tpl="estantes"] .es-chips::-webkit-scrollbar{display:none;}
  body[data-tpl="estantes"] .es-chips button{flex:0 0 auto;font-weight:600;font-size:13px;color:#5b606b;background:#fff;border:1px solid #e6e7eb;padding:8px 14px;border-radius:10px;cursor:pointer;white-space:nowrap;transition:all .15s;}
  body[data-tpl="estantes"] .es-chips button.activa{background:var(--marca);color:#fff;border-color:var(--marca);}

  /* ---------- ESTANTE (carril horizontal) ---------- */
  body[data-tpl="estantes"] .es-shelf{padding-top:14px;scroll-margin-top:110px;}
  body[data-tpl="estantes"] .es-shelf-tt{display:flex;align-items:baseline;justify-content:space-between;padding:0 16px;margin-bottom:11px;}
  body[data-tpl="estantes"] .es-shelf-tt h2{font-family:'DM Sans';font-weight:700;font-size:18px;letter-spacing:-.01em;margin:0;}
  body[data-tpl="estantes"] .es-shelf-tt .c{font-size:12px;color:#9aa0a8;font-weight:600;}
  body[data-tpl="estantes"] .es-rail{display:flex;gap:12px;overflow-x:auto;padding:0 16px 8px;scroll-snap-type:x;scrollbar-width:none;}
  body[data-tpl="estantes"] .es-rail::-webkit-scrollbar{display:none;}
  body[data-tpl="estantes"] .es-card{flex:0 0 auto;width:158px;scroll-snap-align:start;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);display:flex;flex-direction:column;}
  body[data-tpl="estantes"] .es-ph{position:relative;height:118px;background:color-mix(in srgb,var(--marca) 12%,#fff);display:flex;align-items:center;justify-content:center;}
  body[data-tpl="estantes"] .es-ph img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="estantes"] .es-ph .emo{font-size:46px;}
  body[data-tpl="estantes"] .es-cb{padding:10px 11px 11px;display:flex;flex-direction:column;flex:1;}
  body[data-tpl="estantes"] .es-cn{font-weight:600;font-size:13.5px;line-height:1.22;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:33px;margin-bottom:auto;}
  body[data-tpl="estantes"] .es-cf{display:flex;align-items:center;justify-content:space-between;margin-top:9px;}
  body[data-tpl="estantes"] .es-cp{font-weight:800;font-size:15px;font-variant-numeric:tabular-nums;}

  /* ---------- stepper ---------- */
  body[data-tpl="estantes"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="estantes"] [data-add]{width:32px;height:32px;border-radius:10px;border:none;cursor:pointer;background:var(--marca);color:#fff;font-size:19px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 3px 9px color-mix(in srgb,var(--marca) 40%,transparent);}
  body[data-tpl="estantes"] [data-add]:active{transform:scale(.88);}
  body[data-tpl="estantes"] [data-sub]{width:28px;height:28px;border-radius:8px;border:1px solid #e6e7eb;background:#fff;color:var(--marca);font-size:17px;font-weight:700;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;}
  body[data-tpl="estantes"] [data-cant]{display:none;min-width:18px;text-align:center;font-size:14px;font-weight:800;padding:0 2px;font-variant-numeric:tabular-nums;}
  body[data-tpl="estantes"] [data-qtywrap].has-qty{gap:3px;background:#f1f2f5;border-radius:999px;padding:3px;}
  body[data-tpl="estantes"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="estantes"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="estantes"] .es-end{text-align:center;padding:24px 0 8px;color:#9aa0a8;font-size:12px;}

  body[data-tpl="estantes"] #cart-fab{background:var(--marca) !important;color:#fff !important;border-radius:14px !important;font-family:'DM Sans' !important;font-weight:700 !important;}
  body[data-tpl="estantes"] #cart-fab #fab-cant{background:rgba(255,255,255,.25) !important;color:#fff !important;}
  body[data-tpl="estantes"] #cart{border-radius:20px 20px 0 0 !important;}
  body[data-tpl="estantes"] #cart h2{font-family:'DM Sans';}
  body[data-tpl="estantes"] #cart .cart-row-sub{color:var(--marca) !important;font-weight:800;}
  body[data-tpl="estantes"] #cart .cart-row .st-add{background:var(--marca) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const shelves = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = [...(cat.items || [])].sort((a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0));
      const cards = items.map((it) => {
        const ph = it.foto ? `<img src="${it.foto}" alt="">` : `<span class="emo">${emo(it, cat.categoria)}</span>`;
        return `<article class="es-card" data-n="${norm(it.nombre)}"><div class="es-ph">${ph}</div><div class="es-cb"><div class="es-cn">${it.nombre}</div><div class="es-cf"><span class="es-cp">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div></div></article>`;
      }).join("");
      return `<section class="es-shelf" id="cat-${cid}"><div class="es-shelf-tt"><h2>${cat.categoria}</h2><span class="c">${items.length}</span></div><div class="es-rail">${cards}</div></section>`;
    }).join("");
    const navHtml = (R.menu || []).map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "activa" : ""}">${cat.categoria}</button>`).join("");
    root.innerHTML = `
      <header class="es-cover">
        ${R.heroFoto ? `<img class="bg" src="${R.heroFoto}" alt="">` : ``}
        ${R.promo ? `<span class="es-promo">${R.promo}</span>` : ``}
        <div class="es-cv">${R.logo ? `<div class="es-mono"><img src="${R.logo}" alt=""></div>` : ``}<h1 class="es-name">${R.nombre}</h1>${R.slogan ? `<p class="es-slo">${R.slogan}</p>` : ``}</div>
      </header>
      <div class="es-search"><div class="box"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a8" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg><input id="es-q" type="text" placeholder="Buscar…"></div></div>
      <nav class="es-chips">${navHtml}</nav>
      ${shelves}
      <div class="es-end">— ${R.nombre} —</div>`;
    const q = root.querySelector("#es-q");
    if (q) q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      root.querySelectorAll(".es-shelf").forEach((sh) => { let any = false; sh.querySelectorAll(".es-card").forEach((c) => { const m = !v || c.dataset.n.includes(v); c.style.display = m ? "" : "none"; if (m) any = true; }); sh.style.display = any ? "" : "none"; });
    });
    const chips = [...root.querySelectorAll(".es-chips button")];
    const secs = [...root.querySelectorAll(".es-shelf")];
    if (window.IntersectionObserver && secs.length) {
      const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { const id = e.target.id.replace("cat-", ""); chips.forEach((c) => { const on = c.dataset.cat === id; c.classList.toggle("activa", on); if (on) c.scrollIntoView({ inline: "center", block: "nearest" }); }); } }), { rootMargin: "-110px 0px -70% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  },
};
