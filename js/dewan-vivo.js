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
  function iconoMoto() {
    var w = document.createElement('div');
    w.style.cssText = 'width:26px;height:40px';
    w.innerHTML = '<svg viewBox="0 0 40 60" width="26" height="40" style="display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.45))">' +
      '<rect x="13" y="3" width="14" height="54" rx="7" fill="#DC2D22"/><rect x="7" y="44" width="26" height="7" rx="3.5" fill="#2B2118"/>' +
      '<circle cx="20" cy="24" r="9" fill="#2B2118"/><circle cx="20" cy="24" r="4" fill="#F6F3EF"/></svg>';
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
    var map = null, pendiente = null, rutaCoords = null;
    var mkOrigen = null, mkDestino = null, mkMoto = null, posMoto = null, animId = null, rumboMoto = 0;
    var manual = false, manualHasta = 0, primerEncuadre = false, ultimoCam = 0;

    ctl.actualizar = function (d) { pendiente = d; if (ctl.listo) aplicar(d); };
    ctl.ruta = function (c) { rutaCoords = c; if (ctl.listo && pendiente) pintarRuta(pendiente); };
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
      mkOrigen = marcador(mkOrigen, d.origen, function () { return pin((d.origen && d.origen.etq) || 'L', '#2B2118'); });
      mkDestino = marcador(mkDestino, d.destino, function () { return pin('E', '#DC2D22'); });
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
    // La posición llega cada 10-20 s: en vez de saltar, la moto se desliza hasta el punto nuevo.
    function animarMoto(dest) {
      var desde = posMoto || dest;
      var dist = metros({ lat: desde[1], lng: desde[0] }, { lat: dest[1], lng: dest[0] });
      if (dist < 1) return;
      if (dist > 6) rumboMoto = rumbo({ lat: desde[1], lng: desde[0] }, { lat: dest[1], lng: dest[0] });
      if (dist > 800) { posMoto = dest; mkMoto.setLngLat(dest).setRotation(rumboMoto); return; } // GPS viejo: sin animar
      var t0 = performance.now(), dur = Math.min(4000, Math.max(700, dist * 40));
      if (animId) cancelAnimationFrame(animId);
      var paso = function (t) {
        var k = Math.min(1, (t - t0) / dur), e = k * (2 - k);
        var p = [desde[0] + (dest[0] - desde[0]) * e, desde[1] + (dest[1] - desde[1]) * e];
        posMoto = p;
        mkMoto.setLngLat(p).setRotation(rumboMoto);
        if (k < 1) animId = requestAnimationFrame(paso); else { posMoto = dest; animId = null; }
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
