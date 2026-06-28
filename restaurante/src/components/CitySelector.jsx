import { CIUDADES } from '../lib/ciudades';

// Selector de ciudad pre-login. Define a qué backend (Riobamba / San Cristóbal)
// se conecta la app. Se muestra una sola vez; la elección se recuerda.
export default function CitySelector({ onElegir, onCancelar }) {
  const ciudades = Object.values(CIUDADES);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-dewan font-black text-3xl tracking-wide">DEWAN</h1>
        <p className="text-gray-400 text-sm mt-2">¿En qué ciudad está tu local?</p>
      </div>

      <div className="w-full max-w-[320px] space-y-3">
        {ciudades.map((c) => (
          <button
            key={c.id}
            onClick={() => onElegir(c.id)}
            className="w-full flex items-center gap-4 bg-tarjeta border border-borde rounded-2xl px-5 py-4 text-left active:scale-95 transition-all hover:border-dewan"
          >
            <span className="text-4xl leading-none">{c.bandera}</span>
            <span className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">{c.nombre}</span>
              <span className="text-gray-400 text-xs">{c.pais}</span>
            </span>
          </button>
        ))}
      </div>

      {onCancelar ? (
        <button
          onClick={onCancelar}
          className="text-gray-500 text-xs underline hover:text-gray-300 transition-colors"
        >
          Cancelar
        </button>
      ) : (
        <p className="text-gray-500 text-[11px] text-center max-w-[280px]">
          Podés cambiarla después desde la pantalla de inicio de sesión.
        </p>
      )}
    </div>
  );
}
