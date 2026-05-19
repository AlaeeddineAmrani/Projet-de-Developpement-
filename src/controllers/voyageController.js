const Voyage = require('../models/Voyage');

class VoyageController {
    // Afficher tous les voyages en HTML
    static renderListVoyages(req, res) {
        Voyage.findAll((err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
            }

            let html = `<!DOCTYPE html>
            <html>
            <head>
                <title>Page affichage voyages</title>
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
                <h2>Liste des Voyages</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date de depart</th>
                            <th>Statut</th>
                            <th>ID car</th>
                            <th>Gare de depart</th>
                            <th>Gare d'arrivée</th>
                            <th>Prix en DH</th>
                            <th>Supprimer Voyage</th>
                            <th>Modifier Voyage</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
        data.forEach(element => {
            html += `
                <tr>
                    <td>${element.id_voyage}</td>
                    <td>${new Date(element.date_depart).toLocaleString('fr-FR')}</td>
                    <td>${element.statut}</td>
                    <td>${element.id_car}</td>
                    <td>${element.gare_depart}</td>
                    <td>${element.gare_arrivee}</td>
                    <td>${element.prix}</td>
                    <td><button onclick="supprimerVoyage(${element.id_voyage})" class="btn-supprimer">Supprimer</button></td>
                    <td><button  class="btn-modifier" onclick="window.location.href='/trajet?id=${element.id_voyage}'">Modifier</button></td>
                </tr>
            `;
        });
        html += `
                    </tbody>
                </table>
                <script>
                    function supprimerVoyage(id) {
                        if(!confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?")) return;
                        fetch('/voyages/' + id, {
                        method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                alert("voyage supprimé !");           
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

    // Récupérer un voyage par ID (JSON)
    static getVoyageById(req, res) {
        const id = req.params.id;
        Voyage.findById(id, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data[0]);
        });
    }

    // Supprimer un voyage
    static deleteVoyage(req, res) {
        const idASupprimer = req.params.id;
        Voyage.delete(idASupprimer, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "Erreur serveur" });
            }
            res.send("Voyage supprimé avec succès");
        });
    }
}

module.exports = VoyageController;
