import { useState } from 'react';
import Menu from './Menu';
import MiLocal from './MiLocal';
import ConfigImpresora from './ConfigImpresora';
import CrecerConDewan from './CrecerConDewan';
import { hayImpresion } from '../lib/comanda';
import { MODO_HP } from '../lib/config';

const OPCIONES = [
  { id: 'menu', label: 'Menú', icono: '🍔', descripcion: 'Editar productos, precios y disponibilidad' },
  { id: 'local', label: 'Mi Local', icono: '🏪', descripcion: 'Logo, horario, teléfono' },
  ...(hayImpresion()
    ? [{ id: 'impresora', label: 'Impresora', icono: '🖨️', descripcion: 'Comanda automática: elegí impresora y tamaño' }]
    : []),
];

export default function AjustesModal({ restaurante, onCerrar, onActualizarRestaurante, onVerTutorial }) {
  const [seccion, setSeccion] = useState(null);

  if (seccion === 'menu') {
    return (
      <div className="fixed inset-0 z-50 bg-fondo flex flex-col">
        <header className="sticky top-0 bg-fondo/95 backdrop-blur border-b border-borde px-3 py-2.5 flex items-center gap-2">
          <button onClick={() => setSeccion(null)} className="text-gray-400 text-2xl px-1">←</button>
          <h1 className="text-white font-bold">Menú</h1>
        </header>
        <div className="flex-1 overflow-y-auto pb-8">
          <Menu />
        </div>
      </div>
    );
  }

  if (seccion === 'local') {
    return (
      <div className="fixed inset-0 z-50 bg-fondo flex flex-col">
        <header className="sticky top-0 bg-fondo/95 backdrop-blur border-b border-borde px-3 py-2.5 flex items-center gap-2">
          <button onClick={() => setSeccion(null)} className="text-gray-400 text-2xl px-1">←</button>
          <h1 className="text-white font-bold">Mi Local</h1>
        </header>
        <div className="flex-1 overflow-y-auto pb-8">
          <MiLocal restaurante={restaurante} onActualizado={onActualizarRestaurante} />
        </div>
      </div>
    );
  }

  if (seccion === 'impresora') {
    return (
      <div className="fixed inset-0 z-50 bg-fondo flex flex-col">
        <header className="sticky top-0 bg-fondo/95 backdrop-blur border-b border-borde px-3 py-2.5 flex items-center gap-2">
          <button onClick={() => setSeccion(null)} className="text-gray-400 text-2xl px-1">←</button>
          <h1 className="text-white font-bold">Impresora</h1>
        </header>
        <div className="flex-1 overflow-y-auto pb-8">
          <ConfigImpresora restaurante={restaurante} />
        </div>
      </div>
    );
  }

  if (seccion === 'crecer') {
    return (
      <div className="fixed inset-0 z-50 bg-fondo flex flex-col">
        <header className="sticky top-0 bg-fondo/95 backdrop-blur border-b border-borde px-3 py-2.5 flex items-center gap-2">
          <button onClick={() => setSeccion(null)} className="text-gray-400 text-2xl px-1">←</button>
          <h1 className="text-white font-bold">Crece con DEWAN</h1>
        </header>
        <div className="flex-1 overflow-y-auto pb-8">
          <CrecerConDewan restaurante={restaurante} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-fondo flex flex-col">
      <header className="sticky top-0 bg-fondo/95 backdrop-blur border-b border-borde px-3 py-2.5 flex items-center justify-between">
        <h1 className="text-white font-bold">Ajustes</h1>
        <button onClick={onCerrar} className="text-gray-400 text-xl px-2">✕</button>
      </header>
      <div className="p-3 space-y-2">
        {OPCIONES.map((o) => (
          <button
            key={o.id}
            onClick={() => setSeccion(o.id)}
            className="w-full bg-tarjeta border border-borde rounded-xl p-4 flex items-center gap-3 text-left active:bg-bg3 transition-colors"
          >
            <span className="text-3xl shrink-0">{o.icono}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold">{o.label}</p>
              <p className="text-[12px] text-gray-400 leading-snug">{o.descripcion}</p>
            </div>
            <span className="text-gray-500 text-xl">›</span>
          </button>
        ))}

        {!MODO_HP && (
          <button
            onClick={() => setSeccion('crecer')}
            className="w-full bg-dewan/10 border border-dewan/40 rounded-xl p-4 flex items-center gap-3 text-left active:bg-dewan/20 transition-colors"
          >
            <span className="text-3xl shrink-0">⭐</span>
            <div className="flex-1 min-w-0">
              <p className="text-dewan font-bold">Crece con DEWAN</p>
              <p className="text-[12px] text-gray-400 leading-snug">Aparecé destacado y vendé más</p>
            </div>
            <span className="text-dewan text-xl">›</span>
          </button>
        )}

        {!MODO_HP && onVerTutorial && (
          <button
            onClick={onVerTutorial}
            className="w-full bg-tarjeta border border-borde rounded-xl p-4 flex items-center gap-3 text-left active:bg-bg3 transition-colors"
          >
            <span className="text-3xl shrink-0">🎓</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold">Ver tutorial</p>
              <p className="text-[12px] text-gray-400 leading-snug">Repasá cómo funciona la app</p>
            </div>
            <span className="text-gray-500 text-xl">›</span>
          </button>
        )}
      </div>
    </div>
  );
}
