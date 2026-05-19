Markdown
# 🚌 Plateforme de Réservation d'Autocars

## 📖 Description
Une application web Full-Stack conçue pour moderniser et digitaliser la gestion du transport de voyageurs par autocar. Elle met en relation dynamique les offres de transport administrées par l'agence et les besoins de recherche des clients. Le design a été récemment revu pour offrir une expérience utilisateur (UI/UX) plus moderne et immersive.

## ✨ Fonctionnalités

### 👤 Espace Client
* **Recherche dynamique :** Filtrage instantané des trajets par gare de départ et d'arrivée.
* **Réservation fluide :** Consultation des offres (horaires, tarifs) et génération de billets associés au compte utilisateur.
* **Authentification :** Inscription et connexion sécurisées des utilisateurs.

### 🛠️ Espace Administrateur (Back-Office)
* **Tableau de bord :** Interface centralisée pour la supervision de l'activité.
* **Gestion des voyages et autocars :** Ajout de nouveaux trajets, affectation des autocars et définition des tarifs.
* **Contrôle de la plateforme :** Suivi, gestion et suppression des comptes utilisateurs et des voyages.

## 💻 Technologies Utilisées

* **Frontend :** HTML5, CSS3, JavaScript (Appels API asynchrones via Fetch/AJAX).
* **Backend :** Node.js avec le framework Express.js pour une gestion performante des requêtes.
* **Base de données :** MySQL (Utilisation de requêtes préparées pour la sécurité).

## 🚀 Installation et Lancement

1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/AlaeeddineAmrani/backendproject.git](https://github.com/AlaeeddineAmrani/backendproject.git)
Installer les dépendances :
Dans le dossier racine du projet, exécutez :

Bash
npm install
Configuration de la Base de Données :

Importez la structure de la base de données MySQL à partir du dictionnaire de données conçu pour le projet.

Modifiez les identifiants de connexion (hôte, utilisateur, mot de passe) dans le fichier database.js.

Démarrer le serveur :

Bash
npm start
# ou si vous utilisez nodemon pour le développement
nodemon server
L'application sera accessible localement, par défaut sur http://localhost:1000.

🏗️ Architecture des Données
Le système s'appuie sur une structure relationnelle solide garantissant l'intégrité des données (Gares, Trajets, Voyages, Autocars, Billets, Utilisateurs), incluant des règles de gestion via des Triggers (ex: contrôle de la capacité maximale des autocars avant réservation).

👨‍💻 Auteur
Alaeeddine Amrani - Élève Ingénieur à l'INPT
