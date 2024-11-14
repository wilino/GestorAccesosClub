using System;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace GestorAccesosClub.Infraestructura.Decorators
{
    public class RepositoryLoggingDecorator<T> : IRepository<T> where T : class
    {
        private readonly IRepository<T> _innerRepository;
        private readonly ILogger<RepositoryLoggingDecorator<T>> _logger;

        public RepositoryLoggingDecorator(IRepository<T> innerRepository, ILogger<RepositoryLoggingDecorator<T>> logger)
        {
            _innerRepository = innerRepository;
            _logger = logger;
        }

        public async Task<T> ObtenerPorIdAsync(int id)
        {
            _logger.LogInformation($"Iniciando operación: Obtener entidad de tipo {typeof(T).Name} con ID {id}");
            try
            {
                var result = await _innerRepository.ObtenerPorIdAsync(id);
                _logger.LogInformation($"Operación completada: Entidad de tipo {typeof(T).Name} con ID {id} obtenida exitosamente");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener entidad de tipo {typeof(T).Name} con ID {id}");
                throw;
            }
        }

        public async Task<IEnumerable<T>> ObtenerTodosAsync()
        {
            _logger.LogInformation($"Iniciando operación: Obtener todas las entidades de tipo {typeof(T).Name}");
            try
            {
                var result = await _innerRepository.ObtenerTodosAsync();
                _logger.LogInformation($"Operación completada: Todas las entidades de tipo {typeof(T).Name} obtenidas exitosamente");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener todas las entidades de tipo {typeof(T).Name}");
                throw;
            }
        }

        public async Task CrearAsync(T entity)
        {
            _logger.LogInformation($"Iniciando operación: Crear entidad de tipo {typeof(T).Name}");
            try
            {
                await _innerRepository.CrearAsync(entity);
                _logger.LogInformation($"Operación completada: Entidad de tipo {typeof(T).Name} creada exitosamente");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al crear entidad de tipo {typeof(T).Name}");
                throw;
            }
        }

        public async Task ActualizarAsync(T entity)
        {
            _logger.LogInformation($"Iniciando operación: Actualizar entidad de tipo {typeof(T).Name}");
            try
            {
                await _innerRepository.ActualizarAsync(entity);
                _logger.LogInformation($"Operación completada: Entidad de tipo {typeof(T).Name} actualizada exitosamente");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al actualizar entidad de tipo {typeof(T).Name}");
                throw;
            }
        }

        public async Task EliminarAsync(int id)
        {
            _logger.LogInformation($"Iniciando operación: Eliminar entidad de tipo {typeof(T).Name} con ID {id}");
            try
            {
                await _innerRepository.EliminarAsync(id);
                _logger.LogInformation($"Operación completada: Entidad de tipo {typeof(T).Name} con ID {id} eliminada exitosamente");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar entidad de tipo {typeof(T).Name} con ID {id}");
                throw;
            }
        }
    }
}

