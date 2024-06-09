const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');

const Alquiler = sequelize.define('Alquiler', {
    id_alquiler: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_alquiler: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_devolucion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    multa: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    devuelto: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
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
    tableName: 'Alquiler',
    timestamps: false
});

module.exports = Alquiler;