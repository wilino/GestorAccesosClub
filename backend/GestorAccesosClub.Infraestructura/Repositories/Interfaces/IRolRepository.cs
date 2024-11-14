using GestorAccesosClub.Dominio.Entities;

namespace GestorAccesosClub.Infraestructura.Repositories.Interfaces
{
    public interface IRolRepository : IRepository<Rol>
    {
        Task<Rol> ObtenerRolPorNombreAsync(string nombre);
    }
}

