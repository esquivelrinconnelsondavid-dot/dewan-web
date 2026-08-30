import { useState, useMemo } from 'react';
import PedidoCard from './PedidoCard';

const FILTROS = [
  { id: 'activos', label: '🔥 Activos' },
  { id: 'todos', label: 'Todos' },
  { id: 'alerta', label: '🚨 Alertas' },
  { id: 'pedido_comida', label: '🍔 Comida' },
  { id: 'encomienda', label: '📦 Encomienda' },
  { id: 'compras', label: '🛒 Compras' },
  { id: 'entregado', label: '✅ Entregados' },
];

const ESTADOS_ACTIVOS = new Set([
  'pendiente', 'pendiente_restaurante', 'preparando',
  'confirmado', 'aceptado', 'en_camino', 'en_camino_entrega', 'llegado',
]);

export default function PedidosTab({ data }) {
  const [filtro, setFiltro] = useState('activos');
  const [avisandoMotos, setAvisandoMotos] = useState(false);
  const { pedidos, colgados, rechazados, restaurantes } = data;

  // "🔴 Faltan motos": push Expo a TODA la flota (incluye desconectados) vía el
  // workflow n8n avisos-flota-faltan-motos. El workflow tiene freno de 30 min.
  const avisarFaltanMotos = async () => {
    if (avisandoMotos) return;
    if (!confirm('¿Avisar a TODA la flota (incluye desconectados) que se necesitan motos?')) return;
    setAvisandoMotos(true);
    try {
      const r = await fetch('https://restaurante1-n8n.bqspdc.easypanel.host/webhook/faltan-motos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-dewan-key': 'dwn-admin-2026' },
        body: '{}',
      });
      const j = await r.json().catch(() => null);
      if (j?.ok) alert(`✅ Aviso enviado a ${j.enviados} motos.`);
      else alert(`⏳ ${j?.motivo || 'No salió el aviso (¿workflow apagado en n8n?)'}`);
    } catch {
      alert('❌ No se pudo enviar (¿workflow apagado en n8n o sin internet?)');
    } finally {
      setAvisandoMotos(false);
    }
  };

  // tipo_acuerdo por restaurante → PedidoCard sabe si el local se gestiona por
  // operadora (silencioso/cliente_paga: nunca confirman por app).
  const tipoPorRest = useMemo(() => {
    const m = new Map();
    (restaurantes || []).forEach((r) => m.set(r.id, r.tipo_acuerdo));
    return m;
  }, [restaurantes]);

  const lista = useMemo(() => {
    if (filtro === 'activos') return pedidos.filter((p) => ESTADOS_ACTIVOS.has(p.estado_pedido));
    if (filtro === 'alerta') {
      const ids = new Set([...colgados, ...rechazados].map((p) => p.id));
      return pedidos.filter((p) => ids.has(p.id));
    }
    if (filtro === 'entregado') return pedidos.filter((p) => p.estado_pedido === 'entregado');
    if (filtro !== 'todos') return pedidos.filter((p) => p.intencion === filtro);
    return pedidos;
  }, [filtro, pedidos, colgados, rechazados]);

  return (
    <div className="p-3 space-y-3">
      <button
        onClick={avisarFaltanMotos}
        disabled={avisandoMotos}
        className="w-full py-2.5 text-sm font-bold rounded-xl bg-red-600/20 text-red-400 border border-red-500 active:scale-95 disabled:opacity-50"
      >
        {avisandoMotos ? 'Enviando aviso…' : '🔴 FALTAN MOTOS — avisar a toda la flota'}
      </button>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap ${
              filtro === f.id ? 'bg-dewan text-black shadow-lg shadow-dewan/20' : 'bg-tarjeta text-gray-300 border border-borde'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {lista.length === 0 ? (
        <div className="text-center mt-12 text-gray-500">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm">Sin pedidos</p>
        </div>
      ) : (
        <div className="space-y-2">
          {lista.map((p) => (
            <PedidoCard
              key={p.id}
              p={p}
              tipoAcuerdo={p.restaurante_id ? tipoPorRest.get(p.restaurante_id) : null}
              motorizados={data.motorizados}
            />
          ))}
        </div>
      )}
    </div>
  );
}
