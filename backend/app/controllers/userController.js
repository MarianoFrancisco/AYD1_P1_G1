/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword } = require('../utils/encryption');

exports.login = async (req, res) => {
    const { correo, contrasenia } = req.body;

    try {
        const usuario = await User.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no registrado' });
        }

        if (!bcrypt.compareSync(contrasenia, usuario.contrasenia)) {
            return res.status(401).json({ message: 'Datos ingresados no coinciden' });
        }

        const tokenPayload = {
            id: usuario.id_user,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            genero: usuario.genero,
            correo: usuario.correo,
            fecha_nacimiento: usuario.fecha_nacimiento
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.obtenerUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario por su ID:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.agregarUsuario = async (req, res) => {
    const { nombre, apellido, genero, correo, contrasenia, fecha_nacimiento } = req.body;
    try {
        contrasenia_encriptada = await hashPassword(contrasenia);
        const usuario = await User.create({
            nombre,
            apellido,
            genero,
            correo,
            contrasenia: contrasenia_encriptada,
            fecha_nacimiento
        });
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al agregar un nuevo usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, genero, correo, contrasenia, fecha_nacimiento } = req.body;
    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.genero = genero;
        usuario.correo = correo;
        usuario.fecha_nacimiento = fecha_nacimiento;

        if (contrasenia) {
            usuario.contrasenia = await hashPassword(contrasenia);
        }

        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al editar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};