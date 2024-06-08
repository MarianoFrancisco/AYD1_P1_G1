/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const connection = require('../../config/connectionDB');

exports.login = (req, res) => {
    const { correo, contrasenia } = req.body;
    const values_query = [correo, contrasenia];
    const query = 'SELECT * FROM User WHERE correo = ? AND contrasenia = ?';

    connection.query(query, values_query, (err, result) => {
        if (err) {
            console.error('Error al realizar el inicio de sesión: ', err);
            res.status(500).json({ message: 'Error interno del servidor' });
            return;
        }

        
        if (result.length === 1) {
           
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: result[0] });
        } else {
              res.status(401).json({ message: 'Correo o contraseña incorrectas' });
        }
    });

};