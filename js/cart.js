import { navbar } from '../components/navbar.js';
import { getCartItems, addCartItem, updateCartItem, removeCartItem, checkout } from '../api/cart.api.js';

document.getElementById('navbar').innerHTML = navbar();

const loadCart = async () => {
  const cartItems = await getCartItems();
  const cartContainer = document.getElementById('cartContainer');
  const totalPrice = document.getElementById('totalPrice');

  let total = 0;
  cartContainer.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <h5>${item.title}</h5>
      <p>Price: $${item.price}</p>
      <input type="number" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
      <button data-id="${item.id}" class="remove-button">Remove</button>
    </div>
  `).join('');

  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', async (e) => {
      const id = e.target.getAttribute('data-id');
      const quantity = e.target.value;
      await updateCartItem(id, quantity);
      loadCart();
    });
  });

  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      await removeCartItem(id);
      loadCart();
    });
  });

  total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.innerHTML = `Total Price: $${total}`;
};

document.getElementById('checkoutButton').addEventListener('click', async () => {
  await checkout();
  alert('Order placed successfully!');
  loadCart();
});

loadCart();
