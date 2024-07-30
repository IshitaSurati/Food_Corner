document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');

    const loadCartItems = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

        cartItemsContainer.innerHTML = '';
        cart.forEach(cartItem => {
            const foodItem = foodItems.find(item => item.id === cartItem.id) || {};

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'card mb-4';
            cartItemElement.innerHTML = `
                <img src="${foodItem.image || 'default.jpg'}" class="card-img-top" alt="${foodItem.name || 'No Image'}">
                <div class="card-body">
                    <h5 class="card-title">${foodItem.name || 'Unknown Item'}</h5>
                    <p class="card-text"><strong>Price:</strong> $${foodItem.price || '0.00'}</p>
                    <p class="card-text"><strong>Quantity:</strong> ${cartItem.quantity || '0'}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${foodItem.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    };

    window.removeFromCart = (foodId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== foodId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item removed from cart!');
        loadCartItems();
    };

    window.checkout = () => {
        alert('Checkout successful!');
        localStorage.removeItem('cart');
        window.location.href = '/index.html';
    };

    loadCartItems();
});
