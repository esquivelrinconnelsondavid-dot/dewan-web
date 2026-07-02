/* ============================================================
   Baltimore Food & Drinks — Riobamba (Patio C.C. Multiplaza)
   restaurante_id DEWAN: 2070664f-985a-4f63-8228-c5a12436ed08
   Marca: negro #0D0D0D + naranja #E05B19 (muestreado del logo)
   3 modelos: brasa-noir (oscuro premium), street (bold), swift (app)
   ============================================================ */
window.RESTAURANTES = window.RESTAURANTES || {};
window.RESTAURANTES["baltimore"] = {
  nombre: "Baltimore",
  slogan: "Are you ready for?",
  bajada: "Food & Drinks",
  direccion: "Patio de comidas · C.C. Multiplaza · 11 de Noviembre y Ricardo Descalzi",
  promo: "🛵 A domicilio o retira en C.C. Multiplaza",
  badges: ["🛵 A domicilio", "📍 Retiro en local", "Food & Drinks"],
  marca:  "#E05B19",   // naranja del logo
  tinta:  "#0D0D0D",   // negro
  crema:  "#FFFFFF",
  acento: "#FF7A1A",    // naranja más brillante para realces/precios
  whatsapp: "593963506665",
  restauranteId: "2070664f-985a-4f63-8228-c5a12436ed08",
  logo: "assets/baltimore.jpeg",
  emojiDefault: "🍔",
  cocina: "burger",
  plantillas: ["x-baltimore"],
  ordenCategorias: ["Hamburguesas", "Burgers", "Alitas", "Salchipapas", "Hot Dogs", "Combos"],

  /* Menú de respaldo (si falla la lectura live de Supabase). El real se lee con ?r=baltimore&live=1 */
  menu: [
    { categoria: "Hamburguesas", items: [
      { id: "b1", nombre: "Baltimore Clásica", precio: 4.0, emoji: "🍔", desc: "Carne a la parrilla, queso cheddar, vegetales y salsa de la casa." },
      { id: "b2", nombre: "Doble Carne", precio: 5.5, emoji: "🍔", desc: "Doble carne, doble queso y tocino crocante." },
      { id: "b3", nombre: "Pollo Crispy", precio: 4.5, emoji: "🍔", desc: "Pollo apanado crocante, lechuga y mayo de la casa." },
    ]},
    { categoria: "Alitas", items: [
      { id: "b4", nombre: "Alitas BBQ (8u)", precio: 5.5, emoji: "🍗", desc: "Bañadas en salsa BBQ ahumada con su dip." },
      { id: "b5", nombre: "Alitas Picantes (8u)", precio: 5.5, emoji: "🔥", desc: "Buffalo picante para los valientes." },
    ]},
    { categoria: "Salchipapas", items: [
      { id: "b6", nombre: "Salchipapa Baltimore", precio: 3.5, emoji: "🍟", desc: "Papas, salchicha, carne, queso y salsas." },
    ]},
    { categoria: "Bebidas", items: [
      { id: "b7", nombre: "Limonada", precio: 1.5, emoji: "🧃", desc: "Bien fría, natural." },
      { id: "b8", nombre: "Gaseosa", precio: 1.0, emoji: "🥤", desc: "Personal." },
    ]},
  ],
};
