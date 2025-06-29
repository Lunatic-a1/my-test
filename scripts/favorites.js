// 예시 데이터 (100개)
const favorites = Array.from({length: 100}, (_, i) => ({
  title: `찜한 웹툰 ${i+1}`,
  rating: (Math.random() * 3 + 7).toFixed(2),
  views: (Math.floor(Math.random() * 9000) + 1000).toLocaleString(),
  up: i % 4 === 0, // 4개마다 up 표시
  isAdult: false, // 추가된 속성
  createdAt: new Date().toISOString() // 추가된 속성
}));

const PAGE_SIZE = 35;
let currentPage = 1;

function renderFavorites(page = 1) {
  const grid = document.querySelector('.favorites-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageFavorites = favorites.slice(startIdx, endIdx);
  pageFavorites.forEach(fav => {
    const card = document.createElement('div');
    card.className = 'content-card content-favorites-card';
    card.innerHTML = `
      <div class="content-poster-box">
        ${fav.isAdult ? `<span class=\"age-badge\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><g><path d=\"M12 1.5 L22.5 4.5 V12 C22.5 18 12 22.5 12 22.5 C12 22.5 1.5 18 1.5 12 V4.5 Z\" fill=\"#F7931A\"/><circle cx=\"12\" cy=\"9\" r=\"3.75\" fill=\"#fff\"/><path d=\"M12 13.5c-3 0-5.25 1.5-5.25 3v1.5h10.5v-1.5c0-1.5-2.25-3-5.25-3z\" fill=\"#fff\"/></g></svg></span>` : ''}
        ${(Date.now() - new Date(fav.createdAt)) < 1000*60*60*24*30 ? '<span class=\"new-badge\">Шинэ</span>' : ''}
        콘텐츠
      </div>
      <div class="content-info">
        <div class="content-title content-favorites-title">${fav.up ? '<span class=\'up-badge\'>UP</span>' : ''}${fav.title}</div>
        <div class="content-meta">
          <span class="content-icon" aria-label="rating"> 
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="content-value">${fav.rating}</span>
          <span class="content-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="content-value">${fav.views}</span>
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
  const totalPages = Math.ceil(favorites.length / PAGE_SIZE);
  let html = '';
  // 이전 버튼
  if (page > 1) {
    html += `<span class="page-prev"><svg style='vertical-align:middle' width='18' height='18' viewBox='0 0 24 24'><path d='M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z' fill='#222'/></svg> 이전</span>`;
  }
  // 페이지 번호 (최대 10개만 표시, 10단위로 이동)
  let start = Math.floor((page - 1) / 10) * 10 + 1;
  let end = Math.min(start + 9, totalPages);
  for (let i = start; i <= end; i++) {
    if (i === page) {
      html += `<span class="page-num active">${i}</span>`;
    } else {
      html += `<span class="page-num">${i}</span>`;
    }
  }
  // 다음 버튼
  if (page < totalPages) {
    html += `<span class="page-next">다음 <svg style='vertical-align:middle' width='18' height='18' viewBox='0 0 24 24'><path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' fill='#222'/></svg></span>`;
  }
  pagination.innerHTML = html;

  // 이벤트 바인딩
  const prevBtn = pagination.querySelector('.page-prev');
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderFavorites(currentPage);
        window.scrollTo({top:0, behavior:'smooth'});
      }
    };
  }
  pagination.querySelectorAll('.page-num').forEach(el => {
    el.onclick = () => {
      const num = parseInt(el.textContent);
      currentPage = num;
      renderFavorites(num);
      window.scrollTo({top:0, behavior:'smooth'});
    };
  });
  const nextBtn = pagination.querySelector('.page-next');
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderFavorites(currentPage);
        window.scrollTo({top:0, behavior:'smooth'});
      }
    };
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderFavorites(1);
  // 페이지네이션용 간단 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .pagination {
      margin: 32px 0 0 0;
      text-align: center;
      font-size: 1.2rem;
      user-select: none;
    }
    .pagination .page-num, .pagination .page-next, .pagination .page-prev {
      display: inline-block;
      margin: 0 8px;
      color: #222;
      cursor: pointer;
      transition: color 0.2s;
    }
    .pagination .page-num.active {
      color: #222;
      font-weight: bold;
      cursor: default;
    }
    .pagination .page-num:hover:not(.active), .pagination .page-next:hover, .pagination .page-prev:hover {
      color: #0d47a1;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
}); 