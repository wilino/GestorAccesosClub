import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const EventoDestacado = ({ titulo, descripcion, imagen, onVerEvento }) => (
  <Card sx={{ maxWidth: 345, backgroundColor: '#424242', color: '#ffffff' }}>
    <CardMedia component="img" height="140" image={imagen} alt={titulo} />
    <CardContent>
      <Typography variant="h5" component="div" color="secondary">
        {titulo}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {descripcion}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="secondary" onClick={onVerEvento}>Ver Evento</Button>
    </CardActions>
  </Card>
);

export default EventoDestacado;