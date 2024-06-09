/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());
app.use('/img-movie',express.static(path.join(`${__dirname}/img`)));

const alquilerRouter = require('./app/routes/alquiler.routes.js');
const comentarioRouter = require('./app/routes/comentario.routes.js');
const generoRouter = require('./app/routes/genero.routes.js');
const peliculaRouter = require('./app/routes/pelicula.routes.js');
const userRouter = require('./app/routes/user.routes.js');

app.use(alquilerRouter);
app.use(comentarioRouter);
app.use(generoRouter);
app.use(peliculaRouter);
app.use(userRouter);

module.exports = app;
