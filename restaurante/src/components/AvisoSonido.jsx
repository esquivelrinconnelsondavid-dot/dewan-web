import { useEffect, useState } from 'react';
import { estadoAudio, suscribirEstadoAudio, unlockAudio, playSirena } from '../lib/notifications';

export default function AvisoSonido() {
  // Estado inicial real: en la app nativa y en Electron el audio ya viene
  // armado desde el arranque, así la barra no parpadea ni un frame.
  const [desbloqueado, setDesbloqueado] = useState(() => estadoAudio() === 'running');

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
