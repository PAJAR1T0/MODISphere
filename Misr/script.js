// Thumbnail click: change main image
document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    document.getElementById('main-image').src = thumb.src;
  });
});

// Images for cycle button
const angleImages = [
  '/public/imagenes/misr-angle--70.jpg',
  '/public/imagenes/misr-angle--60.jpg',
  '/public/imagenes/misr-angle--45.jpg',
  '/public/imagenes/misr-angle--26.jpg',
  '/public/imagenes/misr-angle-0.jpg',
  '/public/imagenes/misr-angle-26.jpg',
  '/public/imagenes/misr-angle-45.jpg',
  '/public/imagenes/misr-angle-60.jpg',
  '/public/imagenes/misr-angle-70.jpg'
];

let currentAngleIndex = 4;
const cycleBtn = document.getElementById('cycle-btn');

if (cycleBtn) {
  cycleBtn.addEventListener('click', () => {
    currentAngleIndex = (currentAngleIndex + 1) % angleImages.length;
    const newSrc = angleImages[currentAngleIndex];
    document.getElementById('main-image').src = newSrc;
    document.querySelectorAll('.thumb').forEach((t, i) => {
      t.classList.toggle('active', i === currentAngleIndex);
    });
  });
}

// Before/After slider
const range = document.getElementById('range');
const sliderContainer = document.getElementById('ab-slider');

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
