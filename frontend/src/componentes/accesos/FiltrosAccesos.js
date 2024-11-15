import React from 'react';
import { Box, TextField, Button, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const FiltrosAccesos = ({ clientes, filtroCliente, setFiltroCliente, filtroTipo, setFiltroTipo, fechaInicio, setFechaInicio, fechaFin, setFechaFin, onBuscar }) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
    <Select
      value={filtroCliente}
      onChange={(e) => setFiltroCliente(e.target.value)}
      displayEmpty
      variant="outlined"
    >
      <MenuItem value="">Todos los Clientes</MenuItem>
      {clientes.map((cliente) => (
        <MenuItem key={cliente.id} value={cliente.id}>
          {cliente.nombre}
        </MenuItem>
      ))}
    </Select>

    <Select
      value={filtroTipo}
      onChange={(e) => setFiltroTipo(e.target.value)}
      displayEmpty
      variant="outlined"
    >
      <MenuItem value="">Todos los Tipos</MenuItem>
      <MenuItem value="entrada">Entrada</MenuItem>
      <MenuItem value="salida">Salida</MenuItem>
    </Select>

    <DatePicker
      label="Fecha Inicio"
      value={fechaInicio}
      onChange={(date) => setFechaInicio(date)}
      renderInput={(params) => <TextField {...params} />}
    />

    <DatePicker
      label="Fecha Fin"
      value={fechaFin}
      onChange={(date) => setFechaFin(date)}
      renderInput={(params) => <TextField {...params} />}
    />

    <Button variant="contained" color="primary" onClick={onBuscar}>
      Buscar
    </Button>
  </Box>
);

export default FiltrosAccesos;