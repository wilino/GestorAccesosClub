import React, { createContext, useContext, useState } from 'react';
import axios from '../../api/axios';

const UpdateClienteContext = createContext();

export const useUpdateCliente = () => useContext(UpdateClienteContext);

export const UpdateClienteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateCliente = async (clienteData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const requestBody = {
        clienteId: clienteData.clienteId,
        nombre: clienteData.nombre,
        email: clienteData.email,
        direccion: clienteData.direccion,
        telefono: clienteData.telefono,
        estado: clienteData.estado,
        tipoCliente: clienteData.tipoCliente,
      };

      const response = await axios.put('/Clientes', requestBody);

      // Verifica la estructura esperada de la respuesta
      if (!response.data.hasErrors) {
        const message = response.data.message || 'Cliente actualizado correctamente';
        setSuccess(message);
        return { success: true, message, data: response.data.data };
      } else {
        const errorMessage = response.data.errors?.[0] || 'Error al actualizar el cliente';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar el cliente';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UpdateClienteContext.Provider value={{ updateCliente, loading, error, success }}>
      {children}
    </UpdateClienteContext.Provider>
  );
};