import { app, auth } from "./firebase-init.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const db = getFirestore(app);

// 중복되지 않는 8자리 숫자 ID 생성 함수
async function generateUniqueUserId() {
  const userIdsSnapshot = await getDocs(collection(db, "users"));
  const existingIds = new Set();
  userIdsSnapshot.forEach(doc => {
    const data = doc.data();
    if (data.userId) existingIds.add(data.userId);
  });
  let newId;
  do {
    newId = Math.floor(10000000 + Math.random() * 90000000).toString();
  } while (existingIds.has(newId));
  return newId;
}

const form = document.getElementById('signup-form');
const messageDiv = document.getElementById('signup-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  const password2 = form.password2.value;
  const nickname = form.nickname.value;
  if (password !== password2) {
    messageDiv.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // 중복되지 않는 8자리 숫자 ID 생성
    const uniqueUserId = await generateUniqueUserId();
    // Firestore에 유저 정보 저장
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      userId: uniqueUserId,
      nickname: nickname,
      createdAt: new Date()
    });
    messageDiv.textContent = '회원가입 성공! 로그인 페이지로 이동합니다.';
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    messageDiv.textContent = '회원가입 실패: ' + errorMessage;
  }
}); 