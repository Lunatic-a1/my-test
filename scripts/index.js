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
  rating: (Math.random() * 3 + 7).toFixed(2),
  views: (Math.floor(Math.random() * 9000) + 1000).toLocaleString(),
  up: i % 3 === 0 // 3개마다 up 표시
}));
const favoritePosts = Array.from({length: 7}, (_, i) => ({
  title: `찜한 웹툰 ${i+1}`,
  rating: (Math.random() * 3 + 7).toFixed(2),
  views: (Math.floor(Math.random() * 9000) + 1000).toLocaleString(),
  up: i % 4 === 0 // 4개마다 up 표시
}));

function renderPopularPosts() {
  const carousel = document.getElementById('popular-carousel');
  if (!carousel) return;
  // Remove all except spacers
  carousel.innerHTML = '<div class="popular-card-spacer"></div>';
  popularPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card popular-post-card';
    let rankHtml = '';
    if (post.rank === 1) {
      rankHtml = `<span class="poster-rank" style="padding:0;"> \
        <svg width=\"36\" height=\"50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\"><path d=\"M13.788 45.296H25.29V6.152H13.787l-9.82 6.565v9.63L13.57 16h.217v29.297Z\" fill=\"#000\"></path><path d=\"M13.788 45.296h-1.852v1.852h1.852v-1.852Zm11.502 0v1.852h1.851v-1.852H25.29Zm0-39.144h1.851V4.301H25.29v1.851Zm-11.502 0V4.301h-.562l-.467.312 1.029 1.54Zm-9.82 6.565-1.03-1.54-.822.55v.99h1.852Zm0 9.63H2.116v3.444l2.873-1.9-1.021-1.544ZM13.57 16v-1.851h-.557l-.464.307 1.02 1.544Zm.217 0h1.852v-1.851h-1.852v1.851Zm0 31.15H25.29v-3.705H13.787v3.704Zm13.353-1.853V6.152h-3.703v39.144h3.703ZM25.29 4.301H13.787v3.703H25.29V4.301Zm-12.531.312-9.82 6.565 2.058 3.079 9.82-6.565-2.058-3.08ZM2.116 12.717v9.63H5.82v-9.63H2.116ZM4.99 23.892l9.603-6.348-2.042-3.09-9.603 6.348 2.042 3.09Zm8.582-6.04h.217v-3.704h-.217v3.703Zm-1.635-1.853v29.297h3.704V16h-3.704Z\" fill=\"#fff\"></path><path d=\"M13.788 45.296h11.501V6.152H13.788l-9.82 6.565v9.63L13.57 16h.217v29.297Z\" fill=\"#000\"></path><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.936 47.148V19.3l-9.82 6.491V11.727l11.11-7.426h13.915v42.847H11.937ZM13.571 16h.217v29.297H25.29V6.152H13.788l-9.82 6.565v9.63L13.571 16Z\" fill=\"#fff\"></path></svg>
      </span>`;
    } else if (post.rank === 2) {
      rankHtml = `<span class="poster-rank" style="padding:0;"> \
        <svg width=\"36\" height=\"50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\"><path d=\"M1.867 18.44v.218h10.471v-.244c0-2.849 2.116-4.856 5.1-4.856 2.957 0 4.666 1.655 4.666 3.77 0 2.17-1.194 4.043-3.825 6.402L2.545 37.648v7.65h31.088v-8.681h-16.25v-.217l9.197-8.138c2.088-1.845 6.591-5.914 6.591-11.285 0-7.107-5.832-11.909-15.326-11.909-9.684 0-15.978 5.371-15.978 13.374Z\" fill=\"#000\"></path><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M.016 20.51v-2.07c0-4.524 1.797-8.394 5.016-11.104 3.19-2.685 7.64-4.12 12.813-4.12 5.04 0 9.315 1.273 12.372 3.687 3.098 2.447 4.807 5.964 4.807 10.073 0 3.214-1.347 5.95-2.864 8.05-1.517 2.099-3.301 3.693-4.354 4.622l-5.78 5.116h13.459v12.384H.694V36.812l16.349-14.46a.183.183 0 0 1 .004-.004c2.523-2.264 3.205-3.667 3.205-5.02 0-.528-.2-.95-.572-1.268-.392-.333-1.102-.65-2.242-.65-1.071 0-1.872.355-2.392.85-.514.488-.856 1.207-.856 2.154v2.096H.016Zm18.263 3.22L2.546 37.648v7.65h31.087v-8.681H17.384v-.217l9.196-8.138c2.089-1.845 6.592-5.914 6.592-11.285 0-7.107-5.832-11.909-15.327-11.909-9.009 0-15.083 4.648-15.887 11.739-.06.531-.09 1.077-.09 1.635v.217h10.47v-.244c0-2.849 2.116-4.856 5.1-4.856 2.957 0 4.666 1.655 4.666 3.77 0 2.17-1.194 4.043-3.825 6.402Z\" fill=\"#fff\"></path></svg>
      </span>`;
    } else {
      rankHtml = `<span class="poster-rank">${post.rank}</span>`;
    }
    card.innerHTML = `
      <div class="poster-box">포스터${rankHtml}</div>
      <div class="post-info">
        <div class="post-title popular-post-title">${post.title}</div>
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
      <div class="poster-box">포스터</div>
      <div class="post-info">
        <div class="post-title latest-post-title">${post.up ? '<span class=\'up-badge\'>UP</span>' : ''}${post.title}</div>
        <div class="post-meta">
          <span class="meta-icon" aria-label="rating"> 
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${post.rating}</span>
          <span class="meta-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${post.views}</span>
        </div>
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
      <div class="post-info">
        <div class="post-title favorites-post-title">${post.up ? '<span class=\'up-badge\'>UP</span>' : ''}${post.title}</div>
        <div class="post-meta">
          <span class="meta-icon" aria-label="rating"> 
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${post.rating}</span>
          <span class="meta-icon" aria-label="views">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#bbb"/></svg>
          </span>
          <span class="meta-value">${post.views}</span>
        </div>
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