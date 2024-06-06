/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
// Import module
const express = require('express') 
const cors = require('cors')


// Creación de la aplicación Express
const app = express(); 
app.use(express.json());


const bodyParser = require('body-parser'); 
app.use(bodyParser.json({ limit: '15mb' }));

app.use(cors())


// Import routes
const loginRouter= require('./app/routes/login.routes.js')

app.use(loginRouter)

module.exports = app;