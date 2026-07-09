import { ciudadActual } from './ciudades';

// Inicio del día actual en hora Ecuador (UTC-5), expresado como ISO UTC
// para comparar contra timestamps en Supabase.
// Ej: a las 20:00 EC del 24-may (= 01:00 UTC del 25-may) devuelve "2026-05-24T05:00:00.000Z"
// (medianoche EC del 24-may).
export const HOY_ISO = () => {
  const now = new Date();
  return `${new Date(now.getTime() - 300 * 60 * 1000).toISOString().split('T')[0]}T05:00:00.000Z`;
};

export function entregadoHoy(p) {
  const f = p?.fecha_entregado || p?.fecha_creacion;
  return !!f && new Date(f).getTime() >= new Date(HOY_ISO()).getTime();
}

export function creadoHoy(p) {
  return !!p?.fecha_creacion && new Date(p.fecha_creacion).getTime() >= new Date(HOY_ISO()).getTime();
}

export function minutosDesde(fecha) {
  return fecha ? Math.floor((Date.now() - new Date(fecha).getTime()) / 60000) : 0;
}

export function hace(fecha) {
  if (!fecha) return '';
  const min = minutosDesde(fecha);
  if (min < 1) return 'ahora';
  if (min < 60) return `hace ${min}m`;
  const h = Math.floor(min / 60);
  return h < 24 ? `hace ${h}h` : new Date(fecha).toLocaleDateString('es-EC');
}

export function fmtHora(fecha) {
  return fecha
    ? new Date(fecha).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })
    : '-';
}

// Moneda según la ciudad: USD con 2 decimales (RI) / COP sin decimales con
// separador de miles (SC).
export function money(n) {
  const c = ciudadActual();
  const v = Number(n) || 0;
  return c.decimales === 0
    ? `${c.simbolo}${Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    : `${c.simbolo}${v.toFixed(c.decimales)}`;
}
