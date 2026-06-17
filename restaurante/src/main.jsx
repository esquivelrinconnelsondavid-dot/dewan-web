import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';
import { MARCA } from './lib/config';
import { Capacitor } from '@capacitor/core';
import { KeepAwake } from '@capacitor-community/keep-awake';

// Branding por marca (Happy Pollo vs DEWAN). Se aplica ANTES del primer render
// para que el tema crema entre sin parpadeo. DEWAN no se ve afectado (default).
if (MARCA && MARCA.toLowerCase().includes('happy')) {
  document.documentElement.dataset.marca = 'hp';
  document.title = 'Happy Pollo · Cocina';
  const tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.setAttribute('content', '#AD1826');
}

if (Capacitor.isNativePlatform()) {
  KeepAwake.keepAwake().catch((err) => console.warn('[keep-awake] no se pudo activar:', err));
}

window.addEventListener('error', (e) => {
  console.error('[window.error]', e.error || e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[unhandledrejection]', e.reason);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
