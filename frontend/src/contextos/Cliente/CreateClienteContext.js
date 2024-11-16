import React, { createContext, useContext, useState } from 'react';
import axios from '../../api/axios';

const CreateClienteContext = createContext();

export const useCreateCliente = () => useContext(CreateClienteContext);

export const CreateClienteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCliente = async (clienteData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/Clientes', clienteData);

      // Retorna la estructura esperada para manejar en el componente
      return {
        success: !response.data.hasErrors,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error al crear el cliente',
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateClienteContext.Provider value={{ createCliente, loading, error }}>
      {children}
    </CreateClienteContext.Provider>
  );
};