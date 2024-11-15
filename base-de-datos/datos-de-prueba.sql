INSERT INTO Usuarios (Nombre, Email, Contraseña, RolId, Estado) VALUES
('Tony Stark', 'tony.stark@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'admin'), 0),
('Steve Rogers', 'steve.rogers@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'admin'), 0),
('Natasha Romanoff', 'natasha.romanoff@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'personal_autorizado'), 0),
('Bruce Banner', 'bruce.banner@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'personal_autorizado'), 0),
('Wanda Maximoff', 'wanda.maximoff@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'personal_autorizado'), 0),
('Peter Parker', 'peter.parker@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0),
('Clint Barton', 'clint.barton@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0),
('Scott Lang', 'scott.lang@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0),
('TChalla', 'tchalla@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0),
('Stephen Strange', 'stephen.strange@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0),
('Carol Danvers', 'carol.danvers@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'personal_autorizado'), 0),
('Bucky Barnes', 'bucky.barnes@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0),
('Sam Wilson', 'sam.wilson@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'personal_autorizado'), 0),
('Rocket Raccoon', 'rocket.raccoon@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0),
('Groot', 'groot@marvel.com', 'password123', (SELECT RolId FROM Roles WHERE Nombre = 'cliente'), 0);


INSERT INTO Clientes (UsuarioId, Direccion, Telefono) VALUES
((SELECT UsuarioId FROM Usuarios WHERE Email = 'peter.parker@marvel.com'), 'Calle 1, Queens, NY', '555-1111'),
((SELECT UsuarioId FROM Usuarios WHERE Email = 'clint.barton@marvel.com'), 'Calle 2, Ciudad Ejemplo', '555-2222'),
((SELECT UsuarioId FROM Usuarios WHERE Email = 'scott.lang@marvel.com'), 'Calle 3, Ciudad Ejemplo', '555-3333'),
((SELECT UsuarioId FROM Usuarios WHERE Email = 'tchalla@marvel.com'), 'Calle 4, Ciudad Ejemplo', '555-4444'),
((SELECT UsuarioId FROM Usuarios WHERE Email = 'stephen.strange@marvel.com'), 'Calle 5, Ciudad Ejemplo', '555-5555'),
((SELECT UsuarioId FROM Usuarios WHERE Email = 'bucky.barnes@marvel.com'), 'Calle 6, Ciudad Ejemplo', '555-6666'),
((SELECT UsuarioId FROM Usuarios WHERE Email = 'rocket.raccoon@marvel.com'), 'Calle 7, Ciudad Ejemplo', '555-7777'),
((SELECT UsuarioId FROM Usuarios WHERE Email = 'groot@marvel.com'), 'Calle 8, Ciudad Ejemplo', '555-8888');