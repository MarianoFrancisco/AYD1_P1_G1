/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const Pelicula = require('../models/Pelicula');
const path = require('path');
const fs = require('fs');

exports.obtenerTodasLasPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.status(200).json(peliculas);
    } catch (error) {
        console.error('Error al obtener las películas:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.obtenerPeliculasNoAlquiladas = async (req, res) => {
    try {
        const peliculasNoAlquiladas = await Pelicula.findAll({
            where: {
                alquilado: 0
            }
        });
        res.status(200).json(peliculasNoAlquiladas);
    } catch (error) {
        console.error('Error al obtener las películas alquiladas:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.obtenerPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }
        res.status(200).json(pelicula);
    } catch (error) {
        console.error('Error al obtener la película:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.agregarPelicula = async (req, res) => {
    const { titulo, sinopsis, precio_alquiler, director, anio_estreno, duracion, id_genero } = req.body;
    const imagen = req.file;
    try {

        if (!imagen) {
            return res.status(400).json({ message: 'Debe proporcionar una imagen para la película' });
        }

        const pelicula = await Pelicula.create({
            titulo,
            sinopsis,
            precio_alquiler,
            director,
            anio_estreno,
            duracion,
            imagen: imagen.filename,
            id_genero
        });

        res.status(201).json(pelicula);
    } catch (error) {

        console.error('Error al agregar la película:', error.message);

        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.editarPelicula = async (req, res) => {
    const { id } = req.params;
    const { titulo, sinopsis, precio_alquiler, director, anio_estreno, duracion, id_genero } = req.body;
    const imagen = req.file;

    try {
        let pelicula = await Pelicula.findByPk(id);

        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }

        pelicula.titulo = titulo;
        pelicula.sinopsis = sinopsis;
        pelicula.precio_alquiler = precio_alquiler;
        pelicula.director = director;
        pelicula.anio_estreno = anio_estreno;
        pelicula.duracion = duracion;
        pelicula.id_genero = id_genero;

        if (imagen) {
            const rutaImagenAnterior = path.join(__dirname, '..', '..', 'img', pelicula.imagen);
            fs.unlinkSync(rutaImagenAnterior);
            pelicula.imagen = imagen.filename;
        }

        await pelicula.save();

        res.status(200).json(pelicula);
    } catch (error) {
        console.error('Error al editar la película:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.eliminarPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }
        const rutaImagenAnterior = path.join(__dirname, '..', '..', 'img', pelicula.imagen);
        fs.unlinkSync(rutaImagenAnterior);
        await pelicula.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar la película:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.actualizarEstadoAlquilado = async (id, nuevoEstado) => {
    try {
        const pelicula = await Pelicula.findByPk(id);

        if (!pelicula) {
            throw new Error('Película no encontrada');
        }

        pelicula.alquilado = nuevoEstado;
        await pelicula.save();

        return pelicula;
    } catch (error) {
        throw new Error('Error al cambiar el estado de alquilado: ' + error.message);
    }
};