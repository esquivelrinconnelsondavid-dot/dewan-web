/* ====================================================================
   RESTAURANTE 1 — Papazota Cheese
   Papas cargadas con queso. Paleta: carbón + queso amarillo + marrón.
   Se abre con:  index.html?r=papazota   (sumá &tema=1 / 2 / 3)
   ==================================================================== */
window.RESTAURANTES = window.RESTAURANTES || {};
window.RESTAURANTES["papazota"] = {
  nombre: "Papazota Cheese",
  slogan: "Papas cargadas de queso 🧀",
  logo: "assets/papazota.jpeg",
  tituloImg: "assets/papazota-titulo.png",   // lettering EXACTO del logo (lo usa pz-street)
  whatsapp: "584120000000",        // ⚠️ número del local: país + número, sin + ni espacios
  restauranteId: "947f1428-3995-4e28-8282-ad065ce29c55",   // restaurante_id real de Papazota en Supabase
  // Orden de categorías: principales primero, después Extras, y Bebidas al final.
  ordenCategorias: ["Papazota", "Papazita", "Extras"],
  plantillas: ["pz-street", "pz-delivery", "pz-pizarra"],  // sus 3 modelos (pz-street = app por defecto)

  // Paleta EXACTA del logo (muestreada de la imagen)
  marca: "#F6D441",   // queso amarillo (exacto)
  tinta: "#373636",   // carbón (exacto)
  crema: "#fdf6d8",   // crema suave (para textos claros)
  acento: "#7A6A58",  // marrón (exacto)

  menu: [
    {
      categoria: "Papas cargadas",
      items: [
        { id: "p1", nombre: "Papazota Clásica", desc: "Papas, queso cheddar fundido y tocineta", precio: 5.50, emoji: "🧀", foto: "" },
        { id: "p2", nombre: "Papazota Mixta", desc: "Carne mechada, pollo, queso y salsas", precio: 7.50, emoji: "🍟", foto: "" },
        { id: "p3", nombre: "Papazota Suprema", desc: "Triple queso, tocineta, maíz y cebollín", precio: 8.90, emoji: "🧀", foto: "" },
      ],
    },
    {
      categoria: "Para picar",
      items: [
        { id: "a1", nombre: "Dedos de queso", desc: "6 unidades con salsa", precio: 4.00, emoji: "🧀", foto: "" },
        { id: "a2", nombre: "Nachos con queso", desc: "Porción para compartir", precio: 4.50, emoji: "🧀", foto: "" },
        { id: "a3", nombre: "Tequeños", desc: "8 unidades", precio: 3.80, emoji: "🥖", foto: "" },
      ],
    },
    {
      categoria: "Bebidas",
      items: [
        { id: "b1", nombre: "Refresco", desc: "Lata 355ml", precio: 1.50, emoji: "🥤", foto: "" },
        { id: "b2", nombre: "Limonada", desc: "Vaso 16oz", precio: 2.00, emoji: "🍋", foto: "" },
      ],
    },
  ],
};
