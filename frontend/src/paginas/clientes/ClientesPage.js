import React, { useState } from 'react';
import { Box, Container, Typography, Snackbar, Alert } from '@mui/material';
import FormularioCliente from '../../componentes/clientes/FormularioCliente';
import ClienteTable from '../../componentes/clientes/ClienteTable';
import { useGetCliente } from '../../contextos/Cliente/GetClienteContext';
import { useDeleteCliente } from '../../contextos/Cliente/DeleteClienteContext';

const ClientesPage = () => {
  const { clientes, fetchClientes } = useGetCliente();
  const { deleteCliente, error: deleteError } = useDeleteCliente();
  const [selectedCliente, setSelectedCliente] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Maneja la edición de un cliente
  const handleEdit = (cliente) => {
    setSelectedCliente(cliente); // Carga los datos en el formulario para editar
  };

  // Maneja la eliminación de un cliente
  const handleDelete = async (clienteId) => {
    const success = await deleteCliente(clienteId);
    if (success) {
      setSnackbar({ open: true, message: 'Cliente eliminado correctamente', severity: 'success' });
      fetchClientes(); // Actualiza la lista después de eliminar
    } else {
      setSnackbar({ open: true, message: 'Error al eliminar el cliente', severity: 'error' });
    }
  };

  // Maneja la creación o actualización de un cliente
  const handleUpdateOrCreate = (success, message, isEdit) => {
    setSnackbar({
      open: true,
      message: message || (isEdit ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente'),
      severity: success ? 'success' : 'error',
    });

    if (success) {
      fetchClientes(); // Actualiza la lista de clientes
      setSelectedCliente(null); // Limpia el formulario
    }
  };

  // Cierra el snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gestión de Clientes
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
        <FormularioCliente
          initialData={selectedCliente} // Carga datos para editar si existen
          onSuccess={(message, isEdit) => handleUpdateOrCreate(true, message, isEdit)} // Manejo exitoso
          onError={(message) => handleUpdateOrCreate(false, message)} // Manejo de error
        />
        <ClienteTable
          clientes={clientes} // Lista de clientes
          onEdit={handleEdit} // Acción de editar
          onDelete={handleDelete} // Acción de eliminar
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

export default ClientesPage;