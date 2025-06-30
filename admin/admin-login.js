import { auth } from "../scripts/firebase-init.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const db = getFirestore();

const form = document.getElementById("admin-login-form");
const messageDiv = document.getElementById("admin-login-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form["admin-email"].value;
  const password = form["admin-password"].value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Firestore에서 isAdmin 확인
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists() || !userDoc.data().isAdmin) {
      messageDiv.textContent = "운영자 권한이 없습니다.";
      await signOut(auth);
      return;
    }
    // 성공: 대시보드로 이동
    window.location.href = "dashboard.html";
  } catch (error) {
    messageDiv.textContent = "로그인 실패: " + error.message;
  }
}); 