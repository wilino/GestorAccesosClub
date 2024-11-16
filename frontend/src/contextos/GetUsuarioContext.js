import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const GetUsuarioContext = createContext();

export const useUsuarios = () => useContext(GetUsuarioContext);

export const GetUsuarioProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('/Usuarios');
      setUsuarios(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener usuarios');
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <GetUsuarioContext.Provider value={{ usuarios, loading, error, fetchUsuarios }}>
      {children}
    </GetUsuarioContext.Provider>
  );
};