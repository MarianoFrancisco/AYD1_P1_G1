/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const request = require('supertest');
const app = require('../app');
const api = '/api'
const login = api + '/login'
const loginSuccessful = {
    correo: 'test@gmail.com',
    contrasenia: '1234'
};
const unregisteredUser = {
    correo: 'notest@gmail.com',
    contrasenia: '1234'
};
const wrongData = {
    correo: 'test@gmail.com',
    contrasenia: 'testing'
};


describe('Modulo de inicio de sesión', () => {
    it('Debería devolver un JSON, un mensaje exitoso y un estado 200', async () => {
        const loginUser = await request(app)
            .post(login)
            .send(loginSuccessful);

        expect(loginUser.body.message).toBe('Inicio de sesión exitoso');
        expect(loginUser.body.token).toBeDefined();
        expect(loginUser.status).toBe(200);
    });

    it('Debería devolver un estado 401 y un mensaje de usuario no registrado', async () => {
        const loginUser = await request(app)
            .post(login)
            .send(unregisteredUser);

        expect(loginUser.body.message).toBe('Usuario no registrado');
        expect(loginUser.status).toBe(401);
    });

    it('Debería devolver un estado 401 y un mensaje de datos ingresados no coinciden', async () => {
        const loginUser = await request(app)
            .post(login)
            .send(wrongData);

        expect(loginUser.body.message).toBe('Datos ingresados no coinciden');
        expect(loginUser.status).toBe(401);
    });
});
