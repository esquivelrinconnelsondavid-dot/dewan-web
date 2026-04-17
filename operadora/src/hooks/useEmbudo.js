import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const HOY = () => new Date().toISOString().split('T')[0];

// Orden del embudo. Cada etapa "contiene" las anteriores:
// si un cliente confirmó, también agregó al carrito, también abrió, etc.
const RANK = {
  abrio: 1,
  eligio_gps: 2,
  eligio_sin_gps: 2,
  agrego_carrito: 3,
  abrio_carrito: 4,
  confirmo: 5,
};

export function useEmbudo() {
  const [sesiones, setSesiones] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    const { data, error } = await supabase
      .from('links_sesion')
      .select('token,etapa_actual,etapa_at,visto,visto_at')
      .gte('etapa_at', HOY());

    if (error) {
      console.error('[EMBUDO] Error:', error);
      setCargando(false);
      return;
    }
    setSesiones(data || []);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Realtime
  useEffect(() => {
    const canal = supabase
      .channel('embudo-links')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'links_sesion' },
        (payload) => {
          const { eventType, new: nuevo, old: viejo } = payload;
          if (eventType === 'INSERT' || eventType === 'UPDATE') {
            if (!nuevo.etapa_at || nuevo.etapa_at < HOY()) return;
            setSesiones((prev) => {
              const idx = prev.findIndex((s) => s.token === nuevo.token);
              if (idx >= 0) {
                const copia = [...prev];
                copia[idx] = { ...copia[idx], ...nuevo };
                return copia;
              }
              return [nuevo, ...prev];
            });
          }
          if (eventType === 'DELETE') {
            setSesiones((prev) => prev.filter((s) => s.token !== viejo.token));
          }
        }
      )
      .subscribe();

    return () => {
      canal.unsubscribe();
    };
  }, []);

  // Recarga periódica como respaldo
  useEffect(() => {
    const i = setInterval(cargar, 30000);
    return () => clearInterval(i);
  }, [cargar]);

  const contarEtapa = (minRank) =>
    sesiones.filter((s) => (RANK[s.etapa_actual] || 0) >= minRank).length;

  const abrieron = contarEtapa(1);
  const eligieronUbic = contarEtapa(2);
  const agregaron = contarEtapa(3);
  const vieronCarrito = contarEtapa(4);
  const confirmaron = contarEtapa(5);

  return {
    abrieron,
    eligieronUbic,
    agregaron,
    vieronCarrito,
    confirmaron,
    total: sesiones.length,
    cargando,
    recargar: cargar,
  };
}
