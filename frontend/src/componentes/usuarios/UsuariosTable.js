import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Función para formatear la fecha al formato latinoamericano
const formatFechaLatam = (fecha) => {
  const date = new Date(fecha);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const UsuariosTable = ({ usuarios = [], onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#212121', color: '#ffffff', borderRadius: 2, mt: 2, maxWidth: '90%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#b2a429' }}>Nombre</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Correo Electrónico</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Rol</TableCell>
            <TableCell sx={{ color: '#b2a429' }}>Fecha de Creación</TableCell> {/* Nueva columna */}
            <TableCell sx={{ color: '#b2a429' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <TableRow
                key={usuario.usuarioId}
                onClick={() => onEdit(usuario)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#333333' } }}
              >
                <TableCell sx={{ color: '#ffffff' }}>{usuario.nombre}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{usuario.email}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{usuario.rol}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{formatFechaLatam(usuario.fechaCreacion)}</TableCell> {/* Formatear la fecha */}
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(usuario.usuarioId);
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
              <TableCell colSpan={5} sx={{ textAlign: 'center', color: '#b2a429' }}>
                <Typography>No hay usuarios registrados</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsuariosTable;