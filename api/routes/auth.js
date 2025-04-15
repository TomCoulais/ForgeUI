/**
 * @file auth.js
 * @brief Définition des routes pour l'authentification des utilisateurs : inscription et connexion.
 * @version 2.0
 * @author COULAIS Tom
 * @date 2025-04-14
 */

const express = require('express');
const router = express.Router();

// Importation du contrôleur des utilisateurs
const userController = require('../controllers/userController');

/**
 * @route POST /auth/register
 * @description Route pour l'inscription d'un utilisateur. Appelle la méthode createUser du contrôleur.
 */
router.post('/register', userController.createUser);

/**
 * @route POST /auth/login
 * @description Route pour la connexion d'un utilisateur. Appelle la méthode loginUser du contrôleur.
 */
router.post('/login', userController.loginUser);

module.exports = router;
