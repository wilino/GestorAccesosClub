using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Usuarios;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;

namespace GestorAccesosClub.Aplicacion.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> ObtenerPorId(int id)
        {
            return await _usuarioRepository.ObtenerPorIdAsync(id);
        }

        public async Task<IEnumerable<Usuario>> ObtenerTodos()
        {
            return await _usuarioRepository.ObtenerTodosAsync();
        }

        public async Task<Usuario> Crear(CrearUsuarioParametros parametros)
        {
            var usuario = new Usuario
            {
                Nombre = parametros.Nombre,
                Email = parametros.Email,
                Contraseña = parametros.Contraseña,
                RolId = parametros.RolId
            };

            await _usuarioRepository.CrearAsync(usuario);
            return usuario;
        }

        public async Task<bool> Actualizar(ActualizarUsuarioParametros parametros)
        {
            var usuario = await _usuarioRepository.ObtenerPorIdAsync(parametros.UsuarioId);
            if (usuario == null)
            {
                return false;
            }

            usuario.Nombre = parametros.Nombre;
            usuario.Email = parametros.Email;
            usuario.RolId = parametros.RolId;

            await _usuarioRepository.ActualizarAsync(usuario);
            return true;
        }

        public async Task<bool> Eliminar(int id)
        {
            var usuario = await _usuarioRepository.ObtenerPorIdAsync(id);

            if (usuario == null)
            {
                return false;
            }

            await _usuarioRepository.EliminarAsync(id);
            return true; 
        }

        public async Task<Usuario> ObtenerPorEmailAsync(string email)
        {
            return await _usuarioRepository.ObtenerPorEmailAsync(email);
        }
    }
}

