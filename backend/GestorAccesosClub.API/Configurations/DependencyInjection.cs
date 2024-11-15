using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using GestorAccesosClub.Aplicacion.Interfaces;
using GestorAccesosClub.Aplicacion.Services;
using GestorAccesosClub.Aplicacion.Decorators;
using GestorAccesosClub.Infraestructura.Data;
using GestorAccesosClub.Infraestructura.Repositories.Implementaciones;
using Scrutor;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using GestorAccesosClub.Infraestructura.Decorators;
using GestorAccesosClub.API.Decorators;

namespace GestorAccesosClub.API.Configurations
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Registro de DbContext
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(configuration.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection"))));

            // Registro de Repositorios concretos
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IClienteRepository, ClienteRepository>();
            services.AddScoped<IAccesoRepository, AccesoRepository>();
            services.AddScoped<IRolRepository, RolRepository>();

            // Registro del repositorio genérico
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Decoradores para el repositorio genérico
            services.TryDecorate(typeof(IRepository<>), typeof(RepositoryLoggingDecorator<>));
            services.TryDecorate(typeof(IRepository<>), typeof(RepositoryErrorHandlingDecorator<>));
            services.TryDecorate(typeof(IRepository<>), typeof(RepositoryDecorator<>));

            // Registro de Servicios de Aplicación
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IClienteService, ClienteService>();
            services.AddScoped<IAccesoService, AccesoService>();
            services.AddScoped<IRolService, RolService>();

            // Registro de IAuthService y AuthService para autenticación
            services.AddScoped<IAuthService, AuthService>();

            // Decoradores específicos para los servicios
            services.Decorate<IUsuarioService, ErrorHandlingUsuarioServiceDecorator>();
            services.Decorate<IClienteService, ErrorHandlingClienteServiceDecorator>();
            services.Decorate<IAccesoService, ErrorHandlingAccesoServiceDecorator>();
            services.Decorate<IRolService, ErrorHandlingRolServiceDecorator>();

            return services;
        }
    }
}