require('dotenv').config();
const express = require('express');
const db = require('./src/config/db');
const path = require('path');
const PORT = 2000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));




app.get('', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//inscription, login posts
app.get('/inscription', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/inscription.html'))
})


app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/login.html'))
})


//user gets
app.get('/user', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/user.html'))
})


//admin gets
app.get('/admin', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/admin.html'))
})


app.get('/trajet', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/trajet.html'))
})


app.get('/car', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/car.html'))
})


app.get('/voyages', (req, res) => {
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

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
        }

        //return res.json(data);
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
});


app.get('/users', (req, res)=>{
    const sql = `
        SELECT *
        FROM utilisateurs
    `;
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
        }

        //return res.json(data);
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


})


app.get('/voyages/:id', (req, res) => {
    const id = req.params.id;
    
    const sql = "SELECT * FROM voyages WHERE id_voyage = ?";

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data[0]);
    });
});


//admin delete
app.delete('/voyages/:id', (req, res) => {
    const idASupprimer = req.params.id;

    const sql = "DELETE FROM voyages WHERE id_voyage = ?"; 

    db.query(sql, [idASupprimer], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Erreur serveur" });
        }
        res.send("Voyage supprimé avec succès");
    });
});


app.delete('/users/:id', (req, res)=>{
    const id_asupp = req.params.id;

    const sql = `DELETE FROM utilisateurs WHERE id_utilisateur = ?`;

    db.query(sql,  [id_asupp], (err, result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({message: "Erreur serveur"});
        }
        res.send("Utilisateur supprimé avec succès");
    })

})


//inscription, login posts
app.post('/inscription', (req, res)=>{
    const { nom, prenom, email, mot_de_passe } = req.body;

    console.log("Données reçues :", req.body);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            message: "Format d'email invalide !", 
            statut: "mauvaisformat" 
        });
    }

    const sqlselect = "SELECT * FROM utilisateurs WHERE email = ?";
    
    db.query(sqlselect, [email], (err, resultats)=>{
        if(err) return res.status(500).json({ message: "Erreur serveur" });
        if(resultats.length > 0){
            return res.json({ message: "Cet email est déjà utilisé.", statut: "Echec" });
        }
        const sqlinsert = "INSERT INTO utilisateurs(nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)";
        const newuser = [nom, prenom, email, mot_de_passe, 'utilisateur'];
        db.query(sqlinsert, newuser, (err, resultat)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erreur lors de l'inscription" })
            }
            res.status(200).json({
                message: `Bienvenue ${nom} inscription réussie.`,
                statut: "Succès"
            });
        })
    })
})


app.post('/login', (req, res)=>{
    const {email, mot_de_passe} = req.body;

    //console.log("Données reçues :", req.body);
    console.log("Utilisateur connecté");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            message: "Format d'email invalide !", 
            statut: "mauvaisformat" 
        });
    }

    const sqlselect = "SELECT * FROM utilisateurs WHERE email = ? AND mot_de_passe = ?";
    db.query(sqlselect,[email, mot_de_passe], (err, resultats)=>{
        if(err) return res.status(500).json({ message: "Erreur serveur" });
        //console.log("Résultat de la BDD :", resultats);
        if (resultats.length < 1) {
            return res.status(400).json({ 
                message: "Mot de passe incorrect ou Utilisateur non connecté.", statut: "Echec" 
            });
        }
        else if(resultats[0].role == "admin"){
            return res.status(200).json({ 
                message: `Bienvenue admin, connexion réussie.`, 
                statut: "Succèsadmin", 
                nom: resultats[0].nom,
            });
        }
        else{
            return res.status(200).json({ 
                message: `Bienvenue client, connexion réussie.`, 
                statut: "Succèsclient",
                nom: resultats[0].nom,
                id: resultats[0].id_utilisateur
            });
        }  
    })
})


//user posts
app.post('/user', (req, res) => {
    const { nomgaredepart, nomgarearrivee } = req.body;

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
});


app.post('/reservation', (req, res) => {
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
});


//admin posts
app.post('/trajet', (req, res) => {
    const { nomgaredepart, nomgarearrivee, datedepart, duree, immatriculation, prix } = req.body;

    if (new Date(datedepart) <= new Date()) {
        return res.json({ message: "La date est déjà passée.", statut: "Echec" });
    }

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
});

app.post('/car', (req, res)=>{
    const {capacite, immatriculation} = req.body;

    const sqlCar = "INSERT INTO car(capacite, immatriculation) VALUES (?, ?)";

    db.query(sqlCar, [capacite, immatriculation], (err, result)=>{
        if(err){
            return res.status(400).json({message: "Erreur SQL Car"});
        }
        res.send("<h1>Car ajouté avec succès </h1>");
    })


})




app.listen(PORT, () => {
    console.log(`Serveur lancé sur : http://localhost:${PORT}`);
});