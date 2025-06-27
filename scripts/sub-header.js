function loadSubHeader() {
  fetch("/includes/sub-header.html")
    .then(res => res.text())
    .then(data => {
      // 헤더 바로 아래에 삽입
      const header = document.querySelector('header');
      if (header) {
        header.insertAdjacentHTML('afterend', data);
      } else {
        // fallback: body 맨 앞에 삽입
        document.body.insertAdjacentHTML('afterbegin', data);
      }
    });
}
window.addEventListener("DOMContentLoaded", loadSubHeader); 