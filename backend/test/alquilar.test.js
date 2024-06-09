/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/connectionDB');
const peliculaController = require('../app/controllers/peliculaController');
const api = '/api';
const alquiler = api + '/alquileres';
const rent = {
    fecha_alquiler: '2024-06-08',
    id_user: 4,
    id_pelicula: 1
};

describe('Modulo de Alquilar', () => {
    let id_alquiler;

    it('Debería registrar un nuevo alquiler y devolver un estado 201', async () => {
        const nuevoAlquiler = await request(app)
            .post(alquiler)
            .send(rent);

        expect(nuevoAlquiler.status).toBe(201);
        expect(nuevoAlquiler.body.id_alquiler).toBeDefined();
        id_alquiler = nuevoAlquiler.body.id_alquiler;
    });

    it('Debería cambiar el estado de un alquiler a devuelto y devolver un estado 200', async () => {
        const alquiler_id_devuelto = `${alquiler}/${id_alquiler}/devuelto`;
        const return_rent = {
            multa: 0,
            fecha_devolucion: '2024-06-10 12:00:00'
        };

        const cambioEstadoResponse = await request(app)
            .patch(alquiler_id_devuelto)
            .send(return_rent);

        expect(cambioEstadoResponse.status).toBe(200);
        expect(cambioEstadoResponse.body.devuelto).toBe(1);
        await peliculaController.actualizarEstadoAlquilado(rent.id_pelicula, 1);
    });

});
