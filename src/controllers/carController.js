const Car = require('../models/Car');

class CarController {
    // Page pour créer une car
    static renderCreateCar(req, res) {
        const path = require('path');
        res.sendFile(path.join(__dirname, '../../public/car.html'));
    }

    // Créer une car
    static createCar(req, res) {
        const { capacite, immatriculation } = req.body;

        Car.create({ capacite, immatriculation }, (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Erreur SQL Car" });
            }
            res.send("<h1>Car ajouté avec succès</h1>");
        });
    }
}

module.exports = CarController;
