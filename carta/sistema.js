/* ============================================================
   carta/sistema.js — cierre del pedido para locales del SISTEMA
   (se activa solo si la config del local trae `sistema`).
   - Tarjeta final tipo Super Happy: subtotal · envío (carrera DEWAN
     cotizada con la ubicación) · total · pago.
   - "Pedir aquí" guarda el pedido DIRECTO en pedidos_sistema (sin
     WhatsApp): el panel del local lo recibe y el cliente ve el link
     de seguimiento en la misma pantalla. Cero mensajes de Meta.
   - Recuerda nombre, WhatsApp y ubicación para la próxima vez.
   Corre después de engine.js (comparte cfg, R, carrito, buscar,
   totalDinero, refrescar, ubicacion, SUPA_URL, SUPA_ANON).
   ============================================================ */
(function () {
  if (!window.RESTAURANTES || typeof cfg === "undefined" || !cfg || !cfg.sistema) return;
  const S = cfg.sistema;
  // modo 'whatsapp' (demo Baltimore): SOLO muestra el precio del envío en la tarjeta y sigue mandando por WhatsApp
  const modoWA = S.modo === 'whatsapp';
  const $ = (q) => document.querySelector(q);
  const money = (n) => "$" + (Math.round(Number(n) * 100) / 100).toFixed(2);
  const LS_KEY = "sis_cliente_" + id;

  /* ---------- estilos de la tarjeta final ---------- */
  const st = document.createElement("style");
  st.textContent = `
    .sis-card{background:#fff;border:1px solid #eee;border-radius:14px;padding:12px 14px;margin:6px 0 12px;box-shadow:0 4px 14px rgba(0,0,0,.05)}
    .sis-row{display:flex;justify-content:space-between;align-items:baseline;font-size:14px;padding:4px 0;color:#444}
    .sis-row b{font-size:15px}
    .sis-row.tot{border-top:1px dashed #ddd;margin-top:6px;padding-top:8px;font-size:15px;font-weight:800;color:var(--tinta)}
    .sis-row.tot b{font-size:22px;color:var(--marca)}
    .sis-envio-nota{font-size:12px;color:#777;margin:2px 0 6px}
    .sis-envio-nota.ok{color:#16a34a;font-weight:700}
    .sis-envio-nota.err{color:#dc2626;font-weight:700}
    .sis-pagos{display:flex;gap:8px;margin:0 0 12px}
    .sis-pago{flex:1;border:2px solid #e5e5e5;border-radius:12px;padding:10px 6px;text-align:center;font-weight:800;font-size:13px;cursor:pointer;background:#fff}
    .sis-pago.sel{border-color:var(--marca);background:var(--marca);color:#fff}
    .sis-ok{padding:18px 6px;text-align:center}
    .sis-ok h3{font-size:22px;margin:6px 0 4px;color:var(--tinta)}
    .sis-ok p{color:#666;font-size:14px;margin:4px 0}
    .sis-ok .sis-card{text-align:left;margin-top:14px}
    .sis-btn{display:block;width:100%;border:0;border-radius:14px;padding:15px;font-weight:900;font-size:16px;cursor:pointer;margin-top:10px;text-decoration:none;text-align:center}
    .sis-btn.p{background:var(--marca);color:#fff}
    .sis-btn.s{background:#f3f3f3;color:var(--tinta)}
    #cli-tel{letter-spacing:.5px}
  `;
  document.head.appendChild(st);

  /* ---------- campos extra: WhatsApp + pago + tarjeta ---------- */
  const foot = $(".cart-foot");
  const nombreLbl = $("#cli-nombre") && $("#cli-nombre").closest("label");
  const telLbl = document.createElement("label");
  telLbl.className = "campo";
  telLbl.innerHTML = 'Tu WhatsApp <input id="cli-tel" type="tel" inputmode="tel" placeholder="Ej: 0991234567" maxlength="13" />';
  if (nombreLbl && !modoWA) nombreLbl.insertAdjacentElement("afterend", telLbl);

  const pagos = document.createElement("div");
  pagos.innerHTML = '<div class="campo" style="margin-bottom:6px">Cómo pagas</div>' +
    '<div class="sis-pagos"><button type="button" class="sis-pago sel" data-pago="Efectivo">💵 Efectivo</button>' +
    '<button type="button" class="sis-pago" data-pago="Transferencia">🏦 Transferencia</button></div>';
  const card = document.createElement("div");
  card.id = "sis-resumen";
  card.className = "sis-card";
  const totalBox = $(".cart-total") || $("#enviar");
  if (totalBox) { if (!modoWA) totalBox.insertAdjacentElement("beforebegin", pagos); totalBox.insertAdjacentElement("beforebegin", card); }
  else if (foot) { if (!modoWA) foot.appendChild(pagos); foot.appendChild(card); }
  let pago = "Efectivo";
  pagos.querySelectorAll(".sis-pago").forEach((b) => b.addEventListener("click", () => {
    pago = b.dataset.pago;
    pagos.querySelectorAll(".sis-pago").forEach((x) => x.classList.toggle("sel", x === b));
  }));
  const btn = $("#enviar");
  if (btn && !modoWA) btn.textContent = "🍔 Pedir aquí mismo";

  /* ---------- envío (carrera DEWAN) ---------- */
  let envio = { estado: "na", valor: 0, km: 0, nota: "" }; // na | loading | ok | err
  let ubicKey = "";
  const esDelivery = () => ($("#cli-entrega") ? $("#cli-entrega").value : "Delivery") === "Delivery";
  const havKm = (la1, lo1, la2, lo2) => {
    const R = 6371, rad = Math.PI / 180, dLa = (la2 - la1) * rad, dLo = (lo2 - lo1) * rad;
    const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * rad) * Math.cos(la2 * rad) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };
  const tramos = (d) => d <= 2 ? 1.3 : d < 3 ? 1.5 : 1.75 + Math.ceil((d - 3) / 0.5) * 0.25;
  async function cotizar() {
    if (!esDelivery() || typeof ubicacion === 'undefined' || !ubicacion || !S.local) { envio = { estado: "na", valor: 0, km: 0, nota: "" }; pintar(); return; }
    const key = ubicacion.lat.toFixed(4) + "," + ubicacion.lng.toFixed(4);
    if (key === ubicKey && envio.estado === "ok") return;
    ubicKey = key;
    envio = { estado: "loading", valor: 0, km: 0, nota: "Calculando el envío…" };
    pintar();
    let precio = 0, km = 0;
    try {
      const ctl = new AbortController(); setTimeout(() => ctl.abort(), 9000);
      const r = await fetch(S.envio.cotizador, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: ctl.signal,
        body: JSON.stringify({ origen_lat: S.local.lat, origen_lng: S.local.lng, destino_lat: ubicacion.lat, destino_lng: ubicacion.lng,
          origen: S.local.lat + "," + S.local.lng, destino: ubicacion.lat + "," + ubicacion.lng })
      });
      const j = await r.json();
      const p = Number(j && j.precio), d = Number(j && j.distancia_km);
      if (j && j.ok !== false && p > 0 && d > 0) { precio = p; km = d; }
    } catch (e) { /* cae al estimado */ }
    if (!precio) {
      km = havKm(S.local.lat, S.local.lng, ubicacion.lat, ubicacion.lng) * 1.3;
      precio = tramos(km);
    }
    if (key !== ubicKey) return; // llegó una respuesta vieja
    envio = { estado: "ok", valor: Math.round(precio * 100) / 100, km: km, nota: "🛵 Envío " + money(precio) + (km ? " · " + km.toFixed(1) + " km" : "") + " · lo lleva una moto DEWAN" };
    pintar();
  }

  /* ---------- tarjeta final ---------- */
  function pintar() {
    const sub = totalDinero();
    const del = esDelivery();
    const env = del ? (envio.estado === "ok" ? envio.valor : 0) : 0;
    let nota = "";
    if (del) {
      if (!ubicacion) nota = '<div class="sis-envio-nota">📍 Toca "Usar mi ubicación actual" para calcular el envío</div>';
      else if (envio.estado === "loading") nota = '<div class="sis-envio-nota">⏳ ' + envio.nota + '</div>';
      else if (envio.estado === "ok") nota = '<div class="sis-envio-nota ok">' + envio.nota + '</div>';
    } else nota = '<div class="sis-envio-nota">🏪 Retiras en ' + (S.local.direccion || R.nombre) + ' · sin costo de envío</div>';
    card.innerHTML =
      '<div class="sis-row"><span>Subtotal</span><b>' + money(sub) + '</b></div>' +
      (del ? '<div class="sis-row"><span>Envío 🛵</span><b>' + (envio.estado === "ok" ? money(env) : "—") + '</b></div>' : '') +
      nota +
      '<div class="sis-row tot"><span>Total a pagar</span><b>' + money(sub + env) + '</b></div>';
    if ($("#cart-total")) $("#cart-total").textContent = money(sub + env);
    if ($("#fab-total")) $("#fab-total").textContent = money(sub + env);
  }
  const _refrescar = window.refrescar;
  window.refrescar = function () { _refrescar.apply(this, arguments); pintar(); };
  refrescar = window.refrescar;
  if ($("#cli-entrega")) $("#cli-entrega").addEventListener("change", () => { cotizar(); pintar(); });
  // cuando el GPS termina (engine pone la clase .ok al botón), cotizamos
  const ub = $("#cli-ubic");
  if (ub) new MutationObserver(() => { if (ub.classList.contains("ok")) cotizar(); }).observe(ub, { attributes: true, attributeFilter: ["class"] });

  /* ---------- recordar al cliente ---------- */
  try {
    const prev = JSON.parse(localStorage.getItem(LS_KEY) || "null");
    if (prev) {
      if (prev.nombre && $("#cli-nombre")) $("#cli-nombre").value = prev.nombre;
      if (prev.tel && $("#cli-tel")) $("#cli-tel").value = prev.tel;
      if (prev.dir && $("#cli-dir")) $("#cli-dir").value = prev.dir;
      if (prev.lat && prev.lng && ub) {
        ubicacion = { lat: prev.lat, lng: prev.lng };
        ub.textContent = "📍 Ubicación de la vez pasada ✓ (toca para actualizar)";
        ub.classList.add("ok");
        if ($("#ubic-ok")) $("#ubic-ok").classList.remove("oculto");
        cotizar();
      }
    }
  } catch (e) {}

  /* ---------- enviar: directo al sistema ---------- */
  const telNorm = (t) => { let d = String(t || "").replace(/[^0-9]/g, ""); if (d.startsWith("0")) d = "593" + d.slice(1); if (d.length === 9) d = "593" + d; return d; };
  const nuevoBtn = btn.cloneNode(true); // quita el listener de WhatsApp del motor
  btn.replaceWith(nuevoBtn);
  if (modoWA) {
    // Demo: mismo mensaje de WhatsApp del motor + la línea del envío cotizado
    nuevoBtn.addEventListener("click", () => {
      const nombre = ($("#cli-nombre").value || "").trim();
      const entrega = $("#cli-entrega").value;
      const del = esDelivery();
      const dir = ($("#cli-dir").value || "").trim();
      const nota = ($("#cli-nota").value || "").trim();
      if (!nombre) return alert("Por favor escribí tu nombre 🙂");
      if (del && !dir && !ubicacion) return alert("Falta tu dirección o tu ubicación 🛵");
      const sub = totalDinero();
      const env = del && envio.estado === "ok" ? envio.valor : 0;
      let m = `*Nuevo pedido — ${R.nombre}*

*Cliente:* ${nombre}
*Entrega:* ${entrega}
`;
      if (del) {
        if (dir) m += `*Dirección:* ${dir}
`;
        if (ubicacion) m += `*Ubicación:* https://maps.google.com/?q=${ubicacion.lat},${ubicacion.lng}
`;
      }
      m += `
*Pedido:*
`;
      Object.entries(carrito).forEach(([pid, c]) => { const it = buscar(pid); m += `• ${c}x ${it.nombre} — $${(it.precio * c).toFixed(2)}
`; });
      m += `
Subtotal: $${sub.toFixed(2)}`;
      if (del) m += `
🛵 Envío: ${envio.estado === "ok" ? "$" + env.toFixed(2) + (envio.km ? " (" + envio.km.toFixed(1) + " km)" : "") : "por confirmar"}`;
      m += `
*Total: $${(sub + env).toFixed(2)}*`;
      if (nota) m += `

*Nota:* ${nota}`;
      window.open(`https://wa.me/${R.whatsapp}?text=${encodeURIComponent(m)}`, "_blank");
    });
    pintar();
    return;
  }
  nuevoBtn.addEventListener("click", async () => {
    const nombre = ($("#cli-nombre").value || "").trim();
    const tel = telNorm($("#cli-tel").value);
    const del = esDelivery();
    const dir = ($("#cli-dir").value || "").trim();
    const nota = ($("#cli-nota").value || "").trim();
    if (!nombre) return alert("Escribe tu nombre 🙂");
    if (tel.length < 12) return alert("Escribe tu WhatsApp (10 dígitos) para que el local pueda contactarte 📱");
    if (del && !ubicacion) return alert('Para el envío necesitamos tu ubicación: toca "Usar mi ubicación actual" 📍');
    if (del && envio.estado === "loading") return alert("Un momento, estamos calculando el envío…");
    const ent = Object.entries(carrito);
    if (!ent.length) return;
    const sub = Math.round(totalDinero() * 100) / 100;
    const env = del ? envio.valor : 0;
    const total = Math.round((sub + env) * 100) / 100;
    let detalle = ent.map(([pid, c]) => { const it = buscar(pid); return c + "x " + it.nombre + " — " + money(it.precio * c); }).join("\n");
    detalle += "\n💳 " + pago;
    if (nota) detalle += "\n📝 " + nota.slice(0, 300);
    let dirEnt = null;
    if (del) { dirEnt = dir || "Ubicación GPS del cliente"; dirEnt += " · https://maps.google.com/?q=" + ubicacion.lat + "," + ubicacion.lng; }
    const fila = {
      restaurante_id: cfg.restauranteId, restaurante: R.nombre,
      cliente_nombre: nombre, cliente_telefono: tel, numero_destinatario: tel,
      conversation_id: "web:" + tel,
      intencion: "pedido_comida", estado_pedido: "pendiente_restaurante", restaurante_aceptado: false,
      tipo_entrega: del ? "domicilio" : "retiro", requiere_ubicacion: del,
      direccion_entrega: dirEnt,
      ubicacion_lat: del ? ubicacion.lat : null, ubicacion_lng: del ? ubicacion.lng : null,
      direccion_retiro: del ? null : (S.local.direccion || R.nombre),
      retiro_lat: S.local.lat, retiro_lng: S.local.lng,
      detalle_pedido: detalle, metodo_pago: pago,
      precio_base_productos: sub, precio_calculado: env, monto_total: total, markup_dewan: 0
    };
    nuevoBtn.disabled = true; nuevoBtn.textContent = "Enviando…";
    let row = null;
    try {
      const r = await fetch(SUPA_URL + "/rest/v1/" + (S.tabla || "pedidos_sistema"), {
        method: "POST",
        headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify(fila)
      });
      const j = await r.json();
      row = Array.isArray(j) ? j[0] : j;
      if (!r.ok || !row || !row.id) throw new Error((row && row.message) || "HTTP " + r.status);
    } catch (e) {
      nuevoBtn.disabled = false; nuevoBtn.textContent = "🍔 Pedir aquí mismo";
      alert("No pudimos registrar el pedido 🙈 Revisa tu internet e intenta de nuevo.\n(" + (e && e.message) + ")");
      return;
    }
    try { localStorage.setItem(LS_KEY, JSON.stringify({ nombre, tel: $("#cli-tel").value, dir, lat: del ? ubicacion.lat : (JSON.parse(localStorage.getItem(LS_KEY) || "{}").lat || null), lng: del ? ubicacion.lng : (JSON.parse(localStorage.getItem(LS_KEY) || "{}").lng || null) })); } catch (e) {}
    const link = (S.seguimiento || "https://dewansas.com/pedido/?s=sistema&t=") + (row.token_seguimiento || "");
    // pantalla de éxito dentro del panel
    const panel = $("#cart");
    panel.innerHTML =
      '<div class="cart-head"><h2>Pedido enviado</h2><button id="cart-cerrar2">✕</button></div>' +
      '<div class="sis-ok">' +
      '<div style="font-size:44px">✅</div>' +
      '<h3>¡Pedido #' + row.id + ' enviado!</h3>' +
      '<p><b>' + R.nombre + '</b> ya lo tiene en su pantalla. ' + (S.tiempoTexto || "En un momento lo confirma") + '.</p>' +
      '<div class="sis-card">' +
      ent.map(([pid, c]) => { const it = buscar(pid); return '<div class="sis-row"><span>' + c + 'x ' + it.nombre + '</span><b>' + money(it.precio * c) + '</b></div>'; }).join("") +
      (del ? '<div class="sis-row"><span>Envío 🛵</span><b>' + money(env) + '</b></div>' : '<div class="sis-row"><span>Retiro en local</span><b>$0.00</b></div>') +
      '<div class="sis-row tot"><span>Total (' + pago + ')</span><b>' + money(total) + '</b></div>' +
      '</div>' +
      '<a class="sis-btn p" href="' + link + '" target="_blank" rel="noopener">📍 Seguir mi pedido en vivo</a>' +
      '<button type="button" class="sis-btn s" id="sis-otro">Hacer otro pedido</button>' +
      '<p style="font-size:12px;color:#888;margin-top:10px">Guarda el link: ahí ves cuando el local confirma, cuando sale la moto y cuando llega.</p>' +
      '</div>';
    for (const k of Object.keys(carrito)) delete carrito[k];
    $("#cart-cerrar2").addEventListener("click", () => location.reload());
    $("#sis-otro").addEventListener("click", () => location.reload());
    try { window.open(link, "_blank"); } catch (e) {}
  });

  pintar();
})();
