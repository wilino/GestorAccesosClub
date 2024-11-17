import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useCreateAcceso } from '../../contextos/acceso/CreateAccesoContext';

const PopupAcceso = ({ open, cliente, tipoAcceso, onConfirmar, onClose }) => {
  const { createAcceso } = useCreateAcceso();
  const [fechaHora, setFechaHora] = useState(new Date().toISOString().slice(0, 16)); // Fecha inicial actual

  const handleConfirmar = async () => {
    if (!cliente || !cliente.clienteId) {
      console.error('Cliente o clienteId es null. Verifica que el cliente sea correctamente pasado al popup.');
      return;
    }

    const parametros = {
      clienteId: cliente.clienteId, // Confirmar que se envía correctamente
      tipoAcceso: tipoAcceso === 'entrada' ? 1 : 2,
      fechaAcceso: fechaHora,
    };

    try {
      const result = await createAcceso(parametros);
      if (result.success) {
        onConfirmar(fechaHora); // Notifica éxito al padre
      } else {
        console.error(result.message || 'Error al registrar acceso');
      }
    } catch (error) {
      console.error('Error al registrar acceso:', error);
    }

    onClose(); // Cierra el popup
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Registrar {tipoAcceso === 'entrada' ? 'Entrada' : 'Salida'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Fecha y Hora"
          type="datetime-local"
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <p>
          Cliente: <strong>{cliente?.nombre || 'Desconocido'}</strong>
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleConfirmar} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupAcceso;