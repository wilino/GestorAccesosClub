using GestorAccesosClub.Aplicacion.Parametros.Clientes;
using GestorAccesosClub.Dominio.Entities;

namespace GestorAccesosClub.Aplicacion.Interfaces
{
    public interface IClienteService : IAppService<Cliente, CrearClienteParametros, ActualizarClienteParametros>
    {
        Task<IEnumerable<Cliente>> ObtenerClientesPorUsuarioIdAsync(int usuarioId);
    }
}

