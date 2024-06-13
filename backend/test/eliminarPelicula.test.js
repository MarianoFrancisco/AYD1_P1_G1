/*
* authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const request = require('supertest');
const app = require('../app');
const api = '/api'
const movie = api + '/peliculas'
const eliminarPelicula = movie + '/:id'


const elimPelicula = {
    id_pelicula: 3
};

describe('Modulo de Agregar Pelicula', () => {
    it('Debería eliminar una película y devolver un estado 204', async () => {
        const response = await request(app)
        .post(eliminarPelicula)
        .send(elimPelicula);

        expect(response.status).toBe(204);
    });

    it('Debería devolver un estado 404 y un mensaje de datos Error al eliminar la pelicula', async () => {
        const response = await request(app)
        .post(eliminarPelicula)
        .send(elimPelicula);

        expect(response.status).toBe(404);
        expect(response.message).toBe('Pelicula no encontrada');
        //expect(response.message).toBe('Error al eliminar la película:');
        

    });

});
