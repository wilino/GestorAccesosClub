using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Data;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorAccesosClub.Infraestructura.Repositories.Implementaciones
{
    public class RolRepository : Repository<Rol>, IRolRepository
    {
        public RolRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Rol> ObtenerRolPorNombreAsync(string nombre)
        {
            return await _dbSet.FirstOrDefaultAsync(r => r.Nombre == nombre);
        }
    }
}

