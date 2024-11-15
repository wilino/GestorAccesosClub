import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClienteTable from '../../componentes/clientes/ClienteTable';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('/api/clientes');
        setClientes(response.data);
      } catch (error) {
        setError('Error al cargar la lista de clientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleVer = (id) => navigate(`/clientes/${id}`);
  const handleEditar = (id) => navigate(`/clientes/editar/${id}`);
  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      try {
        await axios.delete(`/api/clientes/${id}`);
        setClientes(clientes.filter((cliente) => cliente.id !== id));
        alert('Cliente eliminado con éxito');
      } catch (error) {
        setError('Error al eliminar el cliente.');
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ mt: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" color="secondary" align="center" gutterBottom>
        Lista de Clientes
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <ClienteTable
        clientes={clientes}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </Box>
  );
};

export default ListaClientes;