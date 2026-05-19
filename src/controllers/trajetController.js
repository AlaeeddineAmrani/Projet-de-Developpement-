const Trajet = require('../models/Trajet');
const Car = require('../models/Car');

class TrajetController {
    // Page pour créer un trajet
    static renderCreateTrajet(req, res) {
        const path = require('path');
        res.sendFile(path.join(__dirname, '../../public/trajet.html'));
    }

    // Créer un trajet et un voyage
    static createTrajet(req, res) {
        const { nomgaredepart, nomgarearrivee, datedepart, duree, immatriculation, prix } = req.body;

        if (new Date(datedepart) <= new Date()) {
            return res.json({ message: "La date est déjà passée.", statut: "Echec" });
        }

        const db = require('../config/db');
        const sqlGares = "SELECT id_gare FROM gare WHERE nom_gare IN (?, ?)";
        
        db.query(sqlGares, [nomgaredepart, nomgarearrivee], (err, resultGares) => {
            if (err) return res.status(500).json({ message: "Erreur SQL Gares" });
            if (resultGares.length < 2) return res.json({ message: "Une des gare n'existe pas.", statut: "Echec" });

            const sqlGetId = "SELECT id_gare FROM gare WHERE nom_gare = ?";
            
            db.query(sqlGetId, [nomgaredepart], (err1, resDep) => {
                if (err1 || resDep.length === 0) return res.json({ message: "Gare départ introuvable" });
                const idDepart = resDep[0].id_gare;

                db.query(sqlGetId, [nomgarearrivee], (err2, resArr) => {
                    if (err2 || resArr.length === 0) return res.json({ message: "Gare arrivée introuvable" });
                    const idArrivee = resArr[0].id_gare;

                    const sqlCar = "SELECT id_car FROM car WHERE immatriculation = ?";
                    db.query(sqlCar, [immatriculation], (errCar, resCar) => {
                        if (errCar) return res.status(500).json({ message: "Erreur serveur Car" });
                        if (resCar.length === 0) return res.json({ message: "Autocar introuvable", statut: "Echec" });
                        
                        const idCar = resCar[0].id_car;

                        const sqlInsertTrajet = "INSERT INTO trajet (duree, id_gare_depart, id_gare_arrivee) VALUES (?, ?, ?)";
                        
                        db.query(sqlInsertTrajet, [duree, idDepart, idArrivee], (errTrajet, resultTrajet) => {
                            if (errTrajet) return res.status(500).json({ message: "Erreur création Trajet" });

                            const idNouveauTrajet = resultTrajet.insertId;

                            const sqlInsertVoyage = "INSERT INTO voyages (date_depart, statut, id_car, id_trajet, prix) VALUES (?, ?, ?, ?, ?)";
                            const statutDefaut = 'PREVU'; 

                            db.query(sqlInsertVoyage, [datedepart, statutDefaut, idCar, idNouveauTrajet, prix], (errVoyage, resultVoyage) => {
                                if (errVoyage) {
                                    console.log(errVoyage); 
                                    return res.status(500).json({ message: "Erreur création Voyage" });
                                }

                                res.status(200).json({
                                    message: "Voyage et Trajet ajoutés avec succès !",
                                    statut: "Succès"
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}

module.exports = TrajetController;
