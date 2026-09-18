/* ============================================================
   RYO BURGER — movimiento (modelo B). Todo es progresivo: si algo falla,
   la app funciona igual (app.js no depende de este archivo).
   - El plato "vuela" del detalle al botón del carrito al agregarlo.
   - La foto del detalle hace parallax suave al desplazar la hoja.
   - El velo de las hojas entra con fundido.
   ============================================================ */
(function () {
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('animate' in Element.prototype)) return;

  // 1) vuelo al carrito
  window.addEventListener('ryo:agregado', (e) => {
    const d = e.detail || {}; const fab = document.getElementById('fab');
    if (!d.foto || !d.rect || !fab) return;
    const dest = fab.getBoundingClientRect();
    const img = document.createElement('img');
    img.src = d.foto; img.className = 'vuelo';
    const x0 = d.rect.left + d.rect.width / 2 - 32, y0 = Math.max(60, d.rect.top + d.rect.height / 2 - 32);
    const x1 = dest.left + 34, y1 = dest.top + dest.height / 2 - 32;
    img.style.left = x0 + 'px'; img.style.top = y0 + 'px';
    document.body.appendChild(img);
    const a = img.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1, offset: 0 },
      { transform: 'translate(' + ((x1 - x0) * 0.5) + 'px,' + ((y1 - y0) * 0.5 - 90) + 'px) scale(1.1)', opacity: 1, offset: 0.5 },
      { transform: 'translate(' + (x1 - x0) + 'px,' + (y1 - y0) + 'px) scale(.25)', opacity: .2, offset: 1 }
    ], { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
    a.onfinish = () => { img.remove(); fab.classList.remove('pop'); void fab.offsetWidth; fab.classList.add('pop'); };
  });

  // 2) parallax de la foto del producto + 3) fundido del velo
  window.addEventListener('ryo:hoja', (e) => {
    const hoja = e.detail && e.detail.hoja; if (!hoja) return;
    const velo = document.getElementById('velo');
    if (velo) velo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
    hoja.animate([{ transform: 'translate(-50%, 40px)', opacity: .6 }, { transform: 'translate(-50%, 0)', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
    const cuerpo = hoja.querySelector('.cuerpo-hoja'); const foto = hoja.querySelector('.prod-foto img');
    if (!cuerpo || !foto) return;
    let raf = 0;
    cuerpo.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; const s = cuerpo.scrollTop; foto.style.transform = 'translateY(' + Math.min(s * 0.35, 120) + 'px) scale(' + (1 + Math.min(s, 300) / 1500) + ')'; });
    }, { passive: true });
  });

  // 4) chips: el activo se centra solo en la barra
  const centrar = () => { const on = document.querySelector('.chip.on'); if (on && on.scrollIntoView) on.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); };
  const mo = new MutationObserver(centrar);
  const chips = document.getElementById('chips');
  if (chips) mo.observe(chips, { attributes: true, subtree: true, attributeFilter: ['class'] });
})();
