import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contextos/AuthContext';

const PrivateRoute = ({ rolesPermitidos }) => {
  const { usuario } = useAuth();

  // Verifica si el usuario está autenticado
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Verifica los roles si se pasan como requisito
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  return <Outlet />;
};

export default PrivateRoute;