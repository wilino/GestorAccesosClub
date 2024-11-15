namespace GestorAccesosClub.Aplicacion.Interfaces
{
    public interface IAuthService
    {
        Task<string> AuthenticateAsync(string email, string password);
    }
}

