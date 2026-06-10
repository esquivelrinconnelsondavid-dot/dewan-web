const TZ_EC = 'America/Guayaquil';

// Lazy init para no crashear el módulo si el WebView no soporta la zona.
let _fmtHora, _fmtFecha, _fmtFechaCorta, _fmtIsoYmd;

function fmt(target, opts) {
  if (target[0]) return target[0];
  try {
    target[0] = new Intl.DateTimeFormat('es-EC', { timeZone: TZ_EC, ...opts });
  } catch {
    try {
      target[0] = new Intl.DateTimeFormat('en-US', { timeZone: TZ_EC, ...opts });
    } catch {
      target[0] = new Intl.DateTimeFormat(undefined, opts);
    }
  }
  return target[0];
}

const _hora = [];
const _fecha = [];
const _fechaCorta = [];
const _isoYmd = [];

export function formatHoraEC(fecha) {
  if (!fecha) return '--:--';
  try {
    return fmt(_hora, { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(fecha));
  } catch {
    return '--:--';
  }
}

export function formatFechaEC(fecha) {
  if (!fecha) return '';
  try {
    return fmt(_fecha, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(fecha));
  } catch {
    return '';
  }
}

export function formatFechaCortaEC(fecha) {
  if (!fecha) return '';
  try {
    return fmt(_fechaCorta, { day: '2-digit', month: 'short' }).format(new Date(fecha));
  } catch {
    return '';
  }
}

// Devuelve YYYY-MM-DD en zona Ecuador (sirve para filtrar pedidos del día).
export function fechaIsoEC(fecha = new Date()) {
  try {
    const f = fmt(_isoYmd, { year: 'numeric', month: '2-digit', day: '2-digit' });
    const partes = f.formatToParts(fecha);
    const y = partes.find((p) => p.type === 'year')?.value;
    const m = partes.find((p) => p.type === 'month')?.value;
    const d = partes.find((p) => p.type === 'day')?.value;
    if (y && m && d) return `${y}-${m}-${d}`;
  } catch {
    // fallback abajo
  }
  // Fallback: Ecuador = UTC-5 fijo, calculo manual.
  const offsetMs = -5 * 3600 * 1000;
  const ec = new Date(fecha.getTime() + offsetMs);
  return ec.toISOString().slice(0, 10);
}

// Devuelve el inicio del día actual en Ecuador como ISO UTC (para .gte() en Supabase).
// Ecuador no usa DST, está fijo en UTC-5.
export function inicioDelDiaECisoUtc(fecha = new Date()) {
  const ymd = fechaIsoEC(fecha);
  return `${ymd}T05:00:00.000Z`;
}

export function formatDinero(valor) {
  const n = Number(valor);
  if (!Number.isFinite(n)) return '—';
  return `$${n.toFixed(2)}`;
}

// Calcula cuánto recibe el restaurante del motorizado según quién paga la comisión.
// clientePaga = monto_total (precio CON markup DEWAN que pagó el cliente).
// base = venta real del local (SIN markup): precio_base_productos, o fallback
// histórico monto_total - markup_dewan cuando precio_base_productos es null.
// 'total' y 'recibe' se calculan sobre la base, no sobre lo que pagó el cliente.
export function calcularPagoAlRestaurante(pedido) {
  const clientePaga = Number(pedido?.monto_total) || 0;
  const base =
    pedido?.precio_base_productos !== null && pedido?.precio_base_productos !== undefined
      ? Number(pedido.precio_base_productos) || 0
      : clientePaga - (Number(pedido?.markup_dewan) || 0);
  const comision = Number(pedido?.monto_comision) || 0;
  const laPagaRestaurante = pedido?.comision_la_paga === 'restaurante';
  return {
    clientePaga,
    total: base,
    base,
    comision,
    laPagaRestaurante,
    recibe: laPagaRestaurante ? base - comision : base,
  };
}
