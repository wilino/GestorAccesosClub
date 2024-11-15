import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../../componentes/comunes/PageHeader';
import UsuariosTable from '../../componentes/usuarios/UsuariosTable';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('/api/usuarios');
        setUsuarios(response.data);
      } catch {
        setError('Error al cargar los usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch {
      setError('Error al eliminar el usuario.');
    }
  };

  const handleAddUser = () => {
    navigate('/usuarios/crear');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 3 }}>
      <PageHeader
        title="Usuarios"
        subtitle="Gestione los usuarios registrados en el sistema"
        buttonLabel="Agregar Usuario"
        onButtonClick={handleAddUser}
      />
      <UsuariosTable usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
    </Box>
  );
};

export default ListaUsuarios;