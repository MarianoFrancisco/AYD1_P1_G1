/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const Genero = require('../models/Genero');

exports.obtenerTodosLosGeneros = async (req, res) => {
    try {
        const generos = await Genero.findAll();
        res.status(200).json(generos);
    } catch (error) {
        console.error('Error al obtener los géneros:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.obtenerGeneroPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const genero = await Genero.findByPk(id);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }
        res.status(200).json(genero);
    } catch (error) {
        console.error('Error al obtener el género:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.agregarGenero = async (req, res) => {
    const { nombre } = req.body;
    try {
        const genero = await Genero.create({ nombre });
        res.status(201).json(genero);
    } catch (error) {
        console.error('Error al agregar el género:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};