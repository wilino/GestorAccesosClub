using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Dominio.Entities
{
    public class Acceso
    {
        public int AccesoId { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaAcceso { get; set; }
        public TipoAcceso TipoAcceso { get; set; }

        // Relación
        public Usuario Usuario { get; set; }
    }
}

