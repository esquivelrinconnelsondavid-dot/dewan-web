import { useEffect, useState } from 'react';
import {
  hayImpresion, getConfigImpresora, setConfigImpresora,
  listarImpresoras, imprimirComanda,
} from '../lib/comanda';

const ANCHOS = [
  { id: '80', label: 'Rollo 80mm', desc: 'Impresora térmica de tickets (la más común)' },
  { id: '76', label: 'Rollo 76mm — de impacto', desc: 'Epson de agujas/cinta tipo TM-U220 (la que hace "tac-tac"). Activa solo el texto liviano.' },
  { id: '58', label: 'Rollo 58mm', desc: 'Rollo angosto de recibos' },
  { id: 'a4', label: 'Hoja A4 / Carta', desc: 'Impresora de hojas (tinta o láser)' },
  { id: 'auto', label: 'Como la configuró Windows', desc: 'Usa el papel del driver de Windows. OJO: si el driver está en Carta/A4 bota ~25cm de papel en blanco por ticket — primero poné el papel del driver en rollo/recibo.' },
];

export default function ConfigImpresora({ restaurante }) {
  const [impresoras, setImpresoras] = useState([]);
  const [cfg, setCfg] = useState(getConfigImpresora());
  const [probando, setProbando] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    listarImpresoras().then(setImpresoras);
  }, []);

  if (!hayImpresion()) {
    return (
      <div className="p-4">
        <div className="bg-tarjeta border border-borde rounded-xl p-4 text-sm text-gray-300">
          🖨️ La impresión de comandas funciona solo en la <b className="text-white">app de escritorio (PC)</b>.
          En el celular/tablet esta opción no está disponible.
        </div>
      </div>
    );
  }

  const guardar = (cambio) => {
    const nuevo = { ...cfg, ...cambio };
    setCfg(nuevo);
    setConfigImpresora(cambio);
  };

  const probar = async () => {
    setProbando(true);
    setMsg('');
    const demo = {
      id: '0000',
      detalle_pedido: '1x Combo Ejecutivo Chuleta\n1x Adicional Papas\n   📝 sin sal\n2x Refresco\n📦 Envases: $0.40',
      cliente_nombre: 'Prueba DEWAN',
      tipo_entrega: 'PRUEBA',
      tiempo_preparacion: 15,
      monto_total: 12.40,
      precio_base_productos: 11.40,
      markup_dewan: 1.00,
      monto_comision: 1.14,
      comision_la_paga: 'restaurante',
    };
    const r = await imprimirComanda(demo, { restauranteNombre: restaurante?.nombre });
    setProbando(false);
    setMsg(r.ok
      ? '✓ Enviado a la impresora'
      : (r.motivo === 'timeout-encolado' || r.motivo === 'timeout')
        ? '⏳ La impresora está tardando — revisá si salió el ticket antes de reimprimir'
        : '✗ No se pudo imprimir: ' + (r.motivo || 'revisá la impresora') + '. Tip: probá el tamaño "Como la configuró Windows".');
  };

  return (
    <div className="p-4 space-y-5">
      {/* Impresora */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Impresora</label>
        <select
          value={cfg.deviceName}
          onChange={(e) => guardar({ deviceName: e.target.value })}
          className="w-full bg-tarjeta border border-borde rounded-xl p-3 text-white text-sm"
        >
          <option value="">Predeterminada del sistema</option>
          {impresoras.map((p) => (
            <option key={p.name} value={p.name}>
              {p.displayName}{p.isDefault ? ' (predeterminada)' : ''}
            </option>
          ))}
        </select>
        {impresoras.length === 0 && (
          <p className="text-[11px] text-gray-500 mt-1">No se detectaron impresoras instaladas en esta PC.</p>
        )}
      </div>

      {/* Tamaño */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tamaño del papel</label>
        <div className="space-y-2">
          {ANCHOS.map((a) => (
            <button
              key={a.id}
              onClick={() => guardar(a.id === '76' ? { ancho: a.id, liviano: true } : { ancho: a.id })}
              className={`w-full flex items-center gap-3 rounded-xl p-3 border text-left transition-colors ${
                cfg.ancho === a.id ? 'border-dewan bg-dewan/15' : 'border-borde bg-tarjeta'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 shrink-0 ${cfg.ancho === a.id ? 'border-dewan bg-dewan' : 'border-gray-500'}`} />
              <span className="flex-1">
                <span className="block text-white text-sm font-bold">{a.label}</span>
                <span className="block text-[11px] text-gray-400">{a.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Auto al aceptar */}
      <button
        onClick={() => guardar({ auto: !cfg.auto })}
        className="w-full flex items-center gap-3 bg-tarjeta border border-borde rounded-xl p-3 text-left"
      >
        <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${cfg.auto ? 'bg-dewan' : 'bg-gray-600'}`}>
          <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${cfg.auto ? 'translate-x-5' : ''}`} />
        </span>
        <span className="flex-1">
          <span className="block text-white text-sm font-bold">Imprimir automático al aceptar</span>
          <span className="block text-[11px] text-gray-400">Sale la comanda sola cuando aceptás el pedido y ponés el tiempo</span>
        </span>
      </button>

      {/* Texto liviano (impresoras de impacto / matriz de puntos) */}
      <button
        onClick={() => guardar({ liviano: !cfg.liviano })}
        className="w-full flex items-center gap-3 bg-tarjeta border border-borde rounded-xl p-3 text-left"
      >
        <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${cfg.liviano ? 'bg-dewan' : 'bg-gray-600'}`}>
          <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${cfg.liviano ? 'translate-x-5' : ''}`} />
        </span>
        <span className="flex-1">
          <span className="block text-white text-sm font-bold">Texto liviano (impresora de impacto / lenta)</span>
          <span className="block text-[11px] text-gray-400">Sin negrita ni emojis. Activalo si la impresora es de cinta/agujas (NO térmica) o si se traba o imprime muy lento.</span>
        </span>
      </button>

      {/* Probar */}
      <div>
        <button
          onClick={probar}
          disabled={probando}
          className="w-full bg-dewan/15 text-dewan border border-dewan/30 rounded-xl py-3 font-bold active:scale-95 disabled:opacity-50"
        >
          {probando ? 'Imprimiendo…' : '🖨️ Probar impresión'}
        </button>
        {msg && <p className="text-xs mt-2 text-center text-gray-300">{msg}</p>}
      </div>
    </div>
  );
}
