/**
 * @file kit.js
 * @brief Définition de la route pour la génération d'un fichier CSS à partir des données envoyées par l'utilisateur.
 * @version 4.0
 * @author COULAIS Tom
 * @date 2025-04-14
 */

const express = require('express');
const router = express.Router();
// Importation du contrôleur des styles
const kitController = require('../controllers/kitController');


router.post('/generated', kitController.generateCssFile);
router.post('/updated/:userId/:fileName', kitController.updateCssFile);

router.get('/list/:userId', kitController.getUserCssFiles);

router.delete('/delete/:userId/:fileName', kitController.deleteCssFile);

module.exports = router;
