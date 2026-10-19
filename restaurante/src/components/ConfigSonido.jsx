import { useState } from 'react';
import {
  SONIDOS, REPETICIONES, VOLUMENES, SONIDO_RECOMENDADO,
  getAjusteSonido, setAjusteSonido, playAviso, probarAvisoEnPantalla, unlockAudio,
} from '../lib/notifications';

// Ajustes › Sonido: cada PC elige cómo le avisa un pedido nuevo (se guarda en esta computadora).
export function resumenSonido() {
  const a = getAjusteSonido();
  const s = SONIDOS.find((x) => x.id === a.sonido);
  const r = REPETICIONES.find((x) => x.id === a.repetir);
  return `${s?.nombre || ''} · ${(r?.nombre || '').toLowerCase()} · volumen ${a.volumen}`;
}

function Opcion({ activo, titulo, detalle, onClick, accion }) {
  return (
    <div className={`w-full flex items-center gap-3 rounded-xl p-3 border transition-colors ${
      activo ? 'border-dewan bg-dewan/15' : 'border-borde bg-tarjeta'
    }`}>
      <button onClick={onClick} className="flex-1 flex items-center gap-3 text-left min-w-0">
        <span className={`w-4 h-4 rounded-full border-2 shrink-0 ${activo ? 'border-dewan bg-dewan' : 'border-gray-500'}`} />
        <span className="flex-1 min-w-0">
          <span className="block text-white text-sm font-bold">{titulo}</span>
          <span className="block text-[11px] text-gray-400">{detalle}</span>
        </span>
      </button>
      {accion}
    </div>
  );
}

export default function ConfigSonido() {
  const [a, setA] = useState(getAjusteSonido());

  const guardar = (cambio) => {
    setA(setAjusteSonido(cambio));
    if (cambio.sonido || cambio.volumen) {
      unlockAudio();
      playAviso(cambio);
    }
  };

  const esRecomendado = Object.keys(SONIDO_RECOMENDADO).every((k) => a[k] === SONIDO_RECOMENDADO[k]);

  return (
    <div className="p-4 space-y-5">
      <p className="text-[13px] text-gray-400">
        Elija cómo le avisa esta computadora cuando entra un pedido. El sonido deja de sonar apenas aceptan el pedido.
      </p>

      {!esRecomendado && (
        <button
          onClick={() => { setA(setAjusteSonido(SONIDO_RECOMENDADO)); unlockAudio(); playAviso(SONIDO_RECOMENDADO); }}
          className="w-full bg-dewan/15 text-dewan border border-dewan/30 rounded-xl p-3 text-left active:scale-[0.99]"
        >
          <span className="block text-sm font-bold">Usar lo recomendado</span>
          <span className="block text-[11px] text-gray-300">Campanita, volumen medio, que recuerde cada 30 segundos mientras nadie acepte</span>
        </button>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sonido</label>
        <div className="space-y-2">
          {SONIDOS.map((s) => (
            <Opcion
              key={s.id}
              activo={a.sonido === s.id}
              titulo={s.nombre}
              detalle={s.detalle}
              onClick={() => guardar({ sonido: s.id })}
              accion={(
                <button
                  onClick={() => { unlockAudio(); playAviso({ sonido: s.id }); }}
                  className="shrink-0 rounded-lg border border-borde px-3 py-2 text-xs font-bold text-gray-200 active:bg-bg3"
                >
                  ▶ Escuchar
                </button>
              )}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Volumen</label>
        <div className="grid grid-cols-3 gap-2">
          {VOLUMENES.map((v) => (
            <button
              key={v.id}
              onClick={() => guardar({ volumen: v.id })}
              className={`rounded-xl py-3 border text-sm font-bold ${
                a.volumen === v.id ? 'border-dewan bg-dewan/15 text-white' : 'border-borde bg-tarjeta text-gray-300'
              }`}
            >
              {v.nombre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">¿Cuántas veces suena?</label>
        <div className="space-y-2">
          {REPETICIONES.map((r) => (
            <Opcion
              key={r.id}
              activo={a.repetir === r.id}
              titulo={r.nombre}
              detalle={r.detalle}
              onClick={() => guardar({ repetir: r.id })}
            />
          ))}
        </div>
        {a.repetir === 'una' && (
          <p className="text-[11px] text-amber-300 mt-2">
            Con una sola vez, si nadie está en la caja cuando suena, el pedido espera en pantalla sin volver a avisar.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setA(setAjusteSonido({ aviso: !a.aviso }))}
          className="w-full flex items-center gap-3 bg-tarjeta border border-borde rounded-xl p-3 text-left"
        >
          <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${a.aviso ? 'bg-dewan' : 'bg-gray-600'}`}>
            <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${a.aviso ? 'translate-x-5' : ''}`} />
          </span>
          <span className="flex-1">
            <span className="block text-white text-sm font-bold">Aviso en la pantalla de Windows</span>
            <span className="block text-[11px] text-gray-400">Sale un cuadro abajo a la derecha aunque estén en otro programa (por ejemplo, facturando).</span>
          </span>
        </button>
        {a.aviso && (
          <button
            onClick={probarAvisoEnPantalla}
            className="w-full rounded-xl border border-borde py-2.5 text-xs font-bold text-gray-200 active:bg-bg3"
          >
            Probar el aviso (si no aparece nada, esta PC no lo muestra: déjelo apagado)
          </button>
        )}
      </div>

      <button
        onClick={() => { unlockAudio(); playAviso(); }}
        className="w-full bg-dewan/15 text-dewan border border-dewan/30 rounded-xl py-3 font-bold active:scale-95"
      >
        🔔 Escuchar cómo quedó
      </button>
    </div>
  );
}
