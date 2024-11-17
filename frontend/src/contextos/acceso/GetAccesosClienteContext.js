import React, { createContext, useContext, useState } from 'react';
import axios from '../../api/axios';

const GetAccesosClienteContext = createContext();

export const useGetAccesosCliente = () => useContext(GetAccesosClienteContext);

export const GetAccesosClienteProvider = ({ children }) => {
  const [accesos, setAccesos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchAccesosCliente = async (clienteId) => {
    try {
      console.log(`Fetching accesos for clienteId: ${clienteId}`);
      const response = await axios.get(`/Accesos/accesos-cliente/${clienteId}`);
      if (response?.data) {
        setAccesos(response.data.data); // Actualiza el estado con los datos
        return response.data.data; // Devuelve los datos
      } else {
        console.error('Error: Respuesta inválida del servidor');
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error al obtener los accesos:', error);
      throw error; // Lanza el error para manejarlo externamente
    }
  };

  return (
    <GetAccesosClienteContext.Provider value={{ accesos, fetchAccesosCliente, loading, error }}>
      {children}
    </GetAccesosClienteContext.Provider>
  );
};