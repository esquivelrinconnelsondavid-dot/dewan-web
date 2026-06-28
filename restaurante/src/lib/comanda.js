// Impresión de comanda por Electron directo (sin PrintNode).
// Configurable por local: impresora + ancho (80/76/58mm o normal) + auto al aceptar.
import { calcularPagoAlRestaurante, formatDinero } from './formato';
import { MARCA, MODO_HP, codigoPedido } from './config';

// Nombre que va arriba del ticket: el pasado por el panel, o el del pedido, o el
// de la sesión guardada (sucursal logueada), y como último recurso la marca
// (Happy Pollo / DEWAN). Antes caía a 'DEWAN' fijo → en HP salía "DEWAN".
function nombreLocal(pedido, pasado) {
  if (pasado) return pasado;
  if (pedido && (pedido.restaurante || pedido.restaurante_nombre)) {
    return pedido.restaurante || pedido.restaurante_nombre;
  }
  try {
    const r = JSON.parse(localStorage.getItem('dewan_rest_data') || '{}');
    if (r && r.nombre) return r.nombre;
  } catch (e) { /* ignorar */ }
  return MARCA;
}

const LS_IMPRESORA = 'dewan_impresora';     // deviceName del SO
const LS_ANCHO = 'dewan_impresora_ancho';   // '80' | '76' | '58' | 'a4' | 'auto'
const LS_AUTO = 'dewan_impresora_auto';     // '1' | '0'
const LS_LIVIANO = 'dewan_impresora_liviano'; // '1' = sin negrita/sin emojis (impacto)

// Geometría por papel. El rollo físico es MÁS ancho que la franja imprimible
// (80mm→~72, 76mm impacto TM-U220→~63, 58mm→~48): el body se queda dentro de
// esa franja para que el borde derecho (precios, DELIVERY) no se recorte.
// minH evita páginas más anchas que altas (algunos drivers de Windows las
// rotan a landscape); guiones = largo de la línea separadora de texto.
const PAPEL = {
  '80': { maxW: '70mm', fs: 13, guiones: 32, minH: '90mm' },
  '76': { maxW: '60mm', fs: 12, guiones: 28, minH: '90mm' },
  '58': { maxW: '46mm', fs: 12, guiones: 22, minH: '70mm' },
  'a4': { maxW: '190mm', fs: 14, guiones: 40, minH: null },
  'auto': { maxW: '68mm', fs: 13, guiones: 32, minH: null, anchoAuto: true },
};

// ¿Estamos en la app de escritorio (Electron) con impresión disponible?
export function hayImpresion() {
  return !!(window.electronAPI && window.electronAPI.imprimirComanda);
}

export function getConfigImpresora() {
  return {
    deviceName: localStorage.getItem(LS_IMPRESORA) || '',
    ancho: localStorage.getItem(LS_ANCHO) || '80',
    auto: localStorage.getItem(LS_AUTO) !== '0', // por defecto ENCENDIDO
    liviano: localStorage.getItem(LS_LIVIANO) === '1', // por defecto APAGADO
  };
}

export function setConfigImpresora({ deviceName, ancho, auto, liviano }) {
  if (deviceName !== undefined) localStorage.setItem(LS_IMPRESORA, deviceName);
  if (ancho !== undefined) localStorage.setItem(LS_ANCHO, ancho);
  if (auto !== undefined) localStorage.setItem(LS_AUTO, auto ? '1' : '0');
  if (liviano !== undefined) localStorage.setItem(LS_LIVIANO, liviano ? '1' : '0');
}

export async function listarImpresoras() {
  if (!window.electronAPI || !window.electronAPI.listarImpresoras) return [];
  try { return await window.electronAPI.listarImpresoras(); } catch { return []; }
}

// Quita "surrogates" UTF-16 sueltos (mitad de un emoji que llegó corrupto del
// bot por un doble-encoding, ej. \uDC9D). Un solo carácter inválido rompía la
// impresión por Electron (encodeURIComponent/print del HTML lanza y deja la
// app en PANTALLA BLANCA). Conserva los pares válidos (emojis bien formados).
function quitarSurrogatesSueltos(str) {
  return str.replace(/[\uD800-\uDFFF]/g, (ch, i, s) => {
    const code = ch.charCodeAt(0);
    if (code <= 0xDBFF) {                     // alto: válido solo si le sigue un bajo
      const next = s.charCodeAt(i + 1);
      return next >= 0xDC00 && next <= 0xDFFF ? ch : '';
    }
    const prev = s.charCodeAt(i - 1);         // bajo: válido solo si le precede un alto
    return prev >= 0xD800 && prev <= 0xDBFF ? ch : '';
  });
}

function esc(s) {
  return quitarSurrogatesSueltos(String(s == null ? '' : s))
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Modo liviano: quita emojis y glyphs gráficos (se imprimen como IMAGEN a color
// → lentísimo y "trabado" en impresoras de impacto/matriz) pero mantiene los
// acentos del español. Reemplaza viñetas comunes por ASCII para no perder
// legibilidad (▸ → >, • → -, 📝 → *).
function limpiarTextoSimple(s) {
  return String(s == null ? '' : s)
    .replace(/[▸▹►‣◦]/g, '>')
    .replace(/[•·]/g, '-')
    .replace(/[—–]/g, '-')              // guiones largos → ASCII (deja "Combo - $6.90")
    .replace(/\u{1F4DD}/gu, '*')        // 📝
    .replace(/[^\x00-\xFF]/gu, '')      // fuera emojis/símbolos (deja áéíóúñü)
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+$/gm, '');
}

// Convierte el detalle del pedido (texto multilínea del bot) en HTML con cada
// PLATO claramente marcado y las notas/adicionales/envases indentados debajo,
// para que la cocina identifique los productos de un vistazo. Marca de plato:
// "•" (térmica) o "*" (liviano); los detalles van con "-".
function formatearItems(detalle, liviano) {
  const limp = liviano ? limpiarTextoSimple : (x) => x;
  const marca = liviano ? '* ' : '• ';
  const lineas = String(detalle == null ? '' : detalle)
    .split('\n')
    .map((l) => l.replace(/[ \t]{2,}/g, ' ').replace(/\s+$/, ''))
    .filter((l) => l.trim());
  if (lineas.length === 0) return '';
  // Un "plato" empieza con cantidad (ej. "1x Combo"). Si ninguna línea la trae
  // (formato viejo), tratamos cada línea como plato para no perder nada.
  const hayPlatos = lineas.some((l) => /^\s*\d+\s*[xX]\b/.test(l));
  return lineas
    .map((raw) => {
      const t = raw.trim();
      const esPlato = hayPlatos ? /^\s*\d+\s*[xX]\b/.test(t) : true;
      if (esPlato) return `<div class="plato">${marca}${esc(limp(t))}</div>`;
      const sinMarca = limp(t.replace(/^[\s>*•▸‣◦\u{1F4DD}\u{1F4E6}\-]+/u, '').trim());
      return `<div class="sub">- ${esc(sinMarca)}</div>`;
    })
    .join('');
}

function ahoraTexto() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// HTML de la comanda. Monospace tipo ticket; se adapta al ancho.
// `liviano`: para impresoras de impacto/matriz (lentas) — sin negrita masiva,
// sin emojis y separadores de TEXTO (un border de 1px rasterizado por GDI a
// ~144dpi sale entrecortado en una matriz de 9 agujas).
// El padding-bottom final es el AVANCE de papel que saca el último renglón más
// allá de la barra de corte (cabezal→corte: térmicas ~15mm, impacto ~28mm);
// sin él, el final del ticket queda DENTRO de la máquina. main.cjs mide
// document.body.scrollHeight, que ya incluye este padding.
export function construirComandaHTML(pedido, { ancho = '80', restauranteNombre = '', liviano = false } = {}) {
  const papel = PAPEL[ancho] || PAPEL['80'];
  const termica = ancho !== 'a4';
  const fs = papel.fs;
  // En liviano: limpiamos emojis del texto del bot y aplanamos los pesos. El
  // número de pedido y el total SÍ conservan negrita (tokens cortos no traban
  // la impresora; lo que la trababa eran emojis y negrita masiva).
  const limp = liviano ? limpiarTextoSimple : (x) => x;
  const wBold = liviano ? 400 : 700;
  const wBlack = liviano ? 400 : 900;
  const wBig = liviano ? 700 : 900;
  const bigFs = liviano ? fs + 5 : fs + 9;
  const restFs = liviano ? fs + 1 : fs + 3;
  const itemsFs = liviano ? fs : fs + 1;
  // OJO: 12mm bastan SOLO porque main.cjs suma +24px (~6mm) de colchón al alto
  // de página; si ese buffer se quita, el final vuelve a quedar dentro de la
  // impresora en térmicas de rasgado manual (cabezal→barra ~15mm).
  const feed = termica ? (liviano ? '28mm' : '12mm') : '8mm';
  const sep = liviano
    ? `<div class="sept">${'-'.repeat(papel.guiones)}</div>`
    : '<hr class="sep">';
  // En Happy Pollo (pedido propio sin motos DEWAN) un pedido SIN direccion_entrega
  // es RETIRO en el local — antes caía a 'PEDIDO' porque pedidos_hp no guarda
  // tipo_entrega. DEWAN mantiene 'PEDIDO' como respaldo (sus pedidos siempre traen
  // direccion_entrega, así que el fallback casi no aplica).
  const entrega = pedido.direccion_entrega
    ? 'DELIVERY'
    : (pedido.tipo_entrega || (MODO_HP ? 'RETIRO EN LOCAL' : 'PEDIDO'));
  const tiempo = pedido.tiempo_preparacion ? `${pedido.tiempo_preparacion} min` : '';

  // Precios (mismo cálculo que las tarjetas de la app). Se omite si no hay
  // monto. Compacto: el TOTAL va a fs+3 para no competir con el nº de pedido.
  const pago = calcularPagoAlRestaurante(pedido);
  const montoTotal = Number(pedido.monto_total) || 0;
  // En Happy Pollo el TOTAL es lo que cobra el local (sin comisión DEWAN).
  // Desglose: Productos = precio_base_productos (subtotal real del local);
  // Envio = total - productos (la app no guarda el envío aparte; en delivery la
  // diferencia es la carrera, ej. 27.35 - 25.60 = 1.75). En retiro la diferencia
  // es 0, así que la línea Envio no se muestra.
  const baseProd = Number(pedido.precio_base_productos) || 0;
  const envioHP = montoTotal > baseProd ? Math.round((montoTotal - baseProd) * 100) / 100 : 0;
  const bloquePrecios = MODO_HP
    ? (montoTotal > 0
        ? `${baseProd > 0 ? `<div class="row"><span class="lbl">Productos</span><span class="b">${formatDinero(baseProd)}</span></div>` : ''}${envioHP > 0 ? `<div class="row"><span class="lbl">Envio</span><span class="b">${formatDinero(envioHP)}</span></div>` : ''}<div class="row"><span class="tot">TOTAL</span><span class="tot">${formatDinero(montoTotal)}</span></div>`
        : '')
    : (pago.base > 0 ? `
    ${pago.laPagaRestaurante ? `<div class="lbl">Venta ${formatDinero(pago.base)} - Comision ${formatDinero(pago.comision)}</div>` : ''}
    <div class="row"><span class="tot">TOTAL</span><span class="tot">${formatDinero(pago.recibe)}</span></div>` : '');

  // Método de pago y factura (como Super Happy). Solo se imprimen si vienen en el pedido.
  const metodoPago = pedido.metodo_pago ? String(pedido.metodo_pago).trim() : '';
  const esTransfer = /transfer/i.test(metodoPago);
  const bloquePago = metodoPago ? `
    <div class="row"><span class="lbl">Pago</span><span class="b">${esc(limp(esTransfer ? 'TRANSFERENCIA' : metodoPago.toUpperCase()))}</span></div>
    ${esTransfer ? `<div class="lbl">** Verificar comprobante **</div>` : ''}` : '';
  const facturaDatos = pedido.factura_datos ? String(pedido.factura_datos).trim() : '';
  const bloqueFactura = facturaDatos ? `
    ${sep}
    <div class="b">FACTURA</div>
    <div class="sub">${esc(limp(facturaDatos)).replace(/\n/g, '<br>')}</div>` : '';

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body { background:#fff; }
    body { font-family:'Courier New',monospace; color:#000; font-size:${fs}px;
      line-height:${liviano ? 1.3 : 1.2};
      ${papel.anchoAuto ? `width:auto; max-width:${papel.maxW};` : `width:${papel.maxW};`}
      ${papel.minH ? `min-height:${papel.minH};` : ''}
      margin:${termica ? '0' : '0 auto'}; padding:${termica ? `2mm 1mm ${feed} 1mm` : `8mm 8mm ${feed} 8mm`}; }
    .c { text-align:center; }
    .big { font-size:${bigFs}px; font-weight:${wBig}; }
    .rest { font-size:${restFs}px; font-weight:${wBlack}; text-transform:uppercase; }
    .sep { border:none; border-top:1px dashed #000; margin:3px 0; }
    .sept { text-align:center; white-space:nowrap; overflow:hidden; }
    .row { display:flex; justify-content:space-between; gap:8px; align-items:baseline; }
    .idrow { margin:2px 0; }
    .plato { white-space:normal; overflow-wrap:break-word; font-weight:${wBold}; font-size:${itemsFs}px; margin-top:3px; padding-left:1.2em; text-indent:-1.2em; }
    .sub { white-space:normal; overflow-wrap:break-word; font-weight:400; font-size:${fs}px; padding-left:12px; }
    .lbl { font-weight:400; }
    .b { font-weight:${wBlack}; }
    .tot { font-size:${fs + 3}px; font-weight:${wBig}; }
    .fin { margin-top:3px; }
  </style></head><body>
    <div class="c rest">${esc(limp(nombreLocal(pedido, restauranteNombre)))}</div>
    <div class="c">COMANDA - ${ahoraTexto()}</div>
    <div class="row idrow"><span class="big">${esc(codigoPedido(pedido))}</span><span class="b">${esc(entrega)}</span></div>
    ${sep}
    ${formatearItems(pedido.detalle_pedido, liviano)}
    ${sep}
    <div class="row"><span class="lbl">Cliente:</span><span class="b">${esc(limp(pedido.cliente_nombre || '-'))}</span></div>
    ${tiempo ? `<div class="row"><span class="lbl">Tiempo:</span><span class="b">${esc(tiempo)}</span></div>` : ''}
    ${bloquePago}
    ${bloquePrecios}
    ${bloqueFactura}
    <div class="c fin">--- FIN ---</div>
  </body></html>`;
}

// Imprime la comanda de un pedido usando la config guardada.
// Devuelve { ok, motivo }.
export async function imprimirComanda(pedido, opts = {}) {
  if (!hayImpresion()) return { ok: false, motivo: 'no-electron' };
  const cfg = getConfigImpresora();
  const html = construirComandaHTML(pedido, { ancho: cfg.ancho, restauranteNombre: opts.restauranteNombre, liviano: cfg.liviano });
  const anchoMm = cfg.ancho === '58' ? 58 : cfg.ancho === '76' ? 76 : cfg.ancho === '80' ? 80 : null;
  const usarDefault = cfg.ancho === 'auto';
  // Si la impresora guardada ya no existe (Windows la renombra al reconectarla
  // por otro puerto: "POS80 (Copia 1)"), buscamos la pariente renombrada y si
  // no, caemos a la predeterminada — mejor que dejar que el auto-print falle
  // en silencio y la cocina se quede sin comanda. El listado puede tardar
  // (impresora de red offline): tope de 2.5s y seguimos con lo guardado.
  let deviceName = cfg.deviceName;
  if (deviceName) {
    try {
      const lista = await Promise.race([
        listarImpresoras(),
        new Promise((r) => setTimeout(() => r(null), 2500)),
      ]);
      if (Array.isArray(lista) && lista.length && !lista.some((p) => p.name === deviceName)) {
        const pariente = lista.find((p) => p.name.startsWith(deviceName));
        deviceName = pariente ? pariente.name : '';
      }
    } catch { /* si no se pudo listar, intentamos con el nombre guardado */ }
  }
  try {
    const r = await window.electronAPI.imprimirComanda({ html, deviceName, anchoMm, usarDefault, liviano: cfg.liviano });
    return { ok: !!(r && r.success), motivo: r && r.reason };
  } catch (e) {
    return { ok: false, motivo: String((e && e.message) || e) };
  }
}
