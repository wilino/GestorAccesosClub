import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const FormularioUsuario = ({ onSubmit, usuarioEditado }) => {
  const [usuario, setUsuario] = useState({ nombre: '', email: '', password: '', rol: '' });

  useEffect(() => {
    if (usuarioEditado) {
      setUsuario(usuarioEditado);
    } else {
      setUsuario({ nombre: '', email: '', password: '', rol: '' });
    }
  }, [usuarioEditado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(usuario);
    setUsuario({ nombre: '', email: '', password: '', rol: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField label="Nombre" name="nombre" value={usuario.nombre} onChange={handleChange} required />
      <TextField label="Correo Electrónico" name="email" value={usuario.email} onChange={handleChange} required />
      <TextField label="Contraseña" name="password" type="password" value={usuario.password} onChange={handleChange} required />
      <TextField label="Rol" name="rol" value={usuario.rol} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary">
        {usuarioEditado ? 'Actualizar' : 'Registrar'}
      </Button>
    </Box>
  );
};

export default FormularioUsuario;