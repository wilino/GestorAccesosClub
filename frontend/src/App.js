import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './componentes/diseño/Layout';
import Inicio from './paginas/Inicio';
import Miembros from './paginas/Miembros';
import Eventos from './paginas/Eventos';
import PerfilUsuario from './paginas/PerfilUsuario';
import NoEncontrado from './paginas/NoEncontrado';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/miembros" element={<Miembros />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;