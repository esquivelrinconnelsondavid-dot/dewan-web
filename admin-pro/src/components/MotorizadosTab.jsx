import { useEffect, useState, useCallback } from 'react';
import { money, entregadoHoy } from '../lib/time';
import { supabase } from '../lib/supabase';
import DesglosePedido from './DesglosePedido';

function fechaEcHoy() {
  const ahora = new Date();
  const ec = new Date(ahora.getTime() - 5 * 60 * 60 * 1000);
  return ec.toISOString().split('T')[0];
}
// fecha (EC, UTC-5) de un timestamp → 'YYYY-MM-DD' (para casar pedidos con la fecha de la deuda)
function fechaEcDe(ts) {
  try { return new Date(new Date(ts).getTime() - 5 * 60 * 60 * 1000).toISOString().split('T')[0]; }
  catch { return ''; }
}
function fechaCorta(ts) {
  try {
    const d = new Date(new Date(ts).getTime() - 5 * 60 * 60 * 1000);
    return `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
  } catch { return ''; }
}

function MotoCard({ m, stats, deuda, onMarcarPagado, marcandoId, detalle, onToggleCarreras, onHabilitar, onEliminar, accionandoId }) {
  const pendiente = m.estado === 'pendiente' || (!m.activo && m.estado !== 'suspendido' && m.estado !== 'rechazado');
  const accionando = accionandoId === m.id;
  const bloqueado = !!m.bloqueado_por_deuda;
  const estadoColor = bloqueado
    ? 'bg-alerta/20 text-alerta'
    : !m.activo
      ? 'bg-gray-500/20 text-gray-400'
      : m.disponible
        ? 'bg-dewan/20 text-dewan'
        : 'bg-encamino/20 text-encamino';
  const estadoTxt = bloqueado
    ? 'Bloqueado'
    : !m.activo
      ? 'Inactivo'
      : (m.estado || (m.disponible ? 'Disponible' : 'Ocupado'));

  const totalDeuda = Number(deuda?.monto_deuda || 0);
  const cantCarreras = Number(deuda?.cantidad_carreras || 0);
  const carreras = Number(deuda?.monto_carreras || 0);
  const comisiones = Number(deuda?.monto_comisiones || 0);
  const markup = Number(deuda?.monto_markup || 0);
  const deudaHoy = Number(deuda?.deuda_hoy || 0);
  const deudaAtrasada = Number(deuda?.deuda_atrasada || 0);
  const fechasAtrasadas = deuda?.fechas_atrasadas || [];
  const pagado = !!deuda?.pagado;
  const marcando = marcandoId === m.id;
  const det = detalle || {};
  const abierto = !!det.open;

  return (
    <div className="bg-tarjeta border border-borde rounded-xl p-3 space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {m.foto_perfil_url ? (
            <img src={m.foto_perfil_url} alt="" className="w-10 h-10 rounded-full object-cover border border-borde" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-bg3 flex items-center justify-center text-lg">🏍️</div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white leading-tight truncate">{m.nombre || 'Sin nombre'}</h3>
            <p className="text-[10px] text-gray-400">{m.placa || ''}{m.telefono ? ` • ${m.telefono}` : ''}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${estadoColor}`}>{estadoTxt}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 pt-1 border-t border-borde text-center">
        <div>
          <div className="text-xs font-bold text-white">{stats.entregasHoy}</div>
          <div className="text-[9px] text-gray-500 uppercase">Hoy</div>
        </div>
        <div>
          <div className="text-xs font-bold text-dewan">{money(stats.ingresosHoy)}</div>
          <div className="text-[9px] text-gray-500 uppercase">Ingreso</div>
        </div>
        <div>
          <div className="text-xs font-bold text-encamino">{m.pedidos_activos || 0}</div>
          <div className="text-[9px] text-gray-500 uppercase">Activos</div>
        </div>
        <div>
          <div className="text-xs font-bold text-preparando">{Number(m.calificacion_promedio || 0).toFixed(1)}⭐</div>
          <div className="text-[9px] text-gray-500 uppercase">Calif.</div>
        </div>
      </div>

      {/* Registro pendiente de aprobación → habilitar / eliminar desde la app */}
      {pendiente && (
        <div className="border-t border-borde pt-2 space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-preparando font-bold">
            <span>🆕 Registro pendiente de aprobación</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onHabilitar(m)}
              disabled={accionando}
              className="bg-dewan text-black text-xs font-bold py-2 rounded-lg disabled:opacity-50"
            >
              {accionando ? '...' : '✓ Habilitar'}
            </button>
            <button
              onClick={() => onEliminar(m)}
              disabled={accionando}
              className="bg-alerta/15 text-alerta border border-alerta/40 text-xs font-bold py-2 rounded-lg disabled:opacity-50"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      )}

      {(totalDeuda > 0 || bloqueado) && (
        <div className="border-t border-borde pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase text-gray-500 font-bold">Deuda pendiente</span>
            <span className={`text-xs font-bold ${pagado ? 'text-dewan' : 'text-alerta'}`}>
              {money(totalDeuda)} {pagado && '✓'}
            </span>
          </div>

          {/* HOY vs ATRASADO: la deuda vieja sin pagar se etiqueta (antes se sumaba
              en silencio y parecía que "salían carreras del día anterior" por error) */}
          {deudaAtrasada > 0 && (
            <div className="text-[10px] space-y-0.5 mb-1.5 px-0.5">
              <div className="flex justify-between text-gray-400">
                <span>Hoy</span>
                <span className="font-semibold text-gray-300">{money(deudaHoy)}</span>
              </div>
              <div className="flex justify-between text-encamino">
                <span>⏰ Atrasado — no pagó el {fechasAtrasadas.map((f) => `${f.slice(8, 10)}/${f.slice(5, 7)}`).join(', ')}</span>
                <span className="font-bold">{money(deudaAtrasada)}</span>
              </div>
            </div>
          )}

          {/* Desglose de la deuda: las 3 partes (carreras + comisiones + markup del local) */}
          {(carreras + comisiones + markup) > 0 && (
            <div className="text-[10px] text-gray-300 space-y-0.5 mb-2 bg-bg3/40 rounded-lg px-2.5 py-2">
              <div className="flex justify-between">
                <span className="text-gray-400">🏍️ Carreras{cantCarreras ? ` (${cantCarreras} × $0.70)` : ''}</span>
                <span className="font-semibold">{money(carreras)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">💸 Comisiones</span>
                <span className="font-semibold">{money(comisiones)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">🏪 Markup del local</span>
                <span className="font-semibold">{money(markup)}</span>
              </div>
            </div>
          )}

          {/* Detalle por carrera (a demanda) */}
          {cantCarreras > 0 && (
            <button
              onClick={() => onToggleCarreras(m.id, deuda?.fechas || [])}
              className="text-[10px] text-dewan font-bold mb-2 active:opacity-70"
            >
              {abierto ? '▲ Ocultar carreras' : `▼ Ver carreras (${cantCarreras})`}
            </button>
          )}
          {abierto && (
            <div className="mb-2 rounded-lg border border-borde/60 divide-y divide-borde/40">
              {det.loading ? (
                <div className="text-[10px] text-gray-500 px-2.5 py-2">Cargando carreras…</div>
              ) : (det.carreras && det.carreras.length > 0) ? (
                det.carreras.map((c) => (
                  <div key={c.id} className="px-2.5 py-2 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-white font-semibold truncate">#{c.id} {c.restaurante || 'Local'}</span>
                      <span className="text-[9px] text-gray-500 shrink-0">{fechaCorta(c.fecha_creacion)}</span>
                    </div>
                    <DesglosePedido pedido={c} compact />
                  </div>
                ))
              ) : (
                <div className="text-[10px] text-gray-500 px-2.5 py-2">Sin carreras en las fechas de la deuda.</div>
              )}
            </div>
          )}

          {!pagado && (totalDeuda > 0 || bloqueado) && (
            <button
              onClick={() => onMarcarPagado(m.id)}
              disabled={marcando}
              className="w-full bg-dewan text-black text-xs font-bold py-2 rounded-lg disabled:opacity-50"
            >
              {marcando ? 'Marcando...' : 'Marcar pagado y habilitar'}
            </button>
          )}
        </div>
      )}

      {/* fix 2026-06-16: se quitó "Saldo" — motorizados.saldo es un campo LEGACY
          (no lo toca completar_entrega; billeteras está en 0 y todos son pago diario).
          Mostraba basura congelada (ej. −1.29) que confundía. La deuda real es la de arriba. */}
      <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1">
        {!pendiente ? (
          <button onClick={() => onEliminar(m)} disabled={accionando} className="text-alerta/70 font-semibold active:opacity-60 disabled:opacity-40">
            🗑 Eliminar
          </button>
        ) : <span />}
        <span>Total carreras: {m.total_carreras || 0}</span>
      </div>
    </div>
  );
}

export default function MotorizadosTab({ data }) {
  const { motorizados, pedidos } = data;
  const [deudas, setDeudas] = useState({}); // { [motoId]: deudaRow }
  const [marcandoId, setMarcandoId] = useState(null);
  const [detalle, setDetalle] = useState({}); // { [motoId]: {open, loading, carreras} }
  const [accionandoId, setAccionandoId] = useState(null); // habilitar/eliminar en curso

  const cargarDeudas = useCallback(async () => {
    // FIX: cargar TODA la deuda PENDIENTE (pagado=false), NO solo la de hoy.
    // Antes filtraba por fecha=hoy: al cambiar el día, la deuda de ayer quedaba
    // con fecha vieja, la query no la traía, y el botón "habilitar" desaparecía
    // aunque el motorizado siguiera bloqueado. Ahora la deuda (y el botón) se
    // quedan SIEMPRE hasta que el admin marque pagado. Se suman días si hay varios.
    const { data, error } = await supabase
      .from('deudas_diarias')
      .select('motorizado_id, fecha, cantidad_carreras, monto_carreras, monto_comisiones, monto_markup, monto_deuda, pagado')
      .eq('pagado', false);
    if (error) { console.warn('[deudas]', error); return; }
    // separar HOY vs ATRASADO (queja real: "salen carreras del día anterior" —
    // era deuda vieja sin pagar sumada en silencio al total; ahora se etiqueta)
    const hoyEC = fechaEcHoy();
    const mapa = {};
    (data || []).forEach((d) => {
      const monto = Number(d.monto_deuda || 0);
      const esHoy = d.fecha === hoyEC;
      const ex = mapa[d.motorizado_id];
      if (!ex) {
        mapa[d.motorizado_id] = {
          motorizado_id: d.motorizado_id,
          cantidad_carreras: Number(d.cantidad_carreras || 0),
          monto_carreras: Number(d.monto_carreras || 0),
          monto_comisiones: Number(d.monto_comisiones || 0),
          monto_markup: Number(d.monto_markup || 0),
          monto_deuda: monto,
          deuda_hoy: esHoy ? monto : 0,
          deuda_atrasada: esHoy ? 0 : monto,
          fechas: d.fecha ? [d.fecha] : [],
          fechas_atrasadas: !esHoy && d.fecha ? [d.fecha] : [],
          pagado: false,
        };
      } else {
        ex.cantidad_carreras += Number(d.cantidad_carreras || 0);
        ex.monto_carreras += Number(d.monto_carreras || 0);
        ex.monto_comisiones += Number(d.monto_comisiones || 0);
        ex.monto_markup += Number(d.monto_markup || 0);
        ex.monto_deuda += monto;
        ex.deuda_hoy += esHoy ? monto : 0;
        ex.deuda_atrasada += esHoy ? 0 : monto;
        if (d.fecha && !ex.fechas.includes(d.fecha)) ex.fechas.push(d.fecha);
        if (!esHoy && d.fecha && !ex.fechas_atrasadas.includes(d.fecha)) ex.fechas_atrasadas.push(d.fecha);
      }
    });
    setDeudas(mapa);
  }, []);

  useEffect(() => { cargarDeudas(); }, [cargarDeudas]);

  // Realtime: refresh deudas cuando cambian
  useEffect(() => {
    const ch = supabase
      .channel('admin-pro-deudas')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deudas_diarias' }, () => cargarDeudas())
      .subscribe();
    return () => { ch.unsubscribe(); };
  }, [cargarDeudas]);

  // Detalle de carreras (a demanda): trae los pedidos entregados del moto en las
  // fechas de su deuda pendiente, con comisión/markup/quién paga por cada uno.
  const toggleCarreras = useCallback(async (motoId, fechas) => {
    setDetalle((prev) => {
      const cur = prev[motoId];
      if (cur?.open) return { ...prev, [motoId]: { ...cur, open: false } };
      return { ...prev, [motoId]: { open: true, loading: !cur?.carreras, carreras: cur?.carreras || null } };
    });
    // si ya las tenemos cacheadas, no re-consultar
    const yaCargado = detalle[motoId]?.carreras;
    if (yaCargado) return;
    const { data, error } = await supabase
      .from('pedidos_delivery')
      .select('id, restaurante, monto_total, precio_base_productos, monto_comision, markup_dewan, comision_la_paga, precio_calculado, fecha_creacion')
      .eq('motorizado_id', motoId)
      .eq('estado_pedido', 'entregado')
      .order('id', { ascending: false })
      .limit(80);
    if (error) {
      setDetalle((prev) => ({ ...prev, [motoId]: { open: true, loading: false, carreras: [] } }));
      return;
    }
    const set = new Set(fechas || []);
    let lista = data || [];
    // Filtrar a las fechas de la deuda pendiente (si las hay); si no casa nada, mostrar las recientes.
    if (set.size > 0) {
      const filtradas = lista.filter((c) => set.has(fechaEcDe(c.fecha_creacion)));
      lista = filtradas.length > 0 ? filtradas : lista.slice(0, 15);
    } else {
      lista = lista.slice(0, 15);
    }
    setDetalle((prev) => ({ ...prev, [motoId]: { open: true, loading: false, carreras: lista } }));
  }, [detalle]);

  const marcarPagado = async (motoId) => {
    if (!confirm('¿Confirmás que este motorizado ya pagó TODA su deuda pendiente?')) return;
    setMarcandoId(motoId);
    try {
      const { data, error } = await supabase.rpc('admin_marcar_pago_diario', {
        p_motorizado_id: motoId,
      });
      if (error) {
        alert('Error: ' + error.message);
      } else if (data && data.exito === false) {
        alert(data.error || 'No se pudo marcar');
      } else {
        setDetalle((prev) => ({ ...prev, [motoId]: undefined })); // limpiar detalle viejo
        await cargarDeudas();
      }
    } catch (e) {
      alert('Error: ' + (e?.message || e));
    } finally {
      setMarcandoId(null);
    }
  };

  const habilitarMoto = async (m) => {
    if (!confirm(`¿Habilitar a ${m.nombre || 'este motorizado'} para que pueda trabajar?`)) return;
    setAccionandoId(m.id);
    try {
      const { data, error } = await supabase.rpc('admin_habilitar_motorizado', { p_motorizado_id: m.id });
      if (error) alert('Error: ' + error.message);
      else if (data && data.exito === false) alert(data.error || 'No se pudo habilitar');
      // el realtime de motorizados refresca la lista solo
    } catch (e) {
      alert('Error: ' + (e?.message || e));
    } finally {
      setAccionandoId(null);
    }
  };

  const eliminarMoto = async (m) => {
    if (!confirm(`¿ELIMINAR a ${m.nombre || 'este motorizado'}?\n\nSi ya hizo carreras, se SUSPENDE (no se borra el historial). Si es un registro nuevo sin historial, se borra. Esta acción no se puede deshacer.`)) return;
    setAccionandoId(m.id);
    try {
      const { data, error } = await supabase.rpc('admin_eliminar_motorizado', { p_motorizado_id: m.id });
      if (error) alert('Error: ' + error.message);
      else if (data && data.exito === false) alert(data.error || 'No se pudo eliminar');
      else if (data && data.modo === 'suspendido') alert('Tenía historial de pedidos/deudas → se SUSPENDIÓ (no se borró para no perder los registros).');
    } catch (e) {
      alert('Error: ' + (e?.message || e));
    } finally {
      setAccionandoId(null);
    }
  };

  const statsByMoto = (motoId) => {
    // "Hoy" / "Ingreso" por moto = SOLO entregas de hoy EC (no mezclar las de ayer
    // que vienen en la ventana de 12h). Es el número que mira David al cobrar al moto.
    const propios = pedidos.filter((p) => p.motorizado_id === motoId && p.estado_pedido === 'entregado' && entregadoHoy(p));
    const ingresosHoy = propios.reduce((s, p) => s + (Number(p.precio_calculado) || 0), 0);
    return { entregasHoy: propios.length, ingresosHoy };
  };

  const esPend = (x) => x.estado === 'pendiente' || (!x.activo && x.estado !== 'suspendido' && x.estado !== 'rechazado');
  const ordenados = [...motorizados].sort((a, b) => {
    const pa = esPend(a), pb = esPend(b);
    if (pa !== pb) return pa ? -1 : 1; // pendientes de aprobación primero (necesitan acción)
    if (a.bloqueado_por_deuda !== b.bloqueado_por_deuda) return a.bloqueado_por_deuda ? -1 : 1;
    if (a.activo !== b.activo) return a.activo ? -1 : 1;
    if ((b.pedidos_activos || 0) !== (a.pedidos_activos || 0)) return (b.pedidos_activos || 0) - (a.pedidos_activos || 0);
    return (a.nombre || '').localeCompare(b.nombre || '');
  });

  return (
    <div className="p-3 space-y-2">
      {ordenados.length === 0 ? (
        <div className="text-center mt-12 text-gray-500">
          <p className="text-4xl mb-3">🏍️</p>
          <p className="text-sm">Sin motorizados</p>
        </div>
      ) : (
        ordenados.map((m) => (
          <MotoCard
            key={m.id}
            m={m}
            stats={statsByMoto(m.id)}
            deuda={deudas[m.id]}
            onMarcarPagado={marcarPagado}
            marcandoId={marcandoId}
            detalle={detalle[m.id]}
            onToggleCarreras={toggleCarreras}
            onHabilitar={habilitarMoto}
            onEliminar={eliminarMoto}
            accionandoId={accionandoId}
          />
        ))
      )}
    </div>
  );
}
