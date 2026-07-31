const photos = Array.isArray(window.KX45_GALLERY) ? window.KX45_GALLERY : [];
const grid = document.getElementById('gallery-grid');
const count = document.getElementById('photo-count');
const dialog = document.getElementById('gallery-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
let currentIndex = 0;

function renderGallery() {
  count.textContent = photos.length;
  grid.innerHTML = photos.map((photo, index) => `
    <button class="gallery-item" type="button" data-index="${index}" aria-label="Open photo ${index + 1} of ${photos.length}">
      <img src="${photo.src}" alt="${photo.alt}" loading="lazy" decoding="async">
      <span>${photo.era || 'KX Legacy'}</span>
    </button>`).join('');
}

function showPhoto(index) {
  currentIndex = (index + photos.length) % photos.length;
  const photo = photos[currentIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = `${photo.era || 'KX Legacy'} • ${currentIndex + 1} of ${photos.length}`;
  if (!dialog.open) dialog.showModal();
}

renderGallery();
grid.addEventListener('click', event => {
  const item = event.target.closest('.gallery-item');
  if (item) showPhoto(Number(item.dataset.index));
});
document.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentIndex - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentIndex + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.addEventListener('keydown', event => {
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
  if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
});

document.getElementById('view-toggle').addEventListener('click', event => {
  const compact = grid.classList.toggle('compact');
  event.currentTarget.setAttribute('aria-pressed', String(compact));
  event.currentTarget.textContent = compact ? 'Editorial View' : 'Compact View';
});

const menu = document.getElementById('main-nav');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
