import React from 'react';
import { Box, Typography } from '@mui/material';

const FormHeader = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" color="secondary">
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default FormHeader;