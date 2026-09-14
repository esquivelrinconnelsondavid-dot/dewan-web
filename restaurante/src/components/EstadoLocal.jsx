import { useEffect, useState } from 'react';
import { leerOcupado, fijarOcupado, leerCierre, pausarLocal, reabrirLocal } from '../lib/estadoLocal';
import { formatHoraEC } from '../lib/formato';

// Estado de la tienda en la cabecera (patrón PedidosYa / Uber "busy mode"):
//   [ Abierto ] [ Ocupado +15 ] [ Pausar 30 min ]
// Abierto  = recibe pedidos.  Ocupado = suma minutos al tiempo que promete el local
// (se apaga solo a las 2 h; +15 → +30 → apagado).  Pausar = los clientes lo ven
// Cerrado 30 min y se reabre solo; "Reabrir" lo abre antes.
export function useEstadoLocal(restauranteId) {
  const [ocupado, setOcupado] = useState(leerOcupado());
  const [cerradoHasta, setCerradoHasta] = useState(null);
  const [ocupadoBD, setOcupadoBD] = useState(false);

  useEffect(() => {
    let vivo = true;
    const cargar = () => leerCierre(restauranteId).then((h) => { if (vivo) setCerradoHasta(h); }).catch(() => {});
    if (restauranteId) cargar();
    const id = setInterval(() => {
      if (restauranteId) cargar();
      setOcupado(leerOcupado());
    }, 60000);
    return () => { vivo = false; clearInterval(id); };
  }, [restauranteId]);

  const cicloOcupado = () => {
    const actual = ocupado?.minutos || 0;
    const sig = actual === 0 ? 15 : actual === 15 ? 30 : 0;
    fijarOcupado(sig);
    setOcupado(leerOcupado());
  };
  const pausar = async (min = 30) => {
    setOcupadoBD(true);
    try { setCerradoHasta(await pausarLocal(min)); } finally { setOcupadoBD(false); }
  };
  const reabrir = async () => {
    setOcupadoBD(true);
    try { setCerradoHasta(await reabrirLocal()); } finally { setOcupadoBD(false); }
  };
  return { ocupado, cerradoHasta, ocupando: ocupadoBD, cicloOcupado, pausar, reabrir, ocupadoMin: cerradoHasta ? 0 : (ocupado?.minutos || 0) };
}

export default function EstadoLocal({ estado, compacto = false }) {
  const { ocupado, cerradoHasta, ocupando, cicloOcupado, pausar, reabrir } = estado;
  const pausado = !!cerradoHasta;
  const seg = 'flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap transition-colors';
  const tam = compacto ? 'text-[12px] px-3 py-1.5' : 'text-[13px] px-3.5 py-1.5';
  return (
    <div className={`flex items-center gap-0.5 p-[3px] rounded-full bg-bg4 ${ocupando ? 'opacity-60 pointer-events-none' : ''}`}>
      <button onClick={pausado ? reabrir : undefined} className={`${seg} ${tam} ${!pausado ? 'bg-dewan text-white' : 'text-gray-300'}`}>
        <span className={`w-2 h-2 rounded-full ${!pausado ? 'bg-white/80' : 'bg-gray-400'}`} />
        {pausado ? 'Reabrir' : 'Abierto'}
      </button>
      <button onClick={cicloOcupado} disabled={pausado} className={`${seg} ${tam} ${ocupado && !pausado ? 'bg-preparando text-white' : 'text-gray-300'} disabled:opacity-40`}
        title="Suma minutos al tiempo que promete al aceptar. +15 → +30 → apagado">
        {ocupado && !pausado ? `Ocupado · +${ocupado.minutos} min` : 'Ocupado'}
      </button>
      <button onClick={pausado ? reabrir : () => pausar(30)} className={`${seg} ${tam} ${pausado ? 'bg-nuevo text-white' : 'text-gray-300'}`}
        title={pausado ? 'Reabrir ahora' : 'Los clientes lo ven Cerrado 30 min y se reabre solo'}>
        {pausado ? `Pausado hasta ${formatHoraEC(cerradoHasta)}` : 'Pausar 30 min'}
      </button>
    </div>
  );
}
