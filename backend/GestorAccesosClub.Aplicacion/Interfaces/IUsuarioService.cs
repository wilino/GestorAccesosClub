using GestorAccesosClub.Aplicacion.Parametros.Usuarios;
using GestorAccesosClub.Dominio.Entities;

namespace GestorAccesosClub.Aplicacion.Interfaces
{
    public interface IUsuarioService : IAppService<Usuario, CrearUsuarioParametros, ActualizarUsuarioParametros>
    {
        Task<Usuario> ObtenerPorEmailAsync(string email);
    }
}

