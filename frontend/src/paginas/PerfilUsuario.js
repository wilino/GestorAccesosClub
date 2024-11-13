import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Box, TextField, Button } from '@mui/material';

const PerfilUsuario = () => {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <h1>Perfil de Usuario</h1>
      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        defaultValue={usuario ? usuario.nombre : ''}
      />
      <TextField
        label="Correo Electrónico"
        fullWidth
        margin="normal"
        defaultValue={usuario ? usuario.email : ''}
        disabled
      />
      <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
        Actualizar Perfil
      </Button>
      <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={cerrarSesion}>
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default PerfilUsuario;