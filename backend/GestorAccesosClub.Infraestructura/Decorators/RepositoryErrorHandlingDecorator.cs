using GestorAccesosClub.Infraestructura.Repositories.Interfaces;

namespace GestorAccesosClub.Infraestructura.Decorators
{
    public class RepositoryErrorHandlingDecorator<T> : IRepository<T> where T : class
    {
        private readonly IRepository<T> _innerRepository;

        public RepositoryErrorHandlingDecorator(IRepository<T> innerRepository)
        {
            _innerRepository = innerRepository;
        }

        public async Task<T> ObtenerPorIdAsync(int id)
        {
            try
            {
                return await _innerRepository.ObtenerPorIdAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al obtener entidad de tipo {typeof(T).Name} con ID {id}.", ex);
            }
        }

        public async Task<IEnumerable<T>> ObtenerTodosAsync()
        {
            try
            {
                return await _innerRepository.ObtenerTodosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al obtener todas las entidades de tipo {typeof(T).Name}.", ex);
            }
        }

        public async Task CrearAsync(T entity)
        {
            try
            {
                await _innerRepository.CrearAsync(entity);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al crear entidad de tipo {typeof(T).Name}.", ex);
            }
        }

        public async Task ActualizarAsync(T entity)
        {
            try
            {
                await _innerRepository.ActualizarAsync(entity);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al actualizar entidad de tipo {typeof(T).Name}.", ex);
            }
        }

        public async Task EliminarAsync(int id)
        {
            try
            {
                await _innerRepository.EliminarAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al eliminar entidad de tipo {typeof(T).Name} con ID {id}.", ex);
            }
        }
    }
}


