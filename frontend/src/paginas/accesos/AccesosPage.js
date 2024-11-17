import React, { useState, useEffect } from 'react';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import FiltrosAcceso from '../../componentes/accesos/FiltrosAcceso';
import TablaAccesos from '../../componentes/accesos/TablaAccesos';
import PopupAcceso from '../../componentes/accesos/PopupAcceso';
import PopupReporteAcceso from '../../componentes/accesos/PopupReporteAcceso';
import { useAccesoGetCliente } from '../../contextos/acceso/AccesoGetClienteContext';
import { useGetAccesosCliente } from '../../contextos/acceso/GetAccesosClienteContext';
import { useCreateAcceso } from '../../contextos/acceso/CreateAccesoContext';
import { useGetUltimoAcceso } from '../../contextos/acceso/GetUltimoAccesoContext'; // Asegúrate de importar correctamente el hook
import PageHeader from '../../componentes/comunes/PageHeader';

const AccesosPage = () => {
  const { clientes, loading, error } = useAccesoGetCliente();
  const { fetchAccesosCliente } = useGetAccesosCliente();
  const { createAcceso } = useCreateAcceso();
  const { getUltimoAcceso } = useGetUltimoAcceso(); // Usamos el hook getUltimoAcceso

  const [clientesConUltimosAccesos, setClientesConUltimosAccesos] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [tipoAcceso, setTipoAcceso] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupReporte, setShowPopupReporte] = useState(false);
  const [accesos, setAccesos] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchUltimosAccesos = async () => {
    if (clientes.length === 0) return;

    try {
      const clientesActualizados = await Promise.all(
        clientes.map(async (cliente) => {
          const ultimoAcceso = await getUltimoAcceso(cliente.clienteId); // Usamos getUltimoAcceso aquí
          return {
            ...cliente,
            clienteId: cliente.clienteId || cliente.id, // Aseguramos que el clienteId esté presente
            ultimoAcceso,
          };
        })
      );

      setClientesConUltimosAccesos(clientesActualizados);
      setClientesFiltrados(clientesActualizados);
      localStorage.setItem('acceso_clientes', JSON.stringify(clientesActualizados));
    } catch (err) {
      console.error('Error al obtener últimos accesos:', err);
    }
  };

  useEffect(() => {
    fetchUltimosAccesos();
  }, [clientes, getUltimoAcceso]); // Asegúrate de incluir getUltimoAcceso como dependencia

  const handleAcceso = (cliente, tipo) => {
    const clienteData = {
      ...cliente,
      clienteId: cliente.id,
    };
    setSelectedCliente(clienteData);
    setTipoAcceso(tipo);
    setShowPopup(true);
  };

  const handleVerAccesos = async (cliente) => {
    try {
      const clienteId = cliente.id; // Obtén el ID del cliente
      if (clienteId) {
        console.log('Cargando accesos para el cliente con ID:', clienteId);
        const fetchedAccesos = await fetchAccesosCliente(clienteId); // Llama al servicio
        setAccesos(fetchedAccesos); // Actualiza el estado con los accesos
        setSelectedCliente(cliente); // Selecciona el cliente actual
        setShowPopupReporte(true); // Muestra el popup
      } else {
        console.error('Cliente ID no disponible');
      }
    } catch (error) {
      console.error('Error al cargar los accesos:', error);
    }
  };

  const handleConfirmarAcceso = async (fechaHora) => {
    try {
      await createAcceso({
        clienteId: selectedCliente.clienteId,
        tipoAcceso: tipoAcceso === 'entrada' ? 1 : 2,
        fechaAcceso: fechaHora,
      });

      localStorage.removeItem('acceso_clientes');
      await fetchUltimosAccesos();

      setSnackbar({
        open: true,
        message: `Acceso ${tipoAcceso} registrado con éxito.`,
        severity: 'success',
      });

      setShowPopup(false);
    } catch (err) {
      console.error('Error al registrar acceso:', err);
      setSnackbar({
        open: true,
        message: 'Error al registrar acceso.',
        severity: 'error',
      });
    }
  };

  const handleFiltrar = (filtros) => {
    const filtrarClientes = clientesConUltimosAccesos.filter((cliente) => {
      return (
        (!filtros.nombre || cliente.nombre.toLowerCase().includes(filtros.nombre)) &&
        (!filtros.email || cliente.email.toLowerCase().includes(filtros.email))
      );
    });

    setClientesFiltrados(filtrarClientes);
  };

  const handleCloseSnackbar = () => setSnackbar({ open: false, message: '', severity: 'success' });

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        title="Accesos al Club"
        subtitle="Registra y gestiona las entradas y salidas"
        icon={<DoorFrontIcon sx={{ fontSize: 40, color: '#FFD700' }} />}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          backgroundColor: '#212121',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <FiltrosAcceso onFiltrar={handleFiltrar} />
        <TablaAccesos
          clientes={clientesFiltrados}
          onAcceso={handleAcceso}
          onVerAccesos={handleVerAccesos}
        />
      </Box>

      <PopupAcceso
        open={showPopup}
        cliente={selectedCliente}
        tipoAcceso={tipoAcceso}
        onConfirmar={handleConfirmarAcceso}
        onClose={() => setShowPopup(false)}
      />

      <PopupReporteAcceso
        open={showPopupReporte}
        cliente={selectedCliente}
        accesos={accesos}
        onClose={() => setShowPopupReporte(false)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AccesosPage;