/* ============================================================
   carta/checkout-us.js — cierre del pedido en EE.UU. (14-oct-2026)
   Lo carga pagina.js solo si la página es de EE.UU., está ACTIVA y
   tiene local (local_us_id). Reemplaza el pie del carrito:
   - Retiro (pickup) o envío (delivery) con dirección ESCRITA (no GPS)
   - Envío: lo cotiza n8n `us-cotizar` (DoorDash) con la dirección
   - Propina, impuesto (sales tax) y pedido mínimo para envío
   - "Continuar al pago": n8n `us-pedido` RECALCULA todo con los precios de
     la base (nunca confía en lo que manda la página), guarda el pedido en
     pedidos_us y devuelve el link de pago (Stripe del local) o, si paga en
     el local, el link de seguimiento.
   Config del local (paginas.config.checkout):
     retiro, envio, envio_minimo, impuesto_pct, propinas[], pago_en_local, estado_def
   Corre después de engine.js (usa cfg, carrito, buscar, totalDinero, refrescar).
   ============================================================ */
(function () {
  const P = window.PAGINA || {};
  if (P.pais !== "US" || typeof cfg === "undefined" || !cfg) return;
  const CK = Object.assign(
    { retiro: true, envio: false, envio_minimo: 0, impuesto_pct: 0, propinas: [15, 18, 20], pago_en_local: false, estado_def: "" },
    cfg.checkout || {}
  );
  if (!CK.retiro && !CK.envio) CK.retiro = true;
  const API = "https://n8n.dewansas.com/webhook/";
  const EN = P.idioma === "en";
  const LS = "us_cliente_" + P.slug;
  const q = (s) => document.querySelector(s);
  const money = (n) => "$" + (Math.round(Number(n) * 100) / 100).toFixed(2);
  const r2 = (n) => Math.round(Number(n) * 100) / 100;

  const T = EN ? {
    pickup: "Pickup", delivery: "Delivery", nombre: "Name", tel: "Phone", telPh: "(555) 123-4567",
    email: "Email (for your receipt)", calle: "Street address", apto: "Apt / Suite (optional)", ciudad: "City",
    estado: "State", zip: "ZIP", instr: "Delivery instructions (optional)", instrPh: "e.g. buzz 3B, leave at the door",
    nota: "Note for the kitchen (optional)", notaPh: "e.g. no onions",
    propina: "Tip", sinPropina: "No tip", propinaEnvio: "100% goes to your driver", propinaRetiro: "Thank the kitchen",
    subtotal: "Subtotal", impuesto: "Tax", envio: "Delivery", total: "Total",
    pagarTarjeta: "Continue to payment", pagarLocal: "Place order · pay at pickup", comoPagas: "How do you want to pay?",
    tarjeta: "💳 Card, now", enLocal: "🏪 At pickup", enEntrega: "💵 Cash on delivery", pagarEfectivo: "Place order · pay cash on delivery",
    porPropio: "our own driver", porApp: "DoorDash / Uber driver",
    cotizando: "Checking delivery to your address…", llenaDir: "Enter your address to see the delivery fee.",
    fuera: "Sorry, we can't deliver to this address right now. You can still order for pickup.",
    minimo: (m) => "Delivery minimum is " + money(m) + ".", eta: (min) => "Delivery " + (min ? "· about " + min + " min" : ""),
    faltaNombre: "Please enter your name.", faltaTel: "Please enter a valid US phone number.", faltaDir: "Please complete your delivery address.",
    esperaCot: "One moment, we're checking the delivery fee…", enviando: "Sending…",
    error: "We couldn't place your order. Please try again.", errorCot: "We couldn't check delivery to this address. Try again, or choose pickup.", cerrado: "The restaurant isn't taking online orders right now.",
    seguro: "🔒 Secure card payment by Stripe. You'll get a link to track your order.",
  } : {
    pickup: "Retiro", delivery: "A domicilio", nombre: "Su nombre", tel: "Teléfono", telPh: "(555) 123-4567",
    email: "Correo (para su recibo)", calle: "Dirección", apto: "Apto / Suite (opcional)", ciudad: "Ciudad",
    estado: "Estado", zip: "ZIP", instr: "Indicaciones para el repartidor (opcional)", instrPh: "Ej: timbre 3B, dejar en la puerta",
    nota: "Nota para la cocina (opcional)", notaPh: "Ej: sin cebolla",
    propina: "Propina", sinPropina: "Sin propina", propinaEnvio: "El 100 % es para su repartidor", propinaRetiro: "Para la cocina",
    subtotal: "Subtotal", impuesto: "Impuesto", envio: "Envío", total: "Total",
    pagarTarjeta: "Continuar al pago", pagarLocal: "Hacer pedido · pago al retirar", comoPagas: "¿Cómo quiere pagar?",
    tarjeta: "💳 Tarjeta, ahora", enLocal: "🏪 Al retirar", enEntrega: "💵 Efectivo al recibir", pagarEfectivo: "Hacer pedido · pago en efectivo al recibir",
    porPropio: "nuestro repartidor", porApp: "repartidor de DoorDash / Uber",
    cotizando: "Revisando el envío a su dirección…", llenaDir: "Escriba su dirección para ver el costo del envío.",
    fuera: "Por ahora no llegamos a esa dirección. Puede pedir para retirar.",
    minimo: (m) => "El pedido mínimo para envío es " + money(m) + ".", eta: (min) => "Envío " + (min ? "· unos " + min + " min" : ""),
    faltaNombre: "Escriba su nombre.", faltaTel: "Escriba un teléfono de EE.UU. válido.", faltaDir: "Complete la dirección de entrega.",
    esperaCot: "Un momento, estamos calculando el envío…", enviando: "Enviando…",
    error: "No pudimos hacer su pedido. Intente de nuevo.", errorCot: "No pudimos revisar el envío a esa dirección. Intente de nuevo o elija retiro.", cerrado: "El restaurante no está recibiendo pedidos en línea ahora.",
    seguro: "🔒 Pago seguro con tarjeta (Stripe). Recibirá un link para seguir su pedido.",
  };

  /* ---------- estilos ---------- */
  const st = document.createElement("style");
  st.textContent = `
    .us-seg{display:flex;gap:6px;margin:0 0 12px}
    .us-seg button{flex:1;border:2px solid #e5e5e5;border-radius:12px;padding:10px 6px;font-weight:800;font-size:14px;background:#fff;cursor:pointer;color:#333}
    .us-seg button.sel{border-color:var(--marca);background:var(--marca);color:#fff}
    .us-fila{display:grid;grid-template-columns:1.3fr .7fr .9fr;gap:8px}
    .us-nota{font-size:12.5px;color:#666;margin:2px 0 10px}
    .us-nota.ok{color:#15803d;font-weight:700}.us-nota.err{color:#b91c1c;font-weight:700}
    .us-prop{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 4px}
    .us-prop button{flex:1;min-width:64px;border:2px solid #e5e5e5;border-radius:10px;padding:8px 4px;font-weight:800;font-size:13px;background:#fff;cursor:pointer;color:#333}
    .us-prop button.sel{border-color:var(--marca);color:var(--marca)}
    .us-res{background:#fff;border:1px solid #eee;border-radius:14px;padding:10px 14px;margin:10px 0}
    .us-res div{display:flex;justify-content:space-between;font-size:14px;padding:3px 0;color:#444}
    .us-legal{font-size:11.5px;color:#888;text-align:center;margin-top:8px}
    #cart .campo input{width:100%}
  `;
  document.head.appendChild(st);

  /* ---------- formulario (reemplaza el pie del carrito de engine.js) ---------- */
  const foot = q(".cart-foot");
  if (!foot) return;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const campo = (idc, label, extra) => '<label class="campo">' + esc(label) + ' <input id="' + idc + '" ' + (extra || "") + " /></label>";
  foot.innerHTML =
    (CK.retiro && CK.envio ? '<div class="us-seg" id="us-tipo"><button type="button" data-t="retiro">🏪 ' + esc(T.pickup) + '</button><button type="button" data-t="envio">🛵 ' + esc(T.delivery) + "</button></div>" : "") +
    campo("us-nombre", T.nombre, 'type="text" autocomplete="name" maxlength="60"') +
    campo("us-tel", T.tel, 'type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="' + esc(T.telPh) + '"') +
    campo("us-email", T.email, 'type="email" autocomplete="email" maxlength="120"') +
    '<div id="us-dir">' +
      campo("us-calle", T.calle, 'type="text" autocomplete="address-line1" maxlength="120"') +
      campo("us-apto", T.apto, 'type="text" autocomplete="address-line2" maxlength="40"') +
      '<div class="us-fila">' + campo("us-ciudad", T.ciudad, 'type="text" autocomplete="address-level2" maxlength="60"') +
        campo("us-estado", T.estado, 'type="text" autocomplete="address-level1" maxlength="2" style="text-transform:uppercase"') +
        campo("us-zip", T.zip, 'type="text" inputmode="numeric" autocomplete="postal-code" maxlength="5"') + "</div>" +
      campo("us-instr", T.instr, 'type="text" maxlength="200" placeholder="' + esc(T.instrPh) + '"') +
      '<div class="us-nota" id="us-cot"></div>' +
    "</div>" +
    campo("us-nota", T.nota, 'type="text" maxlength="200" placeholder="' + esc(T.notaPh) + '"') +
    '<div class="campo" style="margin-bottom:2px">' + esc(T.propina) + ' <span class="us-nota" id="us-prop-txt" style="display:inline"></span></div>' +
    '<div class="us-prop" id="us-prop"></div>' +
    '<div id="us-pago-wrap"><div class="campo" style="margin:10px 0 4px">' + esc(T.comoPagas) + '</div><div class="us-seg" id="us-pago"><button type="button" data-p="tarjeta">' + esc(T.tarjeta) + '</button><button type="button" data-p="en_local">' + esc(T.enLocal) + "</button></div></div>" +
    '<div class="us-res" id="us-res"></div>' +
    '<div class="cart-total"><span>' + esc(T.total) + '</span><strong id="cart-total">$0.00</strong></div>' +
    '<button id="enviar" disabled></button>' +
    '<p class="us-legal" id="us-legal">' + esc(T.seguro) + "</p>";

  /* ---------- estado ---------- */
  let tipo = CK.envio && !CK.retiro ? "envio" : "retiro";
  let pago = "tarjeta";
  let propPct = null;           // null = sin elegir todavía (default según tipo)
  let cot = { estado: "na", envio: 0, eta: 0, firma: "", proveedor: "", efectivo: false };   // na | cargando | ok | fuera | error
  let cotTimer = null, cotSeq = 0;

  const telDigitos = () => { let d = (q("#us-tel").value || "").replace(/[^0-9]/g, ""); if (d.length === 11 && d[0] === "1") d = d.slice(1); return d; };
  const dir = () => ({
    calle: q("#us-calle").value.trim(), apto: q("#us-apto").value.trim(), ciudad: q("#us-ciudad").value.trim(),
    estado: q("#us-estado").value.trim().toUpperCase(), zip: q("#us-zip").value.trim(),
  });
  const dirCompleta = (d) => d.calle.length >= 4 && d.ciudad.length >= 2 && /^[A-Z]{2}$/.test(d.estado) && /^[0-9]{5}$/.test(d.zip);
  const pctPropina = () => (propPct != null ? propPct : (tipo === "envio" ? (CK.propinas[1] || 18) : 0));

  function montos() {
    const sub = r2(totalDinero());
    const imp = r2(sub * (Number(CK.impuesto_pct) || 0) / 100);
    const env = tipo === "envio" && cot.estado === "ok" ? r2(cot.envio) : 0;
    const prop = r2(sub * pctPropina() / 100);
    return { sub, imp, env, prop, total: r2(sub + imp + env + prop) };
  }

  function pintar() {
    q("#us-dir").style.display = tipo === "envio" ? "" : "none";
    const segT = q("#us-tipo");
    if (segT) segT.querySelectorAll("button").forEach((b) => b.classList.toggle("sel", b.dataset.t === tipo));
    const efectivoEnvio = tipo === "envio" && cot.estado === "ok" && cot.efectivo;
    const verPago = (tipo === "retiro" && CK.pago_en_local) || efectivoEnvio;
    q("#us-pago-wrap").style.display = verPago ? "" : "none";
    if (!verPago) pago = "tarjeta";
    q('#us-pago [data-p="en_local"]').textContent = tipo === "envio" ? T.enEntrega : T.enLocal;
    q("#us-pago").querySelectorAll("button").forEach((b) => b.classList.toggle("sel", b.dataset.p === pago));
    // propinas
    const pct = pctPropina();
    q("#us-prop").innerHTML = [0].concat(CK.propinas).map((p) =>
      '<button type="button" data-pct="' + p + '" class="' + (p === pct ? "sel" : "") + '">' + (p ? p + "%" : esc(T.sinPropina)) + "</button>").join("");
    q("#us-prop-txt").textContent = "· " + (tipo === "envio" ? T.propinaEnvio : T.propinaRetiro);
    // cotización
    const m = montos();
    const nota = q("#us-cot");
    let bloquea = false;
    if (tipo === "envio") {
      if (CK.envio_minimo && m.sub < CK.envio_minimo) { nota.className = "us-nota err"; nota.textContent = T.minimo(CK.envio_minimo); bloquea = true; }
      else if (cot.estado === "cargando") { nota.className = "us-nota"; nota.textContent = T.cotizando; bloquea = true; }
      else if (cot.estado === "ok") { nota.className = "us-nota ok"; nota.textContent = "🛵 " + T.eta(cot.eta) + " · " + money(cot.envio) + (cot.proveedor ? " · " + (/propio/.test(cot.proveedor) ? T.porPropio : T.porApp) : ""); }
      else if (cot.estado === "fuera") { nota.className = "us-nota err"; nota.textContent = T.fuera; bloquea = true; }
      else if (cot.estado === "error") { nota.className = "us-nota err"; nota.textContent = T.errorCot; bloquea = true; }
      else { nota.className = "us-nota"; nota.textContent = T.llenaDir; bloquea = true; }
    }
    // resumen
    q("#us-res").innerHTML =
      "<div><span>" + esc(T.subtotal) + "</span><b>" + money(m.sub) + "</b></div>" +
      (m.imp ? "<div><span>" + esc(T.impuesto) + "</span><b>" + money(m.imp) + "</b></div>" : "") +
      (tipo === "envio" ? "<div><span>" + esc(T.envio) + "</span><b>" + (cot.estado === "ok" ? money(m.env) : "—") + "</b></div>" : "") +
      (m.prop ? "<div><span>" + esc(T.propina) + " (" + pct + "%)</span><b>" + money(m.prop) + "</b></div>" : "");
    q("#cart-total").textContent = money(m.total);
    const fab = q("#fab-total"); if (fab) fab.textContent = money(m.total);
    const btn = q("#enviar");
    btn.textContent = pago === "en_local" ? (tipo === "retiro" ? T.pagarLocal : T.pagarEfectivo) : T.pagarTarjeta + " · " + money(m.total);
    btn.disabled = !Object.keys(carrito).length || bloquea;
    q("#us-legal").style.display = pago === "tarjeta" ? "" : "none";
  }

  async function cotizar() {
    if (tipo !== "envio") return;
    const d = dir();
    if (!dirCompleta(d)) { cot = { estado: "na", envio: 0, eta: 0, firma: "" }; pintar(); return; }
    const firma = [d.calle, d.apto, d.ciudad, d.estado, d.zip, r2(totalDinero())].join("|");
    if (firma === cot.firma && (cot.estado === "ok" || cot.estado === "fuera")) return;
    const yo = ++cotSeq;
    cot = { estado: "cargando", envio: 0, eta: 0, firma };
    pintar();
    try {
      const ctl = new AbortController(); setTimeout(() => ctl.abort(), 20000);
      const r = await fetch(API + "us-cotizar", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: ctl.signal,
        body: JSON.stringify({ slug: P.slug, direccion: d, subtotal: r2(totalDinero()) }),
      });
      const j = await r.json();
      if (yo !== cotSeq) return;
      if (j && j.ok) cot = { estado: "ok", envio: Number(j.envio) || 0, eta: Number(j.eta_min) || 0, firma, proveedor: j.proveedor || "", efectivo: !!j.efectivo };
      else cot = { estado: j && j.error === "fuera_de_zona" ? "fuera" : "error", envio: 0, eta: 0, firma };
    } catch (e) {
      if (yo !== cotSeq) return;
      cot = { estado: "error", envio: 0, eta: 0, firma: "" };
    }
    pintar();
  }
  const cotizarLuego = () => { clearTimeout(cotTimer); cotTimer = setTimeout(cotizar, 900); };

  /* ---------- eventos ---------- */
  foot.addEventListener("click", (e) => {
    const bt = e.target.closest("[data-t]"); if (bt) { tipo = bt.dataset.t; pintar(); cotizar(); return; }
    const bp = e.target.closest("[data-p]"); if (bp) { pago = bp.dataset.p; pintar(); return; }
    const bpr = e.target.closest("[data-pct]"); if (bpr) { propPct = Number(bpr.dataset.pct); pintar(); }
  });
  ["#us-calle", "#us-apto", "#us-ciudad", "#us-estado", "#us-zip"].forEach((s) => q(s).addEventListener("input", cotizarLuego));

  // engine.js repinta el carrito con refrescar(): recalcular montos y re-cotizar (el valor del pedido cambia)
  const _refrescar = window.refrescar;
  window.refrescar = function () { _refrescar.apply(this, arguments); pintar(); if (tipo === "envio" && cot.estado !== "na") cotizarLuego(); };
  refrescar = window.refrescar;

  // recordar al cliente
  try {
    const prev = JSON.parse(localStorage.getItem(LS) || "null");
    if (prev) {
      ["nombre", "tel", "email", "calle", "apto", "ciudad", "estado", "zip"].forEach((k) => { if (prev[k]) q("#us-" + k).value = prev[k]; });
      if (prev.tipo && ((prev.tipo === "envio" && CK.envio) || (prev.tipo === "retiro" && CK.retiro))) tipo = prev.tipo;
    }
  } catch (e) {}
  if (!q("#us-estado").value && CK.estado_def) q("#us-estado").value = CK.estado_def;

  /* ---------- enviar ---------- */
  const viejo = q("#enviar");
  const btn = viejo.cloneNode(true);
  viejo.replaceWith(btn);
  btn.addEventListener("click", async () => {
    const nombre = q("#us-nombre").value.trim();
    const tel = telDigitos();
    const d = dir();
    if (nombre.length < 2) return alert(T.faltaNombre);
    if (tel.length !== 10) return alert(T.faltaTel);
    if (tipo === "envio" && !dirCompleta(d)) return alert(T.faltaDir);
    if (tipo === "envio" && cot.estado !== "ok") return alert(T.esperaCot);
    const items = Object.entries(carrito).map(([pid, c]) => ({ id: pid, cant: c }));
    if (!items.length) return;
    const cuerpo = {
      slug: P.slug, items, nota: q("#us-nota").value.trim(),
      cliente: { nombre, tel: "+1" + tel, email: q("#us-email").value.trim() },
      entrega: tipo === "envio" ? { tipo, direccion: d, instrucciones: q("#us-instr").value.trim() } : { tipo },
      propina_pct: pctPropina(), pago, total_visto: montos().total,
      volver: location.href.split("#")[0],
    };
    try {
      localStorage.setItem(LS, JSON.stringify(Object.assign({ nombre, tel: q("#us-tel").value.trim(), email: cuerpo.cliente.email, tipo }, tipo === "envio" ? d : {})));
    } catch (e) {}
    btn.disabled = true; btn.textContent = T.enviando;
    try {
      const r = await fetch(API + "us-pedido", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
      const j = await r.json();
      if (j && j.ok && j.url) { location.href = j.url; return; }
      alert(j && j.error === "cerrado" ? T.cerrado : (j && j.error === "fuera_de_zona" ? T.fuera : T.error));
    } catch (e) { alert(T.error); }
    btn.disabled = false; pintar();
  });

  pintar();
  if (tipo === "envio") cotizar();
})();
