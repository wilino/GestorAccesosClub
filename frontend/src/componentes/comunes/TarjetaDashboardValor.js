import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { useTarjetaDashboardValor } from '../../contextos/TarjetaDashboardValorContext';

const TarjetaDashboardValor = ({ keyName, endpoint, label }) => {
  const { valores, errores, cargando, startFetching } = useTarjetaDashboardValor();
  const [updated, setUpdated] = useState(false); // Estado para manejar el efecto de actualización

  useEffect(() => {
    const stopFetching = startFetching(keyName, endpoint);

    return () => stopFetching(); // Detener la actualización al desmontar
  }, [keyName, endpoint]);

  useEffect(() => {
    // Activar efecto de actualización si el valor ha cambiado
    if (valores[keyName] !== undefined) {
      setUpdated(true);
      const timer = setTimeout(() => setUpdated(false), 500); // Desactiva el efecto después de 500ms
      return () => clearTimeout(timer);
    }
  }, [valores[keyName]]);

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '16px',
        backgroundColor: updated ? '#444' : '#333', // Cambia de color temporalmente al actualizar
        borderRadius: '8px',
        transition: 'background-color 0.3s ease', // Efecto de transición para la actualización
      }}
    >
      <Typography variant="h6" color="#b2a429" gutterBottom>
        {label}
      </Typography>
      {cargando ? (
        <CircularProgress color="secondary" size={24} />
      ) : errores[keyName] ? (
        <Typography color="error" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {errores[keyName]}
        </Typography>
      ) : (
        <Typography
          variant="h5"
          sx={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {valores[keyName] ?? 'N/A'}
        </Typography>
      )}
    </Box>
  );
};

export default TarjetaDashboardValor;