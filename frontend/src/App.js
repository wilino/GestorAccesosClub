// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/comunes/navbar/Navbar';
import Dashboard from './paginas/Dashboard';
import ListaUsuarios from './paginas/usuarios/ListaUsuarios';
import ListaAccesos from './paginas/accesos/ListaAccesos';
import ListaClientes from './paginas/clientes/ListaClientes';
import Login from './paginas/Login';
import DetalleAccesos from './paginas/accesos/DetalleAccesos';
import DetalleClientes from './paginas/clientes/DetalleClientes';
import DetalleUsuario from './paginas/usuarios/DetalleUsuario';
import { AuthProvider } from './contextos/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usuarios/ListaUsuarios" element={<ListaUsuarios />} />
            <Route path="/usuarios/DetalleUsuario" element={<DetalleUsuario />} />
            <Route path="/accesos/ListaAccesos" element={<ListaAccesos />} />
            <Route path="/accesos/DetalleAccesos" element={<DetalleAccesos />} />
            <Route path="/clientes/ListaClientes" element={<ListaClientes />} />
            <Route path="/clientes/DetalleClientes" element={<DetalleClientes />} />
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </LocalizationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;