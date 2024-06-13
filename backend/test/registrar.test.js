/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const request = require('supertest');
const app = require('../app');
const api = '/api'
const login = api + '/login'
const user = api + '/usuarios'
const agregarUsuario = user + '/:id'


const registrerSuccessful = {
    nombre: 'Luisa',
    apellido: 'Luna',
    genero: 'F',
    correo: 'ce@gmail.com',
    contrasenia: '$2a$10$pd/x5y3VJAn2hA02TrU/ZOuRba4CUdzJo2bVDjGzUBBxAJ2bPPgWO',
    fecha_nacimiento: '2006-01-01'
};

const existingUser = {
    nombre: 'Maria',
    apellido: 'Lopez',
    genero: 'F',
    correo: 'user@gmail.com',
    contrasenia: '$2a$10$pd/x5y3VJAn2hA02TrU/ZOuRba4CUdzJo2bVDjGzUBBxAJ2bPPgWO',
    fecha_nacimiento: '1988-11-22'
};

describe('Modulo de Registro de Usuarios', () => {

    it('Debería registrar un nuevo usuario y devolver un estado 201', async () => {
        const response = await request(app)
            .post(agregarUsuario)
            .send(registrerSuccessful);

        expect(response.status).toBe(201);
        //expect(response.body.message).toBe('Usuario registrado correctamente');
    });

    it('Debería devolver un error 401 si el correo ya está registrado', async () => {
        const response = await request(app)
            .post(agregarUsuario)
            .send(existingUser);

        expect(response.status).toBe(404);
        expect(response.status).toBe(401);
        //expect(response.body.message).toBe('Error al agregar un nuevo usuario:');
    });

});
