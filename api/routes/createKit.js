/**
 * @file createKit.js
 * @brief Définition de la route pour la génération d'un fichier CSS à partir des données envoyées par l'utilisateur.
 * @version 3.0
 * @author COULAIS Tom
 * @date 2025-04-14
 */

const express = require('express');
const router = express.Router();

// Importation du contrôleur des styles
const stylesController = require('../controllers/stylesController');

/**
 * @route POST /createKit/generated
 * @description Route pour générer un fichier CSS. Appelle la méthode generateCssFile du contrôleur.
 */
router.post('/generated', stylesController.generateCssFile);

module.exports = router;
