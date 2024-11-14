using System;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Data;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorAccesosClub.Infraestructura.Repositories.Implementaciones
{
    public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Usuario> ObtenerPorEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}

