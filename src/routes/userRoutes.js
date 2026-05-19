const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// GET /users - Afficher tous les utilisateurs
router.get('/', UserController.renderListUsers);

// DELETE /users/:id - Supprimer un utilisateur
router.delete('/:id', UserController.deleteUser);

// POST /user - Rechercher voyages
router.post('/', UserController.searchVoyages);

module.exports = router;
