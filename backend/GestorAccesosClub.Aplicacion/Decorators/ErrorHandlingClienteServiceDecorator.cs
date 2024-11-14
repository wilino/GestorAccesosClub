using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Clientes;
using GestorAccesosClub.Dominio.Entities;
using Microsoft.Extensions.Logging;

namespace GestorAccesosClub.Aplicacion.Decorators
{
    public class ErrorHandlingClienteServiceDecorator : ErrorHandlingServiceDecorator<Cliente, CrearClienteParametros, ActualizarClienteParametros>, IClienteService
    {
        private readonly IClienteService _clienteService;
        private readonly ILogger<ErrorHandlingClienteServiceDecorator> _logger;

        public ErrorHandlingClienteServiceDecorator(IClienteService clienteService, ILogger<ErrorHandlingClienteServiceDecorator> logger)
            : base(clienteService, logger)
        {
            _clienteService = clienteService;
            _logger = logger;
        }

        public async Task<IEnumerable<Cliente>> ObtenerClientesPorUsuarioIdAsync(int usuarioId)
        {
            try
            {
                return await _clienteService.ObtenerClientesPorUsuarioIdAsync(usuarioId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener clientes para el usuario con ID {UsuarioId}", usuarioId);
                throw;
            }
        }
    }
}

