import { useRef, useState } from 'react';
import { subirLogo, actualizarPerfil } from '../lib/perfilLocal';
import SelectorMoneda from './SelectorMoneda';

function Campo({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-white">{value || '—'}</span>
    </div>
  );
}

export default function MiLocal({ restaurante, onActualizado }) {
  const inputRef = useRef(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const [logoActual, setLogoActual] = useState(restaurante?.logo_url || '');

  const [editandoHorario, setEditandoHorario] = useState(false);
  const [editandoTelefono, setEditandoTelefono] = useState(false);
  const [horario, setHorario] = useState(restaurante?.horario || '');
  const [telefono, setTelefono] = useState(restaurante?.telefono || '');

  const elegirFoto = () => inputRef.current?.click();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Imagen muy grande (máx 5 MB)');
      return;
    }
    setError('');
    setSubiendo(true);
    try {
      const url = await subirLogo(restaurante.restaurante_id, file);
      await actualizarPerfil({ logo_url: url });
      setLogoActual(`${url}?t=${Date.now()}`);
      onActualizado?.({ ...restaurante, logo_url: url });
    } catch (e) {
      console.error('[subirLogo]', e);
      setError(e?.message || 'No se pudo subir el logo');
    }
    setSubiendo(false);
  };

  const guardarHorario = async () => {
    setError('');
    try {
      await actualizarPerfil({ horario });
      onActualizado?.({ ...restaurante, horario });
      setEditandoHorario(false);
    } catch (e) {
      setError(e?.message || 'No se pudo guardar el horario');
    }
  };

  const guardarTelefono = async () => {
    setError('');
    try {
      await actualizarPerfil({ telefono });
      onActualizado?.({ ...restaurante, telefono });
      setEditandoTelefono(false);
    } catch (e) {
      setError(e?.message || 'No se pudo guardar el teléfono');
    }
  };

  return (
    <div className="px-3 pt-3 pb-8 space-y-4">
      <div className="bg-tarjeta rounded-xl border border-borde p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Logo del local</p>
        <div className="flex items-center gap-4">
          {logoActual ? (
            <img
              src={logoActual}
              alt="Logo"
              className="w-20 h-20 rounded-xl object-cover border border-borde bg-fondo"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-dewan/15 border border-dewan/30 flex items-center justify-center">
              <span className="text-dewan font-black text-2xl">
                {(restaurante?.nombre || '?').slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <button
              onClick={elegirFoto}
              disabled={subiendo}
              className="bg-dewan/15 text-dewan text-sm font-bold py-2.5 px-4 rounded-lg border border-dewan/30 active:scale-95 transition-transform w-full"
            >
              {subiendo ? 'Subiendo…' : logoActual ? 'Cambiar logo' : 'Subir logo'}
            </button>
            <p className="text-[10px] text-gray-500 mt-1.5">PNG o JPG, máx 5 MB</p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFile}
        />
      </div>

      {error && (
        <div className="bg-nuevo/10 border border-nuevo/30 text-nuevo text-xs rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="bg-tarjeta rounded-xl border border-borde p-4 space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wider">Datos del local</p>
        <Campo label="Nombre" value={restaurante?.nombre} />
        <Campo label="Categoría" value={restaurante?.categoria} />
        <Campo label="Dirección" value={restaurante?.direccion} />

        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Horario</span>
          {editandoHorario ? (
            <div className="flex gap-2">
              <input
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="ej: 10:00 - 22:00"
                className="flex-1 bg-fondo border border-borde rounded-md px-2 py-1.5 text-sm text-white"
              />
              <button
                onClick={guardarHorario}
                className="bg-dewan/20 text-dewan text-xs font-bold px-3 rounded-md border border-dewan/30"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setEditandoHorario(false);
                  setHorario(restaurante?.horario || '');
                }}
                className="text-xs text-gray-400 px-2"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white flex-1">{horario || '—'}</span>
              <button
                onClick={() => setEditandoHorario(true)}
                className="text-[10px] text-dewan font-bold uppercase tracking-wider"
              >
                Editar
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Teléfono</span>
          {editandoTelefono ? (
            <div className="flex gap-2">
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="09xxxxxxxx"
                inputMode="tel"
                className="flex-1 bg-fondo border border-borde rounded-md px-2 py-1.5 text-sm text-white"
              />
              <button
                onClick={guardarTelefono}
                className="bg-dewan/20 text-dewan text-xs font-bold px-3 rounded-md border border-dewan/30"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setEditandoTelefono(false);
                  setTelefono(restaurante?.telefono || '');
                }}
                className="text-xs text-gray-400 px-2"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white flex-1">{telefono || '—'}</span>
              <button
                onClick={() => setEditandoTelefono(true)}
                className="text-[10px] text-dewan font-bold uppercase tracking-wider"
              >
                Editar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-tarjeta rounded-xl border border-borde p-4">
        <SelectorMoneda
          valorInicial={restaurante?.moneda}
          onCambio={(c) => onActualizado?.({ ...restaurante, moneda: c })}
        />
      </div>
    </div>
  );
}
