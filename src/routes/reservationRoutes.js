const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');

// POST /reservation - Créer une réservation
router.post('/', ReservationController.createReservation);

module.exports = router;
