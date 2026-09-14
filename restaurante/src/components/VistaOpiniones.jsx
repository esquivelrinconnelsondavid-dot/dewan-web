import { useMemo, useState } from 'react';
import { formatHoraEC, formatFechaCortaEC, formatDinero } from '../lib/formato';
import { resumirResenas, esBaja } from '../lib/resenas';

// Pestaña OPINIONES: lo que el cliente dijo de la comida y de la entrega, plato por
// plato, como en las apps grandes. Misma pantalla en el EXE de la caja y en la app
// Android; sirve para DEWAN y para los locales del SISTEMA.

const RANGOS = [
  { id: 30, label: '30 días' },
  { id: 90, label: '90 días' },
];

function Estrellas({ n, className = '' }) {
  const v = Math.max(0, Math.min(5, Number(n) || 0));
  if (!v) return null;
  return (
    <span className={`font-mono tracking-wider ${className}`} aria-label={`${v} de 5`}>
      <span className="text-preparando">{'★'.repeat(v)}</span>
      <span className="text-gray-600">{'☆'.repeat(5 - v)}</span>
    </span>
  );
}

function KpiCard({ label, value, sub, alerta }) {
  return (
    <div className={`bg-tarjeta rounded-xl p-4 border ${alerta ? 'border-nuevo/60' : 'border-borde'}`}>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-2xl font-bold ${alerta ? 'text-nuevo' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

function ListaPlatos({ titulo, platos, tono }) {
  if (!platos.length) return null;
  return (
    <div className="bg-tarjeta rounded-xl p-4 border border-borde">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{titulo}</p>
      <ul className="space-y-1.5">
        {platos.map((p) => (
          <li key={p.nombre} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-gray-200 truncate">{p.nombre}</span>
            <span className={`font-mono text-xs whitespace-nowrap ${tono}`}>
              👍 {p.arriba} · 👎 {p.abajo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Cada opinión se lee como una comanda: qué dijo, de qué plato, quién y cuándo.
function TarjetaResena({ r }) {
  const baja = esBaja(r);
  const etiquetas = Array.isArray(r.etiquetas) ? r.etiquetas : [];
  const platos = Array.isArray(r.platos) ? r.platos : [];
  const nuevaSinLeer = !r.leida_at;
  const nombre = String(r.cliente_nombre || 'Cliente').trim();
  const nPed = Number(r.pedidos_cliente) || 0;
  const moto = r.nombre_moto ? String(r.nombre_moto).trim().split(' ').slice(0, 2).join(' ') : '';
  return (
    <article className={`bg-tarjeta rounded-xl border p-4 ${baja ? 'border-nuevo/70' : 'border-borde'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {nuevaSinLeer && <span className="w-2 h-2 rounded-full bg-dewan" title="Sin leer" />}
            <span className="text-xs text-gray-400 font-mono">#{r.pedido_id}</span>
            {baja && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-nuevo/20 text-nuevo rounded-full px-2 py-0.5">
                Pide atención
              </span>
            )}
          </div>
          <div className="mt-1 space-y-0.5">
            {r.estrellas_comida ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 w-16">Comida</span>
                <Estrellas n={r.estrellas_comida} />
              </div>
            ) : null}
            {r.estrellas_entrega ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 w-16">Entrega</span>
                <Estrellas n={r.estrellas_entrega} />
                {moto && <span className="text-xs text-gray-500">🛵 {moto}</span>}
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-right text-xs text-gray-500 whitespace-nowrap">
          <div>{formatFechaCortaEC(r.created_at)} · {formatHoraEC(r.created_at)}</div>
          {r.monto_total != null && <div className="text-gray-400 mt-0.5">{formatDinero(r.monto_total)}</div>}
        </div>
      </div>

      {platos.length > 0 && (
        <ul className="mt-3 space-y-1">
          {platos.map((p, i) => (
            <li key={`${p.nombre}-${i}`} className="flex items-center gap-2 text-sm">
              <span className={Number(p.voto) > 0 ? 'text-encamino' : 'text-nuevo'}>{Number(p.voto) > 0 ? '👍' : '👎'}</span>
              <span className="text-gray-200">{p.nombre}</span>
            </li>
          ))}
        </ul>
      )}

      {etiquetas.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {etiquetas.map((t) => (
            <span key={t} className="text-xs border border-borde rounded-full px-2 py-0.5 text-gray-300">{t}</span>
          ))}
        </div>
      )}

      {r.comentario && (
        <p className="mt-3 text-sm text-gray-200 italic">“{r.comentario}”</p>
      )}

      <div className="mt-3 pt-2 border-t border-borde/70 flex items-center justify-between gap-3 text-xs text-gray-500">
        <span className="truncate">
          👤 {nombre}
          {nPed > 1 ? <span className="text-encamino"> · cliente frecuente ({nPed} pedidos)</span> : nPed === 1 ? ' · primer pedido' : ''}
        </span>
        <span className="whitespace-nowrap">{r.fuente === 'web' ? 'vía link' : r.fuente === 'wa' ? 'vía WhatsApp' : 'vía app'}</span>
      </div>
    </article>
  );
}

export default function VistaOpiniones({ resenas, cargando, noDisponible, onMarcarLeidas }) {
  const [rango, setRango] = useState(30);
  const visibles = useMemo(() => {
    const desde = Date.now() - rango * 86400000;
    return resenas.filter((r) => new Date(r.created_at).getTime() >= desde);
  }, [resenas, rango]);
  const res = useMemo(() => resumirResenas(visibles), [visibles]);
  const sinLeerTotal = resenas.filter((r) => !r.leida_at).length;

  if (cargando && resenas.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-3 pt-3 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {RANGOS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRango(r.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                rango === r.id ? 'bg-dewan text-white border-dewan' : 'border-borde text-gray-400 hover:text-gray-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        {sinLeerTotal > 0 && (
          <button
            onClick={() => onMarcarLeidas && onMarcarLeidas()}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-dewan/50 text-dewan active:scale-95"
          >
            ✓ Marcar {sinLeerTotal} como leída{sinLeerTotal === 1 ? '' : 's'}
          </button>
        )}
      </div>

      {noDisponible && (
        <div className="bg-preparando/10 border border-preparando/40 rounded-xl p-3 text-xs text-preparando">
          Las opiniones se están activando. Cuando un cliente califique su pedido aparecerán aquí.
        </div>
      )}

      {visibles.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 text-center pt-16">
          <p className="text-7xl mb-4">⭐</p>
          <h2 className="text-white font-bold text-xl mb-2">Todavía no hay opiniones</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Cuando un cliente califique la comida o un plato, lo verás aquí al instante.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <KpiCard
              label="Comida"
              value={res.promedio != null ? `★ ${res.promedio.toFixed(1)}` : '—'}
              sub={res.conComida ? `${res.conComida} calificaron la comida` : `${res.total} opiniones`}
            />
            <KpiCard
              label="Contentos (4-5 ★)"
              value={res.pctBuenas != null ? `${res.pctBuenas}%` : '—'}
              sub={`${res.total} opinión${res.total === 1 ? '' : 'es'} en ${rango} días`}
            />
            <KpiCard label="Piden atención" value={res.bajas} sub="3 estrellas o menos" alerta={res.bajas > 0} />
            <KpiCard label="Sin leer" value={res.sinLeer} sub="nuevas desde la última vez" />
          </div>

          {(res.mejores.length > 0 || res.peores.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <ListaPlatos titulo="Platos que más gustan" platos={res.mejores} tono="text-encamino" />
              <ListaPlatos titulo="Platos con quejas" platos={res.peores} tono="text-nuevo" />
            </div>
          )}

          <div className="space-y-2">
            {visibles.map((r) => (
              <TarjetaResena key={r.id} r={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
