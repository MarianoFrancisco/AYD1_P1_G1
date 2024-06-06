/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const connection = require('../../config/connectionDB');

exports.login = (req, res) => {
    const { user, password } = req.body;
    const values_query = [user, password];
    const query = 'SELECT * FROM Usuario WHERE user = ? AND password = ?';

    connection.query(query, values_query, (err, result) => {
        if (err) {
            console.error('Error al realizar el inicio de sesión: ', err);
            res.status(500).json({ message: 'Error interno del servidor' });
            return;
        }

        
        if (result.length === 1) {
           
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: result[0] });
        } else {
              res.status(401).json({ message: 'Nombre de usuario o contrasena incorrectos' });
        }
    });

};