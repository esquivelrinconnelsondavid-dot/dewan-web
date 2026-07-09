export default function Header({ admin, onLogout, alertas }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-borde bg-bg2">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏢</span>
        <div>
          <h1 className="text-dewan font-black text-base leading-tight">DEWAN Admin</h1>
          <p className="text-[10px] text-gray-400 leading-tight">{admin.nombre}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {alertas > 0 && (
          <div className="bg-alerta/20 border border-alerta text-alerta text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-alerta animate-ping-strong" />
            {alertas} alertas
          </div>
        )}
        <button
          onClick={onLogout}
          className="text-xs text-gray-400 border border-borde rounded-lg px-2 py-1 active:bg-bg3"
        >
          Salir
        </button>
      </div>
    </div>
  );
}
