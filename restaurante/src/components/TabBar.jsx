export default function TabBar({ tabs, active, onChange }) {
  return (
    <div className="sticky top-[57px] z-40 bg-fondo border-b border-borde flex">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
              isActive
                ? 'text-dewan border-b-2 border-dewan'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {tab.label}
              {tab.badge > 0 && (
                <span className="bg-encamino text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
