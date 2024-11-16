import React, { createContext, useContext, useState } from 'react';
import axios from '../api/axios';

const DeleteUsuarioContext = createContext();

export const useDeleteUsuario = () => useContext(DeleteUsuarioContext);

export const DeleteUsuarioProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUsuario = async (usuarioId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/Usuarios/${usuarioId}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar el usuario');
      setLoading(false);
      return false;
    }
  };

  return (
    <DeleteUsuarioContext.Provider value={{ deleteUsuario, loading, error }}>
      {children}
    </DeleteUsuarioContext.Provider>
  );
};