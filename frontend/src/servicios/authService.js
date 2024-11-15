import axios from 'axios';

export const iniciarSesion = async ({ email, password }) => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data.token;
};