// Catálogo de ciudades/backends de DEWAN.
//
// Una sola app (la misma de Google Play / la misma web) sirve a las dos ciudades:
// el usuario elige al abrir y la elección se guarda en localStorage. El cliente
// Supabase (lib/supabase.js) se crea apuntando a la ciudad elegida; al CAMBIAR de
// ciudad recargamos la página para reconstruirlo contra el backend nuevo.
//
// Las anon keys son PÚBLICAS por diseño (van igual embebidas en el bundle), así
// que tenerlas acá es seguro. NUNCA poner la service_role.
// Este archivo se genera con _gen_ciudades.py (claves copiadas verbatim del .env
// de Riobamba y de patch_sc.py para San Cristóbal).

const LS_KEY = 'dewan_ciudad';

export const CIUDADES = {
  ri: {
    id: 'ri',
    nombre: 'Riobamba',
    pais: 'Ecuador',
    bandera: '🇪🇨',
    moneda: 'USD',
    simbolo: '$',
    url: 'https://wfpdtjmmrhhfuxayvpzu.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcGR0am1tcmhoZnV4YXl2cHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzE1NDksImV4cCI6MjA4ODY0NzU0OX0.Iyeogfs5AIiVrM5agXuMZsgFrud460OYvn0zkYgJH0s',
  },
  sc: {
    id: 'sc',
    nombre: 'San Cristóbal',
    pais: 'Venezuela',
    bandera: '🇻🇪',
    moneda: 'VES',
    simbolo: 'Bs',
    url: 'https://emmfmcajgskgdtbazbyu.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbWZtY2FqZ3NrZ2R0YmF6Ynl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDY1NzAsImV4cCI6MjA5MTg4MjU3MH0.jXArI6rxthXWNLHDUeTnopqC3DLt5e00NKj1cYSkhhk',
  },
};

export const CIUDAD_DEFECTO = 'ri';

// Happy Pollo es una marca de una sola ciudad (usa el backend de Riobamba). El
// selector de ciudad es exclusivo de DEWAN; en HP nunca se muestra.
export const MULTI_CIUDAD = String(import.meta.env.VITE_MODO_HP) !== 'true';

// ¿Hay una sesión de restaurante previa? (instalaciones de Riobamba anteriores al
// selector). Para no interrumpirlas, se tratan como Riobamba de forma silenciosa.
function haySesionPrevia() {
  try {
    return !!(
      localStorage.getItem('dewan_rest_token') ||
      localStorage.getItem('dewan_rest_data')
    );
  } catch {
    return false;
  }
}

// Id de la ciudad elegida, o null si el usuario nunca eligió y no hay sesión previa
// (→ App muestra el selector). En Happy Pollo siempre devuelve la ciudad por defecto.
export function ciudadActualId() {
  if (!MULTI_CIUDAD) return CIUDAD_DEFECTO;
  try {
    const guardada = localStorage.getItem(LS_KEY);
    if (guardada && CIUDADES[guardada]) return guardada;
  } catch {
    // ignorar (modo privado, etc.)
  }
  // Back-compat: restaurante de Riobamba ya logueado antes del selector -> RI silencioso.
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

// Ciudad activa (objeto). Nunca es null: si aún no eligió, cae en la por defecto
// para que el cliente Supabase siempre tenga a dónde apuntar.
export function ciudadActual() {
  return CIUDADES[ciudadActualId() || CIUDAD_DEFECTO];
}

// Guarda la ciudad elegida. Devuelve true si era válida. El llamador decide si
// recargar la página (necesario cuando cambia de una ciudad a otra).
export function elegirCiudad(id) {
  if (!CIUDADES[id]) return false;
  try {
    localStorage.setItem(LS_KEY, id);
  } catch {
    // ignorar
  }
  return true;
}
