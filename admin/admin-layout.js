import { app, auth } from "../scripts/firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // 사용자가 로그인함 -> 관리자 권한 확인
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().isAdmin === true) {
                // 관리자일 경우, 페이지 로드 계속
                console.log("관리자 접근 허용:", user.email);
                loadAdminLayout();
            } else {
                // 관리자가 아님 -> 홈페이지로 리디렉션
                window.location.href = "/index.html";
            }
        } else {
            // 로그인하지 않음 -> 로그인 페이지로 리디렉션
            window.location.href = "/login.html";
        }
    });
});

function loadAdminLayout() {
    fetch('includes/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initializeMenu();
            bindLogoutEvent();
        });
}

function bindLogoutEvent() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = '/index.html';
            }).catch((error) => {
                console.error("Logout failed: ", error);
                alert("로그아웃에 실패했습니다.");
            });
        });
    }
}

function initializeMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuToggles = document.querySelectorAll('.menu-toggle');

    menuToggles.forEach(toggle => {
        const subMenu = toggle.nextElementSibling;
        if (!subMenu || !subMenu.classList.contains('sub-menu')) return;
        
        const subMenuLinks = subMenu.querySelectorAll('a');
        let isCurrentMenuActive = false;

        subMenuLinks.forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').split('/').pop() === currentPage) {
                link.classList.add('active');
                isCurrentMenuActive = true;
            }
        });

        if (isCurrentMenuActive) {
            toggle.classList.add('active');
            subMenu.style.display = 'block';
        }

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggle.classList.toggle('active');
            const subMenuToToggle = toggle.nextElementSibling;
            if (subMenuToToggle.style.display === 'block') {
                subMenuToToggle.style.display = 'none';
            } else {
                subMenuToToggle.style.display = 'block';
            }
        });
    });

    // For non-group menus
    const singleLinks = document.querySelectorAll('.sidebar > a:not(.menu-toggle)');
    singleLinks.forEach(link => {
      if (link.getAttribute('href') && link.getAttribute('href').split('/').pop() === currentPage) {
        link.classList.add('active');
      }
    })
} 