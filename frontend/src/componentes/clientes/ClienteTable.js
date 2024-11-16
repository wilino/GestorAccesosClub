import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Función para obtener etiquetas de los enums
const getTipoCliente = (tipo) => (tipo === 1 ? 'Miembro' : 'Visitante');
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

const ClienteTable = ({ clientes = [], onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#212121', color: '#ffffff', borderRadius: 2, mt: 2, maxWidth: '90%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#b2a429' }}>Nombre</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Email</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Dirección</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Teléfono</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Tipo de Cliente</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Estado</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <TableRow
                key={cliente.clienteId}
                onClick={() => onEdit(cliente)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#333333' } }}
              >
                <TableCell sx={{ color: '#ffffff' }}>{cliente.nombre}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{cliente.email}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{cliente.direccion}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{cliente.telefono}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{getTipoCliente(cliente.tipoCliente)}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{getEstado(cliente.estado)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(cliente);
                    }}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(cliente.clienteId);
                    }}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} sx={{ textAlign: 'center', color: '#b2a429' }}>
                <Typography>No hay clientes registrados</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClienteTable;