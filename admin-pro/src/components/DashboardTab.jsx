import { money, entregadoHoy, creadoHoy } from '../lib/time';

function Stat({ icon, value, label, color = 'text-white' }) {
  return (
    <div className="bg-tarjeta border border-borde rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</span>
      </div>
      <div className={`text-xl font-black ${color}`}>{value}</div>
    </div>
  );
}

export default function DashboardTab({ data }) {
  const { pedidos, restaurantes, motorizados, colgados, rechazados } = data;

  // "Hoy": recortar al día EC (pedidos trae 12h de margen para no perder activos
  // que cruzan medianoche; sin recortar, los conteos del día mezclarían ayer con hoy).
  const pedidosHoy = pedidos.filter(creadoHoy);
  const comida = pedidosHoy.filter((p) => p.intencion === 'pedido_comida');
  const encomienda = pedidosHoy.filter((p) => p.intencion === 'encomienda');
  const compras = pedidosHoy.filter((p) => p.intencion === 'compras');

  const entregados = pedidos.filter((p) => p.estado_pedido === 'entregado' && entregadoHoy(p));
  const enProceso = pedidos.filter((p) =>
    ['aceptado', 'en_camino', 'en_camino_entrega', 'llegado', 'confirmado', 'preparando', 'pendiente_restaurante'].includes(p.estado_pedido)
  );

  const ingresos = entregados.reduce((s, p) => s + (Number(p.precio_calculado) || 0), 0);
  const comisionTotal = entregados.reduce((s, p) => s + (Number(p.monto_comision ?? p.comision) || 0), 0);

  const motosActivas = motorizados.filter((m) => m.activo);
  const motosDisponibles = motosActivas.filter((m) => m.disponible || m.estado === 'disponible');
  const motosOcupadas = motosActivas.filter((m) => m.estado === 'ocupado' || (m.pedidos_activos > 0));

  const restActivos = restaurantes.filter((r) => r.activo);

  return (
    <div className="p-3 space-y-3">
      {(colgados.length > 0 || rechazados.length > 0) && (
        <div className="bg-alerta/15 border border-alerta rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🚨</span>
            <span className="text-alerta font-bold text-sm">Atención</span>
          </div>
          <div className="text-xs text-white space-y-1">
            {colgados.length > 0 && <div>• <b>{colgados.length}</b> pedido(s) sin aceptar por el restaurante (&gt;5min)</div>}
            {rechazados.length > 0 && <div>• <b>{rechazados.length}</b> pedido(s) rechazado(s) por el restaurante hoy</div>}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Stat icon="📦" value={pedidosHoy.length} label="Pedidos hoy" color="text-dewan" />
        <Stat icon="✅" value={entregados.length} label="Entregados" color="text-dewan" />
        <Stat icon="⏳" value={enProceso.length} label="En proceso" color="text-preparando" />
        <Stat icon="💰" value={money(ingresos)} label="Envíos día" />
      </div>

      <div className="bg-tarjeta border border-borde rounded-xl p-3">
        <div className="text-xs text-gray-400 uppercase mb-2">Por tipo</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-white">{comida.length}</div>
            <div className="text-[10px] text-gray-400">🍔 Comida</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{encomienda.length}</div>
            <div className="text-[10px] text-gray-400">📦 Encomienda</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{compras.length}</div>
            <div className="text-[10px] text-gray-400">🛒 Compras</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Stat icon="🏍️" value={`${motosDisponibles.length}/${motosActivas.length}`} label="Motos disponibles" />
        <Stat icon="🚀" value={motosOcupadas.length} label="Motos ocupadas" color="text-encamino" />
        <Stat icon="🍽️" value={`${restActivos.length}/${restaurantes.length}`} label="Restaurantes activos" />
        <Stat icon="💳" value={money(comisionTotal)} label="Comisión DEWAN" color="text-dewan" />
      </div>
    </div>
  );
}
