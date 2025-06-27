import { auth } from "./firebase-init.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const form = document.getElementById('signup-form');
const messageDiv = document.getElementById('signup-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  const password2 = form.password2.value;
  const nickname = form.nickname.value;
  if (password !== password2) {
    messageDiv.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      messageDiv.textContent = '회원가입 성공! 로그인 페이지로 이동합니다.';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageDiv.textContent = '회원가입 실패: ' + errorMessage;
    });
}); 