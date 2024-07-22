import { navbar } from '../components/navbar.js';
import { createUser } from '../api/user.api.js';
document.getElementById('navbar').innerHTML=navbar();
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value
  };

  const result = await createUser(user);
  if (result) {
    alert('Signup successful!');
    window.location.href = '/pages/login.html';
  } else {
    alert('Signup failed. Please try again.');
  }
});
