window.RESTAURANTES = window.RESTAURANTES || {};
/* RYO BURGER (Riobamba) — carta del SISTEMA (2-sep-2026).
   Menú REAL desde Supabase (vitrina_menu, restauranteId) → live: true.
   `sistema`: el pedido NO va por WhatsApp: se guarda directo en pedidos_sistema
   (panel del local + link de seguimiento) y el envío se cotiza con la tarifa DEWAN
   (la moto DEWAN entrega). Ver carta/sistema.js. */
window.RESTAURANTES["ryo"] = {
  nombre: "Ryo Burger",
  slogan: "Hamburguesas artesanales · alitas · costillas",
  direccion: "Reina Pacha y Av. Carlos Zambrano · Riobamba",
  marca: "#E8552F", tinta: "#1B1B1B", crema: "#FFF6E9", acento: "#F2B705",
  whatsapp: "593986777146",   // respaldo (bot); el pedido normal va directo al sistema
  logo: "",
  emojiDefault: "🍔",
  cocina: "burger",
  vozDestacado: "🍔 La colección",
  meta: ["🛵 Entrega a domicilio", "🏪 Retiro en local", "📍 Reina Pacha"],
  promo: "🍗 Jueves de alitas",
  plantillas: ["street", "swift", "ticket"],
  restauranteId: "0cca9530-df0c-4151-87ee-ad619429e714",
  live: true,
  ordenCategorias: ["Hamburguesas", "Colección", "Hamburguesas de Pollo", "Hamburguesas Lomo Fino", "Hamburguesas Vegetarianas", "Alitas", "Costillas", "Especiales", "Promos", "Ensaladas", "Menú Infantil", "Extras"],
  categoriasAlFinal: ["Bebidas", "Ingredientes Extra"],
  sistema: {
    tabla: "pedidos_sistema",
    seguimiento: "https://dewansas.com/pedido/?s=sistema&t=",
    local: { lat: -1.6656123, lng: -78.659141, direccion: "Reina Pacha y Av. Carlos Zambrano" },
    envio: { modo: "dewan", cotizador: "https://n8n.dewansas.com/webhook/calcular-precio" },
    tiempoTexto: "El local confirma el tiempo en un momento",
    horario: "12:00 a 22:30"
  },
  menu: []
};
