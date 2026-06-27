/* ====================================================================
   RESTAURANTE 2 — Sr. moro
   "Tan quesoso como delicioso". Paleta: naranja + vino + crema.
   Se abre con:  index.html?r=srmoro   (sumá &tema=1 / 2 / 3)
   ==================================================================== */
window.RESTAURANTES = window.RESTAURANTES || {};
window.RESTAURANTES["srmoro"] = {
  nombre: "Sr. moro",
  slogan: "Tan quesoso como delicioso",
  logo: "assets/srmoro.jpeg",
  logoRedondo: "assets/srmoro-coin.png",   // emblema recortado para el medallón de sm-circular
  whatsapp: "584120000001",        // ⚠️ número del local
  restauranteId: "f4c62125-b8ef-4ccb-9070-0602447ccbb1",   // restaurante_id real de "Sr. Moro" en Supabase (96 platos)
  // Orden de categorías: principales primero. Aperitivos/Adicionales/Bebidas/Micheladas caen solas al final.
  ordenCategorias: ["Promociones", "Combo Ejecutivo", "Clásicos", "Pollo", "Res", "Cerdo", "Mariscos", "Alitas", "Proteínas Sueltas", "Menú Vegetariano", "Moro Kids"],
  // App por defecto = "Queso Redondo" (sm-circular). El resto siguen disponibles con &tpl=
  plantillas: ["sm-circular", "sm-vino", "sm-mosaico", "sm-carta", "sm-luxe", "sm-delivery"],

  // Paleta EXACTA del logo (muestreada de la imagen)
  marca: "#FCBD43",   // amarillo (aro del logo)
  tinta: "#6A1B37",   // vino (fondo + texto principal)
  crema: "#FDF8DA",   // beige/crema (letras sobre el vino)
  acento: "#A4694B",  // marrón café (las "o")

  menu: [
    {
      categoria: "Especialidades",
      items: [
        { id: "e1", nombre: "Moro Especial", desc: "El de la casa, bien quesoso", precio: 6.90, emoji: "🧀", foto: "" },
        { id: "e2", nombre: "Moro Doble", desc: "Doble porción, doble queso", precio: 9.50, emoji: "🧀", foto: "" },
        { id: "e3", nombre: "Moro Criollo", desc: "Carne mechada y queso amarillo", precio: 7.50, emoji: "🍖", foto: "" },
      ],
    },
    {
      categoria: "Acompañantes",
      items: [
        { id: "a1", nombre: "Papas con queso", desc: "Porción grande", precio: 3.50, emoji: "🍟", foto: "" },
        { id: "a2", nombre: "Aros de cebolla", desc: "8 unidades", precio: 3.00, emoji: "🧅", foto: "" },
        { id: "a3", nombre: "Ensalada fresca", desc: "Verde con aderezo de la casa", precio: 2.80, emoji: "🥗", foto: "" },
      ],
    },
    {
      categoria: "Bebidas",
      items: [
        { id: "b1", nombre: "Jugo natural", desc: "Parchita, melón o mango", precio: 2.00, emoji: "🧃", foto: "" },
        { id: "b2", nombre: "Refresco", desc: "Lata 355ml", precio: 1.50, emoji: "🥤", foto: "" },
      ],
    },
  ],
};
