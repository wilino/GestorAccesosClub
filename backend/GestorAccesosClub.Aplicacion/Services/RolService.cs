using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Roles;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Repositories.Implementaciones;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;

namespace GestorAccesosClub.Aplicacion.Services
{
    public class RolService : IRolService
    {
        private readonly IRolRepository _rolRepository;

        public RolService(IRolRepository rolRepository)
        {
            _rolRepository = rolRepository;
        }

        public async Task<Rol> Crear(CrearRolParametros parametros)
        {
            var rol = new Rol
            {
                Nombre = parametros.Nombre,
                Descripcion = parametros.Descripcion
            };

            await _rolRepository.CrearAsync(rol);
            return rol;
        }

        public async Task<bool> Actualizar(ActualizarRolParametros parametros)
        {
            var rol = await _rolRepository.ObtenerPorIdAsync(parametros.RolId);
            if (rol == null)
            {
                return false;
            }

            rol.Nombre = parametros.Nombre;
            rol.Descripcion = parametros.Descripcion;

            await _rolRepository.ActualizarAsync(rol);
            return true;
        }

        public async Task<Rol> ObtenerPorId(int id)
        {
            return await _rolRepository.ObtenerPorIdAsync(id);
        }

        public async Task<IEnumerable<Rol>> ObtenerTodos()
        {
            return await _rolRepository.ObtenerTodosAsync();
        }

        public async Task<bool> Eliminar(int id)
        {
            var rol = await _rolRepository.ObtenerPorIdAsync(id);
            if (rol == null)
            {
                return false;
            }

            await _rolRepository.EliminarAsync(id);
            return true;
        }

        public async Task<Rol> ObtenerRolPorNombreAsync(string nombre)
        {
            return await _rolRepository.ObtenerRolPorNombreAsync(nombre);
        }
    }
}