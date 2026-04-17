const db = require('/src/config/db');

class User {
    static create(userData, callback) {
        // La requête SQL
        const sql = "INSERT INTO utilisateur (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)";
        
        // On exécute la requête avec les données reçues
        db.query(sql, [userData.nom, userData.prenom, userData.email, userData.password], (err, result) => {
            if (err) {
                // S'il y a une erreur SQL, on la renvoie
                callback(err, null);
            } else {
                // Sinon, on renvoie le résultat (succès)
                callback(null, result);
            }
        });
    }
}

module.exports = User;