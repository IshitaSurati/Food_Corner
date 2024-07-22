import { navbar } from '/components/navbar.js';
import { createUser } from '/api/user.api.js';
document.getElementById('navbar').innerHTML = navbar();
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value
  };

  await createUser(user);
  window.location.href = '/pages/login.html';
});
