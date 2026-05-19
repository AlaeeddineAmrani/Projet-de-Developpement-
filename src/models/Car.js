const db = require('../config/db');

class Car {
    // Récupérer tous les cars
    static findAll(callback) {
        const sql = "SELECT * FROM car";
        db.query(sql, callback);
    }

    // Récupérer un car par ID
    static findById(id, callback) {
        const sql = "SELECT * FROM car WHERE id_car = ?";
        db.query(sql, [id], callback);
    }

    // Récupérer un car par immatriculation
    static findByImmatriculation(immatriculation, callback) {
        const sql = "SELECT * FROM car WHERE immatriculation = ?";
        db.query(sql, [immatriculation], callback);
    }

    // Créer un car
    static create(carData, callback) {
        const sql = "INSERT INTO car (capacite, immatriculation) VALUES (?, ?)";
        const { capacite, immatriculation } = carData;
        db.query(sql, [capacite, immatriculation], callback);
    }
}

module.exports = Car;
