import { auth } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { app } from "./firebase-init.js";

const db = getFirestore(app);

function toggleDropdown(userDropdown) {
  if (!userDropdown) return;
  const isOpen = userDropdown.style.display === 'block';
  userDropdown.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    // 드롭다운이 열릴 때만 이벤트 등록
    const outsideClickHandler = (evt) => {
      if (!evt.target.closest('#user-profile')) {
        userDropdown.style.display = 'none';
        document.removeEventListener('click', outsideClickHandler);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', outsideClickHandler);
    }, 0);
    userDropdown._outsideClickHandler = outsideClickHandler;
  } else if (userDropdown._outsideClickHandler) {
    // 드롭다운이 닫힐 때 이벤트 해제
    document.removeEventListener('click', userDropdown._outsideClickHandler);
    userDropdown._outsideClickHandler = null;
  }
}

function bindHeaderAuthEvents() {
  const userProfile = document.getElementById('user-profile');
  const userNickname = document.getElementById('user-nickname');
  const userDropdown = document.getElementById('user-dropdown');
  const userIdSpan = document.getElementById('user-id');
  const userPointSpan = document.getElementById('user-point');
  const logoutBtn = document.getElementById('logout-btn');
  const profileBtn = document.getElementById('profile-btn');
  const loginLink = document.getElementById('login-link');

  // 드롭다운 토글 (user-profile 클릭 시에만)
  if (userProfile && userDropdown) {
    userProfile.onclick = (e) => {
      if (e.target.closest('#user-dropdown')) return;
      e.stopPropagation();
      toggleDropdown(userDropdown);
    };
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (loginLink) loginLink.style.display = 'none';
      if (userProfile) userProfile.style.display = 'inline-block';
      // Firestore에서 유저 정보 가져오기
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (userNickname) userNickname.textContent = data.nickname || user.email;
        if (userIdSpan) userIdSpan.textContent = data.userId || '--------';
        if (userPointSpan) userPointSpan.textContent = data.point !== undefined ? data.point : '0';
      } else {
        if (userNickname) userNickname.textContent = user.email;
        if (userIdSpan) userIdSpan.textContent = '--------';
        if (userPointSpan) userPointSpan.textContent = '0';
      }
    } else {
      if (loginLink) loginLink.style.display = '';
      if (userProfile) userProfile.style.display = 'none';
      if (userDropdown) userDropdown.style.display = 'none';
    }
  });

  if (logoutBtn) {
    logoutBtn.onclick = () => signOut(auth);
  }
  if (profileBtn) {
    profileBtn.onclick = () => {
      alert('회원정보 페이지는 추후 구현됩니다.');
    };
  }
}

// 헤더가 동적으로 삽입된 후 실행
window.addEventListener('DOMContentLoaded', () => {
  // Inject header styles
  const style = document.createElement('style');
  style.textContent = `
    header {
      background: #333;
      color: white;
      padding: 15px;
    }
    header > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header a {
      text-decoration: none;
      color: white;
    }
    header h1 {
      margin: 0;
      margin-right: 30px;
      display: inline-block;
    }
    header nav ul {
      display: flex;
      gap: 32px;
      list-style: none;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    header nav ul li a {
      color: white;
      text-decoration: none;
      font-size: 18px;
    }
    #search-form {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      padding: 0 8px 0 0;
      height: 44px;
      margin-right: 12px;
    }
    #search-input {
      border: none;
      outline: none;
      font-size: 16px;
      padding: 0 12px;
      height: 40px;
      background: transparent;
      color: #555;
      width: 220px;
    }
    #search-input::placeholder {
      color: #aaa;
      font-size: 15px;
    }
    #search-form button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 10px;
      height: 40px;
      display: flex;
      align-items: center;
    }
    #login-link {
      display: inline-block;
      height: 44px;
      line-height: 44px;
      padding: 0 18px;
      font-size: 16px;
      color: #333;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      text-decoration: none;
      margin-left: 8px;
      transition: background 0.2s;
    }
    #login-link:hover, #logout-btn:hover {
      background: #f3f3f3;
    }
    #auth-area {
      /* no extra style needed */
    }
    #user-profile {
      display: none;
      position: relative;
      align-items: center;
      gap: 10px;
      flex-direction: row;
    }
    #user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      background: #eee;
    }
    #user-nickname {
      cursor: pointer;
      font-weight: bold;
      color: #fff;
      margin-left: 6px;
    }
    #user-notify-btn {
      background: none;
      border: none;
      margin-left: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    #user-dropdown {
      display: none;
      position: absolute;
      right: 0;
      top: 48px;
      background: #fff;
      color: #222;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      min-width: 220px;
      z-index: 10;
      padding: 18px 20px 12px 20px;
    }
    #user-dropdown > div {
      margin-bottom: 8px;
      font-size: 15px;
    }
    #profile-btn {
      width: 100%;
      margin-bottom: 8px;
      padding: 8px 0;
      border: none;
      background: #eee;
      border-radius: 5px;
      font-size: 15px;
      cursor: pointer;
    }
    #logout-btn {
      width: 100%;
      padding: 8px 0;
      border: none;
      background: #f8d7da;
      color: #b71c1c;
      border-radius: 5px;
      font-size: 15px;
      cursor: pointer;
    }
    #user-notify-panel {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      background: #fff;
      color: #222;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      min-width: 320px;
      z-index: 20;
      padding: 18px 20px 12px 20px;
    }
    #user-notify-panel > div:first-child {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
    #notify-list {
      font-size: 15px;
      color: #444;
    }
  `;
  document.head.appendChild(style);

  const checkHeader = setInterval(() => {
    if (document.getElementById('user-profile')) {
      clearInterval(checkHeader);
      bindHeaderAuthEvents();
    }
  }, 100);
}); 