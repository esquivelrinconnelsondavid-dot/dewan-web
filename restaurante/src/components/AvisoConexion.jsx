import { useEffect, useState } from 'react';
import { tiempoSinDatos } from '../lib/conexion';

// Barra discreta que aparece cuando hace rato que no llegan datos frescos
// (realtime caído Y poll sin responder). No mira el WebSocket directo, así que
// no parpadea por reconexiones normales: solo avisa si de verdad no llega nada.
export default function AvisoConexion() {
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const check = () => setStale(tiempoSinDatos() > 20000); // >20s sin datos
    check();
    const id = setInterval(check, 3000);
    return () => clearInterval(id);
  }, []);

  if (!stale) return null;

  return (
    <div className="bg-amber-500 text-black text-xs font-bold px-3 py-1.5 flex items-center justify-center gap-2">
      <span className="w-2 h-2 rounded-full bg-black/70 animate-pulse" />
      Reconectando… mostrando datos guardados
    </div>
  );
}
