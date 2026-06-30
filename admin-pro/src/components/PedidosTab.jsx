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
  const { pedidos, colgados, rechazados, restaurantes } = data;

  // tipo_acuerdo por restaurante → PedidoCard sabe si el local se gestiona por
  // operadora (silencioso/cliente_paga: nunca confirman por app).
  const tipoPorRest = useMemo(() => {
    const m = new Map();
    (restaurantes || []).forEach((r) => m.set(r.id, r.tipo_acuerdo));
    return m;
  }, [restaurantes]);

  let lista = pedidos;
  if (filtro === 'activos') {
    lista = pedidos.filter((p) => ESTADOS_ACTIVOS.has(p.estado_pedido));
  } else if (filtro === 'alerta') {
    const ids = new Set([...colgados, ...rechazados].map((p) => p.id));
    lista = pedidos.filter((p) => ids.has(p.id));
  } else if (filtro === 'entregado') {
    lista = pedidos.filter((p) => p.estado_pedido === 'entregado');
  } else if (filtro !== 'todos') {
    lista = pedidos.filter((p) => p.intencion === filtro);
  }

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
            />
          ))}
        </div>
      )}
    </div>
  );
}
