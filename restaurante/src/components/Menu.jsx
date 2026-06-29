import { useEffect, useMemo, useRef, useState } from 'react';
import {
  listarMenu,
  crearItemMenu,
  actualizarItemMenu,
  eliminarItemMenu,
  subirFotoMenu,
} from '../lib/menu';
import { formatDinero } from '../lib/formato';
import { codigoMonedaActual, permiteElegirMoneda } from '../lib/moneda';
import SelectorMoneda from './SelectorMoneda';

const VACIO = {
  nombre_item: '',
  descripcion: '',
  precio: '',
  categoria_menu: '',
  disponible: true,
  foto_url: null,
};

function Formulario({ inicial, onCancelar, onGuardar }) {
  const [form, setForm] = useState({ ...VACIO, ...inicial });
  const [guardando, setGuardando] = useState(false);
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [fotoLocalPreview, setFotoLocalPreview] = useState(null);
  const [error, setError] = useState('');
  const inputFotoRef = useRef(null);

  const cambiar = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const elegirFoto = () => inputFotoRef.current?.click();

  const onFotoElegida = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    // Preview local instantáneo
    const url = URL.createObjectURL(file);
    setFotoLocalPreview(url);
    setSubiendoFoto(true);
    try {
      const fotoUrl = await subirFotoMenu(file, inicial?.id || null);
      cambiar('foto_url', fotoUrl);
    } catch (err) {
      setError('No se pudo subir la foto: ' + (err?.message || ''));
      setFotoLocalPreview(null);
    } finally {
      setSubiendoFoto(false);
      if (inputFotoRef.current) inputFotoRef.current.value = '';
    }
  };

  const borrarFoto = () => {
    cambiar('foto_url', '');
    setFotoLocalPreview(null);
  };

  const fotoMostrada = fotoLocalPreview || form.foto_url;

  const guardar = async () => {
    setError('');
    if (!form.nombre_item.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    const precioNum = Number(form.precio);
    if (!Number.isFinite(precioNum) || precioNum <= 0) {
      setError('Precio inválido');
      return;
    }
    if (subiendoFoto) {
      setError('Esperá que termine de subirse la foto');
      return;
    }
    setGuardando(true);
    try {
      await onGuardar({
        ...form,
        nombre_item: form.nombre_item.trim(),
        descripcion: form.descripcion.trim(),
        categoria_menu: form.categoria_menu.trim(),
        precio: precioNum,
      });
    } catch (e) {
      setError(e?.message || 'No se pudo guardar');
      setGuardando(false);
    }
  };

  return (
    <div className="bg-tarjeta rounded-xl border border-dewan/40 p-4 space-y-3">
      <p className="text-xs text-dewan uppercase tracking-wider font-bold">
        {inicial?.id ? 'Editar producto' : 'Nuevo producto'}
      </p>

      <div>
        <label className="text-[10px] text-gray-500 uppercase tracking-wider">Nombre *</label>
        <input
          value={form.nombre_item}
          onChange={(e) => cambiar('nombre_item', e.target.value)}
          className="w-full bg-fondo border border-borde rounded-md px-2 py-2 text-sm text-white mt-1"
          placeholder="Hamburguesa clásica"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-gray-500 uppercase tracking-wider">
            Precio *{permiteElegirMoneda() ? ` (${codigoMonedaActual()})` : ''}
          </label>
          <input
            value={form.precio}
            onChange={(e) => cambiar('precio', e.target.value)}
            inputMode="decimal"
            className="w-full bg-fondo border border-borde rounded-md px-2 py-2 text-sm text-white mt-1"
            placeholder="5.50"
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 uppercase tracking-wider">Categoría</label>
          <input
            value={form.categoria_menu}
            onChange={(e) => cambiar('categoria_menu', e.target.value)}
            className="w-full bg-fondo border border-borde rounded-md px-2 py-2 text-sm text-white mt-1"
            placeholder="Hamburguesas"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] text-gray-500 uppercase tracking-wider">Descripción</label>
        <textarea
          value={form.descripcion}
          onChange={(e) => cambiar('descripcion', e.target.value)}
          rows={2}
          className="w-full bg-fondo border border-borde rounded-md px-2 py-2 text-sm text-white mt-1 resize-none"
          placeholder="Carne 150g, queso cheddar, tomate, lechuga"
        />
      </div>

      <div>
        <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
          Foto (opcional)
        </label>
        <input
          ref={inputFotoRef}
          type="file"
          accept="image/*"
          onChange={onFotoElegida}
          className="hidden"
        />
        {fotoMostrada && fotoMostrada !== '' ? (
          <div className="flex items-center gap-3 bg-fondo border border-borde rounded-lg p-2">
            <img
              src={fotoMostrada}
              alt="Foto del plato"
              className="w-20 h-20 rounded object-cover border border-borde"
            />
            <div className="flex-1 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={elegirFoto}
                disabled={subiendoFoto}
                className="text-xs bg-borde text-gray-200 font-bold py-1.5 rounded"
              >
                {subiendoFoto ? 'Subiendo…' : 'Cambiar'}
              </button>
              <button
                type="button"
                onClick={borrarFoto}
                disabled={subiendoFoto}
                className="text-xs text-nuevo border border-nuevo/40 font-bold py-1.5 rounded"
              >
                Quitar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={elegirFoto}
            disabled={subiendoFoto}
            className="w-full bg-fondo border-2 border-dashed border-borde rounded-lg py-4 text-xs text-gray-400 active:bg-borde/30"
          >
            {subiendoFoto ? 'Subiendo y optimizando…' : '+ Agregar foto'}
          </button>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-white">
        <input
          type="checkbox"
          checked={form.disponible}
          onChange={(e) => cambiar('disponible', e.target.checked)}
          className="w-4 h-4"
        />
        Disponible
      </label>

      {error && (
        <div className="bg-nuevo/10 border border-nuevo/30 text-nuevo text-xs rounded-md p-2">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={guardar}
          disabled={guardando}
          className="flex-1 bg-dewan text-fondo font-bold py-2.5 rounded-lg active:scale-95"
        >
          {guardando ? 'Guardando…' : 'Guardar'}
        </button>
        <button
          onClick={onCancelar}
          disabled={guardando}
          className="bg-borde text-gray-300 font-bold py-2.5 px-4 rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function ItemRow({ item, onEditar, onToggleDisp, onEliminar }) {
  const [accionando, setAccionando] = useState(false);

  const toggle = async () => {
    setAccionando(true);
    try {
      await onToggleDisp(item);
    } finally {
      setAccionando(false);
    }
  };

  const eliminar = async () => {
    if (!confirm(`¿Eliminar "${item.nombre_item}"?`)) return;
    setAccionando(true);
    try {
      await onEliminar(item);
    } finally {
      setAccionando(false);
    }
  };

  return (
    <div
      className={`bg-tarjeta rounded-lg border border-borde p-3 flex items-start gap-3 ${
        accionando ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {item.foto_url ? (
        <img
          src={item.foto_url}
          alt={item.nombre_item}
          className="w-16 h-16 rounded object-cover border border-borde shrink-0"
          loading="lazy"
        />
      ) : (
        <div className="w-16 h-16 rounded bg-fondo border border-borde flex items-center justify-center shrink-0">
          <span className="text-2xl opacity-30">🍽️</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white truncate">{item.nombre_item}</h3>
          {!item.disponible && (
            <span className="text-[9px] bg-nuevo/20 text-nuevo px-1.5 py-0.5 rounded font-bold uppercase">
              Agotado
            </span>
          )}
        </div>
        {item.descripcion && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{item.descripcion}</p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-dewan font-bold text-sm">{formatDinero(item.precio)}</span>
          {item.categoria_menu && (
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">
              · {item.categoria_menu}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <button
          onClick={() => onEditar(item)}
          className="text-[10px] text-dewan font-bold border border-dewan/30 rounded px-2 py-1"
        >
          Editar
        </button>
        <button
          onClick={toggle}
          className="text-[10px] text-gray-300 border border-borde rounded px-2 py-1"
        >
          {item.disponible ? 'Agotar' : 'Activar'}
        </button>
        <button
          onClick={eliminar}
          className="text-[10px] text-nuevo border border-nuevo/30 rounded px-2 py-1"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [modo, setModo] = useState('lista');
  const [editando, setEditando] = useState(null);
  const [, setVer] = useState(0); // fuerza re-render al cambiar la moneda

  const cargar = async () => {
    setCargando(true);
    setError('');
    try {
      const data = await listarMenu();
      setItems(data);
    } catch (e) {
      setError(e?.message || 'No se pudo cargar el menú');
    }
    setCargando(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  const grupos = useMemo(() => {
    const m = new Map();
    for (const it of items) {
      const cat = it.categoria_menu?.trim() || 'Sin categoría';
      if (!m.has(cat)) m.set(cat, []);
      m.get(cat).push(it);
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  const guardarNuevo = async (datos) => {
    await crearItemMenu(datos);
    setModo('lista');
    await cargar();
  };

  const guardarEdit = async (datos) => {
    await actualizarItemMenu(editando.id, datos);
    setModo('lista');
    setEditando(null);
    await cargar();
  };

  const toggleDisp = async (item) => {
    await actualizarItemMenu(item.id, { disponible: !item.disponible });
    setItems((prev) =>
      prev.map((x) => (x.id === item.id ? { ...x, disponible: !item.disponible } : x))
    );
  };

  const eliminar = async (item) => {
    await eliminarItemMenu(item.id);
    setItems((prev) => prev.filter((x) => x.id !== item.id));
  };

  if (modo === 'nuevo') {
    return (
      <div className="px-3 pt-3 pb-8">
        <Formulario
          inicial={VACIO}
          onCancelar={() => setModo('lista')}
          onGuardar={guardarNuevo}
        />
      </div>
    );
  }

  if (modo === 'editar' && editando) {
    return (
      <div className="px-3 pt-3 pb-8">
        <Formulario
          inicial={editando}
          onCancelar={() => {
            setModo('lista');
            setEditando(null);
          }}
          onGuardar={guardarEdit}
        />
      </div>
    );
  }

  return (
    <div className="px-3 pt-3 pb-8 space-y-4">
      {permiteElegirMoneda() && (
        <div className="bg-tarjeta border border-borde rounded-lg px-3 py-2.5">
          <SelectorMoneda compacto onCambio={() => setVer((v) => v + 1)} />
        </div>
      )}

      <button
        onClick={() => setModo('nuevo')}
        className="w-full bg-dewan text-fondo font-bold py-3 rounded-lg active:scale-95"
      >
        + Agregar producto
      </button>

      {error && (
        <div className="bg-nuevo/10 border border-nuevo/30 text-nuevo text-xs rounded-lg p-3">
          {error}
        </div>
      )}

      {cargando ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-dewan border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 px-6">
          <p className="text-6xl mb-3">🍔</p>
          <p className="text-white font-bold">Aún no tienes productos</p>
          <p className="text-gray-400 text-sm mt-1">
            Tocá "Agregar producto" para empezar tu menú.
          </p>
        </div>
      ) : (
        grupos.map(([cat, lista]) => (
          <section key={cat}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">
              {cat} ({lista.length})
            </h2>
            <div className="space-y-2">
              {lista.map((it) => (
                <ItemRow
                  key={it.id}
                  item={it}
                  onEditar={(i) => {
                    setEditando(i);
                    setModo('editar');
                  }}
                  onToggleDisp={toggleDisp}
                  onEliminar={eliminar}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
