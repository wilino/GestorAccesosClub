using System;
using System.Threading.Tasks;
using GestorAccesosClub.Aplicacion.Services;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

public class AuthServiceTests
{
    private readonly Mock<IUsuarioRepository> _usuarioRepositoryMock;
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _usuarioRepositoryMock = new Mock<IUsuarioRepository>();
        _configurationMock = new Mock<IConfiguration>();

        _configurationMock
            .Setup(config => config["Jwt:Key"])
            .Returns("SuperSecretKey1234567890");
        _configurationMock
            .Setup(config => config["Jwt:Issuer"])
            .Returns("TestIssuer");
        _configurationMock
            .Setup(config => config["Jwt:Audience"])
            .Returns("TestAudience");

        _authService = new AuthService(_usuarioRepositoryMock.Object, _configurationMock.Object);
    }

    [Fact]
    public async Task AuthenticateAsync_DeberiaRetornarToken_CuandoCredencialesSonValidas()
    {
        // Arrange
        var email = "testuser@example.com";
        var password = "password123";

        var usuario = new Usuario
        {
            UsuarioId = 1,
            Email = email,
            Rol = new Rol { Nombre = "admin" }
        };

        _usuarioRepositoryMock
            .Setup(repo => repo.GetByEmailAndPasswordAsync(email, password))
            .ReturnsAsync(usuario);

        // Act
        var resultado = await _authService.AuthenticateAsync(email, password);

        // Assert
        Assert.NotNull(resultado);
        Assert.NotEmpty(resultado);
        _usuarioRepositoryMock.Verify(repo => repo.GetByEmailAndPasswordAsync(email, password), Times.Once);
    }

    [Fact]
    public async Task AuthenticateAsync_DeberiaRetornarNull_CuandoCredencialesSonInvalidas()
    {
        // Arrange
        var email = "invaliduser@example.com";
        var password = "wrongpassword";

        _usuarioRepositoryMock
            .Setup(repo => repo.GetByEmailAndPasswordAsync(email, password))
            .ReturnsAsync((Usuario)null);

        // Act
        var resultado = await _authService.AuthenticateAsync(email, password);

        // Assert
        Assert.Null(resultado);
        _usuarioRepositoryMock.Verify(repo => repo.GetByEmailAndPasswordAsync(email, password), Times.Once);
    }

    [Fact]
    public void GenerateToken_DeberiaRetornarTokenJWT_ConInformacionCorrecta()
    {
        // Arrange
        var usuario = new Usuario
        {
            UsuarioId = 1,
            Email = "testuser@example.com",
            Rol = new Rol { Nombre = "admin" }
        };

        // Act (usar método privado mediante reflexión si es necesario)
        var token = InvokeGenerateToken(usuario);

        // Assert
        Assert.NotNull(token);
        Assert.NotEmpty(token);
    }

    private string InvokeGenerateToken(Usuario usuario)
    {
        // Usar reflexión para invocar el método privado GenerateToken
        var method = typeof(AuthService).GetMethod("GenerateToken",
            System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);

        return method.Invoke(_authService, new object[] { usuario }) as string;
    }

namespace GestorAccesosClub.Pruebas.Services
{
    public class AuthServiceTests
    {
        private readonly Mock<IUsuarioRepository> _usuarioRepositoryMock;
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            _usuarioRepositoryMock = new Mock<IUsuarioRepository>();
            _configurationMock = new Mock<IConfiguration>();

            _configurationMock
                .Setup(config => config["Jwt:Key"])
                .Returns("SuperSecretKey1234567890");
            _configurationMock
                .Setup(config => config["Jwt:Issuer"])
                .Returns("TestIssuer");
            _configurationMock
                .Setup(config => config["Jwt:Audience"])
                .Returns("TestAudience");

            _authService = new AuthService(_usuarioRepositoryMock.Object, _configurationMock.Object);
        }

        [Fact]
        public async Task AuthenticateAsync_DeberiaRetornarToken_CuandoCredencialesSonValidas()
        {
            // Arrange
            var email = "testuser@example.com";
            var password = "password123";

            var usuario = new Usuario
            {
                UsuarioId = 1,
                Email = email,
                Rol = new Rol { Nombre = "admin" }
            };

            _usuarioRepositoryMock
                .Setup(repo => repo.GetByEmailAndPasswordAsync(email, password))
                .ReturnsAsync(usuario);

            // Act
            var resultado = await _authService.AuthenticateAsync(email, password);

            // Assert
            Assert.NotNull(resultado);
            Assert.NotEmpty(resultado);
            _usuarioRepositoryMock.Verify(repo => repo.GetByEmailAndPasswordAsync(email, password), Times.Once);
        }

        [Fact]
        public async Task AuthenticateAsync_DeberiaRetornarNull_CuandoCredencialesSonInvalidas()
        {
            // Arrange
            var email = "invaliduser@example.com";
            var password = "wrongpassword";

            _usuarioRepositoryMock
                .Setup(repo => repo.GetByEmailAndPasswordAsync(email, password))
                .ReturnsAsync((Usuario)null);

            // Act
            var resultado = await _authService.AuthenticateAsync(email, password);

            // Assert
            Assert.Null(resultado);
            _usuarioRepositoryMock.Verify(repo => repo.GetByEmailAndPasswordAsync(email, password), Times.Once);
        }

        [Fact]
        public void GenerateToken_DeberiaRetornarTokenJWT_ConInformacionCorrecta()
        {
            // Arrange
            var usuario = new Usuario
            {
                UsuarioId = 1,
                Email = "testuser@example.com",
                Rol = new Rol { Nombre = "admin" }
            };

            // Act (usar método privado mediante reflexión si es necesario)
            var token = InvokeGenerateToken(usuario);

            // Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);
        }

        private string InvokeGenerateToken(Usuario usuario)
        {
            // Usar reflexión para invocar el método privado GenerateToken
            var method = typeof(AuthService).GetMethod("GenerateToken",
                System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);

            return method.Invoke(_authService, new object[] { usuario }) as string;
        }
    }
}

