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
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const now = new Date().getTime();

      if (now >= parseInt(expirationTime)) {
        cerrarSesion();
      } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        iniciarExpiracion(parseInt(expirationTime) - now);
      }
    }
  }, []);

  const iniciarExpiracion = (delay) => {
    setTimeout(() => {
      cerrarSesion();
      alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
    }, delay);
  };

  const calcularProximaExpiracion = () => {
    const now = new Date();
    const nextExpiration = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Math.ceil(now.getHours() / 6) * 6
    );

    return nextExpiration.getTime();
  };

  const obtenerUsuario = async (email) => {
    const usuarioResponse = await axios.get(`/Usuarios/email/${email}`);
    return usuarioResponse.data.data;
  };

  const iniciarSesion = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/Auth/login', { email, password });
      const { token } = response.data;

      const expirationTime = calcularProximaExpiracion();

      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', expirationTime.toString());
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const usuarioData = await obtenerUsuario(email);
      setUsuario(usuarioData);
      localStorage.setItem('usuario', JSON.stringify(usuarioData));

      iniciarExpiracion(expirationTime - new Date().getTime());

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

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tokenExpiration');
    delete axios.defaults.headers.common['Authorization'];
    setUsuario(null);
  };

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(nuevosDatos);
    localStorage.setItem('usuario', JSON.stringify(nuevosDatos));
  };

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