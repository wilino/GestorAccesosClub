import React from 'react';
import EventoDestacado from '../componentes/diseño/EventoDestacado';

const Inicio = () => {
  return (
    <div>
      <h1>Bienvenido al Club VIP</h1>
      <EventoDestacado
        titulo="Fiesta Exclusiva de Fin de Año"
        descripcion="Celebra el Año Nuevo en el evento más exclusivo de la ciudad."
        imagen="/imagenes/fiesta-año-nuevo.png"
        onVerEvento={() => alert("Ver detalles del evento")}
      />
    </div>
  );
};

export default Inicio;