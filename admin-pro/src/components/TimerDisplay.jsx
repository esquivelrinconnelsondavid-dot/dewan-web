import { useTimer } from '../hooks/useTimer';

export default function TimerDisplay({ timerLanzamiento, compact = false }) {
  const { texto, expirado, restanteSeg } = useTimer(timerLanzamiento);
  const alerta = restanteSeg < 60 && !expirado;
  const color = expirado ? 'text-alerta' : alerta ? 'text-preparando' : 'text-encamino';
  return (
    <div className={`font-mono font-black ${color} ${compact ? 'text-base' : 'text-xl'} leading-none`}>
      {expirado ? '⏰ LANZAR' : texto}
    </div>
  );
}
