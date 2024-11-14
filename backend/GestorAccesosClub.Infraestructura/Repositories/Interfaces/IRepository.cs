using System;
namespace GestorAccesosClub.Infraestructura.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> ObtenerPorIdAsync(int id);                 
        Task<IEnumerable<T>> ObtenerTodosAsync();        
        Task CrearAsync(T entity);                        
        Task ActualizarAsync(T entity);                    
        Task EliminarAsync(int id);                        
    }
}

