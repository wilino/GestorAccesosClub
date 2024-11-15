using Microsoft.AspNetCore.Mvc;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.API.Models;

namespace GestorAccesosClub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var token = await _authService.AuthenticateAsync(login.Email, login.Password);

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { message = "Credenciales inválidas." });

            return Ok(new { token });
        }
    }

    
}