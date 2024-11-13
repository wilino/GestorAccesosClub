import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#212121', color: '#ffffff', padding: 2, mt: 'auto' }}>
      <Typography variant="body2" align="center" color="textSecondary">
        © {new Date().getFullYear()} Club VIP - Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;