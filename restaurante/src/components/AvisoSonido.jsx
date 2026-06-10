import { useEffect, useState } from 'react';
import { suscribirEstadoAudio, unlockAudio, playSirena } from '../lib/notifications';

export default function AvisoSonido() {
  const [desbloqueado, setDesbloqueado] = useState(false);

  useEffect(() => suscribirEstadoAudio(setDesbloqueado), []);

  if (desbloqueado) return null;

  return (
    <button
      onClick={() => {
        unlockAudio();
        // sirena corta de confirmación
        setTimeout(() => playSirena(), 50);
      }}
      className="w-full bg-nuevo text-white font-bold py-3 px-4 text-sm flex items-center justify-center gap-2 animate-pulse"
    >
      🔊 Tocá aquí para activar el sonido (sin esto no sonará la alarma)
    </button>
  );
}
