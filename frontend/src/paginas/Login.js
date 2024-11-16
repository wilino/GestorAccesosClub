// src/paginas/Login.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../contextos/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { iniciarSesion, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);

    const success = await iniciarSesion({ email, password });

    if (success) {
      navigate('/dashboard'); // Redirige al dashboard si la autenticación es exitosa
    } else {
      setFormError('No se pudo iniciar sesión. Por favor, verifique sus credenciales.');
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
      {(formError || error) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError || error}
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
        disabled={loading}
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
        disabled={loading}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
      </Button>
    </Box>
  );
};

export default Login;