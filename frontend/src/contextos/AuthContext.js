import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const storedUsuario = localStorage.getItem('usuario');
    return storedUsuario ? JSON.parse(storedUsuario) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configurar token de Axios desde localStorage al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Función para obtener los datos del usuario
  const obtenerUsuario = async (email) => {
    const usuarioResponse = await axios.get(`/Usuarios/email/${email}`);
    return usuarioResponse.data.data;
  };

  // Función para iniciar sesión
  const iniciarSesion = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      // Solicita el token al backend
      const response = await axios.post('/Auth/login', { email, password });
      const { token } = response.data;

      // Guarda el token y configura los headers
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Obtiene los datos completos del usuario
      const usuarioData = await obtenerUsuario(email);
      setUsuario(usuarioData);
      localStorage.setItem('usuario', JSON.stringify(usuarioData));

      setLoading(false);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error al iniciar sesión. Intente más tarde.'
      );
      setLoading(false);
      return false;
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    delete axios.defaults.headers.common['Authorization'];
    setUsuario(null);
  };

  // Función para actualizar los datos del usuario
  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(nuevosDatos);
    localStorage.setItem('usuario', JSON.stringify(nuevosDatos));
  };

  // Interceptor para manejar errores de autenticación
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          cerrarSesion();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        actualizarUsuario,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};