import { useState } from 'react';
import { useMetricas } from '../hooks/useMetricas';
import { formatHoraEC, formatFechaCortaEC, formatDinero } from '../lib/formato';
import { imprimirComanda } from '../lib/comanda';
import { MODO_HP } from '../lib/config';

const RANGOS = [
  { id: 'hoy', label: 'Hoy' },
  { id: 'ayer', label: 'Ayer' },
  { id: '7d', label: '7 días' },
  { id: '30d', label: '30 días' },
];

function badgeClasses(estado) {
  switch (estado) {
    case 'entregado':
      return 'bg-encamino/20 text-encamino';
    case 'preparando':
      return 'bg-preparando/20 text-preparando';
    case 'cancelado':
    case 'pendiente_restaurante':
      return 'bg-nuevo/20 text-nuevo';
    case 'confirmado':
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
      <p className={`text-2xl font-bold ${principal ? 'text-dewan' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

function GraficoBarras({ porDia }) {
  if (porDia.length === 0) return null;
  const max = Math.max(...porDia.map((d) => d.ingresos), 1);
  return (
    <div className="bg-tarjeta rounded-xl p-4 border border-borde">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
        Ingresos por día
      </p>
      <div className="flex items-end gap-1 h-32">
        {porDia.map((d) => {
          const h = (d.ingresos / max) * 100;
          return (
            <div key={d.dia} className="flex-1 flex flex-col items-center gap-1 min-w-0">
              <div className="text-[9px] text-gray-400 font-semibold">
                ${d.ingresos.toFixed(0)}
              </div>
              <div className="w-full bg-fondo rounded-t overflow-hidden flex-1 flex items-end">
                <div
                  className="w-full bg-dewan transition-all"
                  style={{ height: `${Math.max(h, 2)}%` }}
                />
              </div>
              <div className="text-[9px] text-gray-500 truncate w-full text-center">
                {formatFechaCortaEC(d.dia + 'T12:00:00Z')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Detalle desplegable de un pedido en Ventas (solo HP) + botón para volver a
// imprimir la comanda (por si la impresora se trabó o se cortó el papel). Usa
// la impresora ya configurada en Ajustes; en navegador (no-Electron) avisa.
function DetalleReimprimir({ p, restauranteNombre }) {
  const [imprimiendo, setImprimiendo] = useState(false);
  const [msg, setMsg] = useState('');
  const base = Number(p.precio_base_productos) || 0;
  const total = Number(p.monto_total) || 0;
  const envio = total > base ? Math.round((total - base) * 100) / 100 : 0;
  const items = String(p.detalle_pedido || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const reimprimir = async () => {
    setImprimiendo(true);
    setMsg('');
    const r = await imprimirComanda(p, { restauranteNombre });
    setImprimiendo(false);
    if (r.ok) setMsg('✅ Enviado a la impresora');
    else if (r.motivo === 'no-electron') setMsg('Solo desde la app de escritorio (la caja)');
    else setMsg('⚠️ No se pudo imprimir: ' + (r.motivo || 'error'));
  };

  return (
    <div className="px-4 pb-3 bg-fondo/40 border-t border-borde text-sm">
      {items.length > 0 && (
        <div className="py-2 space-y-0.5">
          {items.map((l, i) => (
            <div key={i} className="text-gray-200">{l}</div>
          ))}
        </div>
      )}
      <div className="space-y-0.5 border-t border-borde pt-2">
        {base > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Productos</span>
            <span className="text-white">{formatDinero(base)}</span>
          </div>
        )}
        {envio > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Envío</span>
            <span className="text-white">{formatDinero(envio)}</span>
          </div>
        )}
        {total > 0 && (
          <div className="flex justify-between font-bold">
            <span className="text-gray-300">Total</span>
            <span className="text-dewan">{formatDinero(total)}</span>
          </div>
        )}
      </div>
      {p.direccion_entrega && (
        <div className="text-gray-400 text-xs mt-2 break-words">📍 {p.direccion_entrega}</div>
      )}
      {p.metodo_pago && (
        <div className="text-gray-400 text-xs mt-1">
          Pago: {/transfer/i.test(p.metodo_pago) ? 'Transferencia' : 'Efectivo'}
        </div>
      )}
      <button
        onClick={reimprimir}
        disabled={imprimiendo}
        className="mt-3 w-full bg-dewan text-white font-bold py-2.5 rounded-xl disabled:opacity-60"
      >
        {imprimiendo ? 'Imprimiendo…' : '🖨️ Reimprimir comanda'}
      </button>
      {msg && <div className="text-center text-xs text-gray-400 mt-1.5">{msg}</div>}
    </div>
  );
}

export default function VistaVentas({ restaurante }) {
  const [rango, setRango] = useState('hoy');
  const [expandido, setExpandido] = useState(null);
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
    porDia,
    rangoLabel,
    cargando,
  } = useMetricas(restaurante, rango);

  const mostrarSerie = rango === '7d' || rango === '30d';
  const sinMontos = ingresosBruto === 0;

  return (
    <div className="px-3 pt-3 pb-8 space-y-4">
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {RANGOS.map((r) => (
          <button
            key={r.id}
            onClick={() => setRango(r.id)}
            className={`text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg border whitespace-nowrap transition-colors ${
              rango === r.id
                ? 'bg-dewan text-fondo border-dewan'
                : 'bg-tarjeta text-gray-300 border-borde'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin" />
        </div>
      ) : total === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 text-center mt-10">
          <p className="text-7xl mb-4">📊</p>
          <h2 className="text-white font-bold text-xl mb-2">
            Sin pedidos en {rangoLabel.toLowerCase()}
          </h2>
          <p className="text-gray-400 text-sm">Probá con otro rango.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard
              label="Pedidos"
              value={total}
              sub={`${aceptados.length} aceptados · ${rechazados.length} rechazados`}
              principal
            />
            <KpiCard
              label="Ingresos netos"
              value={sinMontos ? '—' : formatDinero(ingresosNeto)}
              sub={
                sinMontos
                  ? 'Sin monto registrado'
                  : `Bruto ${formatDinero(ingresosBruto)} · Comisión ${formatDinero(comisionTotal)}`
              }
              principal
            />
            <KpiCard
              label="Ticket promedio"
              value={ticketPromedio > 0 ? formatDinero(ticketPromedio) : '—'}
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

          {mostrarSerie && porDia.length > 1 && <GraficoBarras porDia={porDia} />}

          <div className="bg-tarjeta rounded-xl border border-borde overflow-hidden">
            <div className="px-4 py-3 border-b border-borde">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Pedidos ({pedidos.length})
              </p>
            </div>
            <div className="divide-y divide-borde max-h-96 overflow-y-auto">
              {pedidos.map((p) => {
                // Venta base del local (SIN markup DEWAN): precio_base_productos,
                // o fallback histórico monto_total - markup_dewan cuando es null.
                const monto =
                  p.precio_base_productos !== null && p.precio_base_productos !== undefined
                    ? p.precio_base_productos
                    : (Number(p.monto_total) || 0) - (Number(p.markup_dewan) || 0);
                const montoTxt =
                  monto === null || monto === undefined || Number(monto) === 0
                    ? '—'
                    : formatDinero(monto);
                const nombre = p.nombre_cliente || p.cliente_nombre || p.cliente || 'Cliente';
                const abierto = MODO_HP && expandido === p.id;
                return (
                  <div key={p.id}>
                    <div
                      className={`px-4 py-3 flex items-center gap-3 text-sm ${
                        MODO_HP ? 'cursor-pointer active:bg-borde/40' : ''
                      }`}
                      onClick={MODO_HP ? () => setExpandido(abierto ? null : p.id) : undefined}
                    >
                      <div className="text-xs text-gray-400 font-mono shrink-0 w-14">
                        <div>{formatHoraEC(p.fecha_creacion)}</div>
                        {rango !== 'hoy' && (
                          <div className="text-[10px]">
                            {formatFechaCortaEC(p.fecha_creacion)}
                          </div>
                        )}
                      </div>
                      <span className="flex-1 text-white truncate">{nombre}</span>
                      <span className="text-gray-300 font-semibold shrink-0">{montoTxt}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-1 shrink-0 ${badgeClasses(
                          p.estado_pedido
                        )}`}
                      >
                        {labelEstado(p.estado_pedido)}
                      </span>
                      {MODO_HP && (
                        <span className="text-gray-500 shrink-0 w-3 text-center">
                          {abierto ? '▾' : '▸'}
                        </span>
                      )}
                    </div>
                    {abierto && (
                      <DetalleReimprimir p={p} restauranteNombre={restaurante?.nombre} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
