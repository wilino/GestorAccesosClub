using System;
using GestorAccesosClub.Aplicacion.Parametros.Accesos;
using GestorAccesosClub.Aplicacion.Services;
using GestorAccesosClub.Dominio.Entities;
using GestorAccesosClub.Dominio.Enums;
using GestorAccesosClub.Infraestructura.Repositories.Interfaces;
using Moq;

namespace GestorAccesosClub.Pruebas.Services
{
    public class AccesoServiceTests
    {
        private readonly Mock<IAccesoRepository> _accesoRepositoryMock;
        private readonly AccesoService _accesoService;

        public AccesoServiceTests()
        {
            _accesoRepositoryMock = new Mock<IAccesoRepository>();
            _accesoService = new AccesoService(_accesoRepositoryMock.Object);
        }

        [Fact]
        public async Task Crear_DeberiaRetornarNuevoAcceso_CuandoLosParametrosSonValidos()
        {
            // Arrange
            var parametros = new CrearAccesoParametros
            {
                ClienteId = 1,
                TipoAcceso = TipoAcceso.Entrada,
                FechaAcceso = DateTime.Now
            };

            _accesoRepositoryMock
                .Setup(repo => repo.CrearAccesoAPelo(It.IsAny<Acceso>()))
                .Returns((Task<object>)Task.CompletedTask);

            // Act
            var resultado = await _accesoService.Crear(parametros);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(parametros.ClienteId, resultado.ClienteId);
            Assert.Equal(parametros.TipoAcceso, resultado.TipoAcceso);
            _accesoRepositoryMock.Verify(repo => repo.CrearAccesoAPelo(It.IsAny<Acceso>()), Times.Once);
        }

        [Fact]
        public async Task Actualizar_DeberiaRetornarTrue_CuandoElAccesoExiste()
        {
            // Arrange
            var parametros = new ActualizarAccesoParametros
            {
                AccesoId = 1,
                TipoAcceso = TipoAcceso.Salida,
                FechaAcceso = DateTime.Now
            };

            var accesoExistente = new Acceso
            {
                AccesoId = 1,
                ClienteId = 1,
                TipoAcceso = TipoAcceso.Entrada,
                FechaAcceso = DateTime.Now.AddHours(-1)
            };

            _accesoRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(parametros.AccesoId))
                .ReturnsAsync(accesoExistente);

            _accesoRepositoryMock
                .Setup(repo => repo.ActualizarAsync(It.IsAny<Acceso>()))
                .Returns(Task.CompletedTask);

            // Act
            var resultado = await _accesoService.Actualizar(parametros);

            // Assert
            Assert.True(resultado);
            _accesoRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(parametros.AccesoId), Times.Once);
            _accesoRepositoryMock.Verify(repo => repo.ActualizarAsync(It.IsAny<Acceso>()), Times.Once);
        }

        [Fact]
        public async Task ObtenerPorId_DeberiaRetornarAcceso_CuandoExiste()
        {
            // Arrange
            var accesoId = 1;
            var accesoEsperado = new Acceso
            {
                AccesoId = accesoId,
                ClienteId = 1,
                TipoAcceso = TipoAcceso.Entrada,
                FechaAcceso = DateTime.Now
            };

            _accesoRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(accesoId))
                .ReturnsAsync(accesoEsperado);

            // Act
            var resultado = await _accesoService.ObtenerPorId(accesoId);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(accesoEsperado.AccesoId, resultado.AccesoId);
            _accesoRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(accesoId), Times.Once);
        }

        [Fact]
        public async Task ObtenerAccesosEnRangoFecha_DeberiaRetornarAccesos_CuandoExisten()
        {
            // Arrange
            var fechaInicio = DateTime.Now.AddDays(-5);
            var fechaFin = DateTime.Now;
            var accesosEsperados = new List<Acceso>
            {
                new Acceso { AccesoId = 1, ClienteId = 1, TipoAcceso = TipoAcceso.Entrada, FechaAcceso = DateTime.Now.AddDays(-2) },
                new Acceso { AccesoId = 2, ClienteId = 1, TipoAcceso = TipoAcceso.Salida, FechaAcceso = DateTime.Now.AddDays(-1) }
            };

            _accesoRepositoryMock
                .Setup(repo => repo.ObtenerAccesosEnRangoFechaAsync(fechaInicio, fechaFin))
                .ReturnsAsync(accesosEsperados);

            // Act
            var resultado = await _accesoService.ObtenerAccesosEnRangoFechaAsync(fechaInicio, fechaFin);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal(accesosEsperados.Count, resultado.Count());
            _accesoRepositoryMock.Verify(repo => repo.ObtenerAccesosEnRangoFechaAsync(fechaInicio, fechaFin), Times.Once);
        }

        [Fact]
        public async Task Eliminar_DeberiaRetornarFalse_CuandoElAccesoNoExiste()
        {
            // Arrange
            var accesoId = 99;

            _accesoRepositoryMock
                .Setup(repo => repo.ObtenerPorIdAsync(accesoId))
                .ReturnsAsync((Acceso)null);

            // Act
            var resultado = await _accesoService.Eliminar(accesoId);

            // Assert
            Assert.False(resultado);
            _accesoRepositoryMock.Verify(repo => repo.ObtenerPorIdAsync(accesoId), Times.Once);
            _accesoRepositoryMock.Verify(repo => repo.EliminarAsync(It.IsAny<int>()), Times.Never);
        }
    }
}

