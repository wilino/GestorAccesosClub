import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const MemberCard = ({ nombre, nivel, proximosEventos }) => (
  <Card sx={{ maxWidth: 345, backgroundColor: '#212121', color: '#ffffff' }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {nombre}
      </Typography>
      <Typography variant="subtitle1" color="secondary">
        Nivel: {nivel}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Próximos eventos: {proximosEventos}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="secondary">Ver Perfil</Button>
    </CardActions>
  </Card>
);

export default MemberCard;