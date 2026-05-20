import { useMetricasHoy } from '../hooks/useMetricasHoy';

function formatHora(fecha) {
  if (!fecha) return '--:--';
  try {
    const d = new Date(fecha);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  } catch {
    return '--:--';
  }
}

function badgeClasses(estado) {
  switch (estado) {
    case 'entregado':
      return 'bg-encamino/20 text-encamino';
    case 'preparando':
      return 'bg-preparando/20 text-preparando';
    case 'cancelado':
      return 'bg-nuevo/20 text-nuevo';
    case 'pendiente_restaurante':
      return 'bg-nuevo/20 text-nuevo';
    case 'confirmado':
      return 'bg-buscando/20 text-buscando';
    case 'en_camino':
    case 'en_camino_entrega':
    case 'llegado':
      return 'bg-buscando/20 text-buscando';
    default:
      return 'bg-borde text-gray-300';
  }
}

function labelEstado(estado) {
  switch (estado) {
    case 'entregado':
      return 'Entregado';
    case 'preparando':
      return 'Preparando';
    case 'cancelado':
      return 'Cancelado';
    case 'pendiente_restaurante':
      return 'Pendiente';
    case 'confirmado':
      return 'Confirmado';
    case 'en_camino':
    case 'en_camino_entrega':
      return 'En camino';
    case 'llegado':
      return 'Llegado';
    default:
      return estado || '—';
  }
}

function KpiCard({ label, value, sub, principal }) {
  return (
    <div className="bg-tarjeta rounded-xl p-4 border border-borde">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-2xl font-bold ${principal ? 'text-dewan' : 'text-white'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

export default function VistaHoy({ restaurante }) {
  const {
    pedidos,
    total,
    aceptados,
    rechazados,
    ingresosBruto,
    comisionTotal,
    ingresosNeto,
    ticketPromedio,
    tiempoPrepPromedio,
    tasaAceptacion,
    cargando,
  } = useMetricasHoy(restaurante);

  if (cargando) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <span className="text-dewan font-black text-2xl">DEWAN</span>
          <div className="mt-4 w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 text-center mt-20">
        <p className="text-7xl mb-4">📊</p>
        <h2 className="text-white font-bold text-xl mb-2">Aún no hay pedidos hoy</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          Cuando entren pedidos, aquí verás el resumen del día.
        </p>
      </div>
    );
  }

  const sinMontos = ingresosBruto === 0;

  return (
    <div className="px-3 pt-3 pb-8 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="Pedidos hoy"
          value={total}
          sub={`${aceptados.length} aceptados · ${rechazados.length} rechazados`}
          principal
        />
        <KpiCard
          label="Ingresos"
          value={sinMontos ? '—' : `$${ingresosNeto.toFixed(2)}`}
          sub={
            sinMontos
              ? 'Sin monto registrado en pedidos'
              : `Bruto $${ingresosBruto.toFixed(2)} · Comisión $${comisionTotal.toFixed(2)}`
          }
          principal
        />
        <KpiCard
          label="Ticket promedio"
          value={ticketPromedio > 0 ? `$${ticketPromedio.toFixed(2)}` : '—'}
        />
        <KpiCard
          label="Tiempo prep. prom."
          value={tiempoPrepPromedio > 0 ? `${tiempoPrepPromedio.toFixed(0)} min` : '—'}
        />
      </div>

      <div className="bg-tarjeta rounded-xl p-4 border border-borde">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Tasa de aceptación
          </p>
          <p className="text-sm font-bold text-white">{tasaAceptacion.toFixed(0)}%</p>
        </div>
        <div className="w-full h-2 bg-borde rounded-full overflow-hidden">
          <div
            className="h-full bg-encamino transition-all"
            style={{ width: `${Math.min(100, Math.max(0, tasaAceptacion))}%` }}
          />
        </div>
      </div>

      <div className="bg-tarjeta rounded-xl border border-borde overflow-hidden">
        <div className="px-4 py-3 border-b border-borde">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Últimos pedidos hoy
          </p>
        </div>
        <div className="divide-y divide-borde">
          {pedidos.map((p) => {
            const monto = p.monto_total;
            const montoTxt =
              monto === null || monto === undefined || Number(monto) === 0
                ? '—'
                : `$${Number(monto).toFixed(2)}`;
            const nombre = p.nombre_cliente || p.cliente || p.nombre || 'Cliente';
            return (
              <div
                key={p.id}
                className="px-4 py-3 flex items-center gap-3 text-sm"
              >
                <span className="text-xs text-gray-400 font-mono w-12 shrink-0">
                  {formatHora(p.fecha_creacion)}
                </span>
                <span className="flex-1 text-white truncate">{nombre}</span>
                <span className="text-gray-300 font-semibold shrink-0">
                  {montoTxt}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-1 shrink-0 ${badgeClasses(
                    p.estado_pedido
                  )}`}
                >
                  {labelEstado(p.estado_pedido)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
