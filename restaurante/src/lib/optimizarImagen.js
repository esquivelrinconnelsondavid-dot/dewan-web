// Resize + recomprime imágenes en cliente antes de subir a Storage.
// Funciona en Capacitor WebView y Electron (Canvas + Blob API).
// Salida: WebP 85% calidad, máximo 800px lado mayor, ~150-400KB.

const MAX_LADO = 800;
const CALIDAD_WEBP = 0.85;

function leerComoDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.readAsDataURL(file);
  });
}

function cargarImagen(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('No se pudo cargar la imagen'));
    img.src = src;
  });
}

function canvasABlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

/**
 * Optimiza una imagen: la redimensiona al lado mayor MAX_LADO y la convierte a WebP.
 * @param {File} file
 * @returns {Promise<Blob>}
 */
export async function optimizarImagen(file) {
  if (!file) throw new Error('Sin archivo');
  if (!file.type.startsWith('image/')) throw new Error('El archivo no es una imagen');

  const dataUrl = await leerComoDataUrl(file);
  const img = await cargarImagen(dataUrl);

  // Calcular dimensiones manteniendo aspect ratio
  let { width: w, height: h } = img;
  if (w > MAX_LADO || h > MAX_LADO) {
    const factor = MAX_LADO / Math.max(w, h);
    w = Math.round(w * factor);
    h = Math.round(h * factor);
  }

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, w, h);

  // Intentar WebP, si no fallback a JPEG
  let blob = await canvasABlob(canvas, 'image/webp', CALIDAD_WEBP);
  let ext = 'webp';
  if (!blob || blob.size === 0) {
    blob = await canvasABlob(canvas, 'image/jpeg', CALIDAD_WEBP);
    ext = 'jpg';
  }
  if (!blob) throw new Error('No se pudo optimizar la imagen');

  // Adjuntar extensión al blob como property (no oficial, para uso interno)
  blob.__ext = ext;
  return blob;
}
