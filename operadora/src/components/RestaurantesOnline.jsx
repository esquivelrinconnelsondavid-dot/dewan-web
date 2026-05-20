import { useState } from 'react';

export default function RestaurantesOnline({ restaurantes = [], total = 0 }) {
  const [abierto, setAbierto] = useState(false);
  const hayOnline = total > 0;

  return (
    <div className="px-4 pb-2">
      <button
        onClick={() => hayOnline && setAbierto((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 min-w-fit transition-colors ${
          hayOnline
            ? 'bg-encamino/20 text-encamino active:opacity-70'
            : 'bg-tarjeta text-gray-400 cursor-default'
        }`}
      >
        {hayOnline ? (
          <span className="text-xs font-bold">🟢 {total} online</span>
        ) : (
          <span className="text-xs font-bold">🔌 0 restaurantes online</span>
        )}
        {hayOnline && (
          <span className="text-[10px] opacity-70">{abierto ? '▾' : '▸'}</span>
        )}
      </button>

      {hayOnline && abierto && (
        <ul className="mt-2 bg-tarjeta rounded-lg p-2 space-y-1">
          {restaurantes.map((r) => (
            <li
              key={r.restaurante_id}
              className="flex items-center gap-2 text-xs text-gray-200 px-1 py-0.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-encamino" />
              <span className="truncate">{r.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
