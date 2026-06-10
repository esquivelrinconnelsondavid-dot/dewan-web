import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, consultarConTimeout } from '../lib/supabase';
import { marcarDatosOk } from '../lib/conexion';
import { startAlertLoop, stopAlertLoop, showPushNotification } from '../lib/notifications';
import { inicioDelDiaECisoUtc } from '../lib/formato';

const HOY = () => inicioDelDiaECisoUtc();

// Estados en los que el pedido aún le concierne al restaurante.
const ESTADOS_ABIERTOS = [
  'pendiente_restaurante',
  'preparando',
  'confirmado',
  'asignado',
  'aceptado',
  'en_camino_recogida',
  'en_camino_entrega',
  'en_camino',
  'recogido',
  'llegado',
];
const ESTADOS_EN_PROCESO = [
  'confirmado',
  'asignado',
  'aceptado',
  'en_camino_recogida',
  'en_camino_entrega',
  'en_camino',
  'recogido',
  'llegado',
];

// Si un pedido pendiente tiene menos de esto, lo consideramos "fresco" y disparamos
// alarma aunque venga de la carga inicial (caso: app cerrada cuando entró).
const MS_FRESCO = 2 * 60 * 1000;

function esPendienteFresco(p) {
  if (!p || p.estado_pedido !== 'pendiente_restaurante') return false;
  if (p.restaurante_aceptado || p.restaurante_rechazado) return false;
  const creado = p.fecha_creacion ? new Date(p.fecha_creacion).getTime() : 0;
  if (!creado) return false;
  return Date.now() - creado < MS_FRESCO;
}

// Comparación tolerante: hay pedidos viejos que llegan sin `restaurante_id`
// y solo traen el nombre como texto libre en `restaurante`.
function perteneceAlRestaurante(p, restauranteId, restauranteNombre) {
  if (p.restaurante_id && p.restaurante_id === restauranteId) return true;
  if (!p.restaurante_id && p.restaurante && restauranteNombre) {
    return p.restaurante.trim().toLowerCase() === restauranteNombre.trim().toLowerCase();
  }
  return false;
}

export function usePedidosRestaurante(restaurante) {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const conocidosRef = useRef(new Set());

  const restauranteId = restaurante?.restaurante_id;
  const restauranteNombre = restaurante?.nombre;

  const cargar = useCallback(async () => {
    if (!restauranteId && !restauranteNombre) return;

    // Hacemos un OR sobre restaurante_id (futuro) y restaurante (legacy).
    // El SDK acepta el filtro `or` con sintaxis "campo.op.valor,otro.op.valor".
    const condiciones = [];
    if (restauranteId) condiciones.push(`restaurante_id.eq.${restauranteId}`);
    if (restauranteNombre) {
      // Escapamos comas en el nombre para no romper el OR.
      const safe = restauranteNombre.replace(/,/g, '\\,');
      condiciones.push(`restaurante.eq.${safe}`);
    }

    let query = supabase
      .from('pedidos_delivery')
      .select('*')
      .eq('intencion', 'pedido_comida')
      .gte('fecha_creacion', HOY())
      .in('estado_pedido', ESTADOS_ABIERTOS);

    if (condiciones.length > 0) {
      query = query.or(condiciones.join(','));
    }

    const { data, error } = await consultarConTimeout(
      query.order('fecha_creacion', { ascending: false })
    );

    if (error) {
      console.error('[PEDIDOS] Error cargando:', error);
      setCargando(false);
      return;
    }

    setPedidos(data || []);
    marcarDatosOk(); // fetch OK → reinicia el watchdog/aviso de conexión
    // Para los pedidos que vienen en cargar(): los viejos los marcamos como
    // conocidos (no alarmar) pero los frescos (<2min) sí disparan alarma,
    // porque significa que entraron mientras la app estaba cerrada.
    (data || []).forEach((p) => {
      if (conocidosRef.current.has(p.id)) return;
      conocidosRef.current.add(p.id);
      if (esPendienteFresco(p)) {
        const monto = Number(p.monto_total) || 0;
        const cuerpo = monto > 0
          ? `$${monto.toFixed(2)} — ${p.cliente_nombre || 'Cliente'}`
          : (p.detalle_pedido || 'Pedido entrante').slice(0, 80);
        startAlertLoop(p.id, {
          title: `🔔 Nuevo pedido #${p.id}`,
          body: cuerpo,
        });
      }
    });
    setCargando(false);
  }, [restauranteId, restauranteNombre]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Realtime: nos suscribimos a todo `pedido_comida` y filtramos client-side
  // por restaurante. No es lo ideal a gran escala, pero el volumen actual lo
  // permite y evita la limitación de filtros simples del SDK realtime.
  useEffect(() => {
    if (!restauranteId && !restauranteNombre) return;

    let canalActual = null;
    let intentos = 0;
    let cancelado = false;

    const crearCanal = () => {
      if (cancelado) return;
      const canal = supabase
      .channel(`pedidos-restaurante-${restauranteId || restauranteNombre}-${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pedidos_delivery',
          filter: 'intencion=eq.pedido_comida',
        },
        (payload) => {
          const { eventType, new: nuevo, old: viejo } = payload;
          const ref = nuevo || viejo;
          if (!ref) return;
          if (!perteneceAlRestaurante(ref, restauranteId, restauranteNombre)) return;

          if (eventType === 'INSERT') {
            // Solo agregamos si está en un estado abierto.
            if (!ESTADOS_ABIERTOS.includes(nuevo.estado_pedido)) return;
            setPedidos((prev) => {
              if (prev.find((p) => p.id === nuevo.id)) return prev;
              return [nuevo, ...prev];
            });
            if (!conocidosRef.current.has(nuevo.id)) {
              conocidosRef.current.add(nuevo.id);
              if (nuevo.estado_pedido === 'pendiente_restaurante') {
                const monto = Number(nuevo.monto_total) || 0;
                const cuerpo = monto > 0
                  ? `$${monto.toFixed(2)} — ${nuevo.cliente_nombre || 'Cliente'}`
                  : (nuevo.detalle_pedido || 'Pedido entrante').slice(0, 80);
                startAlertLoop(nuevo.id, {
                  title: `🔔 Nuevo pedido #${nuevo.id}`,
                  body: cuerpo,
                });
              }
            }
          }

          if (eventType === 'UPDATE') {
            // Si dejó de estar abierto, lo sacamos de la lista.
            if (!ESTADOS_ABIERTOS.includes(nuevo.estado_pedido)) {
              setPedidos((prev) => prev.filter((p) => p.id !== nuevo.id));
              stopAlertLoop(nuevo.id);
              return;
            }
            setPedidos((prev) => {
              const existe = prev.find((p) => p.id === nuevo.id);
              if (!existe) return [nuevo, ...prev];
              return prev.map((p) => (p.id === nuevo.id ? { ...p, ...nuevo } : p));
            });
            // Si lo acaban de aceptar, paramos la alarma.
            if (nuevo.restaurante_aceptado && !viejo?.restaurante_aceptado) {
              stopAlertLoop(nuevo.id);
            }
          }

          if (eventType === 'DELETE') {
            setPedidos((prev) => prev.filter((p) => p.id !== viejo.id));
            stopAlertLoop(viejo.id);
          }
        }
      )
      .subscribe((status) => {
        console.log('[REALTIME]', status);
        if (status === 'CHANNEL_ERROR' || status === 'CLOSED' || status === 'TIMED_OUT') {
          intentos += 1;
          const delay = Math.min(30000, 1000 * Math.pow(2, intentos)); // 2,4,8,16,30s
          console.warn('[REALTIME] reintento en', delay, 'ms');
          try { supabase.removeChannel(canal); } catch {}
          setTimeout(() => crearCanal(), delay);
        } else if (status === 'SUBSCRIBED') {
          intentos = 0;
          // Recargar al reconectar para no perdernos eventos del gap
          cargar();
        }
      });
      canalActual = canal;
    };

    crearCanal();

    // Al abrir desde el push (cold start / background) o al volver a primer plano,
    // el WebSocket de realtime suele estar muerto/en backoff. Recreamos el canal y
    // recargamos para no operar sobre un socket zombi ni perder el INSERT del gap.
    let ocultoDesde = 0;
    const recrearYRecargar = () => {
      try { canalActual && supabase.removeChannel(canalActual); } catch {}
      intentos = 0;
      crearCanal();
      cargar();
    };
    const onAbrirDesdePush = () => recrearYRecargar();
    const onVisible = () => {
      if (document.visibilityState === 'hidden') {
        ocultoDesde = Date.now();
        return;
      }
      if (document.visibilityState !== 'visible') return;
      // Si estuvo oculto mucho rato, Android pudo reciclar el WebView y dejar el
      // frame negro/zombi: recarga dura para recuperar un render limpio.
      if (ocultoDesde && Date.now() - ocultoDesde > 30000) {
        ocultoDesde = 0;
        window.location.reload();
        return;
      }
      ocultoDesde = 0;
      recrearYRecargar();
    };
    window.addEventListener('dewan:abrir-desde-push', onAbrirDesdePush);
    document.addEventListener('visibilitychange', onVisible);
    // El SO avisa cuando vuelve la conectividad (Wi-Fi reconectó, cable, etc.):
    // el WebSocket viejo quedó muerto, así que recreamos canal y recargamos.
    window.addEventListener('online', recrearYRecargar);

    return () => {
      cancelado = true;
      window.removeEventListener('dewan:abrir-desde-push', onAbrirDesdePush);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', recrearYRecargar);
      try { canalActual && supabase.removeChannel(canalActual); } catch {}
    };
  }, [restauranteId, restauranteNombre, cargar]);

  // Respaldo: recargar cada 10s (antes 30s, gap muy grande para alarmas críticas).
  useEffect(() => {
    const id = setInterval(cargar, 10000);
    return () => clearInterval(id);
  }, [cargar]);

  const entrantes = pedidos.filter((p) => p.estado_pedido === 'pendiente_restaurante');
  const enPreparacion = pedidos.filter((p) => p.estado_pedido === 'preparando');
  const enProceso = pedidos.filter((p) => ESTADOS_EN_PROCESO.includes(p.estado_pedido));

  return { entrantes, enPreparacion, enProceso, cargando, recargar: cargar };
}
