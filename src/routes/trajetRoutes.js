const express = require('express');
const router = express.Router();
const TrajetController = require('../controllers/trajetController');

// GET /trajet - Afficher page création trajet
router.get('/', TrajetController.renderCreateTrajet);

// POST /trajet - Créer un trajet
router.post('/', TrajetController.createTrajet);

module.exports = router;
