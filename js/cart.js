import { getCart, updateCartItem, removeFromCart } from '../api/cart.api.js';
import { navbar } from '../components/navbar.js';

document.getElementById('navbar').innerHTML = navbar();

const displayCart = async () => {
  const cart = await getCart();
  const container = document.getElementById('cartContainer');
  
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  
  container.innerHTML = cart.map(item => `
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${item.image || 'default.jpg'}" class="img-fluid rounded-start" alt="${item.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text">$${item.price}</p>
            <div class="d-flex align-items-center">
              <button class="btn btn-secondary me-2" data-id="${item.id}" data-action="decrement">-</button>
              <span id="quantity-${item.id}">${item.quantity}</span>
              <button class="btn btn-secondary ms-2" data-id="${item.id}" data-action="increment">+</button>
            </div>
            <button class="btn btn-danger mt-3" data-id="${item.id}" data-action="remove">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

// Update cart quantity or remove items
document.getElementById('cartContainer').addEventListener('click', async (e) => {
  const button = e.target;
  const action = button.dataset.action;
  const id = button.dataset.id;

  if (!id) return;

  if (action === 'increment') {
    const item = await updateCartItem(id, { action: 'increment' });
    document.getElementById(`quantity-${id}`).textContent = item.quantity;
  } else if (action === 'decrement') {
    const item = await updateCartItem(id, { action: 'decrement' });
    if (item.quantity <= 0) {
      await removeFromCart(id);
      displayCart();
    } else {
      document.getElementById(`quantity-${id}`).textContent = item.quantity;
    }
  } else if (action === 'remove') {
    await removeFromCart(id);
    displayCart();
  }
});

// Handle checkout button click
document.getElementById('checkoutButton').addEventListener('click', async () => {
  // Implement checkout logic here
  alert('Checkout functionality is not implemented yet.');
});

displayCart();
