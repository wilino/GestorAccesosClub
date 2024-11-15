import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const SelectorRol = ({ rol, onChange, roles }) => (
  <TextField
    fullWidth
    select
    label="Rol"
    variant="outlined"
    margin="normal"
    color="secondary"
    value={rol}
    onChange={onChange}
    required
  >
    {roles.map((rol) => (
      <MenuItem key={rol} value={rol}>
        {rol}
      </MenuItem>
    ))}
  </TextField>
);

export default SelectorRol;