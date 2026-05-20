export default function Header({ onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-fondo/95 backdrop-blur border-b border-borde px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-dewan font-black text-lg tracking-wide">DEWAN</span>
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
          Admin
        </span>
      </div>
      <button
        onClick={onLogout}
        className="text-xs text-gray-400 hover:text-white border border-borde rounded-full px-3 py-1 transition-colors"
      >
        Salir
      </button>
    </header>
  );
}
