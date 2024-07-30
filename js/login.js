document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbar.innerHTML = data;
        });

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch(`${usersAPI}?email=${email}&password=${password}`);
        const users = await response.json();

        if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('user', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = '/index.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
});
