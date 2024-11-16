import React, { createContext, useContext, useState } from 'react';
import axios from '../api/axios';

const CreateUsuarioContext = createContext();

export const useCreateUsuario = () => useContext(CreateUsuarioContext);

export const CreateUsuarioProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUsuario = async (usuarioData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/Usuarios', usuarioData);

      // Retorna la estructura esperada para manejar en el componente
      return {
        success: !response.data.hasErrors,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error al crear el usuario',
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateUsuarioContext.Provider value={{ createUsuario, loading, error }}>
      {children}
    </CreateUsuarioContext.Provider>
  );
};