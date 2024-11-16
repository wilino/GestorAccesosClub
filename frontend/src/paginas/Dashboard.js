// src/paginas/Dashboard.js
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import TarjetaDashboard from '../componentes/comunes/TarjetaDashboard';
import { TarjetaDashboardValorProvider } from '../contextos/TarjetaDashboardValorContext';

const Dashboard = () => {
  const tarjetas = [
    {
      titulo: 'Clientes',
      descripcion: 'Administra la información de los clientes.',
      ruta: '/clientes/ListaClientes',
      endpoint: '/Dashboard/totalClientes',
      label: 'Total de Clientes',
      keyName: 'totalClientes',
    },
    {
      titulo: 'Usuarios',
      descripcion: 'Gestiona los usuarios registrados en el sistema.',
      ruta: '/usuarios/ListaUsuarios',
      endpoint: '/Dashboard/totalUsuarios',
      label: 'Total de Usuarios',
      keyName: 'totalUsuarios',
    },
  ];

  return (
    <TarjetaDashboardValorProvider>
      <Container>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h4" color="secondary" gutterBottom>
            Bienvenido al Dashboard
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
                ruta={tarjeta.ruta}
                keyName={tarjeta.keyName}
                endpoint={tarjeta.endpoint}
                label={tarjeta.label}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </TarjetaDashboardValorProvider>
  );
};

export default Dashboard;