import React, { createContext, useContext, useState } from 'react';
import axios from '../../api/axios';

const DeleteClienteContext = createContext();

export const useDeleteCliente = () => useContext(DeleteClienteContext);

export const DeleteClienteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCliente = async (clienteId) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`/Clientes/${clienteId}`);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar el cliente');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteClienteContext.Provider value={{ deleteCliente, loading, error }}>
      {children}
    </DeleteClienteContext.Provider>
  );
};