require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); 
const authRoutes = require('./routes/auth');
const kitRoutes = require('./routes/createKit');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/createKit', kitRoutes);

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Les modèles ont été synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation des modèles', err);
  });

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur http://${hostname}:${port}`);
});
