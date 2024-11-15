import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const ClienteTableRow = ({ cliente, onVer, onEditar, onEliminar }) => {
  return (
    <TableRow>
      <TableCell>{cliente.nombre}</TableCell>
      <TableCell>{cliente.email}</TableCell>
      <TableCell>{cliente.telefono}</TableCell>
      <TableCell>{cliente.rol}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => onVer(cliente.id)} color="primary">
          <Visibility />
        </IconButton>
        <IconButton onClick={() => onEditar(cliente.id)} color="secondary">
          <Edit />
        </IconButton>
        <IconButton onClick={() => onEliminar(cliente.id)} color="error">
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ClienteTableRow;