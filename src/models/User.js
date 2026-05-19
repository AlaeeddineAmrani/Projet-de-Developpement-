const db = require('../config/db');

class User {
    // Récupérer tous les utilisateurs
    static findAll(callback) {
        const sql = "SELECT * FROM utilisateurs";
        db.query(sql, callback);
    }

    // Récupérer un utilisateur par ID
    static findById(id, callback) {
        const sql = "SELECT * FROM utilisateurs WHERE id_utilisateur = ?";
        db.query(sql, [id], callback);
    }

    // Récupérer un utilisateur par email
    static findByEmail(email, callback) {
        const sql = "SELECT * FROM utilisateurs WHERE email = ?";
        db.query(sql, [email], callback);
    }

    // Récupérer un utilisateur par email et mot de passe
    static findByEmailAndPassword(email, mot_de_passe, callback) {
        const sql = "SELECT * FROM utilisateurs WHERE email = ? AND mot_de_passe = ?";
        db.query(sql, [email, mot_de_passe], callback);
    }

    // Créer un utilisateur
    static create(userData, callback) {
        const sql = "INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)";
        const { nom, prenom, email, mot_de_passe, role } = userData;
        const userRole = role || 'utilisateur';
        db.query(sql, [nom, prenom, email, mot_de_passe, userRole], callback);
    }

    // Supprimer un utilisateur
    static delete(id, callback) {
        const sql = "DELETE FROM utilisateurs WHERE id_utilisateur = ?";
        db.query(sql, [id], callback);
    }
}

module.exports = User;