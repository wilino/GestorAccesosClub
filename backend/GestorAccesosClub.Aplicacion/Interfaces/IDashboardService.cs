using System.Threading.Tasks;

namespace GestorAccesosClub.Aplicacion.Interfaces
{
    public interface IDashboardService
    {
        Task<int> GetTotalAccesosAsync();
        Task<int> GetTotalClientesAsync();
        Task<int> GetTotalUsuariosAsync();
        Task<int> GetAccesosDelMesPorClienteIdAsync(int clienteId);
        Task<int> GetAccesosDelDiaAsync();
    }
}