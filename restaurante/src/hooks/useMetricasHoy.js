import { useState, useEffect, useCallback } from 'react';
import { supabase, consultarConTimeout } from '../lib/supabase';
import { marcarDatosOk } from '../lib/conexion';
import { inicioDelDiaECisoUtc } from '../lib/formato';

const HOY = () => inicioDelDiaECisoUtc();

const ESTADOS_EN_CURSO = [
  'preparando',
  'confirmado',
  'aceptado',
  'en_camino',
  'en_camino_entrega',
  'llegado',
];

const ESTADOS_ACEPTADOS = [...ESTADOS_EN_CURSO, 'entregado'];

// Comparación tolerante: hay pedidos viejos que llegan sin `restaurante_id`
// y solo traen el nombre como texto libre en `restaurante`.
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

export function useMetricasHoy(restaurante) {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const restauranteId = restaurante?.restaurante_id;
  const restauranteNombre = restaurante?.nombre;

  const cargar = useCallback(async () => {
    if (!restauranteId && !restauranteNombre) return;

    // Mismo patrón de filtro que usePedidosRestaurante: OR sobre restaurante_id
    // (nuevo) y restaurante (legacy).
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
      .gte('fecha_creacion', HOY());

    if (condiciones.length > 0) {
      query = query.or(condiciones.join(','));
    }

    const { data, error } = await consultarConTimeout(
      query.order('fecha_creacion', { ascending: false })
    );

    if (error) {
      console.error('[METRICAS] Error cargando:', error);
      setCargando(false);
      return;
    }

    setPedidos(data || []);
    marcarDatosOk();
    setCargando(false);
  }, [restauranteId, restauranteNombre]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Recargar cada 60s como respaldo.
  useEffect(() => {
    const id = setInterval(cargar, 60000);
    return () => clearInterval(id);
  }, [cargar]);

  // Realtime: nos suscribimos a cambios y refrescamos. Con reconexión: si el
  // WebSocket se cae (PC que durmió, bache de red) recreamos el canal con
  // backoff, igual que en usePedidosRestaurante.
  useEffect(() => {
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
        setPedidos((prev) => {
          if (prev.find((p) => p.id === nuevo.id)) return prev;
          return [nuevo, ...prev];
        });
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
        .channel(`metricas-hoy-${restauranteId || restauranteNombre}-${Date.now()}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'pedidos_delivery',
            filter: 'intencion=eq.pedido_comida',
          },
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
            cargar(); // recargar al reconectar para no perder el gap
          }
        });
      canalActual = canal;
    };

    crearCanal();

    const reconectar = () => {
      try { canalActual && supabase.removeChannel(canalActual); } catch {}
      intentos = 0;
      crearCanal();
      cargar();
    };
    window.addEventListener('online', reconectar);

    return () => {
      cancelado = true;
      window.removeEventListener('online', reconectar);
      try { canalActual && supabase.removeChannel(canalActual); } catch {}
    };
  }, [restauranteId, restauranteNombre, cargar]);

  const aceptados = pedidos.filter(esAceptado);
  const rechazados = pedidos.filter(esRechazado);
  const entregados = pedidos.filter(esEntregado);
  const enCurso = pedidos.filter(estaEnCurso);

  const total = pedidos.length;

  // Venta base del local (SIN markup DEWAN): precio_base_productos, o fallback
  // histórico monto_total - markup_dewan cuando precio_base_productos es null.
  const baseDe = (p) =>
    p.precio_base_productos !== null && p.precio_base_productos !== undefined
      ? num(p.precio_base_productos)
      : num(p.monto_total) - num(p.markup_dewan);

  const ingresosBruto = aceptados.reduce((acc, p) => acc + baseDe(p), 0);
  const comisionTotal = aceptados.reduce((acc, p) => acc + num(p.monto_comision), 0);
  const ingresosNeto = ingresosBruto - comisionTotal;
  const ticketPromedio = aceptados.length > 0 ? ingresosBruto / aceptados.length : 0;

  const tiemposPrep = aceptados
    .map((p) => num(p.tiempo_preparacion))
    .filter((t) => t > 0);
  const tiempoPrepPromedio =
    tiemposPrep.length > 0
      ? tiemposPrep.reduce((a, b) => a + b, 0) / tiemposPrep.length
      : 0;

  const tasaAceptacion = total > 0 ? (aceptados.length / total) * 100 : 0;

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
    cargando,
  };
}
