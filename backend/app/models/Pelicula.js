const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');

const Pelicula = sequelize.define('Pelicula', {
    id_pelicula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    sinopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio_alquiler: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    director: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    anio_estreno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duracion: {
        type: DataTypes.TIME,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    alquilado: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Pelicula',
    timestamps: false
});

module.exports = Pelicula;
