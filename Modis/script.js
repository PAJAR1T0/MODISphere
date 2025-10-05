// Activate band thumbnails
document.querySelectorAll('.band-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.band-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const target = thumb.getAttribute('data-src');
    const img = document.getElementById('main-spectral');
    if (img && target) img.src = target;
  });
});

// Cycle through bands with the CTA
const bandThumbs = Array.from(document.querySelectorAll('.band-thumb'));
let index = 0;

const cta = document.querySelector('.cta-button');
if (cta && bandThumbs.length) {
  cta.addEventListener('click', (e) => {
    e.preventDefault();
    bandThumbs.forEach(t => t.classList.remove('active'));
    bandThumbs[index].classList.add('active');
    const src = bandThumbs[index].getAttribute('data-src');
    const img = document.getElementById('main-spectral');
    if (img && src) img.src = src;
    index = (index + 1) % bandThumbs.length;
  });
}

// Optional: before/after slider (only if #range exists)
const range = document.getElementById('range');
const sliderContainer = document.getElementById('modis-slider');

if (range && sliderContainer) {
  const setPos = v => sliderContainer.style.setProperty('--pos', `${v}%`);
  range.addEventListener('input', e => setPos(e.target.value));
  sliderContainer.addEventListener('mousemove', e => {
    if (e.buttons) {
      const rect = sliderContainer.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, pct)));
    }
  });
}
