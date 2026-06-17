/** @type {import('tailwindcss').Config} */
// Los colores apuntan a variables CSS (definidas en styles/index.css). Así una sola
// base de código sirve para DEWAN (default) y Happy Pollo (data-marca="hp") sin
// duplicar componentes: cambian los valores de las variables, no las clases.
const c = (v) => `rgb(var(--c-${v}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: c('fondo'),
        fondo: c('fondo'),
        bg2: c('bg2'),
        bg3: c('bg3'),
        bg4: c('bg4'),
        borde: c('borde'),
        tarjeta: c('tarjeta'),
        dewan: c('dewan'),
        nuevo: c('nuevo'),
        preparando: c('preparando'),
        buscando: c('buscando'),
        encamino: c('encamino'),
        alerta: c('alerta'),
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Yeseva One', 'Georgia', 'serif'],
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
