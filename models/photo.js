// Importar librería Sequelize
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Importar conexión a base de datos
const { sequelize } = require('./../config/db');

// Crear modelo
class Photo extends Model {}
Photo.init({
    //Definir campos del modelo
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usuarioA: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'photo'
});

// Exportar modelo
module.exports = { Photo };