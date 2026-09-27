import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { hace, minutosDesde } from '../lib/time';
import { codigoPedido } from '../lib/pedidoNum';
import { ciudadActualId } from '../lib/ciudades';

// 🗺️ Dónde está cada moto. Misma base GRATIS que el link de seguimiento del cliente
// (MapLibre + OpenFreeMap: sin clave y sin cobro por uso). Las posiciones son las que
// ya trae data.motorizados (ubicacion_lat/lng), que useAdminData mantiene al día por
// realtime cada vez que una moto manda su GPS → esta pestaña no hace consultas nuevas.
// Fail-open: si el teléfono no dibuja el mapa (sin WebGL o sin red), la lista de abajo
// sigue sirviendo y cada moto tiene "Maps" para abrir su punto en Google Maps.

const ESTILO = 'https://tiles.openfreemap.org/styles/liberty';
const CDN = 'https://cdn.jsdelivr.net/npm/maplibre-gl@';
const CENTROS = { ri: [-78.6543, -1.6636], sc: [-72.225, 7.7669] }; // [lng, lat]
const RADIO_KM = 60;        // más lejos del centro de la ciudad = coordenada basura
const TRES_MIN = 3 * 60 * 1000; // el GPS en segundo plano reporta ~cada minuto
const VIEJO_MIN = 10;       // GPS de más de 10 min → marcador translúcido
const HORAS_TODOS = 12;     // "Todos": también los apagados con posición de las últimas 12 h
const EN_CURSO = ['aceptado', 'asignado', 'en_camino', 'en_camino_entrega', 'llegado', 'recogido'];

const ESTADOS = {
  pedido: { color: '#8b5cf6', txt: 'Con pedido', orden: 0 },
  libre: { color: '#10b981', txt: 'Libre', orden: 1 },
  sinSenal: { color: '#f59e0b', txt: 'Disponible sin señal', orden: 2 },
  apagado: { color: '#6b7280', txt: 'No disponible', orden: 3 },
};

function soporteWebgl() {
  try {
    const c = document.createElement('canvas');
    if (c.getContext('webgl2')) return 'webgl2';
    if (c.getContext('webgl') || c.getContext('experimental-webgl')) return 'webgl1';
  } catch {
    // sin canvas
  }
  return null;
}

// Una sola descarga de la librería para toda la app (4.x pide WebGL2; 3.x sirve con WebGL1).
let cargaLib = null;
function cargarMapLibre() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  if (cargaLib) return cargaLib;
  const sop = soporteWebgl();
  if (!sop) return Promise.reject(new Error('Este teléfono no puede dibujar el mapa (sin WebGL).'));
  const ver = sop === 'webgl2' ? '4.7.1' : '3.6.2';
  cargaLib = new Promise((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `${CDN}${ver}/dist/maplibre-gl.css`;
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.src = `${CDN}${ver}/dist/maplibre-gl.js`;
    js.async = true;
    js.onload = () => (window.maplibregl ? resolve(window.maplibregl) : reject(new Error('No bajó la librería del mapa.')));
    js.onerror = () => {
      cargaLib = null; // que "Reintentar" vuelva a intentarlo
      reject(new Error('No bajó la librería del mapa (¿sin internet?).'));
    };
    document.head.appendChild(js);
  });
  return cargaLib;
}

function km(a, b) {
  const r = Math.PI / 180;
  const dla = (b[1] - a[1]) * r;
  const dlo = (b[0] - a[0]) * r;
  const h = Math.sin(dla / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dlo / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

function coordsDe(m, centro) {
  const lat = Number(m.ubicacion_lat);
  const lng = Number(m.ubicacion_lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) return null;
  if (km(centro, [lng, lat]) > RADIO_KM) return null;
  return [lng, lat];
}

// Conectado = la señal MÁS NUEVA entre el latido (last_seen_at) y el GPS (updated_at).
// Visto el 27-sep: el GPS llega cada minuto pero el latido se atrasa 9-20 min en motos
// que estaban trabajando (Verónica, Sandra) → con solo el latido salían "sin señal".
function conectado(m) {
  const t = Math.max(m.last_seen_at ? new Date(m.last_seen_at).getTime() : 0, m.updated_at ? new Date(m.updated_at).getTime() : 0);
  return t > 0 && Date.now() - t < TRES_MIN;
}

function iniciales(nombre) {
  const p = String(nombre || '').trim().split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] || '?') + (p[1]?.[0] || '')).toUpperCase();
}

export default function MapaMotosTab({ data }) {
  const centro = CENTROS[ciudadActualId()] || CENTROS.ri;
  const [filtro, setFiltro] = useState('servicio'); // 'servicio' | 'todos'
  const [sel, setSel] = useState(null);
  const [errorMapa, setErrorMapa] = useState('');
  const [intento, setIntento] = useState(0);
  const [mapaListo, setMapaListo] = useState(0); // sube cuando hay mapa → repinta las marcas
  const contRef = useRef(null);
  const mapRef = useRef(null);
  const marcasRef = useRef(new Map()); // id moto -> { marker, el }
  const encuadradoRef = useRef(false);

  // Pedido en curso de cada moto (para el color y para decir qué lleva).
  const pedidosPorMoto = useMemo(() => {
    const porMoto = new Map();
    for (const p of data.pedidos || []) {
      if (!p.motorizado_id || !EN_CURSO.includes(p.estado_pedido)) continue;
      const lista = porMoto.get(p.motorizado_id) || [];
      lista.push(p);
      porMoto.set(p.motorizado_id, lista);
    }
    return porMoto;
  }, [data.pedidos]);

  const motos = useMemo(() => {
    const lista = [];
    for (const m of data.motorizados || []) {
      if (!m.activo) continue;
      const pedidos = pedidosPorMoto.get(m.id) || [];
      const estado = pedidos.length ? 'pedido' : m.disponible ? (conectado(m) ? 'libre' : 'sinSenal') : 'apagado';
      const coords = coordsDe(m, centro);
      const minGps = m.updated_at ? minutosDesde(m.updated_at) : null;
      if (filtro === 'servicio' && estado === 'apagado') continue;
      // Sin pedido y sin señal en 12 h = cuenta fantasma (disponible pero nadie la usa): fuera.
      if (estado !== 'pedido' && (minGps == null || minGps > HORAS_TODOS * 60)) continue;
      lista.push({ m, estado, pedidos, coords, minGps, viejo: minGps == null || minGps > VIEJO_MIN });
    }
    lista.sort((a, b) => ESTADOS[a.estado].orden - ESTADOS[b.estado].orden || String(a.m.nombre).localeCompare(String(b.m.nombre)));
    return lista;
  }, [data.motorizados, pedidosPorMoto, filtro, centro]);

  const conteo = useMemo(() => {
    const c = { pedido: 0, libre: 0, sinSenal: 0, apagado: 0 };
    motos.forEach((x) => { c[x.estado] += 1; });
    return c;
  }, [motos]);

  // Crear el mapa una vez (y otra vez si se toca "Reintentar").
  useEffect(() => {
    let vivo = true;
    let espera = null;
    setErrorMapa('');
    cargarMapLibre()
      .then((maplibregl) => {
        if (!vivo || !contRef.current) return;
        const map = new maplibregl.Map({
          container: contRef.current,
          style: ESTILO,
          center: centro,
          zoom: 13,
          attributionControl: false,
          fadeDuration: 0,
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
        // Un tile suelto que falla no es para alarmar (MapLibre sigue). Solo si el mapa
        // no termina de cargar en 20 s se ofrece "Reintentar" (mismo criterio del link).
        let cargado = false;
        map.on('load', () => { cargado = true; });
        espera = setTimeout(() => {
          if (vivo && !cargado) setErrorMapa('El mapa no terminó de cargar (¿internet lento?).');
        }, 20000);
        mapRef.current = map;
        encuadradoRef.current = false;
        setMapaListo((n) => n + 1);
      })
      .catch((e) => vivo && setErrorMapa(e.message));
    return () => {
      vivo = false;
      clearTimeout(espera);
      marcasRef.current.forEach(({ marker }) => marker.remove());
      marcasRef.current.clear();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [intento, centro]);

  // Sincronizar marcas con las motos visibles (se mueven solas con cada GPS).
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = window.maplibregl;
    if (!map || !maplibregl) return;
    const vistas = new Set();
    for (const x of motos) {
      if (!x.coords) continue;
      vistas.add(x.m.id);
      let reg = marcasRef.current.get(x.m.id);
      if (!reg) {
        // MapLibre maneja la opacidad del elemento de la marca (la pisa en cada frame),
        // así que el círculo va ADENTRO y la translucidez del GPS viejo se aplica ahí.
        const el = document.createElement('div');
        el.style.cursor = 'pointer';
        const bola = document.createElement('div');
        bola.style.cssText =
          'width:32px;height:32px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;' +
          'justify-content:center;font:800 11px system-ui,sans-serif;color:#fff;' +
          'box-shadow:0 1px 5px rgba(0,0,0,.55)';
        el.appendChild(bola);
        el.addEventListener('click', (ev) => {
          ev.stopPropagation();
          setSel(x.m.id);
        });
        const marker = new maplibregl.Marker({ element: el }).setLngLat(x.coords).addTo(map);
        reg = { marker, el, bola };
        marcasRef.current.set(x.m.id, reg);
      }
      reg.marker.setLngLat(x.coords);
      reg.bola.textContent = iniciales(x.m.nombre); // textContent: el nombre nunca se interpreta como HTML
      reg.bola.style.background = ESTADOS[x.estado].color;
      reg.bola.style.opacity = x.viejo ? '0.45' : '1';
      reg.bola.style.outline = sel === x.m.id ? '3px solid #fde047' : 'none';
      reg.el.title = x.m.nombre || '';
    }
    marcasRef.current.forEach((reg, id) => {
      if (!vistas.has(id)) {
        reg.marker.remove();
        marcasRef.current.delete(id);
      }
    });
    if (!encuadradoRef.current && vistas.size) {
      encuadradoRef.current = true;
      encuadrar();
    }
  }, [motos, sel, mapaListo]); // eslint-disable-line react-hooks/exhaustive-deps

  const encuadrar = useCallback(() => {
    const map = mapRef.current;
    const maplibregl = window.maplibregl;
    const pts = motos.filter((x) => x.coords).map((x) => x.coords);
    if (!map || !maplibregl || !pts.length) return;
    if (pts.length === 1) {
      map.easeTo({ center: pts[0], zoom: 15 });
      return;
    }
    const b = new maplibregl.LngLatBounds(pts[0], pts[0]);
    pts.forEach((p) => b.extend(p));
    map.fitBounds(b, { padding: 50, maxZoom: 15, duration: 600 });
  }, [motos]);

  const irA = (x) => {
    setSel(x.m.id);
    if (x.coords && mapRef.current) mapRef.current.easeTo({ center: x.coords, zoom: 16 });
  };

  const elegido = motos.find((x) => x.m.id === sel) || null;

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {[
            ['servicio', 'En servicio'],
            ['todos', `Todos (${HORAS_TODOS} h)`],
          ].map(([id, txt]) => (
            <button
              key={id}
              onClick={() => setFiltro(id)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${
                filtro === id ? 'bg-dewan/20 border-dewan text-dewan' : 'border-borde text-gray-400'
              }`}
            >
              {txt}
            </button>
          ))}
        </div>
        <button onClick={encuadrar} className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-borde text-gray-300">
          ⤢ Ver todas
        </button>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
        {Object.entries(ESTADOS).map(([id, e]) =>
          filtro === 'servicio' && id === 'apagado' ? null : (
            <span key={id} className="flex items-center gap-1 text-gray-300">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
              {e.txt} <b className="text-white">{conteo[id]}</b>
            </span>
          ),
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden border border-borde bg-bg2" style={{ height: '52vh' }}>
        {/* Alto/ancho explícitos: el CSS de MapLibre le pone position:relative al contenedor
            (le gana a un "absolute inset-0") y sin alto propio el mapa quedaba en 0 px. */}
        <div ref={contRef} style={{ width: '100%', height: '100%' }} />
        <div className="absolute right-1.5 bottom-1 z-10 text-[9px] text-gray-700 bg-white/75 rounded px-1.5 pointer-events-none">
          © OpenStreetMap · OpenFreeMap
        </div>
        {errorMapa && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-bg2/95 p-4 text-center">
            <div className="text-sm text-gray-300">🗺️ {errorMapa}</div>
            <div className="text-[11px] text-gray-500">La lista de abajo sigue funcionando.</div>
            <button onClick={() => setIntento((n) => n + 1)} className="text-xs font-bold bg-dewan text-black rounded-lg px-4 py-2">
              Reintentar
            </button>
          </div>
        )}
      </div>

      {elegido && <FichaMoto x={elegido} onCerrar={() => setSel(null)} />}

      <div className="rounded-xl border border-borde divide-y divide-borde/50">
        {motos.length === 0 && (
          <div className="text-xs text-gray-500 px-3 py-4 text-center">
            {filtro === 'servicio' ? 'Ninguna moto en servicio ahora.' : 'Ninguna moto con posición reciente.'}
          </div>
        )}
        {motos.map((x) => (
          <button key={x.m.id} onClick={() => irA(x)} className="w-full text-left px-3 py-2 flex items-center gap-2 active:bg-white/5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: ESTADOS[x.estado].color }} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] text-white font-semibold truncate">{x.m.nombre?.trim() || `Moto #${x.m.id}`}</div>
              <div className="text-[11px] text-gray-400 truncate">
                {ESTADOS[x.estado].txt}
                {x.pedidos[0] ? ` · ${codigoPedido(x.pedidos[0])} ${x.pedidos[0].restaurante || ''}` : ''}
              </div>
            </div>
            <div className={`text-[10px] shrink-0 ${x.viejo ? 'text-yellow-500' : 'text-gray-500'}`}>
              {x.coords ? `📍 ${hace(x.m.updated_at)}` : 'sin ubicación'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function FichaMoto({ x, onCerrar }) {
  const tel = String(x.m.telefono || '').replace(/[^0-9+]/g, '');
  const [lng, lat] = x.coords || [];
  return (
    <div className="bg-tarjeta border border-borde rounded-xl p-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-bold text-white truncate">{x.m.nombre?.trim() || `Moto #${x.m.id}`}</div>
          <div className="text-[11px]" style={{ color: ESTADOS[x.estado].color }}>
            ● {ESTADOS[x.estado].txt}
            {x.estado === 'sinSenal' ? ' (app dormida: puede no ver los pedidos)' : ''}
          </div>
        </div>
        <button onClick={onCerrar} className="text-gray-500 text-lg leading-none px-1">×</button>
      </div>
      <div className="text-[11px] text-gray-400 space-y-0.5">
        <div>📍 Última ubicación: {x.coords ? hace(x.m.updated_at) : 'sin datos'}{x.viejo && x.coords ? ' (vieja)' : ''}</div>
        <div>📶 App viva: {x.m.last_seen_at ? hace(x.m.last_seen_at) : 'nunca'}</div>
        {x.pedidos.map((p) => (
          <div key={p.id} className="text-gray-300">
            📦 {codigoPedido(p)} · {p.restaurante || 'Carrera'} · {p.estado_pedido}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {tel && (
          <a href={`tel:${tel}`} className="flex-1 text-center text-xs font-bold bg-dewan text-black rounded-lg py-2">
            📞 Llamar
          </a>
        )}
        {x.coords && (
          <a
            href={`https://maps.google.com/?q=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center text-xs font-bold border border-borde text-gray-200 rounded-lg py-2"
          >
            🗺️ Maps
          </a>
        )}
      </div>
    </div>
  );
}
