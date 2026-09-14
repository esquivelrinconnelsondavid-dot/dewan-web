// Colores del LOCAL en runtime (SISTEMA): el panel se pinta con la ficha del local
// (restaurantes.panel_tema / panel_color) apenas inicia sesión, sin recompilar.
//   panel_tema  : 'claro' | 'oscuro' (default oscuro = paleta DEWAN)
//   panel_color : acento en hex (#AD1826) → reemplaza --c-dewan (botones, títulos, chips)
// En DEWAN y Happy Pollo no hace nada (solo actúa con MODO_SISTEMA).
import { MODO_SISTEMA } from './config';

function hexARgb(hex) {
  const h = String(hex || '').trim().replace('#', '');
  const m = /^([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(h);
  if (!m) return null;
  const x = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(x, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Sobre fondo claro un acento muy pálido no se lee: se oscurece un poco.
function ajustarParaClaro(rgb) {
  const lum = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  if (lum <= 0.62) return rgb;
  const f = 0.62 / lum;
  return rgb.map((c) => Math.round(c * f));
}

export function aplicarTemaLocal(restaurante) {
  if (!MODO_SISTEMA || typeof document === 'undefined') return;
  const root = document.documentElement;
  // 14-sep-2026: el tema por defecto de los locales del SISTEMA pasa a CLARO (como
  // las apps de socios grandes); 'oscuro' en la ficha del local conserva el oscuro.
  const tema = String(restaurante?.panel_tema || '').toLowerCase();
  if (tema === 'oscuro') delete root.dataset.marca;
  else root.dataset.marca = 'claro';
  let rgb = hexARgb(restaurante?.panel_color);
  if (rgb && tema === 'claro') rgb = ajustarParaClaro(rgb);
  if (rgb) root.style.setProperty('--c-dewan', rgb.join(' '));
  else root.style.removeProperty('--c-dewan');
  try {
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute('content', rgb ? '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('') : (tema === 'claro' ? '#f4f5f7' : '#0D0D0D'));
  } catch (e) { /* sin meta */ }
}
