/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const api = '/api'
const comentario = api + '/comentarios'
const comentario_id_pelicula = comentario + '/:id_pelicula'

router.get(comentario_id_pelicula, comentarioController.obtenerComentariosPorPelicula);

router.post(comentario, comentarioController.agregarComentario);

module.exports = router;