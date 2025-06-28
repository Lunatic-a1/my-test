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
  const userNotifyBtn = document.getElementById('user-notify-btn');
  const userNotifyPanel = document.getElementById('user-notify-panel');

  // 드롭다운 토글 (user-profile 클릭 시에만)
  if (userProfile && userDropdown && userNotifyPanel) {
    userProfile.onclick = (e) => {
      // 알림 버튼 클릭 시에는 드롭다운 토글하지 않음
      if (e.target.closest('#user-notify-btn')) return;
      if (e.target.closest('#user-dropdown')) return;
      e.stopPropagation();
      // 알림 패널 닫기
      userNotifyPanel.style.display = 'none';
      toggleDropdown(userDropdown);
    };
  }

  // 알림 패널 토글 (user-notify-btn 클릭 시)
  if (userNotifyBtn && userNotifyPanel && userDropdown) {
    let notifyOutsideHandler = null;
    userNotifyBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = userNotifyPanel.style.display === 'block';
      // 유저 드롭다운 닫기 및 outsideClickHandler 해제
      userDropdown.style.display = 'none';
      if (userDropdown._outsideClickHandler) {
        document.removeEventListener('click', userDropdown._outsideClickHandler);
        userDropdown._outsideClickHandler = null;
      }
      if (!isOpen) {
        // 위치 bell 아이콘 기준으로 맞추기
        const btnRect = userNotifyBtn.getBoundingClientRect();
        const panel = userNotifyPanel;
        panel.style.display = 'block'; // 먼저 보여주고
        panel.style.position = 'absolute';
        panel.style.top = btnRect.bottom + window.scrollY + 8 + 'px';
        panel.style.left = (btnRect.right + window.scrollX - panel.offsetWidth) + 'px';
      } else {
        userNotifyPanel.style.display = 'none';
      }
      if (!isOpen) {
        notifyOutsideHandler = (evt) => {
          if (!evt.target.closest('#user-notify-panel') && !evt.target.closest('#user-notify-btn')) {
            userNotifyPanel.style.display = 'none';
            document.removeEventListener('click', notifyOutsideHandler);
            notifyOutsideHandler = null;
          }
        };
        setTimeout(() => {
          document.addEventListener('click', notifyOutsideHandler);
        }, 0);
      } else if (notifyOutsideHandler) {
        document.removeEventListener('click', notifyOutsideHandler);
        notifyOutsideHandler = null;
      }
    };
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (loginLink) loginLink.style.display = 'none';
      if (userProfile) userProfile.style.display = 'flex';
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