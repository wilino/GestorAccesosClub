import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../api/axios';

const GetClienteContext = createContext();

export const useGetCliente = () => useContext(GetClienteContext);

export const GetClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/Clientes');
      setClientes(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener los clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <GetClienteContext.Provider value={{ clientes, fetchClientes, loading, error }}>
      {children}
    </GetClienteContext.Provider>
  );
};