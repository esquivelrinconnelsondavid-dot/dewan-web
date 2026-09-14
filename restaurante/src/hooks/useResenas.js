import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { cargarResenas, marcarResenasLeidas, esBaja } from '../lib/resenas';
import { showPushNotification, vibrar } from '../lib/notifications';

// Opiniones del local: carga inicial + tiempo real (INSERT/UPDATE en `resenas`
// filtrado por el local) + poll de respaldo cada 60 s. Igual que los pedidos, la
// opinión nueva entra sola; a diferencia de los pedidos NO suena la sirena: es una
// notificación corta + vibración. `sinLeer` alimenta el badge de la pestaña.
const POLL_MS = 60000;

function perteneceAlLocal(fila, restaurante) {
  if (!fila) return false;
  if (restaurante?.restaurante_id && fila.restaurante_id) return fila.restaurante_id === restaurante.restaurante_id;
  if (restaurante?.nombre && fila.restaurante) return String(fila.restaurante).trim().toLowerCase() === String(restaurante.nombre).trim().toLowerCase();
  return false;
}

export function useResenas(restaurante, dias = 90) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [noDisponible, setNoDisponible] = useState(false);
  const vistasRef = useRef(new Set());
  const primeraRef = useRef(true);

  const restauranteId = restaurante?.restaurante_id;
  const restauranteNombre = restaurante?.nombre;

  const cargar = useCallback(async ({ silencioso = false } = {}) => {
    if (!restauranteId && !restauranteNombre) return;
    if (!silencioso) setCargando(true);
    const { data, noDisponible: sinTabla } = await cargarResenas(restaurante, dias);
    setNoDisponible(sinTabla);
    setResenas(data);
    // Las que ya estaban al abrir no avisan; a partir de ahí, cualquier id nuevo sí.
    if (primeraRef.current) {
      for (const r of data) vistasRef.current.add(r.id);
      primeraRef.current = false;
    } else {
      for (const r of data) {
        if (!vistasRef.current.has(r.id)) {
          vistasRef.current.add(r.id);
          avisar(r);
        }
      }
    }
    setCargando(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restauranteId, restauranteNombre, dias]);

  const avisar = (r) => {
    const estrellas = Number(r.estrellas_comida) || Number(r.estrellas_entrega) || 0;
    const baja = esBaja(r);
    const titulo = baja ? '⚠️ Opinión que pide atención' : '⭐ Nueva opinión de un cliente';
    const cuerpo = `${'★'.repeat(estrellas)}${'☆'.repeat(Math.max(0, 5 - estrellas))} · ${r.cliente_nombre || 'Cliente'}${r.comentario ? ' — ' + String(r.comentario).slice(0, 60) : ''}`;
    try { showPushNotification(titulo, cuerpo); } catch {}
    try { vibrar(); } catch {}
  };

  useEffect(() => {
    primeraRef.current = true;
    vistasRef.current = new Set();
    cargar();
    const poll = setInterval(() => cargar({ silencioso: true }), POLL_MS);
    const onOnline = () => cargar({ silencioso: true });
    window.addEventListener('online', onOnline);
    return () => {
      clearInterval(poll);
      window.removeEventListener('online', onOnline);
    };
  }, [cargar]);

  // Tiempo real: mismo mecanismo que usePedidosRestaurante. Si la tabla no existe
  // el canal simplemente no recibe nada (no rompe).
  useEffect(() => {
    if (!restauranteId && !restauranteNombre) return undefined;
    const canal = supabase
      .channel(`resenas-${restauranteId || restauranteNombre}-${Date.now()}`)
      .on(
        'postgres_changes',
        restauranteId
          ? { event: '*', schema: 'public', table: 'resenas', filter: `restaurante_id=eq.${restauranteId}` }
          : { event: '*', schema: 'public', table: 'resenas' },
        (payload) => {
          const { eventType, new: nuevo, old: viejo } = payload;
          const ref = nuevo || viejo;
          if (!perteneceAlLocal(ref, restaurante)) return;
          if (eventType === 'INSERT') {
            setResenas((prev) => (prev.find((r) => r.id === nuevo.id) ? prev : [nuevo, ...prev]));
            if (!vistasRef.current.has(nuevo.id)) {
              vistasRef.current.add(nuevo.id);
              avisar(nuevo);
            }
          } else if (eventType === 'UPDATE') {
            setResenas((prev) => prev.map((r) => (r.id === nuevo.id ? { ...r, ...nuevo } : r)));
          } else if (eventType === 'DELETE') {
            setResenas((prev) => prev.filter((r) => r.id !== viejo.id));
          }
        }
      )
      .subscribe();
    return () => {
      try { supabase.removeChannel(canal); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restauranteId, restauranteNombre]);

  const marcarLeidas = useCallback(async (ids = null) => {
    const ahora = new Date().toISOString();
    // Optimista: el badge baja al instante; si el RPC falla se recarga y vuelve.
    setResenas((prev) => prev.map((r) => (!r.leida_at && (!ids || ids.includes(r.id)) ? { ...r, leida_at: ahora } : r)));
    try {
      await marcarResenasLeidas(restauranteId, ids);
    } catch (e) {
      console.warn('[resenas] marcar leídas', e);
      cargar({ silencioso: true });
    }
  }, [restauranteId, cargar]);

  const sinLeer = resenas.filter((r) => !r.leida_at).length;
  return { resenas, cargando, noDisponible, sinLeer, marcarLeidas, recargar: () => cargar({ silencioso: true }) };
}
