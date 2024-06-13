/*
* authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const request = require('supertest');
const app = require('../app');
const api = '/api';
const agregarComentario = api + '/comentarios';

const nuevoComentario = {
    contenido: 'pelicula interesante',
    id_user: 3,
    id_pelicula: 3
};

describe('Modulo de Agregar Comentario', () => {
    it('Debería agregar un nuevo comentario a pelicula y devolver un estado 201', async () => {
        const response = await request(app)
        .post(agregarComentario)
        .send(nuevoComentario);

        expect(response.status).toBe(201);
    });

    it('Debería devolver un estado 401 y un mensaje de datos Error al agregar el comentario', async () => {
        const response = await request(app)
        .post(agregarComentario)
        .send(nuevoComentario);

        expect(response.status).toBe(401);
        //expect(response.message).toBe('Error al agregar el comentario:');

    });

});
