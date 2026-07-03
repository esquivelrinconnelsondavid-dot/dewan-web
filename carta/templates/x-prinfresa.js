/* x-prinfresa — "La reina de la fresa" — plantilla EXCLUSIVA de Prinfresa.
   Rosa palidísimo con patrón de semillas, corona dorada, script rosa y una
   franja de crema que gotea del header: postres con trato de realeza. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-prinfresa"] = {
  label: "La reina de la fresa",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@500;600;700&display=swap');

  body[data-tpl="x-prinfresa"]{
    --pf-rosa:#E43C62; --pf-rosa-honda:#D62E55; --pf-rosa-borde:#C22548;
    --pf-palido:#FFF2F6; --pf-verde:#067D31; --pf-oro:#E8A916; --pf-tinta:#3D1F2A;
    background:#FFF7FA;
    /* semillas: dos capas de puntitos con offset a la mitad = retícula a 45° */
    background-image:
      radial-gradient(rgba(228,60,98,.12) 1.6px, transparent 2.1px),
      radial-gradient(rgba(228,60,98,.12) 1.6px, transparent 2.1px);
    background-size:22px 22px, 22px 22px;
    background-position:0 0, 11px 11px;
    color:var(--pf-tinta); font-family:'Quicksand',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-prinfresa"] #app{overflow-x:hidden;}

  /* ---------- HEADER CREMA (blanco, centrado, coronado) ---------- */
  body[data-tpl="x-prinfresa"] .pf-top{
    background:#fff;text-align:center;
    padding:calc(26px + env(safe-area-inset-top)) 18px 16px;
  }
  body[data-tpl="x-prinfresa"] .pf-emblema{position:relative;display:inline-block;margin-top:8px;}
  body[data-tpl="x-prinfresa"] .pf-logo{
    width:86px;height:86px;border-radius:50%;overflow:hidden;background:#fff;
    border:3px solid var(--pf-oro);box-shadow:0 8px 20px rgba(228,60,98,.22);
  }
  body[data-tpl="x-prinfresa"] .pf-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-prinfresa"] .pf-corona{
    position:absolute;top:-19px;left:50%;transform:translateX(-50%) rotate(-8deg);
    font-size:26px;line-height:1;color:var(--pf-oro);text-shadow:0 2px 0 rgba(184,124,10,.3);
  }
  body[data-tpl="x-prinfresa"] .pf-corona-solo{
    font-size:36px;line-height:1;color:var(--pf-oro);text-shadow:0 2px 0 rgba(184,124,10,.3);
  }
  body[data-tpl="x-prinfresa"] .pf-tit{
    font-family:'Pacifico',cursive;font-weight:400;font-size:40px;line-height:1.15;
    color:var(--pf-rosa);margin-top:10px;
  }
  body[data-tpl="x-prinfresa"] .pf-slogan{
    font-variant:small-caps;letter-spacing:.24em;font-weight:700;font-size:13px;
    color:var(--pf-verde);margin-top:2px;
  }
  body[data-tpl="x-prinfresa"] .pf-meta{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:13px;}
  body[data-tpl="x-prinfresa"] .pf-meta span{
    font-weight:700;font-size:11.5px;color:#7A4A58;background:var(--pf-palido);
    border:1.5px solid #F5C6D3;border-radius:999px;padding:6px 12px;
  }

  /* franja de crema: festones blancos que gotean sobre el fondo rosado */
  body[data-tpl="x-prinfresa"] .pf-goteo{
    height:26px;margin-top:-1px;
    background-image:
      radial-gradient(circle at 50% 0, #fff 55%, rgba(255,255,255,0) 57%),
      radial-gradient(circle at 50% 4px, rgba(228,60,98,.18) 55%, rgba(228,60,98,0) 57%);
    background-size:34px 26px;
    background-repeat:repeat-x;
  }

  /* ---------- NAV PÍLDORAS CON HOJITAS ---------- */
  body[data-tpl="x-prinfresa"] .pf-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 16px;scrollbar-width:none;
    background:rgba(255,247,250,.95);backdrop-filter:blur(6px);
  }
  body[data-tpl="x-prinfresa"] .pf-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-prinfresa"] .pf-nav button{
    flex:0 0 auto;font-family:'Quicksand',sans-serif;font-weight:700;font-size:13px;
    color:var(--pf-rosa-borde);background:#fff;border:2px solid #F0A8BC;border-radius:999px;
    padding:9px 15px;cursor:pointer;white-space:nowrap;box-shadow:0 3px 10px rgba(228,60,98,.10);
  }
  body[data-tpl="x-prinfresa"] .pf-nav button::before{content:'🌿';font-size:11px;margin-right:5px;}
  body[data-tpl="x-prinfresa"] .pf-nav button.activa{
    background:var(--pf-rosa-honda);border-color:#B01F44;color:#fff;
    box-shadow:0 6px 14px rgba(214,46,85,.35);
  }
  body[data-tpl="x-prinfresa"] .pf-nav button.activa::before{content:'♛';color:#FFDF96;}

  /* ---------- SECCIONES: título script con guirnalda de semillas ---------- */
  body[data-tpl="x-prinfresa"] .pf-sec{padding:4px 16px 0;scroll-margin-top:70px;}
  body[data-tpl="x-prinfresa"] .pf-cat{display:flex;align-items:center;gap:12px;margin:22px 0 14px;}
  body[data-tpl="x-prinfresa"] .pf-cat::before,
  body[data-tpl="x-prinfresa"] .pf-cat::after{content:'';flex:1;border-top:3px dotted rgba(228,60,98,.45);}
  body[data-tpl="x-prinfresa"] .pf-cat span{
    font-family:'Pacifico',cursive;font-weight:400;font-size:21px;line-height:1.3;
    color:var(--pf-rosa-honda);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:78%;
  }

  /* ---------- TARJETAS: blancas, borde superior rosa→dorado ---------- */
  body[data-tpl="x-prinfresa"] .pf-card{
    position:relative;display:flex;gap:13px;align-items:center;background:#fff;
    border-radius:22px;padding:16px 14px 13px;margin-bottom:14px;overflow:hidden;
    box-shadow:0 8px 22px rgba(228,60,98,.12);
  }
  body[data-tpl="x-prinfresa"] .pf-card::before{
    content:'';position:absolute;top:0;left:0;right:0;height:5px;
    background:linear-gradient(90deg,var(--pf-rosa),var(--pf-oro));
  }
  body[data-tpl="x-prinfresa"] .pf-media{
    flex:0 0 auto;width:62px;height:62px;border-radius:50%;overflow:hidden;
    background:var(--pf-palido);border:3px dotted var(--pf-rosa);
    display:flex;align-items:center;justify-content:center;font-size:27px;
  }
  body[data-tpl="x-prinfresa"] .pf-media img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
  body[data-tpl="x-prinfresa"] .pf-body{flex:1;min-width:0;}
  body[data-tpl="x-prinfresa"] .pf-nom{font-weight:700;font-size:15px;line-height:1.25;color:var(--pf-tinta);}
  body[data-tpl="x-prinfresa"] .pf-desc{
    font-weight:500;font-size:12.5px;color:#8A6570;line-height:1.35;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-prinfresa"] .pf-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:9px;}
  body[data-tpl="x-prinfresa"] .pf-precio{
    display:inline-flex;align-items:center;gap:5px;white-space:nowrap;
    font-weight:800;font-size:14px;color:#8A5B00;background:#FFF6DF;
    border:1.5px solid #F2D9A0;border-radius:999px;padding:5px 12px;
  }
  body[data-tpl="x-prinfresa"] .pf-precio::before{content:'♛';font-size:11px;color:var(--pf-oro);}

  /* steppers rosa */
  body[data-tpl="x-prinfresa"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-prinfresa"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid var(--pf-rosa-borde);cursor:pointer;
    background:var(--pf-rosa);color:#fff;font-size:21px;font-weight:700;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 5px 12px rgba(228,60,98,.35);
  }
  body[data-tpl="x-prinfresa"] [data-add]:active{transform:scale(.92);}
  body[data-tpl="x-prinfresa"] [data-sub]{
    width:30px;height:30px;border-radius:50%;border:2px solid var(--pf-rosa);background:#fff;
    color:var(--pf-rosa-borde);font-size:17px;font-weight:700;cursor:pointer;
    display:none;align-items:center;justify-content:center;
    box-shadow:0 3px 8px rgba(228,60,98,.18);
  }
  body[data-tpl="x-prinfresa"] [data-cant]{
    display:none;font-weight:800;font-size:15px;color:var(--pf-tinta);min-width:18px;text-align:center;
  }
  body[data-tpl="x-prinfresa"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-prinfresa"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  body[data-tpl="x-prinfresa"] .pf-fin{
    text-align:center;padding:30px 16px 12px;font-family:'Pacifico',cursive;
    font-weight:400;font-size:16px;color:var(--pf-rosa-honda);
  }

  /* carrito */
  body[data-tpl="x-prinfresa"] #cart-fab{
    background:var(--pf-rosa) !important;color:#fff !important;
    border:2px solid var(--pf-rosa-borde) !important;border-radius:999px !important;
    font-family:'Quicksand',sans-serif !important;font-weight:800 !important;
    box-shadow:0 10px 24px rgba(228,60,98,.4) !important;
  }
  body[data-tpl="x-prinfresa"] #cart-fab #fab-cant{background:#fff !important;color:var(--pf-rosa) !important;}
  body[data-tpl="x-prinfresa"] #cart h2{font-family:'Pacifico',cursive;font-weight:400;color:var(--pf-rosa-honda);}
  body[data-tpl="x-prinfresa"] #cart .cart-row .st-add{background:var(--pf-rosa) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-prinfresa"] .pf-tit{font-size:33px;}
    body[data-tpl="x-prinfresa"] .pf-logo{width:72px;height:72px;}
    body[data-tpl="x-prinfresa"] .pf-cat span{font-size:19px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🍓"));
    const cats = R.menu || [];

    const card = (it, cat) => `
      <article class="pf-card">
        <div class="pf-media" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="pf-body">
          <div class="pf-nom">${it.nombre}</div>
          ${it.desc ? `<div class="pf-desc">${it.desc}</div>` : ``}
          <div class="pf-foot"><span class="pf-precio">$${Number(it.precio).toFixed(2)}</span>${ctrl(it.id)}</div>
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="pf-sec" id="cat-${slug(c.categoria)}">
        <div class="pf-cat"><span>${c.categoria}</span></div>
        ${(c.items || []).map((it) => card(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");
    const meta = (R.meta && R.meta.length ? R.meta : [R.promo || "", R.direccion || ""]).filter(Boolean);
    const emblema = R.logo
      ? `<div class="pf-emblema"><div class="pf-logo"><img src="${R.logo}" alt="${R.nombre}"></div><span class="pf-corona">♛</span></div>`
      : `<div class="pf-corona-solo">♛</div>`;
    const eslogan = R.slogan || "La reina de la fresa";

    root.innerHTML = `
      <header class="pf-top">
        ${emblema}
        <h1 class="pf-tit">${R.nombre}</h1>
        <div class="pf-slogan">${eslogan}</div>
        <div class="pf-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      </header>
      <div class="pf-goteo" aria-hidden="true"></div>
      <nav class="pf-nav">${nav}</nav>
      ${secciones}
      <div class="pf-fin">♛ ${R.nombre} · ${eslogan}</div>`;

    const botones = [...root.querySelectorAll(".pf-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-76px 0px -75% 0px" });
      root.querySelectorAll(".pf-sec").forEach((s) => io.observe(s));
    }
  },
};
