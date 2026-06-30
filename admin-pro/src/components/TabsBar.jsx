const TABS = [
  { id: 'dashboard', label: 'Resumen', icon: '📊' },
  { id: 'pedidos', label: 'Pedidos', icon: '📦' },
  { id: 'restaurantes', label: 'Rest.', icon: '🍽️' },
  { id: 'motorizados', label: 'Motos', icon: '🏍️' },
  { id: 'comisiones', label: '$', icon: '💳' },
  { id: 'finanzas', label: 'Finanzas', icon: '💵' },
];

// Qué pestañas ve cada rol. La centralista SOLO opera pedidos (sin dinero).
const TABS_POR_ROL = {
  admin: ['dashboard', 'pedidos', 'restaurantes', 'motorizados', 'comisiones', 'finanzas'],
  centralista: ['pedidos'],
};

export default function TabsBar({ tab, setTab, alertasRest, rol }) {
  const permitidos = TABS_POR_ROL[rol] || TABS_POR_ROL.admin;
  const visibles = TABS.filter((t) => permitidos.includes(t.id));
  return (
    <div className="flex border-b border-borde bg-bg2 overflow-x-auto">
      {visibles.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`relative flex-1 min-w-[64px] py-2 px-3 text-xs font-semibold transition-colors ${
            tab === t.id ? 'text-dewan border-b-2 border-dewan' : 'text-gray-400'
          }`}
        >
          <div className="text-base leading-none">{t.icon}</div>
          <div className="mt-0.5">{t.label}</div>
          {t.id === 'restaurantes' && alertasRest > 0 && (
            <span className="absolute top-1 right-2 bg-alerta text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
              {alertasRest}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
