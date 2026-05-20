// useRestaurantesOnline
// -------------------------------------------------------------------
// Este hook idealmente debería consumir una RPC pública `restaurantes_online()`
// (a definir en una migración futura) que devuelva los restaurantes con al
// menos un dispositivo cuyo `ultimo_visto` esté dentro de los últimos 2 min.
//
// Mientras esa RPC no exista, este hook intenta hacer la consulta directa a
// `restaurante_dispositivos` JOIN con `restaurantes`. Como ambas tablas
// tienen RLS estricto, lo más probable es que con la clave anon esto
// devuelva data vacía o error — en ese caso el hook simplemente retorna
// una lista vacía y emite un warning. La feature queda deshabilitada de
// manera segura hasta que se implemente la RPC.
// -------------------------------------------------------------------
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';

const INTERVALO_MS = 30000; // recarga cada 30s
const VENTANA_MS = 2 * 60 * 1000; // 2 minutos

export function useRestaurantesOnline() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const advertenciaEmitidaRef = useRef(false);

  const cargar = useCallback(async () => {
    try {
      const desde = new Date(Date.now() - VENTANA_MS).toISOString();
      const { data, error: errSel } = await supabase
        .from('restaurante_dispositivos')
        .select('restaurante_id, ultimo_visto, restaurantes(nombre)')
        .gt('ultimo_visto', desde);

      if (errSel || data === null) {
        if (!advertenciaEmitidaRef.current) {
          console.warn(
            '[RESTAURANTES_ONLINE] requiere RPC publica restaurantes_online — feature deshabilitada hasta que se implemente'
          );
          advertenciaEmitidaRef.current = true;
        }
        setRestaurantes([]);
        setError(errSel || new Error('sin datos'));
        setCargando(false);
        return;
      }

      // Deduplicar por restaurante_id (un restaurante puede tener varios dispositivos)
      const mapa = new Map();
      for (const row of data) {
        if (!row.restaurante_id) continue;
        const nombre = row.restaurantes?.nombre || `Restaurante ${row.restaurante_id}`;
        const previo = mapa.get(row.restaurante_id);
        if (!previo || new Date(row.ultimo_visto) > new Date(previo.ultimo_visto)) {
          mapa.set(row.restaurante_id, {
            restaurante_id: row.restaurante_id,
            nombre,
            ultimo_visto: row.ultimo_visto,
          });
        }
      }
      setRestaurantes(Array.from(mapa.values()));
      setError(null);
    } catch (e) {
      if (!advertenciaEmitidaRef.current) {
        console.warn(
          '[RESTAURANTES_ONLINE] requiere RPC publica restaurantes_online — feature deshabilitada hasta que se implemente'
        );
        advertenciaEmitidaRef.current = true;
      }
      setRestaurantes([]);
      setError(e);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
    const id = setInterval(cargar, INTERVALO_MS);
    return () => clearInterval(id);
  }, [cargar]);

  return {
    restaurantes,
    total: restaurantes.length,
    cargando,
    error,
  };
}
