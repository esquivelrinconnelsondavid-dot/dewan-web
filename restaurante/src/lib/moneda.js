import { ciudadActual } from './ciudades';

// Catálogo de monedas que un restaurante puede usar. En la frontera (San Cristóbal)
// conviven varias. `codigo` es lo que se guarda en restaurantes.moneda; `simbolo` y
// `decimales` definen el formato.
export const MONEDAS = {
  COP: { codigo: 'COP', simbolo: '$', decimales: 0, nombre: 'Peso colombiano' },
  USD: { codigo: 'USD', simbolo: '$', decimales: 2, nombre: 'Dólar (USD)' },
  EUR: { codigo: 'EUR', simbolo: '€', decimales: 2, nombre: 'Euro' },
  VES: { codigo: 'VES', simbolo: 'Bs', decimales: 2, nombre: 'Bolívar' },
};

export const MONEDAS_LISTA = Object.values(MONEDAS);

// Moneda del restaurante logueado (en memoria). Se setea al iniciar sesión desde
// restaurantes.moneda. Si el restaurante no tiene moneda, cae en la moneda por
// defecto de la ciudad (Riobamba → USD, San Cristóbal → COP).
let _moneda = null;

export function setMonedaRestaurante(codigo) {
  _moneda = codigo && MONEDAS[codigo] ? MONEDAS[codigo] : null;
}

export function monedaActual() {
  if (_moneda) return _moneda;
  const c = ciudadActual();
  return MONEDAS[c.moneda] || MONEDAS.USD;
}

export function codigoMonedaActual() {
  return monedaActual().codigo;
}

// Solo San Cristóbal (la frontera) maneja varias monedas. En Riobamba siempre es
// USD, así que el selector de moneda NO se muestra ahí.
export function permiteElegirMoneda() {
  return ciudadActual().id === 'sc';
}
