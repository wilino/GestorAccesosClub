USE GestorAccesosClub;

-- Insertar datos de prueba en la tabla Usuarios
INSERT INTO Usuarios (Nombre, Email, Contraseña, RolId) VALUES
('Tony Stark', 'tony.stark@club.com', 'password123', 1),
('Ellen Ripley', 'ellen.ripley@club.com', 'password123', 2), 
('Indiana Jones', 'indiana.jones@club.com', 'password123', 2), 
('Marty McFly', 'marty.mcfly@club.com', 'password123', 2), 
('Lara Croft', 'lara.croft@club.com', 'password123', 2); 

-- Insertar datos de prueba en la tabla Clientes
INSERT INTO Clientes (UsuarioId, Direccion, Telefono) VALUES
(2, '456 Nostromo St, LV-426', '555-4260'),  
(3, '123 Lost Ark Ave, Egypt', '555-1936'),  
(4, '88 DeLorean Rd, Hill Valley', '555-1985'), 
(5, '789 Croft Manor, Surrey', '555-1996');   

-- Insertar datos de prueba en la tabla Accesos
INSERT INTO Accesos (UsuarioId, FechaAcceso, TipoAcceso) VALUES
(2, NOW(), 'entrada'),
(2, NOW() + INTERVAL 2 HOUR, 'salida'),
(3, NOW(), 'entrada'),
(3, NOW() + INTERVAL 3 HOUR, 'salida'),
(4, NOW(), 'entrada'),
(4, NOW() + INTERVAL 1 HOUR, 'salida'),
(5, NOW(), 'entrada'),
(5, NOW() + INTERVAL 4 HOUR, 'salida');