/* ============================================================
   carta/oferta-dueno.js — PANEL PARA EL DUEÑO (18-oct-2026, v2; 19-oct: prueba 14 días)
   Solo en páginas en estado 'demo' de EE.UU. (pagina.js lo carga). El cliente
   final nunca lo ve: una página activa no lo carga.
   v2 (David: «tiene que ser bien explicado, puede confundir; el delivery es muy
   importante»): ordenado por las preguntas que hace un dueño —
     qué estoy viendo · cómo llega un pedido · quién lo lleva (con o sin repartidor)
     · cuánto me ahorro · qué más incluye · cuánto cuesta · garantía · qué hago yo.
   Sin precio: el precio va por escrito en la llamada de 20 min.
   Personalización opcional en config.venta:
     { idioma: "es"|"en", apps: ["DoorDash","Uber Eats"], ticket: 30, comision: 25, contacto: "María",
       nota: "De dónde salieron los precios, si no son los de su carta" }
   ============================================================ */
(function () {
  const VENTAS_WA = "593939647069";
  const VIAJE = 9.75;          // viaje de DoorDash Drive hasta 5 millas (oct-2026); varía por zona
  const ENVIO_CLIENTE = 5.99;  // ejemplo de lo que paga el cliente por el envío
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const usd = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: n < 100 ? 2 : 0, maximumFractionDigits: n < 100 ? 2 : 0 });

  const ES = {
    barra: "👀 Vista previa de la página de pedidos de", barraBtn: "Para el dueño: pruébela 14 días gratis", pill: "💼 Para el dueño",
    kicker: "Para el dueño", cerrar: "Cerrar",
    titulo: "Esta es su página de pedidos, ya armada.",
    intro: "La armamos con su menú y sus fotos para que la vea antes de decidir. Así la verían sus clientes. Todavía es una vista previa: no recibe pedidos de verdad. Mírela como un cliente: agregue platos y abra el pedido.",
    hola: "Hola",
    prT: "Pruébela 14 días gratis, con pedidos de verdad",
    prP: "La activamos con usted y ponemos su link en Google, en su Instagram y en los anuncios que ya está pagando. Los pedidos y la plata son suyos desde el primer día, directo a su cuenta de Stripe. Si a los 14 días no le convence, la apagamos y no paga nada. No le pedimos tarjeta para empezar.",
    prC: "Para que la prueba sirva: (1) abre su cuenta de Stripe (gratis, le ayudamos), (2) hacemos una videollamada de 20 minutos para conectar su cocina y (3) nos deja poner el link en sus anuncios y en su Google. Las publicaciones, los reels y los anuncios nuevos empiezan cuando decide seguir. Solo para los 5 restaurantes fundadores.",

    q1: "¿Qué es?",
    p1: "Una página con su nombre y su menú donde sus clientes le piden directo a usted. Pagan con tarjeta y la plata entra a su propia cuenta de Stripe, a su nombre: nosotros nunca la tocamos. No es una app de delivery: no le cobramos nada por pedido.",

    q2: "¿Cómo le llega un pedido?",
    pasos: [
      "El cliente pide en esta página y paga con tarjeta. El cobro lo hace Stripe (la empresa de pagos con tarjeta) y la plata entra a su propia cuenta de Stripe, a su nombre. Nosotros nunca la tocamos. Stripe se la deposita en su banco, normalmente en 2 días hábiles.",
      "El pedido suena en la pantalla de su cocina (celular, tablet o computadora) con todo: platos, notas, dirección y «pagado». Si tiene impresora de tickets, sale la comanda.",
      "Usted lo acepta y marca en cuánto tiempo está listo.",
      "Lo entrega su repartidor, uno de DoorDash que se pide solo, o el cliente pasa a retirarlo (vea abajo).",
    ],

    q3: "¿Y quién lleva los pedidos?",
    p3: "Usted elige. Puede usar una sola forma o combinarlas, por ejemplo: su repartidor de día y DoorDash en las noches de mucho trabajo.",
    op1t: "Si ya tiene repartidor",
    op1: "Cuando el pedido está listo, le manda a su repartidor un link por WhatsApp. En su celular ve la dirección, el mapa, el teléfono del cliente y cuánto cobrar. No tiene que instalar nada. El cliente lo ve venir en el mapa.",
    op1c: "Usted pone el precio del envío y hasta dónde llega. Puede aceptar efectivo al entregar.",
    op2t: "Si no tiene repartidor",
    op2: "Cuando la comida está lista, se pide solo un repartidor de DoorDash (o de Uber, según la zona). Nadie tiene que llamar a nadie, y el cliente sigue su pedido en vivo.",
    op2c: "Cada viaje tiene una tarifa fija, más o menos $8 a $10 hasta 5 millas, que se carga a una cuenta a su nombre. Usted decide cuánto del envío paga el cliente: todo, una parte o nada. La propina es 100 % para el repartidor. En este caso el cliente paga con tarjeta.",
    op3t: "Solo para retirar",
    op3: "El cliente paga en la página y pasa a recoger. No hay costo de envío. Funciona desde el primer día.",
    ejT: "Ejemplo con un pedido de", ejApp: "Por la app de delivery, la comisión:", ejDd: "Por su página con repartidor de DoorDash:",
    ejDd2: "el viaje cuesta {v}; si el cliente paga {c} de envío, usted pone {d}.",
    ejNota: "Antes de empezar probamos con su dirección y le decimos cuánto cuesta el viaje en su zona. Para pedidos chicos se puede poner un mínimo para envío (por ejemplo, $15).",

    q4: "¿Cuánta plata se queda usted?",
    ticket: "Su pedido promedio ($)", comision: "Lo que le cobra la app", pedidos: "Pedidos al mes por su página",
    porApp: "Hoy, por cada pedido en la app, se le van", porPagina: "En su página solo paga el cobro de la tarjeta (2,9 % + 30¢, lo cobra Stripe, no nosotros)",
    gana1: "Con", gana2: "pedidos al mes por su página, usted se queda con", gana3: "más al mes.",
    calcNota: "Sin contar el envío (vea arriba) ni nuestra mensualidad fija. No tiene que dejar las apps: sus clientes de siempre le piden directo y los nuevos llegan con los anuncios.",
    loEncontramos: "Hoy lo encontramos en",

    q5: "¿Qué más incluye?",
    p5: "No solo la página: también le traemos los clientes y le mostramos los resultados.",
    colAparte: "Si lo contrata aparte",
    stack: [
      ["Esta página, con su marca y su menú, en inglés y español", "$249–499 al mes"],
      ["Pantalla de pedidos en su cocina, que suena e imprime", "incluido"],
      ["El delivery como le convenga (las 3 formas de arriba)", "sin porcentaje"],
      ["12 publicaciones y 4 reels al mes en su Facebook e Instagram", "$500–2.000 al mes"],
      ["Anuncios en Facebook e Instagram que llevan a su página, manejados por nosotros", "$500 o más al mes"],
      ["Botón «Pedir» en su Google y un resumen cada semana: lo que gastó en anuncios y lo que vendió por su página", "incluido"],
    ],
    total: "Contratado por separado: más de $1.200 al mes, y nadie lo junta.",
    anuncios: "La publicidad se la paga usted directo a Facebook con su tarjeta, desde $10 al día. Nosotros la armamos y la manejamos.",

    q6: "¿Cuánto cuesta?",
    p6: "Los primeros 14 días, nada (vea arriba). Si decide seguir: una mensualidad fija, nunca un porcentaje de sus ventas. Mes a mes: si no le sirve, avisa con 30 días y listo. El precio exacto se lo damos por escrito en la videollamada, antes de empezar la prueba.",
    bonosT: "Plan Fundador: solo para los 5 primeros restaurantes",
    bonos: [["14 días de prueba con pedidos de verdad", "gratis"], ["Instalación y carga del menú", "gratis (vale $299)"], ["Volante con código QR para su mostrador y sus bolsas", "gratis"], ["Su precio de fundador no sube mientras siga con nosotros", ""]],
    cupos: "Son solo 5 porque los instalamos uno por uno, por videollamada.",

    q7: "Garantía",
    garT: "Y después de la prueba: si en sus primeros 60 días pagados no le llegan 50 pedidos por su página, el tercer mes no lo paga.",
    garC: "Para que valga, durante esos 60 días: (1) los anuncios están encendidos con al menos $10 al día, (2) nos manda fotos nuevas de sus platos cada semana y (3) el link de su página está en su Google y sus redes (se lo ponemos nosotros). Cada pedido queda registrado en su pantalla: no hay nada que discutir.",

    q8: "¿Qué tiene que hacer usted?",
    tareas: [
      "Una videollamada de 20 minutos para conectar la pantalla de su cocina y empezar la prueba.",
      "Abrir su cuenta de cobro con tarjeta a su nombre (Stripe). Es gratis y le ayudamos paso a paso.",
      "Mandarnos fotos de sus platos cada semana por WhatsApp, para las publicaciones y los anuncios.",
    ],
    prueba: "Un restaurante con el que trabajamos ya lleva más de 5.000 pedidos directos.",
    cta: "Quiero probarla 14 días gratis", cta2: "Prefiero que me llamen",
    pie: "Habla directo con David, el fundador, en español o en inglés.",
    msgActivar: "Hola David, vi la página de {n} y quiero probarla 14 días gratis",
    msgLlamar: "Hola, soy de {n}. Prefiero que me llamen. Mi número es: ",
    finT: "¿Le gusta cómo quedó?", finP: "Pruébela 14 días gratis, con pedidos de verdad. Vea cómo funciona, quién lleva los pedidos y cuánto se ahorra.", finBtn: "Ver cómo funciona",
  };

  const EN = {
    barra: "👀 Preview of the ordering page for", barraBtn: "For the owner: try it free for 14 days", pill: "💼 For the owner",
    kicker: "For the owner", cerrar: "Close",
    titulo: "This is your ordering page, already built.",
    intro: "We built it with your menu and photos so you can see it before you decide. This is how your customers would see it. It's still a preview: it doesn't take real orders. Look around like a customer: add dishes and open the order.",
    hola: "Hi",
    prT: "Try it free for 14 days, with real orders",
    prP: "We turn it on with you and put your link on Google, on your Instagram and in the ads you're already paying for. The orders and the money are yours from day one, straight to your Stripe account. If after 14 days you're not convinced, we switch it off and you pay nothing. No card needed to start.",
    prC: "For the trial to work: (1) you open your Stripe account (free, we help you), (2) we do a 20-minute video call to connect your kitchen and (3) you let us put the link in your ads and on your Google profile. Posts, reels and new ads start when you decide to stay. Only for the 5 founding restaurants.",
    q1: "What is it?",
    p1: "A page with your name and your menu where customers order straight from you. They pay by card and the money goes into your own Stripe account, in your name: we never touch it. It's not a delivery app: we charge nothing per order.",
    q2: "How does an order reach you?",
    pasos: [
      "The customer orders on this page and pays by card. Stripe (the card payment company) processes the payment and the money goes into your own Stripe account, in your name. We never touch it. Stripe deposits it in your bank, usually within 2 business days.",
      "The order rings on your kitchen screen (phone, tablet or computer) with everything: items, notes, address and \"paid\". If you have a receipt printer, the ticket prints.",
      "You accept it and set when it'll be ready.",
      "Your own driver delivers it, a DoorDash driver is booked automatically, or the customer picks it up (see below).",
    ],
    q3: "Who delivers the orders?",
    p3: "You choose. Use one way or mix them, for example your own driver by day and DoorDash on busy nights.",
    op1t: "If you have a driver",
    op1: "When the order is ready, you send your driver a link by WhatsApp. On their phone they see the address, the map, the customer's phone and how much to collect. Nothing to install. The customer watches them on the map.",
    op1c: "You set the delivery fee and how far you go. Cash on delivery is OK.",
    op2t: "If you don't have a driver",
    op2: "When the food is ready, a DoorDash driver (or Uber, depending on the area) is booked automatically. Nobody has to call anybody, and the customer tracks the order live.",
    op2c: "Each trip has a flat fee, roughly $8 to $10 up to 5 miles, charged to an account in your name. You decide how much of it the customer pays: all, part or none. Tips go 100% to the driver. In this case the customer pays by card.",
    op3t: "Pickup only",
    op3: "The customer pays on the page and picks up. No delivery cost. Works from day one.",
    ejT: "Example with an order of", ejApp: "Through the delivery app, the commission:", ejDd: "Through your page with a DoorDash driver:",
    ejDd2: "the trip costs {v}; if the customer pays a {c} delivery fee, you cover {d}.",
    ejNota: "Before you start we test it with your address and tell you what a trip costs in your area. For small orders you can set a delivery minimum (for example, $15).",
    q4: "How much money do you keep?",
    ticket: "Your average order ($)", comision: "What the app charges you", pedidos: "Orders a month through your page",
    porApp: "Today, on each app order, you lose", porPagina: "On your page you only pay the card fee (2.9% + 30¢, charged by Stripe, not by us)",
    gana1: "With", gana2: "orders a month through your page, you keep", gana3: "more each month.",
    calcNota: "Not counting delivery (see above) or our flat monthly fee. You don't have to leave the apps: your regulars order direct and ads bring new customers.",
    loEncontramos: "Today we found you on",
    q5: "What else is included?",
    p5: "Not just the page: we also bring you customers and show you the results.",
    colAparte: "If hired separately",
    stack: [
      ["This page, with your brand and menu, in English and Spanish", "$249–499/mo"],
      ["Kitchen order screen that rings and prints", "included"],
      ["Delivery your way (the 3 options above)", "no percentage"],
      ["12 posts and 4 reels a month on your Facebook and Instagram", "$500–2,000/mo"],
      ["Facebook & Instagram ads that drive to your page, run by us", "$500+/mo"],
      ["\"Order\" button on your Google profile and a weekly summary: what you spent on ads and what you sold through your page", "included"],
    ],
    total: "Bought separately: over $1,200 a month, and nobody ties it together.",
    anuncios: "You pay Facebook directly for the ads with your card, from $10 a day. We create and run them.",
    q6: "How much does it cost?",
    p6: "The first 14 days, nothing (see above). If you decide to stay: a flat monthly fee, never a percentage of your sales. Month to month: if it's not for you, give 30 days' notice. We give you the exact price in writing on the video call, before the trial starts.",
    bonosT: "Founder Plan: only for the first 5 restaurants",
    bonos: [["14-day trial with real orders", "free"], ["Setup and menu upload", "free ($299 value)"], ["QR flyer for your counter and bags", "free"], ["Your founder price never goes up while you stay", ""]],
    cupos: "Only 5, because we set each one up personally over video call.",
    q7: "Guarantee",
    garT: "And after the trial: if you don't get 50 orders through your page in your first 60 paid days, you don't pay for month three.",
    garC: "It applies when, during those 60 days: (1) ads run at $10/day or more, (2) you send us fresh photos of your dishes every week, and (3) your page link is on your Google profile and social media (we add it). Every order is recorded on your screen: nothing to argue about.",
    q8: "What do you need to do?",
    tareas: [
      "A 20-minute video call to connect your kitchen screen and start the trial.",
      "Open your card payment account in your name (Stripe). It's free and we help you step by step.",
      "Send us photos of your dishes every week by WhatsApp, for posts and ads.",
    ],
    prueba: "A restaurant we work with has passed 5,000 direct orders.",
    cta: "I want the 14-day free trial", cta2: "I'd rather get a call",
    pie: "You talk directly with David, the founder, in Spanish or English.",
    msgActivar: "Hi David, I saw the page for {n} and I want to try it free for 14 days",
    msgLlamar: "Hi, I'm with {n}. Please call me. My number is: ",
    finT: "Like how it looks?", finP: "Try it free for 14 days, with real orders. See how it works, who delivers the orders and how much you save.", finBtn: "See how it works",
  };

  const CSS = `
  #od-bar{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;background:#FFF4EF;color:#7A2310;
    border-bottom:1px solid #FAD3C4;font:600 13px/1.35 'Plus Jakarta Sans',system-ui,sans-serif;padding:9px 14px;text-align:center}
  #od-bar b{color:#1C1F26}
  #od-bar button{background:#E8431A;color:#fff;border:none;border-radius:999px;padding:7px 14px;font:800 12.5px system-ui,sans-serif;cursor:pointer;white-space:nowrap}
  #od-pill{position:fixed;right:14px;bottom:88px;z-index:35;background:#E8431A;color:#fff;border:none;border-radius:999px;
    padding:11px 16px;font:800 13px system-ui,sans-serif;box-shadow:0 10px 26px rgba(232,67,26,.38);cursor:pointer}
  #od-ov{position:fixed;inset:0;background:rgba(17,20,28,.45);z-index:75}
  #od-panel{position:fixed;left:0;right:0;bottom:0;z-index:80;max-height:90vh;overflow-y:auto;background:#fff;color:#1C1F26;
    border-radius:24px 24px 0 0;box-shadow:0 -12px 40px rgba(0,0,0,.25);font-family:'Plus Jakarta Sans',system-ui,sans-serif;
    transform:translateY(105%);transition:transform .28s ease}
  #od-panel.abierto{transform:none}
  #od-panel *{box-sizing:border-box}
  .od-in{padding:20px 20px 28px;max-width:560px;margin:0 auto}
  .od-x{position:sticky;top:0;display:flex;justify-content:flex-end;margin:-6px -6px 0 0;z-index:2}
  .od-x button{background:#F4F5F7;border:none;border-radius:999px;width:34px;height:34px;font-size:18px;cursor:pointer;color:#5b606b}
  .od-k{display:inline-block;font-size:11.5px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:#E8431A;background:#FFF1EC;border-radius:999px;padding:5px 10px}
  .od-h{font-size:22px;font-weight:800;letter-spacing:-.4px;line-height:1.18;margin:10px 0 8px}
  .od-p{font-size:14px;line-height:1.55;color:#4b5058;margin:0}
  .od-nota-precio{margin:10px 0 0;font-size:12.5px;line-height:1.45;color:#7A4A06;background:#FBF0DC;border-radius:10px;padding:8px 10px}
  .od-prueba{margin-top:16px;border:2px solid #E8431A;border-radius:16px;padding:14px 16px;background:#FFF8F5}
  .od-prueba b{display:block;font-size:16px;line-height:1.3;margin-bottom:6px;color:#1C1F26}
  .od-prueba p{font-size:13.5px;line-height:1.5;color:#4b5058;margin:0}
  .od-prueba small{display:block;font-size:12px;line-height:1.45;color:#7a7f88;margin-top:8px}
  .od-s{margin-top:22px;padding-top:18px;border-top:1px solid #EEEFF2}
  .od-s h3{font-size:16.5px;font-weight:800;margin:0 0 8px;letter-spacing:-.2px}
  .od-pasos{margin:4px 0 0;padding:0;list-style:none;display:grid;gap:10px;counter-reset:p}
  .od-pasos li{position:relative;padding-left:34px;font-size:14px;line-height:1.5;color:#4b5058}
  .od-pasos li::before{counter-increment:p;content:counter(p);position:absolute;left:0;top:0;width:24px;height:24px;border-radius:50%;background:#1C1F26;color:#fff;font-weight:800;font-size:12.5px;display:flex;align-items:center;justify-content:center}
  .od-ops{display:grid;gap:10px;margin-top:12px}
  .od-op{border:1px solid #E7E8EC;border-radius:14px;padding:12px 14px}
  .od-op b{display:block;font-size:14.5px;margin-bottom:4px}
  .od-op p{font-size:13.5px;line-height:1.5;color:#4b5058;margin:0}
  .od-op p+p{margin-top:6px;color:#1C1F26;font-weight:600}
  .od-op.sin{border:2px solid #E8431A}
  .od-ej{margin-top:12px;background:#F7F8FA;border-radius:14px;padding:12px 14px;font-size:13.5px;line-height:1.5}
  .od-ej b{display:block;margin-bottom:6px}
  .od-ej .f{display:flex;justify-content:space-between;gap:12px;padding:3px 0}
  .od-ej .f span:last-child{font-weight:800;white-space:nowrap}
  .od-ej .rojo,.od-fila .rojo{color:#B42318}
  .od-ej .verde{color:#15803D}
  .od-ej small{display:block;color:#6b7079;margin-top:6px}
  .od-in3{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px}
  .od-in3 label{font-size:12px;font-weight:700;color:#5b606b;display:flex;flex-direction:column;gap:5px}
  .od-in3 label.ancho{grid-column:1/-1}
  .od-in3 input,.od-in3 select{font:700 15px system-ui,sans-serif;border:1px solid #DADCE1;border-radius:11px;padding:10px 11px;width:100%;background:#fff;color:#1C1F26}
  .od-fila{display:flex;justify-content:space-between;gap:12px;font-size:13.5px;color:#4b5058;margin-top:10px;line-height:1.4}
  .od-fila b{color:#1C1F26;white-space:nowrap}
  .od-gana{margin-top:12px;background:#F0FAF3;border:1px solid #C9EBD3;border-radius:14px;padding:12px 14px;font-size:13.5px;color:#14532D;line-height:1.45}
  .od-gana strong{font-size:24px;font-weight:800;color:#15803D;letter-spacing:-.5px}
  .od-nota{font-size:12px;color:#7a7f88;line-height:1.45;margin:10px 0 0}
  .od-lista{list-style:none;margin:6px 0 0;padding:0}
  .od-lista li{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-top:1px solid #F1F2F4;font-size:13.5px;line-height:1.4}
  .od-lista li:first-child{border-top:none}
  .od-lista i{flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:#E8F7EE;color:#15803D;font-style:normal;font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}
  .od-lista span{flex:1}
  .od-lista em{font-style:normal;font-size:12px;font-weight:700;color:#7a7f88;text-align:right;max-width:38%}
  .od-col{display:flex;justify-content:flex-end;font-size:11px;font-weight:800;letter-spacing:.4px;text-transform:uppercase;color:#9aa0a8;margin-top:8px}
  .od-total{margin:8px 0 0;font-size:13.5px;font-weight:800;color:#1C1F26}
  .od-bono em{color:#E8431A !important}
  .od-gar{background:#1C1F26;color:#fff;border-radius:16px;padding:14px 16px;margin-top:6px}
  .od-gar b{display:block;font-size:15.5px;line-height:1.35;margin-bottom:6px}
  .od-gar p{font-size:12.5px;color:#C9CDD6;line-height:1.55;margin:0}
  .od-tareas{margin:6px 0 0;padding-left:20px;font-size:14px;line-height:1.5;color:#4b5058;display:grid;gap:6px}
  .od-cta{display:block;text-align:center;margin-top:18px;background:#E8431A;color:#fff !important;text-decoration:none;border-radius:14px;padding:15px;font-weight:800;font-size:16px;box-shadow:0 10px 24px rgba(232,67,26,.3)}
  .od-cta2{display:block;text-align:center;margin-top:10px;background:#fff;color:#1C1F26 !important;text-decoration:none;border:1.5px solid #DADCE1;border-radius:14px;padding:13px;font-weight:800;font-size:14.5px}
  .od-pie{font-size:12.5px;color:#7a7f88;text-align:center;line-height:1.45;margin:12px 0 0}
  .od-fin{margin:30px 18px 0;padding:22px;border-radius:20px;background:#FFF4EF;border:1px solid #FAD3C4;text-align:center;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
  @media (min-width:820px){.od-fin{max-width:1056px;margin:30px auto 0}}
  .od-fin h3{font-size:19px;font-weight:800;margin:0 0 6px;color:#1C1F26}
  .od-fin p{font-size:14px;color:#4b5058;margin:0 0 14px}
  .od-fin button{background:#E8431A;color:#fff;border:none;border-radius:12px;padding:13px 20px;font:800 15px system-ui,sans-serif;cursor:pointer}
  @media (min-width:1180px){
    body.od-pc{padding-right:420px !important}
    body.od-pc #od-panel{left:auto;top:0;bottom:0;right:0;width:420px;max-height:none;border-radius:0;transform:none;
      box-shadow:-10px 0 34px rgba(17,20,28,.10);border-left:1px solid #ECEDF0}
    body.od-pc #od-ov,body.od-pc #od-pill,body.od-pc .od-x{display:none !important}
    body.od-pc #cart-fab,body.od-pc #cart{left:calc(50% - 210px) !important}
  }`;

  function montar(fila, cfg, linkActivar) {
    const V = cfg.venta || {};
    const T = V.idioma === "en" ? EN : ES;
    const nombre = cfg.nombre || "";
    const pagina = location.origin + location.pathname + "?p=" + (fila.slug || "");
    const wa = (msg) => "https://wa.me/" + VENTAS_WA + "?text=" + encodeURIComponent(msg);
    const linkSi = wa(T.msgActivar.replace("{n}", nombre) + ": " + pagina);
    const linkLlamar = wa(T.msgLlamar.replace("{n}", nombre));
    const comisiones = [15, 20, 25, 30];
    const comDef = comisiones.includes(Number(V.comision)) ? Number(V.comision) : 25;
    const ticketDef = Number(V.ticket) > 0 ? Number(V.ticket) : 30;

    const st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    /* franja de arriba */
    const bar = document.createElement("div");
    bar.id = "od-bar";
    bar.innerHTML = `<span>${esc(T.barra)} <b>${esc(nombre)}</b></span><button type="button">${esc(T.barraBtn)} ▸</button>`;
    document.body.insertBefore(bar, document.body.firstChild);

    /* panel */
    const ov = document.createElement("div");
    ov.id = "od-ov"; ov.className = "oculto";
    const pn = document.createElement("aside");
    pn.id = "od-panel";
    pn.setAttribute("aria-label", T.kicker);
    pn.innerHTML = `
      <div class="od-in">
        <div class="od-x"><button type="button" aria-label="${esc(T.cerrar)}">✕</button></div>
        <span class="od-k">${esc(T.kicker)}</span>
        <h2 class="od-h">${V.contacto ? esc(T.hola + " " + V.contacto + ". ") : ""}${esc(T.titulo)}</h2>
        <p class="od-p">${esc(T.intro)}</p>
        ${V.nota ? `<p class="od-nota-precio">${esc(V.nota)}</p>` : ""}
        <div class="od-prueba"><b>🎁 ${esc(T.prT)}</b><p>${esc(T.prP)}</p><small>${esc(T.prC)}</small></div>

        <section class="od-s"><h3>1. ${esc(T.q1)}</h3><p class="od-p">${esc(T.p1)}</p></section>

        <section class="od-s"><h3>2. ${esc(T.q2)}</h3>
          <ol class="od-pasos">${T.pasos.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
        </section>

        <section class="od-s"><h3>3. ${esc(T.q3)}</h3>
          <p class="od-p">${esc(T.p3)}</p>
          <div class="od-ops">
            <div class="od-op"><b>🛵 ${esc(T.op1t)}</b><p>${esc(T.op1)}</p><p>${esc(T.op1c)}</p></div>
            <div class="od-op sin"><b>📦 ${esc(T.op2t)}</b><p>${esc(T.op2)}</p><p>${esc(T.op2c)}</p></div>
            <div class="od-op"><b>🏪 ${esc(T.op3t)}</b><p>${esc(T.op3)}</p></div>
          </div>
          <div class="od-ej" id="od-ej"></div>
        </section>

        <section class="od-s"><h3>4. ${esc(T.q4)}</h3>
          <div class="od-in3">
            <label>${esc(T.ticket)}<input id="od-ticket" type="number" min="5" max="300" step="1" inputmode="decimal" value="${ticketDef}"></label>
            <label>${esc(T.comision)}<select id="od-com">${comisiones.map((c) => `<option value="${c}"${c === comDef ? " selected" : ""}>${c} %</option>`).join("")}</select></label>
            <label class="ancho">${esc(T.pedidos)}<input id="od-ped" type="number" min="1" max="5000" step="10" inputmode="numeric" value="100"></label>
          </div>
          <div class="od-fila"><span>${esc(T.porApp)}</span><b class="rojo" id="od-app"></b></div>
          <div class="od-fila"><span>${esc(T.porPagina)}</span><b id="od-tarj"></b></div>
          <div class="od-gana">${esc(T.gana1)} <b id="od-n"></b> ${esc(T.gana2)} <strong id="od-gana"></strong> ${esc(T.gana3)}</div>
          ${Array.isArray(V.apps) && V.apps.length ? `<p class="od-nota"><b>${esc(T.loEncontramos)} ${esc(V.apps.join(", "))}.</b></p>` : ""}
          <p class="od-nota">${esc(T.calcNota)}</p>
        </section>

        <section class="od-s"><h3>5. ${esc(T.q5)}</h3>
          <p class="od-p">${esc(T.p5)}</p>
          <div class="od-col">${esc(T.colAparte)}</div>
          <ul class="od-lista">${T.stack.map(([a, b]) => `<li><i>✓</i><span>${esc(a)}</span><em>${esc(b)}</em></li>`).join("")}</ul>
          <p class="od-total">${esc(T.total)}</p>
          <p class="od-nota">${esc(T.anuncios)}</p>
        </section>

        <section class="od-s"><h3>6. ${esc(T.q6)}</h3>
          <p class="od-p">${esc(T.p6)}</p>
          <p class="od-p" style="margin-top:12px"><b>${esc(T.bonosT)}</b></p>
          <ul class="od-lista od-bono">${T.bonos.map(([a, b]) => `<li><i>+</i><span>${esc(a)}</span>${b ? `<em>${esc(b)}</em>` : ""}</li>`).join("")}</ul>
          <p class="od-nota">${esc(T.cupos)}</p>
        </section>

        <section class="od-s"><h3>7. ${esc(T.q7)}</h3>
          <div class="od-gar"><b>🛡️ ${esc(T.garT)}</b><p>${esc(T.garC)}</p></div>
        </section>

        <section class="od-s"><h3>8. ${esc(T.q8)}</h3>
          <ol class="od-tareas">${T.tareas.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
          <p class="od-nota">${esc(T.prueba)}</p>
        </section>

        <a class="od-cta" href="${linkSi}" target="_blank" rel="noopener">${esc(T.cta)}</a>
        <a class="od-cta2" href="${linkLlamar}" target="_blank" rel="noopener">📞 ${esc(T.cta2)}</a>
        <p class="od-pie">${esc(T.pie)}</p>
      </div>`;
    document.body.appendChild(ov);
    document.body.appendChild(pn);

    /* botón flotante (celular) */
    const pill = document.createElement("button");
    pill.id = "od-pill"; pill.type = "button"; pill.textContent = T.pill;
    document.body.appendChild(pill);

    /* llamada al final del menú */
    const app = document.getElementById("app");
    if (app) {
      const fin = document.createElement("section");
      fin.className = "od-fin";
      fin.innerHTML = `<h3>${esc(T.finT)}</h3><p>${esc(T.finP)}</p><button type="button">${esc(T.finBtn)}</button>`;
      app.appendChild(fin);
      fin.querySelector("button").addEventListener("click", () => abrir());
    }

    /* cuentas: ahorro y ejemplo del envío, con el pedido promedio de este local */
    const inT = pn.querySelector("#od-ticket"), inC = pn.querySelector("#od-com"), inN = pn.querySelector("#od-ped");
    const ej = pn.querySelector("#od-ej");
    function calcular() {
      const tk = Math.max(0, Number(inT.value) || 0), com = Number(inC.value) / 100, n = Math.max(0, Math.round(Number(inN.value) || 0));
      const app = tk * com, tarj = tk > 0 ? tk * 0.029 + 0.3 : 0;
      pn.querySelector("#od-app").textContent = usd(app);
      pn.querySelector("#od-tarj").textContent = usd(tarj);
      pn.querySelector("#od-n").textContent = n.toLocaleString("en-US");
      pn.querySelector("#od-gana").textContent = usd(Math.max(0, Math.round((app - tarj) * n)));
      const pone = Math.max(0, VIAJE - ENVIO_CLIENTE);
      ej.innerHTML = `<b>${esc(T.ejT)} ${usd(tk)}</b>
        <div class="f"><span>${esc(T.ejApp)}</span><span class="rojo">${usd(app)}</span></div>
        <div class="f"><span>${esc(T.ejDd)}</span><span class="verde">${usd(pone)}</span></div>
        <small>${esc(T.ejDd2.replace("{v}", usd(VIAJE)).replace("{c}", usd(ENVIO_CLIENTE)).replace("{d}", usd(pone)))}</small>
        <small>${esc(T.ejNota)}</small>`;
    }
    inT.addEventListener("input", calcular);
    inC.addEventListener("change", calcular);
    inN.addEventListener("input", calcular);
    calcular();

    /* abrir / cerrar */
    const pc = window.matchMedia("(min-width:1180px)");
    function abrir() {
      if (pc.matches) { pn.scrollTo({ top: 0, behavior: "smooth" }); return; }
      ov.classList.remove("oculto"); pn.classList.add("abierto");
    }
    function cerrar() { ov.classList.add("oculto"); pn.classList.remove("abierto"); }
    bar.querySelector("button").addEventListener("click", abrir);
    pill.addEventListener("click", abrir);
    ov.addEventListener("click", cerrar);
    pn.querySelector(".od-x button").addEventListener("click", cerrar);
    document.body.classList.add("od-pc");   // en PC (≥1180 px) el panel queda fijo a la derecha
    return { abrir, cerrar };
  }

  window.OFERTA_DUENO = { montar };
})();
