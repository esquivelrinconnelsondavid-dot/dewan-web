import { useState } from 'react';
import { MARCA } from '../lib/config';
import { HP_LOGO } from '../lib/hpLogo';

const ES_HP = MARCA.toLowerCase().includes('happy');
const LOGO_HP = HP_LOGO;

export default function LoginScreen({ onLogin, ciudad, onCambiarCiudad }) {
  const [dispositivo, setDispositivo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const codigoValido = /^\d{6}$/.test(codigo);
  const dispositivoValido = dispositivo.trim().length > 0;
  const puedeEnviar = codigoValido && dispositivoValido && !enviando;

  const verificar = async () => {
    if (!puedeEnviar) {
      if (!dispositivoValido) {
        setError('Ingresa el nombre del dispositivo');
      } else if (!codigoValido) {
        setError('El código debe ser de 6 dígitos');
      }
      return;
    }
    setError('');
    setEnviando(true);
    const res = await onLogin(codigo, dispositivo.trim());
    setEnviando(false);
    if (!res) {
      setError('Código inválido o expirado');
      setCodigo('');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center flex flex-col items-center">
        {ES_HP ? (
          <>
            <img src={LOGO_HP} alt="Happy Pollo" className="w-24 h-24 object-contain mb-2"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <h1 className="marca-title text-dewan text-4xl tracking-wide">Happy Pollo</h1>
            <p className="text-gray-400 text-sm mt-1">Panel de Cocina</p>
          </>
        ) : (
          <>
            <h1 className="text-dewan font-black text-3xl tracking-wide">DEWAN</h1>
            <p className="text-gray-400 text-sm mt-1">Panel Restaurante</p>
          </>
        )}
      </div>

      <div className="w-full max-w-[320px] space-y-3">
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest block mb-1">
            Dispositivo
          </label>
          <input
            type="text"
            placeholder="Ej. Tablet cocina"
            value={dispositivo}
            onChange={(e) => setDispositivo(e.target.value)}
            className="w-full bg-tarjeta border border-borde rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dewan transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest block mb-1">
            Código del restaurante
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && verificar()}
            className={`w-full text-center text-2xl font-bold tracking-[0.5em] bg-tarjeta border ${
              error ? 'border-nuevo' : 'border-borde'
            } rounded-xl px-4 py-4 text-white focus:outline-none focus:border-dewan transition-colors`}
          />
        </div>

        <button
          onClick={verificar}
          disabled={!puedeEnviar}
          className="w-full bg-dewan text-fondo font-bold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
        >
          {enviando ? 'Verificando…' : 'Entrar'}
        </button>

        {error && (
          <p className="text-nuevo text-xs text-center mt-2 animate-pulse">{error}</p>
        )}

        {ciudad && onCambiarCiudad && (
          <button
            onClick={onCambiarCiudad}
            className="w-full text-center text-gray-400 text-xs mt-1 py-2 hover:text-dewan transition-colors"
          >
            {ciudad.bandera} {ciudad.nombre}, {ciudad.pais} ·{' '}
            <span className="underline">Cambiar ciudad</span>
          </button>
        )}
      </div>
    </div>
  );
}
