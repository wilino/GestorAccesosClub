namespace GestorAccesosClub.Dominio.Entities
{
    public class Rol
    {
        public int RolId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        // Relación
        public ICollection<Usuario> Usuarios { get; set; }
    }
}

