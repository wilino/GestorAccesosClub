// src/temas/tema.js
import { createTheme } from '@mui/material/styles';

const tema = createTheme({
  palette: {
    primary: {
      main: '#212121', // un gris muy oscuro
    },
    secondary: {
      main: '#b2a429', // un dorado
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#121212', // casi negro
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#eceff1',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'none'
    }
  },
});

export default tema;