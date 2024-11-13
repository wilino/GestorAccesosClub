-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS GestorAccesosClub;
USE GestorAccesosClub;

-- Tabla Roles
CREATE TABLE Roles (
    RolId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    Descripcion VARCHAR(255)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    UsuarioId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL,
    RolId INT,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RolId) REFERENCES Roles(RolId) ON DELETE SET NULL
);

-- Tabla Clientes
CREATE TABLE Clientes (
    ClienteId INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioId INT NOT NULL,
    Direccion VARCHAR(255),
    Telefono VARCHAR(50),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(UsuarioId) ON DELETE CASCADE
);

-- Tabla Accesos
CREATE TABLE Accesos (
    AccesoId INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioId INT NOT NULL,
    FechaAcceso DATETIME DEFAULT CURRENT_TIMESTAMP,
    TipoAcceso ENUM('entrada', 'salida') NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(UsuarioId) ON DELETE CASCADE
);