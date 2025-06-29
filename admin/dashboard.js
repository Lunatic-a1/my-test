// admin/dashboard.js
// TODO: Firebase Auth로 운영자 권한 체크 후, 운영자가 아니면 접근 차단(리다이렉트)
// TODO: 각 섹션(통계, 유저, 웹툰, 신고) 데이터 로딩 및 관리 기능 구현

console.log('관리자 대시보드 JS 로드됨');

// 예시: 운영자 권한 체크 뼈대
// import { auth } from '../scripts/firebase-init.js';
// import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
// onAuthStateChanged(auth, user => {
//   if (!user || !user.isAdmin) {
//     alert('운영자만 접근 가능합니다.');
//     window.location.href = '/index.html';
//   }
// }); 

import { getFirestore, collection, getDocs, getCountFromServer, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
const db = getFirestore();

// 1. 사이트 통계
async function loadSiteStats() {
  try {
    const userCount = (await getCountFromServer(collection(db, "users"))).data().count;
    const comicCount = (await getCountFromServer(collection(db, "comics"))).data().count;
    const reportCount = (await getCountFromServer(collection(db, "reports"))).data().count;
    document.getElementById("site-stats").innerHTML = `
      <ul>
        <li>전체 유저: ${userCount}명</li>
        <li>전체 웹툰: ${comicCount}개</li>
        <li>전체 신고/문의: ${reportCount}건</li>
      </ul>
    `;
  } catch (e) {
    document.getElementById("site-stats").textContent = "통계 정보를 불러올 수 없습니다.";
  }
}

// 2. 유저 관리
async function loadUserList() {
  try {
    const snap = await getDocs(collection(db, "users"));
    let html = "<table><tr><th>이메일</th><th>닉네임</th><th>권한</th><th>관리</th></tr>";
    snap.forEach(docu => {
      const d = docu.data();
      html += `<tr>
        <td>${d.email || "-"}</td>
        <td>${d.nickname || "-"}</td>
        <td>${d.isAdmin ? "운영자" : "일반"}</td>
        <td>
          ${d.isAdmin ? "" : `<button onclick=\"makeAdmin('${docu.id}')\">운영자 지정</button>`}
          <button onclick=\"deleteUser('${docu.id}')\">강제탈퇴</button>
        </td>
      </tr>`;
    });
    html += "</table>";
    document.getElementById("user-list").innerHTML = html;
  } catch (e) {
    document.getElementById("user-list").textContent = "유저 정보를 불러올 수 없습니다.";
  }
}
window.makeAdmin = async (uid) => {
  if (!confirm("정말로 운영자로 지정하시겠습니까?")) return;
  await updateDoc(doc(db, "users", uid), { isAdmin: true });
  loadUserList();
};
window.deleteUser = async (uid) => {
  if (!confirm("정말로 강제 탈퇴시키겠습니까?")) return;
  await deleteDoc(doc(db, "users", uid));
  loadUserList();
};

// 3. 웹툰 관리
async function loadComicList() {
  try {
    const snap = await getDocs(collection(db, "comics"));
    let html = "<table><tr><th>제목</th><th>작가</th><th>상태</th><th>관리</th></tr>";
    snap.forEach(docu => {
      const d = docu.data();
      html += `<tr>
        <td>${d.title || "-"}</td>
        <td>${d.author || "-"}</td>
        <td>${d.status || "공개"}</td>
        <td><button onclick=\"deleteComic('${docu.id}')\">삭제</button></td>
      </tr>`;
    });
    html += "</table>";
    document.getElementById("comic-list").innerHTML = html;
  } catch (e) {
    document.getElementById("comic-list").textContent = "웹툰 정보를 불러올 수 없습니다.";
  }
}
window.deleteComic = async (cid) => {
  if (!confirm("정말로 삭제하시겠습니까?")) return;
  await deleteDoc(doc(db, "comics", cid));
  loadComicList();
};

// 4. 신고/문의 관리
async function loadReportList() {
  try {
    const snap = await getDocs(collection(db, "reports"));
    let html = "<table><tr><th>신고자</th><th>대상</th><th>사유</th><th>상태</th><th>관리</th></tr>";
    snap.forEach(docu => {
      const d = docu.data();
      html += `<tr>
        <td>${d.reporter || "-"}</td>
        <td>${d.target || "-"}</td>
        <td>${d.reason || "-"}</td>
        <td>${d.status || "대기"}</td>
        <td><button onclick=\"markReportDone('${docu.id}')\">처리완료</button></td>
      </tr>`;
    });
    html += "</table>";
    document.getElementById("report-list").innerHTML = html;
  } catch (e) {
    document.getElementById("report-list").textContent = "신고/문의 정보를 불러올 수 없습니다.";
  }
}
window.markReportDone = async (rid) => {
  if (!confirm("정말로 처리완료로 변경하시겠습니까?")) return;
  await updateDoc(doc(db, "reports", rid), { status: "완료" });
  loadReportList();
};

// 페이지 진입 시 데이터 로드
window.addEventListener("DOMContentLoaded", () => {
  loadSiteStats();
  loadUserList();
  loadComicList();
  loadReportList();
}); 