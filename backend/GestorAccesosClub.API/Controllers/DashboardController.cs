using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.API.Models;
using GestorAccesosClub.API.Decorators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GestorAccesosClub.API.Controllers
{
    /// <summary>
    /// Controlador para gestionar el dashboard y obtener estadísticas del sistema.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ApiErrorHandlingDecorator))]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        /// <summary>
        /// Constructor del controlador DashboardController.
        /// </summary>
        /// <param name="dashboardService">Servicio para manejar la lógica del dashboard.</param>
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

     

        /// <summary>
        /// Obtiene el total de clientes registrados en el sistema.
        /// </summary>
        /// <remarks>
        /// Disponible únicamente para usuarios con roles "admin" o "personal_autorizado".
        /// </remarks>
        /// <returns>El total de clientes.</returns>
        [HttpGet("totalClientes")]
        [Authorize(Roles = "admin, personal_autorizado")]
        public async Task<IActionResult> GetTotalClientes()
        {
            var totalClientes = await _dashboardService.GetTotalClientesAsync();
            return Ok(new ApiResponse(totalClientes, "Total de clientes obtenido con éxito."));
        }

        /// <summary>
        /// Obtiene el total de usuarios registrados en el sistema.
        /// </summary>
        /// <remarks>
        /// Disponible únicamente para usuarios con roles "admin" o "personal_autorizado".
        /// </remarks>
        /// <returns>El total de usuarios.</returns>
        [HttpGet("totalUsuarios")]
        [Authorize(Roles = "admin, personal_autorizado")]
        public async Task<IActionResult> GetTotalUsuarios()
        {
            var totalUsuarios = await _dashboardService.GetTotalUsuariosAsync();
            return Ok(new ApiResponse(totalUsuarios, "Total de usuarios obtenido con éxito."));
        }
    }
}


