const db = require('../config/db');

class Voyage {
    // Récupérer tous les voyages avec informations de trajet et gares
    static findAll(callback) {
        const sql = `
            SELECT 
                V.id_voyage,
                V.date_depart, 
                V.statut, 
                V.id_car, 
                GD.nom_gare AS gare_depart,  
                GA.nom_gare AS gare_arrivee,
                V.prix
            FROM voyages V
            INNER JOIN trajet T ON V.id_trajet = T.id_trajet
            INNER JOIN gare GD ON T.id_gare_depart = GD.id_gare
            INNER JOIN gare GA ON T.id_gare_arrivee = GA.id_gare
            ORDER BY V.date_depart DESC
        `;
        db.query(sql, callback);
    }

    // Récupérer un voyage par ID
    static findById(id, callback) {
        const sql = "SELECT * FROM voyages WHERE id_voyage = ?";
        db.query(sql, [id], callback);
    }

    // Créer un voyage
    static create(voyageData, callback) {
        const sql = "INSERT INTO voyages (date_depart, statut, id_car, id_trajet, prix) VALUES (?, ?, ?, ?, ?)";
        const { date_depart, statut, id_car, id_trajet, prix } = voyageData;
        db.query(sql, [date_depart, statut, id_car, id_trajet, prix], callback);
    }

    // Supprimer un voyage
    static delete(id, callback) {
        const sql = "DELETE FROM voyages WHERE id_voyage = ?";
        db.query(sql, [id], callback);
    }
}

module.exports = Voyage;
