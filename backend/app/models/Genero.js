const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');

const Genero = sequelize.define('Genero', {
    id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(65),
        allowNull: false
    }
}, {
    tableName: 'Genero',
    timestamps: false
});

module.exports = Genero;
