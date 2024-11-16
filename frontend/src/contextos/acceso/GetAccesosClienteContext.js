import React, { createContext, useContext, useState } from 'react';
import axios from '../../api/axios';

const GetAccesosClienteContext = createContext();

export const useGetAccesosCliente = () => useContext(GetAccesosClienteContext);

export const GetAccesosClienteProvider = ({ children }) => {
  const [accesos, setAccesos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccesosCliente = async (clienteId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/Accesos/accesos-cliente/${clienteId}`);
      const data = response.data?.data || [];
      setAccesos(data);
      return data; // Retorna los datos obtenidos
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener los accesos';
      setError(errorMessage);
      console.error(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <GetAccesosClienteContext.Provider value={{ accesos, fetchAccesosCliente, loading, error }}>
      {children}
    </GetAccesosClienteContext.Provider>
  );
};