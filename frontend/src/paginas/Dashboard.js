// src/paginas/Dashboard.js
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import TarjetaDashboard from '../componentes/comunes/TarjetaDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const tarjetas = [
    {
      titulo: 'Accesos',
      descripcion: 'Revisa y gestiona los accesos registrados en el club.',
      ruta: '/accesos/ListaAccesos',
      valor: 'Total de Accesos: 102',
    },
    {
      titulo: 'Clientes',
      descripcion: 'Administra la información de los clientes.',
      ruta: '/clientes/ListaClientes',
      valor: 'Total de Clientes: 45',
    },
    {
      titulo: 'Usuarios',
      descripcion: 'Gestiona los usuarios registrados en el sistema.',
      ruta: '/usuarios/ListaUsuarios',
      valor: 'Total de Usuarios: 20',
    },
  ];

  return (
    <Container>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Bienvenido, {usuario?.nombre || 'Usuario'}!
        </Typography>
        <Typography variant="h6" color="primary" sx={{ color: '#b2a429', marginBottom: 2 }}>
          Resumen del Club VIP
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {tarjetas.map((tarjeta, index) => (
          <Grid item xs={12} md={4} key={index}>
            <TarjetaDashboard
              titulo={tarjeta.titulo}
              descripcion={tarjeta.descripcion}
              valor={tarjeta.valor}
              ruta={tarjeta.ruta}
              onNavigate={navigate}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;