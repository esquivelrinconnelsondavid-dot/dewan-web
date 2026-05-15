export default function Header({ restaurante, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-fondo/95 backdrop-blur border-b border-borde px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-dewan font-black text-lg tracking-wide">DEWAN</span>
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Restaurante</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-300 font-semibold max-w-[160px] truncate">
          {restaurante?.nombre || 'Restaurante'}
        </span>
        <span className="w-2 h-2 rounded-full bg-encamino animate-pulse" />
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
