import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TablaAccesos = ({ accesos }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>Tipo de Acceso</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accesos.map((acceso) => (
          <TableRow key={acceso.id}>
            <TableCell>{acceso.fecha}</TableCell>
            <TableCell>{acceso.clienteNombre}</TableCell>
            <TableCell>{acceso.tipoAcceso}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TablaAccesos;