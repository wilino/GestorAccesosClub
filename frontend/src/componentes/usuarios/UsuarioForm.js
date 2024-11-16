import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';
import { useCreateUsuario } from '../../contextos/CreateUsuarioContext';
import { useUpdateUsuario } from '../../contextos/UpdateUsuarioContext';

const UsuarioForm = ({ initialData = {}, onSuccess, onError }) => {
  // Asegurarse de que initialData sea siempre un objeto
  const safeInitialData = initialData || {};

  const [usuarioId, setUsuarioId] = useState(safeInitialData.usuarioId || null);
  const [nombre, setNombre] = useState(safeInitialData.nombre || '');
  const [email, setEmail] = useState(safeInitialData.email || '');
  const [contraseña, setContraseña] = useState(safeInitialData.contraseña || '');
  const [rolId, setRolId] = useState(safeInitialData.rolId || '');
  const { createUsuario, loading: creating } = useCreateUsuario();
  const { updateUsuario, loading: updating } = useUpdateUsuario();

  // Actualizar valores solo cuando initialData cambia
  useEffect(() => {
    if (initialData) {
      setUsuarioId(safeInitialData.usuarioId || null);
      setNombre(safeInitialData.nombre || '');
      setEmail(safeInitialData.email || '');
      setContraseña(safeInitialData.contraseña || '');
      setRolId(safeInitialData.rolId || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioData = { usuarioId, nombre, email, rolId, contraseña };

    try {
      let response;
      if (usuarioId) {
        response = await updateUsuario(usuarioData);
      } else {
        response = await createUsuario(usuarioData);
      }

      // Verifica si la operación fue exitosa
      if (response?.success) {
        onSuccess(response.message, !!usuarioId);
        if (!usuarioId) {
          clearForm(); // Limpia el formulario si es creación
        }
      } else {
        onError(response?.message || 'Ha ocurrido un error inesperado');
      }
    } catch (error) {
      onError('Ha ocurrido un error inesperado');
    }
  };

  const clearForm = () => {
    setUsuarioId(null);
    setNombre('');
    setEmail('');
    setContraseña('');
    setRolId('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        width: '90%',
        mx: 'auto',
        backgroundColor: '#212121',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" color="secondary" align="center" sx={{ mb: 2 }}>
        {usuarioId ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
      </Typography>
      <TextField
        fullWidth
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        required
        disabled={creating || updating}
      />
      <TextField
        fullWidth
        label="Correo Electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        required
        disabled={creating || updating}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        required={!usuarioId}
        disabled={creating || updating}
      />
      <TextField
        fullWidth
        select
        label="Rol"
        value={rolId}
        onChange={(e) => setRolId(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        required
        disabled={creating || updating}
      >
        <MenuItem value={1}>Admin</MenuItem>
        <MenuItem value={2}>Personal Autorizado</MenuItem>
      </TextField>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        disabled={creating || updating}
      >
        {creating || updating ? <CircularProgress size={24} color="inherit" /> : usuarioId ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Button>
    </Box>
  );
};

export default UsuarioForm;