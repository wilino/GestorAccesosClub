using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Aplicacion.Parametros.Accesos
{

    public class ActualizarAccesoParametros
    {
        public int AccesoId { get; set; } // Identifica el acceso a actualizar
        public int ClienteId { get; set; } // Cliente asociado
        public TipoAcceso TipoAcceso { get; set; } // Entrada o Salida
        public DateTime FechaAcceso { get; set; } // Fecha y hora actualizada
    }

}

