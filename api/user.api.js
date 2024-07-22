export const createUser = async (user) => {
  const response = await fetch('http://localhost:2003/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return await response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:2003/users');
  const users = await response.json();
  return users.find(user => user.email === email && user.password === password);
};
