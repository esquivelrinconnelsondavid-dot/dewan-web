import Ticket from './Ticket';
import { MODO_HP, MODO_SISTEMA } from '../lib/config';

// Tablero de cocina (14-sep-2026): cuatro columnas de un vistazo, como iFood Quadros
// y Uber Eats Orders. Cada columna hace scroll por su cuenta y sus tickets van
// ordenados por urgencia: nuevos = el más viejo arriba; en preparación = el que
// menos tiempo le queda arriba; listos = el que más espera arriba; entregando =
// el último que salió arriba. En pantallas chicas (celular) se apila por pestaña.
const ts = (v) => (v ? new Date(v).getTime() : 0);
export const ORDEN = {
  nuevo: (a, b) => ts(a.fecha_creacion) - ts(b.fecha_creacion),
  preparando: (a, b) => (ts(a.timer_lanzamiento) || Infinity) - (ts(b.timer_lanzamiento) || Infinity),
  listo: (a, b) => (ts(a.fecha_listo) || ts(a.timer_lanzamiento)) - (ts(b.fecha_listo) || ts(b.timer_lanzamiento)),
  entregando: (a, b) => ts(b.fecha_en_camino || b.updated_at) - ts(a.fecha_en_camino || a.updated_at),
};

const DEF = {
  nuevo: { titulo: 'Nuevos', punto: 'bg-nuevo', texto: 'text-nuevo', vacio: 'Sin pedidos nuevos' },
  preparando: { titulo: 'En preparación', punto: 'bg-preparando', texto: 'text-preparando', vacio: 'Nada en cocina' },
  listo: { titulo: MODO_SISTEMA ? 'Listos' : 'Listos · esperando moto', punto: 'bg-encamino', texto: 'text-encamino', vacio: 'Nada listo por retirar' },
  entregando: { titulo: 'Entregando', punto: 'bg-buscando', texto: 'text-buscando', vacio: 'Ninguna moto en camino' },
};

export function columnasDelModo() {
  // Happy Pollo reparte con su propia gente: la cocina cierra el pedido con "Entregado".
  if (MODO_HP && !MODO_SISTEMA) return ['nuevo', 'preparando'];
  return ['nuevo', 'preparando', 'listo', 'entregando'];
}

export function Columna({ id, pedidos, ocupadoMin, apilada = false, resumen }) {
  const d = DEF[id];
  const lista = [...pedidos].sort(ORDEN[id]);
  return (
    <section className={`flex flex-col min-w-0 ${apilada ? '' : 'h-full'}`}>
      <div className="flex items-center gap-2 px-1 pb-2 shrink-0">
        <span className={`w-2 h-2 rounded-full ${d.punto} ${id === 'nuevo' && lista.length ? 'animate-pulse' : ''}`} />
        <h2 className={`text-xs font-bold uppercase tracking-widest ${d.texto}`}>{d.titulo} · {lista.length}</h2>
      </div>
      <div className={`flex flex-col gap-2.5 ${apilada ? '' : 'flex-1 min-h-0 overflow-y-auto pr-1 pb-4'}`}>
        {lista.map((p) => (
          <Ticket key={p.id} pedido={p} columna={id} ocupadoMin={id === 'nuevo' ? ocupadoMin : 0} />
        ))}
        {lista.length === 0 && (
          <div className="rounded-xl border border-dashed border-borde text-gray-500 text-xs text-center px-3 py-6">
            {resumen || d.vacio}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Tablero({ entrantes, cocina, listos, entregando, ocupadoMin, resumenHoy }) {
  const cols = columnasDelModo();
  const datos = { nuevo: entrantes, preparando: cocina, listo: listos, entregando };
  const gridCols = cols.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-4';
  return (
    <div className={`hidden lg:grid ${gridCols} gap-4 px-5 pt-4 pb-2 h-full min-h-0`}>
      {cols.map((id, i) => (
        <Columna key={id} id={id} pedidos={datos[id] || []} ocupadoMin={ocupadoMin}
          resumen={i === cols.length - 1 ? resumenHoy : undefined} />
      ))}
    </div>
  );
}
