// Iconos dibujados (SVG de trazo, 24px), como usan las apps de socios grandes:
// escalan, toman el color del texto y no dependen de la fuente de emojis de cada PC.
const base = (size) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true });

export const IcoCheck = ({ size = 18, grueso = 2.6 }) => (
  <svg {...base(size)} strokeWidth={grueso}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const IcoImpresora = ({ size = 18 }) => (
  <svg {...base(size)}><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v7H6z" /></svg>
);
export const IcoTelefono = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const IcoPin = ({ size = 14 }) => (
  <svg {...base(size)}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const IcoNota = ({ size = 14 }) => (
  <svg {...base(size)}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
);
export const IcoMoto = ({ size = 20 }) => (
  <svg {...base(size)}><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M6 17h6l3-7h3l2 3M9 10h4" /></svg>
);
export const IcoReloj = ({ size = 14 }) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IcoAjustes = ({ size = 18 }) => (
  <svg {...base(size)}><path d="M4 7h10M18 7h2M4 12h3M11 12h9M4 17h12M20 17h0" /><circle cx="15.5" cy="7" r="2" /><circle cx="8.5" cy="12" r="2" /><circle cx="17.5" cy="17" r="2" /></svg>
);
export const IcoSonido = ({ size = 18 }) => (
  <svg {...base(size)}><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>
);
export const IcoChevron = ({ size = 14 }) => (
  <svg {...base(size)} strokeWidth={2.4}><path d="M6 9l6 6 6-6" /></svg>
);
export const IcoAlerta = ({ size = 14 }) => (
  <svg {...base(size)} strokeWidth={2.2}><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h0" /></svg>
);
export const IcoTienda = ({ size = 14 }) => (
  <svg {...base(size)}><path d="M3 9l1.5-5h15L21 9v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9z" /><path d="M5 13v8h14v-8" /></svg>
);
export const IcoCerrar = ({ size = 18 }) => (
  <svg {...base(size)} strokeWidth={2.2}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
