/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05080e',
        bg2: '#0b1120',
        bg3: '#111827',
        tarjeta: '#0f1623',
        borde: '#1f2937',
        dewan: '#10b981',      // verde DEWAN (acciones / ok)
        nuevo: '#ef4444',      // rojo (pedido nuevo / error)
        preparando: '#f59e0b', // ámbar (en preparación)
        buscando: '#3b82f6',   // azul (buscando moto / links)
        encamino: '#8b5cf6',   // violeta (moto asignada / en camino)
        alerta: '#dc2626',     // rojo fuerte (alertas)
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'ping-strong': 'ping-strong 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'ping-strong': {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
