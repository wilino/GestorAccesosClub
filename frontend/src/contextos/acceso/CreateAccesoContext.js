import React, { createContext, useContext, useState } from 'react';
import axios from '../../api/axios';

const CreateAccesoContext = createContext();

export const useCreateAcceso = () => useContext(CreateAccesoContext);

export const CreateAccesoProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAcceso = async ({ clienteId, tipoAcceso, fechaAcceso }) => {
    setLoading(true);
    setError(null);

    try {
      const body = {
        clienteId,
        tipoAcceso,
        fechaAcceso, // Asegúrate de enviar la fecha en formato ISO como en el body proporcionado
      };

      const response = await axios.post('/Accesos', body);

      if (response.data && !response.data.hasErrors) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data, // Datos del nuevo acceso
        };
      }

      return {
        success: false,
        message: response.data.errors[0] || 'Error al crear el acceso',
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error al crear el acceso',
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateAccesoContext.Provider value={{ createAcceso, loading, error }}>
      {children}
    </CreateAccesoContext.Provider>
  );
};