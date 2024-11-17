import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, createTheme, ThemeProvider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const getTipoCliente = (tipo) => {
  switch (tipo) {
    case 1:
      return 'Miembro';
    case 2:
      return 'Visitante';
    default:
      return 'Desconocido';
  }
};

const getEstado = (estado) => {
  switch (estado) {
    case 1:
      return 'Activo';
    case 2:
      return 'Inactivo';
    case 3:
      return 'Suspendido';
    default:
      return 'Desconocido';
  }
};

const ClienteTable = ({ clientes, onEdit, onDelete }) => {
  const rows = clientes.map((cliente) => ({
    id: cliente.clienteId,
    nombre: cliente.nombre || 'Desconocido',
    email: cliente.email || 'Desconocido',
    direccion: cliente.direccion || 'Desconocida',
    telefono: cliente.telefono || 'Desconocido',
    tipoClienteText: getTipoCliente(cliente.tipoCliente),
    estadoText: getEstado(cliente.estado),
    clienteId: cliente.clienteId,
  }));

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'direccion', headerName: 'Dirección', flex: 1 },
    { field: 'telefono', headerName: 'Teléfono', flex: 1 },
    { field: 'tipoClienteText', headerName: 'Tipo de Cliente', flex: 1 },
    { field: 'estadoText', headerName: 'Estado', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => onEdit(params.row)}
            aria-label="Editar"
            sx={{ color: '#FFD700' }} // Lapiz dorado
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(params.row.id)}
            aria-label="Eliminar"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: 600,
          width: '100%',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
        />
      </Box>
    </ThemeProvider>
  );
};

export default ClienteTable;