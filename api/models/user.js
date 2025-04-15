/**
 * @file user.js
 * @brief Modèle utilisateur pour l'application, utilisé pour interagir avec la table "users" dans la base de données.
 * @version 2.0
 * @author COULAIS Tom
 * @date 2025-04-14
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * @class User
 * @brief Modèle de l'utilisateur représentant la structure de la table "users" dans la base de données.
 * Ce modèle est utilisé pour effectuer des opérations CRUD sur les utilisateurs.
 * 
 * @property {integer} userId - Identifiant unique de l'utilisateur (clé primaire, auto-incrémentée).
 * @property {string} email - Adresse email unique de l'utilisateur. Doit être une adresse email valide.
 * @property {string} username - Nom d'utilisateur unique.
 * @property {string} password - Mot de passe de l'utilisateur.
 * @property {integer} roles - Rôle de l'utilisateur (par défaut, 0).
 * @property {string} avatar - URL de l'avatar de l'utilisateur (facultatif).
 * @property {string} access_token - Jeton d'accès de l'utilisateur (facultatif).
 */
const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  
    validate: {
      isEmail: true, 
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,  
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,  
  },
  access_token: {
    type: DataTypes.STRING,
    allowNull: true,  
  },
}, {
  timestamps: true,  
  tableName: 'users',  
});

module.exports = User;
