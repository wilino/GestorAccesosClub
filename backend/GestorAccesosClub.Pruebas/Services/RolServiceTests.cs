using System;
using GestorAccesosClub.Aplicacion.Parametros.Roles;
using GestorAccesosClub.Aplicacion.Services;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Moq;

namespace GestorAccesosClub.Pruebas.Services
{
    public class RolServiceTests
    {
        private readonly Mock<IRolRepository> _rolRepositoryMock;
        private readonly RolService _rolService;

        public RolServiceTests()
        {
            _rolRepositoryMock = new Mock<IRolRepository>();
            _rolService = new RolService(_rolRepositoryMock.Object);
        }

        [Fact]
        public async Task Crear_DeberiaRetornarNuevoRol_CuandoLosParametrosSonValidos()
        {
            // Arrange
            var parametros = new CrearRolParametros
            {
                Nombre = "Administrador",
                Descripcion = "Acceso completo al sistema"
            };

            _rolRepositoryMock
                .Setup(repo => repo.CrearAsync(It.IsAny<Rol>()))
                .Returns(Task.CompletedTask);

            // Act
            var resultado = await _rolService.Crear(parametros);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(parametros.Nombre, resultado.Nombre);
            Assert.Equal(parametros.Descripcion, resultado.Descripcion);
            _rolRepositoryMock.Verify(repo => repo.CrearAsync(It.IsAny<Rol>()), Times.Once);
        }

        [Fact]
        public async Task Actualizar_DeberiaRetornarTrue_CuandoElRolExiste()
        {
            // Arrange
            var parametros = new ActualizarRolParametros
            {
                RolId = 1,
                Nombre = "Usuario",
                Descripcion = "Acceso limitado al sistema"
            };

            var rolExistente = new Rol
            {
                RolId = 1,
                Nombre = "Admin",
                Descripcion = "Antigua descripción"
            };

            _rolRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(parametros.RolId))
                .ReturnsAsync(rolExistente);

            _rolRepositoryMock
                .Setup(repo => repo.ActualizarAsync(It.IsAny<Rol>()))
                .Returns(Task.CompletedTask);

            // Act
            var resultado = await _rolService.Actualizar(parametros);

            // Assert
            Assert.True(resultado);
            _rolRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(parametros.RolId), Times.Once);
            _rolRepositoryMock.Verify(repo => repo.ActualizarAsync(It.IsAny<Rol>()), Times.Once);
        }

        [Fact]
        public async Task ObtenerPorId_DeberiaRetornarRol_CuandoExiste()
        {
            // Arrange
            var rolId = 1;
            var rolEsperado = new Rol
            {
                RolId = rolId,
                Nombre = "Usuario",
                Descripcion = "Acceso limitado"
            };

            _rolRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(rolId))
                .ReturnsAsync(rolEsperado);

            // Act
            var resultado = await _rolService.ObtenerPorId(rolId);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(rolEsperado.Nombre, resultado.Nombre);
            _rolRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(rolId), Times.Once);
        }

        [Fact]
        public async Task Eliminar_DeberiaRetornarFalse_CuandoElRolNoExiste()
        {
            // Arrange
            var rolId = 99;

            _rolRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(rolId))
                .ReturnsAsync((Rol)null);

            // Act
            var resultado = await _rolService.Eliminar(rolId);

            // Assert
            Assert.False(resultado);
            _rolRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(rolId), Times.Once);
            _rolRepositoryMock.Verify(repo => repo.EliminarAsync(It.IsAny<int>()), Times.Never);
        }

        [Fact]
        public async Task ObtenerRolPorNombre_DeberiaRetornarRol_CuandoExiste()
        {
            // Arrange
            var nombre = "Administrador";
            var rolEsperado = new Rol
            {
                RolId = 1,
                Nombre = nombre,
                Descripcion = "Acceso completo"
            };

            _rolRepositoryMock
                .Setup(repo => repo.ObtenerRolPorNombreAsync(nombre))
                .ReturnsAsync(rolEsperado);

            // Act
            var resultado = await _rolService.ObtenerRolPorNombreAsync(nombre);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(rolEsperado.Nombre, resultado.Nombre);
            _rolRepositoryMock.Verify(repo => repo.ObtenerRolPorNombreAsync(nombre), Times.Once);
        }
    }
}

