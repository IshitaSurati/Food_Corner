import { navbar } from '/components/navbar.js';
import { addFood } from '../api/food.api.js';
document.getElementById('navbar').innerHTML = navbar();
document.getElementById('addFoodForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const food = {
    title: document.getElementById('foodTitle').value,
    description: document.getElementById('foodDescription').value,
    price: parseFloat(document.getElementById('foodPrice').value),
    city: document.getElementById('foodCity').value
  };

  await addFood(food);
  window.location.href = '/index.html';
});
