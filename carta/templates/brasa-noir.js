window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["brasa-noir"] = {
  label: "Brasa de Noche",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

  body[data-tpl="brasa-noir"]{
    margin:0;
    background:
      radial-gradient(60% 40% at 50% -5%, rgba(224,91,25,.18), transparent 60%),
      radial-gradient(40% 30% at 100% 30%, rgba(255,122,26,.08), transparent 55%),
      #120F0D;
    color:#F4ECE4;
    font-family:'Inter',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;
    padding-bottom:120px;
    overflow-x:hidden;
  }
  body[data-tpl="brasa-noir"] *{box-sizing:border-box;}
  body[data-tpl="brasa-noir"] .bn-wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---------- HERO ---------- */
  body[data-tpl="brasa-noir"] .bn-hero{
    position:relative;text-align:center;
    padding:34px 0 18px;
  }
  body[data-tpl="brasa-noir"] .bn-logo{
    width:128px;height:128px;margin:0 auto 16px;
    border-radius:50%;overflow:hidden;
    border:2px solid rgba(255,122,26,.55);
    box-shadow:0 0 0 8px rgba(224,91,25,.08), 0 18px 42px rgba(0,0,0,.6);
    background:#0B0908;
  }
  body[data-tpl="brasa-noir"] .bn-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="brasa-noir"] .bn-name{
    font-family:'Anton',sans-serif;
    font-size:clamp(2.4rem,11vw,3.4rem);
    line-height:.92;letter-spacing:.5px;text-transform:uppercase;
    margin:0;color:#FBF4ED;
  }
  body[data-tpl="brasa-noir"] .bn-name b{color:var(--marca);}
  body[data-tpl="brasa-noir"] .bn-slogan{
    margin:10px 0 0;font-size:15px;font-weight:600;letter-spacing:.5px;
    color:var(--acento);
  }
  body[data-tpl="brasa-noir"] .bn-rule{
    width:54px;height:3px;margin:14px auto 0;border-radius:3px;
    background:linear-gradient(90deg,transparent,var(--acento),transparent);
    box-shadow:0 0 14px 1px rgba(255,122,26,.6);
  }
  body[data-tpl="brasa-noir"] .bn-addr{
    margin:13px auto 0;max-width:330px;
    font-size:11.5px;line-height:1.4;color:rgba(244,236,228,.55);
    display:flex;align-items:center;justify-content:center;gap:6px;
  }
  body[data-tpl="brasa-noir"] .bn-pill{
    display:inline-flex;align-items:center;gap:7px;margin-top:14px;
    font-size:11px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;
    color:#120F0D;background:var(--acento);
    padding:6px 15px;border-radius:999px;
    box-shadow:0 6px 18px rgba(224,91,25,.4);
  }

  /* ---------- NAV (categorías) ---------- */
  body[data-tpl="brasa-noir"] .bn-nav{
    position:sticky;top:0;z-index:20;
    display:flex;gap:9px;overflow-x:auto;
    padding:13px 16px;margin:14px -16px 4px;
    background:rgba(18,15,13,.86);backdrop-filter:blur(10px);
    border-top:1px solid rgba(255,122,26,.12);
    border-bottom:1px solid rgba(255,122,26,.12);
    scrollbar-width:none;
  }
  body[data-tpl="brasa-noir"] .bn-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="brasa-noir"] .bn-nav button{
    flex:0 0 auto;font-family:'Inter',sans-serif;
    font-size:13px;font-weight:700;letter-spacing:.2px;
    color:rgba(244,236,228,.78);
    background:rgba(255,255,255,.05);
    border:1.5px solid rgba(255,255,255,.10);
    padding:9px 16px;border-radius:999px;cursor:pointer;white-space:nowrap;
    transition:transform .14s, background .14s, color .14s, border-color .14s;
  }
  body[data-tpl="brasa-noir"] .bn-nav button:active{transform:scale(.95);}
  body[data-tpl="brasa-noir"] .bn-nav button.active{
    background:var(--marca);color:#120F0D;border-color:var(--marca);
    box-shadow:0 6px 18px rgba(224,91,25,.45);
  }

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="brasa-noir"] .bn-sec{padding-top:16px;scroll-margin-top:62px;}
  body[data-tpl="brasa-noir"] .bn-sec-head{
    display:flex;align-items:center;gap:12px;margin:8px 2px 16px;
  }
  body[data-tpl="brasa-noir"] .bn-sec-tt{
    font-family:'Anton',sans-serif;font-size:21px;letter-spacing:.6px;
    text-transform:uppercase;color:#FBF4ED;margin:0;line-height:1;
  }
  body[data-tpl="brasa-noir"] .bn-ember{
    flex:1;height:2px;border-radius:2px;
    background:linear-gradient(90deg,var(--marca),transparent);
    box-shadow:0 0 10px rgba(224,91,25,.5);
  }

  /* ---------- TARJETAS ---------- */
  body[data-tpl="brasa-noir"] .bn-grid{display:flex;flex-direction:column;gap:13px;}
  body[data-tpl="brasa-noir"] .bn-card{
    position:relative;display:flex;align-items:center;gap:14px;
    background:linear-gradient(180deg,#1E1A17,#191512);
    border:1px solid rgba(255,122,26,.14);
    border-radius:16px;padding:13px 14px;
    box-shadow:0 12px 26px rgba(0,0,0,.4);
    transition:border-color .18s, transform .18s;
  }
  body[data-tpl="brasa-noir"] .bn-card:active{transform:scale(.992);}
  body[data-tpl="brasa-noir"] .bn-media{
    position:relative;flex:0 0 auto;width:76px;height:76px;border-radius:13px;
    overflow:hidden;display:flex;align-items:center;justify-content:center;
    background:radial-gradient(circle at 35% 30%, rgba(255,122,26,.22), rgba(0,0,0,.25));
    border:1px solid rgba(255,122,26,.22);
  }
  body[data-tpl="brasa-noir"] .bn-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="brasa-noir"] .bn-emoji{font-size:38px;line-height:1;filter:drop-shadow(0 3px 5px rgba(0,0,0,.5));}
  body[data-tpl="brasa-noir"] .bn-body{flex:1;min-width:0;}
  body[data-tpl="brasa-noir"] .bn-pname{
    font-size:15.5px;font-weight:700;letter-spacing:.2px;
    color:#FBF4ED;margin:0 0 3px;line-height:1.2;
  }
  body[data-tpl="brasa-noir"] .bn-pdesc{
    font-size:12px;line-height:1.35;color:rgba(244,236,228,.55);margin:0 0 9px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="brasa-noir"] .bn-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;}
  body[data-tpl="brasa-noir"] .bn-price{
    font-family:'Anton',sans-serif;font-size:20px;letter-spacing:.5px;
    color:var(--acento);text-shadow:0 0 16px rgba(255,122,26,.35);
  }
  body[data-tpl="brasa-noir"] .bn-price small{font-size:12px;opacity:.8;margin-right:1px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="brasa-noir"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="brasa-noir"] [data-add]{
    width:38px;height:38px;border-radius:11px;border:none;cursor:pointer;
    background:var(--marca);color:#120F0D;font-size:22px;font-weight:800;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 16px rgba(224,91,25,.45);transition:transform .12s;
  }
  body[data-tpl="brasa-noir"] [data-add]:active{transform:scale(.9);}
  body[data-tpl="brasa-noir"] [data-sub]{
    width:32px;height:32px;border-radius:9px;border:1.5px solid var(--marca);
    background:transparent;color:var(--marca);font-size:20px;font-weight:800;line-height:1;
    display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="brasa-noir"] [data-cant]{
    display:none;min-width:22px;text-align:center;font-size:16px;font-weight:800;color:#FBF4ED;padding:0 4px;
  }
  body[data-tpl="brasa-noir"] [data-qtywrap].has-qty{
    gap:5px;background:rgba(0,0,0,.3);border:1.5px solid rgba(255,122,26,.4);
    border-radius:999px;padding:3px;
  }
  body[data-tpl="brasa-noir"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="brasa-noir"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="brasa-noir"] [data-qtywrap].has-qty [data-add]{width:32px;height:32px;font-size:20px;border-radius:9px;}

  body[data-tpl="brasa-noir"] .bn-end{
    text-align:center;padding:34px 0 8px;color:rgba(244,236,228,.4);font-size:12px;letter-spacing:.5px;
  }
  body[data-tpl="brasa-noir"] .bn-end b{color:var(--marca);}

  /* ---------- CARRITO (re-skin) ---------- */
  body[data-tpl="brasa-noir"] #cart-fab{
    background:var(--marca) !important;color:#120F0D !important;
    box-shadow:0 12px 30px rgba(224,91,25,.5) !important;font-weight:800 !important;
  }
  body[data-tpl="brasa-noir"] #cart-fab *{color:#120F0D !important;}
  body[data-tpl="brasa-noir"] #cart-fab #fab-cant{background:#120F0D !important;color:var(--acento) !important;}
  body[data-tpl="brasa-noir"] #cart{background:#1A1613 !important;color:#F4ECE4 !important;border-top:3px solid var(--marca) !important;}
  body[data-tpl="brasa-noir"] #cart .cart-head{background:#1A1613 !important;}
  body[data-tpl="brasa-noir"] #cart h2{color:#FBF4ED !important;}
  body[data-tpl="brasa-noir"] #cart .cart-row{background:#221D19 !important;border-color:rgba(255,122,26,.16) !important;}
  body[data-tpl="brasa-noir"] #cart .cart-row-nom{color:#F4ECE4 !important;}
  body[data-tpl="brasa-noir"] #cart .cart-row-pre{color:rgba(244,236,228,.5) !important;}
  body[data-tpl="brasa-noir"] #cart .cart-row-sub{color:var(--acento) !important;}
  body[data-tpl="brasa-noir"] #cart .campo{color:rgba(244,236,228,.6) !important;}
  body[data-tpl="brasa-noir"] #cart .campo input,
  body[data-tpl="brasa-noir"] #cart .campo select{background:#120F0D !important;color:#F4ECE4 !important;border-color:rgba(255,122,26,.25) !important;}
  body[data-tpl="brasa-noir"] #cart .cart-total{border-top-color:rgba(255,122,26,.25) !important;}
  body[data-tpl="brasa-noir"] #cart .cart-total strong{color:var(--acento) !important;}
  body[data-tpl="brasa-noir"] #cart .cart-row .st-min{background:rgba(255,255,255,.08) !important;color:#F4ECE4 !important;}
  body[data-tpl="brasa-noir"] #cart .cart-row .st-add{background:var(--marca) !important;color:#120F0D !important;}
  body[data-tpl="brasa-noir"] #cart .ubic-btn{border-color:var(--marca) !important;color:var(--acento) !important;background:rgba(255,122,26,.10) !important;}
  body[data-tpl="brasa-noir"] #cart .ubic-btn.ok{background:var(--marca) !important;color:#120F0D !important;}
  body[data-tpl="brasa-noir"] #cart .fact-toggle{color:#F4ECE4 !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));

    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []).map((it) => {
        const media = it.foto
          ? `<img src="${it.foto}" alt="${it.nombre}">`
          : `<span class="bn-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="bn-card">
            <div class="bn-media" data-media>${media}</div>
            <div class="bn-body">
              <h3 class="bn-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="bn-pdesc">${it.desc}</p>` : ``}
              <div class="bn-foot">
                <span class="bn-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
                <span class="bn-ctrl">${ctrl(it.id)}</span>
              </div>
            </div>
          </article>`;
      }).join("");
      return `
        <section class="bn-sec" id="cat-${cid}">
          <div class="bn-sec-head">
            <h2 class="bn-sec-tt">${cat.categoria}</h2>
            <span class="bn-ember"></span>
          </div>
          <div class="bn-grid">${items}</div>
        </section>`;
    }).join("");

    const navHtml = (R.menu || []).map((cat, i) =>
      `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`
    ).join("");

    root.innerHTML = `
      <div class="bn-wrap">
        <header class="bn-hero">
          <div class="bn-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : `<span class="bn-emoji">🔥</span>`}</div>
          <h1 class="bn-name">${R.nombre}</h1>
          ${R.slogan ? `<p class="bn-slogan">${R.slogan}</p>` : ``}
          <div class="bn-rule"></div>
          ${R.direccion ? `<p class="bn-addr">📍 ${R.direccion}</p>` : ``}
          <span class="bn-pill">${R.promo || "🛵 A domicilio o para retirar"}</span>
        </header>
      </div>
      <nav class="bn-nav">${navHtml}</nav>
      <div class="bn-wrap">
        ${menuHtml}
        <div class="bn-end">🔥 <b>${R.nombre}</b> · ${R.bajada || "Hecho a la parrilla"} 🔥</div>
      </div>`;
  },
};
