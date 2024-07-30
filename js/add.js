import { foodAPI } from '/api/food.api.js'; 
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbar.innerHTML = data;
        });

    const addFoodForm = document.getElementById('add-food-form');

    addFoodForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const rating = document.getElementById('rating').value;
        const categories = document.getElementById('categories').value;
        const image = document.getElementById('image').value;

        const response = await fetch(foodAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price, rating, categories, image })
        });

        if (response.ok) {
            alert('Food added successfully!');
            window.location.href = '/index.html';
        } else {
            alert('Failed to add food. Please try again.');
        }
    });
});
