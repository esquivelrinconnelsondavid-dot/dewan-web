import { useState, useEffect, useCallback } from 'react';
import { listarRestaurantes, obtenerMetricas } from '../lib/admin';

export function useRestaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [metricas, setMetricas] = useState(null);

  const refrescar = useCallback(async (busquedaActual) => {
    setCargando(true);
    const q = typeof busquedaActual === 'string' ? busquedaActual : busqueda;
    const [lista, m] = await Promise.all([
      listarRestaurantes(q),
      obtenerMetricas(),
    ]);
    setRestaurantes(Array.isArray(lista) ? lista : []);
    setMetricas(m || null);
    setCargando(false);
  }, [busqueda]);

  // Refresca cuando cambia la búsqueda (con un pequeño debounce).
  useEffect(() => {
    const t = setTimeout(() => {
      refrescar(busqueda);
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  // Refresco periódico de métricas y conteos online (cada 30s).
  useEffect(() => {
    const t = setInterval(() => {
      refrescar(busqueda);
    }, 30000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  return {
    restaurantes,
    busqueda,
    setBusqueda,
    cargando,
    metricas,
    refrescar: () => refrescar(busqueda),
  };
}
