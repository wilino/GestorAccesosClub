using System;
using System.Linq;
using System.Threading.Tasks;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;

namespace GestorAccesosClub.Aplicacion.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IAccesoRepository _accesoRepository;
        private readonly IClienteRepository _clienteRepository;
        private readonly IUsuarioRepository _usuarioRepository;

        public DashboardService(
            IAccesoRepository accesoRepository,
            IClienteRepository clienteRepository,
            IUsuarioRepository usuarioRepository)
        {
            _accesoRepository = accesoRepository;
            _clienteRepository = clienteRepository;
            _usuarioRepository = usuarioRepository;
        }

        public async Task<int> GetTotalAccesosAsync()
        {
            var accesos = await _accesoRepository.ObtenerTodosAsync();
            return accesos.Count();
        }

        public async Task<int> GetTotalClientesAsync()
        {
            var clientes = await _clienteRepository.ObtenerTodosAsync();
            return clientes.Count();
        }

        public async Task<int> GetTotalUsuariosAsync()
        {
            var usuarios = await _usuarioRepository.ObtenerTodosAsync();
            return usuarios.Count();
        }

        public async Task<int> GetAccesosDelMesPorClienteIdAsync(int clienteId)
        {
            var accesos = await _accesoRepository.ObtenerPorClienteIdAsync(clienteId);
            var inicioMes = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var accesosDelMes = accesos.Where(a => a.FechaAcceso >= inicioMes).Count();
            return accesosDelMes;
        }

        public async Task<int> GetAccesosDelDiaAsync()
        {
            var accesos = await _accesoRepository.ObtenerTodosAsync();
            var inicioDia = DateTime.Today;
            var accesosDelDia = accesos.Where(a => a.FechaAcceso >= inicioDia).Count();
            return accesosDelDia;
        }
    }
}