import React from 'react';

// Red de seguridad: si algo en el árbol React lanza, mostramos una pantalla de
// recuperación (Reintentar / Cerrar sesión) en vez de quedar en blanco.
// NOTA: no atrapa crashes NATIVOS (ej. Firebase/Capacitor), solo errores JS.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            background: '#05080e',
            color: '#fff',
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981' }}>DEWAN</div>
          <div style={{ opacity: 0.85 }}>Ocurrió un error al cargar la app.</div>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 22px', borderRadius: 8, border: 'none', background: '#10b981', color: '#fff', fontWeight: 700 }}
          >
            Reintentar
          </button>
          <button
            onClick={() => {
              try { localStorage.removeItem('dewan_admin'); } catch (e) { /* noop */ }
              window.location.reload();
            }}
            style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #1f2937', background: 'transparent', color: '#fff' }}
          >
            Cerrar sesión
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
