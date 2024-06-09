USE peliflixdb;

INSERT INTO User (nombre, apellido, genero, correo, contrasenia, fecha_nacimiento) VALUES 
('Juan', 'González', 'M', 'admin@gmail.com', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '1990-05-15'),
('María', 'López', 'F', 'user@gmail.com', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '1988-11-22'),
('Carlos', 'Martínez', 'M', 'carlos@gmail.com', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '1995-03-07');

INSERT INTO Genero (id_genero, nombre) VALUES
(1, 'Acción'),
(2, 'Aventura'),
(3, 'Comedia'),
(4, 'Drama'),
(5, 'Ciencia ficción'),
(6, 'Fantasía'),
(7, 'Terror'),
(8, 'Romance'),
(9, 'Suspenso'),
(10, 'Documental');