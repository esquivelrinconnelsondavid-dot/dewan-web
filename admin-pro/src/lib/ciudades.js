// Multi-ciudad: una sola app para Riobamba (EC) y San Cristóbal (VE).
// Cada ciudad tiene su propio proyecto Supabase; la elegida se guarda en
// localStorage y App recarga la página al cambiar (reconstruye el cliente).

const LS_KEY = 'dewan_ciudad';

export const CIUDADES = {
  ri: {
    id: 'ri',
    nombre: 'Riobamba',
    pais: 'Ecuador',
    bandera: '🇪🇨',
    moneda: 'USD',
    simbolo: '$',
    decimales: 2,
    url: 'https://wfpdtjmmrhhfuxayvpzu.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcGR0am1tcmhoZnV4YXl2cHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzE1NDksImV4cCI6MjA4ODY0NzU0OX0.Iyeogfs5AIiVrM5agXuMZsgFrud460OYvn0zkYgJH0s',
  },
  sc: {
    id: 'sc',
    nombre: 'San Cristóbal',
    pais: 'Venezuela',
    bandera: '🇻🇪',
    moneda: 'COP',
    simbolo: '$',
    decimales: 0,
    url: 'https://emmfmcajgskgdtbazbyu.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbWZtY2FqZ3NrZ2R0YmF6Ynl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDY1NzAsImV4cCI6MjA5MTg4MjU3MH0.jXArI6rxthXWNLHDUeTnopqC3DLt5e00NKj1cYSkhhk',
  },
};

const CIUDAD_DEFAULT = 'ri';

export const MULTI_CIUDAD = Object.keys(CIUDADES).length > 1;

// Sesión admin previa (usuarios de antes del multi-ciudad): asumir Riobamba
// para no obligarlos a re-elegir ciudad ni re-loguearse.
function teniaSesion() {
  try {
    return !!localStorage.getItem('dewan_admin');
  } catch {
    return false;
  }
}

export function ciudadActualId() {
  try {
    const id = localStorage.getItem(LS_KEY);
    if (id && CIUDADES[id]) return id;
  } catch { /* ignorar */ }
  if (teniaSesion()) {
    try { localStorage.setItem(LS_KEY, CIUDAD_DEFAULT); } catch { /* ignorar */ }
    return CIUDAD_DEFAULT;
  }
  return null;
}

export function ciudadActual() {
  return CIUDADES[ciudadActualId() || CIUDAD_DEFAULT];
}

export function elegirCiudad(id) {
  if (!CIUDADES[id]) return false;
  try { localStorage.setItem(LS_KEY, id); } catch { /* ignorar */ }
  return true;
}
