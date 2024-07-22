import { navbar } from '/components/navbar.js';
import { getAllFood, getFoodByCity } from '/api/food.api.js';

document.getElementById('navbar').innerHTML = navbar();

const city = 'your_city'; 

const displayFood = async () => {
  const food = await getFoodByCity(city);
  const container = document.getElementById('foodContainer');
  container.innerHTML = food.map(item => `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <p class="card-text">$${item.price}</p>
        <button class="btn btn-primary" data-id="${item.id}">Add to Cart</button>
      </div>
    </div>
  `).join('');
};

displayFood();

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchValue = e.target.querySelector('input').value.toLowerCase();
  const food = await getAllFood();
  const filteredFood = food.filter(item => item.title.toLowerCase().includes(searchValue));
  const container = document.getElementById('foodContainer');
  container.innerHTML = filteredFood.map(item => `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <p class="card-text">$${item.price}</p>
        <button class="btn btn-primary" data-id="${item.id}">Add to Cart</button>
      </div>
    </div>
  `).join('');
});
