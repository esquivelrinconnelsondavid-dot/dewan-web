// El detalle del pedido llega como TEXTO: una línea por plato "2x Alitas BBQ — $6.50",
// notas ("📝 sin cebolla", "   📝 Ref: casa azul"), envases ("📦 Envases: $0.25"),
// pago ("💳 Efectivo") y premios. Para dibujar el ticket como las apps grandes
// (cantidad en negrita, extras indentados, la nota resaltada) se separa en partes.
// Misma regla que usa el link de seguimiento (pedido/index.html) y el cerebro.
const RE_ITEM = /^(\d+)\s*[xX×]\s*(.+?)(?:\s*[—–-]\s*\$?\s*([\d.,]+))?$/;

export function parsearDetalle(txt) {
  const items = [];
  const notas = [];
  const extras = [];
  let pago = '';
  String(txt || '').split('\n').forEach((raw) => {
    const l = raw.trim();
    if (!l) return;
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
