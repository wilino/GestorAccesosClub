using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.API.Models;
using GestorAccesosClub.API.Decorators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GestorAccesosClub.Aplicacion.Parametros.Usuarios;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;

namespace GestorAccesosClub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Protege todos los métodos
    [ServiceFilter(typeof(ApiErrorHandlingDecorator))] // Aplica el decorador para el manejo de errores
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        /// <summary>
        /// Obtiene la lista de todos los usuarios.
        /// </summary>
        /// <returns>Lista de usuarios con campos seleccionados.</returns>
        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _usuarioService.ObtenerTodos();
            var result = usuarios.Select(usuario => new
            {
                usuario.UsuarioId,
                usuario.Nombre,
                usuario.Email,
                usuario.FechaCreacion,
                usuario.Contraseña,
                Rol = usuario.TipoRolNombre,
                usuario.RolId
                
            });

            return Ok(new ApiResponse(result, "Lista de usuarios obtenida con éxito"));
        }

        /// <summary>
        /// Obtiene un usuario específico por ID.
        /// </summary>
        /// <param name="id">ID del usuario.</param>
        /// <returns>Usuario con campos seleccionados.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuario(int id)
        {
            var usuario = await _usuarioService.ObtenerPorId(id);

            if (usuario == null)
            {
                var response = new ApiResponse(null, "Usuario no encontrado");
                response.HasErrors = true;
                response.Errors.Add($"El usuario con ID {id} no existe.");
                return NotFound(response);
            }

            var result = new
            {
                usuario.UsuarioId,
                usuario.Nombre,
                usuario.Email,
                usuario.FechaCreacion
            };

            return Ok(new ApiResponse(result, "Usuario obtenido con éxito"));
        }

        /// <summary>
        /// Crea un nuevo usuario. Solo el personal autorizado o administradores pueden realizar esta acción.
        /// </summary>
        /// <param name="parametros">Parámetros para crear un usuario.</param>
        /// <returns>Usuario creado.</returns>
        [HttpPost]
        [Authorize(Roles = "admin,personal_autorizado")] // Restringe por roles
        public async Task<IActionResult> CreateUsuario([FromBody] CrearUsuarioParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            // Verificar el rol explícitamente si es necesario
            var userRole = User.FindFirstValue(ClaimTypes.Role);
            if (userRole != "admin" && userRole != "personal_autorizado")
            {
                return Forbid("No tienes permisos para realizar esta acción.");
            }

            var nuevoUsuario = await _usuarioService.Crear(parametros);

            if (nuevoUsuario == null)
            {
                return BadRequest(new ApiResponse(null, "El usuario ya fue registrado"));
            }

            var result = new
            {
                nuevoUsuario.UsuarioId,
                nuevoUsuario.Nombre,
                nuevoUsuario.Email
            };

            return CreatedAtAction(nameof(GetUsuario), new { id = nuevoUsuario.UsuarioId }, new ApiResponse(result, "Usuario creado exitosamente"));
        }

        /// <summary>
        /// Actualiza un usuario existente.
        /// </summary>
        /// <param name="parametros">Parámetros para actualizar el usuario.</param>
        /// <returns>Resultado de la actualización.</returns>
        [HttpPut]
        public async Task<IActionResult> UpdateUsuario([FromBody] ActualizarUsuarioParametros parametros)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(null, "Datos no válidos"));
            }

            var actualizado = await _usuarioService.Actualizar(parametros);

            if (!actualizado)
            {
                var response = new ApiResponse(null, "No se pudo actualizar el usuario");
                response.HasErrors = true;
                response.Errors.Add($"El usuario con ID {parametros.UsuarioId} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(parametros, "Usuario actualizado exitosamente"));
        }

        /// <summary>
        /// Elimina un usuario por ID.
        /// </summary>
        /// <param name="id">ID del usuario a eliminar.</param>
        /// <returns>Resultado de la eliminación.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var eliminado = await _usuarioService.Eliminar(id);

            if (!eliminado)
            {
                var response = new ApiResponse(null, "No se pudo eliminar el usuario");
                response.HasErrors = true;
                response.Errors.Add($"El usuario con ID {id} no existe.");
                return NotFound(response);
            }

            return Ok(new ApiResponse(null, "Usuario eliminado exitosamente"));
        }

        /// <summary>
        /// Obtiene un usuario específico por correo electrónico.
        /// </summary>
        /// <param name="email">Correo electrónico del usuario.</param>
        /// <returns>Usuario con campos seleccionados.</returns>
        [HttpGet("email/{email}")]
        public async Task<IActionResult> GetUsuarioPorEmail(string email)
        {
            var usuario = await _usuarioService.ObtenerPorEmailAsync(email);

            if (usuario == null)
            {
                var response = new ApiResponse(null, "Usuario no encontrado");
                response.HasErrors = true;
                response.Errors.Add($"El usuario con correo electrónico {email} no existe.");
                return NotFound(response);
            }

            var result = new
            {
                usuario.UsuarioId,
                usuario.Nombre,
                usuario.Email,
                usuario.FechaCreacion,
                Rol = usuario.TipoRolNombre 
            };

            return Ok(new ApiResponse(result, "Usuario obtenido con éxito"));
        }
    }
}