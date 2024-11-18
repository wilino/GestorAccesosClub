using System;
using GestorAccesosClub.Aplicacion.Parametros.Clientes;
using GestorAccesosClub.Aplicacion.Services;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Moq;

namespace GestorAccesosClub.Pruebas.Services
{
    public class ClienteServiceTests
    {
        private readonly Mock<IClienteRepository> _clienteRepositoryMock;
        private readonly ClienteService _clienteService;

        public ClienteServiceTests()
        {
            _clienteRepositoryMock = new Mock<IClienteRepository>();
            _clienteService = new ClienteService(_clienteRepositoryMock.Object);
        }

        [Fact]
        public async Task Crear_DeberiaRetornarNuevoCliente_CuandoLosParametrosSonValidos()
        {
            // Arrange
            var parametros = new CrearClienteParametros
            {
                Direccion = "Calle Falsa 123",
                Telefono = "555-1234",
                TipoCliente = TipoCliente.Miembro,
                Email = "cliente@example.com",
                Estado = Estado.Activo,
                Nombre = "Cliente Test"
            };

            _clienteRepositoryMock
                .Setup(repo => repo.CrearAsync(It.IsAny<Cliente>()))
                .Returns(Task.CompletedTask);

            // Act
            var resultado = await _clienteService.Crear(parametros);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(parametros.Nombre, resultado.Nombre);
            Assert.Equal(parametros.Email, resultado.Email);
            _clienteRepositoryMock.Verify(repo => repo.CrearAsync(It.IsAny<Cliente>()), Times.Once);
        }

        [Fact]
        public async Task Actualizar_DeberiaRetornarTrue_CuandoElClienteExiste()
        {
            // Arrange
            var parametros = new ActualizarClienteParametros
            {
                ClienteId = 1,
                Direccion = "Nueva Dirección",
                Telefono = "555-6789",
                TipoCliente = TipoCliente.Visitante,
                Email = "clienteactualizado@example.com",
                Estado = Estado.Inactivo,
                Nombre = "Cliente Actualizado"
            };

            var clienteExistente = new Cliente
            {
                ClienteId = 1,
                Direccion = "Dirección Antigua",
                Telefono = "555-1234",
                TipoCliente = TipoCliente.Miembro,
                Email = "cliente@example.com",
                Estado = Estado.Activo,
                Nombre = "Cliente Test"
            };

            _clienteRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(parametros.ClienteId))
                .ReturnsAsync(clienteExistente);

            _clienteRepositoryMock
                .Setup(repo => repo.ActualizarAsync(It.IsAny<Cliente>()))
                .Returns(Task.CompletedTask);

            // Act
            var resultado = await _clienteService.Actualizar(parametros);

            // Assert
            Assert.True(resultado);
            _clienteRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(parametros.ClienteId), Times.Once);
            _clienteRepositoryMock.Verify(repo => repo.ActualizarAsync(It.IsAny<Cliente>()), Times.Once);
        }

        [Fact]
        public async Task ObtenerPorId_DeberiaRetornarCliente_CuandoExiste()
        {
            // Arrange
            var clienteId = 1;
            var clienteEsperado = new Cliente
            {
                ClienteId = clienteId,
                Direccion = "Calle Falsa 123",
                Telefono = "555-1234",
                TipoCliente = TipoCliente.Miembro,
                Email = "cliente@example.com",
                Estado = Estado.Activo,
                Nombre = "Cliente Test"
            };

            _clienteRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(clienteId))
                .ReturnsAsync(clienteEsperado);

            // Act
            var resultado = await _clienteService.ObtenerPorId(clienteId);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(clienteEsperado.Nombre, resultado.Nombre);
            _clienteRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(clienteId), Times.Once);
        }

        [Fact]
        public async Task ObtenerTodos_DeberiaRetornarListaDeClientes()
        {
            // Arrange
            var clientesEsperados = new List<Cliente>
            {
                new Cliente { ClienteId = 1, Nombre = "Cliente 1" },
                new Cliente { ClienteId = 2, Nombre = "Cliente 2" }
            };

            _clienteRepositoryMock
                .Setup(repo => repo.ObtenerTodosAsync())
                .ReturnsAsync(clientesEsperados);

            // Act
            var resultado = await _clienteService.ObtenerTodos();

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(clientesEsperados.Count, resultado.Count());
            _clienteRepositoryMock.Verify(repo => repo.ObtenerTodosAsync(), Times.Once);
        }

        [Fact]
        public async Task Eliminar_DeberiaRetornarFalse_CuandoElClienteNoExiste()
        {
            // Arrange
            var clienteId = 99;

            _clienteRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(clienteId))
                .ReturnsAsync((Cliente)null);

            // Act
            var resultado = await _clienteService.Eliminar(clienteId);

            // Assert
            Assert.False(resultado);
            _clienteRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(clienteId), Times.Once);
            _clienteRepositoryMock.Verify(repo => repo.EliminarAsync(It.IsAny<int>()), Times.Never);
        }
    }
}

