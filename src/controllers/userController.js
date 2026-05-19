const User = require('../models/User');

class UserController {
    // Afficher tous les utilisateurs en HTML
    static renderListUsers(req, res) {
        User.findAll((err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
            }

            let html = `<!DOCTYPE html>
            <html>
            <head>
                <title>Page affichage utilisateurs</title>
                <link rel="icon" href="/public/img/icon.png">
                <meta charset="UTF-8">
                <style>
                    body { 
                    font-family: Arial, 
                    sans-serif; 
                    margin: 40px; 
                    background-color: #f4f4f9; 
                    }
                    h2 { color: #333; }
                    table { 
                    border-collapse: collapse; 
                    width: 100%; 
                    box-shadow: 0 0 20px rgba(0,0,0,0.1); 
                    background: white; 
                    }
                    th, td { 
                    padding: 12px 15px; 
                    text-align: left; 
                    border-bottom: 1px solid #ddd; 
                    }
                    thead tr { 
                    background-color: rgb(232, 177, 109); 
                    color: #ffffff; 
                    }
                    tbody tr:nth-of-type(even) { background-color: #f3f3f3; }
                    tbody tr:hover { background-color: #f1f1f1; }
                    .btn-supprimer {
                        background-color: #dc3545; 
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        cursor: pointer;
                        border-radius: 4px;
                        width: 90px;
                    }
                    .btn-supprimer:hover {
                        background-color: #c82333; 
                    }
                    .btn-modifier {
                        background-color: #3c87e2; 
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        cursor: pointer;
                        border-radius: 4px;
                        width: 90px;
                    }
                    .btn-modifier:hover {
                        background-color: #1c6da4; 
                    }
                </style>
            </head>
            <body>
                <h2>Liste des Utilisateurs</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Email</th>
                            <th>Mot de passe</th>
                            <th>Role</th>
                            <th>Supprimer Utilisateur</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
        data.forEach(element => {
            html += `
                <tr>
                    <td>${element.id_utilisateur}</td>
                    <td>${element.nom}</td>
                    <td>${element.prenom}</td>
                    <td>${element.email}</td>
                    <td>${element.mot_de_passe}</td>
                    <td>${element.role}</td>
                    <td><button onclick="supprimerUser(${element.id_utilisateur})" class="btn-supprimer">Supprimer</button></td>
                </tr>
            `;
        });
        html += `
                    </tbody>
                </table>
                <script>
                    function supprimerUser(id) {
                        if(!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
                        fetch('/users/' + id, {
                        method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                alert("utilisateur supprimé !");           
                                window.location.reload(); 
                            } else {
                                alert("Erreur lors de la suppression");
                            }
                        })
                        .catch(error => console.error("Erreur:", error));
                    }
                </script>
            </body>
            </html>
        `;
        res.send(html);
        });
    }

    // Supprimer un utilisateur
    static deleteUser(req, res) {
        const id = req.params.id;
        User.delete(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Erreur serveur" });
            }
            res.send("Utilisateur supprimé avec succès");
        });
    }

    // Rechercher les voyages de l'utilisateur
    static searchVoyages(req, res) {
        const { nomgaredepart, nomgarearrivee } = req.body;

        const db = require('../config/db');
        const sql = `
            SELECT v.id_voyage, v.date_depart, v.prix, v.statut, c.immatriculation, 
                   TIME_FORMAT(t.duree, "%Hh%i") as duree_format
            FROM voyages v
            INNER JOIN trajet t ON v.id_trajet = t.id_trajet
            INNER JOIN gare g_dep ON t.id_gare_depart = g_dep.id_gare
            INNER JOIN gare g_arr ON t.id_gare_arrivee = g_arr.id_gare
            INNER JOIN car c ON v.id_car = c.id_car
            WHERE g_dep.nom_gare = ? AND g_arr.nom_gare = ?
        `;

        db.query(sql, [nomgaredepart, nomgarearrivee], (err, resultats) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erreur serveur SQL", statut: "Echec" });
            }

            if (resultats.length === 0) {
                return res.json({ message: "Aucun voyage trouvé pour ce trajet.", statut: "Vide", voyages: [] });
            }

            res.json({
                message: `${resultats.length} voyages trouvés`,
                statut: "Succès",
                voyages: resultats 
            });
        });
    }
}

module.exports = UserController;
