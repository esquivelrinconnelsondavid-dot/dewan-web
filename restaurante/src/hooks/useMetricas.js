import { useState, useEffect, useCallback } from 'react';
import { supabase, consultarConTimeout } from '../lib/supabase';
import { marcarDatosOk } from '../lib/conexion';
import { inicioDelDiaECisoUtc, fechaIsoEC } from '../lib/formato';

const ESTADOS_EN_CURSO = [
  'preparando',
  'confirmado',
  'aceptado',
  'en_camino',
  'en_camino_entrega',
  'llegado',
];
const ESTADOS_ACEPTADOS = [...ESTADOS_EN_CURSO, 'entregado'];

function perteneceAlRestaurante(p, restauranteId, restauranteNombre) {
  if (p.restaurante_id && p.restaurante_id === restauranteId) return true;
  if (!p.restaurante_id && p.restaurante && restauranteNombre) {
    return p.restaurante.trim().toLowerCase() === restauranteNombre.trim().toLowerCase();
  }
  return false;
}

function esAceptado(p) {
  if (p.restaurante_aceptado === true) return true;
  if (p.estado_pedido && ESTADOS_ACEPTADOS.includes(p.estado_pedido)) return true;
  return false;
}
function esRechazado(p) {
  if (p.restaurante_rechazado === true) return true;
  if (p.estado_pedido === 'cancelado') return true;
  return false;
}
function esEntregado(p) {
  return p.estado_pedido === 'entregado';
}
function estaEnCurso(p) {
  return p.estado_pedido && ESTADOS_EN_CURSO.includes(p.estado_pedido);
}
function num(v) {
  if (v === null || v === undefined) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// Calcula desde/hasta en ISO UTC según rango. Ecuador = UTC-5 fijo.
export function calcularRango(rango) {
  const ahora = new Date();
  const inicioHoyUtc = inicioDelDiaECisoUtc(ahora);

  if (rango === 'hoy') {
    return { desde: inicioHoyUtc, hasta: null, label: 'Hoy' };
  }
  if (rango === 'ayer') {
    const ayer = new Date(ahora.getTime() - 24 * 3600 * 1000);
    return {
      desde: inicioDelDiaECisoUtc(ayer),
      hasta: inicioHoyUtc,
      label: 'Ayer',
    };
  }
  if (rango === '7d') {
    const d = new Date(ahora.getTime() - 6 * 24 * 3600 * 1000);
    return { desde: inicioDelDiaECisoUtc(d), hasta: null, label: 'Últimos 7 días' };
  }
  if (rango === '30d') {
    const d = new Date(ahora.getTime() - 29 * 24 * 3600 * 1000);
    return { desde: inicioDelDiaECisoUtc(d), hasta: null, label: 'Últimos 30 días' };
  }
  return { desde: inicioHoyUtc, hasta: null, label: 'Hoy' };
}

export function useMetricas(restaurante, rango = 'hoy') {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const restauranteId = restaurante?.restaurante_id;
  const restauranteNombre = restaurante?.nombre;
  const { desde, hasta, label } = calcularRango(rango);

  // `silencioso` evita prender el spinner en recargas de fondo (poll, reconexión):
  // así el tab Ventas no parpadea cada minuto.
  const cargar = useCallback(async ({ silencioso = false } = {}) => {
    if (!restauranteId && !restauranteNombre) return;
    if (!silencioso) setCargando(true);

    const condiciones = [];
    if (restauranteId) condiciones.push(`restaurante_id.eq.${restauranteId}`);
    if (restauranteNombre) {
      const safe = restauranteNombre.replace(/,/g, '\\,');
      condiciones.push(`restaurante.eq.${safe}`);
    }

    let query = supabase
      .from('pedidos_delivery')
      .select('*')
      .eq('intencion', 'pedido_comida')
      .gte('fecha_creacion', desde);
    if (hasta) query = query.lt('fecha_creacion', hasta);

    if (condiciones.length > 0) query = query.or(condiciones.join(','));

    // Timeout: sin esto, un fetch sobre un socket muerto (PC que durmió, Wi-Fi
    // suspendido) deja `cargando` en true para siempre → spinner infinito en
    // Ventas ("no carga las ventas"). Al abortar, el poll de abajo reintenta.
    const { data, error } = await consultarConTimeout(
      query.order('fecha_creacion', { ascending: false })
    );
    if (error) {
      console.error('[METRICAS] Error:', error);
      setCargando(false);
      return;
    }
    setPedidos(data || []);
    marcarDatosOk();
    setCargando(false);
  }, [restauranteId, restauranteNombre, desde, hasta]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Poll de respaldo (silencioso, 30s): recupera Ventas si el fetch inicial
  // falló por red zombi, aunque no haya realtime (rangos históricos) o este se
  // haya caído. Antes no existía → un fallo dejaba el tab vacío hasta reiniciar.
  useEffect(() => {
    const id = setInterval(() => cargar({ silencioso: true }), 30000);
    return () => clearInterval(id);
  }, [cargar]);

  // Realtime solo cuando rango = hoy (caso típico que quiere ver actualizaciones),
  // con reconexión por backoff si el WebSocket se cae.
  useEffect(() => {
    if (rango !== 'hoy') return;
    if (!restauranteId && !restauranteNombre) return;

    let canalActual = null;
    let intentos = 0;
    let cancelado = false;

    const aplicarCambio = (payload) => {
      const { eventType, new: nuevo, old: viejo } = payload;
      const ref = nuevo || viejo;
      if (!ref) return;
      if (!perteneceAlRestaurante(ref, restauranteId, restauranteNombre)) return;

      if (eventType === 'INSERT') {
        setPedidos((prev) => (prev.find((p) => p.id === nuevo.id) ? prev : [nuevo, ...prev]));
      } else if (eventType === 'UPDATE') {
        setPedidos((prev) => {
          const existe = prev.find((p) => p.id === nuevo.id);
          if (!existe) return [nuevo, ...prev];
          return prev.map((p) => (p.id === nuevo.id ? { ...p, ...nuevo } : p));
        });
      } else if (eventType === 'DELETE') {
        setPedidos((prev) => prev.filter((p) => p.id !== viejo.id));
      }
    };

    const crearCanal = () => {
      if (cancelado) return;
      const canal = supabase
        .channel(`metricas-${rango}-${restauranteId || restauranteNombre}-${Date.now()}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'pedidos_delivery', filter: 'intencion=eq.pedido_comida' },
          aplicarCambio
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR' || status === 'CLOSED' || status === 'TIMED_OUT') {
            intentos += 1;
            const delay = Math.min(30000, 1000 * Math.pow(2, intentos));
            try { supabase.removeChannel(canal); } catch {}
            setTimeout(() => crearCanal(), delay);
          } else if (status === 'SUBSCRIBED') {
            intentos = 0;
            cargar({ silencioso: true });
          }
        });
      canalActual = canal;
    };

    crearCanal();

    const reconectar = () => {
      try { canalActual && supabase.removeChannel(canalActual); } catch {}
      intentos = 0;
      crearCanal();
      cargar({ silencioso: true });
    };
    window.addEventListener('online', reconectar);

    return () => {
      cancelado = true;
      window.removeEventListener('online', reconectar);
      try { canalActual && supabase.removeChannel(canalActual); } catch {}
    };
  }, [restauranteId, restauranteNombre, rango, cargar]);

  const aceptados = pedidos.filter(esAceptado);
  const rechazados = pedidos.filter(esRechazado);
  const entregados = pedidos.filter(esEntregado);
  const enCurso = pedidos.filter(estaEnCurso);

  // Venta base del local (SIN markup DEWAN): precio_base_productos, o fallback
  // histórico monto_total - markup_dewan cuando precio_base_productos es null.
  const baseDe = (p) =>
    p.precio_base_productos !== null && p.precio_base_productos !== undefined
      ? num(p.precio_base_productos)
      : num(p.monto_total) - num(p.markup_dewan);

  const total = pedidos.length;
  const ingresosBruto = aceptados.reduce((a, p) => a + baseDe(p), 0);
  const comisionTotal = aceptados.reduce((a, p) => a + num(p.monto_comision), 0);
  const ingresosNeto = ingresosBruto - comisionTotal;
  const ticketPromedio = aceptados.length > 0 ? ingresosBruto / aceptados.length : 0;

  const tiemposPrep = aceptados.map((p) => num(p.tiempo_preparacion)).filter((t) => t > 0);
  const tiempoPrepPromedio =
    tiemposPrep.length > 0 ? tiemposPrep.reduce((a, b) => a + b, 0) / tiemposPrep.length : 0;
  const tasaAceptacion = total > 0 ? (aceptados.length / total) * 100 : 0;

  // Serie diaria para rangos largos.
  const porDia = (() => {
    const m = new Map();
    for (const p of aceptados) {
      const dia = fechaIsoEC(new Date(p.fecha_creacion));
      const cur = m.get(dia) || { dia, ingresos: 0, pedidos: 0 };
      cur.ingresos += baseDe(p) - num(p.monto_comision);
      cur.pedidos += 1;
      m.set(dia, cur);
    }
    return Array.from(m.values()).sort((a, b) => a.dia.localeCompare(b.dia));
  })();

  return {
    pedidos,
    total,
    aceptados,
    rechazados,
    entregados,
    enCurso,
    ingresosBruto,
    comisionTotal,
    ingresosNeto,
    ticketPromedio,
    tiempoPrepPromedio,
    tasaAceptacion,
    porDia,
    rangoLabel: label,
    cargando,
    recargar: cargar,
  };
}
