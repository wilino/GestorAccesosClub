using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Aplicacion.Parametros.Clientes
{
    public class CrearClienteParametros
    {
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public Estado Estado { get; set; } // Enum Estado
        public TipoCliente TipoCliente { get; set; } // Enum TipoCliente
    }
}

