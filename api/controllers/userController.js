/**
 * @file userController.js
 * @description Contrôleur pour la création, la connexion et la récupération d'un utilisateur.
 * @version 2.1
 * @author COULAIS Tom
 * @date 2025-04-15
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;


/**
 * @function createUser
 * @description Crée un nouvel utilisateur avec un email, un nom d'utilisateur et un mot de passe.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Object} JSON avec un message de succès ou une erreur.
 */
exports.createUser = async (req, res) => {
  console.log('Reçu du front:', req.body);
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, nom d\'utilisateur et mot de passe requis.' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      roles: 0,
    });

    const token = jwt.sign({ email: newUser.email, userId: newUser.userId }, JWT_SECRET, { expiresIn: '2h' });

    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token
    });
  } catch (err) {
    console.error('Erreur lors de la création de l\'utilisateur:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

/**
 * @function loginUser
 * @description Gère la connexion d’un utilisateur et renvoie un token JWT via cookie.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Object} JSON contenant un message ou une erreur.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ email: user.email, userId: user.userId }, JWT_SECRET, { expiresIn: '2h' });

    return res.status(200).json({ 
      message: 'Connexion réussie', 
      token
    });
  } catch (err) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
