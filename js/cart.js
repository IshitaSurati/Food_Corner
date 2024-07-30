import { cartAPI } from '/api/cart.api.js';

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbar.innerHTML = data;
        })
        .catch(error => console.error('Failed to load navbar:', error));

    const cartItemsContainer = document.getElementById('cart-items');

    const loadCartItems = async () => {
        const response = await fetch(cartAPI);
        const cart = await response.json();

        cartItemsContainer.innerHTML = '';
        cart.forEach(cartItem => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'card mb-4';
            cartItemElement.innerHTML = `
                <img src="${cartItem.image}" class="card-img-top" alt="${cartItem.name}">
                <div class="card-body">
                    <h5 class="card-title">${cartItem.name}</h5>
                    <p class="card-text"><strong>Price:</strong> $${cartItem.price}</p>
                    <p class="card-text"><strong>Quantity:</strong> ${cartItem.quantity}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${cartItem.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    };

    window.removeFromCart = async (foodId) => {
        await fetch(`${cartAPI}/${foodId}`, {
            method: 'DELETE'
        });
        alert('Item removed from cart!');
        loadCartItems();
    };

    window.checkout = async () => {
        const cart = await fetch(cartAPI);
        const cartItems = await cart.json();
        if (cartItems.length > 0) {
            await Promise.all(cartItems.map(item => fetch(`${cartAPI}/${item.id}`, {
                method: 'DELETE'
            })));
            alert('Checkout successful!');
        } else {
            alert('Your cart is empty!');
        }
        window.location.href = '/index.html';
    };

    loadCartItems();
});
