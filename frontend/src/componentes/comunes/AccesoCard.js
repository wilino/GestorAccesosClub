import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AccesoCard = ({ nombreUsuario, tipoAcceso, fechaAcceso }) => {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: '#333333', color: '#ffffff', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Usuario: {nombreUsuario}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tipo de Acceso: {tipoAcceso}
        </Typography>
        <Typography variant="body2">Fecha de Acceso: {new Date(fechaAcceso).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default AccesoCard;