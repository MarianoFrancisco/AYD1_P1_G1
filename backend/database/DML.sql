USE peliflixdb;

INSERT INTO User (nombre, apellido, genero, correo, contrasenia, fecha_nacimiento) VALUES 
('Juan', 'González', 'M', 'admin@gmail.com', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '1990-05-15'),
('María', 'López', 'F', 'user@gmail.com', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '1988-11-22'),
('Carlos', 'Martínez', 'M', 'carlos@gmail.com', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '1995-03-07'),
('Test', 'Jest', 'M', 'test@gmail.com', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '1995-03-07');

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

INSERT INTO Pelicula (id_pelicula, titulo, sinopsis, precio_alquiler, director, anio_estreno, duracion, imagen, alquilado, id_genero) VALUES
(1, 'El Padrino', 'Una película sobre la familia mafiosa Corleone.', 5.99, 'Francis Ford Coppola', 1972, '02:00:10', '1717889074752-1683807124940-343996208_1345773442646488_8751848238560849168_n.jpg', 0, 1);
