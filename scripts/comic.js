// 예시 데이터 (100개)
const comics = Array.from({length: 100}, (_, i) => ({
  title: `웹툰 ${i+1}`,
  rating: (Math.random() * 3 + 7).toFixed(2),
  views: (Math.floor(Math.random() * 9000) + 1000).toLocaleString(),
  up: i % 5 === 0 // 5개마다 up 표시
}));

const PAGE_SIZE = 35;
let currentPage = 1;

function renderComics(page = 1) {
  const grid = document.querySelector('.comics-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageComics = comics.slice(startIdx, endIdx);
  pageComics.forEach(comic => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="poster-box">포스터</div>
      <div class="post-info">
        <div class="post-title">${comic.up ? '<span class=\'up-badge\'>UP</span>' : ''}${comic.title}</div>
        <div class="post-meta">
          <span class="meta-icon" aria-label="rating"> 
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${comic.rating}</span>
          <span class="meta-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${comic.views}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  renderPagination(page);
}

function renderPagination(page) {
  let pagination = document.getElementById('pagination');
  if (!pagination) {
    pagination = document.createElement('div');
    pagination.id = 'pagination';
    pagination.className = 'pagination';
    document.querySelector('.section').appendChild(pagination);
  }
  const totalPages = Math.ceil(comics.length / PAGE_SIZE);
  let html = '';
  // 페이지 번호 (최대 10개만 표시)
  let start = Math.max(1, page - 4);
  let end = Math.min(totalPages, start + 9);
  if (end - start < 9) start = Math.max(1, end - 9);
  for (let i = start; i <= end; i++) {
    if (i === page) {
      html += `<span class="page-num active">${i}</span>`;
    } else {
      html += `<span class="page-num">${i}</span>`;
    }
  }
  // 다음 버튼
  if (page < totalPages) {
    html += `<span class="page-next">다음 <svg style='vertical-align:middle' width='18' height='18' viewBox='0 0 24 24'><path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' fill='#1976d2'/></svg></span>`;
  }
  pagination.innerHTML = html;

  // 이벤트 바인딩
  pagination.querySelectorAll('.page-num').forEach(el => {
    el.onclick = () => {
      const num = parseInt(el.textContent);
      currentPage = num;
      renderComics(num);
      window.scrollTo({top:0, behavior:'smooth'});
    };
  });
  const nextBtn = pagination.querySelector('.page-next');
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderComics(currentPage);
        window.scrollTo({top:0, behavior:'smooth'});
      }
    };
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderComics(1);
  // 페이지네이션용 간단 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .pagination {
      margin: 32px 0 0 0;
      text-align: center;
      font-size: 1.2rem;
      user-select: none;
    }
    .pagination .page-num, .pagination .page-next {
      display: inline-block;
      margin: 0 8px;
      color: #1976d2;
      cursor: pointer;
      transition: color 0.2s;
    }
    .pagination .page-num.active {
      color: #222;
      font-weight: bold;
      cursor: default;
    }
    .pagination .page-num:hover:not(.active), .pagination .page-next:hover {
      color: #0d47a1;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
});

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