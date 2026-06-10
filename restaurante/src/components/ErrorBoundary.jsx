import React from 'react';

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
      const msg = this.state.error?.message || String(this.state.error);
      const stack = this.state.error?.stack || '';
      return (
        <div style={{
          padding: 16, color: '#ff5252', background: '#0d0d0d',
          fontFamily: 'monospace', fontSize: 12, minHeight: '100vh',
          whiteSpace: 'pre-wrap', overflow: 'auto',
        }}>
          <h2 style={{ color: '#ff5252', marginBottom: 12 }}>Error en la app</h2>
          <p style={{ color: '#fff', marginBottom: 12 }}>{msg}</p>
          <details>
            <summary style={{ cursor: 'pointer', color: '#888' }}>Stack</summary>
            <pre style={{ marginTop: 8, fontSize: 10 }}>{stack}</pre>
          </details>
          <button
            onClick={() => {
              try { localStorage.clear(); } catch {}
              location.reload();
            }}
            style={{
              marginTop: 16, padding: '10px 16px', background: '#0BFE9F',
              color: '#000', fontWeight: 'bold', border: 0, borderRadius: 8,
            }}
          >
            Limpiar y reiniciar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
