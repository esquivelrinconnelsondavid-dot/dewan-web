import { useMemo } from 'react';
import { minutosDesde, HOY_ISO } from '../lib/time';

// ── Torre de control (patrón "gestión por excepción" de las apps grandes) ──
// La operadora NO debería buscar el problema en la lista completa: lo roto la
// busca a ella. Aquí se calculan las excepciones accionables y el semáforo de
// salud del marketplace (motos online vs pedidos activos + promedio del día).

const ESTADOS_EN_CURSO = new Set([
  'pendiente', 'pendiente_restaurante', 'preparando',
  'confirmado', 'aceptado', 'en_camino', 'en_camino_entrega', 'llegado',
]);

// Umbrales en minutos (ajustables con datos reales)
const MIN_SIN_MOTO = 5;       // confirmado sin que nadie acepte
const MIN_ACEPTADO_QUIETO = 12; // aceptó y no marca "en camino"
const MIN_ENTREGA_LARGA = 50; // pedido vivo demasiado tiempo (promesa ~40)

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
    if (p.estado_pedido === 'confirmado' && !p.motorizado_id && edad >= MIN_SIN_MOTO) {
      meter(p, '🚨', `SIN MOTO hace ${edad} min — asignar o avisar a la flota`, 0);
    } else if (p.estado_pedido === 'aceptado' && p.fecha_aceptado &&
               minutosDesde(p.fecha_aceptado) >= MIN_ACEPTADO_QUIETO) {
      meter(p, '🛵', `${p.nombre_moto || 'La moto'} aceptó hace ${minutosDesde(p.fecha_aceptado)} min y no sale — llamarla`, 2);
    } else if (edad >= MIN_ENTREGA_LARGA) {
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
    if (entregadosHoy.length) {
      const total = entregadosHoy.reduce((acc, p) => {
        const t = (new Date(p.fecha_entregado) - new Date(p.fecha_creacion)) / 60000;
        return acc + (isFinite(t) && t > 0 && t < 240 ? t : 0);
      }, 0);
      prom = Math.round(total / entregadosHoy.length);
    }
    let nivel = 'verde';
    if (nExcepciones > 0 || (activos > 0 && online === 0)) nivel = 'rojo';
    else if (online > 0 && activos > online * 2) nivel = 'amarillo';
    return { activos, online, prom, entregados: entregadosHoy.length, nivel };
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
      </span>
    </div>
  );
}
