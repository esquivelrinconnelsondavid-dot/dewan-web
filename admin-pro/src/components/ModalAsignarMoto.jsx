import { useState } from 'react';
import { HOY_ISO, hace } from '../lib/time';

// Bottom-sheet para asignar la carrera a un moto concreto (a dedo), en vez de
// ofrecerla a todos con lanzar-motorizado. Usa data.motorizados (ya viene con
// realtime desde useAdminData), ordenados como el reparto justo: conectados y
// libres primero, y dentro de cada grupo el que menos carreras lleva hoy.

const DOS_MIN = 2 * 60 * 1000;

function estaConectado(m) {
  return !!m.last_seen_at && Date.now() - new Date(m.last_seen_at).getTime() < DOS_MIN;
}

function carrerasHoy(m) {
  const hoyEC = HOY_ISO().split('T')[0];
  return m.fecha_carreras === hoyEC ? m.carreras_hoy || 0 : 0;
}

function ocupado(m) {
  return m.estado === 'ocupado' || m.pedidos_activos > 0;
}

// 0 = conectado y libre, 1 = conectado pero con carrera, 2 = sin latido reciente
function rango(m) {
  if (estaConectado(m)) return ocupado(m) ? 1 : 0;
  return 2;
}

export default function ModalAsignarMoto({ pedido, motorizados, onAsignar, onCerrar }) {
  const [asignando, setAsignando] = useState(null);

  const lista = (motorizados || [])
    .filter((m) => m.activo && !['pendiente', 'suspendido', 'rechazado'].includes(m.estado))
    .sort((a, b) => {
      const ra = rango(a), rb = rango(b);
      return ra !== rb ? ra - rb : carrerasHoy(a) - carrerasHoy(b);
    });

  const elegir = async (m) => {
    if (asignando) return;
    if (m.bloqueado_por_deuda && !confirm(`${m.nombre} está BLOQUEADO por deuda. ¿Asignar igual?`)) return;
    if (!estaConectado(m) && !confirm(`${m.nombre} no da señales hace rato (app cerrada?). ¿Asignar igual?`)) return;
    if (!confirm(`¿Asignar el pedido #${pedido.id} a ${m.nombre?.trim() || 'este moto'}?`)) return;
    setAsignando(m.id);
    const ok = await onAsignar(m);
    setAsignando(null);
    if (ok) onCerrar();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end" onClick={onCerrar}>
      <div
        className="w-full bg-bg2 border-t border-borde rounded-t-2xl max-h-[75%] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 pb-2">
          <h2 className="text-white font-bold text-sm">
            👤 Asignar moto al pedido <span className="text-dewan">#{pedido.id}</span>
          </h2>
          <button onClick={onCerrar} className="text-gray-400 text-xs border border-borde rounded-lg px-2 py-1">
            Cerrar
          </button>
        </div>

        <div className="overflow-y-auto px-4 pb-4 space-y-2">
          {lista.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-8">No hay motorizados registrados</p>
          )}
          {lista.map((m) => {
            const conectado = estaConectado(m);
            const badge = m.bloqueado_por_deuda
              ? { txt: 'Bloqueado', cls: 'bg-alerta/20 text-alerta' }
              : !conectado
                ? { txt: 'Sin señal', cls: 'bg-gray-500/20 text-gray-400' }
                : ocupado(m)
                  ? { txt: 'Con carrera', cls: 'bg-encamino/20 text-encamino' }
                  : { txt: 'Libre', cls: 'bg-dewan/20 text-dewan' };
            return (
              <button
                key={m.id}
                onClick={() => elegir(m)}
                disabled={asignando != null}
                className={`w-full flex items-center gap-3 bg-tarjeta border border-borde rounded-xl p-3 text-left active:scale-[0.98] transition-transform disabled:opacity-50 ${
                  asignando === m.id ? 'border-dewan' : ''
                }`}
              >
                {m.foto_perfil_url ? (
                  <img src={m.foto_perfil_url} alt="" className="w-9 h-9 rounded-full object-cover border border-borde" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-bg3 flex items-center justify-center text-base">🏍️</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${conectado ? 'bg-dewan' : 'bg-gray-600'}`} />
                    <span className="text-sm font-bold text-white truncate">{m.nombre || 'Sin nombre'}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {carrerasHoy(m)} carreras hoy
                    {m.telefono ? ` · ${m.telefono}` : ''}
                    {m.last_seen_at ? ` · visto ${hace(m.last_seen_at)}` : ''}
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badge.cls}`}>
                  {asignando === m.id ? '...' : badge.txt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
