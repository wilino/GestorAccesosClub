import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from '../../api/axios';

const AccesoGetClienteContext = createContext();

export const useAccesoGetCliente = () => useContext(AccesoGetClienteContext);

export const AccesoGetClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false); // Controla si ya se realizó la llamada

  useEffect(() => {
    const fetchClientes = async () => {
      if (hasFetched.current) return; // Evita múltiples llamadas
      hasFetched.current = true; // Marca que ya se realizó la llamada

      try {
        setLoading(true);
        const response = await axios.get('/Clientes');
        setClientes(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al obtener los clientes');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []); // Sin dependencias dinámicas

  return (
    <AccesoGetClienteContext.Provider value={{ clientes, loading, error }}>
      {children}
    </AccesoGetClienteContext.Provider>
  );
};