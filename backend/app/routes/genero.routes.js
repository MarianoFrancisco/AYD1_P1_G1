/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');
const api = '/api'
const genero = api + '/generos'
const genero_id = genero + '/:id'

router.get(genero, generoController.obtenerTodosLosGeneros);

router.get(genero_id, generoController.obtenerGeneroPorId);

router.post(genero, generoController.agregarGenero);

module.exports = router;
