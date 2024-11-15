// src/paginas/Login.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../contextos/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await iniciarSesion({ email, password });
      navigate('/dashboard'); // Redirigir a dashboard al iniciar sesión correctamente
    } catch (e) {
      setError('Credenciales incorrectas. Por favor, intente de nuevo.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        maxWidth: 400,
        mx: 'auto',
        backgroundColor: '#212121',
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" color="secondary" align="center" sx={{ mb: 2 }}>
        Iniciar Sesión
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        label="Correo Electrónico"
        type="email"
        margin="normal"
        variant="outlined"
        color="secondary"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        margin="normal"
        variant="outlined"
        color="secondary"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

export default Login;