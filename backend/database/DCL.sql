-- Crear un nuevo usuario
CREATE USER 'peliflix'@'%' IDENTIFIED BY 'Peliflix1234';

-- Conceder todos los privilegios sobre la base de datos `peliflixdb`
GRANT ALL PRIVILEGES ON peliflixdb.* TO 'peliflix'@'%';

-- Aplicar los cambios de privilegios
FLUSH PRIVILEGES;
