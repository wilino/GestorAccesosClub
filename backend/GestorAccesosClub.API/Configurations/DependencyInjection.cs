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
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(configuration.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection"))));

            // Registro de Repositorios
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IClienteRepository, ClienteRepository>();
            services.AddScoped<IAccesoRepository, AccesoRepository>();
            services.AddScoped<IRolRepository, RolRepository>();

            // Registro de Servicios de Aplicación originales
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IClienteService, ClienteService>();
            services.AddScoped<IAccesoService, AccesoService>();
            services.AddScoped<IRolService, RolService>();

            // Decoradores específicos para los servicios con parámetros de creación y actualización
            services.Decorate<IUsuarioService, ErrorHandlingUsuarioServiceDecorator>();
            services.Decorate<IClienteService, ErrorHandlingClienteServiceDecorator>();
            services.Decorate<IAccesoService, ErrorHandlingAccesoServiceDecorator>();
            services.Decorate<IRolService, ErrorHandlingRolServiceDecorator>();

            // Registro del repositorio genérico y sus decoradores
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.Decorate(typeof(IRepository<>), typeof(RepositoryLoggingDecorator<>));
            services.Decorate(typeof(IRepository<>), typeof(RepositoryErrorHandlingDecorator<>));
            services.Decorate(typeof(IRepository<>), typeof(RepositoryDecorator<>));

            return services;
        }
    }
}

