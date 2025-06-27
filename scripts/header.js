import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdc-uOw-RkwioP-GFf1BouVu4JBkfGFnU",
  authDomain: "login-4cb47.firebaseapp.com",
  projectId: "login-4cb47",
  storageBucket: "login-4cb47.firebasestorage.app",
  messagingSenderId: "866437023451",
  appId: "1:866437023451:web:c41f1a1b07accf50ae2efe",
  measurementId: "G-EW136C5LGV"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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