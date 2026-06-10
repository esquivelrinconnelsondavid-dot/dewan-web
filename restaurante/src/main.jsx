import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';
import { Capacitor } from '@capacitor/core';
import { KeepAwake } from '@capacitor-community/keep-awake';

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
