import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ClienteCard = ({ nombre, direccion, telefono, nivel }) => {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: '#333333', color: '#ffffff', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {nombre}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Nivel: {nivel}
        </Typography>
        <Typography variant="body2">Dirección: {direccion}</Typography>
        <Typography variant="body2">Teléfono: {telefono}</Typography>
      </CardContent>
    </Card>
  );
};

export default ClienteCard;