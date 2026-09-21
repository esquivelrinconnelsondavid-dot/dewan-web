import { useEffect, useState } from 'react';
import { calcularPagoAlRestaurante, formatDinero, formatHoraEC } from '../lib/formato';
import { hayImpresion, imprimirComanda } from '../lib/comanda';
import { MODO_HP, MODO_SISTEMA, codigoPedido, esDomicilio } from '../lib/config';
import { aceptarPedido, rechazarPedido, marcarEntregado, marcarSalio, sumarMinutos, marcarListoDewan, marcarListoSistema } from '../lib/pedidos';
import { parsearDetalle, limpiarDireccion, telefonoLocal, canalPedido, inicial, colorInicial, haceCuanto } from '../lib/detalle';
import { IcoCheck, IcoImpresora, IcoTelefono, IcoPin, IcoNota, IcoMoto, IcoReloj, IcoAlerta } from './Iconos';

// El ticket del tablero (14-sep-2026), con la anatomía de las apps de socios grandes:
// número enorme, cliente, cantidades en negrita, extras indentados, la nota resaltada,
// el dinero al pie y los botones de la etapa. Un solo componente para las 4 columnas
// (nuevo · preparando · listo · entregando) y para el celular; `grande` = la pantalla
// de "Nuevo pedido" que toma toda la ventana.
const TIEMPOS_PRESET = [10, 15, 20, 30, 45];
const MOTIVOS_RECHAZO = ['Se acabó un producto', 'Cocina saturada', 'Cerramos ya', 'Muy lejos', 'Otro'];

const LABEL_MOTO = {
  confirmado: 'Buscando motorizado',
  asignado: 'Motorizado asignado',
  aceptado: 'La moto viene al local',
  en_camino_recogida: 'La moto viene al local',
  en_camino_entrega: 'En camino al cliente',
  en_camino: 'En camino al cliente',
  recogido: 'Recogido · en camino',
  llegado: 'La moto llegó al cliente',
  listo: 'Listo',
};

// Teléfono del cliente / motorizado (19-sep-2026): antes solo decía "Llamar" (un
// enlace tel:), que en la PC del local no abre nada — no tienen WhatsApp ni marcador —
// y el local no veía el número. Ahora el NÚMERO va escrito al lado, siempre, y en el
// EXE tocarlo lo copia al portapapeles; en el celular/tablet sigue marcando.
function Telefono({ tel, extra = '' }) {
  const [copiado, setCopiado] = useState(false);
  const esEscritorio = !!(window.electronAPI && window.electronAPI.isElectron);
  const copiar = (e) => {
    if (!esEscritorio) return; // celular/tablet: deja que el tel: marque
    e.preventDefault();
    try { navigator.clipboard.writeText(tel); } catch { /* sin portapapeles: el número igual se lee */ }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };
  return (
    <a href={`tel:${tel}`} onClick={copiar} title={esEscritorio ? 'Tocar para copiar el número' : 'Llamar'}
      className={`flex items-center gap-1 text-[12px] font-semibold text-buscando active:opacity-70 shrink-0 ${extra}`}>
      <IcoTelefono size={14} />
      <span className="font-mono text-white tracking-wide select-all">{tel}</span>
      <span className="text-gray-400 font-normal">{copiado ? '· copiado' : (esEscritorio ? '' : '· Llamar')}</span>
    </a>
  );
}

function formatearMs(ms) {
  if (ms === null || !isFinite(ms)) return '—';
  const neg = ms < 0;
  const abs = Math.abs(ms);
  const min = Math.floor(abs / 60000);
  const seg = Math.floor((abs % 60000) / 1000);
  return `${neg ? '-' : ''}${min}:${String(seg).padStart(2, '0')}`;
}

// Hora en que el local prometió tener el pedido: aceptado (o atendido por la operadora) +
// minutos de preparación. OJO: `timer_lanzamiento` NO es esa hora, es cuándo sale la moto
// (10 min antes en DEWAN, ver LEAD_MOTO_MIN en lib/pedidos.js); queda solo de respaldo.
function horaPrometida(p) {
  const base = p?.restaurante_aceptado_at || p?.operadora_atendido_at;
  const min = Number(p?.tiempo_preparacion);
  if (base && min > 0) return new Date(base).getTime() + min * 60000;
  return p?.timer_lanzamiento ? new Date(p.timer_lanzamiento).getTime() : null;
}

// Anillo de tiempo: verde → ámbar a la mitad → rojo si se pasó (patrón iFood).
function AnilloTiempo({ pedido, tam = 56 }) {
  const [ahora, setAhora] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const fin = horaPrometida(pedido);
  if (!fin) return null;
  const total = Math.max(1, (Number(pedido.tiempo_preparacion) || 15) * 60000);
  const restante = fin - ahora;
  const frac = Math.max(0, Math.min(1, restante / total));
  const color = restante < 0 ? 'rgb(var(--c-nuevo))' : frac <= 0.5 ? 'rgb(var(--c-preparando))' : 'rgb(var(--c-encamino))';
  const r = (tam - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: tam, height: tam }} title={`Prometió ${pedido.tiempo_preparacion || '—'} min`}>
      <svg viewBox={`0 0 ${tam} ${tam}`} width={tam} height={tam}>
        <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke="rgb(var(--c-bg4))" strokeWidth="6" />
        <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - frac)} transform={`rotate(-90 ${tam / 2} ${tam / 2})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono font-bold tabular-nums" style={{ color, fontSize: tam >= 72 ? 16 : 12 }}>
        {formatearMs(restante)}
      </div>
    </div>
  );
}

function Chip({ children, tono = 'gris' }) {
  const cls = {
    gris: 'bg-bg4 text-gray-300',
    azul: 'bg-buscando/15 text-buscando',
    ambar: 'bg-preparando/15 text-preparando',
    verde: 'bg-encamino/15 text-encamino',
    rojo: 'bg-nuevo/15 text-nuevo',
  }[tono];
  return <span className={`text-[11px] font-bold rounded-full px-2 py-0.5 whitespace-nowrap ${cls}`}>{children}</span>;
}

function Items({ detalle, grande }) {
  const d = parsearDetalle(detalle);
  const fs = grande ? 'text-lg' : 'text-sm';
  const fq = grande ? 'text-xl' : 'text-[15px]';
  if (!d.items.length) {
    return <p className={`${grande ? 'text-base' : 'text-sm'} text-white whitespace-pre-line`}>{detalle || '—'}</p>;
  }
  return (
    <div className="flex flex-col gap-1.5">
      {d.items.map((it, i) => (
        <div key={i} className="grid gap-2 items-baseline" style={{ gridTemplateColumns: `${grande ? 40 : 28}px minmax(0,1fr) ${grande ? 80 : 60}px` }}>
          <span className={`font-mono font-bold text-white ${fq}`}>{it.q}×</span>
          <span className={`font-semibold text-white ${fs}`}>{it.n}</span>
          <span className={`font-mono text-gray-300 text-right ${grande ? 'text-base' : 'text-[13px]'}`}>{it.p != null ? it.p.toFixed(2) : ''}</span>
        </div>
      ))}
      {d.notas.map((n, i) => (
        <div key={`n${i}`} className={`flex items-start gap-2 mt-1 rounded-lg px-2.5 py-2 bg-preparando/15 text-preparando font-semibold ${grande ? 'text-[15px]' : 'text-[12.5px]'}`}>
          <span className="mt-0.5 shrink-0"><IcoNota size={grande ? 16 : 14} /></span>
          <span>{n}</span>
        </div>
      ))}
      {d.extras.map((x, i) => (
        <div key={`x${i}`} className="text-[12px] text-gray-400">{x}</div>
      ))}
    </div>
  );
}

function Dinero({ pedido, grande }) {
  const { total: base, comision, laPagaRestaurante, recibe } = calcularPagoAlRestaurante(pedido);
  if (!(base > 0)) return null;
  if (MODO_HP) {
    return <div className={`text-gray-400 ${grande ? 'text-sm' : 'text-xs'}`}>Total <span className="font-mono font-bold text-white">{formatDinero(base)}</span></div>;
  }
  return (
    <div className={`flex flex-col gap-0.5 text-gray-400 ${grande ? 'text-sm' : 'text-xs'}`}>
      <div>Tu venta <span className="font-mono font-bold text-white">{formatDinero(base)}</span>{laPagaRestaurante && comision > 0 ? <span> · comisión −{formatDinero(comision)}</span> : null}</div>
      <div>El motorizado te entrega <span className="font-mono font-bold text-dewan">{formatDinero(recibe)}</span></div>
    </div>
  );
}

function BotonPrimario({ children, onClick, disabled, alto = 'h-11', extra = '' }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`flex-1 ${alto} rounded-[10px] bg-dewan text-white font-extrabold flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50 ${extra}`}>
      {children}
    </button>
  );
}
function BotonSecundario({ children, onClick, disabled, alto = 'h-11', extra = '', title }) {
  return (
    <button onClick={onClick} disabled={disabled} title={title}
      className={`${alto} px-3.5 rounded-[10px] border border-borde bg-tarjeta text-white font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform disabled:opacity-50 ${extra}`}>
      {children}
    </button>
  );
}

export default function Ticket({ pedido, columna, grande = false, ocupadoMin = 0, onHecho }) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [minutos, setMinutos] = useState(() => {
    const base = 15 + (Number(ocupadoMin) || 0);
    return TIEMPOS_PRESET.reduce((a, b) => (Math.abs(b - base) < Math.abs(a - base) ? b : a), 15);
  });
  const [rechazando, setRechazando] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [, tic] = useState(0);
  // "hace 0:42" se refresca cada 15 s (no hace falta cada segundo)
  useEffect(() => {
    if (columna !== 'nuevo') return undefined;
    const id = setInterval(() => tic((n) => n + 1), 15000);
    return () => clearInterval(id);
  }, [columna]);

  const domicilio = esDomicilio(pedido);
  const motoDewan = MODO_SISTEMA && domicilio;
  // ¿La entrega al cliente la hace una moto DEWAN? Entonces el local NUNCA marca
  // "entregado": él se lo entrega AL MOTORIZADO. (Happy Pollo reparte con su gente.)
  const conMoto = !MODO_HP ? domicilio : motoDewan;
  const nombreRest = pedido.restaurante || pedido.restaurante_nombre;
  const telCliente = telefonoLocal(pedido.cliente_telefono);
  const telMoto = telefonoLocal(pedido.telefono_moto);
  const moto = pedido.nombre_moto ? String(pedido.nombre_moto).trim().split(' ').slice(0, 2).join(' ') : '';
  const dir = limpiarDireccion(pedido.direccion_entrega);
  const canal = canalPedido(pedido);
  const km = Number(pedido.distancia_km) || 0;
  const pago = pedido.metodo_pago || parsearDetalle(pedido.detalle_pedido).pago;

  const correr = async (fn, msjError) => {
    setCargando(true); setError('');
    try {
      await fn();
      if (onHecho) onHecho();
    } catch (e) {
      console.error(msjError, e);
      setError(msjError);
    } finally {
      setCargando(false);
    }
  };

  const aceptar = () => correr(async () => {
    await aceptarPedido(pedido, minutos);
    if (hayImpresion()) {
      try { await imprimirComanda({ ...pedido, tiempo_preparacion: minutos }, { restauranteNombre: nombreRest }); } catch (e) { console.warn('[ticket] impresión', e); }
    }
  }, 'No se pudo aceptar. Revisa la conexión e intenta de nuevo.');
  const rechazar = () => correr(() => rechazarPedido(pedido.id, motivo || 'No podemos preparar este pedido'), 'No se pudo rechazar. Intenta de nuevo.');
  const masCinco = () => correr(() => sumarMinutos(pedido, 5), 'No se pudo sumar tiempo.');
  // "Listo" = la comida está lista. OJO: cuando la entrega la hace una moto (DEWAN o
  // SISTEMA a domicilio) esto NO cierra el pedido: el local se lo da al MOTORIZADO y es
  // el motorizado quien marca la entrega al cliente desde su app. Solo cuando el local
  // mismo entrega (Happy Pollo, o retiro en mostrador) "listo" cierra el pedido.
  const listo = () => correr(async () => {
    if (MODO_SISTEMA) {
      if (motoDewan) await marcarListoSistema(pedido);
      else await marcarSalio(pedido);
    } else if (MODO_HP) {
      await marcarEntregado(pedido.id);
    } else {
      await marcarListoDewan(pedido);
    }
  }, 'No se pudo marcar. Intenta de nuevo.');
  const entregado = () => correr(() => marcarEntregado(pedido.id), 'No se pudo marcar como entregado.');
  const reimprimir = async () => {
    const r = await imprimirComanda(pedido, { restauranteNombre: nombreRest });
    if (!r?.ok && r?.motivo === 'no-electron') setError('Solo se imprime desde la app de escritorio (la caja).');
  };

  const esNuevo = columna === 'nuevo';
  const compacto = !grande && (columna === 'listo' || columna === 'entregando');
  const pad = grande ? 'p-6' : compacto ? 'p-3' : 'p-3.5';
  const marco = esNuevo
    ? 'border-2 border-nuevo shadow-lg shadow-nuevo/20'
    : columna === 'preparando' ? 'border border-borde' : 'border border-borde';

  return (
    <article className={`bg-tarjeta rounded-xl ${marco} ${pad} flex flex-col gap-2.5 ${cargando ? 'opacity-60 pointer-events-none' : ''}`}>
      {/* cabecera: número, canal/tipo, tiempo */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className={`font-mono font-bold text-white leading-none ${grande ? 'text-4xl' : compacto ? 'text-xl' : 'text-[22px]'}`}>{codigoPedido(pedido)}</div>
          {!compacto && (
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              {canal && <Chip tono="azul">{canal}</Chip>}
              <Chip tono="ambar">{domicilio ? (km > 0 ? `Domicilio · ${km.toFixed(1)} km` : 'Domicilio') : 'Retiro'}</Chip>
              {pago && <Chip>{pago}</Chip>}
            </div>
          )}
          {compacto && (
            <div className="text-xs text-gray-400 mt-1 truncate">{pedido.cliente_nombre || 'Cliente'} · {parsearDetalle(pedido.detalle_pedido).items.map((i) => `${i.q}× ${i.n}`).join(' · ') || '—'}</div>
          )}
        </div>
        {esNuevo && (
          <div className="text-right shrink-0">
            <div className="font-mono text-[13px] font-semibold text-nuevo">{haceCuanto(pedido.fecha_creacion)}</div>
            <div className="text-[11px] text-gray-400">{formatHoraEC(pedido.fecha_creacion)}</div>
          </div>
        )}
        {columna === 'preparando' && <AnilloTiempo pedido={pedido} tam={grande ? 72 : 56} />}
        {columna === 'listo' && <Chip tono="verde">{MODO_SISTEMA && !domicilio ? 'Listo · lo retira el cliente' : 'Listo · buscando moto'}</Chip>}
        {columna === 'entregando' && <Chip tono="azul">{LABEL_MOTO[pedido.estado_pedido] || 'Con el motorizado'}</Chip>}
      </div>

      {/* cliente */}
      {!compacto && (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0" style={{ background: colorInicial(pedido.cliente_nombre) }}>{inicial(pedido.cliente_nombre)}</div>
          <div className={`font-bold text-white truncate ${grande ? 'text-base' : 'text-[13px]'}`}>{pedido.cliente_nombre || 'Cliente'}</div>
          {telCliente && <Telefono tel={telCliente} extra="ml-auto" />}
        </div>
      )}

      {/* platos */}
      {!compacto && (
        <div className="py-2.5 border-t border-b border-borde">
          <Items detalle={pedido.detalle_pedido} grande={grande} />
        </div>
      )}

      {/* dirección + dinero */}
      {!compacto && (
        <div className="flex items-start justify-between gap-3">
          {domicilio && dir ? (
            <div className="flex items-start gap-1.5 text-[12px] text-gray-400 min-w-0"><span className="mt-0.5 shrink-0"><IcoPin /></span><span className="truncate">{dir}</span></div>
          ) : <div />}
          <div className="shrink-0 text-right"><Dinero pedido={pedido} grande={grande} /></div>
        </div>
      )}

      {/* moto (listo / entregando) */}
      {(columna === 'entregando' || (columna === 'listo' && moto)) && (
        <div className="flex items-center gap-2.5 rounded-lg bg-bg3 border border-borde px-2.5 py-2">
          <div className="w-8 h-8 rounded-full bg-bg4 text-gray-300 flex items-center justify-center shrink-0"><IcoMoto /></div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold text-white truncate">{moto || 'Buscando motorizado…'}</div>
            <div className="text-[11px] text-gray-400 flex items-center gap-1">
              {pedido.fecha_en_camino ? <><IcoReloj size={12} />Salió {formatHoraEC(pedido.fecha_en_camino)}</> : (LABEL_MOTO[pedido.estado_pedido] || '')}
            </div>
          </div>
          {telMoto && <Telefono tel={telMoto} />}
        </div>
      )}

      {/* preparando: aceptado a las / prometió */}
      {columna === 'preparando' && !compacto && (
        <div className="text-[11px] text-gray-400">
          Aceptado {formatHoraEC(pedido.restaurante_aceptado_at || pedido.fecha_creacion)} · prometió {pedido.tiempo_preparacion || '—'} min
          {horaPrometida(pedido) != null && horaPrometida(pedido) < Date.now() && (
            <span className="ml-2 inline-flex items-center gap-1 text-nuevo font-bold"><IcoAlerta size={12} />se pasó el tiempo prometido</span>
          )}
        </div>
      )}

      {/* acciones por etapa */}
      {esNuevo && !rechazando && (
        <>
          <div className={`grid grid-cols-5 ${grande ? 'gap-2' : 'gap-1.5'}`}>
            {TIEMPOS_PRESET.map((m) => (
              <button key={m} onClick={() => setMinutos(m)} disabled={cargando}
                className={`${grande ? 'h-14 text-xl' : 'h-10 text-sm'} rounded-lg font-bold transition-colors ${
                  minutos === m ? 'border-2 border-dewan bg-dewan/10 text-dewan' : 'border border-borde bg-bg3 text-white'
                }`}>
                {m}′
              </button>
            ))}
          </div>
          {ocupadoMin > 0 && <div className="text-[11px] text-preparando font-semibold">Modo ocupado: +{ocupadoMin} min ya sumados al tiempo sugerido.</div>}
          <div className="flex gap-2">
            <BotonPrimario onClick={aceptar} disabled={cargando} alto={grande ? 'h-16 text-lg' : 'h-12 text-[15px]'}>
              <IcoCheck size={grande ? 22 : 18} />
              {`Aceptar · ${minutos} min${hayImpresion() ? ' e imprimir' : ''}`}
            </BotonPrimario>
            <BotonSecundario onClick={() => setRechazando(true)} disabled={cargando} alto={grande ? 'h-16' : 'h-12'} extra="!text-nuevo">
              No podemos
            </BotonSecundario>
          </div>
        </>
      )}
      {esNuevo && rechazando && (
        <div className="flex flex-col gap-2 rounded-lg bg-nuevo/10 border border-nuevo/30 p-2.5">
          <div className="text-[12px] font-bold text-nuevo">¿Por qué no se puede? Se le avisa al cliente.</div>
          <div className="flex flex-wrap gap-1.5">
            {MOTIVOS_RECHAZO.map((m) => (
              <button key={m} onClick={() => setMotivo(m)} className={`text-[12px] font-semibold rounded-full px-3 py-1.5 border ${motivo === m ? 'border-nuevo bg-nuevo text-white' : 'border-borde bg-tarjeta text-white'}`}>{m}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <BotonSecundario onClick={() => { setRechazando(false); setMotivo(''); }} alto="h-10">Volver</BotonSecundario>
            <button onClick={rechazar} disabled={cargando || !motivo} className="flex-1 h-10 rounded-[10px] bg-nuevo text-white font-extrabold disabled:opacity-50">Rechazar el pedido</button>
          </div>
        </div>
      )}

      {columna === 'preparando' && (
        <div className="flex gap-2">
          <BotonSecundario onClick={masCinco} disabled={cargando} title="Sumar 5 minutos al tiempo prometido">+5 min</BotonSecundario>
          {hayImpresion() && <BotonSecundario onClick={reimprimir} title="Reimprimir comanda"><IcoImpresora /></BotonSecundario>}
          <BotonPrimario onClick={listo} disabled={cargando}>
            <IcoCheck />
            {conMoto ? 'Listo · que venga la moto' : (MODO_SISTEMA && !domicilio ? 'Listo · avisar al cliente' : MODO_HP ? 'Entregado al cliente' : 'Listo')}
          </BotonPrimario>
        </div>
      )}
      {columna === 'preparando' && conMoto && (
        <div className="text-[11px] text-gray-400">La entrega al cliente la marca el motorizado desde su app.</div>
      )}
      {columna === 'listo' && conMoto && (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 flex-1">Cuando llegue el motorizado, entrégueselo. Él marca la entrega al cliente.</span>
          <BotonSecundario onClick={entregado} disabled={cargando} alto="h-9" title="Solo si el motorizado no lo marcó">Ya se entregó</BotonSecundario>
        </div>
      )}
      {columna === 'listo' && MODO_SISTEMA && !conMoto && (
        <div className="flex gap-2">
          <BotonPrimario onClick={entregado} disabled={cargando} alto="h-10"><IcoCheck />El cliente ya lo retiró</BotonPrimario>
        </div>
      )}
      {columna === 'entregando' && MODO_SISTEMA && (
        <div className="flex gap-2">
          <BotonSecundario onClick={entregado} disabled={cargando} alto="h-10" extra="flex-1" title="Solo si el motorizado no lo marcó">Marcar entregado (si la moto no lo hizo)</BotonSecundario>
        </div>
      )}
      {compacto && hayImpresion() && columna === 'listo' && !MODO_SISTEMA && (
        <button onClick={reimprimir} className="self-start text-[11px] text-gray-400 flex items-center gap-1"><IcoImpresora size={14} />Reimprimir</button>
      )}

      {error && <div className="text-[12px] text-nuevo font-semibold">{error}</div>}
    </article>
  );
}
