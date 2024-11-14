using System;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Usuarios;
using GestorAccesosClub.Dominio.Entities;
using Microsoft.Extensions.Logging;

namespace GestorAccesosClub.Aplicacion.Decorators
{
    public class ErrorHandlingUsuarioServiceDecorator : ErrorHandlingServiceDecorator<Usuario, CrearUsuarioParametros, ActualizarUsuarioParametros>, IUsuarioService
    {
        private readonly IUsuarioService _usuarioService;
        private readonly ILogger<ErrorHandlingUsuarioServiceDecorator> _logger;

        public ErrorHandlingUsuarioServiceDecorator(IUsuarioService usuarioService, ILogger<ErrorHandlingUsuarioServiceDecorator> logger)
            : base(usuarioService, logger)
        {
            _usuarioService = usuarioService;
            _logger = logger;
        }

        public async Task<Usuario> Crear(CrearUsuarioParametros parametros)
        {
            try
            {
                return await _usuarioService.Crear(parametros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear usuario con parámetros {Parametros}", parametros);
                throw;
            }
        }

        public async Task<bool> Actualizar(ActualizarUsuarioParametros parametros)
        {
            try
            {
                return await _usuarioService.Actualizar(parametros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar usuario con parámetros {Parametros}", parametros);
                throw;
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                return await _usuarioService.Eliminar(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar usuario con ID {Id}", id);
                throw;
            }
        }

        public async Task<Usuario> ObtenerPorId(int id)
        {
            try
            {
                return await _usuarioService.ObtenerPorId(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener usuario con ID {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<Usuario>> ObtenerTodos()
        {
            try
            {
                return await _usuarioService.ObtenerTodos();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener todos los usuarios");
                throw;
            }
        }

        public async Task<Usuario> ObtenerPorEmailAsync(string email)
        {
            try
            {
                return await _usuarioService.ObtenerPorEmailAsync(email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener usuario por Email {Email}", email);
                throw;
            }
        }
    }
}

