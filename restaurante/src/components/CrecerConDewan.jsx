// Sección "Crece con DEWAN" (en ⚙️ Ajustes). A los NO-aliados les muestra el
// pitch para subir a Aliado (visibilidad + precio del local + más ventas) con
// botón que abre WhatsApp al equipo DEWAN. A los aliados, una felicitación.
// El botón NO cambia el tier: la activación se cierra hablando (protege el 5%).

const WHATSAPP_DEWAN = '593962223600'; // 0962223600 en formato internacional

export default function CrecerConDewan({ restaurante }) {
  const esAliado =
    restaurante?.tipo_restaurante === 'aliado' || restaurante?.tipo_acuerdo === 'aliado';

  const abrirWhatsApp = () => {
    const nombre = restaurante?.nombre || 'mi local';
    const msg = `Hola DEWAN 👋 Soy ${nombre}. Quiero subir a Aliado y aparecer destacado. ¿Me cuentan cómo?`;
    const url = `https://wa.me/${WHATSAPP_DEWAN}?text=${encodeURIComponent(msg)}`;
    try {
      window.open(url, '_blank');
    } catch {
      window.location.href = url;
    }
  };

  if (esAliado) {
    return (
      <div className="p-5 flex flex-col items-center text-center gap-4 max-w-[440px] mx-auto">
        <span className="text-6xl">⭐</span>
        <h2 className="text-white font-extrabold text-2xl">Eres Aliado</h2>
        <p className="text-gray-300 text-[15px] leading-relaxed">
          Sales <b className="text-dewan">destacado en la vitrina del inicio</b> y tus clientes pagan tu{' '}
          <b className="text-dewan">precio exacto</b>, sin recargo.
        </p>
        <p className="text-gray-400 text-sm">¡Gracias por crecer con DEWAN! 🚀</p>
      </div>
    );
  }

  const beneficios = [
    ['✅', <>Tus clientes pagan <b className="text-white">TU precio exacto, sin recargo</b> — tus platos se ven más baratos.</>],
    ['⭐', <>Badge <b className="text-white">"✓ Precio del local"</b> junto a tu nombre.</>],
    ['🏆', <>Sales <b className="text-white">destacado en la vitrina del inicio</b>.</>],
    ['🔝', <>Apareces <b className="text-white">primero</b> en categorías y búsqueda.</>],
    ['🎟️', <><b className="text-white">Cupones para tus clientes</b> (BIENVENIDA y VUELVE).</>],
  ];

  return (
    <div className="p-4 max-w-[460px] mx-auto">
      <div className="text-center mb-4">
        <span className="text-5xl">⭐</span>
        <h2 className="text-white font-extrabold text-2xl mt-2">Pasa a la primera fila</h2>
        <p className="text-gray-400 text-[14px] leading-relaxed mt-2">
          Hoy tu local sale con visibilidad normal. Como <b className="text-gray-200">Aliado</b> eres lo primero que ve el
          cliente — y eso son más pedidos.
        </p>
      </div>

      <ul className="flex flex-col gap-2.5">
        {beneficios.map(([icono, txt], k) => (
          <li key={k} className="flex gap-2.5 items-start bg-tarjeta border border-borde rounded-xl p-3 text-[13.5px] text-gray-200 leading-snug">
            <span className="shrink-0 text-lg leading-none">{icono}</span>
            <span>{txt}</span>
          </li>
        ))}
      </ul>

      <div className="bg-dewan/8 border border-dewan/30 rounded-xl p-3 mt-4 text-[13px] text-gray-300 leading-relaxed">
        <b className="text-white">Sin letra chica:</b> pagas una comisión del{' '}
        <b className="text-dewan">10% solo sobre lo que vendes por la app</b>. Si no vendes, no pagas — no es mensualidad.
        El envío siempre lo paga el cliente: <b className="text-gray-200">tú nunca pagas el delivery.</b>
      </div>

      <div className="bg-tarjeta border border-borde rounded-xl p-3 mt-3">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Ejemplo · pedido de $10</p>
        <div className="flex justify-between text-[13px] text-gray-400">
          <span>Tu venta</span>
          <span className="text-white font-bold">$10</span>
        </div>
        <div className="flex justify-between text-[13px] text-gray-400 mt-1">
          <span>Comisión DEWAN (la pagas tú)</span>
          <span>− $1</span>
        </div>
        <div className="flex justify-between text-dewan font-extrabold mt-2 pt-2 border-t border-borde">
          <span>Recibes</span>
          <span>$9</span>
        </div>
      </div>

      <button
        onClick={abrirWhatsApp}
        className="w-full bg-dewan text-black font-extrabold text-[15px] py-4 rounded-2xl mt-4 active:scale-95 transition-transform"
      >
        Quiero pasar a Aliado
      </button>
      <p className="text-center text-gray-500 text-sm font-semibold mt-3">Seguir gratis por ahora</p>
    </div>
  );
}
