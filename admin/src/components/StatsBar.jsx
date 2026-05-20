function formatoIngresos(valor) {
  const n = Number(valor);
  if (!Number.isFinite(n) || n <= 0) return '—';
  return n.toLocaleString('es-DO', {
    style: 'currency',
    currency: 'DOP',
    maximumFractionDigits: 2,
  });
}

function Tarjeta({ label, valor, color, pulse }) {
  return (
    <div className="bg-tarjeta border border-borde rounded-xl p-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${color} ${pulse ? 'animate-pulse' : ''}`}
        />
        <span className="text-[10px] uppercase tracking-wider text-gray-400">
          {label}
        </span>
      </div>
      <span className="text-xl font-bold text-white truncate">{valor}</span>
    </div>
  );
}

export default function StatsBar({ metricas }) {
  const m = metricas || {};
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 px-4 py-3">
      <Tarjeta
        label="Pedidos hoy"
        valor={m.pedidos_hoy ?? 0}
        color="bg-nuevo"
      />
      <Tarjeta
        label="Escalados hoy"
        valor={m.pedidos_escalados_hoy ?? 0}
        color="bg-buscando"
      />
      <Tarjeta
        label="Ingresos hoy"
        valor={formatoIngresos(m.ingresos_brutos_hoy)}
        color="bg-dewan"
      />
      <Tarjeta
        label="Activos"
        valor={m.restaurantes_activos ?? 0}
        color="bg-preparando"
      />
      <Tarjeta
        label="Online ahora"
        valor={m.restaurantes_online ?? 0}
        color="bg-encamino"
        pulse
      />
    </div>
  );
}
