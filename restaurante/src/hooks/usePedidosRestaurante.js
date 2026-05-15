import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { startAlertLoop, stopAlertLoop, showPushNotification } from '../lib/notifications';

const HOY = () => new Date().toISOString().split('T')[0];

// Estados en los que el pedido aún le concierne al restaurante.
const ESTADOS_ABIERTOS = ['pendiente_restaurante', 'preparando'];

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

    const { data, error } = await query.order('fecha_creacion', { ascending: false });

    if (error) {
      console.error('[PEDIDOS] Error cargando:', error);
      setCargando(false);
      return;
    }

    setPedidos(data || []);
    // Carga inicial: marcamos todo como conocido para no alarmar al abrir.
    if (conocidosRef.current.size === 0) {
      (data || []).forEach((p) => conocidosRef.current.add(p.id));
    }
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

    const canal = supabase
      .channel(`pedidos-restaurante-${restauranteId || restauranteNombre}`)
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
                startAlertLoop(nuevo.id);
                showPushNotification(
                  `🔔 Nuevo pedido #${nuevo.id}`,
                  nuevo.detalle_pedido || 'Pedido entrante'
                );
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
      });

    return () => {
      canal.unsubscribe();
    };
  }, [restauranteId, restauranteNombre]);

  // Reconexión / respaldo: recargar cada 30s.
  useEffect(() => {
    const id = setInterval(cargar, 30000);
    return () => clearInterval(id);
  }, [cargar]);

  const entrantes = pedidos.filter((p) => p.estado_pedido === 'pendiente_restaurante');
  const enPreparacion = pedidos.filter((p) => p.estado_pedido === 'preparando');

  return { entrantes, enPreparacion, cargando, recargar: cargar };
}
