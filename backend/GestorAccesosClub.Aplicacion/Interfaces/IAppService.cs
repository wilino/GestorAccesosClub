namespace GestorAccesosClub.Aplicacion.Interfaces
{
    public interface IAppService<T, TCreate, TUpdate> where T : class
    {
        Task<T> ObtenerPorId(int id);
        Task<IEnumerable<T>> ObtenerTodos();
        Task<T> Crear(TCreate parametros); 
        Task<bool> Actualizar(TUpdate parametros); 
        Task<bool> Eliminar(int id);
    }
}

