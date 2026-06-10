export default function Header({ restaurante, onLogout, onAbrirAjustes }) {
  const logo = restaurante?.logo_url;
  const nombre = restaurante?.nombre || 'Restaurante';

  return (
    <header className="sticky top-0 z-50 bg-fondo/95 backdrop-blur border-b border-borde px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        {logo ? (
          <img
            src={logo}
            alt={nombre}
            className="w-10 h-10 rounded-lg object-cover border border-borde shrink-0 bg-tarjeta"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-dewan/15 border border-dewan/30 flex items-center justify-center shrink-0">
            <span className="text-dewan font-black text-sm">
              {nombre.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-white font-bold text-sm truncate leading-tight">{nombre}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-encamino animate-pulse" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              DEWAN · En línea
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {onAbrirAjustes && (
          <button
            onClick={onAbrirAjustes}
            aria-label="Ajustes"
            className="text-gray-300 hover:text-dewan border border-borde hover:border-dewan rounded-md w-8 h-8 flex items-center justify-center transition-colors"
          >
            <span className="text-base">⚙️</span>
          </button>
        )}
        <button
          onClick={onLogout}
          className="text-xs text-gray-400 hover:text-nuevo border border-borde hover:border-nuevo rounded-md px-2 py-1 transition-colors"
        >
          Salir
        </button>
      </div>
    </header>
  );
}
