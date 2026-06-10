import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isNativeBuild = process.env.ELECTRON_BUILD === 'true' || process.env.CAPACITOR_BUILD === 'true';
// Build para hospedar la web (el EXE-cascarón la carga por URL). Sale a `web/` y
// se sirve en https://dewansas.com/restaurante/web/ (los archivos quedan 1:1 con
// la URL → el nginx actual los sirve sin tocar su config).
const isWebHost = process.env.WEB_HOST_BUILD === 'true';

export default defineConfig({
  plugins: [react()],
  base: isNativeBuild ? './' : (isWebHost ? '/restaurante/web/' : '/restaurante/'),
  build: { outDir: isWebHost ? 'web' : 'dist' },
  server: { host: true, port: 5174 },
});
