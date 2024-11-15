import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

const TarjetaDashboard = ({ titulo, descripcion, valor, ruta, onNavigate }) => {
  return (
    <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
      <CardActionArea onClick={() => onNavigate(ruta)}>
        <CardContent>
          <Typography variant="h5" color="secondary">
            {titulo}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {descripcion}
          </Typography>
          {valor && (
            <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
              {valor}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TarjetaDashboard;