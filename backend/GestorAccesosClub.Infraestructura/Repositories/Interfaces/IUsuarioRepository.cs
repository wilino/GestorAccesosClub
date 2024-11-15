using GestorAccesosClub.Dominio.Entities;

namespace GestorAccesosClub.Infraestructura.Repositories.Interfaces
{
    public interface IUsuarioRepository : IRepository<Usuario>
    {
        Task<Usuario> ObtenerPorEmailAsync(string email);
        Task<Usuario> GetByEmailAndPasswordAsync(string email, string password);
    }
}

