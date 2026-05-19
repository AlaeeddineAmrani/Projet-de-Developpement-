require('dotenv').config();
const express = require('express');
const db = require('./src/config/db');
const PORT = 2000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Controllers
const AuthController = require('./src/controllers/authController');
const VoyageController = require('./src/controllers/voyageController');
const UserController = require('./src/controllers/userController');
const CarController = require('./src/controllers/carController');
const TrajetController = require('./src/controllers/trajetController');
const ReservationController = require('./src/controllers/reservationController');

const path = require('path');

// Page Routes (GET)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/inscription', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/inscription.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/user.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/admin.html'));
});

app.get('/trajet', TrajetController.renderCreateTrajet);
app.get('/car', CarController.renderCreateCar);

// Auth routes
app.post('/inscription', AuthController.register);
app.post('/login', AuthController.login);

// Voyage routes
app.get('/voyages', VoyageController.renderListVoyages);
app.get('/voyages/:id', VoyageController.getVoyageById);
app.delete('/voyages/:id', VoyageController.deleteVoyage);

// User routes
app.get('/users', UserController.renderListUsers);
app.post('/user', UserController.searchVoyages);
app.delete('/users/:id', UserController.deleteUser);

// Car routes
app.post('/car', CarController.createCar);

// Trajet routes
app.post('/trajet', TrajetController.createTrajet);

// Reservation routes
app.post('/reservation', ReservationController.createReservation);

// Start server
app.listen(PORT, () => {
    console.log(`Serveur lancé sur : http://localhost:${PORT}`);
});
