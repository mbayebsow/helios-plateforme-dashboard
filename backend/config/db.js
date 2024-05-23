require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Gestion des événements de connexion réussie
db.on('connected', () => {
  console.log('Connexion à MongoDB établie avec succès.');
});

// Gestion des erreurs de connexion
db.on('error', (err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

// Gestion de la déconnexion de la base de données
db.on('disconnected', () => {
  console.log('Déconnexion de la base de données.');
});

// Fermeture de la connexion Mongoose lorsque l'application est terminée
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Fermeture de la connexion à MongoDB et arrêt de l\'application.');
    process.exit(0);
  });
});

module.exports = db;