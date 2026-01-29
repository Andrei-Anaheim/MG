
// ===== АВТОЛОГИН =====
if (localStorage.getItem('isLoggedIn') === 'true') {
  window.location.href = 'start.html'
}

// ===== ФОРМА =====
const form = document.querySelector('.login-box');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
        const formData = new FormData();
        formData.append('login', login);
        formData.append('password', password);
        console.log('Отправка данных:', login, password);
        const response = await fetch('https://script.google.com/macros/s/AKfycbxKr6j8cXcFQQXZ0sPXbufW7M8dC4UJ0tyrL3sS3RaNAV7ifurkZNrr516pOGiWq99d/exec',
            {
                method: 'POST',
                body: formData
            }
        );
    

      const result = await response.json();
        console.log('Ответ сервера (debug):', result);

      if (result.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', login);
        showAuthorized();
      } else {
        alert('Неверный логин или пароль');
      }
    } catch (err) {
      alert('Ошибка соединения');
    }
  });
}

// ===== АВТОРИЗОВАННЫЙ ВИД =====
function showAuthorized() {
  document.querySelector('.login-container').innerHTML = `
    <div class="login-box">
      <h2>Добро пожаловать 👋</h2>
      <p class="redirect-text">Осуществляется проверка разрешений. Подождите несколько секунд</p>
      <button id="logout">Выйти</button>
    </div>
  `;
    const redirectTimer = setTimeout(() => {
    window.location.href = 'start.html';
    }, 3000); 

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    location.reload();
  });
}
