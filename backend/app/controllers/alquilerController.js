/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const Alquiler = require('../models/Alquiler');
const moment = require('moment');
const peliculaController = require('./peliculaController');
const { obtenerDiferenciaEnHoras, calcularMulta } = require('../utils/multa');

exports.obtenerAlquileresPorUsuario = async (req, res) => {
    const { id_usuario, devuelto } = req.params;

    try {
        const es_devuelto = parseInt(devuelto);

        const alquileres = await Alquiler.findAll({
            where: {
                id_user: id_usuario,
                devuelto: es_devuelto
            }
        });

        res.status(200).json(alquileres);
    } catch (error) {
        console.error('Error al obtener alquileres por usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.registrarNuevoAlquiler = async (req, res) => {
    const { fecha_alquiler, id_user, id_pelicula } = req.body;

    try {
        const nuevoAlquiler = await Alquiler.create({
            fecha_alquiler,
            fecha_devolucion: fecha_alquiler,
            id_user,
            id_pelicula
        });

        await peliculaController.actualizarEstadoAlquilado(id_pelicula, 1);
        res.status(201).json(nuevoAlquiler);
    } catch (error) {
        console.error('Error al registrar un nuevo alquiler:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.cambiarEstadoADevuelto = async (req, res) => {
    const { id_alquiler } = req.params;

    const fecha_devolucion = moment().format('YYYY-MM-DD HH:mm:ss');

    try {

        const alquiler = await Alquiler.findByPk(id_alquiler);
        if (!alquiler) {
            return res.status(404).json({ message: 'Alquiler no encontrado' });
        }
        const diferenciaHoras = obtenerDiferenciaEnHoras(alquiler.fecha_alquiler, fecha_devolucion);

        alquiler.devuelto = 1;
        alquiler.multa = calcularMulta(diferenciaHoras);
        alquiler.fecha_devolucion = fecha_devolucion;

        await peliculaController.actualizarEstadoAlquilado(alquiler.id_pelicula, 0);

        await alquiler.save();

        res.status(200).json(alquiler);
    } catch (error) {
        console.error('Error al cambiar el estado a devuelto:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};