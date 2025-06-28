function loadLayout() {
    // 헤더 불러오기
    fetch("includes/header.html")
      .then(res => res.text())
      .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
      });
  
    // 푸터 불러오기
    fetch("includes/footer.html")
      .then(res => res.text())
      .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
      });
  }
  
  window.addEventListener("DOMContentLoaded", loadLayout);
  