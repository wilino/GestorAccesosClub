import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import tema from '../../temas/tema';

const PopupReporteAcceso = ({ open, onClose, cliente, accesos }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (open) {
      localStorage.removeItem('accesos');

      const formattedRows = accesos.map((acceso, index) => ({
        id: index + 1,
        tipoAcceso: acceso.tipoAcceso === 1 ? 'Entrada' : 'Salida',
        icono: acceso.tipoAcceso === 1 ? <LoginIcon color="success" /> : <LogoutIcon color="error" />,
        fecha: new Date(acceso.fechaAcceso).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        hora: new Date(acceso.fechaAcceso).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        rawDate: new Date(acceso.fechaAcceso),
      }));

      localStorage.setItem('accesos', JSON.stringify(formattedRows));
      setRows(formattedRows);
      setFilteredRows(formattedRows);

      const dates = formattedRows.map((row) => row.rawDate);
      setStartDate(dates.length > 0 ? dates.reduce((min, date) => (date < min ? date : min)).toISOString().split('T')[0] : '');
      setEndDate(dates.length > 0 ? dates.reduce((max, date) => (date > max ? date : max)).toISOString().split('T')[0] : '');
    }
  }, [open, accesos]);

  const handleFilter = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = rows.filter((row) => {
      const rowDate = row.rawDate;
      if (start && end) {
        return rowDate >= start && rowDate <= new Date(end.setHours(23, 59, 59, 999));
      }
      if (start) {
        return rowDate >= start;
      }
      if (end) {
        return rowDate <= new Date(end.setHours(23, 59, 59, 999));
      }
      return true;
    });

    setFilteredRows(filtered);
  };

  const handleResetFilters = () => {
    setStartDate('');
    setEndDate('');
    setFilteredRows(rows);
  };

  const handlePrint = () => {
    setSnackbar({ open: true, message: 'Reporte impreso correctamente.', severity: 'success' });
  };

  const handleEmail = () => {
    setSnackbar({ open: true, message: 'Reporte enviado al correo registrado.', severity: 'info' });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  const columns = [
    {
      field: 'icono',
      headerName: '',
      width: 50,
      renderCell: (params) => params.value,
    },
    { field: 'tipoAcceso', headerName: 'Tipo de Acceso', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'hora', headerName: 'Hora', flex: 1 },
  ];

  return (
    <ThemeProvider theme={tema}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '4px 4px 0 0',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Reporte de Accesos</Typography>
          </Box>
          <Box>
            <Tooltip title="Imprimir">
              <IconButton onClick={handlePrint} color="inherit">
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Enviar por correo">
              <IconButton onClick={handleEmail} color="inherit">
                <EmailIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <DialogContent>
          <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Grid item>
              <Avatar
                sx={{ width: 64, height: 64, bgcolor: 'secondary.main' }}
                src="/imagenes/capibara.png"
                alt={cliente?.nombre || 'Cliente'}
              >
                {cliente?.nombre ? cliente.nombre[0] : '?'}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'info.main' }}>
                Cliente: <strong>{cliente?.nombre}</strong> <br />
                Email: <strong>{cliente?.email}</strong>
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 2,
              p: 2,
              border: '1px solid',
              borderRadius: 2,
              borderColor: 'divider',
              boxShadow: 1,
              justifyContent: 'space-between',
            }}
          >
            <TextField
              label="Fecha Inicio"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            />
            <TextField
              label="Fecha Fin"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Filtrar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
              Mostrar Todos
            </Button>
          </Box>

          <div style={{ height: 'calc(100vh - 300px)', width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              sx={{
                backgroundColor: 'background.paper',
                border: '1px solid #424242',
                color: 'text.primary',
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="contained">
            Cerrar
          </Button>
        </DialogActions>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSnackbar}>
          <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Dialog>
    </ThemeProvider>
  );
};

export default PopupReporteAcceso;