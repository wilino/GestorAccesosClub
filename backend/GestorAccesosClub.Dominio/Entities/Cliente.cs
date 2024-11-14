namespace GestorAccesosClub.Dominio.Entities
{
    public class Cliente
    {
        public int ClienteId { get; set; }
        public int UsuarioId { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }

        public Usuario Usuario { get; set; }
    }   
}

