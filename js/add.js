import { addFoodItem } from '../api/food.api.js';
import { navbar } from '../components/navbar.js';

document.getElementById('navbar').innerHTML = navbar();

document.getElementById('addFoodForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const rating = parseFloat(document.getElementById('rating').value);
  const category = document.getElementById('category').value;
  const image = document.getElementById('image').value;
  const deliveryTime = parseInt(document.getElementById('deliveryTime').value, 10);

  const newFoodItem = {
    title,
    description,
    price,
    rating,
    category,
    image,
    deliveryTime
  };

  try {
    await addFoodItem(newFoodItem);
    alert('Food item added successfully!');
    document.getElementById('addFoodForm').reset();
  } catch (error) {
    console.error('Error adding food item:', error);
    alert('Failed to add food item.');
  }
});
