import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdc-uOw-RkwioP-GFf1BouVu4JBkfGFnU",
  authDomain: "login-4cb47.firebaseapp.com",
  projectId: "login-4cb47",
  storageBucket: "login-4cb47.firebasestorage.app",
  messagingSenderId: "866437023451",
  appId: "1:866437023451:web:c41f1a1b07accf50ae2efe",
  measurementId: "G-EW136C5LGV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const form = document.getElementById('signup-form');
const messageDiv = document.getElementById('signup-message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      messageDiv.textContent = '회원가입 성공!';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageDiv.textContent = '회원가입 실패: ' + errorMessage;
    });
}); 