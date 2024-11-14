using GestorAccesosClub.Aplicacion.Parametros.Roles;
using GestorAccesosClub.Dominio.Entities;

namespace GestorAccesosClub.Aplicacion.Interfaces
{
    public interface IRolService : IAppService<Rol, CrearRolParametros, ActualizarRolParametros>
    {
        Task<Rol> ObtenerRolPorNombreAsync(string nombre);
    }
}

