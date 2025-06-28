// 예시 데이터 (실제 데이터로 교체 가능)
const favorites = Array.from({length: 10}, (_, i) => ({
  title: `찜한 웹툰 ${i+1}`,
  rating: (9.5 + Math.random() * 0.5).toFixed(2), // 9.50~10.00
  views: Math.floor(100 + Math.random() * 1000) // 100~1100
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
        <span class="post-rating"><span class="star-icon">★</span> ${fav.rating}</span>
        <span class="post-views"><span class="view-icon">👁️</span> ${fav.views.toLocaleString()}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', renderFavorites); 