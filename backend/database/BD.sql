
CREATE TABLE Alquiler
(
  id_alquiler      INT      NOT NULL,
  fecha_alquiler   DATETIME NOT NULL,
  fecha_devolucion DATETIME NOT NULL,
  multa            DOUBLE   NOT NULL,
  id_user          INT      NOT NULL,
  id_pelicula      TEXT     NOT NULL,
  PRIMARY KEY (id_alquiler)
);

CREATE TABLE Comentario
(
  id_comentario INT  NOT NULL,
  contenido     TEXT NOT NULL,
  id_user       INT  NOT NULL,
  id_pelicula   TEXT NOT NULL,
  PRIMARY KEY (id_comentario)
);

CREATE TABLE Genero
(
  id_genero INT AUTO_INCREMENT NOT NULL,
  nombre    VARCHAR(65) NOT NULL,
  PRIMARY KEY (id_genero)
);

CREATE TABLE IF NOT EXISTS Pelicula
(
  id_pelicula     TEXT   NOT NULL,
  titulo          TEXT   NOT NULL,
  sinopsis        TEXT   NOT NULL,
  precio_alquiler DOUBLE NOT NULL,
  director        TEXT   NOT NULL,
  anio_estreno    YEAR   NOT NULL,
  duracion        TIME   NOT NULL,
  imagen          TEXT   NOT NULL,
  id_genero       INT    NOT NULL,
  PRIMARY KEY (id_pelicula)
);

CREATE TABLE User
(
  id_user          INT  NOT NULL,
  nombre           TEXT NOT NULL,
  apellido         TEXT NOT NULL,
  genero           CHAR NOT NULL COMMENT ''f' o 'm'',
  correo           TEXT NOT NULL,
  contrasenia      TEXT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  PRIMARY KEY (id_user)
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

ALTER TABLE Comentario
  ADD CONSTRAINT FK_Pelicula_TO_Comentario
    FOREIGN KEY (id_pelicula)
    REFERENCES Pelicula (id_pelicula);

ALTER TABLE Alquiler
  ADD CONSTRAINT FK_User_TO_Alquiler
    FOREIGN KEY (id_user)
    REFERENCES User (id_user);

ALTER TABLE Pelicula
  ADD CONSTRAINT FK_Genero_TO_Pelicula
    FOREIGN KEY (id_genero)
    REFERENCES Genero (id_genero);

ALTER TABLE Alquiler
  ADD CONSTRAINT FK_Pelicula_TO_Alquiler
    FOREIGN KEY (id_pelicula)
    REFERENCES Pelicula (id_pelicula);
