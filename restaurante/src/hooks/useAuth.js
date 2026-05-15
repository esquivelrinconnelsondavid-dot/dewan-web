import { useState, useEffect, useCallback } from 'react';
import { loginConCodigo, obtenerSesion, cerrarSesion } from '../lib/auth';

export function useAuth() {
  const [restaurante, setRestaurante] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    (async () => {
      const sesion = await obtenerSesion();
      if (activo) {
        setRestaurante(sesion);
        setCargando(false);
      }
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

  return { restaurante, cargando, login, logout };
}
