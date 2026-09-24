// El detalle del pedido llega como TEXTO: una línea por plato "2x Alitas BBQ — $6.50",
// notas ("📝 sin cebolla", "   📝 Ref: casa azul"), envases ("📦 Envases: $0.25"),
// pago ("💳 Efectivo") y premios. Para dibujar el ticket como las apps grandes
// (cantidad en negrita, extras indentados, la nota resaltada) se separa en partes.
// Misma regla que usa el link de seguimiento (pedido/index.html) y el cerebro.
const RE_ITEM = /^(\d+)\s*[xX×]\s*(.+?)(?:\s*[—–-]\s*\$?\s*([\d.,]+))?$/;

// 23-sep-2026: el bot del SISTEMA (Super Happy) no hace preguntas para no pasar de 2 mensajes;
// lo que quedó sin preguntar lo escribe al final del detalle: "⚠️ Por confirmar: a, b".
// Esa línea NO es una nota: el panel la saca del detalle y la muestra como recuadro rojo.
const RE_POR_CONFIRMAR = /^⚠️?\s*por confirmar\s*:\s*(.+)$/i;
// Texto del bot (lo que ve el cliente en el link) → pregunta para la operadora y frase para el WhatsApp.
const PENDIENTES = {
  'si las presas van juntas o individuales': {
    pregunta: '¿Las presas van juntas o individuales?',
    alCliente: '¿sus presas las desea juntas (una porción de papas para compartir) o individuales (cada presa con sus papas)?',
  },
  'el tamaño de la cola': {
    pregunta: '¿De qué tamaño es la cola?',
    alCliente: '¿de qué tamaño desea la cola?',
  },
  'sus datos para la factura': {
    pregunta: 'Pedir datos de factura: cédula o RUC, nombre y correo',
    alCliente: 'para su factura, ¿nos ayuda con su cédula o RUC, nombre y correo?',
  },
  'qué presas le enviamos': {
    pregunta: 'Qué presas enviar: la combinación que pidió no está permitida',
    alCliente: 'la combinación de presas que pidió no la tenemos, ¿qué presas le enviamos?',
  },
};

export function porConfirmar(txt) {
  const pendientes = [];
  const resto = [];
  String(txt || '').split('\n').forEach((raw) => {
    const m = raw.trim().match(RE_POR_CONFIRMAR);
    if (!m) { resto.push(raw); return; }
    m[1].split(',').map((x) => x.trim().replace(/\.$/, '')).filter(Boolean).forEach((x) => {
      const p = PENDIENTES[x.toLowerCase()];
      pendientes.push(p ? { ...p } : { pregunta: x.charAt(0).toUpperCase() + x.slice(1), alCliente: x + '?' });
    });
  });
  return { texto: resto.join('\n'), pendientes };
}

export function parsearDetalle(txt) {
  const items = [];
  const notas = [];
  const extras = [];
  let pago = '';
  String(txt || '').split('\n').forEach((raw) => {
    const l = raw.trim();
    if (!l) return;
    if (RE_POR_CONFIRMAR.test(l)) return; // va en su propio recuadro (porConfirmar)
    const m = l.match(RE_ITEM);
    if (m) {
      items.push({ q: Number(m[1]) || 1, n: m[2].trim(), p: m[3] ? Number(String(m[3]).replace(',', '.')) : null });
      return;
    }
    const mp = l.match(/^💳\s*(?:pago\s*:?\s*)?(.+)$/i) || l.match(/^pago\s*:\s*(.+)$/i);
    if (mp) { pago = mp[1].trim(); return; }
    if (/^📦/.test(l) || /^(subtotal|total|env[ií]o)\b/i.test(l.replace(/^[^\w]+/, ''))) { extras.push(l); return; }
    // "📝 …" y "🎁 …" son notas del cliente o avisos: van resaltadas
    notas.push(l.replace(/^[📝🎁🍽️🥣]\s*/u, '').trim());
  });
  return { items, notas, extras, pago };
}

// La dirección guarda al final el link de Google Maps: para el ticket sobra.
export function limpiarDireccion(dir) {
  return String(dir || '').replace(/\s*·?\s*https?:\/\/\S+/g, '').trim();
}

export function telefonoLocal(tel) {
  const t = String(tel || '').replace(/\D/g, '');
  if (!t) return '';
  return t.startsWith('593') ? '0' + t.slice(3) : t;
}

// Canal por el que entró el pedido (prefijo de conversation_id).
export function canalPedido(pedido) {
  const c = String(pedido?.conversation_id || '');
  if (/^app(man)?:/.test(c)) return 'App';
  if (/^sistema:/.test(c) || /^web:/.test(c)) return 'Link';
  if (c) return 'WhatsApp';
  return '';
}

// Inicial y color estable para el avatar del cliente (igual que en la app cliente).
const MONO = ['#D93A0B', '#E0951A', '#B45309', '#166534', '#7C2D12', '#A16207'];
export function inicial(nombre) {
  const limpio = String(nombre || '').replace(/^(el|la|los|las|de|del)\s+/i, '').trim();
  return (limpio.charAt(0) || '?').toUpperCase();
}
export function colorInicial(nombre) {
  let s = 0;
  const n = String(nombre || '');
  for (let i = 0; i < n.length; i++) s += n.charCodeAt(i);
  return MONO[s % MONO.length];
}

export function haceCuanto(fecha) {
  if (!fecha) return '';
  const ms = Date.now() - new Date(fecha).getTime();
  if (!isFinite(ms) || ms < 0) return 'ahora';
  const min = Math.floor(ms / 60000);
  const seg = Math.floor((ms % 60000) / 1000);
  if (min >= 60) return `hace ${Math.floor(min / 60)} h ${min % 60} min`;
  return `hace ${min}:${String(seg).padStart(2, '0')}`;
}
