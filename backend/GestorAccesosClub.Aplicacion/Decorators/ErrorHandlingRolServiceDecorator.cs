using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Roles;
using GestorAccesosClub.Dominio.Entities;
using Microsoft.Extensions.Logging;

namespace GestorAccesosClub.Aplicacion.Decorators
{
    public class ErrorHandlingRolServiceDecorator : ErrorHandlingServiceDecorator<Rol, CrearRolParametros, ActualizarRolParametros>, IRolService
    {
        private readonly IRolService _rolService;
        private readonly ILogger<ErrorHandlingRolServiceDecorator> _logger;

        public ErrorHandlingRolServiceDecorator(IRolService rolService, ILogger<ErrorHandlingRolServiceDecorator> logger)
            : base(rolService, logger)
        {
            _rolService = rolService;
            _logger = logger;
        }

        public async Task<Rol> Crear(CrearRolParametros parametros)
        {
            try
            {
                return await _rolService.Crear(parametros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear rol con parámetros {Parametros}", parametros);
                throw;
            }
        }

        public async Task<bool> Actualizar(ActualizarRolParametros parametros)
        {
            try
            {
                return await _rolService.Actualizar(parametros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar rol con parámetros {Parametros}", parametros);
                throw;
            }
        }

        public async Task<Rol> ObtenerRolPorNombreAsync(string nombre)
        {
            try
            {
                return await _rolService.ObtenerRolPorNombreAsync(nombre);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener rol con nombre {Nombre}", nombre);
                throw;
            }
        }
    }
}
