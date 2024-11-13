import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const NotificacionSnackbar = ({ abierto, onClose, mensaje, severidad }) => (
  <Snackbar open={abierto} autoHideDuration={6000} onClose={onClose}>
    <MuiAlert onClose={onClose} severity={severidad} sx={{ width: '100%' }}>
      {mensaje}
    </MuiAlert>
  </Snackbar>
);

export default NotificacionSnackbar;