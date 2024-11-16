using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using GestorAccesosClub.Infraestructura.Data;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace GestorAccesosClub.Infraestructura.Repositories.Implementaciones
{
    public class AccesoRepository : Repository<Acceso>, IAccesoRepository
    {
        public AccesoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosPorTipoAsync(TipoAcceso tipoAcceso)
        {
            return await _dbSet.Where(a => a.TipoAcceso == tipoAcceso).ToListAsync();
        }

        public async Task<IEnumerable<Acceso>> ObtenerAccesosEnRangoFechaAsync(DateTime fechaInicio, DateTime fechaFin)
        {
            return await _dbSet.Where(a => a.FechaAcceso >= fechaInicio && a.FechaAcceso <= fechaFin).ToListAsync();
        }

        public async Task<IEnumerable<Acceso>> ObtenerPorClienteIdAsync(int clienteId)
        {
            return await _dbSet
                .Where(a => a.ClienteId == clienteId)
                .ToListAsync();
        }

        public async Task<object> ObtenerUltimoAccesoPorClienteAsync(int clienteId)
        {
            try
            {
                var ultimoAcceso = await _dbSet.Select(a => new { a.TipoAcceso, a.FechaAcceso, a.ClienteId }).
                    Where(a => a.ClienteId == clienteId).OrderByDescending(a => a.FechaAcceso).FirstOrDefaultAsync();

                return ultimoAcceso;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<object> CrearAccesoAPelo(Acceso acceso)
        {
            try
            {
                string sql = "INSERT INTO Accesos (ClienteId, TipoAcceso, FechaAcceso) VALUES (@ClienteId, @TipoAcceso, @FechaAcceso)";

                // Ejecución directa del comando SQL
                await _context.Database.ExecuteSqlRawAsync(
                    sql,
                    new MySqlParameter("@ClienteId", acceso.ClienteId),
                    new MySqlParameter("@TipoAcceso", acceso.TipoAcceso),
                    new MySqlParameter("@FechaAcceso", acceso.FechaAcceso)
                );
                return acceso;
            }
            catch (Exception ex)
            {
                // Manejo de errores
                Console.WriteLine($"Error al insertar acceso: {ex.Message}");
                throw;
            }
        }

        public async Task<object> ObtenerAccesosPorClienteAsync(int clienteId)
        {
            try
            {
                var ultimoAcceso = await _dbSet.Select(a => new { a.TipoAcceso, a.FechaAcceso, a.ClienteId }).
                    Where(a => a.ClienteId == clienteId).OrderByDescending(a => a.FechaAcceso).ToArrayAsync();

                return ultimoAcceso;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}

