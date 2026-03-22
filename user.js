
const nom = localStorage.getItem('nomUser');
const NOM = nom.toUpperCase();
if (NOM) {
    document.getElementById('titre-nom').innerText = "Bienvenue " + NOM ;   
}

/*
const form = document.querySelector('form');
form.addEventListener('submit', async function(e){
    e.preventDefault();
    const nomgaredepart = document.querySelector('#selectdepart').value;
    const nomgarearrivee = document.querySelector('#selectarrivee').value;
    const newvoyage = {
        nomgaredepart,
        nomgarearrivee
    }

    try{
        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newvoyage)
        });
        const data = await response.json();

        if(data.statut == "Echec") {
            alert("Erreur : " + data.message); 
        }
        else{

        }
    } catch (erreur) {
        console.error(erreur);
        alert("Impossible de contacter le serveur");
    }
})*/

const form = document.querySelector('form');
const resultatDiv = document.querySelector('#all'); 

form.addEventListener('submit', async function(e){
    e.preventDefault();
    
    resultatDiv.innerHTML = '<p>Recherche en cours...</p>';

    const nomgaredepart = document.querySelector('#selectdepart').value;
    const nomgarearrivee = document.querySelector('#selectarrivee').value;

    const requestData = { nomgaredepart, nomgarearrivee };

    try {
        const response = await fetch('/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        resultatDiv.innerHTML = '';

        if (data.statut === "Echec") {
            alert("Erreur : " + data.message);
        } 
        else if (data.statut === "Vide") {
            resultatDiv.innerHTML = `<h3 class="ticket">Aucun voyage disponible pour ce trajet.</h3>`;
        } 
        else {
            data.voyages.forEach(voyage => {
                
                const dateLie = new Date(voyage.date_depart).toLocaleString();

                const htmlVoyage = `
                    <div class="ticket">
                        <h3>${nomgaredepart} ➡️ ${nomgarearrivee}</h3>
                        <p><strong>Départ :</strong> ${dateLie}</p>
                        <p><strong>Durée :</strong> ${voyage.duree_format}</p>
                        <p><strong>Prix :</strong> ${voyage.prix} DH</p>
                        <p><strong>Autocar :</strong> ${voyage.immatriculation}</p>
                        <button onclick="reserver(${voyage.id_voyage})">Réserver ce billet</button>
                    </div>
                `;
                
                resultatDiv.innerHTML += htmlVoyage;
            });
        }
    } catch (erreur) {
        console.error(erreur);
        alert("Impossible de contacter le serveur");
    }
});

async function reserver(idVoyage) {
    const idUtilisateur = localStorage.getItem('idUser');

    if (!idUtilisateur) {
        alert("Vous devez être connecté pour réserver !");
        window.location.href = '/login';
        return;
    }

    const reservation = {
        id_voyage: idVoyage,
        id_utilisateur: idUtilisateur
    };

    try {
        const response = await fetch('/reservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        });

        const data = await response.json();

        if (data.statut === "Succès") {
            alert("Félicitations ! Votre billet est réservé.");
        } else {
            alert("Erreur : " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Erreur technique.");
    }
}