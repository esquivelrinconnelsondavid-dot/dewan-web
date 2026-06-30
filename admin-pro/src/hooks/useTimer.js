import { useState, useEffect } from 'react';

export function useTimer(targetIso) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!targetIso) return { restanteMs: 0, restanteSeg: 0, expirado: true, texto: '--:--' };

  const target = new Date(targetIso).getTime();
  const diff = target - now;
  const expirado = diff <= 0;
  const restanteSeg = Math.max(0, Math.floor(diff / 1000));
  const mm = Math.floor(restanteSeg / 60);
  const ss = restanteSeg % 60;
  const texto = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;

  return { restanteMs: diff, restanteSeg, expirado, texto };
}

export function useTimerSubir(desdeIso) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!desdeIso) return { texto: '--', segundos: 0 };
  const seg = Math.max(0, Math.floor((now - new Date(desdeIso).getTime()) / 1000));
  const mm = Math.floor(seg / 60);
  const ss = seg % 60;
  const texto = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  return { texto, segundos: seg };
}
