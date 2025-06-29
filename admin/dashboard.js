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