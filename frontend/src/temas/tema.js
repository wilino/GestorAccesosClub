import { createTheme } from '@mui/material/styles';
const tema = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#b2a429',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    background: {
      default: '#121212',
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
      color: '#ffffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.3,
      color: '#eceff1',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#eceff1',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#ffffff',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#eceff1',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  shadows: Array(25).fill('0px 4px 10px rgba(0, 0, 0, 0.3)'), 
});

export default tema;