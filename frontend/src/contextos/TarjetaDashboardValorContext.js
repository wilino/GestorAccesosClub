import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const TarjetaDashboardValorContext = createContext();

export const useTarjetaDashboardValor = () => useContext(TarjetaDashboardValorContext);

export const TarjetaDashboardValorProvider = ({ children }) => {
  const [valores, setValores] = useState({});
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const fetchValor = async (key, endpoint) => {
    try {
      setCargando(true);
      const response = await axios.get(endpoint);

      if (response.data.hasErrors) {
        throw new Error(response.data.message || `Error al cargar ${key}`);
      }

      const nuevoValor = response.data.data;
      
      // Solo actualiza el estado si el nuevo valor es diferente del valor actual
      setValores((prevValores) => {
        if (prevValores[key] !== nuevoValor) {
          return { ...prevValores, [key]: nuevoValor };
        }
        return prevValores; // Si el valor no cambió, no se actualiza el estado
      });

      setErrores((prev) => ({ ...prev, [key]: null }));
    } catch (error) {
      setErrores((prev) => ({ ...prev, [key]: error.message || 'Error desconocido' }));
    } finally {
      setCargando(false);
    }
  };

  const startFetching = (key, endpoint, interval = 60000) => {
    fetchValor(key, endpoint); // Primera carga
    const intervalId = setInterval(() => fetchValor(key, endpoint), interval);

    return () => clearInterval(intervalId); // Limpia el intervalo
  };

  return (
    <TarjetaDashboardValorContext.Provider value={{ valores, errores, cargando, startFetching }}>
      {children}
    </TarjetaDashboardValorContext.Provider>
  );
};