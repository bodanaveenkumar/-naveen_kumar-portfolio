function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}

function toggleUrlInput() {
  const area = document.getElementById('url-input-area');
  if (!area) return;
  area.style.display = area.style.display === 'block' ? 'none' : 'block';
}

function loadPhotos() {
  const textarea = document.getElementById('url-textarea');
  const text = textarea.value.trim();
  const urls = text.split('\n').map(u => u.trim()).filter(u => u.length > 0);
  if (!urls.length) return;
  const grid = document.getElementById('photo-grid');
  grid.innerHTML = '';
  urls.forEach((url, i) => {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.onclick = () => openLightbox(url);
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Photo ' + (i + 1);
    img.loading = 'lazy';
    img.onerror = function () {
      item.innerHTML = '<div class="photo-placeholder"><svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>Failed to load</div>';
    };
    item.appendChild(img);
    grid.appendChild(item);
  });
  try {
    localStorage.setItem('naveen-portfolio-photos', JSON.stringify(urls));
  } catch (e) { /* ignore storage errors */ }
  document.getElementById('url-input-area').style.display = 'none';
}

function openLightbox(url) {
  document.getElementById('lightbox-img').src = url;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox(e) {
  if (e.target.id === 'lightbox') document.getElementById('lightbox').classList.remove('open');
}

// Restore saved photos on page load (photos page only)
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  try {
    const saved = JSON.parse(localStorage.getItem('naveen-portfolio-photos') || 'null');
    if (saved && saved.length) {
      grid.innerHTML = '';
      saved.forEach((url, i) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.onclick = () => openLightbox(url);
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Photo ' + (i + 1);
        img.loading = 'lazy';
        item.appendChild(img);
        grid.appendChild(item);
      });
    }
  } catch (e) { /* ignore */ }
});
