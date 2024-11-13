// src/servicios/eventosService.js
import { API_URL } from '../config/config';

export const obtenerEventos = async () => {
  try {
    const response = await fetch(`${API_URL}/eventos`);
    if (!response.ok) throw new Error('Error al obtener eventos');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerEventos:', error);
    throw error;
  }
};

export const obtenerEventoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/eventos/${id}`);
    if (!response.ok) throw new Error('Error al obtener el evento');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerEventoPorId:', error);
    throw error;
  }
};