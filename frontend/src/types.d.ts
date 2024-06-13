export interface Pelicula  {
    id_pelicula: number;
    titulo: string;
    sinopsis: string;
    precio_alquiler: string;
    director: string;
    anio_estreno: number;
    duracion: string;
    imagen: string;
    alquilado: number;
    id_genero: number;
}

export interface Usuario  {
    id_user: number;
    nombre: string;
    apellido: string;
    genero: string;
    correo: string;
    fecha_nacimiento: Date;
}