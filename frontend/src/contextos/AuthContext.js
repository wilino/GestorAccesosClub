import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@clubvip.com' && password === 'password123') {
          localStorage.setItem('token', 'simulated-token');
          setUsuario({ nombre: 'Usuario VIP' });
          resolve(true); // Autenticación exitosa
        } else {
          resolve(false); // Fallo en la autenticación
        }
      }, 1000);
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};