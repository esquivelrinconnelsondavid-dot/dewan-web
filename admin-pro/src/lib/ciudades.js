// Catálogo de ciudades/backends de DEWAN (panel Admin).
//
// El mismo panel sirve a las dos ciudades: se elige al abrir y el cliente Supabase
// se construye contra ese backend; al CAMBIAR de ciudad se recarga la página.
// Las anon keys son PÚBLICAS (van igual en el bundle). NUNCA la service_role.
// Generado con _gen_ciudades_admin.py (claves verbatim).

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

export const CIUDAD_DEFECTO = 'ri';
export const MULTI_CIUDAD = true;

// Back-compat: admin ya logueado antes del selector → RI silencioso, sin selector.
function haySesionPrevia() {
  try {
    return !!localStorage.getItem('dewan_admin');
  } catch {
    return false;
  }
}

export function ciudadActualId() {
  try {
    const guardada = localStorage.getItem(LS_KEY);
    if (guardada && CIUDADES[guardada]) return guardada;
  } catch {
    // ignorar
  }
  if (haySesionPrevia()) {
    try {
      localStorage.setItem(LS_KEY, CIUDAD_DEFECTO);
    } catch {
      // ignorar
    }
    return CIUDAD_DEFECTO;
  }
  return null;
}

export function ciudadActual() {
  return CIUDADES[ciudadActualId() || CIUDAD_DEFECTO];
}

export function elegirCiudad(id) {
  if (!CIUDADES[id]) return false;
  try {
    localStorage.setItem(LS_KEY, id);
  } catch {
    // ignorar
  }
  return true;
}
