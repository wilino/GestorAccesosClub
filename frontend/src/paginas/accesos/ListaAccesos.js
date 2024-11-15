import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import FiltrosAccesos from '../../componentes/accesos/FiltrosAccesos';
import TablaAccesos from '../../componentes/accesos/TablaAccesos';
import axios from 'axios';

const ListaAccesos = () => {
  const [accesos, setAccesos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  useEffect(() => {
    obtenerClientes();
    obtenerAccesos();
  }, []);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get('/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const obtenerAccesos = async () => {
    try {
      const response = await axios.get('/api/accesos');
      setAccesos(response.data);
    } catch (error) {
      console.error('Error al obtener accesos:', error);
    }
  };

  const handleBuscar = () => {
    // Aquí puedes implementar la lógica de búsqueda o filtros personalizados
    obtenerAccesos(); // Llama a la API con los parámetros de filtro
  };

  return (
    <Container>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Lista de Accesos
        </Typography>
      </Box>

      <FiltrosAccesos
        clientes={clientes}
        filtroCliente={filtroCliente}
        setFiltroCliente={setFiltroCliente}
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        fechaInicio={fechaInicio}
        setFechaInicio={setFechaInicio}
        fechaFin={fechaFin}
        setFechaFin={setFechaFin}
        onBuscar={handleBuscar}
      />

      <TablaAccesos accesos={accesos} />
    </Container>
  );
};

export default ListaAccesos;