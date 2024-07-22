import { navbar } from '../components/navbar.js';
import { getFoodItems } from '../api/food.api.js';
import { getGeolocation } from '../components/helper.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('navbar').innerHTML = navbar();

  const populateFilters = (foodItems) => {
    const uniqueCategories = [...new Set(foodItems.map(item => item.category))];
    const categoryFilter = document.getElementById('categoryFilter');

    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  };

  const displayFoodItems = (items) => {
    const foodContainer = document.getElementById('foodContainer');
    foodContainer.innerHTML = items.map(item => `
      <div class="card" style="width: 18rem; margin-bottom: 20px;">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">Price: $${item.price}</p>
          <p class="card-text">Rating: ${item.rating}</p>
          <p class="card-text">Delivery Time: ${item.deliveryTime} minutes</p>
          <a href="#" class="btn btn-primary add-to-cart" data-id="${item.id}">Add to Cart</a>
        </div>
      </div>
    `).join('');
  };

  const filterAndSort = (foodItems) => {
    const selectedCategory = document.getElementById('categoryFilter').value || '';
    const sortBy = document.getElementById('sortBy').value || '';
    const searchTerm = document.getElementById('searchInput').value.toLowerCase() || '';

    let filteredItems = foodItems.filter(item =>
      (selectedCategory === '' || item.category === selectedCategory) &&
      (searchTerm === '' || item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm))
    );

    if (sortBy === 'priceAsc') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      filteredItems.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filteredItems.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTimeAsc') {
      filteredItems.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else if (sortBy === 'deliveryTimeDesc') {
      filteredItems.sort((a, b) => b.deliveryTime - a.deliveryTime);
    }

    displayFoodItems(filteredItems);
  };

  const loadFoodItems = async () => {
    try {
      const foodItems = await getFoodItems();
      populateFilters(foodItems);
      filterAndSort(foodItems);
    } catch (error) {
      console.error('Error loading food items:', error);
    }
  };

  const handleSearch = async () => {
    await loadFoodItems();
  };

  const handleLocationChange = async () => {
    const location = document.getElementById('locationInput').value;
    const geolocation = await getGeolocation(location);
    if (!geolocation) {
      alert('Location not found');
      return;
    }

    const foodItems = await getFoodItems();
    const filteredItems = foodItems.filter(item => item.deliveryLocation === geolocation);
    displayFoodItems(filteredItems);
  };

  document.getElementById('searchButton').addEventListener('click', async () => {
    await handleSearch();
    await handleLocationChange();
  });

  document.getElementById('categoryFilter').addEventListener('change', handleSearch);
  document.getElementById('sortBy').addEventListener('change', handleSearch);
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  document.getElementById('locationInput').addEventListener('change', handleLocationChange);

  // Initial load
  handleSearch();
});
