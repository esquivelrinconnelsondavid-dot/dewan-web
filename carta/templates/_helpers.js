/* ============================================================
   Helpers compartidos por las plantillas PRO.
   window.emojiPara(nombre, categoria) -> un emoji que calza con el plato,
   para que el menú real de Supabase (sin foto ni emoji) salga variado.
   ============================================================ */
window.emojiPara = window.emojiPara || function (nombre, cat, fallback) {
  const s = ((nombre || "") + " " + (cat || ""))
    .toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const has = (...ws) => ws.some((w) => s.includes(w));

  if (has("hamburgues", "burger", "burguer")) return "🍔";
  if (has("salchipap")) return "🍟";
  if (has("papa", "fritas", "french fr")) return "🍟";
  if (has("hot dog", "hotdog", "perro caliente", "pancho")) return "🌭";
  if (has("choripan", "chorizo")) return "🌭";
  if (has("pizza")) return "🍕";
  if (has("lasagna", "lasaña", "pasta", "espagueti", "spagueti", "tallarin", "fetuccini", "ravioli")) return "🍝";
  if (has("alit", "wing")) return "🍗";
  if (has("pollo", "broaster", "presa", "pechuga")) return "🍗";
  if (has("costilla", "chuleta", "cerdo", "chancho", "panceta", "tocino", "rib", "bondiola")) return "🍖";
  if (has("churrasco", "lomo", "bistec", "bife", "picaña", "picana", "res ", " res", "carne", "parrilla", "parrillada", "asado", "steak", "vacio", "vacío", "punta", "brasa")) return "🥩";
  if (has("ceviche", "cevich", "camaron", "langostino")) return "🦐";
  if (has("concha")) return "🦪";
  if (has("pulpo")) return "🐙";
  if (has("cangrejo", "jaiba")) return "🦀";
  if (has("langosta", "marisco", "mariner", "marisquer", "mixto de mar")) return "🦞";
  if (has("pescado", "corvina", "tilapia", "albacora", "dorado", "trucha", "filete")) return "🐟";
  if (has("encebollado", "sopa", "caldo", "cazuela", "sancocho", "locro", "biche", "consome", "consomé")) return "🍲";
  if (has("arroz")) return "🍚";
  if (has("sushi", "roll", "maki", "nigiri", "tempura")) return "🍣";
  if (has("taco", "burrito", "nacho", "quesadilla", "fajita")) return "🌮";
  if (has("empanada")) return "🥟";
  if (has("bolon", "bolón")) return "🍳";
  if (has("huevo", "desayuno", "tortilla", "omelet")) return "🍳";
  if (has("sanduch", "sandwich", "sánduch", "sandu", "tostado")) return "🥪";
  if (has("ensalada")) return "🥗";
  if (has("hornado", "fritada", "seco de", "guatita", "cascarit")) return "🍖";
  if (has("menestra", "lentej")) return "🫘";
  if (has("tamal", "humita", "quimbolito", "bollo")) return "🫔";
  if (has("maduro", "patacon", "patacón", "platano", "plátano", "verde")) return "🍌";
  if (has("waffle", "wafle")) return "🧇";
  if (has("crepe", "crep")) return "🥞";
  if (has("fresa")) return "🍓";
  if (has("brownie", "nutella")) return "🍫";
  if (has("cheesecake", "torta", "pastel", "cake", "tres leches", "pie")) return "🍰";
  if (has("helado", "sundae", "copa", "banana split", "paila", "nieve", "affogato")) return "🍨";
  if (has("capuchino", "cappu", "espresso", "latte", "mocaccino", "café", "cafe ", " cafe", "americano")) return "☕";
  if (has("chocolate caliente", "aguita", "aromatica", "aromática", " te ", "infusion")) return "🍵";
  if (has("milkshake", "malteada", "batido", "frappe", "frappé", "smoothie", "shake")) return "🥤";
  if (has("limonada", "jugo", "naranjada", "frozen", "mojito")) return "🧃";
  if (has("cerveza", "michelada", "pilsener", "club", "corona", "heineken")) return "🍺";
  if (has("gaseosa", "cola", "agua", "bebida", "soda", "sprite", "fanta", "fioravanti")) return "🥤";
  if (has("queso")) return "🧀";
  if (has("chocolate")) return "🍫";
  if (has("combo", "familiar", "bandeja", "compartir", "promo", "duo", "dúo")) return fallback || "🍽️";
  return fallback || "🍽️";
};
