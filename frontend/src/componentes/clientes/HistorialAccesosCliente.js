import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const HistorialAccesosCliente = ({ accesos }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell>Tipo de Acceso</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accesos.map((acceso) => (
          <TableRow key={acceso.id}>
            <TableCell>{acceso.fecha}</TableCell>
            <TableCell>{acceso.tipoAcceso}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default HistorialAccesosCliente;