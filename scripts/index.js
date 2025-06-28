// 인기작 캐러셀 좌우 스크롤
window.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('popular-carousel');
  const leftBtn = document.getElementById('popular-left');
  const rightBtn = document.getElementById('popular-right');
  if (carousel && leftBtn && rightBtn) {
    leftBtn.onclick = () => {
      carousel.scrollBy({left: -200, behavior: 'smooth'});
    };
    rightBtn.onclick = () => {
      carousel.scrollBy({left: 200, behavior: 'smooth'});
    };
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
const popularPosts = Array.from({length: 10}, (_, i) => ({
  title: `인기작 ${i+1}`,
  rank: i+1
}));
const latestPosts = Array.from({length: 7}, (_, i) => ({
  title: `최신작 ${i+1}`,
  rating: (Math.random() * 4 + 6).toFixed(2),
  views: (Math.floor(Math.random() * 10000) + 1000).toLocaleString()
}));
const favoritePosts = Array.from({length: 7}, (_, i) => ({
  title: `찜한 웹툰 ${i+1}`,
  rating: (Math.random() * 4 + 6).toFixed(2),
  views: (Math.floor(Math.random() * 10000) + 1000).toLocaleString()
}));

function renderPopularPosts() {
  const carousel = document.getElementById('popular-carousel');
  if (!carousel) return;
  // Remove all except spacers
  carousel.innerHTML = '<div class="popular-card-spacer"></div>';
  popularPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card popular-post-card';
    card.innerHTML = `
      <div class="poster-box">포스터<span class="poster-rank">${post.rank}</span></div>
      <div class="post-title popular-post-title">${post.title}</div>
    `;
    carousel.appendChild(card);
  });
  carousel.appendChild(document.createElement('div')).className = 'popular-card-spacer';
}

function renderLatestPosts() {
  const grid = document.querySelector('.latest-grid');
  if (!grid) return;
  grid.innerHTML = '';
  latestPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card latest-post-card';
    card.innerHTML = `
      <div class="poster-box">포스터</div>
      <div class="post-title latest-post-title">${post.title}</div>
      <div class="post-meta">
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="rating">★</span>${post.rating}
        </span>
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="views">👁️</span>${post.views}
        </span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderFavoritePosts() {
  const grid = document.querySelector('.favorites-grid');
  if (!grid) return;
  grid.innerHTML = '';
  favoritePosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card favorites-post-card';
    card.innerHTML = `
      <div class="poster-box">포스터</div>
      <div class="post-title favorites-post-title">${post.title}</div>
      <div class="post-meta">
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="rating">★</span>${post.rating}
        </span>
        <span class="post-meta-item">
          <span class="post-meta-icon" aria-label="views">👁️</span>${post.views}
        </span>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderPopularPosts();
  renderLatestPosts();
  renderFavoritePosts();
}); 