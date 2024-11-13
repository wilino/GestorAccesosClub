import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const RecuperarContrasenaForm = ({ onRecover }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Procesa la solicitud de recuperación de contraseña
    onRecover();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 400, mx: 'auto', backgroundColor: '#212121', padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" color="secondary" align="center" sx={{ mb: 2 }}>
        Recuperar Contraseña
      </Typography>
      <TextField
        fullWidth
        label="Correo Electrónico"
        type="email"
        margin="normal"
        variant="outlined"
        color="secondary"
        required
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Enviar Solicitud
      </Button>
    </Box>
  );
};

export default RecuperarContrasenaForm;