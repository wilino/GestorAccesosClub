// src/componentes/comunes/Encabezado.js
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Encabezado = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Club VIP
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Encabezado;