window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["swift"] = {
  label: "Delivery App",
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  body[data-tpl="swift"]{
    margin:0;background:#F4F5F7;color:#1C1F26;
    font-family:'Plus Jakarta Sans',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;padding-bottom:120px;overflow-x:hidden;
  }
  body[data-tpl="swift"] *{box-sizing:border-box;}
  body[data-tpl="swift"] .sw-wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---------- HEADER ---------- */
  body[data-tpl="swift"] .sw-head{
    background:linear-gradient(180deg,var(--marca),color-mix(in srgb,var(--marca) 84%,#000));
    padding:20px 16px 16px;color:#fff;border-radius:0 0 22px 22px;
  }
  body[data-tpl="swift"] .sw-head-top{display:flex;align-items:center;gap:12px;}
  body[data-tpl="swift"] .sw-logo{
    width:54px;height:54px;flex:0 0 auto;border-radius:15px;overflow:hidden;
    background:#fff;box-shadow:0 6px 16px rgba(0,0,0,.2);
  }
  body[data-tpl="swift"] .sw-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="swift"] .sw-name{font-size:21px;font-weight:800;margin:0;line-height:1.05;letter-spacing:-.3px;}
  body[data-tpl="swift"] .sw-sub{font-size:12.5px;font-weight:500;opacity:.92;margin:2px 0 0;}
  body[data-tpl="swift"] .sw-search{
    display:flex;align-items:center;gap:9px;margin-top:14px;
    background:#fff;border-radius:13px;padding:11px 14px;
    box-shadow:0 6px 18px rgba(0,0,0,.12);
  }
  body[data-tpl="swift"] .sw-search svg{flex:0 0 auto;}
  body[data-tpl="swift"] .sw-search input{
    border:none;outline:none;width:100%;font-family:inherit;font-size:14.5px;color:#1C1F26;background:transparent;
  }
  body[data-tpl="swift"] .sw-banner{
    display:flex;align-items:center;gap:8px;margin-top:12px;
    background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);
    border-radius:11px;padding:9px 12px;font-size:12.5px;font-weight:600;
  }

  /* ---------- CHIPS ---------- */
  body[data-tpl="swift"] .sw-chips{
    position:sticky;top:0;z-index:20;display:flex;gap:8px;overflow-x:auto;
    padding:12px 16px;margin:0 -16px 2px;background:#F4F5F7;scrollbar-width:none;
  }
  body[data-tpl="swift"] .sw-chips::-webkit-scrollbar{display:none;}
  body[data-tpl="swift"] .sw-chips button{
    flex:0 0 auto;font-family:inherit;font-weight:600;font-size:13px;color:#5b606b;
    background:#fff;border:1px solid #e7e8ec;padding:9px 15px;border-radius:999px;cursor:pointer;white-space:nowrap;
    box-shadow:0 1px 3px rgba(0,0,0,.04);transition:all .15s;
  }
  body[data-tpl="swift"] .sw-chips button:active{transform:scale(.96);}
  body[data-tpl="swift"] .sw-chips button.active{
    background:color-mix(in srgb,var(--marca) 14%,#fff);color:var(--marca);
    border-color:color-mix(in srgb,var(--marca) 40%,#fff);
  }

  /* ---------- SECCIÓN ---------- */
  body[data-tpl="swift"] .sw-sec{padding-top:14px;scroll-margin-top:58px;}
  body[data-tpl="swift"] .sw-sec-tt{font-size:18px;font-weight:800;color:#1C1F26;margin:4px 2px 12px;letter-spacing:-.3px;}

  /* ---------- TARJETAS ---------- */
  body[data-tpl="swift"] .sw-grid{display:flex;flex-direction:column;gap:12px;}
  body[data-tpl="swift"] .sw-card{
    position:relative;display:flex;gap:13px;background:#fff;border-radius:18px;padding:12px;
    box-shadow:0 2px 12px rgba(17,20,28,.06);transition:transform .14s, box-shadow .14s;
  }
  body[data-tpl="swift"] .sw-card:active{transform:scale(.99);}
  body[data-tpl="swift"] .sw-media{
    position:relative;flex:0 0 auto;width:84px;height:84px;border-radius:14px;overflow:hidden;
    display:flex;align-items:center;justify-content:center;
    background:color-mix(in srgb,var(--marca) 9%,#fff);
  }
  body[data-tpl="swift"] .sw-media img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="swift"] .sw-emoji{font-size:40px;line-height:1;}
  body[data-tpl="swift"] .sw-body{flex:1;min-width:0;display:flex;flex-direction:column;}
  body[data-tpl="swift"] .sw-pname{font-size:15px;font-weight:700;color:#1C1F26;margin:0 0 3px;line-height:1.2;}
  body[data-tpl="swift"] .sw-pdesc{
    font-size:12.5px;line-height:1.34;color:#8b8f98;margin:0 0 auto;font-weight:500;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="swift"] .sw-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="swift"] .sw-price{font-size:16px;font-weight:800;color:#1C1F26;}
  body[data-tpl="swift"] .sw-price small{font-size:12px;font-weight:700;color:#8b8f98;margin-right:1px;}

  /* ---------- STEPPER (FAB) ---------- */
  body[data-tpl="swift"] [data-qtywrap]{display:inline-flex;align-items:center;}
  body[data-tpl="swift"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;
    background:var(--marca);color:#fff;font-size:21px;font-weight:700;line-height:1;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 4px 12px color-mix(in srgb,var(--marca) 45%,transparent);transition:transform .12s;
  }
  body[data-tpl="swift"] [data-add]:active{transform:scale(.88);}
  body[data-tpl="swift"] [data-sub]{
    width:32px;height:32px;border-radius:50%;border:1.5px solid #e2e3e7;background:#fff;color:var(--marca);
    font-size:20px;font-weight:700;line-height:1;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="swift"] [data-cant]{display:none;min-width:22px;text-align:center;font-size:15px;font-weight:800;color:#1C1F26;padding:0 3px;}
  body[data-tpl="swift"] [data-qtywrap].has-qty{gap:4px;background:#f4f5f7;border-radius:999px;padding:3px;}
  body[data-tpl="swift"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="swift"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}
  body[data-tpl="swift"] [data-qtywrap].has-qty [data-add]{width:32px;height:32px;font-size:19px;}

  body[data-tpl="swift"] .sw-none{display:none;text-align:center;color:#9aa0a8;font-weight:600;padding:40px 16px;}
  body[data-tpl="swift"].sw-searching [id^="cat-"]{display:block !important;}
  body[data-tpl="swift"] .sw-hide{display:none !important;}
  body[data-tpl="swift"] .sw-end{text-align:center;padding:26px 0 8px;color:#9aa0a8;font-size:12px;}

  /* ---------- CARRITO (re-skin app) ---------- */
  body[data-tpl="swift"] #cart-fab{
    background:#1C1F26 !important;color:#fff !important;border-radius:16px !important;
    box-shadow:0 12px 30px rgba(17,20,28,.3) !important;font-weight:700 !important;
  }
  body[data-tpl="swift"] #cart-fab #fab-cant{background:var(--marca) !important;color:#fff !important;}
  body[data-tpl="swift"] #cart{background:#F4F5F7 !important;border-radius:24px 24px 0 0 !important;}
  body[data-tpl="swift"] #cart .cart-head{background:#F4F5F7 !important;}
  body[data-tpl="swift"] #cart .cart-row{border-radius:14px !important;border-color:#ececec !important;}
  body[data-tpl="swift"] #cart .cart-row-sub{color:var(--marca) !important;}
  body[data-tpl="swift"] #cart .campo input,
  body[data-tpl="swift"] #cart .campo select{border-radius:12px !important;}
  body[data-tpl="swift"] #cart .cart-total strong{color:#1C1F26 !important;}
  body[data-tpl="swift"] #cart .cart-row .st-add{background:var(--marca) !important;color:#fff !important;}
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

    const menuHtml = (R.menu || []).map((cat) => {
      const cid = slug(cat.categoria);
      const items = (cat.items || []).map((it) => {
        const media = it.foto
          ? `<img src="${it.foto}" alt="${it.nombre}">`
          : `<span class="sw-emoji">${emo(it, cat.categoria)}</span>`;
        return `
          <article class="sw-card" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
            <div class="sw-media" data-media>${media}</div>
            <div class="sw-body">
              <h3 class="sw-pname">${it.nombre}</h3>
              ${it.desc ? `<p class="sw-pdesc">${it.desc}</p>` : `<p class="sw-pdesc"> </p>`}
              <div class="sw-foot">
                <span class="sw-price"><small>$</small>${Number(it.precio).toFixed(2)}</span>
                <span>${ctrl(it.id)}</span>
              </div>
            </div>
          </article>`;
      }).join("");
      return `
        <section class="sw-sec" id="cat-${cid}">
          <h2 class="sw-sec-tt">${cat.categoria}</h2>
          <div class="sw-grid">${items}</div>
        </section>`;
    }).join("");

    const navHtml = (R.menu || []).map((cat, i) =>
      `<button data-cat="${slug(cat.categoria)}" class="${i === 0 ? "active" : ""}">${cat.categoria}</button>`
    ).join("");

    root.innerHTML = `
      <header class="sw-head">
        <div class="sw-head-top">
          <div class="sw-logo">${R.logo ? `<img src="${R.logo}" alt="${R.nombre}">` : ``}</div>
          <div>
            <h1 class="sw-name">${R.nombre}</h1>
            <p class="sw-sub">${R.bajada || R.slogan || ""}</p>
          </div>
        </div>
        <div class="sw-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a8" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
          <input id="sw-search" type="text" placeholder="Buscar en ${R.nombre}…" />
        </div>
        <div class="sw-banner">${R.promo || "🛵 A domicilio o para retirar · pide en 3 toques"}</div>
      </header>
      <nav class="sw-chips">${navHtml}</nav>
      <div class="sw-wrap">
        ${menuHtml}
        <p class="sw-none" id="sw-none">Sin resultados 🔍</p>
        <div class="sw-end">${R.direccion ? "📍 " + R.direccion : R.nombre}</div>
      </div>`;

    const inp = root.querySelector("#sw-search");
    const none = root.querySelector("#sw-none");
    if (inp) {
      inp.addEventListener("input", () => {
        const q = norm(inp.value.trim());
        const secs = root.querySelectorAll(".sw-sec");
        if (!q) {
          document.body.classList.remove("sw-searching");
          root.querySelectorAll(".sw-card,.sw-sec").forEach((el) => el.classList.remove("sw-hide"));
          if (none) none.style.display = "none";
          return;
        }
        document.body.classList.add("sw-searching");
        let total = 0;
        secs.forEach((sec) => {
          let any = false;
          sec.querySelectorAll(".sw-card").forEach((c) => {
            const m = c.dataset.n.includes(q);
            c.classList.toggle("sw-hide", !m);
            if (m) { any = true; total++; }
          });
          sec.classList.toggle("sw-hide", !any);
        });
        if (none) none.style.display = total ? "none" : "block";
      });
    }
  },
};
