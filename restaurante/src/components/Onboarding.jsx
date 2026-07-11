import { useState } from 'react';

// Tutorial in-app de DEWAN Restaurante. Aparece la 1ª vez (App.jsx controla la
// marca en localStorage) y se puede re-ver desde ⚙️ Ajustes › Ver tutorial.
// Carrusel deslizable (swipe táctil + botones). Tema oscuro de la app.

const Plato = () => (
  <div className="w-44 rounded-xl overflow-hidden border border-borde bg-tarjeta">
    <div
      className="h-20 flex items-center justify-center text-4xl relative"
      style={{ background: 'linear-gradient(135deg,#7c2d12,#b45309,#f59e0b)' }}
    >
      🍗
      <span className="absolute top-1.5 right-1.5 bg-dewan text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full">
        con foto
      </span>
    </div>
    <div className="px-2.5 py-2 text-left">
      <p className="text-xs font-bold text-white">Pollo Broaster</p>
      <span className="text-xs text-dewan font-extrabold">$5.50</span>
    </div>
  </div>
);

const SLIDES = [
  {
    art: (
      <div className="flex flex-col items-center gap-1">
        <span className="text-dewan font-black text-4xl tracking-wide">DEWAN</span>
        <span className="text-gray-500 text-sm">Panel Restaurante</span>
        <span className="text-6xl mt-2">👋</span>
      </div>
    ),
    titulo: 'Bienvenido a DEWAN Restaurante',
    texto: (
      <>Recibí y gestioná tus pedidos <b className="text-gray-200">en tiempo real</b>. Te explicamos todo en 1 minuto.</>
    ),
  },
  {
    art: (
      <>
        <span className="text-5xl">🔊</span>
        <div
          className="w-full max-w-[300px] bg-emerald-600 text-white font-extrabold text-[13px] py-3 px-3 rounded-lg text-center"
          style={{ boxShadow: '0 0 0 6px rgba(16,185,129,.18)' }}
        >
          🔊 Sonido activado — la alarma suena sola
        </div>
      </>
    ),
    titulo: 'Antes de empezar',
    texto: (
      <>
        El sonido de la alarma <b className="text-gray-200">se activa solo</b> — no tenés que tocar nada.
        Subí el volumen y <b className="text-gray-200">dejá la app abierta</b>. Ideal: una tablet o PC siempre encendida.
        (Solo si usás el panel en un navegador web aparece la barra roja "Activar el sonido" — ahí sí tocala.)
      </>
    ),
  },
  {
    art: (
      <div className="w-full max-w-[300px] rounded-xl border-2 border-nuevo bg-nuevo/10 p-3 text-left">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-extrabold text-nuevo">#1284 · NUEVO PEDIDO</span>
          <span className="text-[10px] text-gray-500">12s</span>
        </div>
        <p className="text-[11px] text-gray-200 my-2 leading-snug">2x Pollo Broaster<br />1x Papas grandes<br />1x Cola 1L</p>
        <div className="text-[11px] text-gray-400">
          Cliente: <b className="text-gray-200">Juan P.</b> 📞
        </div>
        <div className="mt-2 bg-fondo/60 border border-borde rounded-lg p-2 flex justify-between text-[11px]">
          <span className="text-gray-400">Tu venta</span>
          <span className="text-white font-bold">$8.50</span>
        </div>
      </div>
    ),
    titulo: 'Llega un pedido',
    texto: (
      <>
        Suena y <b className="text-gray-200">parpadea en rojo</b> en la pestaña <b className="text-gray-200">Pedidos</b>. Vas a ver los
        platos, el cliente (con su 📞) y <b className="text-gray-200">"Tu venta"</b>.
      </>
    ),
  },
  {
    art: (
      <>
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold self-start">Tiempo de preparación</span>
        <div className="grid grid-cols-5 gap-1.5 w-full max-w-[300px]">
          {['10', '15', '20', '30', '45'].map((m, k) => (
            <span
              key={m}
              className={`text-center py-3 rounded-lg font-extrabold text-sm border ${
                k === 1 ? 'bg-dewan text-black border-dewan scale-105' : 'bg-dewan/15 text-dewan border-dewan/30'
              }`}
            >
              {m}'
            </span>
          ))}
        </div>
        <span className="text-gray-500 text-xs mt-1">👆 tocar = aceptar</span>
      </>
    ),
    titulo: 'Aceptá eligiendo el tiempo',
    texto: (
      <>
        Para aceptar, tocá <b className="text-gray-200">cuánto vas a tardar</b>. Pasa a <b className="text-gray-200">"En preparación"</b> y
        arranca el cronómetro. <b className="text-gray-200">Con impresora, la comanda sale sola.</b>
      </>
    ),
  },
  {
    art: (
      <div className="w-full max-w-[300px] rounded-xl border-l-4 border-preparando bg-tarjeta p-3 text-left">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] font-extrabold text-preparando">#1284</span>
            <p className="text-sm font-bold text-white">En preparación</p>
          </div>
          <span className="text-3xl font-black text-preparando tabular-nums">08:32</span>
        </div>
        <p className="text-[11px] text-gray-300 mt-1">2x Pollo Broaster · 1x Papas · 1x Cola</p>
      </div>
    ),
    titulo: 'El cronómetro',
    texto: (
      <>
        Ves la <b className="text-gray-200">cuenta regresiva</b>. Si se pone <b className="text-nuevo">rojo</b>, ya se cumplió el tiempo
        que prometiste: tené el pedido listo antes.
      </>
    ),
  },
  {
    art: (
      <>
        <span className="text-5xl">🚫</span>
        <div className="w-full max-w-[300px] bg-nuevo/10 text-nuevo border border-nuevo/30 rounded-lg py-3 text-center font-extrabold text-[13px]">
          No podemos preparar este pedido
        </div>
      </>
    ),
    titulo: '¿No pueden prepararlo?',
    texto: (
      <>
        Tocá <b className="text-gray-200">"No podemos preparar este pedido"</b> y contanos el motivo. Usalo solo si de verdad no
        pueden (sin stock, cerrado…).
      </>
    ),
  },
  {
    art: (
      <>
        <span className="text-5xl">🏍️</span>
        <div className="w-full max-w-[300px] rounded-xl border-l-4 border-encamino bg-tarjeta p-3 text-left">
          <span className="text-[10px] font-extrabold text-encamino">#1284 · EN ENTREGA</span>
          <p className="text-[11px] text-gray-400 mt-1">Ya está con el motorizado. No lo prepares de nuevo.</p>
        </div>
      </>
    ),
    titulo: 'Entregando',
    texto: (
      <>
        Cuando el motorizado <b className="text-gray-200">recoge</b>, el pedido pasa a la pestaña <b className="text-gray-200">Entregando</b>.
        Ya va en camino al cliente.
      </>
    ),
  },
  {
    art: (
      <>
        <div className="w-full max-w-[300px] flex border-b border-borde">
          <span className="flex-1 text-center py-2 text-[11px] font-bold text-dewan border-b-2 border-dewan uppercase">Pedidos</span>
          <span className="flex-1 text-center py-2 text-[11px] font-bold text-gray-500 uppercase">Entregando</span>
          <span className="flex-1 text-center py-2 text-[11px] font-bold text-gray-500 uppercase">Ventas</span>
        </div>
        <div className="w-full max-w-[300px] bg-fondo/60 border border-borde rounded-lg p-2.5 flex justify-between text-xs text-dewan font-extrabold uppercase tracking-wide">
          <span>El motorizado te entrega</span>
          <span>$8.50</span>
        </div>
        <div className="w-10 h-10 border border-borde rounded-lg flex items-center justify-center text-xl">⚙️</div>
      </>
    ),
    titulo: 'Dinero, Ventas y Ajustes',
    texto: (
      <>
        <b className="text-gray-200">"El motorizado te entrega"</b> = efectivo que recibís. En <b className="text-gray-200">Ventas</b> ves el
        total del día. En <b className="text-gray-200">⚙️</b> configurás tu impresora y tu menú.
      </>
    ),
  },
  {
    art: (
      <>
        <Plato />
        <span className="text-4xl mt-1">📸</span>
      </>
    ),
    titulo: 'Una buena foto vende sola',
    texto: (
      <>
        Subí tus platos desde <b className="text-gray-200">⚙️ Ajustes › Menú</b>: nombre, precio, disponibilidad y lo más importante,
        la <b className="text-gray-200">foto</b>. 📈 <b className="text-gray-200">Los platos con foto se piden 2 y hasta 3 veces más.</b>
      </>
    ),
  },
  {
    art: (
      <div className="flex items-center gap-3.5 justify-center">
        <div className="w-[54px] h-24 border border-borde rounded-lg bg-tarjeta flex items-center justify-center text-2xl">📱</div>
        <div className="w-28 h-20 border border-borde rounded-lg bg-tarjeta flex items-center justify-center text-3xl">💻</div>
      </div>
    ),
    titulo: 'En tu celular, y también en tu compu',
    texto: (
      <>
        Vive en tu <b className="text-gray-200">celular</b>: suena y vibra en cada pedido. ¿Preferís una <b className="text-gray-200">pantalla
        fija en caja</b>? También funciona en <b className="text-gray-200">computadora (Windows)</b> — no se descarga de la tienda, el
        equipo DEWAN te la instala. Pedila a tu asesor.
      </>
    ),
  },
  {
    art: <span className="text-6xl">🚀</span>,
    titulo: '¡Listo para vender!',
    texto: <>Ya sabés lo esencial. Mantené la app abierta y con sonido, y atendé rápido tus pedidos.</>,
    extra: (
      <div className="w-full max-w-[330px] bg-dewan/8 border border-dewan/30 rounded-xl p-3 text-[13px] text-gray-300 leading-relaxed">
        ✨ <b className="text-white">¿Querés más pedidos?</b> Mirá <b className="text-dewan">"Crece con DEWAN"</b> en ⚙️ Ajustes y
        aparecé destacado.
      </div>
    ),
  },
];

export default function Onboarding({ onCerrar }) {
  const [i, setI] = useState(0);
  const [x0, setX0] = useState(null);
  const total = SLIDES.length;
  const ultima = i === total - 1;
  const s = SLIDES[i];
  const ir = (n) => setI(Math.max(0, Math.min(total - 1, n)));

  const onTouchStart = (e) => setX0(e.touches[0]?.clientX ?? null);
  const onTouchEnd = (e) => {
    if (x0 == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? x0) - x0;
    if (dx < -45) ir(i + 1);
    else if (dx > 45) ir(i - 1);
    setX0(null);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-fondo flex flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex gap-1.5">
          {SLIDES.map((_, k) => (
            <span
              key={k}
              className={`h-[7px] rounded-full transition-all duration-200 ${k === i ? 'w-5 bg-dewan' : 'w-[7px] bg-borde'}`}
            />
          ))}
        </div>
        {!ultima && (
          <button onClick={onCerrar} className="text-gray-500 text-sm font-semibold px-2 py-1">
            Saltar
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-7 gap-4 overflow-y-auto">
        <div className="w-full max-w-[340px] min-h-[180px] flex flex-col items-center justify-center gap-3">{s.art}</div>
        <h2 className="text-white font-extrabold text-2xl leading-tight">{s.titulo}</h2>
        <p className="text-gray-400 text-[15px] leading-relaxed max-w-[330px]">{s.texto}</p>
        {s.extra}
      </div>

      <div className="px-5 pb-7 flex items-center justify-between">
        <button
          onClick={() => ir(i - 1)}
          className={`text-gray-500 text-sm font-semibold px-3 py-2 ${i === 0 ? 'invisible' : ''}`}
        >
          ← Atrás
        </button>
        <button
          onClick={() => (ultima ? onCerrar() : ir(i + 1))}
          className="bg-dewan text-black font-extrabold text-[15px] px-6 py-3 rounded-xl active:scale-95 transition-transform"
        >
          {ultima ? 'Empezar 🚀' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}
