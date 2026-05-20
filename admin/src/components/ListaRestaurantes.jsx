import { useState } from 'react';
import { toggleActivo } from '../lib/admin';
import ModalNuevoRestaurante from './ModalNuevoRestaurante';
import ModalAsignarCodigo from './ModalAsignarCodigo';

function BadgeActivo({ activo, onToggle, pending }) {
  return (
    <button
      onClick={onToggle}
      disabled={pending}
      className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border transition-colors ${
        activo
          ? 'bg-encamino/15 text-encamino border-encamino/40'
          : 'bg-nuevo/15 text-nuevo border-nuevo/40'
      } disabled:opacity-50`}
    >
      {activo ? 'Activo' : 'Inactivo'}
    </button>
  );
}

function ChipOnline({ count }) {
  if (!count || count <= 0) {
    return (
      <span className="text-[10px] text-gray-500 bg-borde/40 px-2 py-0.5 rounded-full">
        sin dispositivos
      </span>
    );
  }
  return (
    <span className="text-[10px] text-encamino bg-encamino/15 px-2 py-0.5 rounded-full flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-encamino animate-pulse" />
      {count} online
    </span>
  );
}

function CardRestaurante({ restaurante, onCambioCodigo, onCambioActivo }) {
  const [modalCodigo, setModalCodigo] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(false);

  const togglearActivo = async () => {
    setPendingToggle(true);
    const nuevo = await toggleActivo(restaurante.id);
    setPendingToggle(false);
    if (nuevo !== null) {
      onCambioActivo?.(restaurante.id, nuevo);
    }
  };

  return (
    <div className="bg-tarjeta rounded-xl p-3 border border-borde flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold truncate">
            {restaurante.nombre}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {restaurante.categoria || 'Sin categoría'}
            {restaurante.telefono ? ` · ${restaurante.telefono}` : ''}
          </p>
        </div>
        <BadgeActivo
          activo={restaurante.activo}
          onToggle={togglearActivo}
          pending={pendingToggle}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">
            Código
          </span>
          <span
            className={`font-bold tabular-nums tracking-[0.3em] ${
              restaurante.codigo_acceso ? 'text-dewan' : 'text-gray-500'
            }`}
          >
            {restaurante.codigo_acceso || '—'}
          </span>
        </div>
        <button
          onClick={() => setModalCodigo(true)}
          className="text-xs bg-fondo border border-borde rounded-lg px-3 py-1.5 text-gray-200 hover:border-dewan transition-colors"
        >
          {restaurante.codigo_acceso ? 'Cambiar código' : 'Generar código'}
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-borde/50">
        <ChipOnline count={restaurante.dispositivos_online} />
        {restaurante.ultimo_visto && (
          <span className="text-[10px] text-gray-500">
            último visto{' '}
            {new Date(restaurante.ultimo_visto).toLocaleString('es-DO', {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </span>
        )}
      </div>

      {modalCodigo && (
        <ModalAsignarCodigo
          restaurante={restaurante}
          onClose={() => setModalCodigo(false)}
          onAsignado={(codigo) => onCambioCodigo?.(restaurante.id, codigo)}
        />
      )}
    </div>
  );
}

export default function ListaRestaurantes({
  restaurantes,
  busqueda,
  setBusqueda,
  cargando,
  onRefrescar,
}) {
  const [modalNuevo, setModalNuevo] = useState(false);

  return (
    <div className="flex flex-col gap-3 px-4 pb-8 flex-1 overflow-y-auto">
      <div className="flex gap-2 sticky top-0 bg-fondo pt-2 pb-2 z-10">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre…"
          className="flex-1 bg-tarjeta border border-borde rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-dewan"
        />
        <button
          onClick={() => setModalNuevo(true)}
          className="bg-dewan text-black font-bold px-3 py-2 rounded-xl text-sm active:scale-95 transition-transform whitespace-nowrap"
        >
          + Nuevo
        </button>
      </div>

      {cargando && restaurantes.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-sm">
          Cargando restaurantes…
        </div>
      )}

      {!cargando && restaurantes.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-sm">
          {busqueda
            ? 'No hay coincidencias para esa búsqueda.'
            : 'No hay restaurantes todavía.'}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {restaurantes.map((r) => (
          <CardRestaurante
            key={r.id}
            restaurante={r}
            onCambioCodigo={() => onRefrescar?.()}
            onCambioActivo={() => onRefrescar?.()}
          />
        ))}
      </div>

      {restaurantes.length > 0 && (
        <p className="text-center text-[10px] text-gray-600 pt-2">
          {restaurantes.length} restaurante{restaurantes.length === 1 ? '' : 's'}
          {restaurantes.length >= 200 ? ' (límite mostrado: 200)' : ''}
        </p>
      )}

      {modalNuevo && (
        <ModalNuevoRestaurante
          onClose={() => setModalNuevo(false)}
          onCreado={() => onRefrescar?.()}
        />
      )}
    </div>
  );
}
