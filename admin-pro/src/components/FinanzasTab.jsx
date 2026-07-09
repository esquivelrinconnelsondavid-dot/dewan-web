import { useEffect, useState, useCallback, useMemo } from 'react';
import { money, HOY_ISO, entregadoHoy, creadoHoy } from '../lib/time';
import { supabase } from '../lib/supabase';

const num = (v) => Number(v) || 0;

function tierInfo(t) {
  if (t === 'aliado') return { txt: 'Aliado', cls: 'bg-dewan/20 text-dewan', markup: true };
  if (t === 'cliente_paga') return { txt: 'Cliente paga', cls: 'bg-encamino/20 text-encamino', markup: true };
  if (t === 'silencioso') return { txt: 'Silencioso', cls: 'bg-gray-500/20 text-gray-400', markup: false };
  return { txt: t || '—', cls: 'bg-gray-500/20 text-gray-400', markup: false };
}

function LineaIngreso({ label, valor, signo = '+', color = 'text-white', sub }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <span className="text-xs text-gray-300">{label}</span>
        {sub && <span className="text-[10px] text-gray-500 ml-1">{sub}</span>}
      </div>
      <span className={`text-sm font-bold ${color}`}>
        {signo === '-' ? '−' : ''}{money(valor)}
      </span>
    </div>
  );
}

export default function FinanzasTab({ data }) {
  const { pedidos, restaurantes } = data;
  const [cupones, setCupones] = useState([]);
  const [deudasHoy, setDeudasHoy] = useState([]);

  const restById = useMemo(() => {
    const m = new Map();
    restaurantes.forEach((r) => m.set(r.id, r));
    return m;
  }, [restaurantes]);

  const restDe = useCallback(
    (p) => (p.restaurante_id ? restById.get(p.restaurante_id) : null) || restaurantes.find((x) => x.nombre === p.restaurante) || null,
    [restById, restaurantes]
  );

  const cargarCupones = useCallback(async () => {
    const { data: rows, error } = await supabase
      .from('cupones_usuario')
      .select('id, telefono, codigo, monto, min_pedido, creado_en, vence_en, usado_en, pedido_id')
      .order('creado_en', { ascending: false })
      .limit(500);
    if (error) { console.warn('[cupones]', error); return; }
    setCupones(rows || []);
  }, []);

  // Tarifa real de carreras del día: se suma monto_carreras de deudas_diarias
  // (fuente de verdad de lo que el moto debe a DEWAN, hoy $0.70/carrera) en vez
  // de una constante hardcodeada — así Finanzas sigue correcto si la tarifa cambia.
  const cargarDeudas = useCallback(async () => {
    const hoy = HOY_ISO().slice(0, 10); // YYYY-MM-DD en hora EC
    const { data: rows, error } = await supabase
      .from('deudas_diarias')
      .select('monto_carreras, cantidad_carreras, fecha')
      .eq('fecha', hoy);
    if (error) { console.warn('[deudas]', error); return; }
    setDeudasHoy(rows || []);
  }, []);

  useEffect(() => { cargarCupones(); cargarDeudas(); }, [cargarCupones, cargarDeudas]);

  useEffect(() => {
    const ch = supabase
      .channel('admin-pro-finanzas')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cupones_usuario' }, () => cargarCupones())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deudas_diarias' }, () => cargarDeudas())
      .subscribe();
    return () => { ch.unsubscribe(); };
  }, [cargarCupones, cargarDeudas]);

  // useAdminData trae pedidos con 12h de margen (para no perder activos que cruzan
  // medianoche) → acá hay que recortar a HOY EC, si no los ingresos del día mezclan ayer.
  const delDia = useMemo(() => pedidos.filter((p) => p.estado_pedido !== 'cancelado' && creadoHoy(p)), [pedidos]);
  const entregados = useMemo(() => pedidos.filter((p) => p.estado_pedido === 'entregado' && entregadoHoy(p)), [pedidos]);

  // === Ingresos DEWAN realizados ===
  // Tarifa de carreras: suma real de deudas_diarias de hoy (antes era 0.35 hardcode → mostraba la mitad).
  const tarifaEntregas = deudasHoy.reduce((s, d) => s + num(d.monto_carreras), 0);
  const nCarreras = deudasHoy.reduce((s, d) => s + num(d.cantidad_carreras), 0);
  const comisionLocales = entregados.reduce((s, p) => s + num(p.monto_comision ?? p.comision), 0);
  const markupLocales = entregados.reduce((s, p) => s + num(p.markup_dewan), 0);
  // Tarifa de servicio al cliente ($0.10, ingreso DEWAN). Hoy llega en 0 hasta que el bot la escriba.
  const tarifaServicio = entregados.reduce((s, p) => s + num(p.tarifa_servicio), 0);
  const cuponesCanjeados = entregados.reduce((s, p) => s + num(p.cupon_descuento), 0);
  const netoDewan = tarifaEntregas + comisionLocales + markupLocales + tarifaServicio - cuponesCanjeados;

  // === Diagnóstico: pedidos de hoy de restaurantes con markup_pct>0 pero markup_dewan=0 ===
  const sinMarkup = useMemo(
    () =>
      delDia.filter((p) => {
        const r = restDe(p);
        return num(r?.markup_pct) > 0 && num(p.markup_dewan) === 0;
      }),
    [delDia, restDe]
  );

  // === Cupones ===
  const hoyMs = new Date(HOY_ISO()).getTime();
  const ahora = Date.now();
  const ms = (iso) => (iso ? new Date(iso).getTime() : 0);

  const cupEmitidosHoy = cupones.filter((c) => ms(c.creado_en) >= hoyMs);
  const cupCanjeadosHoy = cupones.filter((c) => c.usado_en && ms(c.usado_en) >= hoyMs);
  const cupActivos = cupones.filter((c) => !c.usado_en && (!c.vence_en || ms(c.vence_en) > ahora));

  const contarPorCodigo = (lista) => {
    const m = {};
    lista.forEach((c) => { m[c.codigo] = (m[c.codigo] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  };
  const activosPorCodigo = contarPorCodigo(cupActivos);
  const montoCanjeadoHoy = cupCanjeadosHoy.reduce((s, c) => s + num(c.monto), 0);

  // === Markup / actividad por restaurante (hoy) ===
  const porRest = useMemo(() => {
    const m = new Map();
    delDia.forEach((p) => {
      const r = restDe(p);
      const key = r?.id || p.restaurante || 'desconocido';
      const cur = m.get(key) || {
        nombre: r?.nombre || p.restaurante || 'Desconocido',
        tier: r?.tipo_acuerdo || null,
        markupPct: num(r?.markup_pct),
        pedidos: 0,
        markup: 0,
        sinRegistrar: 0,
      };
      cur.pedidos += 1;
      cur.markup += num(p.markup_dewan);
      if (cur.markupPct > 0 && num(p.markup_dewan) === 0) cur.sinRegistrar += 1;
      m.set(key, cur);
    });
    return Array.from(m.values()).sort(
      (a, b) => b.markup - a.markup || b.sinRegistrar - a.sinRegistrar || b.pedidos - a.pedidos
    );
  }, [delDia, restDe]);

  return (
    <div className="p-3 space-y-3">
      {/* === INGRESOS DEWAN HOY === */}
      <div className="bg-tarjeta border border-borde rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💵</span>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Ingresos DEWAN hoy</span>
          <span className="text-[10px] text-gray-500 ml-auto">{entregados.length} entregas</span>
        </div>
        <div className="divide-y divide-borde">
          <LineaIngreso label="Tarifa carreras" sub={`${nCarreras} carrera${nCarreras === 1 ? '' : 's'}`} valor={tarifaEntregas} color="text-gray-200" />
          <LineaIngreso label="Comisión locales" valor={comisionLocales} color="text-preparando" />
          <LineaIngreso label="Markup locales" valor={markupLocales} color="text-buscando" />
          <LineaIngreso label="Tarifa servicio" sub="$0.10/cliente" valor={tarifaServicio} color="text-gray-200" />
          <LineaIngreso label="Cupones canjeados" valor={cuponesCanjeados} signo="-" color="text-alerta" />
        </div>
        <div className="flex items-center justify-between pt-2 mt-1 border-t-2 border-dewan/40">
          <span className="text-sm font-bold text-white">Neto DEWAN</span>
          <span className="text-xl font-black text-dewan">{money(netoDewan)}</span>
        </div>
      </div>

      {/* === DIAGNÓSTICO markup no registrado === */}
      {sinMarkup.length > 0 && (
        <div className="bg-alerta/15 border border-alerta rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">⚠️</span>
            <span className="text-alerta font-bold text-sm">Markup no registrado</span>
          </div>
          <div className="text-xs text-white">
            <b>{sinMarkup.length}</b> pedido(s) de hoy de restaurantes con markup ({'>'}0%) llegaron con <b>markup $0</b>.
            El bot no está escribiendo el markup → revisá el flujo <span className="text-gray-300">delivery-v4.1</span> o probá el pedido end-to-end.
          </div>
        </div>
      )}

      {/* === CUPONES === */}
      <div className="bg-tarjeta border border-borde rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎁</span>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Cupones</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div>
            <div className="text-lg font-black text-dewan">{cupEmitidosHoy.length}</div>
            <div className="text-[9px] text-gray-500 uppercase">Emitidos hoy</div>
          </div>
          <div>
            <div className="text-lg font-black text-white">{cupCanjeadosHoy.length}</div>
            <div className="text-[9px] text-gray-500 uppercase">Canjeados hoy</div>
          </div>
          <div>
            <div className="text-lg font-black text-preparando">{cupActivos.length}</div>
            <div className="text-[9px] text-gray-500 uppercase">Activos</div>
          </div>
        </div>
        {montoCanjeadoHoy > 0 && (
          <div className="text-[11px] text-gray-400 mb-2 text-center">
            Descuento entregado hoy: <b className="text-alerta">{money(montoCanjeadoHoy)}</b>
          </div>
        )}
        {activosPorCodigo.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {activosPorCodigo.map(([codigo, n]) => (
              <span key={codigo} className="text-[10px] font-bold px-2 py-1 rounded-lg bg-bg3 text-gray-200 border border-borde">
                {codigo} · {n}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-gray-500 text-center py-1">Sin cupones activos todavía</div>
        )}
      </div>

      {/* === MARKUP / ACTIVIDAD POR RESTAURANTE === */}
      <div className="bg-tarjeta border border-borde rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 text-[10px] text-gray-400 uppercase border-b border-borde px-3 py-2 bg-bg3">
          <div className="col-span-6">Restaurante</div>
          <div className="col-span-2 text-right">Ped.</div>
          <div className="col-span-4 text-right">Markup</div>
        </div>
        {porRest.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">Sin pedidos hoy</div>
        ) : (
          porRest.map((r) => {
            const t = tierInfo(r.tier);
            return (
              <div key={r.nombre} className="grid grid-cols-12 items-center px-3 py-2 border-b border-borde last:border-0 text-xs">
                <div className="col-span-6 min-w-0">
                  <div className="text-white font-semibold truncate">{r.nombre}</div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${t.cls}`}>
                    {t.txt}{t.markup ? ` ${r.markupPct}%` : ''}
                  </span>
                </div>
                <div className="col-span-2 text-right text-gray-300">{r.pedidos}</div>
                <div className="col-span-4 text-right">
                  {r.markup > 0 ? (
                    <span className="text-buscando font-bold">{money(r.markup)}</span>
                  ) : t.markup ? (
                    <span className="text-alerta font-semibold">$0 ⚠️</span>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="text-[10px] text-gray-600 text-center px-4">
        Markup y cupones se leen de los datos reales que escribe el bot. Mientras el pipeline no escriba markup, los aliados aparecen con $0 ⚠️.
      </p>
    </div>
  );
}
