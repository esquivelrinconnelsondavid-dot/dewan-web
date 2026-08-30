import { useState, useMemo, useEffect } from 'react';
import PedidoCard from './PedidoCard';
import { supabase } from '../lib/supabase';
import { Semaforo, calcularExcepciones } from './TorreControl';

const FILTROS = [
  { id: 'torre', label: '🚨 Torre' },
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
  const [filtro, setFiltro] = useState('torre');
  const [avisandoMotos, setAvisandoMotos] = useState(false);
  const { pedidos, colgados, rechazados, restaurantes } = data;

  // "☔ Modo lluvia": +$0.30 empaquetado en la carrera (lo paga el cliente y va
  // íntegro al moto). El flag vive en configuracion_delivery vía RPC (SQL 013);
  // la cotización de n8n lo lee al calcular cada envío.
  const [lluvia, setLluvia] = useState(null); // null = cargando/aún sin SQL 013
  useEffect(() => {
    supabase.rpc('get_modo_lluvia').then(({ data }) => {
      if (data && typeof data.lluvia_activa === 'boolean') setLluvia(data.lluvia_activa);
    }).catch(() => {});
  }, []);
  const toggleLluvia = async () => {
    // Estado aún desconocido (¿SQL 013 sin correr? ¿sin internet?): reintentar y explicar.
    if (lluvia === null) {
      const { data } = await supabase.rpc('get_modo_lluvia').catch(() => ({ data: null }));
      if (data && typeof data.lluvia_activa === 'boolean') { setLluvia(data.lluvia_activa); return; }
      alert('El modo lluvia aún no está instalado en la base.\n\nPide que corran el SQL 013 (dewan-SQL-013-modo-lluvia.sql) en Supabase y vuelve a intentar.');
      return;
    }
    const nuevo = !lluvia;
    if (!confirm(nuevo
      ? '¿Activar MODO LLUVIA? El envío sube $0.30 (va completo al moto).'
      : '¿Desactivar modo lluvia? El envío vuelve a la tarifa normal.')) return;
    const { data, error } = await supabase.rpc('set_modo_lluvia', { p_activa: nuevo });
    if (error || !data?.exito) { alert('No se pudo cambiar (¿falta correr el SQL 013?)'); return; }
    setLluvia(nuevo);
    alert(nuevo ? '☔ Modo lluvia ACTIVADO: los envíos ya cotizan +$0.30.' : '✅ Modo lluvia desactivado.');
  };

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

  // Torre de control: solo lo que necesita acción humana (gestión por excepción)
  const excepciones = useMemo(
    () => calcularExcepciones({ pedidos, colgados, rechazados }),
    [pedidos, colgados, rechazados, data._tick]
  );

  const lista = useMemo(() => {
    if (filtro === 'torre') return excepciones.map((e) => e.p);
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
      <Semaforo pedidos={pedidos} motorizados={data.motorizados} nExcepciones={excepciones.length} />
      <div className="flex gap-2">
        <button
          onClick={avisarFaltanMotos}
          disabled={avisandoMotos}
          className="flex-1 py-2.5 text-sm font-bold rounded-xl bg-red-600/20 text-red-400 border border-red-500 active:scale-95 disabled:opacity-50"
        >
          {avisandoMotos ? 'Enviando…' : '🔴 FALTAN MOTOS'}
        </button>
        <button
          onClick={toggleLluvia}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl border active:scale-95 ${
            lluvia
              ? 'bg-blue-500/25 text-blue-300 border-blue-400'
              : 'bg-tarjeta text-gray-300 border-borde'
          }`}
        >
          {lluvia === null ? '☔ Lluvia…' : lluvia ? '☔ LLUVIA ACTIVA (+$0.30)' : '☔ Modo lluvia OFF'}
        </button>
      </div>
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

      {filtro === 'torre' ? (
        excepciones.length === 0 ? (
          <div className="text-center mt-12 text-gray-500">
            <p className="text-4xl mb-3">✅</p>
            <p className="text-sm font-bold text-green-400">Todo bajo control</p>
            <p className="text-xs mt-1">Nada necesita tu acción ahora. Las excepciones aparecen aquí solas.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {excepciones.map((e) => (
              <div key={e.p.id}>
                <div className="text-xs font-bold text-red-300 bg-red-600/15 border border-red-500/60 rounded-t-xl px-3 py-1.5">
                  {e.emoji} {e.motivo}
                </div>
                <PedidoCard
                  p={e.p}
                  tipoAcuerdo={e.p.restaurante_id ? tipoPorRest.get(e.p.restaurante_id) : null}
                  motorizados={data.motorizados}
                />
              </div>
            ))}
          </div>
        )
      ) : lista.length === 0 ? (
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
