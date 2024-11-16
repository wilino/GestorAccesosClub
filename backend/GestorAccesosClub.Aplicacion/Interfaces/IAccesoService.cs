using System;
using GestorAccesosClub.Aplicacion.Parametros.Accesos;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Aplicacion.Interfaces
{
    public interface IAccesoService : IAppService<Acceso, CrearAccesoParametros, ActualizarAccesoParametros>
    {
        Task<IEnumerable<Acceso>> ObtenerAccesosPorTipoAsync(TipoAcceso tipoAcceso);
        Task<IEnumerable<Acceso>> ObtenerAccesosEnRangoFechaAsync(DateTime fechaInicio, DateTime fechaFin);
        Task<object> ObtenerUltimoAccesoPorClienteAsync(int clienteId);
        Task<object> ObtenerAccesosPorClienteAsync(int clienteId);
    }
}

