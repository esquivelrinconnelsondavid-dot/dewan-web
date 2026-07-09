// Desglose financiero por pedido/carrera.
// ⚠️ MISMA fórmula que la app del motorizado (mi-app/src/utilidades/precios.ts)
// para que admin y moto muestren EXACTAMENTE los mismos números (cuánto paga al
// local, cuánto cobra al cliente, comisión y markup). Si cambia una, cambiar la otra.

// Cuota fija que el moto le paga a DEWAN por cada carrera (hoy $0.70).
export const COMISION_POR_ENTREGA = 0.70;

export function calcularDesglose(pedido) {
  const total = Number(pedido.monto_total) || 0;            // comida que ve el cliente (con markup)
  const comision = Number(pedido.monto_comision) || 0;      // comisión % del local
  const carrera = Number(pedido.precio_calculado) || 0;     // envío
  const quien = pedido.comision_la_paga;                    // 'restaurante' | 'cliente' | 'motorizado'
  const markup = Number(pedido.markup_dewan) || 0;          // markup DEWAN

  // Precio base del local = lo que recibe el restaurante por los productos (sin markup).
  // Si la BD lo guardó usamos ese (más preciso); si no, lo derivamos = monto_total - markup.
  const baseProductos = pedido.precio_base_productos != null
    ? Number(pedido.precio_base_productos)
    : Math.max(0, total - markup);

  // Cobra al cliente: comida (con markup) + carrera. Si la comisión la paga el cliente, se le suma.
  let cobrarAlCliente = total + carrera;
  // Paga al local: precio base. Si la comisión la paga el local, se le descuenta (el moto paga menos).
  let pagarAlLocal = baseProductos;

  if (quien === 'restaurante') {
    pagarAlLocal = baseProductos - comision;
  } else if (quien === 'cliente') {
    cobrarAlCliente = total + comision + carrera;
  }

  const comisionPagaMoto = quien === 'motorizado' ? comision : 0;
  // El moto SIEMPRE le entrega a DEWAN: cuota fija + comisión del local + markup.
  const aPagarADewan = COMISION_POR_ENTREGA + comision + markup;
  const gananciaMotorizado = Math.max(0, carrera - COMISION_POR_ENTREGA - comisionPagaMoto);

  return {
    precioBaseProductos: baseProductos,
    precioProducto: total,
    pagarAlLocal: Math.max(0, pagarAlLocal),
    cobrarAlCliente: Math.max(0, cobrarAlCliente),
    precioCarrera: carrera,
    comisionRestaurante: comision,
    comisionPagaMoto,
    comisionDewan: COMISION_POR_ENTREGA,
    markupDewan: markup,
    aPagarADewan,
    gananciaMotorizado,
    quienPagaComision: quien || null,
  };
}
