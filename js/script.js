const menuButton = document.querySelector('.menu-button');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const inquiryForm = document.querySelector('#inquiryForm');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const subject = `[리전인사이트 연구문의] ${data.get('subject')}`;
    const body = [
      `이름: ${data.get('name')}`,
      `회신 이메일: ${data.get('email')}`,
      '',
      String(data.get('message'))
    ].join('\n');
    window.location.href = `mailto:irie@irie.re.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
