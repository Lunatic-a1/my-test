import { auth } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { app } from "./firebase-init.js";

// 동적 스타일 추가
const headerStyle = `
.mytoon-header {
  background: #333;
  color: white;
  padding: 15px;
}
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
  align-items: center;
}
.logo-link {
  text-decoration: none;
  color: white;
}
.logo-title {
  margin: 0;
  margin-right: 30px;
  display: inline-block;
}
.main-nav {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 0;
}
.search-form {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  padding: 0 8px 0 0;
  height: 44px;
  margin-right: 12px;
}
.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 12px;
  height: 40px;
  background: transparent;
  color: #555;
  width: 220px;
}
.search-input::placeholder {
  color: #aaa;
  font-size: 15px;
}
.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 10px;
  height: 40px;
  display: flex;
  align-items: center;
}
.login-link {
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
.login-link:hover, .logout-btn:hover {
  background: #f3f3f3;
}
.user-profile {
  display: none;
  position: relative;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  display: flex;
}
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}
.user-nickname {
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  margin-left: 6px;
}
.user-notify-btn {
  background: none;
  border: none;
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.user-dropdown {
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
.user-id, .user-point {
  margin-bottom: 8px;
  font-size: 15px;
}
.profile-btn {
  width: 100%;
  margin-bottom: 8px;
  padding: 8px 0;
  border: none;
  background: #eee;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
}
.logout-btn {
  width: 100%;
  padding: 8px 0;
  border: none;
  background: #f8d7da;
  color: #b71c1c;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
}
`;
const styleTag = document.createElement('style');
styleTag.innerHTML = headerStyle;
document.head.appendChild(styleTag);

const db = getFirestore(app);

function bindHeaderAuthEvents() {
  const userProfile = document.getElementById('user-profile');
  const userNickname = document.getElementById('user-nickname');
  const userDropdown = document.getElementById('user-dropdown');
  const userIdSpan = document.getElementById('user-id');
  const userPointSpan = document.getElementById('user-point');
  const logoutBtn = document.getElementById('logout-btn');
  const profileBtn = document.getElementById('profile-btn');
  const loginLink = document.getElementById('login-link');

  // 드롭다운 토글
  if (userNickname && userDropdown) {
    userNickname.onclick = (e) => {
      e.stopPropagation();
      userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    };
    // 바깥 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (userDropdown.style.display === 'block') {
        userDropdown.style.display = 'none';
      }
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (loginLink) loginLink.style.display = 'none';
      if (userProfile) userProfile.style.display = 'inline-flex';
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
  const checkHeader = setInterval(() => {
    if (document.getElementById('user-profile')) {
      clearInterval(checkHeader);
      bindHeaderAuthEvents();
    }
  }, 100);
}); 