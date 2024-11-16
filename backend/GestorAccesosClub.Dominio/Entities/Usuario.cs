using GestorAccesosClub.Dominio.Enums;

namespace GestorAccesosClub.Dominio.Entities
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Contraseña { get; set; }
        public int RolId { get; set; }
        public int Estado { get; set; }
        public DateTime FechaCreacion { get; set; }

        // Relación
        public Rol Rol { get; set; }
        public ICollection<Acceso> Accesos { get; set; }

        public string TipoRolNombre => ((TipoRol)RolId).ToString();
    }

}

