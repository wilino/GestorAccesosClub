using System;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Data;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorAccesosClub.Infraestructura.Repositories.Implementaciones
{
    public class ClienteRepository : Repository<Cliente>, IClienteRepository
    {
        public ClienteRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Cliente>> ObtenerClientesPorUsuarioIdAsync(int usuarioId)
        {
            return await _dbSet.Where(c => c.UsuarioId == usuarioId).ToListAsync();
        }
    }
}

