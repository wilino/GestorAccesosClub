// src/contextos/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(); // exportación de AuthContext

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    setEstaAutenticado(true);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setEstaAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ usuario, estaAutenticado, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};