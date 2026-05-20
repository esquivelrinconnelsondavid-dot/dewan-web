import { useState } from 'react';
import { asignarCodigo } from '../lib/admin';

export default function ModalAsignarCodigo({ restaurante, onClose, onAsignado }) {
  const codigoActual = restaurante?.codigo_acceso || null;
  const [modo, setModo] = useState(codigoActual ? 'actual' : 'auto');
  const [manual, setManual] = useState('');
  const [generado, setGenerado] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [confirmar, setConfirmar] = useState(false);

  const generarAuto = async () => {
    setError(null);
    setGuardando(true);
    const codigo = await asignarCodigo(restaurante.id, null);
    setGuardando(false);
    if (!codigo) {
      setError('No se pudo generar (colisión persistente)');
      return;
    }
    setGenerado(codigo);
    onAsignado?.(codigo);
  };

  const asignarManual = async () => {
    if (!/^[0-9]{6}$/.test(manual)) {
      setError('El código debe ser de 6 dígitos numéricos');
      return;
    }
    setError(null);
    setGuardando(true);
    const codigo = await asignarCodigo(restaurante.id, manual);
    setGuardando(false);
    if (!codigo) {
      setError('No se pudo asignar (¿código en uso?)');
      return;
    }
    setGenerado(codigo);
    onAsignado?.(codigo);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-tarjeta border border-borde rounded-2xl w-full max-w-md p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-white font-bold text-lg">Código de acceso</h2>
          <p className="text-gray-400 text-sm">{restaurante?.nombre}</p>
        </div>

        {/* Código generado o actual */}
        {(generado || (codigoActual && modo === 'actual')) && (
          <div className="bg-fondo border border-borde rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
              {generado ? 'Nuevo código' : 'Código actual'}
            </p>
            <p className="text-dewan font-black text-4xl tracking-[0.4em] tabular-nums">
              {generado || codigoActual}
            </p>
          </div>
        )}

        {/* Modo: actual con botón regenerar */}
        {modo === 'actual' && !generado && (
          <div className="flex flex-col gap-2">
            {!confirmar ? (
              <button
                onClick={() => setConfirmar(true)}
                className="bg-preparando text-black font-bold py-2 rounded-xl active:scale-95 transition-transform"
              >
                Regenerar código
              </button>
            ) : (
              <div className="flex flex-col gap-2 bg-fondo border border-preparando/40 rounded-xl p-3">
                <p className="text-xs text-gray-300">
                  El código anterior dejará de funcionar. ¿Continuar?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmar(false)}
                    className="flex-1 border border-borde text-gray-300 py-1.5 rounded-lg text-sm"
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      setConfirmar(false);
                      generarAuto();
                    }}
                    disabled={guardando}
                    className="flex-1 bg-preparando text-black font-bold py-1.5 rounded-lg text-sm disabled:opacity-50"
                  >
                    Sí, regenerar
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => setModo('manual')}
              className="text-xs text-gray-400 underline"
            >
              O ingresar uno manual
            </button>
          </div>
        )}

        {/* Modo: auto (sin código previo) */}
        {modo === 'auto' && !generado && (
          <div className="flex flex-col gap-2">
            <button
              onClick={generarAuto}
              disabled={guardando}
              className="bg-dewan text-black font-bold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
            >
              {guardando ? 'Generando…' : 'Generar código aleatorio'}
            </button>
            <button
              onClick={() => setModo('manual')}
              className="text-xs text-gray-400 underline"
            >
              O ingresar uno manual
            </button>
          </div>
        )}

        {/* Modo: manual */}
        {modo === 'manual' && !generado && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={manual}
              onChange={(e) => setManual(e.target.value.replace(/\D/g, ''))}
              placeholder="6 dígitos"
              className="bg-fondo border border-borde rounded-lg px-3 py-3 text-white text-center text-2xl font-bold tracking-[0.4em] focus:outline-none focus:border-dewan"
            />
            <button
              onClick={asignarManual}
              disabled={guardando || manual.length !== 6}
              className="bg-dewan text-black font-bold py-2 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
            >
              {guardando ? 'Asignando…' : 'Asignar'}
            </button>
            <button
              onClick={() => setModo(codigoActual ? 'actual' : 'auto')}
              className="text-xs text-gray-400 underline"
            >
              Volver
            </button>
          </div>
        )}

        {error && <p className="text-nuevo text-xs text-center">{error}</p>}

        <button
          onClick={onClose}
          className="mt-2 border border-borde text-gray-300 font-semibold py-2 rounded-xl active:scale-95 transition-transform"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
