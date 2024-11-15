import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import FormularioCliente from '../../componentes/clientes/FormularioCliente';
import axios from 'axios';

const FormularioClientePage = () => {
  const { id } = useParams(); // Obtiene el id del cliente a editar si existe
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar roles desde el backend
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/api/roles');
        setRoles(response.data);
      } catch (error) {
        setError('Error al cargar roles.');
      }
    };

    // Cargar cliente si se proporciona un id
    const fetchCliente = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/clientes/${id}`);
          setCliente(response.data);
        } catch (error) {
          setError('Error al cargar el cliente.');
        }
      }
    };

    fetchRoles();
    fetchCliente();
    setLoading(false);
  }, [id]);

  const handleSubmit = async (datosCliente) => {
    try {
      if (id) {
        await axios.put(`/api/clientes/${id}`, datosCliente);
        alert('Cliente actualizado con éxito');
      } else {
        await axios.post('/api/clientes', datosCliente);
        alert('Cliente registrado con éxito');
      }
      navigate('/clientes'); // Redirige a la lista de clientes después de guardar
    } catch (error) {
      setError('Error al guardar el cliente.');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ mt: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" color="secondary" align="center" gutterBottom>
        {id ? 'Editar Cliente' : 'Registrar Cliente'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <FormularioCliente
        clienteExistente={cliente}
        onSubmit={handleSubmit}
        roles={roles}
      />
    </Box>
  );
};

export default FormularioClientePage;