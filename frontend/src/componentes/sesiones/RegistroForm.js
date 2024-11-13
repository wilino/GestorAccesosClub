import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const RegistroForm = ({ onRegister }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Procesa el registro del usuario
    onRegister();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 400, mx: 'auto', backgroundColor: '#212121', padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" color="secondary" align="center" sx={{ mb: 2 }}>
        Crear Cuenta
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
      <TextField
        fullWidth
        label="Nombre de Usuario"
        type="text"
        margin="normal"
        variant="outlined"
        color="secondary"
        required
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
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
        Registrarse
      </Button>
    </Box>
  );
};

export default RegistroForm;