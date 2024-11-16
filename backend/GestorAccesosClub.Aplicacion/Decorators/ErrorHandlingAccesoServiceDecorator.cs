using System;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Accesos;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using Microsoft.Extensions.Logging;

namespace GestorAccesosClub.Aplicacion.Decorators
{
    public class ErrorHandlingAccesoServiceDecorator : ErrorHandlingServiceDecorator<Acceso, CrearAccesoParametros, ActualizarAccesoParametros>, IAccesoService
    {
        private readonly IAccesoService _accesoService;
        private readonly ILogger<ErrorHandlingAccesoServiceDecorator> _logger;

        public ErrorHandlingAccesoServiceDecorator(IAccesoService accesoService, ILogger<ErrorHandlingAccesoServiceDecorator> logger)
            : base(accesoService, logger)
        {
            _accesoService = accesoService;
            _logger = logger;
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosPorTipoAsync(TipoAcceso tipoAcceso)
        {
            try
            {
                return await _accesoService.ObtenerAccesosPorTipoAsync(tipoAcceso);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener accesos del tipo {TipoAcceso}", tipoAcceso);
                throw;
            }
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosEnRangoFechaAsync(DateTime fechaInicio, DateTime fechaFin)
        {
            try
            {
                return await _accesoService.ObtenerAccesosEnRangoFechaAsync(fechaInicio, fechaFin);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener accesos en el rango de fecha {FechaInicio} a {FechaFin}", fechaInicio, fechaFin);
                throw;
            }
        }

       public async Task<object> ObtenerUltimoAccesoPorClienteAsync(int clienteId)
        {
            try
            {
                return await _accesoService.ObtenerUltimoAccesoPorClienteAsync(clienteId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener accesos para el cliente: {clienteId}");
                throw;
            }
        }

        public async Task<object> ObtenerAccesosPorClienteAsync(int clienteId)
        {
            try
            {
                return await _accesoService.ObtenerAccesosPorClienteAsync(clienteId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener accesos para el cliente: {clienteId}");
                throw;
            }
        }
    }
}