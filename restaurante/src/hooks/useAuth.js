import { useState, useEffect, useCallback } from 'react';
import { loginConCodigo, obtenerSesion, cerrarSesion, STORAGE_REST } from '../lib/auth';

export function useAuth() {
  const [restaurante, setRestaurante] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    // Render INMEDIATO con la sesión cacheada: evita la "pantalla negra"/spinner
    // largo en arranque frío con red lenta (las RPC de validación pueden colgarse).
    let teniaCache = false;
    try {
      const cache = JSON.parse(localStorage.getItem(STORAGE_REST) || 'null');
      if (cache && cache.restaurante_id) {
        teniaCache = true;
        setRestaurante(cache);
        setCargando(false);
      }
    } catch {
      // ignorar cache corrupta
    }
    // Validar/refrescar en segundo plano (no bloquea la pantalla).
    (async () => {
      const sesion = await obtenerSesion();
      if (!activo) return;
      if (sesion) {
        setRestaurante(sesion);
      } else if (!teniaCache) {
        setRestaurante(null);
      }
      // Si había cache y la validación falló (bache de internet), seguimos con la
      // cache: NO dejamos al local sin pantalla por un fallo de red temporal.
      setCargando(false);
    })();
    return () => {
      activo = false;
    };
  }, []);

  const login = useCallback(async (codigo, nombreDispositivo) => {
    const res = await loginConCodigo(codigo, nombreDispositivo);
    if (res) {
      setRestaurante(res);
      return res;
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    cerrarSesion();
    setRestaurante(null);
  }, []);

  const actualizar = useCallback((nuevoRestaurante) => {
    setRestaurante(nuevoRestaurante);
    try {
      localStorage.setItem(STORAGE_REST, JSON.stringify(nuevoRestaurante));
    } catch {
      // ignorar
    }
  }, []);

  return { restaurante, cargando, login, logout, actualizar };
}
