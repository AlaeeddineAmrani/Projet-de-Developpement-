const db = require('../config/db');

class ReservationController {
    // Créer une réservation
    static createReservation(req, res) {
        const { id_voyage, id_utilisateur } = req.body;

        if (!id_voyage || !id_utilisateur) {
            return res.status(400).json({ message: "Erreur : Utilisateur ou Voyage non identifié.", statut: "Echec" });
        }

        const sql = "INSERT INTO billet (id_voyage, id_utilisateur) VALUES (?, ?)";

        db.query(sql, [id_voyage, id_utilisateur], (err, result) => {
            if (err) {
                console.error("Erreur SQL :", err);
                if (err.sqlMessage && (err.sqlMessage.includes("complet") || err.sqlMessage.includes("full"))) {
                    return res.status(409).json({ 
                        message: "Désolé, cet autocar est complet ! Impossible de réserver.", 
                        statut: "Echec" 
                    });
                }
                return res.status(500).json({ message: "Erreur lors de la réservation.", statut: "Echec" });
            }

            res.status(200).json({
                message: "Réservation confirmée !",
                statut: "Succès"
            });
        });
    }
}

module.exports = ReservationController;
