// 예시 데이터 (실제 데이터로 교체 가능)
const comics = Array.from({length: 20}, (_, i) => ({
  title: `웹툰 ${i+1}`
}));

function renderComics() {
  const grid = document.querySelector('.comics-grid');
  if (!grid) return;
  grid.innerHTML = '';
  comics.forEach(comic => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="poster-box">포스터</div>
      <div class="post-title">${comic.title}</div>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', renderComics); 