import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#b2a429' }}>
          Club VIP
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavLink to="/" style={{ textDecoration: 'none', color: '#ffffff' }} activeStyle={{ color: '#b2a429' }}>Inicio</NavLink>
          <NavLink to="/miembros" style={{ textDecoration: 'none', color: '#ffffff' }} activeStyle={{ color: '#b2a429' }}>Miembros</NavLink>
          <NavLink to="/eventos" style={{ textDecoration: 'none', color: '#ffffff' }} activeStyle={{ color: '#b2a429' }}>Eventos</NavLink>
          <NavLink to="/perfil" style={{ textDecoration: 'none', color: '#ffffff' }} activeStyle={{ color: '#b2a429' }}>Perfil</NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;