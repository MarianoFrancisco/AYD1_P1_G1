/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const Comentario = require('../models/Comentario');

exports.obtenerComentariosPorPelicula = async (req, res) => {
    const { id_pelicula } = req.params;
    try {
        const comentarios = await Comentario.findAll({ where: { id_pelicula } });
        res.status(200).json(comentarios);
    } catch (error) {
        console.error('Error al obtener los comentarios por ID de película:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.obtenerComentariosPorPeliculaUsuario = async (req, res) => {
    const { id_pelicula, id_user } = req.params;
    try {
        const comentarios = await Comentario.findAll({
            where: {
                id_pelicula,
                id_user
            }
        });
        res.status(200).json(comentarios);
    } catch (error) {
        console.error('Error al obtener los comentarios por ID de película y ID de usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.agregarComentario = async (req, res) => {
    const { contenido, id_user, id_pelicula } = req.body;
    try {
        const comentario = await Comentario.create({ contenido, id_user, id_pelicula });
        res.status(201).json(comentario);
    } catch (error) {
        console.error('Error al agregar el comentario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.eliminarComentario = async (req, res) => {
    const { id_comentario } = req.params;
    try {
        const comentario = await Comentario.findByPk(id_comentario);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        await comentario.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar el comentario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};