// Firebase 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔧 너의 Firebase 프로젝트 설정값으로 수정해야 함
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAdc-uOw-RkwioP-GFf1BouVu4JBkfGFnU",
    authDomain: "login-4cb47.firebaseapp.com",
    projectId: "login-4cb47",
    storageBucket: "login-4cb47.firebasestorage.app",
    messagingSenderId: "866437023451",
    appId: "1:866437023451:web:c41f1a1b07accf50ae2efe",
    measurementId: "G-EW136C5LGV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(1)
  })

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
</script>


// 📌 회원가입 폼 제출 처리
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("회원가입이 완료되었습니다!");
      window.location.href = "/index.html";
    })
    .catch((error) => {
      console.error("회원가입 에러:", error);
      alert("회원가입 실패: " + error.message);
    });
});
