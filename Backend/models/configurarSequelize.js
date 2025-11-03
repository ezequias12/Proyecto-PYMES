const { Sequelize } = require('sequelize');

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './.data/pymes.db', // Nombre del archivo de la base de datos (ruta desde la raíz del proyecto)
  define: {
    freezeTableName: true,   // No pluraliza los nombres de las tablas, modelo = tabla
    timestamps: false        // No crea campos de fecha de creación y modificación
  }
});

module.exports = sequelize;
