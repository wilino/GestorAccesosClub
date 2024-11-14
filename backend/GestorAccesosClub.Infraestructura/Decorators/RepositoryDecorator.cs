using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace GestorAccesosClub.Infraestructura.Decorators
{
    public class RepositoryDecorator<T> : IRepository<T> where T : class
    {
        private readonly IRepository<T> _innerRepository;
        private readonly ILogger<RepositoryDecorator<T>> _logger;

        public RepositoryDecorator(IRepository<T> innerRepository, ILogger<RepositoryDecorator<T>> logger)
        {
            _innerRepository = innerRepository;
            _logger = logger;
        }

        public async Task<T> ObtenerPorIdAsync(int id)
        {
            try
            {
                _logger.LogInformation($"Obteniendo entidad de tipo {typeof(T).Name} con ID {id}");
                var result = await _innerRepository.ObtenerPorIdAsync(id);
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
            try
            {
                _logger.LogInformation($"Obteniendo todas las entidades de tipo {typeof(T).Name}");
                var result = await _innerRepository.ObtenerTodosAsync();
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
            try
            {
                _logger.LogInformation($"Creando entidad de tipo {typeof(T).Name}");
                await _innerRepository.CrearAsync(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al crear entidad de tipo {typeof(T).Name}");
                throw;
            }
        }

        public async Task ActualizarAsync(T entity)
        {
            try
            {
                _logger.LogInformation($"Actualizando entidad de tipo {typeof(T).Name}");
                await _innerRepository.ActualizarAsync(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al actualizar entidad de tipo {typeof(T).Name}");
                throw;
            }
        }

        public async Task EliminarAsync(int id)
        {
            try
            {
                _logger.LogInformation($"Eliminando entidad de tipo {typeof(T).Name} con ID {id}");
                await _innerRepository.EliminarAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar entidad de tipo {typeof(T).Name} con ID {id}");
                throw;
            }
        }
    }
}