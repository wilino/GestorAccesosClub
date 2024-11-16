import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import { useAuth } from '../../../contextos/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAuth();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    cerrarSesion();
    navigate('/');
  };

  const accesosItems = [
    { label: 'Gestor de Accesos', to: '/accesos' },
  ];
  const clientesItems = [
    { label: 'Gestor de Clientes', to: '/clientes' },
  ];
  const usuariosItems = [
    { label: 'Gestor de Usuarios', to: '/usuarios' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#b2a429' }}>
          Club VIP
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated ? (
            <>
              <NavItem to="/dashboard" label="Dashboard" />

              {/* Mostrar accesos y clientes solo para personal autorizado */}
              {usuario?.rol === 'personal_autorizado' && (
                <>
                  <DropdownMenu label="Accesos" items={accesosItems} />
                  <DropdownMenu label="Clientes" items={clientesItems} />
                </>
              )}

              {/* Mostrar usuarios solo para admin */}
              {usuario?.rol === 'Admin' && (
                <DropdownMenu label="Usuarios" items={usuariosItems} />
              )}

              <button
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <NavItem to="/login" label="Inicio de Sesión" />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;