import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UsuariosTable = ({ usuarios, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
              <TableCell>{new Date(usuario.fechaCreacion).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(usuario.id)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(usuario.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsuariosTable;