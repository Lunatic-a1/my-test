// 예시 데이터 (실제 데이터로 교체 가능)
const comics = Array.from({length: 20}, (_, i) => ({
  title: `웹툰 ${i+1}`,
  rating: (Math.random() * 3 + 7).toFixed(2),
  views: (Math.floor(Math.random() * 9000) + 1000).toLocaleString(),
  up: i % 5 === 0,
  isAdult: i % 6 === 0 // 6개마다 18세 이상 콘텐츠
}));

// 18세 이상 뱃지 HTML 생성 함수
function createAgeBadge() {
  return `
    <div class="age-badge">
      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.953 2.097c0 2.199-.161 7.11.228 9.054C3.402 17.265 10 19.711 10 19.711s6.598-2.446 7.819-8.56c.389-1.945.227-6.855.227-9.054C18.046 2.097 14.237 1 10 1 5.763 1 1.953 2.097 1.953 2.097Z" fill="#F4831F"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4.402a2.34 2.34 0 0 0-2.34 2.339c0 1.29 1.05 2.339 2.34 2.339a2.34 2.34 0 0 0 0-4.678Zm2.695 5.382c-.036-.02-.07-.04-.11-.059a1.522 1.522 0 0 0-.14-.057 3.783 3.783 0 0 0-.49-.163c-.574.4-1.257.615-1.956.617-.722 0-1.393-.23-1.956-.617-.212.054-.42.126-.62.215-.052.024-.096.05-.14.075a2.552 2.552 0 0 0-1.323 2.257 7.015 7.015 0 0 0 8.08 0 2.55 2.55 0 0 0-1.345-2.268Z" fill="#fff"></path>
      </svg>
      <span class="blind">청유물</span>
    </div>
  `;
}

function renderComics() {
  const grid = document.querySelector('.comics-grid');
  if (!grid) return;
  grid.innerHTML = '';
  comics.forEach(comic => {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.innerHTML = `
      <div class="poster-box">
        포스터
        ${comic.isAdult ? createAgeBadge() : ''}
      </div>
      <div class="content-info">
        <div class="content-title">${comic.up ? '<span class=\'up-badge\'>UP</span>' : ''}${comic.title}</div>
        <div class="content-meta">
          <span class="meta-icon" aria-label="rating"> 
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${comic.rating}</span>
          <span class="meta-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${comic.views}</span>
        </div>
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