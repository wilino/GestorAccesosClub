import React, { createContext, useContext, useState } from 'react';
import axios from '../api/axios';

const UpdateUsuarioContext = createContext();

export const useUpdateUsuario = () => useContext(UpdateUsuarioContext);

export const UpdateUsuarioProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateUsuario = async (usuarioData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const requestBody = {
        usuarioId: usuarioData.usuarioId,
        nombre: usuarioData.nombre,
        email: usuarioData.email,
        rolId: usuarioData.rolId,
        contraseña: usuarioData.contraseña,
      };

      const response = await axios.put('/Usuarios', requestBody);

      // Verifica la estructura esperada de la respuesta
      if (!response.data.hasErrors) {
        const message = response.data.message || 'Usuario actualizado correctamente';
        setSuccess(message);
        return { success: true, message, data: response.data.data };
      } else {
        const errorMessage = response.data.errors?.[0] || 'Error al actualizar el usuario';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar el usuario';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UpdateUsuarioContext.Provider value={{ updateUsuario, loading, error, success }}>
      {children}
    </UpdateUsuarioContext.Provider>
  );
};