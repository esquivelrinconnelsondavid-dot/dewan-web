import { ciudadActual } from './ciudades';

// Inicio del día actual en hora Ecuador (UTC-5), expresado como ISO UTC
// para comparar contra timestamps en Supabase.
// Ej: a las 20:00 EC del 24-may (= 01:00 UTC del 25-may) devuelve "2026-05-24T05:00:00.000Z"
// (medianoche EC del 24-may).
export const HOY_ISO = () => {
  const now = new Date();
  const ec = new Date(now.getTime() - 5 * 60 * 60 * 1000); // EC = UTC-5
  const fechaEC = ec.toISOString().split('T')[0]; // YYYY-MM-DD en hora EC
  return `${fechaEC}T05:00:00.000Z`; // 00:00 EC = 05:00 UTC
};

// Métricas "del día / Hoy": ¿el pedido pertenece al día EC de hoy?
// useAdminData carga pedidos con 12h de margen hacia atrás (para no perder pedidos
// en curso que cruzan medianoche). Sin recortar, los totales "Hoy/del día" mezclan
// carreras de AYER con las de hoy. Estos dos helpers cortan al día EC actual:
//   · entregadoHoy → ancla en fecha_entregado (cuándo se cerró) con fallback a creación;
//     para ingresos/comisiones/entregas del día (un pedido creado tarde ayer pero
//     entregado hoy cuenta HOY).
//   · creadoHoy → ancla en fecha_creacion (cuándo entró el pedido); para conteos "pedidos hoy".
export function entregadoHoy(p) {
  const ref = p?.fecha_entregado || p?.fecha_creacion;
  return !!ref && new Date(ref).getTime() >= new Date(HOY_ISO()).getTime();
}
export function creadoHoy(p) {
  return !!p?.fecha_creacion && new Date(p.fecha_creacion).getTime() >= new Date(HOY_ISO()).getTime();
}

export function minutosDesde(iso) {
  if (!iso) return 0;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
}

export function hace(iso) {
  if (!iso) return '';
  const m = minutosDesde(iso);
  if (m < 1) return 'ahora';
  if (m < 60) return `hace ${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h}h`;
  return new Date(iso).toLocaleDateString('es-EC');
}

export function fmtHora(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
}

export function fmtFecha(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleString('es-EC', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

// Moneda de la ciudad activa: RI "$1.40" (USD, 2 dec) · SC "$8.000" (COP, 0 dec).
export function money(n) {
  const c = ciudadActual();
  const v = Number(n) || 0;
  if (c.decimales === 0) {
    return `${c.simbolo}${Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }
  return `${c.simbolo}${v.toFixed(c.decimales)}`;
}
