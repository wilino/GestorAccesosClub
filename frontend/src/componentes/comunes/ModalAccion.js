import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ModalAccion = ({ open, onClose, onConfirm, titulo = "Confirmar acción", mensaje = "¿Estás seguro de que deseas continuar?" }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>{mensaje}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAccion;