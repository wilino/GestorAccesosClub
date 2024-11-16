// src/contextos/DashboardContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [data, setData] = useState({
    totalAccesos: null,
    totalClientes: null,
    totalUsuarios: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [accesosRes, clientesRes, usuariosRes] = await Promise.all([
        axios.get('/Dashboard/totalAccesos'),
        axios.get('/Dashboard/totalClientes'),
        axios.get('/Dashboard/totalUsuarios'),
      ]);

      // Actualiza solo los valores de cada campo sin afectar el resto del estado
      setData((prevData) => ({
        ...prevData,
        totalAccesos: accesosRes.data.data,
        totalClientes: clientesRes.data.data,
        totalUsuarios: usuariosRes.data.data,
      }));
    } catch (err) {
      console.error('Error al obtener datos del dashboard:', err);
      setError(err.message || 'Error desconocido al cargar el dashboard.');
    } finally {
      setLoading(false);
    }
  };

  // Ejecuta la función inicialmente y cada minuto para actualizar solo los números
  useEffect(() => {
    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 60000); // Actualiza cada 60 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  return (
    <DashboardContext.Provider value={{ data, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
};