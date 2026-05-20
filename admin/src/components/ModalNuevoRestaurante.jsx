import { useState } from 'react';
import { crearRestaurante } from '../lib/admin';

export default function ModalNuevoRestaurante({ onClose, onCreado }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [categoria, setCategoria] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const crear = async () => {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    setError(null);
    setGuardando(true);
    const id = await crearRestaurante({
      nombre: nombre.trim(),
      telefono: telefono.trim() || null,
      categoria: categoria.trim() || null,
    });
    setGuardando(false);
    if (!id) {
      setError('No se pudo crear (posible duplicado)');
      return;
    }
    onCreado?.(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-tarjeta border border-borde rounded-2xl w-full max-w-md p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white font-bold text-lg">Nuevo restaurante</h2>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Nombre <span className="text-nuevo">*</span>
          </span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Pizzería La Esquina"
            autoFocus
            className="bg-fondo border border-borde rounded-lg px-3 py-2 text-white focus:outline-none focus:border-dewan"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Teléfono
          </span>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Opcional"
            className="bg-fondo border border-borde rounded-lg px-3 py-2 text-white focus:outline-none focus:border-dewan"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Categoría
          </span>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Opcional (pizza, sushi, criolla…)"
            className="bg-fondo border border-borde rounded-lg px-3 py-2 text-white focus:outline-none focus:border-dewan"
          />
        </label>

        {error && <p className="text-nuevo text-xs">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-borde text-gray-300 font-semibold py-2 rounded-xl active:scale-95 transition-transform"
          >
            Cancelar
          </button>
          <button
            onClick={crear}
            disabled={guardando}
            className="flex-1 bg-dewan text-black font-bold py-2 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
          >
            {guardando ? 'Creando…' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
}
