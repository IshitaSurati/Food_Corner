import { navbar } from '/components/navbar.js';
import { getUserByEmail } from '/api/user.api.js';
document.getElementById('navbar').innerHTML = navbar();


document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const users = await getUserByEmail(email);

  if (users.length && users[0].password === password) {
    window.location.href = '/index.html';
  } else {
    alert('Invalid email or password');
  }
});
