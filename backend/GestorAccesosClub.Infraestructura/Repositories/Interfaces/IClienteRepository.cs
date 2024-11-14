using GestorAccesosClub.Dominio.Entities;

namespace GestorAccesosClub.Infraestructura.Repositories.Interfaces
{
    public interface IClienteRepository : IRepository<Cliente>
    {
        Task<IEnumerable<Cliente>> ObtenerClientesPorUsuarioIdAsync(int usuarioId);
    }
}

