import { useState, useRef, useEffect } from 'react';
import { supabase, MIN_NO_ACEPTA } from '../lib/supabase';
import { fmtHora, hace, money, minutosDesde } from '../lib/time';
import { useTimer, useTimerSubir } from '../hooks/useTimer';
import { useSucursales } from '../hooks/useSucursales';
import TimerDisplay from './TimerDisplay';
import SelectorSucursal from './SelectorSucursal';
import { lanzarMotorizado, cancelarPedido as wCancelarPedido, restauranteNoPuede, timerRestaurante } from '../lib/webhooks';
import { stopAlertLoop, alertActiva } from '../lib/notifications';
import DesglosePedido from './DesglosePedido';

const ESTADO_LABEL = {
  pendiente: 'Pendiente',
  pendiente_restaurante: 'Esperando rest.',
  preparando: 'Preparando',
  confirmado: 'Buscando moto',
  aceptado: 'Moto asignada',
  en_camino: 'En camino al rest.',
  en_camino_entrega: 'Hacia cliente',
  llegado: 'Motorizado llegó',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

const ESTADO_COLOR = {
  pendiente: 'bg-gray-500/20 text-gray-300',
  pendiente_restaurante: 'bg-nuevo/20 text-nuevo',
  preparando: 'bg-preparando/20 text-preparando',
  confirmado: 'bg-buscando/20 text-buscando',
  aceptado: 'bg-encamino/20 text-encamino',
  en_camino: 'bg-encamino/20 text-encamino',
  en_camino_entrega: 'bg-encamino/20 text-encamino',
  llegado: 'bg-encamino/20 text-encamino',
  entregado: 'bg-dewan/20 text-dewan',
  cancelado: 'bg-gray-500/20 text-gray-400',
};

const ICONO_INTENCION = {
  pedido_comida: '🍔',
  encomienda: '📦',
  compras: '🛒',
};

// [19-jun] El moto se lanza cuando faltan estos minutos para que el plato esté listo.
// 15' → lanza a los 5'; 10' → lanza ya; 20' → a los 10'. El conteo se ve en admin; al
// expirar (cliente y cron server-side) se despacha a la app de motos.
const LEAD_LANZAMIENTO_MIN = 10;

function Boton({ children, onClick, color = 'dewan', disabled, full }) {
  const cls = {
    dewan: 'bg-dewan text-black',
    encamino: 'bg-encamino text-white',
    nuevo: 'bg-nuevo/15 text-nuevo border border-nuevo/30',
    preparando: 'bg-preparando/15 text-preparando border border-preparando/30',
    gris: 'bg-bg3 text-gray-300 border border-borde',
  }[color];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${cls} ${full ? 'flex-1' : ''} text-xs font-bold py-2 px-3 rounded-lg active:scale-95 transition-transform disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

export default function PedidoCard({ p, tipoAcuerdo }) {
  const [cargando, setCargando] = useState(false);
  const lanzadoRef = useRef(false);
  const { expirado } = useTimer(p.timer_lanzamiento);
  const tiempoEspera = useTimerSubir(p.fecha_creacion);
  const { sucursales, sucursalSeleccionada, setSucursalSeleccionada, requiereSucursal } = useSucursales(p);

  const esNoAliado = p.intencion === 'pedido_comida' && !p.restaurante_id;
  // Locales silencioso/cliente_paga tienen restaurante_id pero NUNCA confirman por app
  // → los maneja la operadora: botones de tiempo desde min 0 y SIN alarma "no responde".
  const operadoraTier = tipoAcuerdo === 'silencioso' || tipoAcuerdo === 'cliente_paga';
  const gestionadoOperadora = esNoAliado || operadoraTier;
  const colgado =
    p.intencion === 'pedido_comida' &&
    p.estado_pedido === 'pendiente_restaurante' && // si ya avanzó (preparando) ya no está "colgado"
    !p.operadora_atendido &&                        // si la operadora ya puso tiempo, no es "no respondió"
    p.restaurante_id &&
    !operadoraTier &&
    !p.restaurante_aceptado &&
    !p.restaurante_rechazado &&
    minutosDesde(p.fecha_creacion) >= MIN_NO_ACEPTA;
  const rechazado = !!p.restaurante_rechazado;
  const terminal = p.estado_pedido === 'entregado' || p.estado_pedido === 'cancelado';
  const borderColor = rechazado || colgado ? 'border-alerta' : esNoAliado && p.estado_pedido === 'pendiente_restaurante' ? 'border-yellow-500' : 'border-borde';
  const bgExtra = rechazado || colgado ? 'bg-alerta/5' : esNoAliado && p.estado_pedido === 'pendiente_restaurante' ? 'bg-yellow-500/5' : '';

  // [19-jun] Ubicación REGISTRADA del local (retiro): que la operadora vea a qué local va el moto,
  // aunque el restaurante tenga varias sucursales y solo una registrada.
  const retiroNombre = p.sucursal_nombre || sucursalSeleccionada?.nombre_completo || p.restaurante || 'Local';
  const retiroDireccion = p.direccion_retiro || sucursalSeleccionada?.direccion || '';
  const retiroLat = p.retiro_lat || sucursalSeleccionada?.latitud || null;
  const retiroLng = p.retiro_lng || sucursalSeleccionada?.longitud || null;

  const seleccionarTiempo = async (minutos) => {
    setCargando(true);
    try {
      const updateData = {
        estado_pedido: 'preparando',
        tiempo_preparacion: minutos,
        // [19-jun] lanzar al moto cuando falten LEAD_LANZAMIENTO_MIN (10) min para que esté listo
        timer_lanzamiento: new Date(Date.now() + Math.max(0, minutos - LEAD_LANZAMIENTO_MIN) * 60000).toISOString(),
        operadora_atendido: true,
        operadora_atendido_at: new Date().toISOString(),
      };
      if (sucursalSeleccionada) {
        updateData.sucursal_id = sucursalSeleccionada.id;
        updateData.sucursal_nombre = sucursalSeleccionada.nombre_completo;
        updateData.direccion_retiro = sucursalSeleccionada.direccion;
        // [19-jun] guardar coords de la sucursal elegida -> el mapa del moto apunta al local correcto
        updateData.retiro_lat = sucursalSeleccionada.latitud;
        updateData.retiro_lng = sucursalSeleccionada.longitud;
      }
      await supabase.from('pedidos_delivery').update(updateData).eq('id', p.id);
      await timerRestaurante(p, minutos).catch((e) => console.warn('webhook timer:', e?.message));
      stopAlertLoop(p.id);
    } catch (e) {
      console.error('seleccionarTiempo:', e);
      alert('No se pudo procesar');
    }
    setCargando(false);
  };

  const lanzarAhora = async (auto = false) => {
    setCargando(true);
    try {
      const sucursalId = sucursalSeleccionada?.id || p.sucursal_id || null;
      const updateData = { estado_pedido: 'confirmado' };
      if (sucursalSeleccionada && !p.sucursal_id) {
        updateData.sucursal_id = sucursalSeleccionada.id;
        updateData.sucursal_nombre = sucursalSeleccionada.nombre_completo;
        updateData.direccion_retiro = sucursalSeleccionada.direccion;
        updateData.retiro_lat = sucursalSeleccionada.latitud;
        updateData.retiro_lng = sucursalSeleccionada.longitud;
      }
      await supabase.from('pedidos_delivery').update(updateData).eq('id', p.id);
      await lanzarMotorizado(p.id, auto, sucursalId).catch((e) => console.warn('webhook lanzar:', e?.message));
      stopAlertLoop(p.id);
    } catch (e) {
      console.error('lanzar:', e);
      alert('No se pudo lanzar el pedido');
    }
    setCargando(false);
  };

  // Quitar el pedido al moto que ya lo aceptó y volver a ofrecerlo a todos los motorizados
  // (deja motorizado_id NULL + estado 'confirmado' y dispara lanzar-motorizado de inmediato).
  // El moto que lo tenía lo pierde en su app por realtime (el filtro es por motorizado_id).
  const quitarMotoYRelanzar = async () => {
    if (!confirm(`¿Quitar el pedido #${p.id} a ${p.nombre_moto?.trim() || 'la moto'} y relanzarlo a los motorizados?`)) return;
    setCargando(true);
    try {
      const sucursalId = sucursalSeleccionada?.id || p.sucursal_id || null;
      await supabase
        .from('pedidos_delivery')
        .update({
          estado_pedido: 'confirmado',
          motorizado_id: null,
          nombre_moto: '',
          telefono_moto: '',
          fecha_aceptado: null,
          estado_motorizado: 'pendiente',
        })
        .eq('id', p.id);
      await lanzarMotorizado(p.id, false, sucursalId).catch((e) => console.warn('webhook lanzar:', e?.message));
      stopAlertLoop(p.id);
    } catch (e) {
      console.error('quitarMotoYRelanzar:', e);
      alert('No se pudo relanzar el pedido');
    }
    setCargando(false);
  };

  useEffect(() => {
    if (p.estado_pedido === 'preparando' && expirado && !lanzadoRef.current && !requiereSucursal) {
      lanzadoRef.current = true;
      lanzarAhora(true);
    }
  }, [expirado, p.estado_pedido, requiereSucursal]);

  const agregar5 = async () => {
    if (!p.timer_lanzamiento) return;
    const nuevo = new Date(new Date(p.timer_lanzamiento).getTime() + 5 * 60000).toISOString();
    setCargando(true);
    try {
      await supabase
        .from('pedidos_delivery')
        .update({
          timer_lanzamiento: nuevo,
          tiempo_preparacion: (p.tiempo_preparacion || 0) + 5,
        })
        .eq('id', p.id);
      lanzadoRef.current = false;
    } catch (e) { console.error(e); }
    setCargando(false);
  };

  const cancelar = async () => {
    const aviso = p.motorizado_id
      ? `¿Cancelar pedido #${p.id}? Ya tiene motorizado asignado${p.nombre_moto ? ` (${p.nombre_moto})` : ''}.`
      : `¿Cancelar pedido #${p.id}?`;
    if (!confirm(aviso)) return;
    setCargando(true);
    try {
      await supabase
        .from('pedidos_delivery')
        .update({ estado_pedido: 'cancelado' })
        .eq('id', p.id);
      await wCancelarPedido(p, 'Cancelado por admin').catch(() => {});
      stopAlertLoop(p.id);
    } catch (e) {
      console.error(e); alert('No se pudo cancelar');
    }
    setCargando(false);
  };

  const escalarOperadora = async () => {
    if (!confirm(`¿Escalar #${p.id} a operadora? (restaurante no responde)`)) return;
    setCargando(true);
    try {
      await supabase
        .from('pedidos_delivery')
        .update({
          escalado_operadora: true,
          escalado_operadora_at: new Date().toISOString(),
        })
        .eq('id', p.id);
      await restauranteNoPuede(p).catch(() => {});
      stopAlertLoop(p.id);
    } catch (e) { console.error(e); }
    setCargando(false);
  };

  const silenciar = () => stopAlertLoop(p.id);

  return (
    <div className={`bg-tarjeta border ${borderColor} ${bgExtra} ${cargando ? 'opacity-60 pointer-events-none' : ''} rounded-xl p-3 space-y-2`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-base">{ICONO_INTENCION[p.intencion] || '📋'}</span>
          <span className="text-xs font-bold text-gray-300">#{p.id}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ESTADO_COLOR[p.estado_pedido] || 'bg-gray-500/20 text-gray-300'}`}>
            {ESTADO_LABEL[p.estado_pedido] || p.estado_pedido}
          </span>
        </div>
        {p.estado_pedido === 'preparando' && p.timer_lanzamiento ? (
          <TimerDisplay timerLanzamiento={p.timer_lanzamiento} compact />
        ) : (
          <span className="text-[10px] text-gray-500">{fmtHora(p.fecha_creacion)}</span>
        )}
      </div>

      {(rechazado || colgado) && (
        <div className="text-[11px] font-bold text-alerta">
          {rechazado
            ? `❌ Rechazado: ${p.restaurante_motivo_rechazo || 'sin motivo'}`
            : `⏰ Restaurante no responde (${minutosDesde(p.fecha_creacion)}m)`}
        </div>
      )}

      {esNoAliado && p.estado_pedido === 'pendiente_restaurante' && (
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-2 text-[11px] text-yellow-200 space-y-0.5">
          <div className="font-bold text-yellow-400">⚠️ Restaurante NO aliado</div>
          <div>El motorizado debe ir al local, pagar y traer el pedido.</div>
          <div>Define el tiempo de preparación abajo 👇</div>
        </div>
      )}

      {!esNoAliado && (p.escalado_operadora || operadoraTier) && p.estado_pedido === 'pendiente_restaurante' && (
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-2 text-[11px] text-yellow-200 space-y-0.5">
          <div className="font-bold text-yellow-400">
            {operadoraTier && !p.escalado_operadora ? '📋 Local gestionado por operadora' : '📞 Escalado a operadora'}
          </div>
          <div>
            {operadoraTier && !p.escalado_operadora
              ? 'Este local no confirma por la app. Define el tiempo de preparación abajo 👇'
              : 'El restaurante no respondió por su app. Define el tiempo de preparación abajo 👇'}
          </div>
        </div>
      )}

      {p.restaurante && <div className="text-sm font-bold text-white leading-tight">{p.restaurante}</div>}
      {p.detalle_pedido && <div className="text-xs text-gray-300 line-clamp-2">{p.detalle_pedido}</div>}

      {(p.estado_pedido === 'pendiente_restaurante' || p.estado_pedido === 'preparando') && sucursales.length > 1 && (
        <SelectorSucursal
          sucursales={sucursales}
          sucursalSeleccionada={sucursalSeleccionada}
          onSeleccionar={setSucursalSeleccionada}
        />
      )}

      {(retiroDireccion || (retiroLat && retiroLng)) && (
        <div className="bg-bg3/50 border border-borde rounded-lg p-2 text-[11px] space-y-0.5">
          <div className="font-bold text-gray-200">🏪 Retira en: {retiroNombre}</div>
          {retiroDireccion && <div className="text-gray-400 leading-snug">📍 {retiroDireccion}</div>}
          {retiroLat && retiroLng && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${retiroLat},${retiroLng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-buscando font-semibold"
            >
              🗺️ Ver ubicación del local
            </a>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap text-[11px] text-gray-400">
        {p.cliente_nombre && <span>👤 {p.cliente_nombre}</span>}
        {p.cliente_telefono && (
          <a href={`tel:${p.cliente_telefono}`} className="text-buscando">📞 {p.cliente_telefono}</a>
        )}
        {p.nombre_moto && <span>🏍️ {p.nombre_moto}</span>}
      </div>

      {p.direccion_entrega && <div className="text-[11px] text-gray-400 line-clamp-1">📍 {p.direccion_entrega}</div>}

      {/* Desglose de la carrera: paga al local (neto de comisión) / cobra al cliente / envío / markup.
          Mismos números que ve el motorizado (lib/precios.js). Solo aplica a pedidos de comida. */}
      {p.intencion === 'pedido_comida' && (p.monto_total != null || p.precio_base_productos != null) && (
        <DesglosePedido pedido={p} />
      )}

      {/* fix 2026-06-12 (#282): botones también con restaurante registrado cuando el
          pedido fue escalado o rechazado. fix 2026-06-16: + locales silencioso/cliente_paga
          (operadoraTier), que se gestionan por operadora y no confirman por app. */}
      {p.estado_pedido === 'pendiente_restaurante' && (gestionadoOperadora || p.escalado_operadora || rechazado) && !colgado && (
        <div className="flex gap-1.5 pt-1 flex-wrap">
          {[5, 10, 15, 20].map((min) => (
            <Boton
              key={min}
              color="dewan"
              onClick={() => seleccionarTiempo(min)}
              disabled={cargando || requiereSucursal}
            >
              {min}'
            </Boton>
          ))}
          {!p.escalado_operadora && !operadoraTier && (
            <Boton color="nuevo" onClick={escalarOperadora} disabled={cargando}>❌ No puede</Boton>
          )}
        </div>
      )}

      {p.estado_pedido === 'preparando' && (
        <div className="flex gap-1.5 pt-1">
          <Boton color="encamino" full onClick={() => lanzarAhora(false)} disabled={cargando || requiereSucursal}>🚀 Lanzar ahora</Boton>
          <Boton color="preparando" onClick={agregar5} disabled={cargando}>+5'</Boton>
        </div>
      )}

      {p.estado_pedido === 'confirmado' && !p.motorizado_id && (
        <div className="flex items-center gap-2 pt-1">
          <div className="text-[11px] text-buscando font-semibold">
            🔍 Buscando moto ({tiempoEspera.texto})
          </div>
        </div>
      )}

      {/* Moto ya asignado: permitir quitárselo y volver a lanzar la carrera a todos los motos */}
      {p.motorizado_id && !terminal && (
        <div className="flex gap-1.5 pt-1">
          <Boton color="nuevo" full onClick={quitarMotoYRelanzar} disabled={cargando}>
            🔄 Quitar moto y relanzar
          </Boton>
        </div>
      )}

      {p.estado_pedido === 'pendiente_restaurante' && colgado && (
        <div className="flex gap-1.5 pt-1">
          <Boton color="encamino" full onClick={() => lanzarAhora(false)} disabled={cargando}>🚀 Forzar lanzar</Boton>
          <Boton color="preparando" onClick={escalarOperadora} disabled={cargando}>📞 Operadora</Boton>
        </div>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-borde">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">{hace(p.fecha_creacion)}</span>
          {alertActiva(p.id) && (
            <button onClick={silenciar} className="text-[10px] text-alerta border border-alerta/40 rounded px-1.5 py-0.5">
              🔇 Silenciar
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {p.precio_calculado != null && <span className="text-xs font-bold text-dewan">{money(p.precio_calculado)}</span>}
          {/* ✕ Cancelar SIEMPRE disponible mientras el pedido no esté terminado, sin importar
              el estado (también con moto asignada / en camino / pendiente aliado). */}
          {!terminal && (
            <button
              onClick={cancelar}
              disabled={cargando}
              className="text-[11px] font-bold text-alerta border border-alerta/40 rounded-lg px-2 py-1 active:scale-95 transition-transform disabled:opacity-50"
            >
              ✕ Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
