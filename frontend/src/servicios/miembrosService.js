// src/servicios/miembrosService.js
import { API_URL } from '../config/config';

export const obtenerMiembros = async () => {
  try {
    const response = await fetch(`${API_URL}/miembros`);
    if (!response.ok) throw new Error('Error al obtener miembros');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerMiembros:', error);
    throw error;
  }
};

export const obtenerMiembroPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/miembros/${id}`);
    if (!response.ok) throw new Error('Error al obtener el miembro');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerMiembroPorId:', error);
    throw error;
  }
};