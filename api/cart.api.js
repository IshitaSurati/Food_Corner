const API_URL = 'http://localhost:2025/cart';

export const getCart = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addToCart = async (item) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  });
  return response.json();
};

export const updateCartItem = async (id, item) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  });
  return response.json();
};

export const removeFromCart = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
};
