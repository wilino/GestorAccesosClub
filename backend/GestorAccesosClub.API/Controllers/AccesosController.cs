using System;
using GestorAccesosClub.API.Decorators;
using GestorAccesosClub.API.Models;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Accesos;
using GestorAccesosClub.Dominio.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GestorAccesosClub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [ServiceFilter(typeof(ApiErrorHandlingDecorator))]
    public class AccesosController : ControllerBase
    {
        private readonly IAccesoService _accesoService;

        public AccesosController(IAccesoService accesoService)
        {
            _accesoService = accesoService;
        }

        /// <summary>
        /// Obtiene todos los accesos registrados.
        /// </summary>
        /// <returns>Lista de accesos.</returns>
        [HttpGet]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> GetAccesos()
        {
            var accesos = await _accesoService.ObtenerTodos();
            return Ok(new ApiResponse(accesos, "Lista de accesos obtenida con éxito"));
        }

        /// <summary>
        /// Obtiene un acceso específico por ID.
        /// </summary>
        /// <param name="id">ID del acceso.</param>
        /// <returns>Acceso con el ID especificado.</returns>
        [HttpGet("{id}")]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> GetAcceso(int id)
        {
            var acceso = await _accesoService.ObtenerPorId(id);

            if (acceso == null)
            {
                var response = new ApiResponse(null, "Acceso no encontrado");
                response.HasErrors = true;
                response.Errors.Add($"El acceso con ID {id} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(acceso, "Acceso obtenido con éxito"));
        }

        /// <summary>
        /// Crea un nuevo registro de acceso.
        /// </summary>
        /// <param name="parametros">Parámetros para crear un acceso.</param>
        /// <returns>Acceso creado.</returns>
        [HttpPost]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> CreateAcceso([FromBody] CrearAccesoParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            var nuevoAcceso = await _accesoService.Crear(parametros);
            return CreatedAtAction(nameof(GetAcceso), new { id = nuevoAcceso.AccesoId }, new ApiResponse(nuevoAcceso, "Acceso creado exitosamente"));
        }

        /// <summary>
        /// Actualiza un registro de acceso existente.
        /// </summary>
        /// <param name="parametros">Parámetros para actualizar el acceso.</param>
        /// <returns>Resultado de la actualización.</returns>
        [HttpPut]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> UpdateAcceso([FromBody] ActualizarAccesoParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            var actualizado = await _accesoService.Actualizar(parametros);

            if (!actualizado)
            {
                var response = new ApiResponse(null, "No se pudo actualizar el acceso");
                response.HasErrors = true;
                response.Errors.Add($"El acceso con ID {parametros.AccesoId} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(null, "Acceso actualizado exitosamente"));
        }

        /// <summary>
        /// Elimina un acceso por ID.
        /// </summary>
        /// <param name="id">ID del acceso a eliminar.</param>
        /// <returns>Resultado de la eliminación.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> DeleteAcceso(int id)
        {
            var eliminado = await _accesoService.Eliminar(id);

            if (!eliminado)
            {
                var response = new ApiResponse(null, "No se pudo eliminar el acceso");
                response.HasErrors = true;
                response.Errors.Add($"El acceso con ID {id} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(null, "Acceso eliminado exitosamente"));
        }

        /// <summary>
        /// Obtiene accesos por tipo (entrada o salida).
        /// </summary>
        /// <param name="tipoAcceso">Tipo de acceso (entrada o salida).</param>
        /// <returns>Lista de accesos filtrada por tipo.</returns>
        [HttpGet("tipo/{tipoAcceso}")]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> GetAccesosPorTipo(TipoAcceso tipoAcceso)
        {
            var accesos = await _accesoService.ObtenerAccesosPorTipoAsync(tipoAcceso);
            return Ok(new ApiResponse(accesos, $"Lista de accesos de tipo {tipoAcceso} obtenida con éxito"));
        }

        /// <summary>
        /// Obtiene accesos dentro de un rango de fechas.
        /// </summary>
        /// <param name="fechaInicio">Fecha de inicio.</param>
        /// <param name="fechaFin">Fecha de fin.</param>
        /// <returns>Lista de accesos en el rango de fechas.</returns>
        [HttpGet("rango-fechas")]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> GetAccesosEnRangoFecha(DateTime fechaInicio, DateTime fechaFin)
        {
            var accesos = await _accesoService.ObtenerAccesosEnRangoFechaAsync(fechaInicio, fechaFin);
            return Ok(new ApiResponse(accesos, $"Lista de accesos entre {fechaInicio} y {fechaFin} obtenida con éxito"));
        }


        /// <summary>
        /// Obtiene el último acceso registrado para un cliente específico.
        /// </summary>
        /// <param name="clienteId">ID del cliente.</param>
        /// <returns>Último acceso del cliente.</returns>
        [HttpGet("ultimo-acceso/{clienteId}")]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> GetUltimoAccesoPorCliente(int clienteId)
        {
            try
            {
                var ultimoAcceso = await _accesoService.ObtenerUltimoAccesoPorClienteAsync(clienteId);

                return Ok(new ApiResponse(ultimoAcceso, "Último acceso obtenido con éxito"));
            }
            catch(Exception ex)
            {
                var response = new ApiResponse(null, "No se encontró un registro de acceso para este cliente");
                response.HasErrors = true;
                response.Errors.Add($"El cliente con ID {clienteId} no tiene accesos registrados.");
                return NotFound(response);
            }
        }


        /// <summary>
        /// Obtiene el último acceso registrado para un cliente específico.
        /// </summary>
        /// <param name="clienteId">ID del cliente.</param>
        /// <returns>todos los acceso del cliente.</returns>
        [HttpGet("accesos-cliente/{clienteId}")]
        [Authorize(Roles = "personal_autorizado")]
        public async Task<IActionResult> GetAccesosPorCliente(int clienteId)
        {
            try
            {
                var ultimoAcceso = await _accesoService.ObtenerAccesosPorClienteAsync(clienteId);

                return Ok(new ApiResponse(ultimoAcceso, "Último acceso obtenido con éxito"));
            }
            catch (Exception ex)
            {
                var response = new ApiResponse(null, "No se encontró un registro de acceso para este cliente");
                response.HasErrors = true;
                response.Errors.Add($"El cliente con ID {clienteId} no tiene accesos registrados.");
                return NotFound(response);
            }
        }
    }
}

