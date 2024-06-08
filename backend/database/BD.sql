
CREATE TABLE IF NOT EXISTS Alquiler
(
  id_alquiler      INT           NOT NULL AUTO_INCREMENT,
  fecha_alquiler   DATETIME      NOT NULL,
  fecha_devolucion DATETIME      NOT NULL,
  multa            DECIMAL(10,2) NOT NULL,
  id_user          INT           NOT NULL,
  id_pelicula      INT           NOT NULL,
  PRIMARY KEY (id_alquiler)
);

CREATE TABLE IF NOT EXISTS Comentario
(
  id_comentario INT          NOT NULL AUTO_INCREMENT,
  contenido     VARCHAR(255) NOT NULL,
  id_user       INT          NOT NULL,
  id_pelicula   INT          NOT NULL,
  PRIMARY KEY (id_comentario)
);

CREATE TABLE IF NOT EXISTS Genero
(
  id_genero INT         NOT NULL AUTO_INCREMENT,
  nombre    VARCHAR(65) NOT NULL,
  PRIMARY KEY (id_genero)
);

CREATE TABLE IF NOT EXISTS Pelicula
(
  id_pelicula     INT           NOT NULL AUTO_INCREMENT,
  titulo          VARCHAR(65)   NOT NULL,
  sinopsis        TEXT          NOT NULL,
  precio_alquiler DECIMAL(10,2) NOT NULL,
  director        VARCHAR(65)   NOT NULL,
  anio_estreno    YEAR          NOT NULL,
  duracion        TIME          NOT NULL,
  imagen          VARCHAR(255)  NOT NULL,
  id_genero       INT           NOT NULL,
  PRIMARY KEY (id_pelicula)
);

CREATE TABLE IF NOT EXISTS User (
    id_user INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(65) NOT NULL,
    apellido VARCHAR(65) NOT NULL,
    genero CHAR(1) NOT NULL,
    correo  VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(65) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    PRIMARY KEY (id_user),
    CHECK (genero IN ('F', 'M'))
);

ALTER TABLE User
  ADD CONSTRAINT UQ_correo UNIQUE (correo);

ALTER TABLE Pelicula
  ADD CONSTRAINT FK_Genero_TO_Pelicula
    FOREIGN KEY (id_genero)
    REFERENCES Genero (id_genero);

ALTER TABLE Alquiler
  ADD CONSTRAINT FK_User_TO_Alquiler
    FOREIGN KEY (id_user)
    REFERENCES User (id_user);

ALTER TABLE Alquiler
  ADD CONSTRAINT FK_Pelicula_TO_Alquiler
    FOREIGN KEY (id_pelicula)
    REFERENCES Pelicula (id_pelicula);

ALTER TABLE Comentario
  ADD CONSTRAINT FK_User_TO_Comentario
    FOREIGN KEY (id_user)
    REFERENCES User (id_user);

ALTER TABLE Comentario
  ADD CONSTRAINT FK_Pelicula_TO_Comentario
    FOREIGN KEY (id_pelicula)
    REFERENCES Pelicula (id_pelicula);
