import { API_URL } from '../config/config';

export const iniciarSesion = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Error en el inicio de sesión');
    return await response.json();
  } catch (error) {
    console.error('Error en iniciarSesion:', error);
    throw error;
  }
};