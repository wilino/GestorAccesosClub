import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const UsuarioForm = ({ onSubmit, usuario = {}, roles }) => {
  const [nombre, setNombre] = useState(usuario.nombre || '');
  const [email, setEmail] = useState(usuario.email || '');
  const [rol, setRol] = useState(usuario.rol || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevoUsuario = {
      nombre,
      email,
      rol,
      ...(password && { password }) // Solo agregar si se ha ingresado una contraseña
    };
    onSubmit(nuevoUsuario);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Correo Electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Rol"
        select
        value={rol}
        onChange={(e) => setRol(e.target.value)}
        margin="normal"
        required
      >
        {roles.map((rol) => (
          <MenuItem key={rol.id} value={rol.nombre}>
            {rol.nombre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        helperText="Dejar en blanco si no desea cambiar la contraseña"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Guardar Usuario
      </Button>
    </Box>
  );
};

export default UsuarioForm;