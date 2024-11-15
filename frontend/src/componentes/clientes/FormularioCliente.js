// src/componentes/clientes/FormularioCliente.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CampoTexto from '../comunes/CampoTexto';
import SelectorRol from '../comunes/SelectorRol';

const FormularioCliente = ({ clienteExistente, onSubmit, roles }) => {
  const [nombre, setNombre] = useState(clienteExistente ? clienteExistente.nombre : '');
  const [email, setEmail] = useState(clienteExistente ? clienteExistente.email : '');
  const [telefono, setTelefono] = useState(clienteExistente ? clienteExistente.telefono : '');
  const [rol, setRol] = useState(clienteExistente ? clienteExistente.rol : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (clienteExistente) {
      setNombre(clienteExistente.nombre);
      setEmail(clienteExistente.email);
      setTelefono(clienteExistente.telefono);
      setRol(clienteExistente.rol);
    }
  }, [clienteExistente]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!nombre || !email || !telefono || !rol) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const datosCliente = { nombre, email, telefono, rol };
      await onSubmit(datosCliente); // onSubmit es una función que se pasa como prop para manejar la creación o actualización
    } catch (e) {
      setError('Error al procesar la solicitud. Intente nuevamente.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 500, mx: 'auto', p: 3, borderRadius: 2, backgroundColor: '#333333' }}>
      <Typography variant="h5" color="secondary" align="center" sx={{ mb: 2 }}>
        {clienteExistente ? 'Editar Cliente' : 'Registrar Cliente'}
      </Typography>

      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      
      <CampoTexto label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <CampoTexto label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <CampoTexto label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
      <SelectorRol rol={rol} onChange={(e) => setRol(e.target.value)} roles={roles} />

      <Button fullWidth type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
        {clienteExistente ? 'Actualizar Cliente' : 'Registrar Cliente'}
      </Button>
    </Box>
  );
};

export default FormularioCliente;