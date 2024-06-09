/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const alquilerController = require('../controllers/alquilerController');
const api = '/api'
const alquiler = api + '/alquileres'
const alquiler_usuario_estado = alquiler + '/:id_usuario/:devuelto'
const alquiler_id_devuelto = alquiler + '/:id_alquiler/devuelto'


router.get(alquiler_usuario_estado, alquilerController.obtenerAlquileresPorUsuario);

router.post(alquiler, alquilerController.registrarNuevoAlquiler);

router.patch(alquiler_id_devuelto, alquilerController.cambiarEstadoADevuelto);

module.exports = router;