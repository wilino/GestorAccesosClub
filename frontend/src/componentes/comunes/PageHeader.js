import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const PageHeader = ({
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
  icon, // Ícono completo, recibido como prop
  textColor = '#FFFFFF', // Texto blanco
  backgroundColor = '#000000', // Fondo negro
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        backgroundColor, // Fondo personalizable
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && <span>{icon}</span>} {/* Renderiza el ícono personalizado */}
        <div>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: textColor, // Texto personalizable
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Sombra para destacar
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: textColor }}>
              {subtitle}
            </Typography>
          )}
        </div>
      </Box>
      {buttonLabel && (
        <Button
          variant="contained"
          color="primary"
          onClick={onButtonClick}
          sx={{
            backgroundColor: '#FFD700',
            color: '#000',
            '&:hover': { backgroundColor: '#FFC107' },
          }}
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;