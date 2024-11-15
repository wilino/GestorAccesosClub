import React from 'react';
import { Box, Typography, TextField, Grid } from '@mui/material';

const UsuarioDetailForm = ({ usuario }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nombre"
            value={usuario.nombre}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            value={usuario.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Rol"
            value={usuario.rol}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Fecha de Creación"
            value={usuario.fechaCreacion}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsuarioDetailForm;