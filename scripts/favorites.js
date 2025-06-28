// 예시 데이터 (실제 데이터로 교체 가능)
const favorites = Array.from({length: 10}, (_, i) => ({
  title: `찜한 웹툰 ${i+1}`,
  rating: (Math.random() * 4 + 6).toFixed(2),
  views: (Math.floor(Math.random() * 10000) + 1000).toLocaleString()
}));

function renderFavorites() {
  const grid = document.querySelector('.favorites-grid');
  if (!grid) return;
  grid.innerHTML = '';
  favorites.forEach(fav => {
    const card = document.createElement('div');
    card.className = 'post-card favorites-post-card';
    card.innerHTML = `
      <div class="poster-box">포스터</div>
      <div class="post-title favorites-post-title">${fav.title}</div>
      <div class="post-meta">
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="rating">★</span>${fav.rating}
        </span>
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="views">👁️</span>${fav.views}
        </span>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', renderFavorites); 