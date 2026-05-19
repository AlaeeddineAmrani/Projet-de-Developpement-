const express = require('express');
const router = express.Router();
const CarController = require('../controllers/carController');

// GET /car - Afficher page création car
router.get('/', CarController.renderCreateCar);

// POST /car - Créer une car
router.post('/', CarController.createCar);

module.exports = router;
