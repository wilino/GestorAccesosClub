import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmacionModal = ({ abierto, onClose, onConfirmar, mensaje }) => (
  <Dialog open={abierto} onClose={onClose}>
    <DialogTitle>Confirmación</DialogTitle>
    <DialogContent>
      <DialogContentText>{mensaje}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Cancelar</Button>
      <Button onClick={onConfirmar} color="secondary">Confirmar</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmacionModal;