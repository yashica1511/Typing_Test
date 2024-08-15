import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
  try {
    await axios.post(`${API_URL}/register`, userData);
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
