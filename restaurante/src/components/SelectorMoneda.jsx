import { useState } from 'react';
import { MONEDAS_LISTA, codigoMonedaActual, setMonedaRestaurante } from '../lib/moneda';
import { actualizarMoneda } from '../lib/perfilLocal';

// Selector de moneda del local. Guarda en restaurantes.moneda (vía RPC) y aplica
// el cambio al instante (setMonedaRestaurante → formatDinero usa la nueva en todos
// lados). `compacto` = versión en línea para la cabecera del Menú.
export default function SelectorMoneda({ valorInicial, onCambio, compacto = false }) {
  const [moneda, setMoneda] = useState(valorInicial || codigoMonedaActual());
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const cambiar = async (codigo) => {
    const previo = moneda;
    setMoneda(codigo);
    setGuardando(true);
    setError('');
    try {
      await actualizarMoneda(codigo);
      setMonedaRestaurante(codigo);
      onCambio?.(codigo);
    } catch (e) {
      setMoneda(previo);
      setError('No se pudo guardar la moneda');
    } finally {
      setGuardando(false);
    }
  };

  const select = (
    <select
      value={moneda}
      onChange={(e) => cambiar(e.target.value)}
      disabled={guardando}
      className="bg-fondo border border-borde rounded-md px-2 py-2 text-sm text-white disabled:opacity-50"
    >
      {MONEDAS_LISTA.map((m) => (
        <option key={m.codigo} value={m.codigo}>
          {m.nombre} ({m.simbolo})
        </option>
      ))}
    </select>
  );

  if (compacto) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-gray-400 uppercase tracking-wider">Moneda</span>
        {select}
        {guardando && <span className="text-[11px] text-gray-400">Guardando…</span>}
        {error && <span className="text-[11px] text-nuevo">{error}</span>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400 uppercase tracking-wider">Moneda del local</p>
      <p className="text-[11px] text-gray-500">
        Con esta moneda se muestran y se cargan los precios de tu menú.
      </p>
      {select}
      {guardando && <p className="text-[11px] text-gray-400">Guardando…</p>}
      {error && <p className="text-[11px] text-nuevo">{error}</p>}
    </div>
  );
}
