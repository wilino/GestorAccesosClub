import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: '#212121',
        color: '#ffffff',
        borderRadius: 2,
        mt: 2,
        maxWidth: '95%',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#b2a429', fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ color: '#b2a429', fontWeight: 'bold' }}>Correo Electrónico</TableCell>
            <TableCell sx={{ color: '#b2a429', fontWeight: 'bold' }}>Último Acceso</TableCell>
            <TableCell sx={{ color: '#b2a429', fontWeight: 'bold' }}>Acciones</TableCell>
            <TableCell sx={{ color: '#b2a429', fontWeight: 'bold' }}>Ver Accesos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(clientes) && clientes.length > 0 ? (
            clientes.map((cliente) => (
              <TableRow
                key={cliente.clienteId}
                sx={{
                  '&:hover': { backgroundColor: '#333333' },
                }}
              >
                <TableCell sx={{ color: '#ffffff' }}>{cliente.nombre}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{cliente.email}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>
                  {cliente.ultimoAcceso ? (
                    <>
                      {cliente.ultimoAcceso.tipoAcceso === 1 ? 'Entrada' : 'Salida'} -{' '}
                      {formatFecha(cliente.ultimoAcceso.fechaAcceso)}
                    </>
                  ) : (
                    'Sin registros'
                  )}
                </TableCell>
                <TableCell>
                  {cliente.ultimoAcceso?.tipoAcceso === 1 ? (
                    <Button
                      startIcon={<LogoutIcon />}
                      color="secondary"
                      variant="contained"
                      size="small"
                      onClick={() => onAcceso(cliente, 'salida')}
                      sx={{ textTransform: 'none' }}
                    >
                      Registrar Salida
                    </Button>
                  ) : (
                    <Button
                      startIcon={<AccessTimeIcon />}
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => onAcceso(cliente, 'entrada')}
                      sx={{ textTransform: 'none' }}
                    >
                      Registrar Entrada
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<VisibilityIcon />}
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={() => onVerAccesos(cliente)}
                    sx={{ textTransform: 'none' }}
                  >
                    Ver Accesos
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                sx={{
                  textAlign: 'center',
                  color: '#b2a429',
                  fontStyle: 'italic',
                }}
              >
                No hay clientes registrados o no se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaAccesos;