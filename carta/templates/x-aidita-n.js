/* x-aidita-n — "Ceviches Aidita de Noche" — plantilla EXCLUSIVA de Ceviches Aidita.
   La identidad "Costa Fresca" en tono invertido: la tinta café del logo vuelta
   noche cerrada, hero grande de apertura (rodajas de limón que brillan, logo con
   aro naranja, CEVICHES/AIDITA gigante) y el mar oscuro que sube con la misma
   ola gorda. Carta en una columna de tarjetas horizontales con la media
   redondeada a la izquierda y el precio + stepper naranja a la derecha. */
window.TEMPLATES = window.TEMPLATES || {};
window.TEMPLATES["x-aidita-n"] = {
  label: "Ceviches Aidita de Noche",
  unaCategoria: false,
  css: `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600;1,700&display=swap');

  body[data-tpl="x-aidita-n"]{
    --ai-naranja:#FD5B03; --ai-brasa:#7E2900; --ai-limon:#8FBF2F; --ai-pulpa:#EAF6C8;
    --an-noche:#1C0D02; --an-mar:#33190A; --an-carta:#3B200C; --an-borde:#5A3315;
    --an-crema:#FFE9D8;
    background:#1C0D02;
    background-image:linear-gradient(180deg,#2A1505 0%,#1C0D02 48%,#140902 100%);
    color:var(--an-crema); font-family:'Nunito',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
    padding-bottom:124px;
  }
  body[data-tpl="x-aidita-n"] #app{overflow-x:hidden;}

  /* ---------- HERO NOCTURNO ---------- */
  body[data-tpl="x-aidita-n"] .an-hero{
    position:relative;text-align:center;min-height:min(50vh,420px);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:calc(26px + env(safe-area-inset-top)) 18px 44px;
  }
  body[data-tpl="x-aidita-n"] .an-logo{
    position:relative;z-index:1;width:96px;height:96px;border-radius:50%;overflow:hidden;
    margin:0 auto 12px;border:3px solid var(--ai-naranja);background:#fff;
    box-shadow:0 0 0 6px rgba(253,91,3,.16), 0 14px 34px rgba(0,0,0,.5);
  }
  body[data-tpl="x-aidita-n"] .an-logo img{width:100%;height:100%;object-fit:cover;}
  body[data-tpl="x-aidita-n"] .an-arco{
    position:relative;z-index:1;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:14px;letter-spacing:.44em;text-indent:.44em;color:rgba(255,233,216,.85);
    text-transform:uppercase;
  }
  body[data-tpl="x-aidita-n"] .an-gigante{
    position:relative;z-index:1;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:clamp(44px,16vw,72px);line-height:.98;color:var(--ai-naranja);text-transform:uppercase;
    letter-spacing:.01em;text-shadow:0 5px 0 rgba(0,0,0,.45);margin-top:2px;
  }
  body[data-tpl="x-aidita-n"] .an-slogan{
    position:relative;z-index:1;font-style:italic;font-weight:700;font-size:15.5px;
    color:var(--an-crema);margin-top:8px;
  }
  body[data-tpl="x-aidita-n"] .an-meta{
    position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px;
  }
  body[data-tpl="x-aidita-n"] .an-meta span{
    font-weight:800;font-size:12px;color:#FFCFA8;background:rgba(253,91,3,.14);
    border:1.5px solid rgba(253,91,3,.5);border-radius:999px;padding:7px 13px;
  }

  /* rodajas de limón que brillan en la noche (puro CSS) */
  body[data-tpl="x-aidita-n"] .an-limon{
    position:absolute;border-radius:50%;border:5px solid var(--ai-limon);z-index:0;
    background:
      radial-gradient(circle at center, #F6FBE6 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, var(--ai-pulpa) 0deg 50deg, #A9CE54 50deg 60deg);
    box-shadow:0 0 22px rgba(143,191,47,.3), 0 8px 16px rgba(0,0,0,.45);
  }
  body[data-tpl="x-aidita-n"] .an-limon.l1{width:54px;height:54px;left:14px;top:calc(38px + env(safe-area-inset-top));transform:rotate(-14deg);}
  body[data-tpl="x-aidita-n"] .an-limon.l2{width:64px;height:64px;right:10px;top:44%;transform:rotate(12deg);}

  /* ---------- EL MAR OSCURO QUE SUBE + OLA ---------- */
  body[data-tpl="x-aidita-n"] .an-mar{
    position:relative;background:var(--an-mar);border-radius:26px 26px 0 0;
    box-shadow:0 -10px 26px rgba(0,0,0,.5);padding-bottom:26px;
  }
  body[data-tpl="x-aidita-n"] .an-mar::before{
    content:"";position:absolute;left:22px;right:22px;top:-15px;height:16px;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='16' viewBox='0 0 64 16'%3E%3Cpath d='M0 16 L0 9 Q 16 -3 32 9 T 64 9 L64 16 Z' fill='%2333190A'/%3E%3C/svg%3E");
    background-repeat:repeat-x;background-size:64px 16px;
  }

  /* ---------- BUSCADOR ---------- */
  body[data-tpl="x-aidita-n"] .an-search{padding:20px 18px 4px;}
  body[data-tpl="x-aidita-n"] .an-search input{
    width:100%;border:2px solid var(--an-borde);background:#2A1505;border-radius:14px;
    padding:12px 16px;font-family:'Nunito',sans-serif;font-weight:600;font-size:15.5px;
    color:var(--an-crema);outline:none;
  }
  body[data-tpl="x-aidita-n"] .an-search input:focus{border-color:var(--ai-naranja);}
  body[data-tpl="x-aidita-n"] .an-search input::placeholder{color:rgba(255,233,216,.42);}

  /* ---------- NAV CHIPS STICKY (estilo nocturno) ---------- */
  body[data-tpl="x-aidita-n"] .an-nav{
    position:sticky;top:0;z-index:30;display:flex;gap:8px;overflow-x:auto;
    padding:12px 18px;scrollbar-width:none;background:rgba(40,20,6,.96);
    backdrop-filter:blur(6px);border-bottom:2px solid var(--an-borde);
  }
  body[data-tpl="x-aidita-n"] .an-nav::-webkit-scrollbar{display:none;}
  body[data-tpl="x-aidita-n"] .an-nav button{
    flex:0 0 auto;font-family:'Baloo 2',cursive;font-weight:700;font-size:13.5px;
    color:#FFC9A2;background:#241103;border:2px solid var(--ai-naranja);
    border-radius:999px;padding:8px 15px;cursor:pointer;white-space:nowrap;
  }
  body[data-tpl="x-aidita-n"] .an-nav button.activa{
    background:var(--ai-naranja);border-color:var(--ai-brasa);color:#241203;
    box-shadow:0 3px 0 var(--ai-brasa);
  }

  /* ---------- SECCIONES ---------- */
  body[data-tpl="x-aidita-n"] .an-sec{padding:0 16px;scroll-margin-top:74px;}
  body[data-tpl="x-aidita-n"] .an-cat{
    display:flex;align-items:center;gap:9px;font-family:'Baloo 2',cursive;font-weight:800;
    font-size:20px;color:#FFDFC4;margin:24px 0 12px;
  }
  body[data-tpl="x-aidita-n"] .an-cat::after{
    content:"";flex:1;height:0;border-top:2px dotted rgba(253,91,3,.45);margin-left:2px;
  }
  body[data-tpl="x-aidita-n"] .an-mini{
    flex:0 0 auto;width:19px;height:19px;border-radius:50%;border:3px solid var(--ai-limon);
    background:
      radial-gradient(circle at center, #F6FBE6 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, var(--ai-pulpa) 0deg 50deg, #A9CE54 50deg 60deg);
    box-shadow:0 0 10px rgba(143,191,47,.35);
  }

  /* ---------- TARJETAS HORIZONTALES ---------- */
  body[data-tpl="x-aidita-n"] .an-row{
    display:flex;gap:12px;align-items:center;
    background:var(--an-carta);border:1.5px solid var(--an-borde);border-radius:18px;
    padding:11px 12px;margin-bottom:11px;box-shadow:0 6px 16px rgba(0,0,0,.35);
  }
  body[data-tpl="x-aidita-n"] .an-media{
    flex:0 0 auto;width:76px;height:76px;border-radius:16px;overflow:hidden;
    display:flex;align-items:center;justify-content:center;font-size:34px;
    border:2px solid rgba(253,91,3,.4);background:#2A1505;
  }
  body[data-tpl="x-aidita-n"] .an-media img{width:100%;height:100%;object-fit:cover;}
  /* rodaja de limón apagada detrás del emoji */
  body[data-tpl="x-aidita-n"] .an-media.sin-foto{
    border-color:rgba(143,191,47,.45);
    background:
      radial-gradient(circle at center, rgba(246,251,230,.14) 0 24%, rgba(0,0,0,0) 25%),
      repeating-conic-gradient(from 8deg, rgba(234,246,200,.1) 0deg 50deg, rgba(143,191,47,.22) 50deg 60deg),
      linear-gradient(160deg,#3A2110,#241103);
  }
  body[data-tpl="x-aidita-n"] .an-body{flex:1;min-width:0;}
  body[data-tpl="x-aidita-n"] .an-nom{font-family:'Baloo 2',cursive;font-weight:700;font-size:15.5px;line-height:1.2;color:var(--an-crema);}
  body[data-tpl="x-aidita-n"] .an-desc{
    font-weight:600;font-size:12.5px;color:rgba(255,233,216,.62);line-height:1.35;margin-top:3px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  }
  body[data-tpl="x-aidita-n"] .an-der{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
  body[data-tpl="x-aidita-n"] .an-precio{
    font-family:'Baloo 2',cursive;font-weight:800;font-size:14.5px;color:#FFCF9E;
    background:#4A2410;border-radius:999px;padding:5px 12px;white-space:nowrap;
  }

  /* steppers */
  body[data-tpl="x-aidita-n"] [data-qtywrap]{display:inline-flex;align-items:center;gap:6px;}
  body[data-tpl="x-aidita-n"] [data-add]{
    width:36px;height:36px;border-radius:50%;border:2px solid var(--ai-brasa);cursor:pointer;
    background:var(--ai-naranja);color:#fff;font-size:20px;font-weight:800;
    display:inline-flex;align-items:center;justify-content:center;
    box-shadow:0 3px 0 var(--ai-brasa), 0 0 18px rgba(253,91,3,.3);
  }
  body[data-tpl="x-aidita-n"] [data-add]:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ai-brasa);}
  body[data-tpl="x-aidita-n"] [data-sub]{
    width:31px;height:31px;border-radius:50%;border:2px solid rgba(253,91,3,.55);background:transparent;
    color:#FFC9A2;font-size:17px;font-weight:800;display:none;align-items:center;
    justify-content:center;cursor:pointer;
  }
  body[data-tpl="x-aidita-n"] [data-cant]{
    display:none;font-family:'Baloo 2',cursive;font-weight:800;font-size:15px;
    color:var(--an-crema);min-width:18px;text-align:center;
  }
  body[data-tpl="x-aidita-n"] [data-qtywrap].has-qty [data-sub]{display:inline-flex;}
  body[data-tpl="x-aidita-n"] [data-qtywrap].has-qty [data-cant]{display:inline-block;}

  /* buscador: ocultos + sin resultados */
  body[data-tpl="x-aidita-n"] .an-hide{display:none !important;}
  body[data-tpl="x-aidita-n"] .an-none{
    display:none;text-align:center;padding:34px 18px;font-family:'Baloo 2',cursive;
    font-weight:700;font-size:15.5px;color:rgba(255,233,216,.6);
  }

  body[data-tpl="x-aidita-n"] .an-fin{
    text-align:center;padding:30px 18px 6px;font-family:'Baloo 2',cursive;
    font-weight:800;font-size:16px;color:var(--ai-limon);
  }

  /* carrito */
  body[data-tpl="x-aidita-n"] #cart-fab{
    background:var(--ai-naranja) !important;color:#fff !important;border:3px solid var(--ai-brasa) !important;
    border-radius:999px !important;font-family:'Baloo 2',cursive !important;font-weight:800 !important;
    box-shadow:0 5px 0 var(--ai-brasa), 0 16px 30px rgba(0,0,0,.55) !important;
  }
  body[data-tpl="x-aidita-n"] #cart-fab #fab-cant{background:#fff !important;color:var(--ai-naranja) !important;}
  body[data-tpl="x-aidita-n"] #cart h2{font-family:'Baloo 2',cursive;font-weight:800;color:#2A1607;}
  body[data-tpl="x-aidita-n"] #cart .cart-row .st-add{background:var(--ai-naranja) !important;color:#fff !important;}

  @media(max-width:380px){
    body[data-tpl="x-aidita-n"] .an-gigante{font-size:40px;}
    body[data-tpl="x-aidita-n"] .an-logo{width:84px;height:84px;}
    body[data-tpl="x-aidita-n"] .an-limon.l1{width:44px;height:44px;}
    body[data-tpl="x-aidita-n"] .an-limon.l2{width:50px;height:50px;}
    body[data-tpl="x-aidita-n"] .an-media{width:66px;height:66px;font-size:30px;}
  }
  `,
  render(R, root, ctrl, slug) {
    const emo = (it, cat) => it.emoji || (window.emojiPara ? window.emojiPara(it.nombre, cat, R.emojiDefault) : (R.emojiDefault || "🦐"));
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const cats = R.menu || [];

    const fila = (it, cat) => `
      <article class="an-row" data-n="${norm(it.nombre + " " + (it.desc || ""))}">
        <div class="an-media${it.foto ? "" : " sin-foto"}" data-media>${it.foto ? `<img src="${it.foto}" alt="">` : emo(it, cat)}</div>
        <div class="an-body">
          <div class="an-nom">${it.nombre}</div>
          ${it.desc ? `<div class="an-desc">${it.desc}</div>` : ``}
        </div>
        <div class="an-der">
          <span class="an-precio">$${Number(it.precio).toFixed(2)}</span>
          ${ctrl(it.id)}
        </div>
      </article>`;

    const secciones = cats.map((c) => `
      <section class="an-sec" id="cat-${slug(c.categoria)}">
        <h2 class="an-cat"><span class="an-mini"></span>${c.categoria}</h2>
        ${(c.items || []).map((it) => fila(it, c.categoria)).join("")}
      </section>`).join("");

    const nav = cats.map((c, i) => `<button data-cat="${slug(c.categoria)}" class="${i === 0 ? "activa" : ""}">${c.categoria}</button>`).join("");

    const partes = (R.nombre || "").trim().split(/\s+/);
    const arco = partes.length > 1 ? partes[0] : "Ceviches";
    const gigante = partes.length > 1 ? partes.slice(1).join(" ") : (R.nombre || "Aidita");
    const meta = [R.promo || "", R.direccion ? `📍 ${R.direccion.split("·")[0].trim()}` : ""].filter(Boolean);

    root.innerHTML = `
      <header class="an-hero">
        <div class="an-limon l1"></div>
        <div class="an-limon l2"></div>
        ${R.logo ? `<div class="an-logo"><img src="${R.logo}" alt="${R.nombre}"></div>` : ``}
        <div class="an-arco">${arco}</div>
        <h1 class="an-gigante">${gigante}</h1>
        <div class="an-slogan">${R.slogan || "Fresquito como el mar"}</div>
        <div class="an-meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
      </header>
      <div class="an-mar">
        <div class="an-search"><input id="an-q" type="text" placeholder="Buscar ceviches, encebollados…"></div>
        <nav class="an-nav">${nav}</nav>
        ${secciones}
        <p class="an-none" id="an-none">Nada por aquí… pruebe con otro antojo 🌙</p>
        <div class="an-fin">🌙 ${R.slogan || "Fresquito como el mar"}</div>
      </div>`;

    /* buscador */
    const q = root.querySelector("#an-q"), none = root.querySelector("#an-none");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      let total = 0;
      root.querySelectorAll(".an-sec").forEach((sec) => {
        let any = false;
        sec.querySelectorAll(".an-row").forEach((it) => {
          const m = !v || it.dataset.n.includes(v);
          it.classList.toggle("an-hide", !m);
          if (m) { any = true; total++; }
        });
        sec.classList.toggle("an-hide", !any);
      });
      none.style.display = (v && !total) ? "block" : "none";
    });

    /* chip activo al scrollear */
    const botones = [...root.querySelectorAll(".an-nav button")];
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace("cat-", "");
        botones.forEach((b) => { const on = b.dataset.cat === id; b.classList.toggle("activa", on); if (on) b.scrollIntoView({ inline: "center", block: "nearest" }); });
      }), { rootMargin: "-80px 0px -75% 0px" });
      root.querySelectorAll(".an-sec").forEach((s) => io.observe(s));
    }
  },
};
