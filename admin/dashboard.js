import { app } from "../scripts/firebase-init.js";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  await renderStats();
  await renderRecentUsers();
  await renderRecentReports();
});

async function renderStats() {
  // 총 사용자 수, 오늘 가입, 활성 사용자(임시: 전체), 신고 건수
  const usersSnap = await getDocs(collection(db, "users"));
  const reportsSnap = await getDocs(collection(db, "reports"));
  const now = new Date();
  let todaySignup = 0;
  let activeUser = 0;
  usersSnap.forEach(doc => {
    const data = doc.data();
    if (data.createdAt) {
      const created = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
      if (
        created.getFullYear() === now.getFullYear() &&
        created.getMonth() === now.getMonth() &&
        created.getDate() === now.getDate()
      ) {
        todaySignup++;
      }
    }
    // 활성 사용자: 임시로 전체로 계산
    activeUser++;
  });
  document.querySelectorAll('.card-value')[0].textContent = usersSnap.size;
  document.querySelectorAll('.card-value')[1].textContent = activeUser;
  document.querySelectorAll('.card-value')[2].textContent = todaySignup;
  document.querySelectorAll('.card-value')[3].textContent = reportsSnap.size;
}

async function renderRecentUsers() {
  const usersQ = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(3));
  const usersSnap = await getDocs(usersQ);
  const tbody = document.querySelector('#recent-users-tbody');
  tbody.innerHTML = '';
  usersSnap.forEach(doc => {
    const data = doc.data();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${data.nickname || '-'}</td>
      <td>${data.email || '-'}</td>
      <td>${formatDate(data.createdAt)}</td>
      <td>${data.status || '활성'}</td>
    `;
    tbody.appendChild(tr);
  });
}

async function renderRecentReports() {
  const reportsQ = query(collection(db, "reports"), orderBy("createdAt", "desc"), limit(2));
  const reportsSnap = await getDocs(reportsQ);
  const tbody = document.querySelector('#recent-reports-tbody');
  tbody.innerHTML = '';
  reportsSnap.forEach(doc => {
    const data = doc.data();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${data.reporter || '-'}</td>
      <td>${data.target || '-'}</td>
      <td>${data.reason || '-'}</td>
      <td>${formatDateTime(data.createdAt)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function formatDate(ts) {
  if (!ts) return '-';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function formatDateTime(ts) {
  if (!ts) return '-';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
} 