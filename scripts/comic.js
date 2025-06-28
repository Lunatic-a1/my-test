// 예시 데이터 (실제 데이터로 교체 가능)
const comics = Array.from({length: 20}, (_, i) => ({
  title: `웹툰 ${i+1}`,
  rating: (Math.random() * 4 + 6).toFixed(2),
  views: (Math.floor(Math.random() * 10000) + 1000).toLocaleString()
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
      <div class="post-meta">
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="rating">★</span>${comic.rating}
        </span>
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="views">👁️</span>${comic.views}
        </span>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', renderComics);

// 서브네비 메뉴 활성화 토글
window.addEventListener('DOMContentLoaded', () => {
  const subnav = document.querySelector('.comic-subnav-list');
  if (subnav) {
    subnav.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        subnav.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        e.target.classList.add('active');
      }
    });
  }
});

const genres = [
  '로맨스', '판타지', '액션', '일상', '스릴러', '개그', '무협/사극', '드라마', '감성', '스포츠',
  '연도별웹툰', '브랜드웹툰', '드라마&영화 원작웹툰', '먼치킨',
  '학원로맨스', '로판', '게임판타지', '사이다', '프리퀄', '후회남',
  '슈퍼스트링', '고자극스릴러', '후회물', '격투기', '캠퍼스', '구원서사', '인플루언서', '환생'
];

function renderGenreList(activeIdx = 0) {
  const container = document.getElementById('genre-list-container');
  if (!container) return;
  container.innerHTML = '';
  genres.forEach((genre, idx) => {
    const tag = document.createElement('span');
    tag.className = 'genre-tag' + (idx === activeIdx ? ' active' : '');
    tag.textContent = `#${genre}`;
    tag.onclick = () => {
      container.querySelectorAll('.genre-tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
    };
    container.appendChild(tag);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const genreTabBtn = document.getElementById('genre-tab-btn');
  const genreListContainer = document.getElementById('genre-list-container');
  const subnav = document.querySelector('.comic-subnav-list');
  let genreListVisible = false;
  if (genreTabBtn && genreListContainer) {
    genreTabBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      genreListVisible = !genreListVisible;
      genreListContainer.style.display = genreListVisible ? 'flex' : 'none';
      if (genreListVisible) {
        renderGenreList(0);
      }
    });
    // 다른 서브네비 클릭 시 장르 닫기
    if (subnav) {
      subnav.addEventListener('click', (e) => {
        if (e.target !== genreTabBtn) {
          genreListContainer.style.display = 'none';
          genreListVisible = false;
        }
      });
    }
    // 바깥 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (genreListVisible && !genreListContainer.contains(e.target) && e.target !== genreTabBtn) {
        genreListContainer.style.display = 'none';
        genreListVisible = false;
      }
    });
  }
}); 