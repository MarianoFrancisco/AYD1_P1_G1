const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');

const Comentario = sequelize.define('Comentario', {
    id_comentario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    contenido: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_pelicula: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Comentario',
    timestamps: false
});

module.exports = Comentario;
