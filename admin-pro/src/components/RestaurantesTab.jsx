import { useState, useMemo } from 'react';
import { MIN_NO_ACEPTA } from '../lib/supabase';
import { minutosDesde, hace } from '../lib/time';

// Estadísticas del día por restaurante, calculadas sobre los pedidos ya
// cargados (useAdminData trae solo los de hoy).
function statsRestaurante(restauranteId, pedidos) {
  const suyos = pedidos.filter((p) => p.restaurante_id === restauranteId);
  const hoy = suyos.length;
  const aceptados = suyos.filter((p) => p.restaurante_aceptado).length;
  const rechazados = suyos.filter((p) => p.restaurante_rechazado);
  const colgados = suyos.filter(
    (p) =>
      p.estado_pedido === 'pendiente_restaurante' &&
      !p.restaurante_aceptado &&
      !p.restaurante_rechazado &&
      minutosDesde(p.fecha_creacion) >= MIN_NO_ACEPTA
  );
  const pendientes = suyos.filter(
    (p) =>
      p.estado_pedido === 'pendiente_restaurante' &&
      !p.restaurante_aceptado &&
      !p.restaurante_rechazado &&
      minutosDesde(p.fecha_creacion) < MIN_NO_ACEPTA
  );
  const respondidos = aceptados + rechazados.length;
  const pctAceptacion = respondidos > 0 ? Math.round((aceptados / respondidos) * 100) : null;
  const tiempos = suyos
    .filter((p) => p.restaurante_aceptado_at && p.fecha_creacion)
    .map((p) => (new Date(p.restaurante_aceptado_at).getTime() - new Date(p.fecha_creacion).getTime()) / 60000);
  const tiempoProm = tiempos.length > 0 ? Math.round(tiempos.reduce((a, b) => a + b, 0) / tiempos.length) : null;
  return { hoy, aceptados, rechazados, colgados, pendientes, pctAceptacion, tiempoProm, ultimo: suyos[0] };
}

function RestauranteCard({ r, stats }) {
  const conAlerta = stats.colgados.length > 0 || stats.rechazados.length > 0;
  const borde = conAlerta ? 'border-alerta' : r.activo ? 'border-borde' : 'border-gray-700';
  return (
    <div className={`bg-tarjeta border ${borde} rounded-xl p-3 space-y-2`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${r.activo ? 'bg-dewan' : 'bg-gray-600'}`} />
            <h3 className="text-sm font-bold text-white leading-tight truncate">{r.nombre}</h3>
          </div>
          {r.categoria && <p className="text-[10px] text-gray-400 truncate">{r.categoria}</p>}
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">Hoy</div>
          <div className="text-base font-black text-white leading-none">{stats.hoy}</div>
        </div>
      </div>

      {conAlerta && (
        <div className="bg-alerta/15 border border-alerta/40 rounded-lg p-2 space-y-0.5">
          {stats.colgados.length > 0 && (
            <div className="text-[11px] text-alerta font-bold">
              ⏰ {stats.colgados.length} sin aceptar (&gt;{MIN_NO_ACEPTA}m)
            </div>
          )}
          {stats.rechazados.length > 0 && (
            <div className="text-[11px] text-alerta font-bold">
              ❌ {stats.rechazados.length} rechazado(s)
              {stats.rechazados[0]?.restaurante_motivo_rechazo && (
                <span className="text-gray-300 font-normal">: {stats.rechazados[0].restaurante_motivo_rechazo}</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-borde text-center">
        <div>
          <div className="text-xs font-bold text-dewan">
            {stats.pctAceptacion != null ? `${stats.pctAceptacion}%` : '—'}
          </div>
          <div className="text-[9px] text-gray-500 uppercase">Aceptación</div>
        </div>
        <div>
          <div className="text-xs font-bold text-preparando">
            {stats.tiempoProm != null ? `${stats.tiempoProm}m` : '—'}
          </div>
          <div className="text-[9px] text-gray-500 uppercase">Resp. prom</div>
        </div>
        <div>
          <div className="text-xs font-bold text-buscando">{stats.pendientes.length}</div>
          <div className="text-[9px] text-gray-500 uppercase">Pendientes</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <span>{r.telefono ? `📞 ${r.telefono}` : ''}</span>
        <span>{stats.ultimo ? `último ${hace(stats.ultimo.fecha_creacion)}` : ''}</span>
      </div>
    </div>
  );
}

const FILTROS = [
  { id: 'alerta', labelBase: '🚨 Con actividad' },
  { id: 'activo', labelBase: '✅ Activos' },
  { id: 'inactivo', labelBase: '⛔ Inactivos' },
  { id: 'todos', labelBase: 'Todos' },
];

export default function RestaurantesTab({ data }) {
  const [filtro, setFiltro] = useState('alerta');
  const { restaurantes, pedidos } = data;

  const lista = useMemo(() => {
    const conStats = restaurantes.map((r) => ({ r, stats: statsRestaurante(r.id, pedidos) }));
    if (filtro === 'activo') return conStats.filter((x) => x.r.activo);
    if (filtro === 'inactivo') return conStats.filter((x) => !x.r.activo);
    if (filtro === 'alerta') {
      const activos = conStats.filter(
        (x) => x.stats.colgados.length > 0 || x.stats.rechazados.length > 0 || x.stats.pendientes.length > 0 || x.stats.hoy > 0
      );
      activos.sort((a, b) => {
        const aa = a.stats.colgados.length + a.stats.rechazados.length;
        const bb = b.stats.colgados.length + b.stats.rechazados.length;
        return aa !== bb ? bb - aa : b.stats.hoy - a.stats.hoy;
      });
      return activos;
    }
    return conStats;
  }, [restaurantes, pedidos, filtro]);

  const totalAlertas = restaurantes.reduce((acc, r) => {
    const s = statsRestaurante(r.id, pedidos);
    return acc + s.colgados.length + s.rechazados.length;
  }, 0);

  return (
    <div className="p-3 space-y-3">
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
              filtro === f.id ? 'bg-dewan text-black' : 'bg-tarjeta text-gray-300 border border-borde'
            }`}
          >
            {f.id === 'alerta' && totalAlertas ? `${f.labelBase} (${totalAlertas})` : f.labelBase}
          </button>
        ))}
      </div>
      {lista.length === 0 ? (
        <div className="text-center mt-12 text-gray-500">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="text-sm">Sin restaurantes</p>
        </div>
      ) : (
        <div className="space-y-2">
          {lista.map(({ r, stats }) => (
            <RestauranteCard key={r.id} r={r} stats={stats} />
          ))}
        </div>
      )}
    </div>
  );
}
