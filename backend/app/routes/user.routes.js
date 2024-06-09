/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const api = '/api'
const login = api + '/login'
const user = api + '/usuarios'
const user_id = user + '/:id'

router.post(login, userController.login);

router.get(user, userController.obtenerTodosLosUsuarios);

router.get(user_id, userController.obtenerUsuario);

router.post(user, userController.agregarUsuario);

router.put(user_id, userController.editarUsuario);

router.delete(user_id, userController.eliminarUsuario);

module.exports = router;