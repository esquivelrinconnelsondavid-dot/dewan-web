import { MARCA, MODO_SISTEMA } from '../lib/config';
import { HP_LOGO } from '../lib/hpLogo';
import { IcoAjustes } from './Iconos';

const ES_HP = MARCA.toLowerCase().includes('happy');

// Cabecera: local a la izquierda, estado de la tienda al centro (pantallas anchas),
// herramientas a la derecha. Iconos dibujados en vez de emojis.
export default function Header({ restaurante, onLogout, onAbrirAjustes, centro = null }) {
  const logo = restaurante?.logo_url || (ES_HP ? HP_LOGO : null);
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
          <p className="marca-title text-white font-bold text-sm truncate leading-tight">{nombre}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-encamino animate-pulse" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              {MODO_SISTEMA ? 'En línea' : MARCA + ' · En línea'}
            </span>
          </div>
        </div>
      </div>
      {centro && <div className="hidden md:flex items-center justify-center min-w-0">{centro}</div>}
      <div className="flex items-center gap-2 shrink-0">
        {onAbrirAjustes && (
          <button
            onClick={onAbrirAjustes}
            aria-label="Ajustes"
            title="Ajustes"
            className="text-gray-300 hover:text-dewan border border-borde hover:border-dewan rounded-md w-9 h-9 flex items-center justify-center transition-colors"
          >
            <IcoAjustes />
          </button>
        )}
        <button
          onClick={onLogout}
          className="text-xs text-gray-400 hover:text-nuevo border border-borde hover:border-nuevo rounded-md px-2 py-1.5 transition-colors"
        >
          Salir
        </button>
      </div>
    </header>
  );
}
