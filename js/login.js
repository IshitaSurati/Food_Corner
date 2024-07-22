import { navbar } from '../components/navbar.js';
import { loginUser } from '../api/user.api.js';
document.getElementById('navbar').innerHTML=navbar();
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = await loginUser(email, password);
  if (user) {
    alert('Login successful!');
    window.location.href = '/';
  } else {
    alert('Invalid email or password.');
  }
});
