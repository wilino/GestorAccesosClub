import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import UsuariosTable from '../../componentes/usuarios/UsuariosTable';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('/Usuarios');
        setUsuarios(response.data.data);
      } catch (err) {
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div>
      {loading ? <p>Cargando...</p> : <UsuariosTable usuarios={usuarios} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ListaUsuarios;