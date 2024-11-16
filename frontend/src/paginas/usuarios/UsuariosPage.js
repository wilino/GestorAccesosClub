import React, { useState } from 'react';
import { Box, Container, Typography, Snackbar, Alert } from '@mui/material';
import FormularioUsuario from '../../componentes/usuarios/UsuarioForm';
import UsuariosTable from '../../componentes/usuarios/UsuariosTable';
import { useUsuarios } from '../../contextos/GetUsuarioContext';
import { useDeleteUsuario } from '../../contextos/DeleteUsuarioContext';

const UsuariosPage = () => {
  const { usuarios, fetchUsuarios } = useUsuarios();
  const { deleteUsuario, error: deleteError } = useDeleteUsuario();
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
  };

  const handleDelete = async (usuarioId) => {
    const success = await deleteUsuario(usuarioId);
    if (success) {
      setSnackbar({ open: true, message: 'Usuario eliminado correctamente', severity: 'success' });
      fetchUsuarios();
    } else {
      setSnackbar({ open: true, message: 'Error al eliminar el usuario', severity: 'error' });
    }
  };

  const handleUpdateOrCreate = (success, message, isEdit) => {
    setSnackbar({
      open: true,
      message: message || (isEdit ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente'),
      severity: success ? 'success' : 'error',
    });

    if (success) {
      fetchUsuarios();
      setSelectedUsuario(null); // Limpia el formulario
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          backgroundColor: '#212121',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <FormularioUsuario
          initialData={selectedUsuario}
          onSuccess={(message, isEdit) => handleUpdateOrCreate(true, message, isEdit)}
          onError={(message) => handleUpdateOrCreate(false, message)}
        />
        <UsuariosTable
          usuarios={usuarios}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {deleteError && (
          <Typography color="error">
            {deleteError}
          </Typography>
        )}
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UsuariosPage;




