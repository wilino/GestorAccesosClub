import React, { useEffect, useState } from 'react';
import { Box, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormHeader from '../../componentes/comunes/FormHeader';
import UsuarioForm from '../../componentes/usuarios/UsuarioForm';

const FormularioUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/api/roles');
        setRoles(response.data);
      } catch {
        setError('Error al cargar los roles.');
      }
    };

    const fetchUsuario = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/usuarios/${id}`);
          setUsuario(response.data);
        } catch {
          setError('Error al cargar el usuario.');
        }
      }
      setLoading(false);
    };

    fetchRoles();
    fetchUsuario();
  }, [id]);

  const handleSubmit = async (nuevoUsuario) => {
    try {
      if (id) {
        await axios.put(`/api/usuarios/${id}`, nuevoUsuario);
      } else {
        await axios.post('/api/usuarios', nuevoUsuario);
      }
      navigate('/usuarios');
    } catch {
      setError('Error al guardar el usuario.');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
      <FormHeader title={id ? 'Editar Usuario' : 'Registrar Usuario'} subtitle="Complete los datos del usuario" />
      <UsuarioForm onSubmit={handleSubmit} usuario={usuario} roles={roles} />
    </Box>
  );
};

export default FormularioUsuario;