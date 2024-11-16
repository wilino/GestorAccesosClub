using GestorAccesosClub.API.Models;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Clientes;
using Microsoft.AspNetCore.Mvc;

namespace GestorAccesosClub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        /// <summary>
        /// Obtiene la lista de todos los clientes.
        /// </summary>
        /// <returns>Lista de clientes con campos seleccionados.</returns>
        [HttpGet]
        public async Task<IActionResult> GetClientes()
        {
            var clientes = await _clienteService.ObtenerTodos();
            var result = clientes.Select(cliente => new
            {
                cliente.ClienteId,
                cliente.Nombre,
                cliente.Direccion,
                cliente.Telefono,
                cliente.TipoCliente,
                cliente.Email,
                cliente.Estado
            });
            return Ok(new ApiResponse(result, "Lista de clientes obtenida con éxito"));
        }

        /// <summary>
        /// Obtiene un cliente específico por ID.
        /// </summary>
        /// <param name="id">ID del cliente.</param>
        /// <returns>Cliente con campos seleccionados.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            var cliente = await _clienteService.ObtenerPorId(id);

            if (cliente == null)
            {
                var response = new ApiResponse(null, "Cliente no encontrado");
                response.HasErrors = true;
                response.Errors.Add($"El cliente con ID {id} no existe.");
                return NotFound(response);
            }

            var result = new
            {
                cliente.ClienteId,
                cliente.Nombre,
                cliente.Direccion,
                cliente.Telefono,
                cliente.TipoCliente,
                cliente.Email,
                cliente.Estado
            };

            return Ok(new ApiResponse(result, "Cliente obtenido con éxito"));
        }

        /// <summary>
        /// Crea un nuevo cliente.
        /// </summary>
        /// <param name="parametros">Parámetros para crear un cliente.</param>
        /// <returns>Cliente creado.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateCliente([FromBody] CrearClienteParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            var nuevoCliente = await _clienteService.Crear(parametros);
            return CreatedAtAction(nameof(GetCliente), new { id = nuevoCliente.ClienteId }, new ApiResponse(nuevoCliente, "Cliente creado exitosamente"));
        }

        /// <summary>
        /// Actualiza un cliente existente.
        /// </summary>
        /// <param name="parametros">Parámetros para actualizar el cliente.</param>
        /// <returns>Resultado de la actualización.</returns>
        [HttpPut]
        public async Task<IActionResult> UpdateCliente([FromBody] ActualizarClienteParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            var actualizado = await _clienteService.Actualizar(parametros);

            if (!actualizado)
            {
                var response = new ApiResponse(null, "No se pudo actualizar el cliente");
                response.HasErrors = true;
                response.Errors.Add($"El cliente con ID {parametros.ClienteId} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(parametros, "Cliente actualizado exitosamente"));
        }

        /// <summary>
        /// Elimina un cliente por ID.
        /// </summary>
        /// <param name="id">ID del cliente a eliminar.</param>
        /// <returns>Resultado de la eliminación.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var eliminado = await _clienteService.Eliminar(id);

            if (!eliminado)
            {
                var response = new ApiResponse(null, "No se pudo eliminar el cliente");
                response.HasErrors = true;
                response.Errors.Add($"El cliente con ID {id} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(null, "Cliente eliminado exitosamente"));
        }
    }
}

