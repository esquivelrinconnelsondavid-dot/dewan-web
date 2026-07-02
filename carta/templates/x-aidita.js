/* x-aidita — "Costa Fresca" — plantilla EXCLUSIVA de Ceviches Aidita.
   Naranja pleno del logo con rodajas de limón, ola blanca gorda y el menú
   sobre una hoja blanca que sube: la cevichería fresquita del barrio. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-aidita"] = {
  label: "Costa Fresca",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600;1,700&display=swap');

  body[data-tpl="x-aidita"]{
    --ai-naranja:#FD5B03; --ai-hondo:#C23F00; --ai-tinta:#2A1607;
    --ai-limon:#8FBF2F; --ai-pulpa:#EAF6C8; --ai-palido:#FFF3C9;
    background:#FD5B03;
    background-image:linear-gradient(180deg,#FD5B03 0%,#F35200 42%,#DD4600 100%);
    color:var(--ai-tinta); font-family:'Nunito',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-aidita"] #app{overflow-x:hidden;}

  /* ---------- HEADER NARANJA PLENO ---------- */
  body[data-tpl="x-aidita"] .ai-top{
    position:relative;text-align:center;
    padding:calc(22px + env(safe-area-inset-top)) 18px 30px;
  }
  body[data-tpl="x-aidita"] .ai-logo{
    width:74px;height:74px;border-radius:50%;overflow:hidden;margin:0 auto 10px;
    border:4px solid #fff;background:#fff;box-shadow:0 8px 18px rgba(120,40,0,.35);
    position:relative;z-index:1;
  }
  body[data-tpl="x-aidita"] .ai-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-aidita"] .ai-arco{
    position:relative;z-index:1;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:15px;letter-spacing:.44em;text-indent:.44em;color:#FFE9D8;text-transform:uppercase;
    text-shadow:0 2px 0 rgba(150,45,0,.3);
  }
  body[data-tpl="x-aidita"] .ai-gigante{
    position:relative;z-index:1;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:clamp(46px,17vw,76px);line-height:.98;color:#fff;text-transform:uppercase;
    letter-spacing:.01em;text-shadow:0 5px 0 rgba(150,45,0,.35);margin-top:2px;
  }
  body[data-tpl="x-aidita"] .ai-slogan{
    position:relative;z-index:1;font-style:italic;font-weight:700;font-size:15.5px;
    color:#fff;margin-top:8px;text-shadow:0 2px 6px rgba(140,40,0,.4);
  }
  body[data-tpl="x-aidita"] .ai-meta{
    position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px;
  }
  body[data-tpl="x-aidita"] .ai-meta span{
    font-weight:800;font-size:12px;color:var(--ai-hondo);background:rgba(255,255,255,.94);
    border-radius:999px;padding:7px 13px;box-shadow:0 4px 10px rgba(140,40,0,.25);
  }

  /* rodajas de limón (puro CSS) */
  body[data-tpl="x-aidita"] .ai-limon{
    position:absolute;border-radius:50%;border:5px solid var(--ai-limon);z-index:0;
    background:
      radial-gradient(circle at center, #F6FBE6 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, var(--ai-pulpa) 0deg 50deg, #A9CE54 50deg 60deg);
    box-shadow:0 8px 16px rgba(90,30,0,.28);
  }
  body[data-tpl="x-aidita"] .ai-limon.l1{width:56px;height:56px;left:12px;top:calc(30px + env(safe-area-inset-top));transform:rotate(-14deg);}
  body[data-tpl="x-aidita"] .ai-limon.l2{width:66px;height:66px;right:8px;top:calc(96px + env(safe-area-inset-top));transform:rotate(12deg);}
  body[data-tpl="x-aidita"] .ai-limon.l3{width:36px;height:36px;left:26px;bottom:34px;transform:rotate(24deg);border-width:4px;}

  /* ---------- HOJA BLANCA QUE SUBE + OLA ---------- */
  body[data-tpl="x-aidita"] .ai-hoja{
    position:relative;background:#fff;border-radius:26px 26px 0 0;
    box-shadow:0 -10px 26px rgba(120,40,0,.22);padding-bottom:26px;
  }
  body[data-tpl="x-aidita"] .ai-hoja::before{
    content:"";position:absolute;left:22px;right:22px;top:-15px;height:16px;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='16' viewBox='0 0 64 16'%3E%3Cpath d='M0 16 L0 9 Q 16 -3 32 9 T 64 9 L64 16 Z' fill='%23ffffff'/%3E%3C/svg%3E");
    background-repeat:repeat-x;background-size:64px 16px;
  }

  /* ---------- BUSCADOR ---------- */
  body[data-tpl="x-aidita"] .ai-search{padding:20px 18px 4px;}
  body[data-tpl="x-aidita"] .ai-search input{
    width:100%;border:2px solid #FFD3B8;background:#FFF9F4;border-radius:14px;
    padding:12px 16px;font-family:'Nunito',sans-serif;font-weight:600;font-size:15.5px;
    color:var(--ai-tinta);outline:none;
  }
  body[data-tpl="x-aidita"] .ai-search input:focus{border-color:var(--ai-naranja);}
  body[data-tpl="x-aidita"] .ai-search input::placeholder{color:#B08A6E;}

  /* ---------- NAV CHIPS ---------- */
  body[data-tpl="x-aidita"] .ai-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 18px;scrollbar-width:none;background:rgba(255,255,255,.96);
    backdrop-filter:blur(6px);border-bottom:2px solid #FFE4D2;
  }
  body[data-tpl="x-aidita"] .ai-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-aidita"] .ai-nav button{
    flex:0 0 auto;font-family:'Baloo 2',cursive;font-weight:700;font-size:13.5px;
    color:var(--ai-hondo);background:#fff;border:2px solid var(--ai-naranja);
    border-radius:999px;padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-aidita"] .ai-nav button.activa{
    background:var(--ai-naranja);border-color:var(--ai-hondo);color:#fff;
    box-shadow:0 3px 0 var(--ai-hondo);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-aidita"] .ai-sec{padding:0 18px;scroll-margin-top:74px;}
  body[data-tpl="x-aidita"] .ai-cat{
    display:flex;align-items:center;gap:9px;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:20px;color:var(--ai-tinta);margin:24px 0 4px;
  }
  body[data-tpl="x-aidita"] .ai-mini{
    flex:0 0 auto;width:19px;height:19px;border-radius:50%;border:3px solid var(--ai-limon);
    background:
      radial-gradient(circle at center, #F6FBE6 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, var(--ai-pulpa) 0deg 50deg, #A9CE54 50deg 60deg);
  }

  /* ---------- FILAS ---------- */
  body[data-tpl="x-aidita"] .ai-row{
    display:flex;gap:13px;align-items:center;padding:15px 0;
    border-bottom:2px dotted #FFCFB0;
  }
  body[data-tpl="x-aidita"] .ai-row:last-child{border-bottom:none;}
  body[data-tpl="x-aidita"] .ai-media{
    flex:0 0 auto;width:58px;height:58px;border-radius:50%;overflow:hidden;
    background:#FFF6EC;border:3px solid var(--ai-naranja);
    display:flex;align-items:center;justify-content:center;font-size:26px;
    box-shadow:0 5px 12px rgba(253,91,3,.28);
  }
  body[data-tpl="x-aidita"] .ai-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-aidita"] .ai-body{flex:1;min-width:0;}
  body[data-tpl="x-aidita"] .ai-nom{font-family:'Baloo 2',cursive;font-weight:700;font-size:15.5px;line-height:1.18;color:var(--ai-tinta);}
  body[data-tpl="x-aidita"] .ai-desc{
    font-weight:600;font-size:12.5px;color:#7B6A5B;line-height:1.35;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-aidita"] .ai-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
  body[data-tpl="x-aidita"] .ai-precio{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:15px;color:var(--ai-hondo);
    background:var(--ai-palido);border-radius:999px;padding:5px 13px;white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-aidita"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-aidita"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid var(--ai-hondo);cursor:pointer;
    background:var(--ai-naranja);color:#fff;font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;box-shadow:0 3px 0 var(--ai-hondo);
  }
  body[data-tpl="x-aidita"] [data-add]:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ai-hondo);}
  body[data-tpl="x-aidita"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:2px solid var(--ai-naranja);background:#fff;
    color:var(--ai-hondo);font-size:17px;font-weight:800;display:none;align-items:center;
    justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-aidita"] [data-cant]{
    display:none;font-family:'Baloo 2',cursive;font-weight:800;font-size:15px;
    color:var(--ai-tinta);min-width:18px;text-align:center;
  }
  body[data-tpl="x-aidita"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-aidita"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  /* buscador: ocultos + sin resultados */
  body[data-tpl="x-aidita"] .ai-hide{display:none !important;}
  body[data-tpl="x-aidita"] .ai-none{
    display:none;text-align:center;padding:34px 18px;font-family:'Baloo 2',cursive;
    font-weight:700;font-size:15.5px;color:#9C7B5F;
  }

  body[data-tpl="x-aidita"] .ai-fin{
    text-align:center;padding:30px 18px 6px;font-family:'Baloo 2',cursive;
    font-weight:800;font-size:16px;color:var(--ai-hondo);
  }

  /* carrito */
  body[data-tpl="x-aidita"] #cart-fab{
    background:var(--ai-naranja) !important;color:#fff !important;border:3px solid var(--ai-hondo) !important;
    border-radius:999px !important;font-family:'Baloo 2',cursive !important;font-weight:800 !important;
    box-shadow:0 5px 0 var(--ai-hondo), 0 16px 30px rgba(160,55,0,.4) !important;
  }
  body[data-tpl="x-aidita"] #cart-fab #fab-cant{background:#fff !important;color:var(--ai-naranja) !important;}
  body[data-tpl="x-aidita"] #cart h2{font-family:'Baloo 2',cursive;font-weight:800;color:var(--ai-tinta);}
  body[data-tpl="x-aidita"] #cart .cart-row .st-add{background:var(--ai-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-aidita"] .ai-gigante{font-size:44px;}
    body[data-tpl="x-aidita"] .ai-limon.l1{width:44px;height:44px;}
    body[data-tpl="x-aidita"] .ai-limon.l2{width:50px;height:50px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🦐"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="ai-row" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="ai-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="ai-body">
          <div class="ai-nom">${it.nombre}</div>
          ${it.desc ? `<div class="ai-desc">${it.desc}</div>` : ``}
          <div class="ai-foot"><span class="ai-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="ai-sec" id="cat-${slug(c.categoria)}">
        <h2 class="ai-cat"><span class="ai-mini"></span>${c.categoria}</h2>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    const partes = (R.nombre || "").trim().split(/\s+/);
    const arco = partes.length > 1 ? partes[0] : "Ceviches";
    const gigante = partes.length > 1 ? partes.slice(1).join(" ") : (R.nombre || "Aidita");
    const meta = [R.promo || "", R.direccion ? `📍 ${R.direccion.split("·")[0].trim()}` : ""].filter(Boolean);

    root.innerHTML = `
      <header class="ai-top">
        <div class="ai-limon l1"></div>
        <div class="ai-limon l2"></div>
        <div class="ai-limon l3"></div>
        ${R.logo ? `<div class="ai-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="ai-arco">${arco}</div>
        <h1 class="ai-gigante">${gigante}</h1>
        <div class="ai-slogan">${R.slogan || "Fresquito como el mar"}</div>
        <div class="ai-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      </header>
      <div class="ai-hoja">
        <div class="ai-search"><input id="ai-q" type="text" placeholder="Buscar ceviches, encebollados…"></div>
        <nav class="ai-nav">${nav}</nav>
        ${secciones}
        <p class="ai-none" id="ai-none">Nada por aquí… pruebe con otro antojo 🍋</p>
        <div class="ai-fin">🍋 ${R.slogan || "Fresquito como el mar"}</div>
      </div>`;

    /* buscador */
    const q = root.querySelector("#ai-q"), none = root.querySelector("#ai-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".ai-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".ai-row").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("ai-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("ai-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    const botones = [...root.querySelectorAll(".ai-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-80px 0px -75% 0px" });
      root.querySelectorAll(".ai-sec").forEach((s) => io.observe(s));
    }
  },
};
