import React from 'react';
import { TextField } from '@mui/material';

const CampoTexto = ({ label, value, onChange, type = 'text', required = false }) => (
  <TextField
    fullWidth
    label={label}
    type={type}
    variant="outlined"
    margin="normal"
    color="secondary"
    value={value}
    onChange={onChange}
    required={required}
  />
);

export default CampoTexto;