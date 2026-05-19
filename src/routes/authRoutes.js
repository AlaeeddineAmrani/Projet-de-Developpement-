const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// POST /inscription
router.post('/inscription', AuthController.register);

// POST /login
router.post('/login', AuthController.login);

module.exports = router;

