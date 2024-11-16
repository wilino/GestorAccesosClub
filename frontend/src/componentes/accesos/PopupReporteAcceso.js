import React, { useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useGetAccesosCliente } from '../../contextos/acceso/GetAccesosClienteContext';

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

const PopupReporteAcceso = ({ open, cliente, onClose }) => {
  const { accesos, fetchAccesosCliente, loading, error } = useGetAccesosCliente();

  useEffect(() => {
    if (open && cliente?.clienteId) {
      fetchAccesosCliente(cliente.clienteId);
    }
  }, [open, cliente, fetchAccesosCliente]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Historial de Accesos</DialogTitle>
      <DialogContent>
        {cliente && (
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {cliente.nombre || 'Sin nombre'}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Correo: {cliente.email || 'Sin correo'}
            </Typography>
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ textAlign: 'center', color: 'error.main', marginBottom: 2 }}>
            Error: {error}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tipo de Acceso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(accesos) && accesos.length > 0 ? (
                  accesos.map((acceso, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatFecha(acceso.fechaAcceso)}</TableCell>
                      <TableCell>{acceso.tipoAcceso === 1 ? 'Entrada' : 'Salida'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                      No hay accesos registrados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupReporteAcceso;