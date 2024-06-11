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
const comentario_pelicula_usuario = comentario_id_pelicula + '/usuario/:id_user'
const comentario_individual = comentario + '/individual/:id_comentario'

router.get(comentario_id_pelicula, comentarioController.obtenerComentariosPorPelicula);

router.get(comentario_pelicula_usuario, comentarioController.obtenerComentariosPorPeliculaUsuario);

router.post(comentario, comentarioController.agregarComentario);

router.delete(comentario_individual, comentarioController.eliminarComentario);

module.exports = router;