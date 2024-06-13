const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');
const imagenController = require('../controllers/imagenController');
const api = '/api'
const movie = api + '/peliculas'
const catalog = api + '/catalogo'
const movie_id = movie + '/:id'

router.get(movie, peliculaController.obtenerTodasLasPeliculas);

router.get(catalog, peliculaController.obtenerPeliculasNoAlquiladas);

router.get(movie_id, peliculaController.obtenerPelicula);

router.post(movie, imagenController.upload, peliculaController.agregarPelicula);

router.put(movie_id, imagenController.upload, peliculaController.editarPelicula);

router.delete(movie_id, peliculaController.eliminarPelicula);

module.exports = router;