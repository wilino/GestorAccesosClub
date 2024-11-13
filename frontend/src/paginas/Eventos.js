import React from 'react';
import EventoDestacado from '../componentes/diseño/EventoDestacado';
import useFetch from '../hooks/useFetch';

const Eventos = () => {
  const { data: eventos, isLoading, error } = useFetch('/api/eventos'); // Reemplaza con tu URL real

  if (isLoading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error al cargar eventos: {error}</p>;

  return (
    <div>
      <h1>Eventos del Club</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {eventos && eventos.map((evento) => (
          <EventoDestacado
            key={evento.id}
            titulo={evento.titulo}
            descripcion={evento.descripcion}
            imagen={evento.imagen}
            onVerEvento={() => alert(`Ver detalles del evento ${evento.titulo}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Eventos;