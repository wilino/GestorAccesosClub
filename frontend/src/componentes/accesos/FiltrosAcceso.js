import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Grid } from '@mui/material';

const FiltrosAcceso = ({ onFiltrar }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tipoCliente, setTipoCliente] = useState(0); // Valor inicial para "Todos"
  const [estado, setEstado] = useState(0); // Valor inicial para "Todos"

  useEffect(() => {
    onFiltrar({
      nombre: nombre.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      tipoCliente: tipoCliente === 0 ? null : tipoCliente, // Si es 0, no filtra por tipoCliente
      estado: estado === 0 ? null : estado, // Si es 0, no filtra por estado
    });
  }, [nombre, email, tipoCliente, estado, onFiltrar]);

  const clearFilters = () => {
    setNombre('');
    setEmail('');
    setTipoCliente(0); // Reinicia a "Todos"
    setEstado(0); // Reinicia a "Todos"
    onFiltrar({}); // Limpia los filtros
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#212121',
        padding: 3,
        borderRadius: 2,
        border: '2px solid #ccc',
        color: '#ffffff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            variant="outlined"
            color="secondary"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            color="secondary"
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Tipo de Cliente"
            value={tipoCliente}
            onChange={(e) => setTipoCliente(parseInt(e.target.value, 10))}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <MenuItem value={0}>Todos</MenuItem>
            <MenuItem value={1}>Miembro</MenuItem>
            <MenuItem value={2}>Visitante</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Estado"
            value={estado}
            onChange={(e) => setEstado(parseInt(e.target.value, 10))}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <MenuItem value={0}>Todos</MenuItem>
            <MenuItem value={1}>Activo</MenuItem>
            <MenuItem value={2}>Inactivo</MenuItem>
            <MenuItem value={3}>Suspendido</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FFD700',
            color: '#000',
            '&:hover': {
              backgroundColor: '#FFC107',
            },
          }}
          onClick={clearFilters}
        >
          Limpiar
        </Button>
      </Box>
    </Box>
  );
};

export default FiltrosAcceso;