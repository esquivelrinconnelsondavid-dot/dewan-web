// Qué pedidos hacen sonar la app y cuándo se callan.
//
// [28-sep-2026] David: "debe sonar TODOS los pedidos; los de Super Happy no suenan y las
// operadoras ni se enteran". Los pedidos del SISTEMA (Super Happy, Bogati…: el local los
// acepta en su Panel y n8n crea aquí el gemelo 'sistema:…') y las carreras que los locales
// piden por el bot ('carrera:…') NACEN ya atendidos: 'preparando' o 'confirmado', con
// operadora_atendido=true. La alarma de siempre se callaba en cuanto veía eso, así que
// sonaban un pitido o nada.
//
// Dos alarmas de "pedido nuevo":
//   'nuevo'       → espera que alguien lo confirme (el local o la operadora con el tiempo).
//                   Se calla cuando lo confirman, en TODOS los teléfonos (lo dice la BD).
//   'nuevo_listo' → ya viene confirmado y solo le falta la moto. Suena hasta que una moto
//                   lo toma, se entrega o cancela, o la operadora toca "Enterado".

export const TERMINALES = new Set(['entregado', 'cancelado']);
const ESTADOS_SIN_MOTO = new Set(['pendiente', 'pendiente_restaurante', 'preparando', 'confirmado']);

// Un pedido que la app ve por PRIMERA vez (al abrirla o al volver de WhatsApp con el
// socket caído) suena si se creó hace menos de esto. Solo suena mientras nadie se haya
// hecho cargo, así que no revive nada resuelto.
export const MS_VENTANA_NUEVO = 15 * 60 * 1000;

export function esperaConfirmacion(p) {
  return p?.estado_pedido === 'pendiente_restaurante' && !p.restaurante_aceptado && !p.restaurante_rechazado;
}

// ¿Nació ya aceptado (nunca esperó confirmación)? Medido en 30 días de pedidos reales:
// los gemelos del sistema traen operadora_atendido_at / restaurante_aceptado_at ANTES de
// su creación (-134 s a -0,2 s: n8n los pone antes de insertar); cuando la operadora o el
// local por su app lo confirman, esas marcas quedan DESPUÉS (+3 s como mínimo). Las
// carreras de los locales nacen 'confirmado' sin ninguna marca.
const TOLERANCIA_MARCA_MS = 2000;
export function nacioAceptado(p) {
  const creado = new Date(p?.fecha_creacion || p?.created_at || 0).getTime();
  if (!creado) return false;
  const tarde = (marca) => !!marca && new Date(marca).getTime() > creado + TOLERANCIA_MARCA_MS;
  return !tarde(p.operadora_atendido_at) && !tarde(p.restaurante_aceptado_at);
}

// Alarma para un pedido que la app ve por primera vez (null = no suena).
export function alarmaAlVer(p) {
  if (!p || TERMINALES.has(p.estado_pedido)) return null;
  if (p.motorizado_id) return null;          // ya tiene moto: no queda nada por hacer
  if (p.restaurante_rechazado) return null;  // de eso avisa la sirena de rechazo
  if (esperaConfirmacion(p)) return 'nuevo';
  // Ya confirmado y sin moto: suena si NACIÓ así (Super Happy, carreras…). Si alguien lo
  // confirmó después (otra operadora le puso el tiempo, el local lo aceptó en su app), ya
  // hubo quien se hiciera cargo: no vuelve a sonar al abrir la app en otro teléfono.
  if (ESTADOS_SIN_MOTO.has(p.estado_pedido) && nacioAceptado(p)) return 'nuevo_listo';
  return null;
}

export function esReciente(p, ahora = Date.now()) {
  const t = p?.fecha_creacion ? new Date(p.fecha_creacion).getTime() : 0;
  return t > 0 && ahora - t < MS_VENTANA_NUEVO;
}

// ¿La alarma viva de este tipo ya se puede callar con el estado actual del pedido?
export function debeCallarse(tipo, p) {
  if (!p) return false;
  if (tipo === 'nuevo_listo') return TERMINALES.has(p.estado_pedido) || !!p.motorizado_id;
  // 'nuevo' / 'no_acepta' / 'rechazo': la regla de siempre — en cuanto la operadora lo
  // atiende o el pedido sale de 'pendiente_restaurante'.
  return !!p.operadora_atendido || (!!p.estado_pedido && p.estado_pedido !== 'pendiente_restaurante');
}

function hora(fecha) {
  return new Date(fecha).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
}

// Texto corto de por qué suena (Torre de control, tarjeta y notificación).
export function motivoNuevo(p, tipo, ahora = Date.now()) {
  if (tipo === 'nuevo') return 'falta confirmarlo';
  if (String(p?.conversation_id || '').startsWith('carrera:')) {
    return 'carrera que pidió el local — ya se ofertó a los motos';
  }
  if (p?.estado_pedido === 'preparando') {
    const t = p.timer_lanzamiento ? new Date(p.timer_lanzamiento).getTime() : 0;
    return t > ahora
      ? `ya lo aceptó el local — sale a los motos a las ${hora(t)}`
      : 'ya lo aceptó el local — saliendo a los motos';
  }
  if (p?.estado_pedido === 'confirmado') return 'ya lo aceptó el local — buscando moto';
  return 'falta moto';
}
