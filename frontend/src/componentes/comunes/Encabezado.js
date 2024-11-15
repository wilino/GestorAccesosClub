// src/componentes/comunes/Encabezado.js
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Encabezado = ({ titulo = "Club VIP", subtitulo = "" }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121', padding: '0.5rem' }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          {titulo}
        </Typography>
        {subtitulo && (
          <Typography variant="subtitle1" color="inherit">
            {subtitulo}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Encabezado;