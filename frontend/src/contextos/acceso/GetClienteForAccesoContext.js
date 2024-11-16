import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../../api/axios';

const GetClienteForAccesoContext = createContext();

export const useGetClienteForAcceso = () => useContext(GetClienteForAccesoContext);

export const GetClienteForAccesoProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClientesForAcceso = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/Clientes');
      const data = response.data.data || [];
      setClientes(data);

      // Guarda los datos en el localStorage específicamente para accesos
      localStorage.setItem('clientesForAcceso', JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener los clientes para accesos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Intenta cargar los clientes desde el localStorage al inicio
    const storedClientes = localStorage.getItem('clientesForAcceso');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
    } else {
      fetchClientesForAcceso();
    }
  }, []);

  return (
    <GetClienteForAccesoContext.Provider value={{ clientes, fetchClientesForAcceso, loading, error }}>
      {children}
    </GetClienteForAccesoContext.Provider>
  );
};