import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const accesosItems = [
    { label: 'Detalle Accesos', to: '/accesos/DetalleAccesos' },
    { label: 'Lista Accesos', to: '/accesos/ListaAccesos' },
  ];
  const clientesItems = [
    { label: 'Detalle Clientes', to: '/clientes/DetalleClientes' },
    { label: 'Lista Clientes', to: '/clientes/ListaClientes' },
  ];
  const usuariosItems = [
    { label: 'Detalle Usuarios', to: '/usuarios/DetalleUsuario' },
    { label: 'Lista Usuarios', to: '/usuarios/ListaUsuarios' },
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
              <DropdownMenu label="Accesos" items={accesosItems} />
              <DropdownMenu label="Clientes" items={clientesItems} />
              <DropdownMenu label="Usuarios" items={usuariosItems} />
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
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