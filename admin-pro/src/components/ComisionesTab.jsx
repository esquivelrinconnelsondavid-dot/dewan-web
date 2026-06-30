import { useMemo } from 'react';
import { money, entregadoHoy } from '../lib/time';

export default function ComisionesTab({ data }) {
  const { pedidos, motorizados } = data;

  // Solo entregas de HOY (EC). pedidos trae 12h de margen → sin este recorte el
  // "Total del día" sumaría las carreras de ayer desde el mediodía.
  const entregados = pedidos.filter((p) => p.estado_pedido === 'entregado' && entregadoHoy(p));

  const porMoto = useMemo(() => {
    const map = new Map();
    entregados.forEach((p) => {
      const id = p.motorizado_id || 'sin_asignar';
      const nombre = p.nombre_moto || motorizados.find((m) => m.id === id)?.nombre || 'Sin asignar';
      const cur = map.get(id) || { id, nombre, entregas: 0, ingresos: 0, comision: 0, comisionPagaMoto: 0, comisionPagaCliente: 0 };
      cur.entregas++;
      cur.ingresos += Number(p.precio_calculado) || 0;
      const com = Number(p.monto_comision ?? p.comision) || 0;
      cur.comision += com;
      if (p.comision_la_paga === 'motorizado') cur.comisionPagaMoto += com;
      else cur.comisionPagaCliente += com;
      map.set(id, cur);
    });
    return Array.from(map.values()).sort((a, b) => b.comision - a.comision);
  }, [entregados, motorizados]);

  const totales = porMoto.reduce(
    (s, c) => ({
      entregas: s.entregas + c.entregas,
      ingresos: s.ingresos + c.ingresos,
      comision: s.comision + c.comision,
      pagaMoto: s.pagaMoto + c.comisionPagaMoto,
      pagaCliente: s.pagaCliente + c.comisionPagaCliente,
    }),
    { entregas: 0, ingresos: 0, comision: 0, pagaMoto: 0, pagaCliente: 0 }
  );

  return (
    <div className="p-3 space-y-3">
      <div className="bg-tarjeta border border-borde rounded-xl p-3">
        <div className="text-xs text-gray-400 uppercase mb-2">Total del día</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px] text-gray-500 uppercase">Entregas</div>
            <div className="text-lg font-black text-white">{totales.entregas}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase">Ingresos</div>
            <div className="text-lg font-black text-dewan">{money(totales.ingresos)}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase">Comisión total</div>
            <div className="text-lg font-black text-preparando">{money(totales.comision)}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase">Paga moto / cliente</div>
            <div className="text-sm font-bold text-white">
              {money(totales.pagaMoto)} / <span className="text-gray-400">{money(totales.pagaCliente)}</span>
            </div>
          </div>
        </div>
      </div>

      {porMoto.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">
          <p className="text-4xl mb-3">💳</p>
          <p className="text-sm">Sin entregas hoy</p>
        </div>
      ) : (
        <div className="bg-tarjeta border border-borde rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 text-[10px] text-gray-400 uppercase border-b border-borde px-3 py-2 bg-bg3">
            <div className="col-span-5">Motorizado</div>
            <div className="col-span-2 text-right">Entr.</div>
            <div className="col-span-2 text-right">Ingr.</div>
            <div className="col-span-3 text-right">Comisión</div>
          </div>
          {porMoto.map((c) => (
            <div key={c.id} className="grid grid-cols-12 items-center px-3 py-2 border-b border-borde last:border-0 text-xs">
              <div className="col-span-5 text-white font-semibold truncate">{c.nombre}</div>
              <div className="col-span-2 text-right text-gray-300">{c.entregas}</div>
              <div className="col-span-2 text-right text-dewan font-semibold">{money(c.ingresos)}</div>
              <div className="col-span-3 text-right text-preparando font-bold">{money(c.comision)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
