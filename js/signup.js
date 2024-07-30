document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbar.innerHTML = data;
        });

    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
       
        const response = await fetch(usersAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, userType })
        });

        if (response.ok) {
            alert('Signup successful!');
            window.location.href = '/pages/login.html';
        } else {
            alert('Signup failed. Please try again.');
        }
    });
});
