/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05080e',
        fondo: '#05080e',
        bg2: '#0b1120',
        bg3: '#111827',
        bg4: '#1e293b',
        borde: '#1f2937',
        tarjeta: '#0f1623',
        dewan: '#10b981',
        nuevo: '#ef4444',
        preparando: '#f59e0b',
        buscando: '#3b82f6',
        encamino: '#8b5cf6',
        alerta: '#dc2626',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        pulso: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239,68,68,0.55)' },
          '50%': { boxShadow: '0 0 0 8px rgba(239,68,68,0)' },
        },
      },
      animation: {
        pulso: 'pulso 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
