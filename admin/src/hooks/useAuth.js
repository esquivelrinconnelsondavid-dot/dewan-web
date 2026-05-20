import { useState, useCallback } from 'react';
import { setPin, clearPin, listarRestaurantes } from '../lib/admin';

const STORAGE_KEY = 'dewan_admin_pin';

export function useAuth() {
  const [autenticado, setAutenticado] = useState(() => {
    try {
      return !!localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });
  const [verificando, setVerificando] = useState(false);
  const [error, setError] = useState(null);

  // login(pin): guarda el PIN y valida llamando a listarRestaurantes('').
  // Si la RPC retorna un array (aunque vacío) sin error, el PIN es correcto.
  // Si retorna null (error) o NO retorna array → inválido.
  const login = useCallback(async (pin) => {
    if (!pin || pin.length === 0) {
      setError('Ingrese un PIN');
      return false;
    }
    setVerificando(true);
    setError(null);
    setPin(pin);
    const resultado = await listarRestaurantes('');
    setVerificando(false);

    // La RPC con PIN inválido retorna 0 filas (array vacío). Para distinguir
    // "PIN correcto pero no hay restaurantes" de "PIN incorrecto", probamos
    // contra un valor conocido: si la BD tiene restaurantes y el PIN es
    // bueno, vendrán >0 filas. Si vienen 0, asumimos PIN inválido (en este
    // sistema hay 181 restaurantes, así que el vacío es señal clara).
    if (resultado === null) {
      clearPin();
      setError('Error de conexión');
      return false;
    }
    if (!Array.isArray(resultado) || resultado.length === 0) {
      clearPin();
      setError('PIN incorrecto');
      return false;
    }
    setAutenticado(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    clearPin();
    setAutenticado(false);
  }, []);

  return { autenticado, verificando, error, login, logout };
}
