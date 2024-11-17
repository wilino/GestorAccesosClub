import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, ThemeProvider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import tema from '../../temas/tema'; 

const formatFecha = (fecha) => {
  if (!fecha) return 'Sin fecha';
  const date = new Date(fecha);
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TablaAccesos = ({ clientes = [], onAcceso, onVerAccesos }) => {
  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'email', headerName: 'Correo Electrónico', flex: 1 },
    {
      field: 'ultimoAcceso',
      headerName: 'Último Acceso',
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <>
            {params.value.tipoAcceso === 1 ? 'Entrada' : 'Salida'} - {formatFecha(params.value.fechaAcceso)}
          </>
        ) : (
          'Sin registros'
        ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <Button
          startIcon={
            params.row.ultimoAcceso?.tipoAcceso === 1 ? <LogoutIcon /> : <AccessTimeIcon />
          }
          color={params.row.ultimoAcceso?.tipoAcceso === 1 ? 'primary' : 'secondary'}
          variant="contained"
          size="small"
          onClick={() => onAcceso(params.row, params.row.ultimoAcceso?.tipoAcceso === 1 ? 'salida' : 'entrada')}
        >
          {params.row.ultimoAcceso?.tipoAcceso === 1 ? 'Registrar Salida' : 'Registrar Entrada'}
        </Button>
      ),
    },
    {
      field: 'verAccesos',
      headerName: 'Ver Accesos',
      flex: 1,
      renderCell: (params) => (
        <Button
          startIcon={<VisibilityIcon />}
          color="info"
          variant="contained"
          size="small"
          onClick={() => onVerAccesos(params.row)} // Llama a la función con el cliente seleccionado
        >
          Ver Accesos
        </Button>
      ),
    },
  ];

  const rows = clientes.map((cliente) => ({
    id: cliente.clienteId,
    nombre: cliente.nombre,
    email: cliente.email,
    ultimoAcceso: cliente.ultimoAcceso || null,
  }));

  return (
    <ThemeProvider theme={tema}>
      <Box sx={{ height: 600, width: '100%', mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
    </ThemeProvider>
  );
};

export default TablaAccesos;