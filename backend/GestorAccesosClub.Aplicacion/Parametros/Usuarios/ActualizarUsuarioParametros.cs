using System;
namespace GestorAccesosClub.Aplicacion.Parametros.Usuarios
{
    public class ActualizarUsuarioParametros
    {
        public int UsuarioId { get; set; } // ID obligatorio para identificar el usuario
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int RolId { get; set; }
        public string Contraseña { get; set; }
    }
}



