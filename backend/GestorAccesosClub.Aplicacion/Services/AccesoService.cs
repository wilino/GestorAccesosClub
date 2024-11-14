using System;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Accesos;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using GestorAccesosClub.Infraestructura.Repositories.Implementaciones;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;

namespace GestorAccesosClub.Aplicacion.Services
{
    public class AccesoService : IAccesoService
    {
        private readonly IAccesoRepository _accesoRepository;

        public AccesoService(IAccesoRepository accesoRepository)
        {
            _accesoRepository = accesoRepository;
        }

        public async Task<Acceso> Crear(CrearAccesoParametros parametros)
        {
            var acceso = new Acceso
            {
                UsuarioId = parametros.UsuarioId,
                TipoAcceso = parametros.TipoAcceso
            };

            await _accesoRepository.CrearAsync(acceso);
            return acceso;
        }

        public async Task<bool> Actualizar(ActualizarAccesoParametros parametros)
        {
            var acceso = await _accesoRepository.ObtenerPorIdAsync(parametros.AccesoId);
            if (acceso == null)
            {
                return false;
            }

            acceso.TipoAcceso = parametros.TipoAcceso;
            await _accesoRepository.ActualizarAsync(acceso);
            return true;
        }

        public async Task<Acceso> ObtenerPorId(int id)
        {
            return await _accesoRepository.ObtenerPorIdAsync(id);
        }

        public async Task<IEnumerable<Acceso>> ObtenerTodos()
        {
            return await _accesoRepository.ObtenerTodosAsync();
        }

        public async Task<bool> Eliminar(int id)
        {
            var acceso = await _accesoRepository.ObtenerPorIdAsync(id);
            if (acceso == null)
            {
                return false;
            }

            await _accesoRepository.EliminarAsync(id);
            return true; 
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosPorTipoAsync(TipoAcceso tipoAcceso)
        {

            return await _accesoRepository.ObtenerAccesosPorTipoAsync(tipoAcceso);
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosEnRangoFechaAsync(DateTime fechaInicio, DateTime fechaFin)
        {

            return await _accesoRepository.ObtenerAccesosEnRangoFechaAsync(fechaInicio, fechaFin);
        }

    }
}

