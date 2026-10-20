// [20-oct-2026] «Conectar Stripe» (SQL 052) — solo Panel EE.UU. (VITE_US=true).
// El dueño pega su llave RESTRINGIDA de Stripe en su Panel: la llave va directo a la tabla privada
// locales_us_integraciones (la usa n8n para cobrar) y nunca vuelve a salir de la base (solo los últimos 4).
// Las 3 funciones validan la sesión del Panel (código de 6 dígitos) igual que us_panel_pedidos.
// El cobro con tarjeta NO se prende desde aquí: lo prende DEWAN después de la prueba de $1.
import { supabase, consultarConTimeout } from './supabase';
import { STORAGE_TOKEN } from './auth';

function tokenPanel() {
  try { return localStorage.getItem(STORAGE_TOKEN) || ''; } catch { return ''; }
}

// Mensajes para el dueño, por código de error de la base (los mismos que da el SQL 052).
const MENSAJES = {
  llave_secreta_completa: 'Esa es la llave completa de su cuenta (empieza con sk_). No la comparta con nadie: en Stripe, toque «Roll key» para cambiarla y cree una llave restringida.',
  llave_publica: 'Esa es la llave pública (empieza con pk_). Necesitamos la llave restringida, que empieza con rk_live_.',
  llave_invalida: 'Eso no parece una llave restringida de Stripe. Empieza con rk_live_ y es larga: cópiela completa.',
  llave_de_prueba: 'Esa llave es de prueba (rk_test_). Use la llave real, que empieza con rk_live_.',
  espere: 'Espere unos segundos antes de cambiar la llave otra vez.',
  pedidos_tarjeta_abiertos: 'Hay pedidos pagados con tarjeta que todavía no terminan. Termínelos (o espere la devolución de los cancelados) y vuelva a intentar.',
  sesion_invalida: 'Su sesión del Panel venció. Vuelva a entrar con su código.',
};

export function mensajeErrorStripe(error) {
  const texto = String(error?.message || error || '');
  const clave = Object.keys(MENSAJES).find((k) => texto.includes(k));
  return clave ? MENSAJES[clave] : 'No se pudo guardar. Revise su conexión e intente de nuevo.';
}

// Revisión en el navegador antes de mandar (la base revisa lo mismo).
export function revisarLlave(llave) {
  const v = String(llave || '').trim();
  if (!v) return 'Pegue la llave restringida.';
  if (/^sk_/.test(v)) return MENSAJES.llave_secreta_completa;
  if (/^pk_/.test(v)) return MENSAJES.llave_publica;
  if (!/^rk_(live|test)_[A-Za-z0-9]{20,}$/.test(v)) return MENSAJES.llave_invalida;
  return null;
}

async function llamar(fn, args) {
  const { data, error } = await consultarConTimeout(supabase.rpc(fn, { p_token: tokenPanel(), ...args }));
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

export const estadoStripe = () => llamar('us_stripe_estado', {});
export const conectarStripe = (llave) => llamar('us_stripe_conectar', { p_llave: String(llave || '').trim() });
export const desconectarStripe = () => llamar('us_stripe_desconectar', {});
