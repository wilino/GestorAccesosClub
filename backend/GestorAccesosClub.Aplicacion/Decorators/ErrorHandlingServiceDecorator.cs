using System;
using GestorAccesosClub.Aplicacion.Interfaces;
using Microsoft.Extensions.Logging;

namespace GestorAccesosClub.Aplicacion.Decorators
{
    public class ErrorHandlingServiceDecorator<T, TCreate, TUpdate> : IAppService<T, TCreate, TUpdate> where T : class
    {
        private readonly IAppService<T, TCreate, TUpdate> _inner;
        private readonly ILogger<ErrorHandlingServiceDecorator<T, TCreate, TUpdate>> _logger;

        public ErrorHandlingServiceDecorator(IAppService<T, TCreate, TUpdate> inner, ILogger<ErrorHandlingServiceDecorator<T, TCreate, TUpdate>> logger)
        {
            _inner = inner;
            _logger = logger;
        }

        public async Task<T> ObtenerPorId(int id)
        {
            try
            {
                return await _inner.ObtenerPorId(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener entidad de tipo {EntityType} con ID {Id}", typeof(T).Name, id);
                throw;
            }
        }

        public async Task<IEnumerable<T>> ObtenerTodos()
        {
            try
            {
                return await _inner.ObtenerTodos();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener todas las entidades de tipo {EntityType}", typeof(T).Name);
                throw;
            }
        }

        public async Task<T> Crear(TCreate parametros)
        {
            try
            {
                return await _inner.Crear(parametros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear entidad de tipo {EntityType} con parámetros de tipo {ParamType}", typeof(T).Name, typeof(TCreate).Name);
                throw;
            }
        }

        public async Task<bool> Actualizar(TUpdate parametros)
        {
            try
            {
                return await _inner.Actualizar(parametros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar entidad de tipo {EntityType} con parámetros de tipo {ParamType}", typeof(T).Name, typeof(TUpdate).Name);
                throw;
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                return await _inner.Eliminar(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar entidad de tipo {EntityType} con ID {Id}", typeof(T).Name, id);
                throw;
            }
        }
    }
}