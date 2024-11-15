import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import InfoCliente from '../../componentes/clientes/InfoCliente';
import HistorialAccesosCliente from '../../componentes/clientes/HistorialAccesosCliente';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetalleClientes = () => {
  const { clienteId } = useParams();
  const [cliente, setCliente] = useState(null);
  const [accesos, setAccesos] = useState([]);

  useEffect(() => {
    obtenerCliente();
    obtenerAccesos();
  }, [clienteId]);

  const obtenerCliente = async () => {
    try {
      const response = await axios.get(`/api/clientes/${clienteId}`);
      setCliente(response.data);
    } catch (error) {
      console.error('Error al obtener cliente:', error);
    }
  };

  const obtenerAccesos = async () => {
    try {
      const response = await axios.get(`/api/accesos?clienteId=${clienteId}`);
      setAccesos(response.data);
    } catch (error) {
      console.error('Error al obtener accesos del cliente:', error);
    }
  };

  if (!cliente) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Detalle del Cliente
        </Typography>
      </Box>

      <InfoCliente cliente={cliente} />

      <Typography variant="h5" color="secondary" gutterBottom sx={{ mt: 3 }}>
        Historial de Accesos
      </Typography>
      <HistorialAccesosCliente accesos={accesos} />
    </Container>
  );
};

export default DetalleClientes;