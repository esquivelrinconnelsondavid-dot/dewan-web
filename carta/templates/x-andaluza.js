/* x-andaluza — "Etiqueta Negra" — plantilla EXCLUSIVA de La Andaluza (Embutidos & Deli).
   Negro de bodega, marco dorado fino, listón rojo del logo y script clásica:
   una etiqueta de charcutería fina hecha carta. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-andaluza"] = {
  label: "Etiqueta Negra",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@400;500;600&display=swap');

  body[data-tpl="x-andaluza"]{
    --an-negro:#100C09; --an-oro:#C89B4B; --an-rojo:#B12629; --an-crema:#F3EADB;
    background:radial-gradient(140% 50% at 50% 0%, #1D1610 0%, var(--an-negro) 60%);
    background-attachment:fixed;
    color:var(--an-crema); font-family:'Cormorant Garamond',serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-andaluza"] #app{overflow-x:hidden;}

  /* marco dorado fijo */
  body[data-tpl="x-andaluza"] .an-marco{
    position:fixed;inset:9px;border:1px solid rgba(200,155,75,.45);border-radius:6px;
    pointer-events:none;z-index:70;
  }
  body[data-tpl="x-andaluza"] .an-marco::before{
    content:"";position:absolute;inset:4px;border:1px solid rgba(200,155,75,.2);border-radius:4px;
  }

  /* ---------- ETIQUETA ---------- */
  body[data-tpl="x-andaluza"] .an-top{text-align:center;padding:calc(34px + env(safe-area-inset-top)) 26px 6px;}
  body[data-tpl="x-andaluza"] .an-emb{font-family:'Jost';font-size:11px;font-weight:500;letter-spacing:.5em;text-transform:uppercase;color:var(--an-oro);text-indent:.5em;}
  body[data-tpl="x-andaluza"] .an-script{font-family:'Great Vibes',cursive;font-size:58px;line-height:1;color:#fff;margin:14px 0 4px;text-shadow:0 4px 22px rgba(200,155,75,.25);}
  body[data-tpl="x-andaluza"] .an-sierra{font-style:italic;font-size:16px;color:var(--an-oro);}
  body[data-tpl="x-andaluza"] .an-rules{width:min(300px,78%);margin:14px auto 0;border-top:1px solid rgba(200,155,75,.7);border-bottom:1px solid rgba(200,155,75,.35);height:4px;}

  /* listón rojo */
  body[data-tpl="x-andaluza"] .an-liston{
    position:relative;display:table;margin:18px auto 0;background:var(--an-rojo);color:#fff;
    font-family:'Jost';font-size:10.5px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;
    padding:8px 22px;text-indent:.32em;
    box-shadow:0 6px 16px rgba(177,38,41,.4);
  }
  body[data-tpl="x-andaluza"] .an-liston::before, body[data-tpl="x-andaluza"] .an-liston::after{
    content:"";position:absolute;top:0;bottom:0;width:14px;background:var(--an-rojo);
  }
  body[data-tpl="x-andaluza"] .an-liston::before{left:-13px;clip-path:polygon(100% 0,0 50%,100% 100%);}
  body[data-tpl="x-andaluza"] .an-liston::after{right:-13px;clip-path:polygon(0 0,100% 50%,0 100%);}
  body[data-tpl="x-andaluza"] .an-datos{font-family:'Jost';font-size:12px;color:rgba(243,234,219,.6);margin-top:15px;letter-spacing:.04em;}

  /* ---------- BUSCADOR + NAV ---------- */
  body[data-tpl="x-andaluza"] .an-search{padding:18px 26px 0;}
  body[data-tpl="x-andaluza"] .an-search input{
    width:100%;border:1px solid rgba(200,155,75,.4);background:rgba(255,255,255,.05);border-radius:4px;
    padding:12px 15px;font-family:'Jost';font-size:15px;color:var(--an-crema);outline:none;
  }
  body[data-tpl="x-andaluza"] .an-search input::placeholder{color:rgba(243,234,219,.35);}
  body[data-tpl="x-andaluza"] .an-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:2px;overflow-x:auto;
    padding:12px 20px 0;scrollbar-width:none;
    background:linear-gradient(180deg, rgba(16,12,9,.98), rgba(16,12,9,.9));
    border-bottom:1px solid rgba(200,155,75,.3);
  }
  body[data-tpl="x-andaluza"] .an-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-andaluza"] .an-nav button{
    flex:0 0 auto;background:none;border:none;cursor:pointer;
    font-family:'Jost';font-weight:500;font-size:12px;letter-spacing:.2em;text-transform:uppercase;
    color:rgba(243,234,219,.55);padding:9px 11px 13px;border-bottom:2px solid transparent;white-space:nowrap;
  }
  body[data-tpl="x-andaluza"] .an-nav button.activa{color:var(--an-oro);border-bottom-color:var(--an-oro);}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-andaluza"] .an-sec{padding:6px 26px 0;scroll-margin-top:66px;}
  body[data-tpl="x-andaluza"] .an-cat{text-align:center;margin:30px 0 8px;}
  body[data-tpl="x-andaluza"] .an-cat .mini-liston{
    position:relative;display:inline-block;background:var(--an-rojo);color:#fff;
    font-family:'Jost';font-size:11px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;
    padding:7px 18px;text-indent:.3em;
  }
  body[data-tpl="x-andaluza"] .an-cat .mini-liston::before, body[data-tpl="x-andaluza"] .an-cat .mini-liston::after{
    content:"";position:absolute;top:0;bottom:0;width:12px;background:var(--an-rojo);
  }
  body[data-tpl="x-andaluza"] .an-cat .mini-liston::before{left:-11px;clip-path:polygon(100% 0,0 50%,100% 100%);}
  body[data-tpl="x-andaluza"] .an-cat .mini-liston::after{right:-11px;clip-path:polygon(0 0,100% 50%,0 100%);}

  /* ---------- FILAS ---------- */
  body[data-tpl="x-andaluza"] .an-item{
    display:grid;grid-template-columns:42px 1fr auto;gap:13px;align-items:center;
    padding:13px 0;border-bottom:1px solid rgba(200,155,75,.18);
  }
  body[data-tpl="x-andaluza"] .an-item:last-child{border-bottom:none;}
  body[data-tpl="x-andaluza"] .an-media{
    width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.06);
    border:1px solid rgba(200,155,75,.4);
    display:flex;align-items:center;justify-content:center;font-size:19px;overflow:hidden;position:relative;
  }
  body[data-tpl="x-andaluza"] .an-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-andaluza"] .an-nom{font-weight:600;font-size:17px;line-height:1.2;color:#fff;}
  body[data-tpl="x-andaluza"] .an-desc{font-style:italic;font-size:13.5px;color:rgba(243,234,219,.55);line-height:1.35;margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-andaluza"] .an-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
  body[data-tpl="x-andaluza"] .an-precio{font-weight:700;font-size:17px;color:var(--an-oro);font-variant-numeric:tabular-nums;white-space:nowrap;}

  /* steppers */
  body[data-tpl="x-andaluza"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-andaluza"] [data-add]{
    width:33px;height:33px;border-radius:50%;border:1px solid rgba(200,155,75,.8);cursor:pointer;
    background:var(--an-oro);color:#1D1207;font-size:19px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 16px -4px rgba(200,155,75,.4);
  }
  body[data-tpl="x-andaluza"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-andaluza"] [data-sub]{
    width:29px;height:29px;border-radius:50%;border:1px solid rgba(243,234,219,.5);background:transparent;color:var(--an-crema);
    font-size:16px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-andaluza"] [data-cant]{display:none;font-family:'Jost';font-weight:600;font-size:14px;color:#fff;min-width:16px;text-align:center;}
  body[data-tpl="x-andaluza"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-andaluza"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-andaluza"] .an-none{display:none;text-align:center;color:rgba(243,234,219,.5);font-family:'Jost';padding:34px 20px;}
  body[data-tpl="x-andaluza"] .an-hide{display:none !important;}
  body[data-tpl="x-andaluza"] .an-fin{text-align:center;padding:36px 0 14px;}
  body[data-tpl="x-andaluza"] .an-fin .s{font-family:'Great Vibes',cursive;font-size:31px;color:var(--an-oro);}
  body[data-tpl="x-andaluza"] .an-fin .r{font-family:'Jost';font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:rgba(243,234,219,.4);margin-top:6px;text-indent:.4em;}

  /* carrito */
  body[data-tpl="x-andaluza"] #cart-fab{
    background:var(--an-rojo) !important;color:#fff !important;border-radius:6px !important;
    font-family:'Jost' !important;font-weight:600 !important;letter-spacing:.05em;
    box-shadow:0 14px 34px rgba(177,38,41,.4) !important;
  }
  body[data-tpl="x-andaluza"] #cart-fab #fab-cant{background:#fff !important;color:var(--an-rojo) !important;}
  body[data-tpl="x-andaluza"] #cart h2{font-family:'Cormorant Garamond',serif;}
  body[data-tpl="x-andaluza"] #cart .cart-row .st-add{background:var(--an-oro) !important;color:#1D1207 !important;}

  @media(max-width:380px){
    body[data-tpl="x-andaluza"] .an-script{font-size:48px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🥪"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="an-item" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="an-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div><div class="an-nom">${it.nombre}</div>${it.desc ? `<div class="an-desc">${it.desc}</div>` : ``}</div>
        <div class="an-right"><span class="an-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="an-sec" id="cat-${slug(c.categoria)}">
        <div class="an-cat"><span class="mini-liston">${c.categoria}</span></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <div class="an-marco"></div>
      <header class="an-top">
        <div class="an-emb">Embutidos &amp; Deli</div>
        <h1 class="an-script">${R.nombre}</h1>
        <div class="an-sierra">De la Sierra</div>
        <div class="an-rules"></div>
        <div class="an-liston">Cafetería · Riobamba</div>
        ${R.direccion ? `<div class="an-datos">📍 ${R.direccion}</div>` : ``}
      </header>
      <div class="an-search"><input id="an-q" type="text" placeholder="Buscar sánduches, batidos, tapitas…"></div>
      <nav class="an-nav">${nav}</nav>
      ${secciones}
      <p class="an-none" id="an-none">Sin resultados</p>
      <div class="an-fin"><div class="s">La Andaluza</div><div class="r">De la Sierra · ®</div></div>`;

    /* buscador */
    const q = root.querySelector("#an-q"), none = root.querySelector("#an-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".an-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".an-item").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("an-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("an-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    const botones = [...root.querySelectorAll(".an-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-72px 0px -75% 0px" });
      root.querySelectorAll(".an-sec").forEach((s) => io.observe(s));
    }
  },
};
