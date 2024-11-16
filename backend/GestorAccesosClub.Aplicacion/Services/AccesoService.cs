using System;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Parametros.Accesos;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using GestorAccesosClub.Infraestructura.Repositories.Implementaciones;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
                ClienteId = parametros.ClienteId,
                TipoAcceso = parametros.TipoAcceso,
                FechaAcceso=parametros.FechaAcceso,

            };

            await _accesoRepository.CrearAccesoAPelo(acceso);
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
            acceso.FechaAcceso = parametros.FechaAcceso;
          
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

        public async Task<object> ObtenerUltimoAccesoPorClienteAsync(int clienteId)
        {
            return await _accesoRepository.ObtenerUltimoAccesoPorClienteAsync(clienteId);
        }

        public async Task<object> ObtenerAccesosPorClienteAsync(int clienteId)
        {
            return await _accesoRepository.ObtenerAccesosPorClienteAsync(clienteId);
        }
    }
}

