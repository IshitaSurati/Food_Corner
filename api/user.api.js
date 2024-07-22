const API_URL = 'http://localhost:2025/user';

export const getUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}?email=${email}`);
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return response.json();
};
