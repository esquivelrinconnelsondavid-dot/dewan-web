import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// UN SOLO RELOJ para toda la app.
//
// Antes cada tarjeta montaba SUS PROPIOS setInterval de 1s (dos por tarjeta:
// useTimer + useTimerSubir, más el de TimerDisplay). Con 20-40 pedidos en
// pantalla eso son 40-80 setState POR SEGUNDO → React re-renderizaba la lista
// entera cada segundo y el hilo principal nunca quedaba libre: la operadora
// sentía la app "pegada" y no podía hacer scroll con varios pedidos.
//
// Ahora hay un único intervalo compartido y, además, la tarjeta solo se
// SUSCRIBE si de verdad está mostrando un contador (`activo`). Las tarjetas
// que no muestran tiempo no se re-renderizan nunca por el reloj.
// ─────────────────────────────────────────────────────────────────────────────
const suscriptores = new Set();
let intervalo = null;

function suscribir(cb) {
  suscriptores.add(cb);
  if (!intervalo) {
    intervalo = setInterval(() => {
      const t = Date.now();
      suscriptores.forEach((fn) => {
        try { fn(t); } catch { /* ignorar */ }
      });
    }, 1000);
  }
  return () => {
    suscriptores.delete(cb);
    if (suscriptores.size === 0 && intervalo) {
      clearInterval(intervalo);
      intervalo = null;
    }
  };
}

// Devuelve el "ahora" que refresca cada segundo SOLO si activo=true.
// Si activo=false igual devuelve la hora del render (los cálculos siguen
// siendo correctos), pero no provoca re-renders por tiempo.
function useAhora(activo) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!activo) return undefined;
    setNow(Date.now());
    return suscribir(setNow);
  }, [activo]);

  return activo ? now : Date.now();
}

export function useTimer(targetIso, activo = true) {
  const now = useAhora(activo && !!targetIso);

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

export function useTimerSubir(desdeIso, activo = true) {
  const now = useAhora(activo && !!desdeIso);

  if (!desdeIso) return { texto: '--', segundos: 0 };
  const seg = Math.max(0, Math.floor((now - new Date(desdeIso).getTime()) / 1000));
  const mm = Math.floor(seg / 60);
  const ss = seg % 60;
  const texto = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  return { texto, segundos: seg };
}
