import React from 'react';
import TextField from '@mui/material/TextField';

const CampoBusqueda = ({ onBuscar }) => (
  <TextField
    variant="outlined"
    placeholder="Buscar..."
    onChange={(e) => onBuscar(e.target.value)}
    sx={{
      input: { color: '#ffffff' },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#b2a429',
        },
      },
    }}
  />
);

export default CampoBusqueda;