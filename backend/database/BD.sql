CREATE TABLE User
(
  id_user          INT AUTO_INCREMENT NOT NULL,
  nombre           VARCHAR(65) NOT NULL,
  apellido         VARCHAR(65) NOT NULL,
  genero           CHAR(1) NOT NULL COMMENT "'F' o 'M'",
  correo           VARCHAR(65) NOT NULL UNIQUE,
  contrasenia      VARCHAR(65) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  PRIMARY KEY (id_user)
);

CREATE TABLE Genero
(
  id_genero INT AUTO_INCREMENT NOT NULL,
  nombre    VARCHAR(65) NOT NULL,
  PRIMARY KEY (id_genero)
);

CREATE TABLE Pelicula
(
  id_pelicula     INT AUTO_INCREMENT NOT NULL,
  titulo          VARCHAR(65) NOT NULL,
  sinopsis        VARCHAR(255) NOT NULL,
  precio_alquiler DECIMAL(10, 2) NOT NULL,
  director        VARCHAR(65) NOT NULL,
  anio_estreno    YEAR NOT NULL,
  duracion        TIME NOT NULL,
  imagen          VARCHAR(255) NOT NULL,
  id_genero       INT NOT NULL,
  PRIMARY KEY (id_pelicula),
  FOREIGN KEY (id_genero) REFERENCES Genero (id_genero)
);

CREATE TABLE Alquiler
(
  id_alquiler      INT AUTO_INCREMENT NOT NULL,
  fecha_alquiler   DATETIME NOT NULL,
  fecha_devolucion DATETIME NOT NULL,
  multa            DECIMAL(10, 2) NOT NULL,
  id_user          INT NOT NULL,
  id_pelicula      INT NOT NULL,
  PRIMARY KEY (id_alquiler),
  FOREIGN KEY (id_user) REFERENCES User (id_user),
  FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula)
);

CREATE TABLE Comentario
(
  id_comentario INT AUTO_INCREMENT NOT NULL,
  contenido     VARCHAR(255) NOT NULL,
  id_user       INT NOT NULL,
  id_pelicula   INT NOT NULL,
  PRIMARY KEY (id_comentario),
  FOREIGN KEY (id_user) REFERENCES User (id_user),
  FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula)
);
