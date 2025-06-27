import { auth } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

function bindHeaderAuthEvents() {
  const logoutBtn = document.getElementById('logout-btn');
  const userProfile = document.getElementById('user-profile');
  const userName = document.getElementById('user-name');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (userProfile) userProfile.style.display = 'inline-block';
      if (userName) userName.textContent = user.email;
    } else {
      if (userProfile) userProfile.style.display = 'none';
      if (userName) userName.textContent = '';
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      signOut(auth);
    });
  }
}

// 헤더가 동적으로 삽입된 후 실행
window.addEventListener('DOMContentLoaded', () => {
  // 헤더가 fetch로 삽입된 뒤 DOM에 반영될 때까지 대기
  const checkHeader = setInterval(() => {
    if (document.getElementById('user-profile')) {
      clearInterval(checkHeader);
      bindHeaderAuthEvents();
    }
  }, 100);
}); 