using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using GestorAccesosClub.Infraestructura.Data;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorAccesosClub.Infraestructura.Repositories.Implementaciones
{
    public class AccesoRepository : Repository<Acceso>, IAccesoRepository
    {
        public AccesoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosPorTipoAsync(TipoAcceso tipoAcceso)
        {
            return await _dbSet.Where(a => a.TipoAcceso == tipoAcceso).ToListAsync();
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosEnRangoFechaAsync(DateTime fechaInicio, DateTime fechaFin)
        {
            return await _dbSet.Where(a => a.FechaAcceso >= fechaInicio && a.FechaAcceso <= fechaFin).ToListAsync();
        }
    }
}

