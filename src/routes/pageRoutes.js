const express = require('express');
const router = express.Router();
const path = require('path');

// GET / - Home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// GET /inscription - Registration page
router.get('/inscription', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/inscription.html'));
});

// GET /login - Login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
});

// GET /user - User dashboard
router.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/user.html'));
});

// GET /admin - Admin dashboard
router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin.html'));
});

module.exports = router;
