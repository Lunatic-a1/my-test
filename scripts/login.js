import { auth } from "./firebase-init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// 동적 스타일 추가
const loginStyle = `
  #login-form button {
    padding: 8px 18px;
    border: 1px solid #888;
    border-radius: 4px;
    background: #fff;
    color: #333;
    font-size: 15px;
    cursor: pointer;
    margin-top: 10px;
  }
  #login-form button:hover {
    background: #f3f3f3;
  }
  .login-link-btn {
    display: inline-block;
    padding: 8px 18px;
    border: 1px solid #888;
    border-radius: 4px;
    background: #fff;
    color: #333;
    text-decoration: none;
    font-size: 15px;
    margin-top: 16px;
  }
  .login-link-btn:hover {
    background: #f3f3f3;
  }
`;
const styleTag = document.createElement('style');
styleTag.innerHTML = loginStyle;
document.head.appendChild(styleTag);

const form = document.getElementById('login-form');
const messageDiv = document.getElementById('login-message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      messageDiv.textContent = '로그인 성공! 홈으로 이동합니다.';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageDiv.textContent = '로그인 실패: ' + errorMessage;
    });
}); 