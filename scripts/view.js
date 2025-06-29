// view.js: 상세 페이지용 (데모용 더미 데이터)
const dummy = {
  title: '웹툰 1',
  rating: '8.23',
  views: '12,345',
  up: true,
  comments: 123,
  createdAt: Date.now() - 1000*60*60*24*3,
  isAdult: false,
  description: '이것은 예시 웹툰의 상세 설명입니다. 다양한 정보와 줄거리, 작가 정보 등이 들어갈 수 있습니다.',
  poster: 'includes/test-poster.png'
};

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderDetail() {
  const container = document.getElementById('content-detail-container');
  if (!container) return;
  // 실제 구현에서는 id로 서버/DB에서 데이터 fetch
  // 데모: id=1만 존재
  const id = getQueryId();
  if (id !== '1') {
    container.innerHTML = '<div style="padding:40px 0;text-align:center;color:#888;font-size:1.2rem;">존재하지 않는 콘텐츠입니다.</div>';
    return;
  }
  container.innerHTML = `
    <div style="display:flex;gap:40px;align-items:flex-start;">
      <div class="content-poster-box" style="width:220px;height:330px;min-width:220px;">
        <img src="${dummy.poster}" alt="포스터" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" />
      </div>
      <div style="flex:1;min-width:0;">
        <h2 style="font-size:2.1rem;margin-bottom:10px;">${dummy.title} ${dummy.up ? '<span class=\'up-badge\'>UP</span>' : ''}</h2>
        <div class="content-meta" style="margin-bottom:16px;">
          <span class="content-icon" aria-label="rating">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="content-value">${dummy.rating}</span>
          <span class="content-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="content-value">${dummy.views}</span>
          <span style="margin-left:18px;color:#888;font-size:0.98em;">댓글 ${dummy.comments}</span>
        </div>
        <div style="margin-bottom:18px;color:#444;font-size:1.1rem;line-height:1.7;">${dummy.description}</div>
        <div style="color:#aaa;font-size:0.98em;">업로드: ${new Date(dummy.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', renderDetail); 