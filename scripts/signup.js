import { app, auth } from "./firebase-init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// 동적 스타일 추가
const signupStyle = `
  #signup-form button {
    padding: 8px 18px;
    border: 1px solid #888;
    border-radius: 4px;
    background: #fff;
    color: #333;
    font-size: 15px;
    cursor: pointer;
    margin-top: 10px;
  }
  #signup-form button:hover {
    background: #f3f3f3;
  }
  .signup-link-btn {
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
  .signup-link-btn:hover {
    background: #f3f3f3;
  }
  #already-joined-message {
    margin-top: 12px;
    color: #d00;
    font-weight: bold;
  }
`;
const styleTag = document.createElement('style');
styleTag.innerHTML = signupStyle;
document.head.appendChild(styleTag);

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
    await createUserWithEmailAndPassword(auth, email, password);
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