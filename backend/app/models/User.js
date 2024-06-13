const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    genero: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
            isIn: [['F', 'M']]
        }
    },
    correo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    contrasenia: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = User;
