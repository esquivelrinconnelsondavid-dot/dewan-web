window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["street"] = {
  label: "Cartel Street",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  body[data-tpl="street"]{
    margin:0;background:#F3F1EC;color:#0D0D0D;
    font-family:'Space Grotesk',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;padding-bottom:122px;overflow-x:hidden;
  }
  body[data-tpl="street"] *{box-sizing:border-box;}
  body[data-tpl="street"] .st-wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---------- HERO (bloque de marca) ---------- */
  body[data-tpl="street"] .stz-hero{
    position:relative;margin:0;padding:26px 20px 30px;
    background:var(--marca);
    border-bottom:4px solid #0D0D0D;
    overflow:hidden;
  }
  body[data-tpl="street"] .stz-hero::before{
    content:"";position:absolute;inset:0;opacity:.16;pointer-events:none;
    background:repeating-linear-gradient(45deg,#0D0D0D 0 14px,transparent 14px 28px);
  }
  body[data-tpl="street"] .stz-top{position:relative;display:flex;align-items:center;gap:14px;}
  body[data-tpl="street"] .stz-logo{
    width:74px;height:74px;flex:0 0 auto;border-radius:14px;overflow:hidden;
    border:3px solid #0D0D0D;background:#fff;box-shadow:4px 4px 0 #0D0D0D;
  }
  body[data-tpl="street"] .stz-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="street"] .stz-name{
    font-family:'Archivo Black',sans-serif;font-size:clamp(2rem,9vw,2.7rem);
    line-height:.9;text-transform:uppercase;color:#fff;margin:0;
    text-shadow:3px 3px 0 #0D0D0D;letter-spacing:-.5px;
  }
  body[data-tpl="street"] .stz-slogan{
    position:relative;margin:16px 0 0;display:inline-block;
    background:#0D0D0D;color:#fff;font-weight:700;font-size:14px;
    padding:7px 14px;transform:rotate(-1.5deg);box-shadow:3px 3px 0 rgba(0,0,0,.25);
  }
  body[data-tpl="street"] .stz-badges{position:relative;display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;}
  body[data-tpl="street"] .stz-badge{
    background:#fff;color:#0D0D0D;border:2px solid #0D0D0D;
    font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;
    padding:5px 11px;box-shadow:2px 2px 0 #0D0D0D;
  }

  /* ---------- NAV ---------- */
  body[data-tpl="street"] .stz-nav{
    position:sticky;top:0;z-index:20;display:flex;gap:9px;overflow-x:auto;
    padding:12px 16px;margin:0 -16px;background:#F3F1EC;
    border-bottom:3px solid #0D0D0D;scrollbar-width:none;
  }
  body[data-tpl="street"] .stz-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="street"] .stz-nav button{
    flex:0 0 auto;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px;
    text-transform:uppercase;letter-spacing:.3px;color:#0D0D0D;background:#fff;
    border:2px solid #0D0D0D;padding:8px 15px;cursor:pointer;white-space:nowrap;
    box-shadow:2px 2px 0 #0D0D0D;transition:transform .1s, box-shadow .1s, background .1s, color .1s;
  }
  body[data-tpl="street"] .stz-nav button:active{transform:translate(2px,2px);box-shadow:0 0 0 #0D0D0D;}
  body[data-tpl="street"] .stz-nav button.active{background:var(--marca);color:#fff;}

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="street"] .stz-sec{padding-top:20px;scroll-margin-top:56px;}
  body[data-tpl="street"] .stz-sec-head{display:flex;align-items:baseline;gap:10px;margin:0 2px 16px;}
  body[data-tpl="street"] .stz-sec-num{
    font-family:'Archivo Black',sans-serif;font-size:30px;color:var(--marca);
    -webkit-text-stroke:1.5px #0D0D0D;line-height:1;
  }
  body[data-tpl="street"] .stz-sec-tt{
    font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase;
    color:#0D0D0D;margin:0;line-height:1;letter-spacing:-.3px;
  }

  /* ---------- TARJETAS (neo-brutalista) ---------- */
  body[data-tpl="street"] .stz-grid{display:flex;flex-direction:column;gap:14px;}
  body[data-tpl="street"] .stz-card{
    position:relative;display:flex;align-items:stretch;gap:0;
    background:#fff;border:2.5px solid #0D0D0D;box-shadow:5px 5px 0 #0D0D0D;
    overflow:hidden;transition:transform .1s, box-shadow .1s;
  }
  body[data-tpl="street"] .stz-card:active{transform:translate(3px,3px);box-shadow:2px 2px 0 #0D0D0D;}
  body[data-tpl="street"] .stz-media{
    position:relative;flex:0 0 92px;width:92px;align-self:stretch;
    border-right:2.5px solid #0D0D0D;
    background:var(--marca);
    display:flex;align-items:center;justify-content:center;overflow:hidden;
  }
  body[data-tpl="street"] .stz-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="street"] .stz-emoji{font-size:42px;line-height:1;filter:drop-shadow(2px 2px 0 rgba(0,0,0,.25));}
  body[data-tpl="street"] .stz-body{flex:1;min-width:0;padding:12px 13px;}
  body[data-tpl="street"] .stz-pname{
    font-family:'Archivo Black',sans-serif;font-size:14.5px;text-transform:uppercase;
    color:#0D0D0D;margin:0 0 4px;line-height:1.08;
  }
  body[data-tpl="street"] .stz-pdesc{
    font-size:12px;line-height:1.32;color:#5a554e;margin:0 0 10px;font-weight:500;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="street"] .stz-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;}
  body[data-tpl="street"] .stz-price{
    font-family:'Archivo Black',sans-serif;font-size:15px;color:#0D0D0D;
    background:var(--marca);border:2px solid #0D0D0D;padding:3px 9px;box-shadow:2px 2px 0 #0D0D0D;
  }
  body[data-tpl="street"] .stz-price small{font-size:11px;}

  /* ---------- STEPPER ---------- */
  body[data-tpl="street"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="street"] [data-add]{
    width:38px;height:38px;border:2.5px solid #0D0D0D;background:#0D0D0D;color:#fff;
    font-size:22px;font-weight:800;line-height:1;cursor:pointer;border-radius:0;
    display:inline-flex;align-items:center;justify-content:center;box-shadow:3px 3px 0 var(--marca);
    transition:transform .1s, box-shadow .1s;
  }
  body[data-tpl="street"] [data-add]:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--marca);}
  body[data-tpl="street"] [data-sub]{
    width:32px;height:32px;border:2.5px solid #0D0D0D;background:#fff;color:#0D0D0D;
    font-size:20px;font-weight:800;line-height:1;cursor:pointer;border-radius:0;
    display:none;align-items:center;justify-content:center;
  }
  body[data-tpl="street"] [data-cant]{display:none;min-width:22px;text-align:center;font-size:16px;font-weight:800;padding:0 5px;}
  body[data-tpl="street"] [data-qtywrap].has-qty{gap:5px;}
  body[data-tpl="street"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="street"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="street"] [data-qtywrap].has-qty [data-add]{width:32px;height:32px;font-size:20px;box-shadow:2px 2px 0 var(--marca);}

  body[data-tpl="street"] .stz-end{
    text-align:center;padding:30px 0 8px;font-family:'Archivo Black',sans-serif;
    font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#0D0D0D;
  }
  body[data-tpl="street"] .stz-end span{color:var(--marca);-webkit-text-stroke:.8px #0D0D0D;}

  /* ---------- CARRITO (re-skin) ---------- */
  body[data-tpl="street"] #cart-fab{
    background:#0D0D0D !important;color:#fff !important;border:2.5px solid #0D0D0D !important;
    border-radius:0 !important;box-shadow:4px 4px 0 var(--marca) !important;font-weight:800 !important;
    text-transform:uppercase;
  }
  body[data-tpl="street"] #cart-fab #fab-cant{background:var(--marca) !important;color:#0D0D0D !important;border-radius:0 !important;font-weight:800 !important;}
  body[data-tpl="street"] #cart{background:#F3F1EC !important;border-top:4px solid #0D0D0D !important;border-radius:0 !important;}
  body[data-tpl="street"] #cart .cart-head{background:#F3F1EC !important;}
  body[data-tpl="street"] #cart h2{font-family:'Archivo Black',sans-serif;text-transform:uppercase;}
  body[data-tpl="street"] #cart .cart-row{border:2px solid #0D0D0D !important;border-radius:0 !important;box-shadow:3px 3px 0 #0D0D0D !important;}
  body[data-tpl="street"] #cart .cart-row-sub{color:#0D0D0D !important;font-family:'Archivo Black',sans-serif;}
  body[data-tpl="street"] #cart .campo input,
  body[data-tpl="street"] #cart .campo select{border:2px solid #0D0D0D !important;border-radius:0 !important;}
  body[data-tpl="street"] #cart .cart-total strong{font-family:'Archivo Black',sans-serif;color:#0D0D0D !important;}
  body[data-tpl="street"] #cart .cart-row .st-add{background:#0D0D0D !important;color:#fff !important;border-radius:0 !important;}
  body[data-tpl="street"] #cart .cart-row .st-min{background:#fff !important;color:#0D0D0D !important;border:2px solid #0D0D0D !important;border-radius:0 !important;}
  body[data-tpl="street"] #enviar{border-radius:0 !important;border:2.5px solid #0D0D0D !important;box-shadow:4px 4px 0 #0D0D0D !important;text-transform:uppercase;font-family:'Archivo Black',sans-serif;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍔"));

    const menuHtml = (R.menu || []).map((cat, ci) => {
      const cid = slug(cat.categoria);
      const num = String(ci + 1).padStart(2, "0");
      const items = (cat.items || []).map((it) => {
        const media = it.foto
          ? `<img src="${it.foto}" alt="${it.nombre}">`
          : `<span class="stz-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="stz-card">
            <div class="stz-media" data-media>${media}</div>
            <div class="stz-body">
              <h3 class="stz-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="stz-pdesc">${it.desc}</p>` : ``}
              <div class="stz-foot">
                <span class="stz-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
                <span>${ctrl(it.id)}</span>
              </div>
            </div>
          </article>`;
      }).join("");
      return `
        <section class="stz-sec" id="cat-${cid}">
          <div class="stz-sec-head">
            <span class="stz-sec-num">${num}</span>
            <h2 class="stz-sec-tt">${cat.categoria}</h2>
          </div>
          <div class="stz-grid">${items}</div>
        </section>`;
    }).join("");

    const navHtml = (R.menu || []).map((cat, i) =>
      `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`
    ).join("");

    root.innerHTML = `
      <header class="stz-hero">
        <div class="stz-top">
          <div class="stz-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
          <h1 class="stz-name">${R.nombre}</h1>
        </div>
        ${R.slogan ? `<div class="stz-slogan">${R.slogan}</div>` : ``}
        <div class="stz-badges">
          ${(R.badges || [R.promo || "🛵 A domicilio o retiro"]).filter(Boolean).map((b) => `<span class="stz-badge">${b}</span>`).join("")}
        </div>
      </header>
      <nav class="stz-nav">${navHtml}</nav>
      <div class="st-wrap">
        ${menuHtml}
        <div class="stz-end">¿Listo para <span>${R.nombre}</span>?</div>
      </div>`;
  },
};
