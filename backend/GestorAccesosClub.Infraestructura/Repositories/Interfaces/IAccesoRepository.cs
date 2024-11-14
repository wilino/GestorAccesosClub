using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Infraestructura.Repositories.Interfaces
{
    public interface IAccesoRepository : IRepository<Acceso>
    {
        Task<IEnumerable<Acceso>> ObtenerAccesosPorTipoAsync(TipoAcceso tipoAcceso);
        Task<IEnumerable<Acceso>> ObtenerAccesosEnRangoFechaAsync(DateTime fechaInicio, DateTime fechaFin);
    }
}

