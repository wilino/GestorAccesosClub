import React from 'react';
import MemberCard from '../componentes/comunes/MemberCard';

const Miembros = () => {
  const miembros = [
    { nombre: 'Carlos Mendoza', nivel: 'VIP', proximosEventos: '2' },
    { nombre: 'María López', nivel: 'Gold', proximosEventos: '1' },
  ];

  return (
    <div>
      <h1>Miembros del Club</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {miembros.map((miembro, index) => (
          <MemberCard
            key={index}
            nombre={miembro.nombre}
            nivel={miembro.nivel}
            proximosEventos={miembro.proximosEventos}
          />
        ))}
      </div>
    </div>
  );
};

export default Miembros;