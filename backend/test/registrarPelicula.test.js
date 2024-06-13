/*
* authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const request = require('supertest');
const app = require('../app');
const api = '/api';
const agregarPelicula = api + '/peliculas';

const nuevaPelicula = {
    titulo: 'Hombres de Negro',
    sinopsis: ' Los Hombres de Negro son agentes especiales que forman parte de una unidad altamente secreta del gobierno',
    precio_alquiler: 15.99,
    director: 'Barry Sonnenfeld',
    anio_estreno: 1997,
    duracion: 120,
    imagen:'1718231525263-5.jpg',
    alquilado: 0,
    id_genero: 1
};

describe('Modulo de Agregar Pelicula', () => {
    it('Debería agregar una nueva película y devolver un estado 201', async () => {
        const response = await request(app)
        .post(agregarPelicula)
        .send(nuevaPelicula);

        expect(response.status).toBe(201);
    });

    it('Debería devolver un estado 401 y un mensaje de datos Error al agregar la pelicula', async () => {
        const response = await request(app)
        .post(agregarPelicula)
        .send(nuevaPelicula);

        expect(response.status).toBe(401);
        //expect(response.message).toBe('Error al agregar la película:');
        

    });

});
