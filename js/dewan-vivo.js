/* DEWAN · mapa vivo + tiempo real para los links de seguimiento (pedido/ y carrera/).
 *
 * Es una capa EXTRA encima de la imagen de Google que ya tienen las páginas: si el
 * celular no dibuja WebGL, si no baja la librería o si el estilo del mapa no responde,
 * no pasa nada — la imagen de siempre se queda (fail-open). MapLibre se descarga solo
 * cuando el navegador puede usarlo (4.x pide WebGL2; 3.x sirve con WebGL1).
 *
 * ⚠️ Los .js se cachean 1 año (nginx.conf): al cambiar este archivo hay que subir el
 *    ?v= en los <script src> de pedido/index.html y carrera/index.html.
 *
 * API (window.DewanVivo):
 *   mapa(contenedor, {onListo, onError})  → ctl.actualizar({origen, destino, moto, hacia, fase, historial})
 *                                            ctl.ruta(coordsLngLat|null) · ctl.centrar() · ctl.onManual = fn(bool)
 *   ruta(origen, destino, keyGoogle)     → Promise<{coords, metros, segundos}|null>  (Routes API; si no está
 *                                            encendida en el proyecto, se apaga sola 1 h y no molesta)
 *   eta({moto, destino, historial, rutaMetros, rutaSegundos}) → {metros, min, llegando, texto}
 *   velocidad(historial) → m/s | null
 *   realtime({url, key, canales:[{tabla, valor, cb}], onEstado}) → {cerrar, conectado}
 */
(function () {
  'use strict';
  var ESTILO = 'https://tiles.openfreemap.org/styles/liberty';
  var CDN = 'https://cdn.jsdelivr.net/npm/maplibre-gl@';

  // ---------- utilidades ----------
  function metros(a, b) {
    var R = 6371000, r = Math.PI / 180;
    var la1 = a.lat * r, la2 = b.lat * r, dla = (b.lat - a.lat) * r, dlo = (b.lng - a.lng) * r;
    var h = Math.sin(dla / 2) * Math.sin(dla / 2) + Math.cos(la1) * Math.cos(la2) * Math.sin(dlo / 2) * Math.sin(dlo / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function rumbo(a, b) {
    var r = Math.PI / 180, la1 = a.lat * r, la2 = b.lat * r, dlo = (b.lng - a.lng) * r;
    var y = Math.sin(dlo) * Math.cos(la2), x = Math.cos(la1) * Math.sin(la2) - Math.sin(la1) * Math.cos(la2) * Math.cos(dlo);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }
  function soporta() {
    try {
      var c = document.createElement('canvas');
      if (c.getContext('webgl2')) return 'webgl2';
      if (c.getContext('webgl') || c.getContext('experimental-webgl')) return 'webgl1';
    } catch (e) {}
    return null;
  }
  var esperando = null;
  function cargarLib(ver, cb) {
    if (window.maplibregl) return cb(true);
    if (esperando) { esperando.push(cb); return; }
    esperando = [cb];
    function avisar(ok) { var l = esperando || []; esperando = null; l.forEach(function (f) { try { f(ok); } catch (e) {} }); }
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = CDN + ver + '/dist/maplibre-gl.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = CDN + ver + '/dist/maplibre-gl.js'; js.async = true;
    js.onload = function () { avisar(!!window.maplibregl); };
    js.onerror = function () { avisar(false); };
    document.head.appendChild(js);
  }
  // ---------- descargas con REINTENTO ----------
  // Visto en producción: el servidor de mapas cierra conexiones de vez en cuando
  // (ERR_CONNECTION_CLOSED en un tile o un glifo). MapLibre NO reintenta y el mapa se queda
  // a medio cargar para siempre → se veía la foto de Google y "la moto no se mueve".
  // Todo lo que baja el mapa (estilo, tilejson, tiles, sprites, glifos) pasa por aquí.
  function fetchReintentos(url, intentos) {
    intentos = intentos || 3;
    return fetch(url, { cache: 'default' }).then(function (r) {
      if (r.status >= 500 && intentos > 1) throw new Error('HTTP ' + r.status);
      return r;
    }).catch(function (e) {
      if (intentos <= 1) throw e;
      var espera = 700 * (4 - intentos);
      return new Promise(function (res) { setTimeout(res, espera); }).then(function () { return fetchReintentos(url, intentos - 1); });
    });
  }
  var protocoloListo = false;
  function registrarProtocolo() {
    if (protocoloListo || !window.maplibregl || !maplibregl.addProtocol) return;
    protocoloListo = true;
    function bajar(params) {
      var url = String(params.url).replace(/^dv:\/\//, '');
      return fetchReintentos(url).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + url);
        if (params.type === 'json') return r.json();
        if (params.type === 'string') return r.text();
        return r.arrayBuffer();
      });
    }
    var v = String(maplibregl.version || '');
    if (/^[0-3]\./.test(v)) {
      // MapLibre 3: (params, callback) → {cancel}
      maplibregl.addProtocol('dv', function (params, cb) {
        bajar(params).then(function (d) { cb(null, d, null, null); }, function (e) { cb(e); });
        return { cancel: function () {} };
      });
    } else {
      // MapLibre 4+: (params, abortController) → Promise<{data}>
      maplibregl.addProtocol('dv', function (params) {
        return bajar(params).then(function (d) { return { data: d }; });
      });
    }
  }
  // Estilo con TODAS sus descargas pasando por dv:// (el tilejson se resuelve aquí para
  // que también los tiles queden cubiertos).
  function estiloConReintentos() {
    return fetchReintentos(ESTILO).then(function (r) { return r.json(); }).then(function (s) {
      var pre = function (u) { return /^https?:/.test(u) ? 'dv://' + u : u; };
      if (s.sprite) s.sprite = pre(s.sprite);
      if (s.glyphs) s.glyphs = pre(s.glyphs);
      var tareas = [];
      Object.keys(s.sources || {}).forEach(function (k) {
        var src = s.sources[k];
        if (src.tiles) { src.tiles = src.tiles.map(pre); return; }
        if (src.url && /^https?:/.test(src.url)) {
          tareas.push(fetchReintentos(src.url).then(function (r) { return r.json(); }).then(function (tj) {
            src.tiles = (tj.tiles || []).map(pre);
            if (tj.minzoom != null) src.minzoom = tj.minzoom;
            if (tj.maxzoom != null) src.maxzoom = tj.maxzoom;
            if (tj.bounds) src.bounds = tj.bounds;
            if (tj.attribution) src.attribution = tj.attribution;
            delete src.url;
          }));
        }
      });
      return Promise.all(tareas).then(function () { return s; });
    });
  }
  // MapLibre posiciona el marcador con `transform` sobre el elemento → lo que gira o se
  // dibuja va en un hijo, nunca en el elemento del marcador.
  function pin(etq, color) {
    var w = document.createElement('div');
    w.style.cssText = 'width:26px;height:30px;position:relative';
    var el = document.createElement('div');
    el.style.cssText = 'position:absolute;left:0;top:0;width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);' +
      'background:' + color + ';box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center';
    var s = document.createElement('span');
    s.style.cssText = 'transform:rotate(45deg);color:#fff;font:800 12px system-ui,-apple-system,sans-serif';
    s.textContent = etq;
    el.appendChild(s); w.appendChild(el);
    return w;
  }
  // Pines con dibujo: casita para la entrega, negocio (con su LOGO si lo tiene) para el
  // local, caja para una recogida, carrito para una compra. Todo SVG: se ve igual en
  // cualquier teléfono (los emojis cambian de un celular a otro).
  var GLIFOS = {
    casa: '<path d="M12 3 3 11h2.2v9h5.3v-6h3v6h5.3v-9H21z"/>',
    local: '<path d="M3.5 4h17l1.5 4.5c0 1.4-1 2.5-2.4 2.5-1 0-1.8-.5-2.2-1.3-.4.8-1.2 1.3-2.2 1.3s-1.8-.5-2.2-1.3c-.4.8-1.2 1.3-2.2 1.3s-1.8-.5-2.2-1.3C6.2 10.5 5.4 11 4.4 11 3 11 2 9.9 2 8.5zM4 12.3c.7.4 1.6.5 2.4.2.7.4 1.6.5 2.4.2.8.4 1.7.4 2.4 0 .8.4 1.7.4 2.4 0 .8.4 1.7.4 2.4 0 .8.4 1.7.4 2.4 0 .7.4 1.6.5 2.4.2V20H4zm6 2.7v5h4v-5z"/>',
    recogida: '<path d="M12 2 3 6.5v11L12 22l9-4.5v-11zm0 2.3 6.2 3.1L12 10.5 5.8 7.4zM5 9l6 3v7.4l-6-3zm14 0v7.4l-6 3V12z"/>',
    compra: '<path d="M2 3h3.2l.7 3H22l-2.6 8H8.1l.4 2H19v2H6.9L4.2 5H2zm5.9 5 1.1 5h8.2l1.6-5z"/><circle cx="9" cy="20" r="1.8"/><circle cx="17" cy="20" r="1.8"/>'
  };
  function pinIcono(tipo, logo) {
    var color = tipo === 'casa' ? '#DC2D22' : '#2B2118';
    var w = document.createElement('div');
    w.style.cssText = 'width:40px;height:44px;position:relative';
    var cola = document.createElement('div');
    cola.style.cssText = 'position:absolute;left:14px;top:29px;width:12px;height:12px;background:' + color + ';transform:rotate(45deg);border-radius:2px';
    var bola = document.createElement('div');
    bola.style.cssText = 'position:absolute;left:3px;top:0;width:34px;height:34px;border-radius:50%;background:#fff;border:3px solid ' + color +
      ';box-shadow:0 2px 6px rgba(0,0,0,.35);overflow:hidden;display:flex;align-items:center;justify-content:center';
    function glifo() { bola.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="' + color + '">' + (GLIFOS[tipo] || GLIFOS.local) + '</svg>'; }
    if (logo) {
      var img = document.createElement('img');
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
      img.alt = ''; img.onerror = glifo; img.src = logo;
      bola.appendChild(img);
    } else glifo();
    w.appendChild(cola); w.appendChild(bola);
    return w;
  }
  // ---------- geometría sobre la ruta (para que la moto siga la CALLE) ----------
  function acumular(coords) {
    var a = [0];
    for (var i = 1; i < coords.length; i++) a.push(a[i - 1] + metros({ lng: coords[i - 1][0], lat: coords[i - 1][1] }, { lng: coords[i][0], lat: coords[i][1] }));
    return a;
  }
  // Punto de la ruta más cercano a p → a cuántos metros del inicio queda y a qué distancia está
  function proyectar(coords, acum, p) {
    var mejor = { m: 0, dist: Infinity }, k = Math.cos(p.lat * Math.PI / 180);
    for (var i = 1; i < coords.length; i++) {
      var ax = coords[i - 1][0], ay = coords[i - 1][1], bx = coords[i][0], by = coords[i][1];
      var vx = (bx - ax) * k, vy = by - ay, wx = (p.lng - ax) * k, wy = p.lat - ay;
      var L = vx * vx + vy * vy, t = L > 0 ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / L)) : 0;
      var q = { lng: ax + (bx - ax) * t, lat: ay + (by - ay) * t }, d = metros(p, q);
      if (d < mejor.dist) mejor = { m: acum[i - 1] + (acum[i] - acum[i - 1]) * t, dist: d };
    }
    return mejor;
  }
  function puntoEnRuta(coords, acum, m) {
    var n = coords.length, L = acum[n - 1];
    if (m <= 0) return { p: coords[0], b: rumbo({ lng: coords[0][0], lat: coords[0][1] }, { lng: coords[1][0], lat: coords[1][1] }) };
    if (m >= L) return { p: coords[n - 1], b: rumbo({ lng: coords[n - 2][0], lat: coords[n - 2][1] }, { lng: coords[n - 1][0], lat: coords[n - 1][1] }) };
    var i = 1; while (acum[i] < m) i++;
    var f = (m - acum[i - 1]) / ((acum[i] - acum[i - 1]) || 1), a = coords[i - 1], b = coords[i];
    return { p: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f], b: rumbo({ lng: a[0], lat: a[1] }, { lng: b[0], lat: b[1] }) };
  }
  function girarSuave(actual, objetivo, f) {
    var d = ((objetivo - actual + 540) % 360) - 180;
    return (actual + d * f + 360) % 360;
  }
  // Moto vista desde arriba (apunta al norte): ruedas, carrocería roja, motorizado con
  // casco y la caja de reparto atrás. Gira con el rumbo real.
  function iconoMoto() {
    var w = document.createElement('div');
    w.style.cssText = 'width:32px;height:52px';
    w.innerHTML = '<svg viewBox="0 0 40 64" width="32" height="52" style="display:block;overflow:visible;filter:drop-shadow(0 2px 3px rgba(0,0,0,.45))">' +
      '<ellipse cx="20" cy="33" rx="11" ry="27" fill="rgba(0,0,0,.14)"/>' +
      '<rect x="16.5" y="1" width="7" height="12" rx="3.5" fill="#2B2118"/>' +                 // rueda delantera
      '<rect x="15.5" y="51" width="9" height="12" rx="4" fill="#2B2118"/>' +                  // rueda trasera
      '<path d="M20 6c6 0 9 5 9 12v24c0 6-4 10-9 10s-9-4-9-10V18c0-7 3-12 9-12z" fill="#DC2D22"/>' + // carrocería
      '<path d="M13 22h14l-1.5 4h-11z" fill="#B3221A"/>' +                                      // escudo delantero
      '<rect x="6" y="14" width="28" height="3.2" rx="1.6" fill="#2B2118"/>' +                  // manubrio
      '<path d="M11 24c0-3 4-4 9-4s9 1 9 4v9c0 3-4 5-9 5s-9-2-9-5z" fill="#3B2F26"/>' +        // hombros / chaqueta
      '<circle cx="20" cy="26" r="6.6" fill="#F6F3EF"/><path d="M13.6 25.2a6.6 6.6 0 0 1 12.8 0z" fill="#DC2D22"/>' + // casco
      '<rect x="10" y="40" width="20" height="14" rx="3" fill="#2B2118"/><rect x="12" y="42" width="16" height="3" rx="1.5" fill="#5E534B"/>' + // caja de reparto
      '</svg>';
    return w;
  }
  function coleccion(coords) {
    return { type: 'FeatureCollection', features: (coords && coords.length > 1) ? [{ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } }] : [] };
  }
  // Ruta pedida hace un rato: se recorta desde el punto más cercano a la moto para que
  // no quede un "rabo" detrás de ella.
  function recortar(coords, moto) {
    if (!coords || coords.length < 2 || !moto) return coords;
    var mejor = 0, md = Infinity;
    for (var i = 0; i < coords.length; i++) {
      var d = metros(moto, { lng: coords[i][0], lat: coords[i][1] });
      if (d < md) { md = d; mejor = i; }
    }
    if (md > 400) return coords; // la moto ya no va por esa ruta: se muestra tal cual hasta la próxima
    return [[moto.lng, moto.lat]].concat(coords.slice(mejor + 1));
  }

  // ---------- el mapa ----------
  function mapa(cont, op) {
    op = op || {};
    var ctl = { listo: false, onManual: null };
    var map = null, pendiente = null, rutaCoords = null, rutaAcum = null;
    var mkOrigen = null, mkDestino = null, mkMoto = null, posMoto = null, animId = null, rumboMoto = 0, ultimoGps = 0;
    var manual = false, manualHasta = 0, primerEncuadre = false, ultimoCam = 0, claveOrigen = '', claveDestino = '';

    ctl.actualizar = function (d) { pendiente = d; if (ctl.listo) aplicar(d); };
    ctl.ruta = function (c) {
      rutaCoords = (c && c.length > 1) ? c : null;
      rutaAcum = rutaCoords ? acumular(rutaCoords) : null;
      if (ctl.listo && pendiente) pintarRuta(pendiente);
    };
    ctl.centrar = function () { manual = false; manualHasta = 0; if (ctl.onManual) ctl.onManual(false); if (pendiente && ctl.listo) camara(pendiente, true); };
    ctl.motor = null;

    var sop = soporta();
    if (!sop) { setTimeout(function () { if (op.onError) op.onError('sin-webgl'); }, 0); return ctl; }
    ctl.motor = sop;
    cargarLib(sop === 'webgl2' ? '4.7.1' : '3.6.2', function (ok) {
      if (!ok) { if (op.onError) op.onError('sin-libreria'); return; }
      crear();
    });

    var intentosMapa = 0, cred = null;
    function crear() {
      intentosMapa++;
      registrarProtocolo();
      ctl.errores = ctl.errores || []; window.DewanVivo._ctl = ctl;
      estiloConReintentos().then(function (estilo) {
        if (map) { try { map.remove(); } catch (e) {} map = null; }
        mkOrigen = mkDestino = mkMoto = null; posMoto = null; primerEncuadre = false;
        try {
          map = new maplibregl.Map({
            container: cont, style: estilo, center: [-78.6543, -1.6636], zoom: 14.5, pitch: 55, bearing: 0,
            maxPitch: 65, pitchWithRotate: false, touchPitch: false, fadeDuration: 0, attributionControl: false
          });
        } catch (e) { if (op.onError) op.onError('crear'); return; }
        ctl._map = map;
        if (!cred) {
          // Créditos obligatorios del mapa (OpenStreetMap / OpenFreeMap), chiquitos y sin caja abierta
          cred = document.createElement('div');
          cred.style.cssText = 'position:absolute;right:6px;bottom:4px;z-index:2;font:500 9.5px/1.2 system-ui,-apple-system,sans-serif;' +
            'color:#5E534B;background:rgba(255,255,255,.75);border-radius:6px;padding:2px 6px;pointer-events:none';
          cred.textContent = '© OpenStreetMap · OpenFreeMap';
          cont.appendChild(cred);
        }
        armar();
      }).catch(function (e) {
        ctl.errores.push('estilo: ' + String(e && e.message || e).slice(0, 120));
        if (op.onError) op.onError('estilo');
      });
    }
    function armar() {
      // En una pestaña en segundo plano el navegador congela el dibujado y el mapa no
      // termina de cargar: ahí no es un error, solo hay que esperar a que se vea.
      // Con la pestaña a la vista y 20 s sin cargar: se REHACE el mapa una vez (conexiones
      // nuevas); si tampoco, se avisa y queda la foto de Google.
      function vencer() {
        if (ctl.listo) return;
        if (document.hidden) { t = setTimeout(vencer, 5000); return; }
        if (intentosMapa < 2) { ctl.errores.push('sin cargar en 20 s: se rehace'); crear(); return; }
        if (op.onError) op.onError('timeout');
      }
      var t = setTimeout(vencer, 20000);
      map.on('error', function (e) {
        var m = (e && e.error && e.error.message) || '';
        if (ctl.errores.length < 20) ctl.errores.push(m.slice(0, 160));
        if (!ctl.listo && /webgl/i.test(m)) { clearTimeout(t); if (op.onError) op.onError(m); }
      });
      map.on('load', function () {
        clearTimeout(t);
        try {
          if (map.getLayer('building-3d')) map.setLayoutProperty('building-3d', 'visibility', 'visible');
          map.addSource('dv-rastro', { type: 'geojson', data: coleccion([]) });
          map.addLayer({ id: 'dv-rastro', type: 'line', source: 'dv-rastro', layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': '#2B2118', 'line-width': 4, 'line-opacity': 0.3 } });
          map.addSource('dv-recta', { type: 'geojson', data: coleccion([]) });
          map.addLayer({ id: 'dv-recta', type: 'line', source: 'dv-recta', layout: { 'line-cap': 'round' },
            paint: { 'line-color': '#DC2D22', 'line-width': 3, 'line-dasharray': [1.5, 1.8], 'line-opacity': 0.7 } });
          map.addSource('dv-ruta', { type: 'geojson', data: coleccion([]) });
          map.addLayer({ id: 'dv-ruta', type: 'line', source: 'dv-ruta', layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': '#DC2D22', 'line-width': 5, 'line-opacity': 0.85 } });
        } catch (e) {}
        ['dragstart', 'zoomstart', 'rotatestart'].forEach(function (ev) {
          map.on(ev, function (e) {
            if (!e || !e.originalEvent) return; // solo lo que hace la persona, no la cámara automática
            manual = true; manualHasta = Date.now() + 45000;
            if (ctl.onManual) ctl.onManual(true);
          });
        });
        ctl.listo = true;
        if (op.onListo) op.onListo();
        if (pendiente) aplicar(pendiente);
      });
    }
    function setLinea(id, coords) { var s = map && map.getSource(id); if (s) s.setData(coleccion(coords)); }
    function marcador(mk, p, crear) {
      if (!p) { if (mk) mk.remove(); return null; }
      if (!mk) return new maplibregl.Marker({ element: crear(), anchor: 'bottom' }).setLngLat([p.lng, p.lat]).addTo(map);
      mk.setLngLat([p.lng, p.lat]);
      return mk;
    }
    function aplicar(d) {
      // el pin del origen se rehace si cambia su tipo o llega el logo del local
      var tipoO = d.origen ? (d.origen.tipo || (d.origen.etq === 'R' ? 'recogida' : 'local')) : '';
      var kO = d.origen ? tipoO + '|' + (d.origen.logo || '') : '';
      if (kO !== claveOrigen && mkOrigen) { mkOrigen.remove(); mkOrigen = null; }
      claveOrigen = kO;
      mkOrigen = marcador(mkOrigen, d.origen, function () { return pinIcono(tipoO, d.origen.logo); });
      var kD = d.destino ? (d.destino.tipo || 'casa') : '';
      if (kD !== claveDestino && mkDestino) { mkDestino.remove(); mkDestino = null; }
      claveDestino = kD;
      mkDestino = marcador(mkDestino, d.destino, function () { return pinIcono(kD || 'casa'); });
      if (d.moto && d.fase === 'moto') {
        var dest = [d.moto.lng, d.moto.lat];
        if (!mkMoto) {
          mkMoto = new maplibregl.Marker({ element: iconoMoto(), rotationAlignment: 'map', pitchAlignment: 'map', rotation: rumboMoto })
            .setLngLat(dest).addTo(map);
          posMoto = dest;
        } else animarMoto(dest);
        setLinea('dv-rastro', (d.historial || []).map(function (h) { return [h.lng, h.lat]; }));
      } else if (mkMoto) {
        mkMoto.remove(); mkMoto = null; posMoto = null;
        if (animId) { cancelAnimationFrame(animId); animId = null; }
        setLinea('dv-rastro', []);
      }
      pintarRuta(d);
      camara(d, false);
    }
    // La posición llega cada 10-20 s. Como las apps grandes: la moto se desliza de forma
    // CONTINUA durante todo el intervalo (llega al punto nuevo justo cuando se espera el
    // siguiente), va POR LA CALLE si hay ruta dibujada (se pega a ella y avanza sobre ella,
    // nada de cortar por las manzanas) y gira suave hacia su rumbo.
    function animarMoto(dest) {
      var ahora = performance.now();
      var desde = posMoto || dest, dO = { lat: desde[1], lng: desde[0] }, hO = { lat: dest[1], lng: dest[0] };
      var dist = metros(dO, hO);
      if (dist < 2) { ultimoGps = ahora; return; }
      // duración = lo que tardó en llegar este punto (entre 2,5 s y 25 s)
      var dur = ultimoGps ? Math.min(25000, Math.max(2500, ahora - ultimoGps)) : 3000;
      ultimoGps = ahora;
      if (dist > 800) { posMoto = dest; mkMoto.setLngLat(dest).setRotation(rumboMoto); return; } // GPS viejo: sin animar
      // ¿los dos puntos están sobre la ruta y el nuevo queda más adelante? → se anima SOBRE la ruta
      var camino = null;
      if (rutaCoords && rutaAcum) {
        var a = proyectar(rutaCoords, rutaAcum, dO), b = proyectar(rutaCoords, rutaAcum, hO);
        if (a.dist < 45 && b.dist < 45 && b.m > a.m + 1) camino = { m0: a.m, m1: b.m };
      }
      var rumboRecta = dist > 6 ? rumbo(dO, hO) : rumboMoto;
      var t0 = ahora;
      if (animId) cancelAnimationFrame(animId);
      var paso = function (t) {
        var k = Math.min(1, (t - t0) / dur), p, objetivo;
        if (camino) { var q = puntoEnRuta(rutaCoords, rutaAcum, camino.m0 + (camino.m1 - camino.m0) * k); p = q.p; objetivo = q.b; }
        else { p = [desde[0] + (dest[0] - desde[0]) * k, desde[1] + (dest[1] - desde[1]) * k]; objetivo = rumboRecta; }
        rumboMoto = girarSuave(rumboMoto, objetivo, 0.18);
        posMoto = p;
        mkMoto.setLngLat(p).setRotation(rumboMoto);
        if (k < 1) animId = requestAnimationFrame(paso); else { posMoto = p; animId = null; }
      };
      animId = requestAnimationFrame(paso);
    }
    function pintarRuta(d) {
      var objetivo = d.hacia === 'origen' ? d.origen : d.destino;
      var conMoto = d.moto && d.fase === 'moto';
      if (conMoto && rutaCoords && rutaCoords.length > 1) {
        setLinea('dv-ruta', recortar(rutaCoords, d.moto)); setLinea('dv-recta', []); return;
      }
      setLinea('dv-ruta', []);
      if (conMoto && objetivo) setLinea('dv-recta', [[d.moto.lng, d.moto.lat], [objetivo.lng, objetivo.lat]]);
      else if (!conMoto && d.origen && d.destino) setLinea('dv-recta', [[d.origen.lng, d.origen.lat], [d.destino.lng, d.destino.lat]]);
      else setLinea('dv-recta', []);
    }
    function encuadrar(pts, pitch, dur) {
      if (pts.length === 1) { map.easeTo({ center: pts[0], zoom: 16.2, pitch: pitch, bearing: 0, duration: dur }); return; }
      var alto = (cont.offsetHeight || 260), padV = alto < 320 ? 24 : 46;
      var b = new maplibregl.LngLatBounds(pts[0], pts[0]);
      pts.forEach(function (p) { b.extend(p); });
      // cameraForBounds calcula SIN inclinación. Al inclinar, la mitad de arriba de la
      // pantalla se va hacia el horizonte: por eso se deja MÁS margen arriba y no se acerca
      // de más — si se acerca, el punto de entrega se sale de la pantalla.
      var extra = pitch >= 40 ? Math.round(alto * 0.22) : 0;
      var cam = map.cameraForBounds(b, { padding: { top: padV + extra, bottom: padV, left: 40, right: 40 }, maxZoom: 16.4, bearing: 0 });
      if (!cam) return;
      map.easeTo({ center: cam.center, zoom: cam.zoom, bearing: 0, pitch: pitch, duration: dur, essential: true });
    }
    function dentroConMargen(p) {
      try {
        var b = map.getBounds(), sw = b.getSouthWest(), ne = b.getNorthEast();
        var mx = (ne.lng - sw.lng) * 0.14, my = (ne.lat - sw.lat) * 0.14;
        return p.lng > sw.lng + mx && p.lng < ne.lng - mx && p.lat > sw.lat + my && p.lat < ne.lat - my;
      } catch (e) { return false; }
    }
    function camara(d, forzar) {
      if (!map) return;
      var ahora = Date.now();
      if (manual && ahora < manualHasta && !forzar) return;
      if (manual && ahora >= manualHasta) { manual = false; if (ctl.onManual) ctl.onManual(false); }
      var objetivo = d.hacia === 'origen' ? d.origen : d.destino;
      if (d.fase === 'moto' && d.moto) {
        if (!objetivo) { if (!primerEncuadre || forzar) { primerEncuadre = true; encuadrar([[d.moto.lng, d.moto.lat]], 55, 0); } return; }
        var par = [[d.moto.lng, d.moto.lat], [objetivo.lng, objetivo.lat]];
        // Primero una vista general PLANA (se entiende de un vistazo dónde va la moto) y a
        // los 2,5 s la cámara baja a la vista inclinada, como las apps grandes.
        if (!primerEncuadre || forzar) {
          primerEncuadre = true; ultimoCam = ahora;
          encuadrar(par, 0, forzar ? 700 : 0);
          setTimeout(function () {
            if (!pendiente || manual || !pendiente.moto) return;
            var o2 = pendiente.hacia === 'origen' ? pendiente.origen : pendiente.destino;
            if (!o2) return;
            ultimoCam = Date.now();
            encuadrar([[pendiente.moto.lng, pendiente.moto.lat], [o2.lng, o2.lat]], 40, 1400);
          }, 2500);
          return;
        }
        if (ahora - ultimoCam < 2500) return;
        // La moto y el punto de entrega tienen que verse SIEMPRE los dos (el cliente quiere
        // ver cuánto falta para su casa). La cámara se queda quieta mientras ambos están
        // dentro con margen; solo se reencuadra cuando alguno se acerca al borde: así no
        // hay movimiento constante ni mareo.
        if (dentroConMargen(d.moto) && dentroConMargen(objetivo)) return;
        ultimoCam = ahora;
        encuadrar(par, 40, 1400);
        return;
      }
      var pts = [];
      if (d.origen) pts.push([d.origen.lng, d.origen.lat]);
      if (d.destino) pts.push([d.destino.lng, d.destino.lat]);
      if (!pts.length) return;
      if (!primerEncuadre || forzar || d.fase === 'fin') { primerEncuadre = true; encuadrar(pts, d.fase === 'fin' ? 0 : 30, forzar ? 900 : 0); }
    }
    return ctl;
  }

  // ---------- ruta por calles (Google Routes API, opcional) ----------
  function decodePolyline(s) {
    var pts = [], i = 0, lat = 0, lng = 0;
    while (i < s.length) {
      var b, sh = 0, r = 0;
      do { b = s.charCodeAt(i++) - 63; r |= (b & 0x1f) << sh; sh += 5; } while (b >= 0x20);
      lat += (r & 1) ? ~(r >> 1) : (r >> 1);
      sh = 0; r = 0;
      do { b = s.charCodeAt(i++) - 63; r |= (b & 0x1f) << sh; sh += 5; } while (b >= 0x20);
      lng += (r & 1) ? ~(r >> 1) : (r >> 1);
      pts.push([lng / 1e5, lat / 1e5]);
    }
    return pts;
  }
  var rutaCache = {};
  function ruta(o, d, key) {
    if (!key || !o || !d || !window.fetch) return Promise.resolve(null);
    try { var off = Number(sessionStorage.getItem('dv_ruta_off') || 0); if (off && Date.now() - off < 3600000) return Promise.resolve(null); } catch (e) {}
    var k = [o.lat.toFixed(4), o.lng.toFixed(4), d.lat.toFixed(4), d.lng.toFixed(4)].join(',');
    if (rutaCache[k]) return Promise.resolve(rutaCache[k]);
    return fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline' },
      body: JSON.stringify({
        origin: { location: { latLng: { latitude: o.lat, longitude: o.lng } } },
        destination: { location: { latLng: { latitude: d.lat, longitude: d.lng } } },
        travelMode: 'DRIVE', routingPreference: 'TRAFFIC_AWARE', languageCode: 'es-EC', units: 'METRIC'
      })
    }).then(function (r) {
      if (r.status === 403 || r.status === 400 || r.status === 404) { try { sessionStorage.setItem('dv_ruta_off', String(Date.now())); } catch (e) {} return null; }
      return r.ok ? r.json() : null;
    }).then(function (j) {
      var rt = j && j.routes && j.routes[0];
      if (!rt || !rt.polyline || !rt.polyline.encodedPolyline) return null;
      var res = { coords: decodePolyline(rt.polyline.encodedPolyline), metros: Number(rt.distanceMeters) || 0, segundos: parseInt(String(rt.duration || '0').replace('s', ''), 10) || 0 };
      rutaCache[k] = res;
      return res;
    }).catch(function () { return null; });
  }

  // ---------- "llega en X min" con la velocidad REAL de la moto ----------
  function velocidad(h) {
    if (!h || h.length < 2) return null;
    var ahora = Date.now(), pts = h.filter(function (p) { return ahora - p.t < 180000; });
    if (pts.length < 2) return null;
    var dt = (pts[pts.length - 1].t - pts[0].t) / 1000;
    if (dt < 15) return null;
    var dd = 0;
    for (var i = 1; i < pts.length; i++) dd += metros(pts[i - 1], pts[i]);
    return dd / dt;
  }
  function eta(a) {
    var recta = metros(a.moto, a.destino);
    var m = (a.rutaMetros && a.rutaMetros >= recta) ? a.rutaMetros : Math.round(recta * 1.3);
    var seg;
    if (a.rutaSegundos && a.rutaMetros) seg = a.rutaSegundos * (m / a.rutaMetros);
    else {
      var v = velocidad(a.historial);
      if (!v || v < 1.5) v = 5;            // parada o sin historial: 18 km/h de ciudad
      v = Math.min(11, Math.max(3, v));    // entre 11 y 40 km/h
      seg = m / v;
    }
    seg += 45; // parquear, bajarse, timbrar
    var min = Math.max(1, Math.round(seg / 60));
    return { metros: Math.round(m), min: min, llegando: recta < 150, texto: 'llega en ~' + min + ' min' };
  }

  // ---------- tiempo real (Supabase Realtime, protocolo Phoenix a pelo: sin librería) ----------
  function realtime(cfg) {
    var ws = null, ref = 0, cerrado = false, intentos = 0, hb = null, ok = false;
    function estado(v) { if (ok !== v) { ok = v; if (cfg.onEstado) cfg.onEstado(v); } }
    function conectar() {
      if (cerrado || !window.WebSocket) return;
      try {
        ws = new WebSocket(String(cfg.url).replace(/^http/, 'ws') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(cfg.key) + '&vsn=1.0.0');
      } catch (e) { return; }
      ws.onopen = function () {
        intentos = 0;
        var topic = 'realtime:dv-' + Math.random().toString(36).slice(2, 8);
        ws.send(JSON.stringify({ topic: topic, event: 'phx_join', ref: String(++ref), payload: { config: {
          broadcast: { self: false }, presence: { key: '' },
          postgres_changes: cfg.canales.map(function (c) { return { event: c.evento || 'UPDATE', schema: 'public', table: c.tabla, filter: (c.columna || 'id') + '=eq.' + c.valor }; })
        } } }));
        hb = setInterval(function () { try { ws.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: String(++ref) })); } catch (e) {} }, 25000);
      };
      ws.onmessage = function (ev) {
        var m; try { m = JSON.parse(ev.data); } catch (e) { return; }
        if (m.event === 'postgres_changes' && m.payload && m.payload.data) {
          // recién con el PRIMER evento real se confía en el canal (la tabla puede no estar publicada)
          estado(true);
          var t = m.payload.data.table, rec = m.payload.data.record;
          cfg.canales.forEach(function (c) {
            if (c.tabla === t && rec && String(rec[c.columna || 'id']) === String(c.valor)) { try { c.cb(rec, m.payload.data); } catch (e) {} }
          });
        }
      };
      ws.onclose = function () {
        clearInterval(hb); estado(false);
        if (!cerrado) setTimeout(conectar, Math.min(60000, 3000 * Math.pow(2, intentos++)));
      };
      ws.onerror = function () {};
    }
    conectar();
    return { cerrar: function () { cerrado = true; clearInterval(hb); try { if (ws) ws.close(); } catch (e) {} }, conectado: function () { return ok; } };
  }

  // ---------- avisar al cliente SIN gastar un mensaje de WhatsApp ----------
  // Tres cosas, de más a menos disponible:
  //   1. sonido (Web Audio) + vibración → solo mientras el link está abierto; el navegador
  //      exige que la persona haya TOCADO la pantalla antes, por eso hace falta el botón.
  //   2. notificación del sistema → si dio permiso; en Android sale aunque esté en otra
  //      pestaña o con el navegador de fondo. En iPhone (Safari) solo si agregó la página
  //      a la pantalla de inicio.
  //   3. pantalla encendida (Wake Lock) cuando la moto ya está cerca, para que no tenga
  //      que estar desbloqueando el teléfono. Chrome 84+ y Safari 16.4+.
  function avisos(cfg) {
    cfg = cfg || {};
    var clave = 'dv_avisos', claveHechos = 'dv_hechos_' + (cfg.clave || 'x');
    var ctx = null, activo = false, hechos = {}, lock = null;
    try { activo = localStorage.getItem(clave) === '1'; } catch (e) {}
    try { hechos = JSON.parse(localStorage.getItem(claveHechos) || '{}'); } catch (e) {}

    function guardarHechos() { try { localStorage.setItem(claveHechos, JSON.stringify(hechos)); } catch (e) {} }
    function audio() {
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { ctx = new AC(); } catch (e) { return null; }
      return ctx;
    }
    // Campanita de dos notas: se sintetiza, no hay archivo que descargar.
    function sonar(tono) {
      var c = audio();
      if (!c) return;
      if (c.state === 'suspended') { try { c.resume(); } catch (e) {} }
      var notas = tono === 'llego' ? [880, 1174, 1568] : (tono === 'suave' ? [660, 880] : [784, 1046]);
      var t0 = c.currentTime;
      notas.forEach(function (f, i) {
        var o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.value = f;
        var ini = t0 + i * 0.18;
        g.gain.setValueAtTime(0.0001, ini);
        g.gain.exponentialRampToValueAtTime(0.35, ini + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ini + 0.42);
        o.connect(g); g.connect(c.destination);
        o.start(ini); o.stop(ini + 0.45);
      });
    }
    function vibrar(patron) { try { if (navigator.vibrate) navigator.vibrate(patron || [200, 120, 200]); } catch (e) {} }
    function notificar(titulo, cuerpo) {
      try {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        var n = new Notification(titulo, { body: cuerpo, icon: cfg.icono || '/logo.png', tag: cfg.clave || 'dewan', renotify: true });
        n.onclick = function () { try { window.focus(); n.close(); } catch (e) {} };
      } catch (e) {}
    }
    return {
      activo: function () { return activo; },
      // Se llama DESDE EL BOTÓN (hace falta un toque real para que el navegador deje sonar)
      activar: function (cb) {
        activo = true;
        try { localStorage.setItem(clave, '1'); } catch (e) {}
        var c = audio();
        if (c && c.state === 'suspended') { try { c.resume(); } catch (e) {} }
        sonar('suave'); vibrar([120]);
        if ('Notification' in window && Notification.permission === 'default') {
          try {
            var p = Notification.requestPermission(function (r) { if (cb) cb(r); });
            if (p && p.then) p.then(function (r) { if (cb) cb(r); });
          } catch (e) { if (cb) cb('default'); }
        } else if (cb) cb(('Notification' in window) ? Notification.permission : 'no');
      },
      apagar: function () { activo = false; try { localStorage.setItem(clave, '0'); } catch (e) {} },
      // Cada aviso suena UNA sola vez por pedido (se recuerda en el teléfono)
      avisar: function (id, o) {
        if (!activo || hechos[id]) return false;
        hechos[id] = 1; guardarHechos();
        sonar(o && o.tono); vibrar(o && o.vibracion);
        if (o && o.titulo) notificar(o.titulo, o.cuerpo || '');
        return true;
      },
      // Pantalla encendida mientras la moto está por llegar
      pantalla: function (encendida) {
        try {
          if (!navigator.wakeLock) return;
          if (encendida && !lock && !document.hidden) {
            navigator.wakeLock.request('screen').then(function (l) {
              lock = l;
              l.addEventListener('release', function () { lock = null; });
            }).catch(function () {});
          } else if (!encendida && lock) { lock.release().catch(function () {}); lock = null; }
        } catch (e) {}
      }
    };
  }

  // Distancia de un punto a la ruta ya dibujada (al vértice más cercano: alcanza para
  // saber si la moto se salió del camino previsto y hay que volver a pedirla).
  function fueraDeRuta(coords, p) {
    if (!coords || !coords.length) return Infinity;
    var min = Infinity;
    for (var i = 0; i < coords.length; i++) {
      var d = metros(p, { lng: coords[i][0], lat: coords[i][1] });
      if (d < min) min = d;
    }
    return min;
  }

  window.DewanVivo = { version: '1', soporta: soporta, mapa: mapa, ruta: ruta, eta: eta, velocidad: velocidad, realtime: realtime, metros: metros, fueraDeRuta: fueraDeRuta, avisos: avisos };
  try { window.dispatchEvent(new Event('dewanvivo')); } catch (e) {}
})();
