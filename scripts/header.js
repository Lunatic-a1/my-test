import { auth } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { app } from "./firebase-init.js";

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
  if (userProfile && userDropdown) {
    let outsideClickHandler = null;
    userProfile.onclick = (e) => {
      if (e.target.closest('#user-dropdown')) return;
      e.stopPropagation();
      const isOpen = userDropdown.style.display === 'block';
      userDropdown.style.display = isOpen ? 'none' : 'block';
      if (!isOpen) {
        // 드롭다운이 열릴 때만 이벤트 등록
        outsideClickHandler = (evt) => {
          if (!evt.target.closest('#user-profile')) {
            userDropdown.style.display = 'none';
            document.removeEventListener('click', outsideClickHandler);
            outsideClickHandler = null;
          }
        };
        setTimeout(() => {
          document.addEventListener('click', outsideClickHandler);
        }, 0);
      } else if (outsideClickHandler) {
        // 드롭다운이 닫힐 때 이벤트 해제
        document.removeEventListener('click', outsideClickHandler);
        outsideClickHandler = null;
      }
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
  const checkHeader = setInterval(() => {
    if (document.getElementById('user-profile')) {
      clearInterval(checkHeader);
      bindHeaderAuthEvents();
    }
  }, 100);
}); 