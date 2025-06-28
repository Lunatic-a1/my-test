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
  rank: i+1,
  rating: (9.5 + Math.random() * 0.5).toFixed(2),
  views: Math.floor(100 + Math.random() * 1000)
}));
const latestPosts = Array.from({length: 7}, (_, i) => ({
  title: `최신작 ${i+1}`,
  rating: (9.5 + Math.random() * 0.5).toFixed(2),
  views: Math.floor(100 + Math.random() * 1000)
}));
const favoritePosts = Array.from({length: 7}, (_, i) => ({
  title: `찜한 웹툰 ${i+1}`,
  rating: (9.5 + Math.random() * 0.5).toFixed(2),
  views: Math.floor(100 + Math.random() * 1000)
}));

const viewIconSvg = `<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"10\" cy=\"10\" rx=\"8\" ry=\"5\" stroke=\"#bdbdbd\" stroke-width=\"1.7\" fill=\"none\" opacity=\"0.55\"/></svg>`;

function renderPopularPosts() {
  const carousel = document.getElementById('popular-carousel');
  if (!carousel) return;
  // Remove all except spacers
  carousel.innerHTML = '<div class="popular-card-spacer"></div>';
  popularPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card popular-post-card';
    card.innerHTML = `
      <div class=\"poster-box\">포스터<span class=\"poster-rank\">${post.rank}</span></div>
      <div class=\"post-title popular-post-title\">${post.title}</div>
      <div class=\"post-meta\">
        <span class=\"post-rating\"><img class=\"star-icon-img\" src=\"/includes/star-gray.svg\" alt=\"평점\"/> ${post.rating}</span>
        <span class=\"post-views\">${viewIconSvg} ${post.views.toLocaleString()}</span>
      </div>
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
      <div class=\"poster-box\">포스터</div>
      <div class=\"post-title latest-post-title\">${post.title}</div>
      <div class=\"post-meta\">
        <span class=\"post-rating\"><img class=\"star-icon-img\" src=\"/includes/star-gray.svg\" alt=\"평점\"/> ${post.rating}</span>
        <span class=\"post-views\">${viewIconSvg} ${post.views.toLocaleString()}</span>
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
      <div class=\"poster-box\">포스터</div>
      <div class=\"post-title favorites-post-title\">${post.title}</div>
      <div class=\"post-meta\">
        <span class=\"post-rating\"><img class=\"star-icon-img\" src=\"/includes/star-gray.svg\" alt=\"평점\"/> ${post.rating}</span>
        <span class=\"post-views\">${viewIconSvg} ${post.views.toLocaleString()}</span>
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