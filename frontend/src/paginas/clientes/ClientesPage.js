import React, { useState } from 'react';
import { Box, Container, Typography, Snackbar, Alert } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FormularioCliente from '../../componentes/clientes/FormularioCliente';
import ClienteTable from '../../componentes/clientes/ClienteTable';
import { useGetCliente } from '../../contextos/Cliente/GetClienteContext';
import { useDeleteCliente } from '../../contextos/Cliente/DeleteClienteContext';
import PageHeader from '../../componentes/comunes/PageHeader';

const ClientesPage = () => {
  const { clientes, fetchClientes } = useGetCliente();
  const { deleteCliente, error: deleteError } = useDeleteCliente();
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente);
    setIsEditing(true);
  };

  const handleDelete = async (clienteId) => {
    const success = await deleteCliente(clienteId);
    if (success) {
      setSnackbar({ open: true, message: 'Cliente eliminado correctamente', severity: 'success' });
      fetchClientes();
    } else {
      setSnackbar({ open: true, message: 'Error al eliminar el cliente', severity: 'error' });
    }
  };

  const handleUpdateOrCreate = (success, message, isEdit) => {
    setSnackbar({
      open: true,
      message: message || (isEdit ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente'),
      severity: success ? 'success' : 'error',
    });

    if (success) {
      fetchClientes();
      setSelectedCliente(null);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setSelectedCliente(null);
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        title="Gestión de Clientes"
        subtitle="Registra y administra la información de los clientes"
        icon={<PersonIcon sx={{ fontSize: 40, color: '#FFD700' }} />} 
      />
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
          initialData={selectedCliente}
          isEditing={isEditing}
          onSuccess={(message, isEdit) => handleUpdateOrCreate(true, message, isEdit)}
          onError={(message) => handleUpdateOrCreate(false, message)}
          onCancel={handleCancelEdit}
        />
        <ClienteTable
          clientes={clientes}
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

export default ClientesPage;