-- Insertar datos en la tabla Usuarios con personajes de DC, Marvel y Looney Tunes
INSERT INTO Usuarios (Nombre, Email, Contraseña, RolId, Estado) VALUES
('Clark Kent', 'clark.kent@example.com', 'superman123', 1, 1),
('Tony Stark', 'tony.stark@example.com', 'ironman123', 1, 1),
('Bugs Bunny', 'bugs.bunny@example.com', 'carrot123', 2, 1),
('Bruce Wayne', 'bruce.wayne@example.com', 'batman123', 1, 1),
('Peter Parker', 'peter.parker@example.com', 'spiderman123', 2, 1),
('Daffy Duck', 'daffy.duck@example.com', 'duckseason123', 2, 1);

-- Insertar datos en la tabla Clientes con personajes de DC, Marvel y Looney Tunes
INSERT INTO Clientes (Nombre, Email, Direccion, Telefono, Estado, TipoCliente) VALUES
('Diana Prince', 'diana.prince@example.com', 'Themyscira', '555-9470', 1, 1),
('Logan', 'logan@example.com', 'Xavier’s School for Gifted Youngsters', '555-4321', 1, 1),
('Tweety Bird', 'tweety.bird@example.com', 'Bird Cage', '555-6789', 1, 2),
('Hal Jordan', 'hal.jordan@example.com', 'Coast City', '555-9876', 1, 1),
('Natasha Romanoff', 'natasha.romanoff@example.com', 'Unknown Address', '555-8901', 1, 1),
('Sylvester Cat', 'sylvester.cat@example.com', 'Suburban House', '555-4567', 1, 2);

-- Insertar datos en la tabla Accesos (suponiendo que los clientes ya han sido creados con IDs 1 a 6)
INSERT INTO Accesos (ClienteId, TipoAcceso) VALUES
(1, 1), -- Entrada para Diana Prince
(1, 2), -- Salida para Diana Prince
(2, 1), -- Entrada para Logan
(3, 1), -- Entrada para Tweety Bird
(4, 1), -- Entrada para Hal Jordan
(5, 1), -- Entrada para Natasha Romanoff
(6, 1); -- Entrada para Sylvester Cat