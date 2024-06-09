/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const request = require('supertest');
const app = require('../app');
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

        const cambiarEstado = await request(app)
            .patch(alquiler_id_devuelto)
            .send();

        expect(cambiarEstado.status).toBe(200);
        expect(cambiarEstado.body.devuelto).toBe(1);
        await peliculaController.actualizarEstadoAlquilado(rent.id_pelicula, 1);
    });

});
