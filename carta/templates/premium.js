window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["premium"] = {
  label: "Premium",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Anton&family=Bebas+Neue&family=Baloo+2:wght@600;700;800&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Archivo+Black&family=Space+Grotesk:wght@600;700&family=Quicksand:wght@600;700&display=swap');

  body[data-tpl="premium"]{
    --pr-display:'Sora'; --pr-radio:18px; --pr-fab:11px; --pr-disp-ls:-0.02em; --pr-disp-up:none;
    --pr-ink:#16130F; --pr-price:#2B211B; --pr-muted:#6F6A66; --pr-surface:#fff; --pr-bg:#F6F6F4;
    --pr-line:#ECEAE6;
    margin:0;background:var(--pr-bg);color:var(--pr-ink);
    font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
    padding-bottom:124px;overflow-x:hidden;-webkit-tap-highlight-color:transparent;
  }
  body[data-tpl="premium"] *{box-sizing:border-box;}

  /* ===== PACKS DE COCINA (cambian fuente + forma + voz, no solo color) ===== */
  body[data-tpl="premium"][data-cocina="parrilla"]{--pr-display:'Anton';--pr-radio:11px;--pr-fab:9px;--pr-disp-ls:.01em;--pr-disp-up:uppercase;}
  body[data-tpl="premium"][data-cocina="burger"]{--pr-display:'Archivo Black';--pr-radio:12px;--pr-fab:10px;--pr-disp-ls:-.01em;}
  body[data-tpl="premium"][data-cocina="helados"]{--pr-display:'Baloo 2';--pr-radio:24px;--pr-fab:50%;--pr-disp-ls:0;}
  body[data-tpl="premium"][data-cocina="postres"]{--pr-display:'Quicksand';--pr-radio:22px;--pr-fab:50%;--pr-disp-ls:0;}
  body[data-tpl="premium"][data-cocina="ceviche"]{--pr-display:'Space Grotesk';--pr-radio:18px;--pr-fab:14px;--pr-disp-ls:-.01em;}
  body[data-tpl="premium"][data-cocina="pizza"]{--pr-display:'Fraunces';--pr-radio:14px;--pr-fab:13px;--pr-disp-ls:0;}
  body[data-tpl="premium"][data-cocina="cafe"]{--pr-display:'Fraunces';--pr-radio:16px;--pr-fab:13px;--pr-disp-ls:0;}

  body[data-tpl="premium"] .pr-wrap{max-width:520px;margin:0 auto;}

  /* ---------- HERO ---------- */
  body[data-tpl="premium"] .pr-hero{position:relative;height:232px;overflow:hidden;background:var(--marca);}
  body[data-tpl="premium"] .pr-hero .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 42%;filter:saturate(1.08) contrast(1.03) brightness(1.02);}
  body[data-tpl="premium"] .pr-hero.color{background:linear-gradient(150deg, var(--marca), color-mix(in srgb,var(--marca) 55%,#000));}
  body[data-tpl="premium"] .pr-hero.color::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.10) 1.4px, transparent 1.5px);background-size:16px 16px;}
  body[data-tpl="premium"] .pr-hero.color .biglogo{position:absolute;top:50%;left:50%;transform:translate(-50%,-58%);width:96px;height:96px;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 14px 40px rgba(0,0,0,.35);}
  body[data-tpl="premium"] .pr-hero.color .biglogo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="premium"] .pr-hero .scrim{position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,.80) 0%, rgba(0,0,0,.34) 40%, transparent 64%);}
  body[data-tpl="premium"] .pr-htop{position:relative;display:flex;align-items:center;gap:11px;padding:calc(14px + env(safe-area-inset-top)) 16px 0;}
  body[data-tpl="premium"] .pr-hlogo{width:46px;height:46px;border-radius:13px;overflow:hidden;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.3);flex:0 0 auto;}
  body[data-tpl="premium"] .pr-hlogo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="premium"] .pr-hpromo{margin-left:auto;font-weight:600;font-size:11.5px;color:#fff;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:7px 12px;}
  body[data-tpl="premium"] .pr-hbody{position:absolute;left:0;right:0;bottom:0;padding:16px;}
  body[data-tpl="premium"] .pr-hname{font-family:var(--pr-display),'Sora',sans-serif;font-weight:800;font-size:31px;line-height:1.02;color:#fff;margin:0;letter-spacing:var(--pr-disp-ls);text-transform:var(--pr-disp-up);text-shadow:0 2px 18px rgba(0,0,0,.45);}
  body[data-tpl="premium"] .pr-hslo{font-size:13.5px;color:rgba(255,255,255,.92);margin:7px 0 0;font-weight:500;}
  body[data-tpl="premium"] .pr-meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:11px;}
  body[data-tpl="premium"] .pr-meta span{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:#fff;background:rgba(255,255,255,.16);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:5px 11px;}

  /* ---------- BUSCADOR ---------- */
  body[data-tpl="premium"] .pr-search{position:sticky;top:0;z-index:30;background:var(--pr-bg);padding:12px 16px 8px;}
  body[data-tpl="premium"] .pr-search .box{display:flex;align-items:center;gap:9px;background:#fff;border:1px solid var(--pr-line);border-radius:14px;padding:12px 14px;box-shadow:0 1px 2px rgba(30,25,20,.04);}
  body[data-tpl="premium"] .pr-search input{border:none;outline:none;width:100%;font-family:'Inter';font-size:16px;color:var(--pr-ink);background:none;}

  /* ---------- CHIPS ---------- */
  body[data-tpl="premium"] .pr-chips{position:sticky;top:62px;z-index:28;display:flex;gap:8px;overflow-x:auto;padding:6px 16px 10px;background:var(--pr-bg);scrollbar-width:none;}
  body[data-tpl="premium"] .pr-chips::-webkit-scrollbar{display:none;}
  body[data-tpl="premium"] .pr-chips button{flex:0 0 auto;font-weight:600;font-size:13px;letter-spacing:.01em;color:#5a5e66;background:#fff;border:1px solid var(--pr-line);padding:9px 15px;border-radius:999px;cursor:pointer;white-space:nowrap;transition:all .15s;}
  body[data-tpl="premium"] .pr-chips button.activa{background:var(--pr-ink);color:#fff;border-color:var(--pr-ink);}

  /* ---------- DESTACADOS ---------- */
  body[data-tpl="premium"] .pr-feat-tt{font-family:var(--pr-display),'Sora';font-weight:700;font-size:20px;letter-spacing:var(--pr-disp-ls);text-transform:var(--pr-disp-up);margin:10px 16px 12px;}
  body[data-tpl="premium"] .pr-rail{display:flex;gap:13px;overflow-x:auto;padding:0 16px 6px;scroll-snap-type:x mandatory;scrollbar-width:none;}
  body[data-tpl="premium"] .pr-rail::-webkit-scrollbar{display:none;}
  body[data-tpl="premium"] .pr-feat{flex:0 0 auto;width:190px;scroll-snap-align:start;background:#fff;border-radius:var(--pr-radio);overflow:hidden;box-shadow:0 1px 2px rgba(30,25,20,.05), 0 8px 20px -8px rgba(30,25,20,.14);}
  body[data-tpl="premium"] .pr-feat .ph{position:relative;height:132px;overflow:hidden;}
  body[data-tpl="premium"] .pr-feat .ph img{width:100%;height:100%;object-fit:cover;object-position:50% 42%;filter:saturate(1.08) contrast(1.03);}
  body[data-tpl="premium"] .pr-feat .tag{position:absolute;top:9px;left:9px;background:rgba(0,0,0,.6);color:#fff;font-size:10.5px;font-weight:700;border-radius:999px;padding:4px 9px;backdrop-filter:blur(4px);}
  body[data-tpl="premium"] .pr-feat .fb{padding:11px 12px 12px;}
  body[data-tpl="premium"] .pr-feat .fn{font-weight:700;font-size:13.5px;line-height:1.25;text-wrap:balance;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:34px;}
  body[data-tpl="premium"] .pr-feat .ff{display:flex;align-items:center;justify-content:space-between;margin-top:8px;}
  body[data-tpl="premium"] .pr-feat .fp{font-family:var(--pr-display),'Sora';font-weight:700;font-size:16px;color:var(--pr-price);font-variant-numeric:tabular-nums;}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="premium"] .pr-sec{padding-top:8px;scroll-margin-top:118px;}
  body[data-tpl="premium"] .pr-sec-tt{font-family:var(--pr-display),'Sora';font-weight:700;font-size:20px;letter-spacing:var(--pr-disp-ls);text-transform:var(--pr-disp-up);margin:20px 16px 12px;}
  body[data-tpl="premium"] .pr-list{display:flex;flex-direction:column;gap:11px;padding:0 16px;}

  /* ---------- TARJETA con foto ---------- */
  body[data-tpl="premium"] .pr-card{display:flex;gap:13px;background:var(--pr-surface);border-radius:var(--pr-radio);padding:11px;box-shadow:0 1px 2px rgba(30,25,20,.05), 0 8px 20px -10px rgba(30,25,20,.12);}
  body[data-tpl="premium"] .pr-photo{position:relative;flex:0 0 auto;width:98px;height:98px;border-radius:calc(var(--pr-radio) - 5px);overflow:hidden;background:color-mix(in srgb,var(--marca) 10%,#fff);}
  body[data-tpl="premium"] .pr-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 42%;filter:saturate(1.08) contrast(1.03) brightness(1.02);}
  body[data-tpl="premium"] .pr-body{flex:1;min-width:0;display:flex;flex-direction:column;}
  body[data-tpl="premium"] .pr-name{font-weight:600;font-size:16px;line-height:1.2;letter-spacing:-.006em;color:var(--pr-ink);margin-bottom:4px;text-wrap:balance;}
  body[data-tpl="premium"] .pr-desc{font-size:13px;color:var(--pr-muted);line-height:1.4;margin-bottom:auto;text-wrap:pretty;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="premium"] .pr-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;}
  body[data-tpl="premium"] .pr-price{font-family:var(--pr-display),'Sora';font-weight:700;font-size:16px;color:var(--pr-price);font-variant-numeric:tabular-nums;}
  body[data-tpl="premium"] .pr-price small{font-size:.74em;color:var(--pr-muted);font-weight:600;margin-right:1px;}

  /* ---------- TARJETA SIN foto (text-forward, no emoji gigante) ---------- */
  body[data-tpl="premium"] .pr-card.nofoto{position:relative;overflow:hidden;border-left:3px solid var(--marca);padding-left:14px;}
  body[data-tpl="premium"] .pr-card.nofoto .pr-wm{position:absolute;right:-8px;bottom:-14px;font-size:74px;line-height:1;opacity:.07;pointer-events:none;filter:grayscale(.2);}
  body[data-tpl="premium"] .pr-card.nofoto .pr-name{font-size:16px;}

  /* ---------- STEPPER (muta en sitio: arregla doble-tap) ---------- */
  body[data-tpl="premium"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="premium"] [data-add]{position:relative;width:36px;height:36px;border-radius:var(--pr-fab);border:none;cursor:pointer;background:var(--marca);color:#fff;font-size:21px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 12px color-mix(in srgb,var(--marca) 38%,transparent);touch-action:manipulation;transition:transform .14s;}
  body[data-tpl="premium"] [data-add]::after{content:"";position:absolute;inset:-6px;}
  body[data-tpl="premium"] [data-add]:active{transform:scale(.9);}
  body[data-tpl="premium"] [data-sub]{width:32px;height:32px;border-radius:calc(var(--pr-fab) - 2px);border:1px solid var(--pr-line);background:#fff;color:var(--marca);font-size:19px;font-weight:700;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;}
  body[data-tpl="premium"] [data-cant]{display:none;min-width:20px;text-align:center;font-family:var(--pr-display),'Sora';font-size:15px;font-weight:800;color:var(--pr-ink);padding:0 3px;font-variant-numeric:tabular-nums;}
  body[data-tpl="premium"] [data-qtywrap].has-qty{gap:4px;background:#f3f3ef;border-radius:999px;padding:3px;}
  body[data-tpl="premium"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="premium"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="premium"] .pr-feat [data-add]{width:32px;height:32px;font-size:19px;}

  body[data-tpl="premium"] .pr-none{display:none;text-align:center;color:#9aa0a8;font-weight:600;padding:30px 16px;}
  body[data-tpl="premium"] .pr-hide{display:none !important;}
  body[data-tpl="premium"] .pr-end{text-align:center;padding:26px 0 8px;color:#aab0b8;font-size:12px;}

  /* ---------- BARRA DE PEDIDO ---------- */
  body[data-tpl="premium"] #cart-fab{background:var(--marca) !important;color:#fff !important;border-radius:16px !important;font-family:var(--pr-display),'Sora' !important;font-weight:700 !important;box-shadow:0 -2px 8px rgba(0,0,0,.04), 0 10px 30px color-mix(in srgb,var(--marca) 38%,transparent) !important;padding-bottom:calc(15px + env(safe-area-inset-bottom)) !important;}
  body[data-tpl="premium"] #cart-fab #fab-cant{background:#fff !important;color:var(--marca) !important;font-weight:800 !important;}
  body[data-tpl="premium"] #cart{border-radius:20px 20px 0 0 !important;}
  body[data-tpl="premium"] #cart h2{font-family:var(--pr-display),'Sora';}
  body[data-tpl="premium"] #cart .cart-row-sub{color:var(--pr-price) !important;font-family:var(--pr-display),'Sora';font-weight:700;font-variant-numeric:tabular-nums;}
  body[data-tpl="premium"] #cart .cart-total strong{color:var(--pr-ink) !important;font-family:var(--pr-display),'Sora';font-variant-numeric:tabular-nums;}
  body[data-tpl="premium"] #cart .cart-row .st-add{background:var(--marca) !important;color:#fff !important;}
  body[data-tpl="premium"] #enviar{font-size:16px;}
  `,
  render(R, root, ctrl, slug) {
    document.body.dataset.cocina = R.cocina || "";
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = (R.menu || []).map((c) => ({
      categoria: c.categoria,
      items: [...(c.items || [])].sort((a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0)), // con foto primero
    }));
    const conFoto = [];
    cats.forEach((c) => (c.items || []).forEach((it) => { if (it.foto) conFoto.push({ it, cat: c.categoria }); }));
    const destacados = conFoto.slice(0, 6);

    const featHtml = destacados.map(({ it }) => `
      <div class="pr-feat">
        <div class="ph"><img src="${it.foto}" alt="">${"<span class=\"tag\">⭐ Popular</span>"}</div>
        <div class="fb"><div class="fn">${it.nombre}</div>
          <div class="ff"><span class="fp">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div></div>
      </div>`).join("");

    const card = (it, cat) => {
      if (it.foto) {
        return `<article class="pr-card" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
          <div class="pr-photo" data-media><img src="${it.foto}" alt="${it.nombre}"></div>
          <div class="pr-body"><div class="pr-name">${it.nombre}</div><div class="pr-desc">${it.desc || ""}</div>
            <div class="pr-foot"><span class="pr-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div></div>
        </article>`;
      }
      return `<article class="pr-card nofoto" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <span class="pr-wm">${emo(it, cat)}</span>
        <div class="pr-body"><div class="pr-name">${it.nombre}</div><div class="pr-desc">${it.desc || ""}</div>
          <div class="pr-foot"><span class="pr-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div></div>
      </article>`;
    };

    const menuHtml = cats.map((cat) => {
      const cid = slug(cat.categoria);
      const cards = (cat.items || []).map((it) => card(it, cat.categoria)).join("");
      return `<section class="pr-sec" id="cat-${cid}"><h2 class="pr-sec-tt">${cat.categoria}</h2><div class="pr-list">${cards}</div></section>`;
    }).join("");

    const navHtml = cats.map((cat, i) => `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "activa" : ""}">${cat.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || "🛵 25–35 min", R.direccion ? "📍 " + R.direccion.split("·")[0].trim() : ""]).filter(Boolean);
    const metaHtml = meta.map((m) => `<span>${m}</span>`).join("");
    const hasHero = !!R.heroFoto;

    root.innerHTML = `
      <div class="pr-wrap">
      <header class="pr-hero ${hasHero ? "" : "color"}">
        ${hasHero ? `<img class="bg" src="${R.heroFoto}" alt="">` : (R.logo ? `<div class="biglogo"><img src="${R.logo}" alt=""></div>` : ``)}
        <div class="scrim"></div>
        <div class="pr-htop">
          <div class="pr-hlogo">${R.logo ? `<img src="${R.logo}" alt="">` : ``}</div>
          ${R.promo ? `<span class="pr-hpromo">${R.promo}</span>` : ``}
        </div>
        <div class="pr-hbody">
          <h1 class="pr-hname">${R.nombre}</h1>
          ${R.slogan ? `<p class="pr-hslo">${R.slogan}</p>` : ``}
          <div class="pr-meta">${metaHtml}</div>
        </div>
      </header>
      <div class="pr-search"><div class="box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a8" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
        <input id="pr-q" type="text" placeholder="Buscar en ${R.nombre}…">
      </div></div>
      <nav class="pr-chips">${navHtml}</nav>
      ${destacados.length >= 3 ? `<div class="pr-feat-tt">${R.vozDestacado || "🔥 Lo más pedido"}</div><div class="pr-rail">${featHtml}</div>` : ``}
      ${menuHtml}
      <p class="pr-none" id="pr-none">Sin resultados 🔍</p>
      <div class="pr-end">— ${R.nombre} —</div>
      </div>`;

    const q = root.querySelector("#pr-q"), none = root.querySelector("#pr-none");
    const feat = root.querySelector(".pr-feat-tt"), rail = root.querySelector(".pr-rail");
    if (q) q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      const cards = [...root.querySelectorAll(".pr-card")];
      const secsAll = [...root.querySelectorAll(".pr-sec")];
      if (!v) { cards.forEach((c) => c.classList.remove("pr-hide")); secsAll.forEach((s) => s.classList.remove("pr-hide")); if (feat) feat.style.display = ""; if (rail) rail.style.display = ""; none.style.display = "none"; return; }
      if (feat) feat.style.display = "none"; if (rail) rail.style.display = "none";
      let total = 0;
      secsAll.forEach((sec) => { let any = false; sec.querySelectorAll(".pr-card").forEach((c) => { const m = c.dataset.n.includes(v); c.classList.toggle("pr-hide", !m); if (m) { any = true; total++; } }); sec.classList.toggle("pr-hide", !any); });
      none.style.display = total ? "none" : "block";
    });

    const chips = [...root.querySelectorAll(".pr-chips button")];
    const secs = [...root.querySelectorAll(".pr-sec")];
    if (window.IntersectionObserver && secs.length) {
      const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { const id = e.target.id.replace("cat-", ""); chips.forEach((c) => { const on = c.dataset.cat === id; c.classList.toggle("activa", on); if (on) c.scrollIntoView({ inline: "center", block: "nearest" }); }); } }), { rootMargin: "-120px 0px -70% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  },
};
