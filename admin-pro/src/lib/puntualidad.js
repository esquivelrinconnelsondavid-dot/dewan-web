// Promesa de entrega — Fase 1 "tiempos como los grandes" (12-sep-2026).
// La BD (SQL 016) guarda hora_prometida / viaje_estimado_min / a_tiempo /
// minutos_tarde. Si el SQL todavía no corrió, todo cae a una estimación local con
// la misma fórmula (creación + preparación + viaje + 5): nada se rompe.

const VELOCIDAD_KMH = 18;
const FACTOR_RUTA = 1.3;
const COLCHON_MIN = 5;
const PREP_DEFAULT_MIN = 15;

export function viajeEstimadoMin(p) {
  if (p?.viaje_estimado_min) return Number(p.viaje_estimado_min);
  const km = Number(p?.distancia_km);
  if (!isFinite(km) || km <= 0) return 10;
  return Math.min(40, Math.max(4, Math.ceil((km * FACTOR_RUTA / VELOCIDAD_KMH) * 60)));
}

export function promesaDe(p) {
  if (p?.hora_prometida) return new Date(p.hora_prometida);
  const creacion = p?.fecha_creacion || p?.created_at;
  if (!creacion) return null;
  const prep = Number(p.tiempo_preparacion) || PREP_DEFAULT_MIN;
  return new Date(new Date(creacion).getTime() + (prep + viajeEstimadoMin(p) + COLCHON_MIN) * 60000);
}

// Minutos por encima de la promesa: contra fecha_entregado si ya se entregó,
// contra ahora si sigue vivo. Negativo = todavía va a tiempo. null = sin datos.
export function minutosTarde(p) {
  if (p?.minutos_tarde != null && p?.fecha_entregado) return Math.round(Number(p.minutos_tarde));
  const prom = promesaDe(p);
  if (!prom) return null;
  const fin = p.fecha_entregado ? new Date(p.fecha_entregado).getTime() : Date.now();
  return Math.floor((fin - prom.getTime()) / 60000);
}

export function aTiempo(p) {
  if (p?.a_tiempo != null) return !!p.a_tiempo;
  const t = minutosTarde(p);
  return t == null ? null : t <= 0;
}
