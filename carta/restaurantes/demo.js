window.RESTAURANTES = window.RESTAURANTES || {};
/* DEMO premium con fotos reales (mockup para mostrar el nivel con fotografía).
   Las fotos son de TheMealDB (reemplazar por las reales del local). */
window.RESTAURANTES["demo"] = {
  nombre: "Baltimore",
  slogan: "Food & Drinks · hamburguesas a la parrilla",
  direccion: "C.C. Multiplaza · Riobamba",
  marca: "#E05B19", tinta: "#16181D", crema: "#F6F6F4", acento: "#E05B19",
  whatsapp: "593963506665",
  logo: "assets/baltimore.jpeg",
  heroFoto: "assets/demo/food9.jpg",
  emojiDefault: "🍔",
  cocina: "burger",
  vozDestacado: "🍔 Los clásicos",
  meta: ["🛵 30 min", "🔥 A la parrilla", "📍 Multiplaza"],
  promo: "🛵 30 min",
  plantillas: ["premium", "grid-foto", "poster", "inmersivo", "ticket"],
  menu: [
    { categoria: "Hamburguesas", items: [
      { id: "d1", nombre: "Baltimore Doble", precio: 5.50, foto: "assets/demo/food9.jpg", desc: "Doble carne a la parrilla, cheddar, tocino y salsa de la casa." },
      { id: "d2", nombre: "Clásica con Tocino", precio: 4.75, foto: "assets/demo/food7.jpg", desc: "Carne smasheada, queso, tocino crocante y vegetales frescos." },
      { id: "d3", nombre: "Smash de la Casa", precio: 5.00, foto: "assets/demo/food19.jpg", desc: "Doble smash, cebolla caramelizada y queso fundido." } ] },
    { categoria: "Alitas & Pollo", items: [
      { id: "d4", nombre: "Alitas BBQ (8u)", precio: 5.50, foto: "assets/demo/food18.jpg", desc: "Bañadas en salsa BBQ ahumada, con su dip." },
      { id: "d5", nombre: "Alitas Picantes (8u)", precio: 5.50, foto: "assets/demo/food17.jpg", desc: "Buffalo picante para los valientes." },
      { id: "d6", nombre: "Pollo Broaster", precio: 4.50, foto: "assets/demo/food15.jpg", desc: "Crocante por fuera, jugoso por dentro, con papas." } ] },
    { categoria: "Salchipapas & Sides", items: [
      { id: "d7", nombre: "Salchipapa Baltimore", precio: 3.50, foto: "assets/demo/food16.jpg", desc: "Papas, salchicha, carne y queso derretido." },
      { id: "d8", nombre: "Empanadas (3u)", precio: 2.50, foto: "assets/demo/food3.jpg", desc: "Doraditas, rellenas de queso o carne." } ] },
    { categoria: "Hot Dogs", items: [
      { id: "d9", nombre: "Hot Dog Especial", precio: 3.00, foto: "assets/demo/food11.jpg", desc: "Salchicha grande, queso, tocino y papitas al hilo." } ] },
    { categoria: "Postres", items: [
      { id: "d10", nombre: "Cinnamon Roll", precio: 2.50, foto: "assets/demo/food5.jpg", desc: "Tibio, con glaseado de la casa." },
      { id: "d11", nombre: "Alfajores (3u)", precio: 2.00, foto: "assets/demo/food8.jpg", desc: "Rellenos de manjar, suaves y dulces." },
      { id: "d12", nombre: "Mousse de Frutos Rojos", precio: 2.75, foto: "assets/demo/food4.jpg", desc: "Cremoso, con salsa de frutos rojos." } ] },
    { categoria: "Bebidas", items: [
      { id: "d13", nombre: "Limonada Natural", precio: 1.50, emoji: "🧃", desc: "Bien fría, recién hecha." },
      { id: "d14", nombre: "Gaseosa", precio: 1.00, emoji: "🥤", desc: "Personal 500ml." } ] },
  ],
};
