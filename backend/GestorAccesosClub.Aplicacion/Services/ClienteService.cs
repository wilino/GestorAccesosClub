using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Clientes;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;

namespace GestorAccesosClub.Aplicacion.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;

        public ClienteService(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public async Task<Cliente> Crear(CrearClienteParametros parametros)
        {
            var cliente = new Cliente
            {
                UsuarioId = parametros.UsuarioId,
                Direccion = parametros.Direccion,
                Telefono = parametros.Telefono
            };

            await _clienteRepository.CrearAsync(cliente);
            return cliente;
        }

        public async Task<bool> Actualizar(ActualizarClienteParametros parametros)
        {
            var cliente = await _clienteRepository.ObtenerPorIdAsync(parametros.ClienteId);
            if (cliente == null)
            {
                return false;
            }

            cliente.Direccion = parametros.Direccion;
            cliente.Telefono = parametros.Telefono;

            await _clienteRepository.ActualizarAsync(cliente);
            return true;
        }

        public async Task<Cliente> ObtenerPorId(int id)
        {
            return await _clienteRepository.ObtenerPorIdAsync(id);
        }

        public async Task<IEnumerable<Cliente>> ObtenerTodos()
        {
            return await _clienteRepository.ObtenerTodosAsync();
        }

        public async Task<bool> Eliminar(int id)
        {
            var cliente = await _clienteRepository.ObtenerPorIdAsync(id);
            if (cliente == null)
            {
                return false;
            }

            await _clienteRepository.EliminarAsync(id);
            return true;
        }

        public async Task<IEnumerable<Cliente>> ObtenerClientesPorUsuarioIdAsync(int usuarioId)
        {
            return await _clienteRepository.ObtenerClientesPorUsuarioIdAsync(usuarioId);
        }
    }
}

