// 인기작 캐러셀 좌우 스크롤
let updatePopularButtonVisibility;
window.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('popular-carousel');
  const leftBtn = document.getElementById('popular-left');
  const rightBtn = document.getElementById('popular-right');
  
  if (carousel && leftBtn && rightBtn) {
    // 버튼 표시/숨김 함수 (전역)
    updatePopularButtonVisibility = function() {
      const scrollLeft = carousel.scrollLeft;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;
      // 이전 버튼: 스크롤이 맨 왼쪽에 있으면 숨김
      if (scrollLeft <= 0) {
        leftBtn.style.display = 'none';
      } else {
        leftBtn.style.display = 'flex';
      }
      // 다음 버튼: 스크롤이 맨 오른쪽에 있으면 숨김
      if (scrollLeft >= maxScrollLeft - 1) {
        rightBtn.style.display = 'none';
      } else {
        rightBtn.style.display = 'flex';
      }
    };
    // 초기 버튼 상태 설정
    updatePopularButtonVisibility();
    leftBtn.onclick = () => {
      carousel.scrollTo({left: 0, behavior: 'smooth'});
    };
    rightBtn.onclick = () => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      carousel.scrollTo({left: maxScrollLeft, behavior: 'smooth'});
    };
    // 스크롤 이벤트 리스너 추가
    carousel.addEventListener('scroll', updatePopularButtonVisibility);
  }
});

// 찜한 웹툰 섹션: 로그인 상태에 따라 표시
import { auth } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
const favSection = document.getElementById('my-favorites-section');
onAuthStateChanged(auth, (user) => {
  if (favSection) favSection.style.display = user ? '' : 'none';
});

document.addEventListener('DOMContentLoaded', () => {
  const latestMoreBtn = document.getElementById('latest-more-btn');
  if (latestMoreBtn) {
    latestMoreBtn.addEventListener('click', () => {
      window.location.href = 'comics.html';
    });
  }
});

// 예시 데이터
const popularContents = Array.from({length: 10}, (_, i) => ({
  title: `인기작 ${i+1}`,
  rank: i+1,
  isAdult: i % 3 === 0 // 3개마다 18세 이상 콘텐츠
}));
const latestContents = Array.from({length: 7}, (_, i) => ({
  title: `최신작 ${i+1}`,
  rating: (Math.random() * 3 + 7).toFixed(2),
  views: (Math.floor(Math.random() * 9000) + 1000).toLocaleString(),
  up: i % 3 === 0,
  isAdult: i % 4 === 0 // 4개마다 18세 이상 콘텐츠
}));
const favoriteContents = Array.from({length: 7}, (_, i) => ({
  title: `찜한 웹툰 ${i+1}`,
  rating: (Math.random() * 3 + 7).toFixed(2),
  views: (Math.floor(Math.random() * 9000) + 1000).toLocaleString(),
  up: i % 4 === 0,
  isAdult: i % 5 === 0 // 5개마다 18세 이상 콘텐츠
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

function renderPopularContents() {
  const carousel = document.getElementById('popular-carousel');
  if (!carousel) return;
  carousel.innerHTML = '<div class="popular-card-spacer"></div>';
  popularContents.forEach(content => {
    const card = document.createElement('div');
    card.className = 'content-card popular-content-card';
    let rankHtml = '';
    if (content.rank >= 1 && content.rank <= 10) {
      rankHtml = `<span class="rank-number">${content.rank}</span>`;
    }
    card.innerHTML = `
      <div class="poster-box">
        ${content.isAdult ? createAgeBadge() : ''}
        포스터
        ${rankHtml}
      </div>
      <div class="content-info">
        <div class="content-title popular-content-title">${content.title}</div>
      </div>
    `;
    carousel.appendChild(card);
  });
  carousel.appendChild(document.createElement('div')).className = 'popular-card-spacer';
  if (typeof updatePopularButtonVisibility === 'function') {
    setTimeout(updatePopularButtonVisibility, 0);
  }
}

function renderLatestContents() {
  const grid = document.querySelector('.latest-grid');
  if (!grid) return;
  grid.innerHTML = '';
  latestContents.forEach(content => {
    const card = document.createElement('div');
    card.className = 'content-card latest-content-card';
    card.innerHTML = `
      <div class="poster-box">
        포스터
        ${content.isAdult ? createAgeBadge() : ''}
      </div>
      <div class="content-info">
        <div class="content-title latest-content-title">${content.up ? '<span class=\'up-badge\'>UP</span>' : ''}${content.title}</div>
        <div class="content-meta">
          <span class="meta-icon" aria-label="rating"> 
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${content.rating}</span>
          <span class="meta-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${content.views}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderFavoriteContents() {
  const grid = document.querySelector('.favorites-grid');
  if (!grid) return;
  grid.innerHTML = '';
  favoriteContents.forEach(content => {
    const card = document.createElement('div');
    card.className = 'content-card favorites-content-card';
    card.innerHTML = `
      <div class="poster-box">
        포스터
        ${content.isAdult ? createAgeBadge() : ''}
      </div>
      <div class="content-info">
        <div class="content-title favorites-content-title">${content.up ? '<span class=\'up-badge\'>UP</span>' : ''}${content.title}</div>
        <div class="content-meta">
          <span class="meta-icon" aria-label="rating"> 
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${content.rating}</span>
          <span class="meta-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${content.views}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderPopularContents();
  renderLatestContents();
  renderFavoriteContents();
}); 