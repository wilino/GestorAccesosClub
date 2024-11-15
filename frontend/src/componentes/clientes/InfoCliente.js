import React from 'react';
import { Box, Typography } from '@mui/material';

const InfoCliente = ({ cliente }) => (
  <Box sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, borderRadius: 2, mb: 3 }}>
    <Typography variant="h5" color="secondary" gutterBottom>
      Información del Cliente
    </Typography>
    <Typography variant="body1">Nombre: {cliente.nombre}</Typography>
    <Typography variant="body1">Nivel: {cliente.nivel}</Typography>
    <Typography variant="body1">Teléfono: {cliente.telefono}</Typography>
    <Typography variant="body1">Correo: {cliente.email}</Typography>
    {/* Agrega más campos según sea necesario */}
  </Box>
);

export default InfoCliente;