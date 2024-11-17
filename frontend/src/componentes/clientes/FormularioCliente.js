import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Grid, TextField, Typography, MenuItem } from '@mui/material';
import { useCreateCliente } from '../../contextos/Cliente/CreateClienteContext';
import { useUpdateCliente } from '../../contextos/Cliente/UpdateClienteContext';

const FormularioCliente = ({ initialData, isEditing, onSuccess, onError, onCancel }) => {
  const [clienteId, setClienteId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState(1); // Por defecto Activo
  const [tipoCliente, setTipoCliente] = useState(1); // Por defecto Miembro

  const { createCliente, loading: creating } = useCreateCliente();
  const { updateCliente, loading: updating } = useUpdateCliente();

  useEffect(() => {
    if (initialData) {
      setClienteId(initialData.clienteId || null);
      setNombre(initialData.nombre || '');
      setEmail(initialData.email || '');
      setDireccion(initialData.direccion || '');
      setTelefono(initialData.telefono || '');
      setEstado(initialData.estado || 1);
      setTipoCliente(initialData.tipoCliente || 1);
    } else {
      clearForm();
    }
  }, [initialData]);

  const handleCreate = async () => {
    try {
      const clienteData = { nombre, email, direccion, telefono, estado, tipoCliente };
      const response = await createCliente(clienteData);
      if (response?.success) {
        onSuccess(response.message, false);
        clearForm();
      } else {
        onError(response?.message || 'Error al crear cliente');
      }
    } catch (error) {
      onError('Error inesperado al crear cliente');
    }
  };

  const handleUpdate = async () => {
    try {
      const clienteData = { clienteId, nombre, email, direccion, telefono, estado, tipoCliente };
      const response = await updateCliente(clienteData);
      if (response?.success) {
        onSuccess(response.message, true);
        clearForm();
      } else {
        onError(response?.message || 'Error al actualizar cliente');
      }
    } catch (error) {
      onError('Error inesperado al actualizar cliente');
    }
  };

  const clearForm = () => {
    setClienteId(null);
    setNombre('');
    setEmail('');
    setDireccion('');
    setTelefono('');
    setEstado(1);
    setTipoCliente(1);
  };

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: 'background.paper',
        padding: 3,
        borderRadius: 2,
        boxShadow: 4,
        border: '1px solid',
        borderColor: 'divider',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        align="center"
        sx={{ mb: 3, fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        {isEditing ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nombre *"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            required
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Correo Electrónico *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Estado *"
            select
            value={estado}
            onChange={(e) => setEstado(Number(e.target.value))}
            fullWidth
            required
          >
            <MenuItem value={1}>Activo</MenuItem>
            <MenuItem value={2}>Inactivo</MenuItem>
            <MenuItem value={3}>Suspendido</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Tipo de Cliente *"
            select
            value={tipoCliente}
            onChange={(e) => setTipoCliente(Number(e.target.value))}
            fullWidth
            required
          >
            <MenuItem value={1}>Miembro</MenuItem>
            <MenuItem value={2}>Visitante</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            clearForm();
            onCancel();
          }}
          disabled={creating || updating}
          sx={{ color: 'primary.main', borderColor: 'primary.main' }}
        >
          Limpiar
        </Button>
        {!isEditing && (
          <Button
            type="button"
            variant="contained"
            onClick={handleCreate}
            disabled={creating}
            sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            {creating ? <CircularProgress size={24} color="inherit" /> : 'Crear Cliente'}
          </Button>
        )}
        {isEditing && (
          <Button
            type="button"
            variant="contained"
            onClick={handleUpdate}
            disabled={updating}
            sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            {updating ? <CircularProgress size={24} color="inherit" /> : 'Actualizar Cliente'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FormularioCliente;