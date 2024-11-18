using System;
using GestorAccesosClub.API.Models;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Roles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GestorAccesosClub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRolService _rolService;

        public RolesController(IRolService rolService)
        {
            _rolService = rolService;
        }

        /// <summary>
        /// Obtiene la lista de todos los roles.
        /// </summary>
        /// <returns>Lista de roles.</returns>
        [HttpGet]
       
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _rolService.ObtenerTodos();
            return Ok(new ApiResponse(roles, "Lista de roles obtenida con éxito"));
        }

        /// <summary>
        /// Obtiene un rol específico por ID.
        /// </summary>
        /// <param name="id">ID del rol.</param>
        /// <returns>Rol con el ID especificado.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRol(int id)
        {
            var rol = await _rolService.ObtenerPorId(id);

            if (rol == null)
            {
                var response = new ApiResponse(null, "Rol no encontrado");
                response.HasErrors = true;
                response.Errors.Add($"El rol con ID {id} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(rol, "Rol obtenido con éxito"));
        }

        /// <summary>
        /// Crea un nuevo rol.
        /// </summary>
        /// <param name="parametros">Parámetros para crear un rol.</param>
        /// <returns>Rol creado.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateRol([FromBody] CrearRolParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            var nuevoRol = await _rolService.Crear(parametros);
            return CreatedAtAction(nameof(GetRol), new { id = nuevoRol.RolId }, new ApiResponse(nuevoRol, "Rol creado exitosamente"));
        }

        /// <summary>
        /// Actualiza un rol existente.
        /// </summary>
        /// <param name="parametros">Parámetros para actualizar el rol.</param>
        /// <returns>Resultado de la actualización.</returns>
        [HttpPut]
        public async Task<IActionResult> UpdateRol([FromBody] ActualizarRolParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            var actualizado = await _rolService.Actualizar(parametros);

            if (!actualizado)
            {
                var response = new ApiResponse(null, "No se pudo actualizar el rol");
                response.HasErrors = true;
                response.Errors.Add($"El rol con ID {parametros.RolId} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(null, "Rol actualizado exitosamente"));
        }

        /// <summary>
        /// Elimina un rol por ID.
        /// </summary>
        /// <param name="id">ID del rol a eliminar.</param>
        /// <returns>Resultado de la eliminación.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRol(int id)
        {
            var eliminado = await _rolService.Eliminar(id);

            if (!eliminado)
            {
                var response = new ApiResponse(null, "No se pudo eliminar el rol");
                response.HasErrors = true;
                response.Errors.Add($"El rol con ID {id} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(null, "Rol eliminado exitosamente"));
        }

        /// <summary>
        /// Obtiene un rol específico por nombre.
        /// </summary>
        /// <param name="nombre">Nombre del rol.</param>
        /// <returns>Rol con el nombre especificado.</returns>
        [HttpGet("nombre/{nombre}")]
        public async Task<IActionResult> GetRolPorNombre(string nombre)
        {
            var rol = await _rolService.ObtenerRolPorNombreAsync(nombre);

            if (rol == null)
            {
                var response = new ApiResponse(null, "Rol no encontrado");
                response.HasErrors = true;
                response.Errors.Add($"El rol con nombre {nombre} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(rol, "Rol obtenido con éxito"));
        }
    }
}

