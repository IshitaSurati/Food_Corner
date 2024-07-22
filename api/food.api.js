const API_URL = 'http://localhost:2025/food';

export const getFoodByCity = async (city) => {
  const response = await fetch(`${API_URL}?city=${city}`);
  return response.json();
};

export const addFood = async (food) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(food)
  });
  return response.json();
};

export const getAllFood = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
