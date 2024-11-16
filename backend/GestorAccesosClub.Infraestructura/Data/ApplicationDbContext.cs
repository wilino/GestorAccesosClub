using GestorAccesosClub.Dominio.Entities;
using Microsoft.EntityFrameworkCore;

namespace GestorAccesosClub.Infraestructura.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Definición de DbSet para cada entidad
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Acceso> Accesos { get; set; }
        public DbSet<Rol> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de la tabla Roles
            modelBuilder.Entity<Rol>(entity =>
            {
                entity.Property(r => r.Nombre)
                      .IsRequired()
                      .HasMaxLength(50);

                entity.Property(r => r.Descripcion)
                      .HasMaxLength(255);

                entity.HasMany(r => r.Usuarios)
                      .WithOne(u => u.Rol)
                      .HasForeignKey(u => u.RolId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Configuración de la tabla Usuarios
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(u => u.Nombre)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(u => u.Email)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(u => u.Contraseña)
                      .IsRequired()
                      .HasMaxLength(255);

                entity.Property(u => u.Estado)
                      .HasConversion<int>(); // Mapea el enum Estado como un entero

                entity.Property(u => u.FechaCreacion)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(u => u.Rol)
                      .WithMany(r => r.Usuarios)
                      .HasForeignKey(u => u.RolId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Configuración de la tabla Clientes
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.Property(c => c.Nombre)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(c => c.Email)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(c => c.Direccion)
                      .HasMaxLength(255);

                entity.Property(c => c.Telefono)
                      .HasMaxLength(50);

                entity.Property(c => c.Estado)
                      .HasConversion<int>(); // Mapea el enum Estado como un entero

                entity.Property(c => c.TipoCliente)
                      .HasConversion<int>(); // Mapea el enum TipoCliente como un entero
            });

            // Configuración de la tabla Accesos
            modelBuilder.Entity<Acceso>(entity =>
            {
                entity.Property(a => a.FechaAcceso)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(a => a.TipoAcceso)
                      .HasConversion<int>(); // Mapea el enum TipoAcceso como un entero

                entity.HasOne(a => a.Cliente)
                      .WithMany()
                      .HasForeignKey(a => a.ClienteId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}