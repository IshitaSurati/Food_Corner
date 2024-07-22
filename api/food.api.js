const API_URL = 'http://localhost:2003/food';

export const getFoodItems = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
};

export const addFoodItem = async (foodItem) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(foodItem)
    });
    if (!response.ok) {
      throw new Error('Failed to add food item');
    }
  } catch (error) {
    console.error('Error adding food item:', error);
    throw error;
  }
};
