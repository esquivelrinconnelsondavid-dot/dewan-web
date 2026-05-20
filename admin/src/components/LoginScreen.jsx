import { useState } from 'react';

export default function LoginScreen({ onLogin, verificando, error }) {
  const [pin, setPinValue] = useState('');

  const submit = async () => {
    if (verificando) return;
    await onLogin(pin);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-dewan font-black text-3xl tracking-wide">DEWAN</h1>
        <p className="text-gray-400 text-sm mt-1">Panel Admin</p>
      </div>
      <div className="w-full max-w-[320px]">
        <input
          type="password"
          inputMode="text"
          maxLength={32}
          placeholder="PIN admin"
          value={pin}
          onChange={(e) => setPinValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          autoFocus
          className={`w-full text-center text-lg font-bold tracking-widest bg-tarjeta border ${
            error ? 'border-nuevo' : 'border-borde'
          } rounded-xl px-4 py-4 text-white focus:outline-none focus:border-dewan transition-colors`}
        />
        <button
          onClick={submit}
          disabled={verificando}
          className="w-full mt-4 bg-dewan text-black font-bold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          {verificando ? 'Verificando…' : 'Entrar'}
        </button>
        {error && (
          <p className="text-nuevo text-xs text-center mt-2 animate-pulse">
            {error}
          </p>
        )}
        <p className="text-gray-500 text-xs text-center mt-6">
          Acceso restringido al equipo interno de DEWAN.
        </p>
      </div>
    </div>
  );
}
