/* ============================================================
   opciones-demo.js — «Arme su copa»: antes de agregar un plato, el cliente elige sus opciones
   (frutas, toppings, helado, salsas…), como en las apps grandes. Hecho para Prinfresa (21-oct-2026,
   David: «tiene opciones para escoger, 3 frutas, 2 toppings… que se vea cómo se escoge»), sirve para cualquier local.
   Va DESPUÉS de engine.js. Se activa SOLO con los platos que traen `opciones` en su config:
     opciones: [{ min: 3, max: 3, nombre: "frutas", uno: "fruta", lista: ["Fresa", …] }, …]
     min 0 = opcional («¿Con gelatina?»); max 1 = se elige una (círculo); más = casillas con contador.
   Usa del motor: R, buscar, agregarConOpciones. Lo elegido viaja en opcionesLinea (carrito, WhatsApp,
   pago-demo.js → confirmación, panel del local y seguimiento).
   ============================================================ */
(function () {
  if (typeof R === "undefined" || typeof agregarConOpciones !== "function") return;
  const conOpciones = (it) => !!(it && Array.isArray(it.opciones) && it.opciones.length);
  if (!(R.menu || []).some((c) => (c.items || []).some(conOpciones))) return;

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $$ = (n) => "$" + Number(n).toFixed(2);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const titulo = (g) => g.titulo || (g.max === 1 ? `Elija su ${g.uno}` : `Elija ${g.max} ${g.nombre}`);

  const css = document.createElement("style");
  css.textContent = `
  .opx-velo{position:fixed;inset:0;z-index:85;background:rgba(15,23,42,.5);display:flex;align-items:flex-end;justify-content:center;animation:opxf .2s ease-out;}
  @keyframes opxf{from{opacity:0}to{opacity:1}}
  @keyframes opxs{from{transform:translateY(50px);opacity:.5}to{transform:none;opacity:1}}
  @keyframes opxsac{0%,100%{transform:none}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
  .opx-hoja{position:relative;width:100%;max-width:520px;max-height:93vh;background:#fff;border-radius:22px 22px 0 0;display:flex;flex-direction:column;overflow:hidden;
    font-family:'Inter',-apple-system,"Segoe UI",Roboto,system-ui,sans-serif;color:var(--tinta,#0F172A);animation:opxs .26s ease-out;}
  .opx-cuerpo{position:relative;flex:1;overflow-y:auto;overscroll-behavior:contain;scroll-behavior:smooth;}
  .opx-x{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:none;background:#fff;box-shadow:0 2px 10px rgba(15,23,42,.18);
    display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:3;color:#334155;}
  .opx-x svg{width:18px;height:18px;}
  .opx-foto{background:var(--crema,#F7F7F5);height:190px;display:flex;align-items:center;justify-content:center;}
  .opx-foto img{height:100%;width:auto;max-width:100%;object-fit:contain;}
  .opx-cab{padding:14px 18px 10px;}
  .opx-cab h3{font-size:21px;font-weight:800;letter-spacing:-.01em;padding-right:40px;}
  .opx-cab p{font-size:13.5px;color:#64748B;margin-top:4px;line-height:1.45;}
  .opx-cab b{display:block;font-size:16px;margin-top:8px;}
  .opx-gt{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:10px;background:#F4F5F7;padding:10px 62px 10px 18px;}
  .opx-gt b{display:block;font-size:15.5px;font-weight:800;}
  .opx-gt small{display:block;font-size:12.5px;color:#64748B;margin-top:1px;}
  .opx-est{font-size:11.5px;font-weight:800;border-radius:999px;padding:4px 10px;background:#E2E8F0;color:#334155;white-space:nowrap;}
  .opx-est.ok{background:#DCFCE7;color:#166534;}
  .opx-est.opc{background:transparent;color:#64748B;font-weight:600;padding-right:0;}
  .opx-g.sacude .opx-est{animation:opxsac .35s;background:#FEF3C7;color:#92400E;}
  .opx-o{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;border:none;border-bottom:1px solid #EEF0F3;background:#fff;
    padding:13px 18px;font-family:inherit;font-size:15px;color:inherit;text-align:left;cursor:pointer;transition:background .15s;}
  .opx-o i{width:22px;height:22px;border:2px solid #CBD5E1;border-radius:6px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;transition:background .12s,border-color .12s;}
  .opx-o i.rd{border-radius:50%;}
  .opx-o.on{font-weight:600;}
  .opx-o.on i{background:var(--marca);border-color:var(--marca);}
  .opx-o.on i:after{content:"";width:6px;height:11px;border:solid #fff;border-width:0 2.5px 2.5px 0;transform:translate(0,-1px) rotate(45deg);}
  .opx-o.on i.rd:after{width:8px;height:8px;border:none;border-radius:50%;background:#fff;transform:none;}
  .opx-o.lleno{color:#A0AEC0;cursor:default;}
  .opx-o.lleno i{border-color:#E2E8F0;}
  .opx-o.toque{background:#FFF1F4;}
  .opx-pie{flex:0 0 auto;border-top:1px solid #EEF0F3;padding:9px 16px 14px;background:#fff;}
  .opx-falta{font-size:12.5px;color:#B45309;font-weight:600;text-align:center;min-height:17px;margin-bottom:8px;}
  .opx-falta.ok{color:#15803D;}
  .opx-fila{display:flex;gap:10px;align-items:center;}
  .opx-cant{display:flex;align-items:center;gap:4px;border:1.5px solid #E2E8F0;border-radius:14px;padding:4px;}
  .opx-cant button{width:36px;height:36px;border:none;background:#F1F5F9;border-radius:10px;font-size:20px;font-weight:700;cursor:pointer;color:var(--marca);font-family:inherit;line-height:1;}
  .opx-cant b{min-width:22px;text-align:center;font-size:16px;}
  .opx-btn{flex:1;height:50px;border:none;border-radius:14px;background:var(--marca);color:#fff;font-family:inherit;font-size:16px;font-weight:800;cursor:pointer;
    display:flex;justify-content:space-between;align-items:center;padding:0 18px;transition:background .2s;}
  .opx-btn:disabled{background:#E2E8F0;color:#94A3B8;cursor:default;}
  .opx-toast{position:fixed;left:50%;bottom:96px;transform:translateX(-50%);background:#0F172A;color:#fff;font:600 14px 'Inter',sans-serif;border-radius:999px;
    padding:10px 16px;z-index:90;animation:opxf .2s ease-out;box-shadow:0 10px 24px rgba(0,0,0,.25);white-space:nowrap;}
  .cart-row-op{font-size:12px;color:#64748B;line-height:1.35;margin:2px 0 1px;}
  `;
  document.head.appendChild(css);

  /* lo elegido, en texto: «Helado: Chicle · Frutas: Fresa, Uvas, Mango · Toppings: M&M, Gomitas, Grageas» */
  function resumen(it, sel) {
    const lineas = it.opciones.map((g, gi) => {
      const el = sel[gi].map((oi) => g.lista[oi]);
      if (!el.length) return null;
      if (g.min === 0 && g.max === 1) return el[0];                    // «Con gelatina»
      return `${cap(el.length === 1 ? g.uno : g.nombre)}: ${el.join(", ")}`;
    }).filter(Boolean);
    return { texto: lineas.join(" · "), lineas };
  }
  const falta = (it, sel) => {
    const gi = it.opciones.findIndex((g, k) => sel[k].length < g.min);
    return gi < 0 ? null : { gi, n: it.opciones[gi].min - sel[gi].length };
  };

  function toast(msg) {
    const t = document.createElement("div"); t.className = "opx-toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 1800);
  }

  function abrir(it) {
    const sel = it.opciones.map(() => []);
    let cant = 1;
    const v = document.createElement("div");
    v.className = "opx-velo";
    v.innerHTML = `<div class="opx-hoja" role="dialog" aria-label="Arme su ${esc(it.nombre)}">
      <button class="opx-x" aria-label="cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="opx-cuerpo">
        ${it.foto ? `<div class="opx-foto"><img src="${esc(it.foto)}" alt="${esc(it.nombre)}"></div>` : ""}
        <div class="opx-cab"><h3>${esc(it.nombre)}</h3>${it.desc ? `<p>${esc(it.desc)}</p>` : ""}<b>${$$(it.precio)}</b></div>
        ${it.opciones.map((g, gi) => `
        <section class="opx-g" data-g="${gi}">
          <div class="opx-gt"><div><b>${esc(titulo(g))}</b><small>${g.min === 0 ? "Opcional · sin costo" : "Obligatorio"}</small></div><span class="opx-est"></span></div>
          ${g.lista.map((o, oi) => `<button type="button" class="opx-o" data-g="${gi}" data-o="${oi}"><span>${esc(o)}</span><i class="${g.max === 1 ? "rd" : ""}"></i></button>`).join("")}
        </section>`).join("")}
      </div>
      <div class="opx-pie"><div class="opx-falta"></div>
        <div class="opx-fila"><span class="opx-cant"><button type="button" data-cant-op="-1" aria-label="menos">−</button><b>1</b><button type="button" data-cant-op="1" aria-label="más">+</button></span>
          <button type="button" class="opx-btn" disabled></button></div></div>
    </div>`;
    document.body.appendChild(v);
    const hoja = v.querySelector(".opx-hoja"), cuerpo = v.querySelector(".opx-cuerpo");

    function pintar() {
      it.opciones.forEach((g, gi) => {
        const n = sel[gi].length, sec = v.querySelector(`.opx-g[data-g="${gi}"]`), est = sec.querySelector(".opx-est");
        if (g.min === 0) { est.className = "opx-est opc"; est.textContent = n ? "Sí" : "No"; }
        else if (n >= g.min) { est.className = "opx-est ok"; est.textContent = "✓ Listo"; }
        else { est.className = "opx-est"; est.textContent = `${n} de ${g.max}`; }
        sec.querySelectorAll(".opx-o").forEach((b) => {
          const on = sel[gi].includes(+b.dataset.o);
          b.classList.toggle("on", on);
          b.classList.toggle("lleno", !on && g.max > 1 && n >= g.max);
        });
      });
      const f = falta(it, sel), g = f && it.opciones[f.gi];
      const fa = v.querySelector(".opx-falta");
      fa.className = "opx-falta" + (f ? "" : " ok");
      fa.textContent = f ? `Elija ${f.n} ${f.n === 1 ? g.uno : g.nombre} más` : `¡Listo! Su ${it.nombre} va así.`;
      v.querySelector(".opx-cant b").textContent = cant;
      const btn = v.querySelector(".opx-btn");
      btn.disabled = !!f;
      btn.innerHTML = `<span>Agregar ${cant}</span><span>${$$(it.precio * cant)}</span>`;
    }
    function elegir(gi, oi) {
      const g = it.opciones[gi], s = sel[gi], k = s.indexOf(oi), antes = s.length;
      if (k >= 0) { if (!(g.max === 1 && g.min === 1)) s.splice(k, 1); }
      else if (g.max === 1) { s.splice(0, s.length, oi); }
      else if (s.length < g.max) s.push(oi);
      else { const sec = v.querySelector(`.opx-g[data-g="${gi}"]`); sec.classList.remove("sacude"); void sec.offsetWidth; sec.classList.add("sacude"); setTimeout(() => sec.classList.remove("sacude"), 700); return; }
      pintar();
      // grupo recién completo → baja solo al siguiente que falta (como Rappi o PedidosYa)
      if (g.min > 0 && antes < g.min && s.length >= g.min) {
        const f = falta(it, sel);
        if (f && f.gi > gi) setTimeout(() => { const sec = v.querySelector(`.opx-g[data-g="${f.gi}"]`); cuerpo.scrollTo({ top: sec.offsetTop - 4, behavior: "smooth" }); }, 280);
      }
    }
    function cerrar() { v.remove(); document.removeEventListener("keydown", tecla); }
    function tecla(e) { if (e.key === "Escape") cerrar(); }
    document.addEventListener("keydown", tecla);
    v.addEventListener("click", (e) => {
      if (e.target === v || e.target.closest(".opx-x")) { cerrar(); return; }
      const o = e.target.closest(".opx-o");
      if (o) { elegir(+o.dataset.g, +o.dataset.o); return; }
      const c = e.target.closest("[data-cant-op]");
      if (c) { cant = Math.max(1, Math.min(20, cant + +c.dataset.cantOp)); pintar(); return; }
      if (e.target.closest(".opx-btn") && !falta(it, sel)) {
        agregarConOpciones(it.id, cant, resumen(it, sel));
        cerrar();
        toast(`Agregado: ${cant}× ${it.nombre}`);
      }
    });
    pintar();
    return { hoja, elegir, sel };
  }

  /* «+» de un plato con opciones: primero se arma; el «+» de una línea del carrito suma la misma combinación */
  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest("[data-add]");
    if (!b || String(b.dataset.add).includes("~")) return;
    const it = buscar(b.dataset.add);
    if (!conOpciones(it)) return;
    e.stopPropagation(); e.preventDefault();
    abrir(it);
  }, true);

  window.OpcionesDemo = { abrir: (pid) => { const it = buscar(pid); return conOpciones(it) ? abrir(it) : null; } };
})();
