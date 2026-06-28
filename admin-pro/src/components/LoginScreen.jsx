import { useState } from 'react';

export default function LoginScreen({ onLogin, ciudad, onCambiarCiudad }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e?.preventDefault?.();
    const ok = onLogin(user.trim(), pass);
    if (!ok) { setError(true); setPass(''); setTimeout(() => setError(false), 1500); }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <div className="text-5xl mb-2">🏢</div>
        <h1 className="text-dewan font-black text-3xl tracking-wide">DEWAN Admin</h1>
        <p className="text-gray-400 text-sm mt-1">Panel de Control</p>
      </div>
      <form onSubmit={submit} className="w-full max-w-[280px] space-y-3">
        <input
          type="text"
          autoCapitalize="off"
          autoCorrect="off"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full bg-tarjeta border border-borde rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dewan transition-colors"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className={`w-full bg-tarjeta border ${error ? 'border-nuevo' : 'border-borde'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dewan transition-colors`}
        />
        <button type="submit" className="w-full bg-dewan text-black font-bold py-3 rounded-xl active:scale-95 transition-transform">
          Entrar
        </button>
        {error && <p className="text-nuevo text-xs text-center animate-pulse">Credenciales incorrectas</p>}
      </form>

      {ciudad && onCambiarCiudad && (
        <button
          onClick={onCambiarCiudad}
          className="text-gray-400 text-xs hover:text-dewan transition-colors"
        >
          {ciudad.bandera} {ciudad.nombre}, {ciudad.pais} ·{' '}
          <span className="underline">Cambiar ciudad</span>
        </button>
      )}
    </div>
  );
}
