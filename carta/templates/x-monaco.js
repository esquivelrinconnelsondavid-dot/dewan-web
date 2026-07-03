/* x-monaco — "El Domo" — plantilla EXCLUSIVA de Mônaco Parrillada & Pizza.
   Recrea el logo: domo naranja con lettering script blanco, carta crema
   con títulos caligráficos y filas de carta fina. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-monaco"] = {
  label: "El Domo Mônaco",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Prata&family=Italianno&family=Jost:wght@400;500;600;700&display=swap');

  body[data-tpl="x-monaco"]{
    --mo-naranja:#FC6608; --mo-quemado:#C0491A; --mo-tinta:#332014; --mo-crema:#FFF7ED;
    background:var(--mo-crema); color:var(--mo-tinta);
    font-family:'Jost',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-monaco"] #app{overflow-x:hidden;}

  /* ---------- EL DOMO ---------- */
  body[data-tpl="x-monaco"] .mo-domo{
    position:relative; background:linear-gradient(178deg,#FF7E1F,#FC6608 46%,#E85B05);
    border-radius:0 0 50% 50% / 0 0 74px 74px;
    padding:calc(30px + env(safe-area-inset-top)) 22px 66px; text-align:center; color:#fff;
    box-shadow:0 18px 40px -18px rgba(192,73,26,.55);
  }
  body[data-tpl="x-monaco"] .mo-domo::before{
    content:""; position:absolute; left:50%; top:16px; transform:translateX(-50%);
    width:220px; height:220px; border:1.5px solid rgba(255,255,255,.35); border-radius:50%;
    clip-path:inset(0 0 62% 0);
  }
  body[data-tpl="x-monaco"] .mo-script{font-family:'Italianno',cursive;font-size:64px;line-height:.9;margin:10px 0 2px;text-shadow:0 3px 14px rgba(120,40,0,.35);}
  body[data-tpl="x-monaco"] .mo-sub{font-weight:600;font-size:11px;letter-spacing:.42em;text-transform:uppercase;opacity:.95;}
  body[data-tpl="x-monaco"] .mo-slogan{font-family:'Italianno',cursive;font-size:27px;margin-top:12px;opacity:.95;}
  body[data-tpl="x-monaco"] .mo-rule{width:64px;height:1px;background:rgba(255,255,255,.55);margin:12px auto 0;position:relative;}
  body[data-tpl="x-monaco"] .mo-rule::after{content:"◆";position:absolute;left:50%;top:50%;transform:translate(-50%,-52%);font-size:8px;color:#fff;}

  /* tarjeta flotante con dirección/promo */
  body[data-tpl="x-monaco"] .mo-info{
    position:relative; z-index:2; margin:-34px 22px 0; background:#fff;
    border:1px solid #F4DFC8; border-radius:16px; padding:13px 16px; text-align:center;
    box-shadow:0 14px 30px -14px rgba(146,64,14,.25);
  }
  body[data-tpl="x-monaco"] .mo-info .p{font-weight:600;font-size:13.5px;color:var(--mo-quemado);}
  body[data-tpl="x-monaco"] .mo-info .d{font-size:12px;color:#9A7B62;margin-top:3px;}

  /* ---------- BUSCADOR + NAV ---------- */
  body[data-tpl="x-monaco"] .mo-search{padding:18px 22px 4px;}
  body[data-tpl="x-monaco"] .mo-search input{
    width:100%; border:1px solid #EFD9BF; background:#fff; border-radius:999px;
    padding:12px 18px; font-family:'Jost'; font-size:15.5px; color:var(--mo-tinta); outline:none;
  }
  body[data-tpl="x-monaco"] .mo-search input::placeholder{color:#C9A985;}
  body[data-tpl="x-monaco"] .mo-nav{
    position:sticky; top:0; z-index:30; background:var(--mo-crema);
    display:flex; gap:4px; overflow-x:auto; padding:10px 16px 0; scrollbar-width:none;
    border-bottom:1px solid #F2DFC6;
  }
  body[data-tpl="x-monaco"] .mo-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-monaco"] .mo-nav button{
    flex:0 0 auto; background:none; border:none; cursor:pointer;
    font-family:'Jost'; font-weight:600; font-size:12.5px; letter-spacing:.14em; text-transform:uppercase;
    color:#B08A66; padding:8px 10px 12px; border-bottom:2.5px solid transparent; white-space:nowrap;
  }
  body[data-tpl="x-monaco"] .mo-nav button.activa{color:var(--mo-quemado);border-bottom-color:var(--mo-naranja);}

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-monaco"] .mo-sec{padding:6px 22px 0;scroll-margin-top:64px;}
  body[data-tpl="x-monaco"] .mo-cat{
    display:flex; align-items:center; gap:14px; margin:26px 0 6px;
  }
  body[data-tpl="x-monaco"] .mo-cat::before, body[data-tpl="x-monaco"] .mo-cat::after{
    content:""; flex:1; height:1px; background:#EBD4B6;
  }
  body[data-tpl="x-monaco"] .mo-cat span{
    font-family:'Italianno',cursive; font-size:40px; line-height:1; color:var(--mo-naranja);
    text-align:center; max-width:75%;
  }

  /* ---------- FILAS DE CARTA ---------- */
  body[data-tpl="x-monaco"] .mo-item{
    display:grid; grid-template-columns:46px 1fr auto; gap:13px; align-items:center;
    padding:13px 0; border-bottom:1px dashed #F0D9BC;
  }
  body[data-tpl="x-monaco"] .mo-item:last-child{border-bottom:none;}
  body[data-tpl="x-monaco"] .mo-media{
    width:46px;height:46px;border-radius:50%;background:#FFEAD2;display:flex;align-items:center;justify-content:center;
    font-size:21px;overflow:hidden;position:relative;
  }
  body[data-tpl="x-monaco"] .mo-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-monaco"] .mo-nom{font-family:'Prata',serif;font-size:15px;line-height:1.25;color:var(--mo-tinta);}
  body[data-tpl="x-monaco"] .mo-desc{font-size:12.5px;color:#A18063;line-height:1.4;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  body[data-tpl="x-monaco"] .mo-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
  body[data-tpl="x-monaco"] .mo-precio{font-family:'Prata',serif;font-size:16px;color:var(--mo-quemado);font-variant-numeric:tabular-nums;white-space:nowrap;}

  /* steppers */
  body[data-tpl="x-monaco"] [data-qtywrap]{display:inline-flex;align-items:center;gap:5px;}
  body[data-tpl="x-monaco"] [data-add]{
    width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:var(--mo-naranja);color:#fff;
    font-size:20px;font-weight:600;line-height:1;display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 6px 14px -4px rgba(252,102,8,.55);
  }
  body[data-tpl="x-monaco"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-monaco"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:1px solid #EBCBA4;background:#fff;color:var(--mo-quemado);
    font-size:17px;display:none;align-items:center;justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-monaco"] [data-cant]{display:none;font-family:'Prata';font-size:14.5px;color:var(--mo-tinta);min-width:16px;text-align:center;}
  body[data-tpl="x-monaco"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-monaco"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-monaco"] .mo-none{display:none;text-align:center;color:#B08A66;font-weight:500;padding:34px 20px;}
  body[data-tpl="x-monaco"] .mo-hide{display:none !important;}
  body[data-tpl="x-monaco"] .mo-fin{
    text-align:center;padding:34px 0 10px;font-family:'Italianno',cursive;font-size:30px;color:#D9A878;
  }

  /* carrito */
  body[data-tpl="x-monaco"] #cart-fab{
    background:var(--mo-naranja) !important;color:#fff !important;border-radius:999px !important;
    font-family:'Jost' !important;font-weight:700 !important;
    box-shadow:0 12px 30px -6px rgba(252,102,8,.6) !important;
  }
  body[data-tpl="x-monaco"] #cart-fab #fab-cant{background:#fff !important;color:var(--mo-quemado) !important;}
  body[data-tpl="x-monaco"] #cart h2{font-family:'Prata',serif;}
  body[data-tpl="x-monaco"] #cart .cart-row .st-add{background:var(--mo-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-monaco"] .mo-script{font-size:54px;}
    body[data-tpl="x-monaco"] .mo-cat span{font-size:34px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍽️"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="mo-item" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="mo-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div><div class="mo-nom">${it.nombre}</div>${it.desc ? `<div class="mo-desc">${it.desc}</div>` : ``}</div>
        <div class="mo-right"><span class="mo-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="mo-sec" id="cat-${slug(c.categoria)}">
        <div class="mo-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    root.innerHTML = `
      <header class="mo-domo">
        <div class="mo-sub">Parrillada &amp; Pizza</div>
        <h1 class="mo-script">${R.nombre}</h1>
        <div class="mo-rule"></div>
        <div class="mo-slogan">${R.slogan ? R.slogan.split("·")[0].trim() : "Tradición y Buen Gusto"}</div>
      </header>
      <div class="mo-info">
        <div class="p">${R.promo || ""}</div>
        ${R.direccion ? `<div class="d">📍 ${R.direccion}</div>` : ``}
      </div>
      <div class="mo-search"><input id="mo-q" type="text" placeholder="Buscar en la carta…"></div>
      <nav class="mo-nav">${nav}</nav>
      ${secciones}
      <p class="mo-none" id="mo-none">Sin resultados en la carta 🔍</p>
      <div class="mo-fin">Buen provecho</div>`;

    /* buscador */
    const q = root.querySelector("#mo-q"), none = root.querySelector("#mo-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".mo-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".mo-item").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("mo-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("mo-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".mo-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-70px 0px -75% 0px" });
      root.querySelectorAll(".mo-sec").forEach((s) => io.observe(s));
    }
  },
};
