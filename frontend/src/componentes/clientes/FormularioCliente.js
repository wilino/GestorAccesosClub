import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';
import { useCreateCliente } from '../../contextos/Cliente/CreateClienteContext';
import { useUpdateCliente } from '../../contextos/Cliente/UpdateClienteContext';

const FormularioCliente = ({ initialData = {}, onSuccess, onError }) => {
  const safeInitialData = initialData || {};

  const [clienteId, setClienteId] = useState(safeInitialData.clienteId || null);
  const [nombre, setNombre] = useState(safeInitialData.nombre || '');
  const [email, setEmail] = useState(safeInitialData.email || '');
  const [direccion, setDireccion] = useState(safeInitialData.direccion || '');
  const [telefono, setTelefono] = useState(safeInitialData.telefono || '');
  const [estado, setEstado] = useState(safeInitialData.estado || 1); // Default: Activo
  const [tipoCliente, setTipoCliente] = useState(safeInitialData.tipoCliente || 1); // Default: Miembro

  const { createCliente, loading: creating } = useCreateCliente();
  const { updateCliente, loading: updating } = useUpdateCliente();

  useEffect(() => {
    if (initialData) {
      setClienteId(safeInitialData.clienteId || null);
      setNombre(safeInitialData.nombre || '');
      setEmail(safeInitialData.email || '');
      setDireccion(safeInitialData.direccion || '');
      setTelefono(safeInitialData.telefono || '');
      setEstado(safeInitialData.estado || 1);
      setTipoCliente(safeInitialData.tipoCliente || 1);
    } else {
      clearForm();
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteData = { clienteId, nombre, email, direccion, telefono, estado, tipoCliente };

    try {
      let response;
      if (clienteId) {
        response = await updateCliente(clienteData);
      } else {
        response = await createCliente(clienteData);
      }

      if (response?.success) {
        onSuccess(response.message, !!clienteId); // Llama a la función para manejar el éxito
        clearForm(); // Limpia el formulario siempre después de una operación exitosa
      } else {
        onError(response?.message || 'Ha ocurrido un error inesperado');
      }
    } catch (error) {
      onError('Ha ocurrido un error inesperado');
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
        {clienteId ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
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
        label="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        disabled={creating || updating}
      />
      <TextField
        fullWidth
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        disabled={creating || updating}
      />
      <TextField
        fullWidth
        select
        label="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        required
        disabled={creating || updating}
      >
        <MenuItem value={1}>Activo</MenuItem>
        <MenuItem value={2}>Inactivo</MenuItem>
        <MenuItem value={3}>Suspendido</MenuItem>
      </TextField>
      <TextField
        fullWidth
        select
        label="Tipo de Cliente"
        value={tipoCliente}
        onChange={(e) => setTipoCliente(e.target.value)}
        margin="normal"
        variant="outlined"
        color="secondary"
        required
        disabled={creating || updating}
      >
        <MenuItem value={1}>Miembro</MenuItem>
        <MenuItem value={2}>Visitante</MenuItem>
      </TextField>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        disabled={creating || updating}
      >
        {creating || updating ? <CircularProgress size={24} color="inherit" /> : clienteId ? 'Actualizar Cliente' : 'Crear Cliente'}
      </Button>
    </Box>
  );
};

export default FormularioCliente;