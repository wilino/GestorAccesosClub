import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const PageHeader = ({ title, subtitle, buttonLabel, onButtonClick }) => {
  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Typography variant="h4" color="secondary">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {subtitle}
        </Typography>
      </div>
      {buttonLabel && (
        <Button variant="contained" color="primary" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;