// src/componentes/comunes/TarjetaDashboard.js
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TarjetaDashboardValor from './TarjetaDashboardValor';

const TarjetaDashboard = ({ titulo, descripcion, ruta, keyName, endpoint, label }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(ruta)}>
      <CardContent>
        <Typography variant="h5" color="secondary">
          {titulo}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {descripcion}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TarjetaDashboardValor keyName={keyName} endpoint={endpoint} label={label} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TarjetaDashboard;