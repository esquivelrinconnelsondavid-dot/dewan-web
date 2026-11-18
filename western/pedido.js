/* ============================================================
   pedido.js — Western Pizzería · el pedido se queda EN LA PÁGINA (18-nov-2026).
   David: «no está calculando el precio del envío y manda el pedido a WhatsApp; el pedido se debe quedar allí mismo
   en la web, como siempre lo hemos mostrado en la presentación».
   Es la página de la presentación (pago-demo.js + envio-demo.js) pero de verdad:
   - «¿Cómo paga?»: efectivo o transferencia (Western no tiene pasarela conectada).
   - Envío: la tarifa de Western (R.envioFijo: $2,00 de EJEMPLO, la misma del bot · ⏳ la de Raúl). Con «Usar mi
     ubicación actual» se ve a cuántos km está, por calles (OSRM), del local de la Portugal (de ahí sale el domicilio).
   - «Confirmar pedido»: el pedido entra a la COCINA EN VIVO de Western (n8n wp-cocina-nuevo, la misma de los pedidos
     del bot) y la página muestra «Pedido recibido» con «Seguir mi pedido» (wp-pedido?t=…: el seguimiento en vivo).
   - Si la cocina no responde: «Intentar de nuevo» o «Enviarlo por WhatsApp» (como antes): el pedido no se pierde.
   Va DESPUÉS de engine.js y opciones.js. Intercepta el clic de #enviar en fase de captura (engine.js ya no abre WhatsApp).
   Usa las variables globales del motor: R, carrito, opcionesLinea, buscar, totalDinero, ubicacion, refrescar, cerrar.
   Fuente: Desktop/DEWAN-ventas-demos/_receta-presentacion/wp_pedido.js (wp_real.py la copia como pedido.js).
   ============================================================ */
(function () {
  "use strict";
  const N8N = "https://n8n.dewansas.com/webhook/";
  const ENVIO = Number(R.envioFijo) || 2;                // ⏳ tarifa de Western (hoy $2,00 de ejemplo, igual que el bot)
  const LOCALES = {                                     // los 4 locales (pines de la propuesta, wp_pdf_mapa.py)
    "Portugal": { la: -0.1829532, lo: -78.4761166, dir: "Av. Eloy Alfaro N34-397 y Portugal" },
    "Inglaterra": { la: -0.1862428, lo: -78.4889738, dir: "E3-106 y Av. República" },
    "La Pradera": { la: -0.1943619, lo: -78.4858651, dir: "Mariana de Jesús" },
    "Los Chillos": { la: -0.2975372, lo: -78.4597499, dir: "Geovanni Farina 430" },
  };
  const DESDE = LOCALES["Portugal"];                     // el domicilio sale del local de la Portugal (el del 098 492 4221)
  const GUARDADO = "wp_ultimo_pedido";

  const $ = (s, el) => (el || document).querySelector(s);
  const plata = (n) => "$" + Number(n || 0).toFixed(2);
  const r2 = (n) => Math.round(Number(n || 0) * 100) / 100;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const kmTxt = (n) => (Math.round(n * 10) / 10).toFixed(1).replace(".", ",") + " km";
  const hhmm = (ms) => new Date(ms).toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" });
  const nombreLocal = R.nombreLargo || R.nombre;
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="width:38px;height:38px"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const IC = {
    cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v.01M18 14.5v.01"/></svg>',
    bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>',
  };

  /* ---------- estilos (los de la página de la presentación) ---------- */
  const css = document.createElement("style");
  css.textContent = `
  .pd-tt{font-size:12px;font-weight:700;color:#777;text-transform:uppercase;letter-spacing:.03em;margin:2px 0 7px;}
  .pd-op{display:flex;align-items:center;gap:11px;background:#fff;border:1.5px solid #e2e0dc;border-radius:13px;padding:11px 12px;margin-bottom:8px;cursor:pointer;}
  .pd-op input{display:none;}
  .pd-op .pd-ic{width:38px;height:38px;border-radius:11px;background:#F6EEE8;color:var(--marca);display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .pd-op .pd-ic svg{width:21px;height:21px;}
  .pd-op b{display:block;font-size:15px;color:var(--tinta);}
  .pd-op small{display:block;font-size:12px;color:#8a8580;margin-top:1px;}
  .pd-op .pd-dot{margin-left:auto;width:20px;height:20px;border-radius:50%;border:2px solid #cfcac4;flex:0 0 auto;}
  .pd-op.on{border-color:var(--marca);box-shadow:0 0 0 3px rgba(181,83,26,.12);}
  .pd-op.on .pd-dot{border-color:var(--marca);background:radial-gradient(circle,var(--marca) 0 5px,#fff 6px);}
  .pd-op.on .pd-ic{background:var(--marca);color:#fff;}
  .cart-foot .cart-total{display:none !important;}
  #enviar{background:var(--marca) !important;color:#fff !important;}   /* ya no es «enviar por WhatsApp» (verde) */
  .pd-sum{background:#fff;border:1.5px solid #e2e0dc;border-radius:13px;padding:8px 12px;margin:4px 0 12px;}
  .pd-sum .r{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;font-size:14px;padding:4px 0;color:var(--tinta);}
  .pd-sum .r small{display:block;font-size:11.5px;color:#8a8580;font-weight:500;margin-top:1px;}
  .pd-sum .r.env{margin:0 -6px;padding:4px 6px;border-radius:8px;}
  .pd-sum .r.env.nuevo{animation:pdenv 1.6s ease-out;}
  @keyframes pdenv{0%,35%{background:#FEF3C7}100%{background:transparent}}
  .pd-sum .r.t{border-top:1.5px dashed #e2d8c8;margin-top:5px;padding-top:9px;font-weight:800;font-size:16.5px;}
  .pd-err{display:none;font-size:13px;line-height:1.4;color:#B91C1C;background:#FEF2F2;border-radius:10px;padding:8px 10px;margin:0 0 10px;}
  .pd-err.on{display:block;}
  .pd-mal{border-color:#dc2626 !important;}
  .pd-spin{width:18px;height:18px;border:3px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;display:inline-block;vertical-align:-4px;margin-right:8px;animation:pdg .8s linear infinite;}
  @keyframes pdg{to{transform:rotate(360deg)}}
  .pd-conf{position:fixed;inset:0;z-index:95;background:var(--crema,#fff);overflow-y:auto;display:flex;justify-content:center;}
  .pd-conf-in{width:100%;max-width:520px;padding:40px 20px 30px;font-family:'Inter',-apple-system,"Segoe UI",Roboto,system-ui,sans-serif;color:var(--tinta);text-align:center;}
  .pd-ok-c{width:74px;height:74px;border-radius:50%;background:#16a34a;display:flex;align-items:center;justify-content:center;margin:0 auto;animation:pdpop .35s ease-out;}
  .pd-ok-c.gris{background:#9CA3AF;}
  @keyframes pdpop{from{transform:scale(.5)}to{transform:scale(1)}}
  .pd-conf h2{font-size:26px;font-weight:800;letter-spacing:-.02em;margin-top:14px;}
  .pd-sub{color:#7A6656;margin-top:4px;}
  .pd-chip{display:inline-flex;align-items:center;gap:6px;font-weight:800;font-size:13.5px;border-radius:999px;padding:7px 13px;margin-top:12px;background:#FEF3C7;color:#92400E;}
  .pd-conf p.pd-txt{margin-top:14px;font-size:15px;line-height:1.45;}
  .pd-res{background:#fff;border:1.5px solid #ebe5da;border-radius:16px;padding:14px;margin:18px 0 16px;text-align:left;}
  .pd-res div{display:flex;justify-content:space-between;gap:10px;font-size:14.5px;padding:4px 0;}
  .pd-res p{font-size:12.5px;color:#7A6656;line-height:1.35;margin:-1px 0 5px;}
  .pd-res .env{color:#6b6560;}
  .pd-res .t{border-top:1.5px dashed #e2d8c8;margin-top:6px;padding-top:9px;font-weight:800;font-size:17px;}
  .pd-btn{font-family:inherit;width:100%;border:none;border-radius:14px;padding:16px;font-size:16.5px;font-weight:800;cursor:pointer;background:var(--marca);color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;}
  .pd-btn.sec{background:#f1efec;color:#333;margin-top:9px;}
  .pd-ultimo{display:flex;align-items:center;gap:10px;background:var(--tinta);color:#fff;padding:10px 14px;font:600 14px/1.3 'Inter',-apple-system,"Segoe UI",Roboto,system-ui,sans-serif;}
  .pd-ultimo span{flex:1;}
  .pd-ultimo a{flex:0 0 auto;background:#fff;color:var(--tinta);font-weight:800;text-decoration:none;border-radius:999px;padding:7px 12px;}
  .pd-ultimo button{flex:0 0 auto;background:none;border:none;color:#fff;font-size:20px;line-height:1;cursor:pointer;padding:0 2px;}
  `;
  document.head.appendChild(css);

  const btn = $("#enviar");
  const totalRow = $(".cart-foot .cart-total");
  const esDomicilio = () => $("#cli-entrega").value === "Delivery";

  /* ---------- «¿Cómo paga?» ---------- */
  let metodo = "efectivo";
  const box = document.createElement("div");
  function pintarPago() {
    const dom = esDomicilio();
    const OPS = [
      { v: "efectivo", ic: IC.cash, t: "Efectivo", s: dom ? "Paga al recibir su pedido" : "Paga al retirar su pedido" },
      { v: "transferencia", ic: IC.bank, t: "Transferencia", s: "Le enviamos los datos de la cuenta por WhatsApp" },
    ];
    box.innerHTML = `<div class="pd-tt">¿Cómo paga?</div>` + OPS.map((o) => `
      <label class="pd-op ${o.v === metodo ? "on" : ""}" data-pd="${o.v}">
        <input type="radio" name="pd-pago" value="${o.v}" ${o.v === metodo ? "checked" : ""}>
        <span class="pd-ic">${o.ic}</span><span><b>${o.t}</b><small>${o.s}</small></span><span class="pd-dot"></span>
      </label>`).join("");
  }
  pintarPago();
  totalRow.parentNode.insertBefore(box, totalRow);
  box.addEventListener("change", (e) => {
    if (e.target.name !== "pd-pago") return;
    metodo = e.target.value;
    box.querySelectorAll(".pd-op").forEach((l) => l.classList.toggle("on", l.dataset.pd === metodo));
  });

  /* ---------- subtotal, envío y total ---------- */
  let kmEnvio = null;                                   // km por calles desde el local (solo si compartió su ubicación)
  const envioActual = () => (esDomicilio() ? ENVIO : 0);
  const aPagar = () => r2(totalDinero() + envioActual());
  const suma = document.createElement("div");
  suma.className = "pd-sum";
  totalRow.parentNode.insertBefore(suma, totalRow);
  const err = document.createElement("div");
  err.className = "pd-err";
  btn.parentNode.insertBefore(err, btn);
  $("#cart").addEventListener("input", () => err.classList.remove("on"));
  function pintarSuma(resaltar) {
    let h = "";
    if (esDomicilio()) {
      h += `<div class="r"><span>Subtotal</span><span>${plata(totalDinero())}</span></div>`;
      h += `<div class="r env${resaltar ? " nuevo" : ""}"><span>Envío${kmEnvio != null ? " · " + kmTxt(kmEnvio) : ""}<small>${kmEnvio != null
        ? "Desde el local de la Portugal, por la ruta del motorizado" : "A domicilio en Quito"}</small></span><span>${plata(envioActual())}</span></div>`;
    }
    h += `<div class="r t"><span>Total</span><span>${plata(aPagar())}</span></div>`;
    suma.innerHTML = h;
  }
  function etiqueta() {
    pintarSuma();
    if (!enviando) btn.textContent = `Confirmar pedido · ${plata(aPagar())}`;
  }
  let enviando = false;
  new MutationObserver(() => etiqueta()).observe($("#cart-total"), { childList: true, characterData: true, subtree: true });
  $("#cli-entrega").addEventListener("change", () => { pintarPago(); etiqueta(); });
  etiqueta();

  /* «Usar mi ubicación actual» (engine.js pide el GPS): al llegar, la distancia por calles desde el local */
  function kmRecta(a, b) {
    const R0 = 6371, rad = (x) => (x * Math.PI) / 180;
    const dLa = rad(b.la - a.la), dLo = rad(b.lo - a.lo);
    const h = Math.sin(dLa / 2) ** 2 + Math.cos(rad(a.la)) * Math.cos(rad(b.la)) * Math.sin(dLo / 2) ** 2;
    return 2 * R0 * Math.asin(Math.sqrt(h));
  }
  function calcularKm() {
    if (typeof ubicacion === "undefined" || !ubicacion) return;
    const u = { la: Number(ubicacion.lat), lo: Number(ubicacion.lng) };
    const recta = kmRecta(DESDE, u) * 1.35;
    let ctl = null; try { ctl = new AbortController(); setTimeout(() => ctl.abort(), 6000); } catch (e) { ctl = null; }
    fetch(`https://router.project-osrm.org/route/v1/driving/${DESDE.lo},${DESDE.la};${u.lo},${u.la}?overview=false`, ctl ? { signal: ctl.signal } : {})
      .then((r) => r.json())
      .then((j) => { const m = j && j.routes && j.routes[0] && j.routes[0].distance; kmEnvio = m ? m / 1000 : recta; })
      .catch(() => { kmEnvio = recta; })
      .then(() => { pintarSuma(true); const ok = $("#ubic-ok"); if (ok) ok.textContent = "✓ Ubicación lista · a " + kmTxt(kmEnvio) + " del local"; });
  }
  const ubicOk = $("#ubic-ok");
  if (ubicOk) new MutationObserver(() => { if (!ubicOk.classList.contains("oculto") && kmEnvio == null) calcularKm(); })
    .observe(ubicOk, { attributes: true, attributeFilter: ["class"] });

  /* ---------- confirmar: el pedido va a la cocina de Western ---------- */
  function hex(n) {
    const a = new Uint8Array(n);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a); else for (let i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256);
    return Array.from(a, (b) => ("0" + b.toString(16)).slice(-2)).join("");
  }
  function celular(v) {                                 // 0991234567 / 099 123 4567 / +593 99 123 4567 -> 593991234567
    let d = String(v || "").replace(/[^0-9]/g, "");
    if (d.indexOf("593") === 0) d = d.slice(3);
    if (d.charAt(0) === "0") d = d.slice(1);
    return d.length >= 8 && d.length <= 9 ? "593" + d : "";
  }
  function localDeRetiro(entrega) {
    const k = Object.keys(LOCALES).find((n) => entrega.indexOf(n) !== -1) || "Portugal";
    return Object.assign({ nombre: k }, LOCALES[k]);
  }
  function marcar(el, msg) {
    err.textContent = msg; err.classList.add("on");
    if (el) { el.classList.add("pd-mal"); el.focus(); el.addEventListener("input", () => el.classList.remove("pd-mal"), { once: true }); }
  }
  function post(url, cuerpo) {
    let ctl = null; try { ctl = new AbortController(); setTimeout(() => ctl.abort(), 15000); } catch (e) { ctl = null; }
    return fetch(url, Object.assign({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) }, ctl ? { signal: ctl.signal } : {}))
      .then((r) => r.json());
  }
  function armar() {
    const nombre = $("#cli-nombre").value.trim();
    const telEl = $("#cli-tel");
    const tel = celular(telEl && telEl.value);
    const entrega = $("#cli-entrega").value;
    const dom = entrega === "Delivery";
    const dir = $("#cli-dir").value.trim();
    const hayUbic = typeof ubicacion !== "undefined" && !!ubicacion;
    err.classList.remove("on");
    document.querySelectorAll(".pd-mal").forEach((x) => x.classList.remove("pd-mal"));
    if (!Object.keys(carrito).length) return null;
    if (!nombre) { marcar($("#cli-nombre"), "Escriba su nombre, por favor."); return null; }
    if (!tel) { marcar(telEl, "Escriba su celular (10 números, ej. 0991234567): es por si el local necesita llamarle."); return null; }
    if (dom && !dir && !hayUbic) { marcar($("#cli-dir"), "Escriba su dirección o toque «Usar mi ubicación actual»."); return null; }
    const fact = $("#cli-fact-chk") && $("#cli-fact-chk").checked ? {
      razon_social: $("#cli-fact-nom").value.trim(), identificacion: $("#cli-fact-id").value.trim(), correo: $("#cli-fact-mail").value.trim(),
    } : null;
    const items = Object.entries(carrito).map(([pid, c]) => {
      const it = buscar(pid), op = opcionesLinea[pid];
      return { q: c, n: it.nombre, p: Number(it.precio) || 0, o: op ? ((op.lineas && op.lineas.length) ? op.lineas : [op.texto]) : [] };
    });
    const sub = r2(totalDinero()), env = dom ? ENVIO : 0;
    const ret = dom ? null : localDeRetiro(entrega);
    return {
      tok: hex(9), codigo: "WP-" + String(Date.now()).slice(-3), fuente: "web", canal: "web",
      nombre, telWeb: tel, modo: dom ? "delivery" : "retiro",
      coords: dom && hayUbic ? { lat: Number(ubicacion.lat), lng: Number(ubicacion.lng) } : null,
      referencia: dom ? dir : "Retira en el local de " + (ret.nombre === "La Pradera" || ret.nombre === "Los Chillos" ? ret.nombre : "la " + ret.nombre),
      nota: $("#cli-nota").value.trim(), items, sub, envase: 0, envio: env, km: dom && kmEnvio != null ? r2(kmEnvio) : null,
      total: r2(sub + env), pago: metodo === "transferencia" ? "Transferencia" : "Efectivo", pagado: false,
      factura: fact && (fact.razon_social || fact.identificacion || fact.correo) ? fact : null,
      local: dom ? { nombre: nombreLocal, direccion: DESDE.dir + " · Quito", la: DESDE.la, lo: DESDE.lo }
        : { nombre: nombreLocal, direccion: ret.dir + " · Quito", la: ret.la, lo: ret.lo },
      ts: Date.now(),
    };
  }
  function enviar(p) {
    enviando = true;
    btn.disabled = true;
    btn.innerHTML = '<span class="pd-spin"></span>Enviando su pedido…';
    post(N8N + "wp-cocina-nuevo", p)
      .then((j) => { if (!j || !j.ok) throw new Error("cocina"); return post(N8N + "wp-cocina-accion", { t: p.tok, accion: "avisar_web" }).catch(() => null); })
      .then(() => { enviando = false; confirmado(p); })
      .catch(() => { enviando = false; btn.disabled = false; etiqueta(); fallo(p); });
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest || !e.target.closest("#enviar")) return;
    e.stopPropagation(); e.preventDefault();
    if (enviando) return;
    const p = armar();
    if (p) enviar(p);
  }, true);

  /* ---------- «Pedido recibido» (se queda en la página) ---------- */
  const seguimiento = (tok) => N8N + "wp-pedido?t=" + tok;
  function resumen(p) {
    return `<div class="pd-res">${p.items.map((it) => `<div><span>${it.q}× ${esc(it.n)}</span><span>${plata(it.p * it.q)}</span></div>${it.o.length ? `<p>${esc(it.o.join(" · "))}</p>` : ""}`).join("")}
      ${p.envio ? `<div class="env"><span>Envío${p.km != null ? " · " + kmTxt(p.km) : ""}</span><span>${plata(p.envio)}</span></div>` : ""}
      <div class="t"><span>Total</span><span>${plata(p.total)}</span></div></div>`;
  }
  function confirmado(p) {
    Object.keys(carrito).forEach((k) => delete carrito[k]);
    Object.keys(opcionesLinea).forEach((k) => delete opcionesLinea[k]);
    if (typeof refrescar === "function") refrescar();
    if (typeof cerrar === "function") cerrar();
    try { localStorage.setItem(GUARDADO, JSON.stringify({ tok: p.tok, codigo: p.codigo, ts: p.ts })); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    const dom = p.modo === "delivery";
    const chip = p.pago === "Transferencia" ? "Transferencia: le enviamos la cuenta"
      : dom ? "Paga en efectivo al recibir" : "Paga en efectivo al retirar";
    const c = document.createElement("div");
    c.className = "pd-conf";
    c.innerHTML = `<div class="pd-conf-in">
      <div class="pd-ok-c">${CHECK}</div>
      <h2>¡Pedido recibido!</h2>
      <div class="pd-sub">Pedido <b>${esc(p.codigo)}</b> · ${hhmm(p.ts)}</div>
      <div class="pd-chip">${esc(chip)}</div>
      <p class="pd-txt">${esc(nombreLocal)} ya tiene su pedido. En «Seguir mi pedido» ve cuándo lo aceptan, cuánto tarda y ${dom ? "cuándo sale a su casa" : "cuándo está listo para retirar (" + esc(p.referencia.replace(/^Retira en /, "")) + ")"}.</p>
      ${resumen(p)}
      <a class="pd-btn" href="${seguimiento(p.tok)}">Seguir mi pedido</a>
      <button class="pd-btn sec" id="pd-otro">Hacer otro pedido</button>
    </div>`;
    document.body.appendChild(c);
    $("#pd-otro", c).addEventListener("click", () => { c.remove(); mostrarUltimo(); });
  }

  /* ---------- si la cocina no responde: reintentar o mandarlo por WhatsApp (como antes) ---------- */
  function textoWhatsApp(p) {
    let m = `*Nuevo pedido — ${nombreLocal}*\n\n*Cliente:* ${p.nombre}\n*Celular:* ${p.telWeb}\n*Entrega:* ${p.modo === "delivery" ? "A domicilio" : p.referencia}\n`;
    if (p.modo === "delivery") {
      if (p.referencia) m += `*Dirección:* ${p.referencia}\n`;
      if (p.coords) m += `*Ubicación:* https://maps.google.com/?q=${p.coords.lat},${p.coords.lng}\n`;
    }
    m += `\n*Pedido:*\n`;
    p.items.forEach((it) => { m += `• ${it.q}x ${it.n} — ${plata(it.p * it.q)}\n`; if (it.o.length) m += `   ▸ ${it.o.join(" · ")}\n`; });
    if (p.envio) m += `Envío: ${plata(p.envio)}\n`;
    m += `\n*Total: ${plata(p.total)}*\n*Pago:* ${p.pago}`;
    if (p.nota) m += `\n\n*Nota:* ${p.nota}`;
    if (p.factura) m += `\n\n*Datos de factura:*\n${[p.factura.razon_social, p.factura.identificacion, p.factura.correo].filter(Boolean).join("\n")}`;
    return m;
  }
  function fallo(p) {
    const c = document.createElement("div");
    c.className = "pd-conf";
    c.innerHTML = `<div class="pd-conf-in">
      <div class="pd-ok-c gris">${CHECK}</div>
      <h2>No pudimos enviar su pedido</h2>
      <p class="pd-txt">Parece que se cortó la conexión. Su pedido sigue aquí: intente de nuevo o mándelo por WhatsApp al local.</p>
      ${resumen(p)}
      <button class="pd-btn" id="pd-otra">Intentar de nuevo</button>
      <a class="pd-btn sec" id="pd-wa" href="https://wa.me/${esc(R.whatsapp)}?text=${encodeURIComponent(textoWhatsApp(p))}" target="_blank" rel="noopener">Enviarlo por WhatsApp</a>
      <button class="pd-btn sec" id="pd-volver">Volver a mi pedido</button>
    </div>`;
    document.body.appendChild(c);
    $("#pd-otra", c).addEventListener("click", () => { c.remove(); enviar(p); });
    $("#pd-volver", c).addEventListener("click", () => c.remove());
  }

  /* ---------- volvió a la página: su último pedido (12 h) ---------- */
  function mostrarUltimo() {
    let u = null;
    try { u = JSON.parse(localStorage.getItem(GUARDADO) || "null"); } catch (e) { u = null; }
    const viejo = $(".pd-ultimo"); if (viejo) viejo.remove();
    if (!u || !u.tok || !(Date.now() - Number(u.ts) < 12 * 3600 * 1000)) return;
    const b = document.createElement("div");
    b.className = "pd-ultimo";
    b.innerHTML = `<span>Su pedido ${esc(u.codigo)}</span><a href="${seguimiento(String(u.tok).replace(/[^a-f0-9]/g, ""))}">Ver cómo va</a><button aria-label="Cerrar">×</button>`;
    b.querySelector("button").addEventListener("click", () => { b.remove(); try { localStorage.removeItem(GUARDADO); } catch (e) { /* nada */ } });
    document.body.insertBefore(b, document.body.firstChild);
  }
  mostrarUltimo();
})();
