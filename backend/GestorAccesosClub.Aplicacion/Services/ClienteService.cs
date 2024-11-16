using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Clientes;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
                Direccion = parametros.Direccion,
                Telefono = parametros.Telefono,
                TipoCliente=parametros.TipoCliente,
                Email=parametros.Email,
                Estado=parametros.Estado,
                Nombre=parametros.Nombre
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
            cliente.TipoCliente = parametros.TipoCliente;
            cliente.Email = parametros.Email;
            cliente.Estado = parametros.Estado;
            cliente.Nombre = parametros.Nombre;


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
    }
}

