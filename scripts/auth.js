// 임시 사용자 정보 (나중에 Firebase Auth 연동 가능)
const user = {
    isLoggedIn: true,
    name: "홍길동"
  };
  
  function updateAuthUI() {
    const loginBtn = document.getElementById("login-btn");
    const profileArea = document.getElementById("user-profile");
    const userName = document.getElementById("user-name");
  
    if (user.isLoggedIn) {
      loginBtn.style.display = "none";
      profileArea.style.display = "inline-block";
      userName.innerText = user.name;
    } else {
      loginBtn.style.display = "inline-block";
      profileArea.style.display = "none";
    }
  }
  
  window.addEventListener("DOMContentLoaded", updateAuthUI);
  