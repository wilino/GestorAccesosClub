import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ClienteTableRow from './ClienteTableRow';

const ClienteTable = ({ clientes, onVer, onEditar, onEliminar }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <ClienteTableRow
              key={cliente.id}
              cliente={cliente}
              onVer={onVer}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClienteTable;