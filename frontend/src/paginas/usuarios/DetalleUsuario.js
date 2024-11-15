import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailHeader from '../../componentes/comunes/DetailHeader';
import UsuarioDetailForm from '../../componentes/usuarios/UsuarioDetailForm';

const DetalleUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`/api/usuarios/${id}`);
        setUsuario(response.data);
      } catch (error) {
        setError('Error al cargar los detalles del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
      <DetailHeader title="Detalle de Usuario" subtitle="Información completa del usuario" />
      {usuario && <UsuarioDetailForm usuario={usuario} />}
    </Box>
  );
};

export default DetalleUsuario;