using System;
using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Aplicacion.Parametros.Clientes
{
    public class ActualizarClienteParametros
    {
        public int ClienteId { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public Estado Estado { get; set; } 
        public TipoCliente TipoCliente { get; set; } 
    }
}

