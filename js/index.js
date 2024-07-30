import { foodAPI } from '/api/food.api.js'; 

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbar.innerHTML = data;
        })
        .catch(error => console.error('Failed to load navbar:', error));

    const foodItemsContainer = document.getElementById('food-items');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const sortSelect = document.getElementById('sort');

    const loadFoodItems = async () => {
        try {
            const response = await fetch(foodAPI);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let foodItems = await response.json();

        
            localStorage.setItem('foodItems', JSON.stringify(foodItems));

            const searchValue = searchInput.value.toLowerCase();
            const filterValue = filterSelect.value;
            const sortValue = sortSelect.value;

            if (searchValue) {
                foodItems = foodItems.filter(item => item.name.toLowerCase().includes(searchValue));
            }

            if (filterValue) {
                foodItems = foodItems.filter(item => item.categories === filterValue);
            }

            if (sortValue === 'price') {
                foodItems.sort((a, b) => a.price - b.price);
            } else if (sortValue === 'rating') {
                foodItems.sort((a, b) => b.rating - a.rating);
            }

            foodItemsContainer.innerHTML = '';
            foodItems.forEach(item => {
                const foodItem = document.createElement('div');
                foodItem.className = 'col-md-4';
                foodItem.innerHTML = `
                    <div class="card mb-4">
                        <img src="${item.image || 'default.jpg'}" class="card-img-top" alt="${item.name || 'No Image'}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name || 'Unknown Item'}</h5>
                            <p class="card-text">${item.description || 'No description available'}</p>
                            <p class="card-text"><strong>Price:</strong> $${item.price || '0.00'}</p>
                            <p class="card-text"><strong>Rating:</strong> ${item.rating || 'Not rated'}</p>
                            <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                        </div>
                    </div>
                `;
                foodItemsContainer.appendChild(foodItem);
            });
        } catch (error) {
            console.error('Failed to load food items:', error);
        }
    };

    searchInput.addEventListener('input', loadFoodItems);
    filterSelect.addEventListener('change', loadFoodItems);
    sortSelect.addEventListener('change', loadFoodItems);

    loadFoodItems();
});

window.addToCart = function(foodId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const foodItems = JSON.parse(localStorage.getItem('foodItems')) || []; // Ensure foodItems are available

    const foodItem = foodItems.find(item => item.id === foodId);
    if (!foodItem) {
        alert('Food item not found!');
        return;
    }

    const existingItem = cart.find(item => item.id === foodId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...foodItem, quantity: 1 }); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
};


const getCityName = async (lat, lng) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.address.city;
};

const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const city = await getCityName(lat, lng);
        console.log(city);
    });
};

fetchUserLocation();
