const express = require('express');
const router = express.Router();
const VoyageController = require('../controllers/voyageController');

// GET /voyages - Afficher tous les voyages
router.get('/', VoyageController.renderListVoyages);

// GET /voyages/:id - Récupérer un voyage
router.get('/:id', VoyageController.getVoyageById);

// DELETE /voyages/:id - Supprimer un voyage
router.delete('/:id', VoyageController.deleteVoyage);

module.exports = router;
