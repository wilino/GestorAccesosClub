using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Dominio.Entities
{
    public class Acceso
    {
        public int AccesoId { get; set; }
        public int ClienteId { get; set; }
        public DateTime FechaAcceso { get; set; }
        public TipoAcceso TipoAcceso { get; set; } // Usando el enum TipoAcceso

        public Cliente Cliente { get; set; } // Relación con Cliente
    }
}

