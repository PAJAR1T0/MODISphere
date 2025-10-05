// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Base path for local images (relative to /Aster/aster.html)
const IMG_BASE = '/public/imagenes/';

// Scenes for the before/after viewer
const scenes = [
  { title: 'Salt Lake',     before: IMG_BASE + '1-1.png', after: IMG_BASE + '1-2.jpg' },
  { title: 'Paraná River',  before: IMG_BASE + '2-1.png', after: IMG_BASE + '2-2.png' },
  { title: 'Colorado River',before: IMG_BASE + '3-1.png', after: IMG_BASE + '3-2.png' }
];

// DOM refs (IDs aligned with HTML)
const imgBefore = document.getElementById('img-before');
const imgAfter  = document.getElementById('img-after');
const divider   = document.getElementById('divider');
const slider    = document.getElementById('slider');
const thumbs    = document.getElementById('thumbnails');

let current = 0;

function show(i){
  current = i;
  const s = scenes[i];
  imgBefore.src = s.before;
  imgAfter.src  = s.after;
  [...thumbs.children].forEach((b,idx)=> b.classList.toggle('active', idx===i));
}

// Build thumbnails
scenes.forEach((s,i)=>{
  const btn = document.createElement('button');
  const im  = document.createElement('img');
  im.src = s.before;
  im.alt = s.title;
  btn.appendChild(im);
  btn.addEventListener('click', ()=> show(i));
  thumbs.appendChild(btn);
});

// Slider interaction
slider.addEventListener('input', e=>{
  const v = parseInt(e.target.value,10);
  imgAfter.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
  divider.style.left = `${v}%`;
});

// Init
show(0);
slider.dispatchEvent(new Event('input'));
