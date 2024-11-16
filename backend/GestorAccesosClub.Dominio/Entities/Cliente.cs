using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Dominio.Entities
{
    public class Cliente
    {
        public int ClienteId { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public Estado Estado { get; set; } // Usando el enum Estado
        public TipoCliente TipoCliente { get; set; } // Usando el enum TipoCliente
    }
}

