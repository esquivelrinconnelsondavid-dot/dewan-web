import { useState } from 'react';
import { useEmbudo } from '../hooks/useEmbudo';

function porcentaje(num, total) {
  if (!total) return 0;
  return Math.round((num / total) * 100);
}

function EtapaRow({ icono, label, count, base, color, esUltimo }) {
  const pct = porcentaje(count, base);
  const pctBase = base ? (count / base) * 100 : 0;
  return (
    <div className="relative">
      <div className="flex items-center gap-3 py-2">
        <div className="text-xl w-7 text-center">{icono}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-bold text-white truncate">{label}</span>
            <span className="text-xs text-gray-400 font-mono flex-none">
              <span className="text-white font-bold">{count}</span>
              {base > 0 && count !== base && (
                <span className="ml-1">({pct}%)</span>
              )}
            </span>
          </div>
          <div className="h-1.5 bg-borde rounded-full mt-1.5 overflow-hidden">
            <div
              className={`h-full ${color} transition-all duration-500`}
              style={{ width: `${Math.max(pctBase, count > 0 ? 4 : 0)}%` }}
            />
          </div>
        </div>
      </div>
      {!esUltimo && (
        <div className="absolute left-[13px] top-[38px] w-px h-2 bg-borde" />
      )}
    </div>
  );
}

export default function EmbudoClientes() {
  const { abrieron, eligieronUbic, agregaron, vieronCarrito, confirmaron, cargando } =
    useEmbudo();
  const [abierto, setAbierto] = useState(false);

  if (cargando) return null;

  const tasa = porcentaje(confirmaron, abrieron);
  const abandonoCarrito = agregaron - confirmaron;

  const etapas = [
    { icono: '👀', label: 'Abrieron el link', count: abrieron, color: 'bg-buscando' },
    { icono: '📍', label: 'Eligieron ubicación', count: eligieronUbic, color: 'bg-buscando' },
    { icono: '🛒', label: 'Agregaron al carrito', count: agregaron, color: 'bg-preparando' },
    { icono: '👁️', label: 'Vieron carrito', count: vieronCarrito, color: 'bg-preparando' },
    { icono: '✅', label: 'Confirmaron pedido', count: confirmaron, color: 'bg-encamino' },
  ];

  return (
    <div className="mx-4 mt-2 mb-2 bg-tarjeta border border-borde rounded-xl overflow-hidden">
      <button
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 active:bg-borde/40 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">📊</span>
          <span className="text-xs font-bold text-white">Clientes hoy</span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <span className="font-mono font-bold text-white">{abrieron}</span>
            abrieron
            <span className="text-gray-600">·</span>
            <span className="font-mono font-bold text-encamino">{confirmaron}</span>
            pidieron
            {abrieron > 0 && (
              <span className="ml-1 text-[10px] bg-borde px-1.5 py-0.5 rounded-full font-mono">
                {tasa}%
              </span>
            )}
          </span>
        </div>
        <span className={`text-gray-400 text-xs transition-transform ${abierto ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {abierto && (
        <div className="px-3 pb-3 pt-1 border-t border-borde">
          {abrieron === 0 ? (
            <div className="text-center py-4 text-xs text-gray-500">
              Sin actividad de clientes hoy todavía
            </div>
          ) : (
            <>
              <div className="space-y-0">
                {etapas.map((e, i) => (
                  <EtapaRow
                    key={e.label}
                    icono={e.icono}
                    label={e.label}
                    count={e.count}
                    base={abrieron}
                    color={e.color}
                    esUltimo={i === etapas.length - 1}
                  />
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-borde grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-fondo/60 rounded-lg px-2.5 py-2">
                  <div className="text-gray-500 mb-0.5">Tasa conversión</div>
                  <div className="text-white font-bold font-mono">
                    {tasa}%
                  </div>
                </div>
                <div className="bg-fondo/60 rounded-lg px-2.5 py-2">
                  <div className="text-gray-500 mb-0.5">Abandonó carrito</div>
                  <div className="text-nuevo font-bold font-mono">
                    {abandonoCarrito > 0 ? abandonoCarrito : 0}
                  </div>
                </div>
              </div>

              {abandonoCarrito >= 3 && (
                <div className="mt-2 text-[11px] text-preparando bg-preparando/10 border border-preparando/30 rounded-lg px-2.5 py-1.5">
                  ⚠️ {abandonoCarrito} clientes agregaron pero no confirmaron. Considera escribirles.
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
