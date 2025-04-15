// config/db.js
const { Sequelize } = require('sequelize');

// Créer une instance Sequelize avec les informations de connexion
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',  // Choisissez le dialecte approprié (postgres, mysql, sqlite, etc.)
  logging: false,       // Optionnel : désactiver les logs SQL
});

module.exports = sequelize;
