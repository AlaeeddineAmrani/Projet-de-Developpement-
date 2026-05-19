const db = require('../config/db');

class Trajet {
    // Récupérer tous les trajets
    static findAll(callback) {
        const sql = `
            SELECT 
                T.id_trajet,
                T.duree,
                G_DEP.nom_gare AS gare_depart,
                G_ARR.nom_gare AS gare_arrivee
            FROM trajet T
            INNER JOIN gare G_DEP ON T.id_gare_depart = G_DEP.id_gare
            INNER JOIN gare G_ARR ON T.id_gare_arrivee = G_ARR.id_gare
        `;
        db.query(sql, callback);
    }

    // Récupérer un trajet par ID
    static findById(id, callback) {
        const sql = "SELECT * FROM trajet WHERE id_trajet = ?";
        db.query(sql, [id], callback);
    }

    // Créer un trajet
    static create(trajetData, callback) {
        const sql = "INSERT INTO trajet (duree, id_gare_depart, id_gare_arrivee) VALUES (?, ?, ?)";
        const { duree, id_gare_depart, id_gare_arrivee } = trajetData;
        db.query(sql, [duree, id_gare_depart, id_gare_arrivee], callback);
    }

    // Récupérer l'ID gare par nom
    static getGareIdByName(nom_gare, callback) {
        const sql = "SELECT id_gare FROM gare WHERE nom_gare = ?";
        db.query(sql, [nom_gare], callback);
    }
}

module.exports = Trajet;
