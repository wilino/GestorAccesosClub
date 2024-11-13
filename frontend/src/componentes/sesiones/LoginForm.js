// src/componentes/sesiones/LoginForm.js
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../../contextos/AuthContext';

const LoginForm = () => {
  const { iniciarSesion } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const datosUsuario = { nombre: 'Usuario VIP' }; // Ejemplo de datos de usuario
    iniciarSesion(datosUsuario);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 400, mx: 'auto', backgroundColor: '#212121', padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" color="secondary" align="center" sx={{ mb: 2 }}>
        Iniciar Sesión
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
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default LoginForm;