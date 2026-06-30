export default function SelectorSucursal({ sucursales, sucursalSeleccionada, onSeleccionar }) {
  if (sucursales.length <= 1) return null;

  const masCercana = sucursales[0]?._distancia != null ? sucursales[0] : null;

  return (
    <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-2 mb-2">
      <p className="text-[11px] font-semibold text-yellow-400 mb-1.5">
        ⚠️ Varias sucursales — seleccionar:
      </p>

      {masCercana && (
        <div className="bg-green-900/40 border border-green-600/50 rounded-lg p-1.5 mb-1.5">
          <p className="text-[9px] text-green-400 font-bold mb-0.5">
            ✅ MÁS CERCANA AL CLIENTE
          </p>
          <p className="text-[11px] text-white font-semibold">
            {masCercana.sucursal_nombre} — {masCercana._distancia.toFixed(1)} km
          </p>
          <p className="text-[9px] text-gray-400">{masCercana.direccion}</p>
        </div>
      )}

      <select
        className="w-full p-1.5 bg-tarjeta text-white text-[11px] border border-borde rounded-lg focus:border-dewan outline-none"
        value={sucursalSeleccionada?.id || ''}
        onChange={(e) => {
          const sel = sucursales.find((s) => s.id === Number(e.target.value));
          onSeleccionar(sel || null);
        }}
      >
        <option value="">-- Seleccionar sucursal --</option>
        {sucursales.map((s, i) => (
          <option key={s.id} value={s.id}>
            {i === 0 && s._distancia != null ? '⭐ ' : ''}
            {s.sucursal_nombre} - {s.direccion}
            {s._distancia != null ? ` (${s._distancia.toFixed(1)} km)` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}
