using System;
using GestorAccesosClub.Aplicacion.Parametros.Usuarios;
using GestorAccesosClub.Aplicacion.Services;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Moq;

namespace GestorAccesosClub.Pruebas.Services
{
    public class UsuarioServiceTests
    {
        private readonly Mock<IUsuarioRepository> _usuarioRepositoryMock;
        private readonly UsuarioService _usuarioService;

        public UsuarioServiceTests()
        {
            _usuarioRepositoryMock = new Mock<IUsuarioRepository>();
            _usuarioService = new UsuarioService(_usuarioRepositoryMock.Object);
        }

        [Fact]
        public async Task CrearUsuario_DeberiaRetornarUsuario_CuandoNoExiste()
        {
            // Arrange
            var parametros = new CrearUsuarioParametros
            {
                Nombre = "Test User",
                Email = "testuser@example.com",
                Contraseña = "password123",
                RolId = 1
            };

            _usuarioRepositoryMock
                .Setup(repo => repo.ObtenerPorEmailAsync(parametros.Email))
                .ReturnsAsync((Usuario)null);

            _usuarioRepositoryMock
                .Setup(repo => repo.CrearAsync(It.IsAny<Usuario>()))
                .Returns(Task.CompletedTask);

            // Act
            var resultado = await _usuarioService.Crear(parametros);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(parametros.Nombre, resultado.Nombre);
            Assert.Equal(parametros.Email, resultado.Email);
            Assert.Equal(parametros.RolId, resultado.RolId);
            _usuarioRepositoryMock.Verify(repo => repo.CrearAsync(It.IsAny<Usuario>()), Times.Once);
        }

        [Fact]
        public async Task CrearUsuario_DeberiaRetornarNull_CuandoUsuarioYaExiste()
        {
            // Arrange
            var parametros = new CrearUsuarioParametros
            {
                Nombre = "Test User",
                Email = "testuser@example.com",
                Contraseña = "password123",
                RolId = 1
            };

            var usuarioExistente = new Usuario
            {
                UsuarioId = 1,
                Nombre = "Existing User",
                Email = parametros.Email,
                Contraseña = "password123",
                RolId = 1
            };

            _usuarioRepositoryMock
                .Setup(repo => repo.ObtenerPorEmailAsync(parametros.Email))
                .ReturnsAsync(usuarioExistente);

            // Act
            var resultado = await _usuarioService.Crear(parametros);

            // Assert
            Assert.Null(resultado);
            _usuarioRepositoryMock.Verify(repo => repo.CrearAsync(It.IsAny<Usuario>()), Times.Never);
        }
    }

}