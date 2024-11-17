import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/comunes/navbar/Navbar';
import Dashboard from './paginas/Dashboard';
import UsuariosPage from './paginas/usuarios/UsuariosPage';
import ClientesPage from './paginas/clientes/ClientesPage';
import AccesosPage from './paginas/accesos/AccesosPage';
import Login from './paginas/Login';
import PrivateRoute from './componentes/comunes/PrivateRoute';
import { AuthProvider } from './contextos/AuthContext';
import { GetUsuarioProvider } from './contextos/GetUsuarioContext';
import { CreateUsuarioProvider } from './contextos/CreateUsuarioContext';
import { DeleteUsuarioProvider } from './contextos/DeleteUsuarioContext';
import { UpdateUsuarioProvider } from './contextos/UpdateUsuarioContext';
import { GetClienteProvider } from './contextos/Cliente/GetClienteContext';
import { CreateClienteProvider } from './contextos/Cliente/CreateClienteContext';
import { DeleteClienteProvider } from './contextos/Cliente/DeleteClienteContext';
import { UpdateClienteProvider } from './contextos/Cliente/UpdateClienteContext';
import { TarjetaDashboardValorProvider } from './contextos/TarjetaDashboardValorContext';
import { GetUltimoAccesoProvider } from './contextos/acceso/GetUltimoAccesoContext';
import { CreateAccesoProvider } from './contextos/acceso/CreateAccesoContext';
import { AccesoGetClienteProvider } from './contextos/acceso/AccesoGetClienteContext';
import { GetAccesosClienteProvider } from './contextos/acceso/GetAccesosClienteContext'; // Importación del nuevo proveedor

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/dashboard"
              element={
                <TarjetaDashboardValorProvider>
                  <Dashboard />
                </TarjetaDashboardValorProvider>
              }
            />
            <Route
              path="/usuarios"
              element={
                <GetUsuarioProvider>
                  <CreateUsuarioProvider>
                    <UpdateUsuarioProvider>
                      <DeleteUsuarioProvider>
                        <UsuariosPage />
                      </DeleteUsuarioProvider>
                    </UpdateUsuarioProvider>
                  </CreateUsuarioProvider>
                </GetUsuarioProvider>
              }
            />
            <Route
              path="/clientes"
              element={
                <GetClienteProvider>
                  <CreateClienteProvider>
                    <UpdateClienteProvider>
                      <DeleteClienteProvider>
                        <ClientesPage />
                      </DeleteClienteProvider>
                    </UpdateClienteProvider>
                  </CreateClienteProvider>
                </GetClienteProvider>
              }
            />
            <Route
              path="/accesos"
              element={
                <AccesoGetClienteProvider>
                  <GetUltimoAccesoProvider>
                    <CreateAccesoProvider>
                      <GetAccesosClienteProvider> 
                        <AccesosPage />
                      </GetAccesosClienteProvider>
                    </CreateAccesoProvider>
                  </GetUltimoAccesoProvider>
                </AccesoGetClienteProvider>
              }
            />
          </Route>
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;