import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isNativeBuild = process.env.ELECTRON_BUILD === 'true' || process.env.CAPACITOR_BUILD === 'true';
// Build para hospedar la web (el EXE-cascarón la carga por URL). Sale a `web/` y
// se sirve en https://dewansas.com/restaurante/web/ (los archivos quedan 1:1 con
// la URL → el nginx actual los sirve sin tocar su config).
const isWebHost = process.env.WEB_HOST_BUILD === 'true';
// Build HP: mismo panel, marca Happy Pollo, tabla pedidos_hp. Sale a
// `../restaurante-hp/web/` (carpeta hermana en la raíz del repo) y se sirve en
// https://dewansas.com/restaurante-hp/web/ (también sin tocar nginx).
const isHpWeb = process.env.HP_WEB_BUILD === 'true';
// Build EL SISTEMA (locales vendidos): un solo build para todos (tabla pedidos_sistema,
// marca neutra, colores del local desde la BD). Sale a `../restaurante-sistema/web/` y se
// sirve en https://dewansas.com/restaurante-sistema/web/ (sin tocar nginx).
const isSistemaWeb = process.env.SISTEMA_WEB_BUILD === 'true';

export default defineConfig({
  plugins: [react()],
  // ⚠️ El default (dist/) es base RELATIVA './'. dist/ solo lo consume la app
  // NATIVA (Capacitor webDir) y Electron: con base absoluta '/restaurante/' el
  // APK carga index.html pero jamás encuentra el JS → PANTALLA NEGRA en cada
  // apertura (pasó con los AAB del 5-ago y 8-ago-2026: un `npm run build` a
  // secas antes de `cap sync`). Las webs hosteadas usan sus flags (build:web /
  // HP) con su base absoluta propia.
  base: isSistemaWeb
    ? '/restaurante-sistema/web/'
    : isHpWeb
    ? '/restaurante-hp/web/'
    : isWebHost
    ? '/restaurante/web/'
    : './',
  build: {
    outDir: isSistemaWeb ? '../restaurante-sistema/web' : isHpWeb ? '../restaurante-hp/web' : isWebHost ? 'web' : 'dist',
    emptyOutDir: true,
  },
  server: { host: true, port: 5174 },
});
