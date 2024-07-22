const API_URL = 'http://localhost:2003/cart';

export const getCartItems = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addCartItem = async (cartItem) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItem)
    });
    if (!response.ok) {
      throw new Error('Failed to add cart item');
    }
  } catch (error) {
    console.error('Error adding cart item:', error);
    throw error;
  }
};

export const updateCartItem = async (id, quantity) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeCartItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to remove cart item');
    }
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};

export const checkout = async () => {
  try {
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error('Failed to checkout');
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};
