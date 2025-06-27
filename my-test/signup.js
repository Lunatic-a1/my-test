document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else {
      alert('회원가입이 완료되었습니다!');
      // 실제로는 여기에 서버로 폼 데이터를 전송하는 코드가 필요합니다.
      // 예: fetch('/signup', { method: 'POST', body: new FormData(signupForm) });
      signupForm.reset();
    }
  });
}); 