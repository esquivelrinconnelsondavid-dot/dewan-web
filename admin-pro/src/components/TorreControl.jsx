import { useMemo } from 'react';
import { minutosDesde, fmtHora, HOY_ISO } from '../lib/time';
import { viajeEstimadoMin, promesaDe, minutosTarde, aTiempo } from '../lib/puntualidad';

// ── Torre de control (patrón "gestión por excepción" de las apps grandes) ──
// La operadora NO debería buscar el problema en la lista completa: lo roto la
// busca a ella. Aquí se calculan las excepciones accionables y el semáforo de
// salud del marketplace (motos online vs pedidos activos + promedio del día).
//
// v2.3 (12-sep-2026, Fase 1 "tiempos como los grandes"): las reglas se miden
// contra la HORA PROMETIDA de cada pedido (SQL 016: creación + preparación +
// viaje estimado + 5) en vez de contra números fijos:
//   🛵 sigue en el local y, aunque saliera ya, no llega a la hora
//   🛣️ en camino más que el viaje estimado + 8 min
//   📍 marcó "llegué" hace 8+ min y no entrega
//   ⏰ pasó la hora prometida y sigue vivo
// Sin SQL 016 la promesa se estima igual en el cliente (lib/puntualidad.js).

const ESTADOS_EN_CURSO = new Set([
  'pendiente', 'pendiente_restaurante', 'preparando',
  'confirmado', 'aceptado', 'en_camino', 'en_camino_entrega', 'llegado',
]);

// Umbrales en minutos (ajustables con datos reales)
const MIN_SIN_MOTO = 5;            // confirmado sin que nadie acepte
const MIN_ACEPTADO_QUIETO = 20;    // sin promesa: aceptó y no marca "en camino" (mediana real 13)
const MIN_VIAJE_EXTRA = 8;         // en camino por encima del viaje estimado
const MIN_LLEGO_SIN_ENTREGAR = 8;  // "llegué" sin "entregado"
const MIN_ENTREGA_LARGA = 50;      // sin promesa: pedido vivo demasiado tiempo

export function calcularExcepciones({ pedidos, colgados, rechazados }) {
  const excepciones = [];
  const yaEsta = new Set();
  const meter = (p, emoji, motivo, orden) => {
    if (yaEsta.has(p.id)) return;
    yaEsta.add(p.id);
    excepciones.push({ p, emoji, motivo, orden });
  };

  (rechazados || []).forEach((p) => meter(p, '❌', `Rechazado por el local — reubicar o cancelar`, 0));
  (colgados || []).forEach((p) =>
    meter(p, '🏪', `Local no confirma hace ${minutosDesde(p.fecha_creacion)} min`, 1));

  (pedidos || []).forEach((p) => {
    if (!ESTADOS_EN_CURSO.has(p.estado_pedido)) return;
    const edad = minutosDesde(p.fecha_creacion);
    const viaje = viajeEstimadoMin(p);
    const prom = promesaDe(p);
    const hora = prom ? fmtHora(prom) : null;
    const tarde = minutosTarde(p); // > 0 = ya pasó la promesa
    const moto = p.nombre_moto?.trim() || 'La moto';

    if (p.estado_pedido === 'confirmado' && !p.motorizado_id && edad >= MIN_SIN_MOTO) {
      meter(p, '🚨', `SIN MOTO hace ${edad} min — asignar o avisar a la flota`, 0);
    } else if (p.fecha_llegada && !p.fecha_entregado && minutosDesde(p.fecha_llegada) >= MIN_LLEGO_SIN_ENTREGAR) {
      meter(p, '📍', `${moto} marcó "llegué" hace ${minutosDesde(p.fecha_llegada)} min y no entrega — revisar`, 2);
    } else if (p.fecha_en_camino && !p.fecha_llegada && minutosDesde(p.fecha_en_camino) >= viaje + MIN_VIAJE_EXTRA) {
      meter(p, '🛣️', `${moto} lleva ${minutosDesde(p.fecha_en_camino)} min en camino (viaje estimado ${viaje}) — llamarla`, 2);
    } else if (p.fecha_aceptado && !p.fecha_en_camino &&
               (prom ? Date.now() > prom.getTime() - viaje * 60000 : minutosDesde(p.fecha_aceptado) >= MIN_ACEPTADO_QUIETO)) {
      meter(p, '🛵', `${moto} sigue en el local hace ${minutosDesde(p.fecha_aceptado)} min${hora ? ` y ya no llega a las ${hora}` : ''} — llamarla`, 2);
    } else if (prom && tarde != null && tarde > 0 && p.estado_pedido !== 'pendiente') {
      meter(p, '⏰', `Prometido a las ${hora} · va ${tarde} min tarde — revisar`, 3);
    } else if (!prom && edad >= MIN_ENTREGA_LARGA) {
      meter(p, '⏱️', `Lleva ${edad} min sin entregarse — revisar`, 3);
    }
  });

  excepciones.sort((a, b) => a.orden - b.orden);
  return excepciones;
}

export function Semaforo({ pedidos, motorizados, nExcepciones }) {
  const s = useMemo(() => {
    const activos = (pedidos || []).filter((p) => ESTADOS_EN_CURSO.has(p.estado_pedido)).length;
    // Conectada = latido fresco (<2 min). Fallback si el latido no viaja: disponible sin bloqueo.
    const online = (motorizados || []).filter((m) => {
      if (m.bloqueado_por_deuda) return false;
      if (m.last_seen_at && Date.now() - new Date(m.last_seen_at).getTime() < 2 * 60000) return true;
      return !!m.disponible;
    }).length;
    // HOY_ISO() devuelve el ARRANQUE del día Ecuador como timestamp UTC → comparar por tiempo
    const inicioHoy = new Date(HOY_ISO()).getTime();
    const entregadosHoy = (pedidos || []).filter(
      (p) => p.estado_pedido === 'entregado' && p.fecha_entregado &&
             p.fecha_creacion && new Date(p.fecha_creacion).getTime() >= inicioHoy
    );
    let prom = null;
    let pctATiempo = null;
    if (entregadosHoy.length) {
      const total = entregadosHoy.reduce((acc, p) => {
        const t = (new Date(p.fecha_entregado) - new Date(p.fecha_creacion)) / 60000;
        return acc + (isFinite(t) && t > 0 && t < 240 ? t : 0);
      }, 0);
      prom = Math.round(total / entregadosHoy.length);
      const conMarca = entregadosHoy.map(aTiempo).filter((v) => v != null);
      if (conMarca.length) pctATiempo = Math.round((100 * conMarca.filter(Boolean).length) / conMarca.length);
    }
    let nivel = 'verde';
    if (nExcepciones > 0 || (activos > 0 && online === 0)) nivel = 'rojo';
    else if (online > 0 && activos > online * 2) nivel = 'amarillo';
    return { activos, online, prom, pctATiempo, entregados: entregadosHoy.length, nivel };
  }, [pedidos, motorizados, nExcepciones]);

  const estilos = {
    verde: 'bg-green-500/15 border-green-500 text-green-300',
    amarillo: 'bg-yellow-500/15 border-yellow-500 text-yellow-300',
    rojo: 'bg-red-600/20 border-red-500 text-red-300',
  }[s.nivel];
  const punto = { verde: '🟢', amarillo: '🟡', rojo: '🔴' }[s.nivel];

  return (
    <div className={`rounded-xl border px-3 py-2 flex items-center justify-between text-xs font-bold ${estilos}`}>
      <span>{punto} 🛵 {s.online} online · 📦 {s.activos} en curso</span>
      <span>
        {nExcepciones > 0 ? `🚨 ${nExcepciones} por atender` : '✅ sin pendientes'}
        {s.prom != null ? ` · ⏱️ ${s.prom}m prom (${s.entregados})` : ''}
        {s.pctATiempo != null ? ` · ${s.pctATiempo >= 80 ? '✅' : '⏰'} ${s.pctATiempo}% a tiempo` : ''}
      </span>
    </div>
  );
}

// Distintivo de promesa para la tarjeta del pedido:
//   en curso  → "⏱️ 20:45" (gris) o "⏰ 20:45 +7m" (rojo) si ya pasó
//   entregado → "✅ a tiempo" (verde) o "⏰ +12m tarde" (rojo)
export function BadgePromesa({ p }) {
  if (!p || p.estado_pedido === 'cancelado') return null;
  const prom = promesaDe(p);
  if (!prom) return null;
  const hora = fmtHora(prom);
  if (p.estado_pedido === 'entregado') {
    const ok = aTiempo(p);
    if (ok == null) return null;
    const t = minutosTarde(p);
    return ok
      ? <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-500/15 text-green-300">✅ a tiempo</span>
      : <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">⏰ +{t}m tarde</span>;
  }
  if (!ESTADOS_EN_CURSO.has(p.estado_pedido)) return null;
  const t = minutosTarde(p);
  return t != null && t > 0
    ? <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">⏰ {hora} +{t}m</span>
    : <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-gray-400">⏱️ {hora}</span>;
}
