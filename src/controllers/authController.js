const User = require('../models/User');

class AuthController {
    // Inscription
    static register(req, res) {
        const { nom, prenom, email, mot_de_passe } = req.body;

        console.log("Données reçues :", req.body);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Format d'email invalide !", 
                statut: "mauvaisformat" 
            });
        }

        User.findByEmail(email, (err, resultats) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            if (resultats && resultats.length > 0) {
                return res.json({ message: "Email ou mot de passe erroné.", statut: "Echec" });
            }

            const newUser = {
                nom,
                prenom,
                email,
                mot_de_passe,
                role: 'utilisateur'
            };

            User.create(newUser, (err, resultat) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Erreur lors de l'inscription" });
                }
                res.status(200).json({
                    message: `Bienvenue ${nom} inscription réussie.`,
                    statut: "Succès"
                });
            });
        });
    }

    // Connexion
    static login(req, res) {
        const { email, mot_de_passe } = req.body;

        console.log("Utilisateur connecté");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Format d'email invalide !", 
                statut: "mauvaisformat" 
            });
        }

        User.findByEmailAndPassword(email, mot_de_passe, (err, resultats) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            if (!resultats || resultats.length < 1) {
                return res.status(400).json({ 
                    message: "Mot de passe incorrect ou Utilisateur non connecté.", 
                    statut: "Echec" 
                });
            }

            const user = resultats[0];
            if (user.role === "admin") {
                return res.status(200).json({ 
                    message: `Bienvenue admin, connexion réussie.`, 
                    statut: "Succèsadmin", 
                    nom: user.nom,
                    id: user.id_utilisateur
                });
            } else {
                return res.status(200).json({ 
                    message: `Bienvenue client, connexion réussie.`, 
                    statut: "Succèsclient",
                    nom: user.nom,
                    id: user.id_utilisateur
                });
            }
        });
    }
}

module.exports = AuthController;