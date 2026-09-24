// Locales con VARIAS sucursales y una sola cuenta (Super Happy: Avenida / Norte).
// Cada PC elige en Ajustes qué sucursal atiende; el panel muestra (y hace sonar) solo
// esos pedidos. Se guarda por PC. Vacío = todas. Solo aplica al panel del SISTEMA.
import { MODO_SISTEMA } from './config';

const CLAVE = 'panel_sucursal';

export function getSucursalPanel() {
  try { return localStorage.getItem(CLAVE) || ''; } catch { return ''; }
}

export function setSucursalPanel(valor) {
  try {
    if (valor) localStorage.setItem(CLAVE, valor);
    else localStorage.removeItem(CLAVE);
  } catch { /* sin almacenamiento: queda en "todas" */ }
}

const normalizar = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// Un pedido sin sucursal sale en TODOS los paneles: mejor verlo dos veces que perderlo.
export function esDeMiSucursal(pedido) {
  if (!MODO_SISTEMA) return true;
  const mia = normalizar(getSucursalPanel());
  if (!mia) return true;
  const suya = normalizar(pedido?.sucursal_nombre);
  if (!suya) return true;
  return suya === mia;
}
