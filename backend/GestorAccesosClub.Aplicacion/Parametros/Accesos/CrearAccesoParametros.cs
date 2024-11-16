using System;
using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Aplicacion.Parametros.Accesos
{
    public class CrearAccesoParametros
    {
        public int ClienteId { get; set; } // Identifica al cliente
        public TipoAcceso TipoAcceso { get; set; } // Entrada o Salida
        public DateTime FechaAcceso { get; set; } = DateTime.Now; // Fecha y hora del acceso
    }
}

