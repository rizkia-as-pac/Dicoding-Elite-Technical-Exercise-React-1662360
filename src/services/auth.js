const baseURL = 'https://forum-api.dicoding.dev/v1';

const login = (data) => {
  return fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const register = (data) => {
  return fetch(`${baseURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const getUser = (token) => {
  return fetch(`${baseURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AuthService = { login, register, getUser };

export default AuthService;
